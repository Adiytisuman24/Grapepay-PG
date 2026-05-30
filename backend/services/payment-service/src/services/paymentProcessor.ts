import { UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import Stripe from 'stripe';
import {
  dynamoDb, TABLES,
  publishEvent, KAFKA_TOPICS,
  PAYMENT_EVENTS, NOTIFICATION_EVENTS,
  Payment,
} from '@grapepay/shared';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

// ─── Process initiated payment → authorize via gateway ────────────────────────
export async function processPaymentInitiated(payload: Record<string, unknown>): Promise<void> {
  const { paymentId, merchantId, amount, currency, method } = payload;

  try {
    console.log(`[PaymentProcessor] Processing payment: ${paymentId}`);

    // Fetch full payment record
    const result = await dynamoDb.send(new GetCommand({
      TableName: TABLES.PAYMENTS,
      Key:       { paymentId },
    }));

    const payment = result.Item as Payment;
    if (!payment) {
      console.error(`[PaymentProcessor] Payment not found: ${paymentId}`);
      return;
    }

    // ── Fraud / AML pre-check (simplified rule engine) ────────────────────
    if (payment.amount > 500_00000) { // > ₹5,00,000 in paise
      await updatePaymentStatus(paymentId as string, 'failed', 'Amount exceeds single transaction limit');
      await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.FAILED, {
        paymentId,
        merchantId,
        failureReason: 'FRAUD_LIMIT_EXCEEDED',
      });
      return;
    }

    // ── Route to payment gateway ─────────────────────────────────────────
    let gatewayReference: string;

    if (method === 'card') {
      // Create a Stripe PaymentIntent
      const intent = await stripe.paymentIntents.create({
        amount:   payment.amount,
        currency: payment.currency.toLowerCase(),
        metadata: {
          paymentId:  paymentId as string,
          merchantId: merchantId as string,
        },
        capture_method: 'automatic',
      });
      gatewayReference = intent.id;
    } else {
      // Razorpay / UPI — placeholder until Razorpay SDK integrated
      gatewayReference = `rz_${Date.now()}`;
    }

    // Update DynamoDB with gateway reference
    const now = new Date().toISOString();
    await dynamoDb.send(new UpdateCommand({
      TableName:                 TABLES.PAYMENTS,
      Key:                       { paymentId },
      UpdateExpression:          'SET #st = :status, gatewayReference = :ref, gatewayName = :gw, updatedAt = :ts',
      ExpressionAttributeNames:  { '#st': 'status' },
      ExpressionAttributeValues: {
        ':status': 'authorized',
        ':ref':    gatewayReference,
        ':gw':     method === 'card' ? 'stripe' : 'razorpay',
        ':ts':     now,
      },
    }));

    // Publish authorized event
    await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.AUTHORIZED, {
      paymentId,
      merchantId,
      gatewayReference,
      amount,
      currency,
    });

    // Trigger notification
    await publishEvent(KAFKA_TOPICS.NOTIFICATIONS, NOTIFICATION_EVENTS.EMAIL_SEND, {
      paymentId,
      merchantId,
      customerId: payment.customerId,
      template:   'payment_authorized',
      data: {
        amount:   payment.amount / 100,
        currency: payment.currency,
      },
    });

    console.log(`[PaymentProcessor] Payment authorized: ${paymentId} → ${gatewayReference}`);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`[PaymentProcessor] Error processing payment ${paymentId}:`, errMsg);

    await updatePaymentStatus(paymentId as string, 'failed', errMsg);
    await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.FAILED, {
      paymentId,
      merchantId,
      failureReason: errMsg,
    });
  }
}

// ─── Handle gateway webhook → capture ─────────────────────────────────────────
export async function processPaymentCaptured(payload: Record<string, unknown>): Promise<void> {
  const { gatewayReference, amount } = payload;

  // Find payment by gateway reference
  const result = await dynamoDb.send(new GetCommand({
    TableName: TABLES.PAYMENTS,
    Key:       { gatewayReference },
  }));

  if (!result.Item) {
    console.warn(`[PaymentProcessor] No payment found for gateway ref: ${gatewayReference}`);
    return;
  }

  const payment   = result.Item as Payment;
  const paymentId = payment.paymentId;
  const now       = new Date().toISOString();

  await dynamoDb.send(new UpdateCommand({
    TableName:                 TABLES.PAYMENTS,
    Key:                       { paymentId },
    UpdateExpression:          'SET #st = :status, capturedAt = :ts, updatedAt = :ts',
    ExpressionAttributeNames:  { '#st': 'status' },
    ExpressionAttributeValues: { ':status': 'captured', ':ts': now },
  }));

  await publishEvent(KAFKA_TOPICS.NOTIFICATIONS, NOTIFICATION_EVENTS.EMAIL_SEND, {
    paymentId,
    merchantId:   payment.merchantId,
    customerId:   payment.customerId,
    template:     'payment_success',
    data: { amount: (amount as number) / 100, currency: payment.currency },
  });

  // Also send webhook to merchant
  await publishEvent(KAFKA_TOPICS.NOTIFICATIONS, NOTIFICATION_EVENTS.WEBHOOK_SEND, {
    merchantId:   payment.merchantId,
    event:        'payment.captured',
    paymentId,
    amount,
  });

  console.log(`[PaymentProcessor] Payment captured: ${paymentId}`);
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
async function updatePaymentStatus(
  paymentId: string,
  status: Payment['status'],
  failureReason?: string
): Promise<void> {
  const now = new Date().toISOString();
  await dynamoDb.send(new UpdateCommand({
    TableName:                 TABLES.PAYMENTS,
    Key:                       { paymentId },
    UpdateExpression:          'SET #st = :status, failureReason = :reason, updatedAt = :ts',
    ExpressionAttributeNames:  { '#st': 'status' },
    ExpressionAttributeValues: { ':status': status, ':reason': failureReason || null, ':ts': now },
  }));
}
