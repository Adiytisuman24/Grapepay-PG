import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PutCommand, GetCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import {
  dynamoDb, TABLES,
  publishEvent, KAFKA_TOPICS, CUSTOMER_EVENTS,
  Customer,
} from '@grapepay/shared';
import { authenticate } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = Router();
router.use(authenticate);

// ─── POST /v1/customers ───────────────────────────────────────────────────────
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, metadata } = req.body;
    const merchantId = req.merchantId!;

    if (!name || !email) {
      throw createError('name and email are required', 400, 'VALIDATION_ERROR');
    }

    const customerId = `cus_${uuidv4().replace(/-/g, '')}`;
    const now        = new Date().toISOString();

    const customer: Customer = {
      customerId,
      merchantId,
      name,
      email,
      phone,
      metadata,
      createdAt: now,
      updatedAt: now,
    };

    await dynamoDb.send(new PutCommand({
      TableName: TABLES.CUSTOMERS,
      Item:      customer,
      ConditionExpression: 'attribute_not_exists(customerId)',
    }));

    await publishEvent(KAFKA_TOPICS.CUSTOMERS, CUSTOMER_EVENTS.CREATED, {
      customerId,
      merchantId,
      email,
    });

    res.status(201).json({ data: customer });
  } catch (err) {
    next(err);
  }
});

// ─── GET /v1/customers ────────────────────────────────────────────────────────
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const merchantId = req.merchantId!;
    const limit      = Math.min(parseInt(req.query.limit as string) || 20, 100);

    const result = await dynamoDb.send(new QueryCommand({
      TableName:                 TABLES.CUSTOMERS,
      IndexName:                 'merchantId-createdAt-index',
      KeyConditionExpression:    'merchantId = :mid',
      ExpressionAttributeValues: { ':mid': merchantId },
      ScanIndexForward:          false,
      Limit:                     limit,
    }));

    res.json({ data: result.Items || [], count: result.Count });
  } catch (err) {
    next(err);
  }
});

// ─── GET /v1/customers/:customerId ───────────────────────────────────────────
router.get('/:customerId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId } = req.params;
    const merchantId     = req.merchantId!;

    const result = await dynamoDb.send(new GetCommand({
      TableName: TABLES.CUSTOMERS,
      Key:       { customerId },
    }));

    if (!result.Item || result.Item.merchantId !== merchantId) {
      throw createError('Customer not found', 404, 'NOT_FOUND');
    }

    res.json({ data: result.Item });
  } catch (err) {
    next(err);
  }
});

// ─── PATCH /v1/customers/:customerId ─────────────────────────────────────────
router.patch('/:customerId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId } = req.params;
    const merchantId     = req.merchantId!;
    const { name, email, phone, metadata } = req.body;

    // Verify ownership
    const existing = await dynamoDb.send(new GetCommand({
      TableName: TABLES.CUSTOMERS,
      Key:       { customerId },
    }));
    if (!existing.Item || existing.Item.merchantId !== merchantId) {
      throw createError('Customer not found', 404, 'NOT_FOUND');
    }

    const now = new Date().toISOString();
    const updateParts: string[] = ['updatedAt = :ts'];
    const names: Record<string, string>  = {};
    const values: Record<string, unknown> = { ':ts': now };

    if (name)     { updateParts.push('#nm = :name');  names['#nm'] = 'name';  values[':name']  = name; }
    if (email)    { updateParts.push('email = :email');                        values[':email'] = email; }
    if (phone)    { updateParts.push('phone = :phone');                        values[':phone'] = phone; }
    if (metadata) { updateParts.push('metadata = :meta');                      values[':meta']  = metadata; }

    await dynamoDb.send(new UpdateCommand({
      TableName:                 TABLES.CUSTOMERS,
      Key:                       { customerId },
      UpdateExpression:          `SET ${updateParts.join(', ')}`,
      ExpressionAttributeNames:  Object.keys(names).length ? names : undefined,
      ExpressionAttributeValues: values,
    }));

    await publishEvent(KAFKA_TOPICS.CUSTOMERS, CUSTOMER_EVENTS.UPDATED, { customerId, merchantId });

    res.json({ data: { customerId, updatedAt: now } });
  } catch (err) {
    next(err);
  }
});

export default router;
