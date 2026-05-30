import 'dotenv/config';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import {
  createConsumer, disconnectKafka,
  dynamoDb, TABLES,
  KAFKA_TOPICS, NOTIFICATION_EVENTS,
} from '@grapepay/shared';
import {
  sendEmail,
  sendSMS,
  deliverMerchantWebhook,
} from './notificationSender';

const GROUP_ID = 'notification-service-group';

async function resolveCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const result = await dynamoDb.send(new GetCommand({
      TableName: TABLES.CUSTOMERS,
      Key:       { customerId },
    }));
    return result.Item?.email || null;
  } catch {
    return null;
  }
}

async function start(): Promise<void> {
  console.log('[NotificationService] 🚀 Starting...');

  const consumer = createConsumer(GROUP_ID);
  await consumer.connect();

  await consumer.subscribe({
    topics:        [KAFKA_TOPICS.NOTIFICATIONS],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const raw = message.value?.toString();
      if (!raw) return;

      let event: { eventType: string; [key: string]: unknown };
      try {
        event = JSON.parse(raw);
      } catch {
        console.error('[NotificationService] Failed to parse message:', raw);
        return;
      }

      console.log(`[NotificationService] Processing: ${event.eventType}`);

      switch (event.eventType) {
        // ── Email notifications ────────────────────────────────────────
        case NOTIFICATION_EVENTS.EMAIL_SEND: {
          const customerId = event.customerId as string;
          const template   = event.template   as string;
          const data       = (event.data      as Record<string, unknown>) || {};

          const email = await resolveCustomerEmail(customerId);
          if (email) {
            await sendEmail(email, template, data);
          } else {
            console.warn(`[NotificationService] Could not resolve email for customer: ${customerId}`);
          }
          break;
        }

        // ── SMS notifications ─────────────────────────────────────────
        case NOTIFICATION_EVENTS.SMS_SEND: {
          const phone   = event.phone   as string;
          const message = event.message as string;
          if (phone && message) {
            await sendSMS(phone, message);
          }
          break;
        }

        // ── Merchant webhook delivery ──────────────────────────────────
        case NOTIFICATION_EVENTS.WEBHOOK_SEND: {
          const merchantId = event.merchantId as string;
          const webhookEvent = event.event   as string;

          const { eventType: _et, merchantId: _mid, event: _ev, ...rest } = event;
          await deliverMerchantWebhook(merchantId, webhookEvent, rest);
          break;
        }

        default:
          console.log(`[NotificationService] Unhandled event type: ${event.eventType}`);
      }
    },
  });

  console.log('[NotificationService] ✅ Listening on topic:', KAFKA_TOPICS.NOTIFICATIONS);
}

async function shutdown(signal: string): Promise<void> {
  console.log(`[NotificationService] ${signal} — shutting down`);
  await disconnectKafka();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('uncaughtException',  (err) => { console.error('[Uncaught]', err); process.exit(1); });
process.on('unhandledRejection', (err) => { console.error('[Unhandled]', err); process.exit(1); });

start().catch(err => {
  console.error('[NotificationService] Fatal startup error:', err);
  process.exit(1);
});
