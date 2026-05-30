import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PutCommand, GetCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import {
  dynamoDb, TABLES,
  publishEvent, KAFKA_TOPICS, INVOICE_EVENTS,
  CreateInvoiceRequest, Invoice,
} from '@grapepay/shared';
import { authenticate } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = Router();
router.use(authenticate);

// ─── POST /v1/invoices ────────────────────────────────────────────────────────
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: CreateInvoiceRequest = req.body;
    const merchantId = req.merchantId!;

    if (!body.customerId || !body.lineItems?.length || !body.currency || !body.dueDate) {
      throw createError('Missing required fields', 400, 'VALIDATION_ERROR');
    }

    const taxRate   = body.taxRate ?? 0;
    const lineItems = body.lineItems.map(item => ({
      ...item,
      totalAmount: item.quantity * item.unitAmount,
    }));
    const subtotal  = lineItems.reduce((s, i) => s + i.totalAmount, 0);
    const taxAmount = Math.round(subtotal * taxRate);
    const total     = subtotal + taxAmount;

    const invoiceId     = `inv_${uuidv4().replace(/-/g, '')}`;
    const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
    const now           = new Date().toISOString();

    const invoice: Invoice = {
      invoiceId,
      merchantId,
      customerId:    body.customerId,
      invoiceNumber,
      status:        'draft',
      lineItems,
      subtotal,
      taxAmount,
      totalAmount:   total,
      currency:      body.currency,
      dueDate:       body.dueDate,
      notes:         body.notes,
      createdAt:     now,
      updatedAt:     now,
    };

    await dynamoDb.send(new PutCommand({
      TableName: TABLES.INVOICES,
      Item:      invoice,
      ConditionExpression: 'attribute_not_exists(invoiceId)',
    }));

    await publishEvent(KAFKA_TOPICS.INVOICES, INVOICE_EVENTS.CREATED, { invoiceId, merchantId });

    res.status(201).json({ data: invoice });
  } catch (err) {
    next(err);
  }
});

// ─── GET /v1/invoices ─────────────────────────────────────────────────────────
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const merchantId = req.merchantId!;
    const limit      = Math.min(parseInt(req.query.limit as string) || 20, 100);

    const result = await dynamoDb.send(new QueryCommand({
      TableName:                 TABLES.INVOICES,
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

// ─── GET /v1/invoices/:invoiceId ──────────────────────────────────────────────
router.get('/:invoiceId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { invoiceId } = req.params;
    const merchantId    = req.merchantId!;

    const result = await dynamoDb.send(new GetCommand({
      TableName: TABLES.INVOICES,
      Key:       { invoiceId },
    }));

    if (!result.Item || result.Item.merchantId !== merchantId) {
      throw createError('Invoice not found', 404, 'NOT_FOUND');
    }

    res.json({ data: result.Item });
  } catch (err) {
    next(err);
  }
});

// ─── POST /v1/invoices/:invoiceId/send ───────────────────────────────────────
router.post('/:invoiceId/send', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { invoiceId } = req.params;
    const merchantId    = req.merchantId!;

    const result = await dynamoDb.send(new GetCommand({
      TableName: TABLES.INVOICES,
      Key:       { invoiceId },
    }));

    const invoice = result.Item as Invoice;
    if (!invoice || invoice.merchantId !== merchantId) {
      throw createError('Invoice not found', 404, 'NOT_FOUND');
    }
    if (invoice.status !== 'draft') {
      throw createError('Only draft invoices can be sent', 400, 'INVALID_STATUS');
    }

    const now = new Date().toISOString();
    await dynamoDb.send(new UpdateCommand({
      TableName:                 TABLES.INVOICES,
      Key:                       { invoiceId },
      UpdateExpression:          'SET #st = :status, updatedAt = :ts',
      ExpressionAttributeNames:  { '#st': 'status' },
      ExpressionAttributeValues: { ':status': 'sent', ':ts': now },
    }));

    await publishEvent(KAFKA_TOPICS.INVOICES, INVOICE_EVENTS.SENT, {
      invoiceId,
      merchantId,
      customerId: invoice.customerId,
    });

    res.json({ data: { invoiceId, status: 'sent' } });
  } catch (err) {
    next(err);
  }
});

export default router;
