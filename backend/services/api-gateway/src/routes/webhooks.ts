import { Router, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { dynamoDb, TABLES, publishEvent, KAFKA_TOPICS, PAYMENT_EVENTS } from '@grapepay/shared';
import { createError } from '../middleware/errorHandler';

const router = Router();

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'grapepay-webhook-secret';

// ─── Verify Stripe signature ──────────────────────────────────────────────────
function verifyStripeSignature(payload: Buffer, sigHeader: string, secret: string): boolean {
  const parts = sigHeader.split(',').reduce<Record<string, string>>((acc, part) => {
    const [k, v] = part.split('=');
    acc[k] = v;
    return acc;
  }, {});

  const timestamp = parts['t'];
  const signatures = sigHeader.split(',')
    .filter(p => p.startsWith('v1='))
    .map(p => p.slice(3));

  const signedPayload = `${timestamp}.${payload.toString('utf8')}`;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  return signatures.some(sig =>
    crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))
  );
}

// ─── POST /v1/webhooks/stripe ─────────────────────────────────────────────────
router.post('/stripe', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers['stripe-signature'] as string;
    if (!sig) throw createError('Missing stripe-signature header', 400, 'MISSING_SIGNATURE');

    const rawBody = (req as any).rawBody as Buffer;
    if (!verifyStripeSignature(rawBody, sig, WEBHOOK_SECRET)) {
      throw createError('Invalid webhook signature', 401, 'INVALID_SIGNATURE');
    }

    const event = req.body;
    console.log(`[Webhook] Stripe event received: ${event.type}`);

    // Map Stripe events → internal Kafka events
    switch (event.type) {
      case 'payment_intent.succeeded':
        await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.CAPTURED, {
          gatewayReference: event.data.object.id,
          amount:           event.data.object.amount,
          currency:         event.data.object.currency.toUpperCase(),
        });
        break;

      case 'payment_intent.payment_failed':
        await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.FAILED, {
          gatewayReference: event.data.object.id,
          failureReason:    event.data.object.last_payment_error?.message,
        });
        break;

      case 'charge.dispute.created':
        await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.DISPUTED, {
          gatewayReference: event.data.object.payment_intent,
          disputeId:        event.data.object.id,
        });
        break;

      default:
        console.log(`[Webhook] Unhandled Stripe event type: ${event.type}`);
    }

    // Always ack quickly to Stripe
    res.json({ received: true });
  } catch (err) {
    next(err);
  }
});

// ─── POST /v1/webhooks/razorpay ───────────────────────────────────────────────
router.post('/razorpay', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    if (!signature) throw createError('Missing x-razorpay-signature', 400, 'MISSING_SIGNATURE');

    const rawBody = (req as any).rawBody as Buffer;
    const expected = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      throw createError('Invalid webhook signature', 401, 'INVALID_SIGNATURE');
    }

    const event = req.body;
    console.log(`[Webhook] Razorpay event received: ${event.event}`);

    switch (event.event) {
      case 'payment.captured':
        await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.CAPTURED, {
          gatewayReference: event.payload.payment.entity.id,
          amount:           event.payload.payment.entity.amount,
        });
        break;

      case 'payment.failed':
        await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.FAILED, {
          gatewayReference: event.payload.payment.entity.id,
          failureReason:    event.payload.payment.entity.error_description,
        });
        break;

      default:
        console.log(`[Webhook] Unhandled Razorpay event: ${event.event}`);
    }

    res.json({ received: true });
  } catch (err) {
    next(err);
  }
});

export default router;
