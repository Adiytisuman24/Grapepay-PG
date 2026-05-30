import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PutCommand, GetCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import {
  dynamoDb, TABLES,
  publishEvent, KAFKA_TOPICS, PAYMENT_EVENTS,
  CreatePaymentRequest, Payment,
} from '@grapepay/shared';
import { authenticate, authenticateApiKey, requireRole } from '../middleware/auth';
import { rateLimitByMerchant } from '../middleware/rateLimit';
import { createError } from '../middleware/errorHandler';

const router = Router();

// All payment routes require auth
router.use(authenticate);
router.use(rateLimitByMerchant);

// ─── POST /v1/payments ────────────────────────────────────────────────────────
// Initiate a new payment
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: CreatePaymentRequest = req.body;
    const merchantId = req.merchantId!;

    if (!body.customerId || !body.amount || !body.currency || !body.method) {
      throw createError('Missing required fields: customerId, amount, currency, method', 400, 'VALIDATION_ERROR');
    }
    if (body.amount <= 0) {
      throw createError('Amount must be greater than 0', 400, 'INVALID_AMOUNT');
    }

    const paymentId = `pay_${uuidv4().replace(/-/g, '')}`;
    const now       = new Date().toISOString();

    const payment: Payment = {
      paymentId,
      merchantId,
      customerId:  body.customerId,
      amount:      body.amount,
      currency:    body.currency,
      method:      body.method,
      status:      'initiated',
      orderId:     body.orderId,
      description: body.description,
      metadata:    body.metadata,
      createdAt:   now,
      updatedAt:   now,
    };

    // Persist to DynamoDB
    await dynamoDb.send(new PutCommand({
      TableName: TABLES.PAYMENTS,
      Item:      payment,
      ConditionExpression: 'attribute_not_exists(paymentId)',
    }));

    // Publish to Kafka — triggers authorization + notification flows
    await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.INITIATED, {
      paymentId,
      merchantId,
      customerId:  body.customerId,
      amount:      body.amount,
      currency:    body.currency,
      method:      body.method,
    });

    res.status(201).json({ data: payment });
  } catch (err) {
    next(err);
  }
});

// ─── GET /v1/payments ─────────────────────────────────────────────────────────
// List payments for the authenticated merchant (paginated)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const merchantId = req.merchantId!;
    const limit      = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const status     = req.query.status as string | undefined;

    const params: any = {
      TableName:                 TABLES.PAYMENTS,
      IndexName:                 'merchantId-createdAt-index',
      KeyConditionExpression:    'merchantId = :mid',
      ExpressionAttributeValues: { ':mid': merchantId },
      ScanIndexForward:          false,
      Limit:                     limit,
    };

    if (status) {
      params.FilterExpression             = '#st = :status';
      params.ExpressionAttributeNames     = { '#st': 'status' };
      params.ExpressionAttributeValues[':status'] = status;
    }

    const result = await dynamoDb.send(new QueryCommand(params));
    res.json({
      data:            result.Items || [],
      count:           result.Count,
      lastEvaluatedKey: result.LastEvaluatedKey,
    });
  } catch (err) {
    next(err);
  }
});

// ─── GET /v1/payments/:paymentId ──────────────────────────────────────────────
router.get('/:paymentId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { paymentId } = req.params;
    const merchantId    = req.merchantId!;

    const result = await dynamoDb.send(new GetCommand({
      TableName: TABLES.PAYMENTS,
      Key:       { paymentId },
    }));

    if (!result.Item || result.Item.merchantId !== merchantId) {
      throw createError('Payment not found', 404, 'NOT_FOUND');
    }

    res.json({ data: result.Item });
  } catch (err) {
    next(err);
  }
});

// ─── POST /v1/payments/:paymentId/refund ─────────────────────────────────────
router.post(
  '/:paymentId/refund',
  requireRole('admin', 'finance'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymentId } = req.params;
      const merchantId    = req.merchantId!;
      const { amount, reason } = req.body;

      const result = await dynamoDb.send(new GetCommand({
        TableName: TABLES.PAYMENTS,
        Key:       { paymentId },
      }));

      const payment = result.Item as Payment;
      if (!payment || payment.merchantId !== merchantId) {
        throw createError('Payment not found', 404, 'NOT_FOUND');
      }
      if (payment.status !== 'captured') {
        throw createError(`Cannot refund a payment in status "${payment.status}"`, 400, 'INVALID_STATUS');
      }

      const refundAmount = amount || payment.amount;
      if (refundAmount > payment.amount) {
        throw createError('Refund amount exceeds original payment amount', 400, 'INVALID_REFUND_AMOUNT');
      }

      // Update status
      const now = new Date().toISOString();
      await dynamoDb.send(new UpdateCommand({
        TableName:                 TABLES.PAYMENTS,
        Key:                       { paymentId },
        UpdateExpression:          'SET #st = :status, refundedAt = :ts, updatedAt = :ts',
        ExpressionAttributeNames:  { '#st': 'status' },
        ExpressionAttributeValues: { ':status': 'refunded', ':ts': now },
      }));

      // Publish refund event
      await publishEvent(KAFKA_TOPICS.PAYMENTS, PAYMENT_EVENTS.REFUNDED, {
        paymentId,
        merchantId,
        refundAmount,
        reason,
      });

      res.json({ data: { paymentId, status: 'refunded', refundAmount } });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
