// ─── Payment Events ───────────────────────────────────────────────────────────
export const PAYMENT_EVENTS = {
  INITIATED:   'payment.initiated',
  AUTHORIZED:  'payment.authorized',
  CAPTURED:    'payment.captured',
  FAILED:      'payment.failed',
  REFUNDED:    'payment.refunded',
  DISPUTED:    'payment.disputed',
  CHARGEBACK:  'payment.chargeback',
} as const;

// ─── Invoice Events ───────────────────────────────────────────────────────────
export const INVOICE_EVENTS = {
  CREATED:   'invoice.created',
  SENT:      'invoice.sent',
  PAID:      'invoice.paid',
  OVERDUE:   'invoice.overdue',
  CANCELLED: 'invoice.cancelled',
} as const;

// ─── Customer Events ──────────────────────────────────────────────────────────
export const CUSTOMER_EVENTS = {
  CREATED: 'customer.created',
  UPDATED: 'customer.updated',
  DELETED: 'customer.deleted',
} as const;

// ─── Notification Events ──────────────────────────────────────────────────────
export const NOTIFICATION_EVENTS = {
  EMAIL_SEND:  'notification.email.send',
  SMS_SEND:    'notification.sms.send',
  WEBHOOK_SEND:'notification.webhook.send',
} as const;

// ─── Kafka Topics ─────────────────────────────────────────────────────────────
export const KAFKA_TOPICS = {
  PAYMENTS:      'grapepay.payments',
  INVOICES:      'grapepay.invoices',
  CUSTOMERS:     'grapepay.customers',
  NOTIFICATIONS: 'grapepay.notifications',
  AUDIT_LOG:     'grapepay.audit',
  FRAUD_CHECK:   'grapepay.fraud',
} as const;

// ─── All event types as union ─────────────────────────────────────────────────
export type PaymentEventType  = typeof PAYMENT_EVENTS[keyof typeof PAYMENT_EVENTS];
export type InvoiceEventType  = typeof INVOICE_EVENTS[keyof typeof INVOICE_EVENTS];
export type CustomerEventType = typeof CUSTOMER_EVENTS[keyof typeof CUSTOMER_EVENTS];
export type KafkaTopic        = typeof KAFKA_TOPICS[keyof typeof KAFKA_TOPICS];
