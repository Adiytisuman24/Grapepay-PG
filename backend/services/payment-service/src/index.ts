import 'dotenv/config';
import {
  createConsumer, disconnectKafka,
  KAFKA_TOPICS, PAYMENT_EVENTS,
} from '@grapepay/shared';
import { processPaymentInitiated, processPaymentCaptured } from './services/paymentProcessor';

const GROUP_ID = 'payment-service-group';

async function start(): Promise<void> {
  console.log('[PaymentService] 🚀 Starting...');

  const consumer = createConsumer(GROUP_ID);

  await consumer.connect();
  console.log('[PaymentService] Kafka consumer connected');

  await consumer.subscribe({
    topics: [KAFKA_TOPICS.PAYMENTS],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const raw = message.value?.toString();
      if (!raw) return;

      let event: { eventType: string; [key: string]: unknown };
      try {
        event = JSON.parse(raw);
      } catch {
        console.error('[PaymentService] Failed to parse message:', raw);
        return;
      }

      console.log(`[PaymentService] Consumed: ${event.eventType} (partition ${partition})`);

      switch (event.eventType) {
        case PAYMENT_EVENTS.INITIATED:
          await processPaymentInitiated(event);
          break;

        case PAYMENT_EVENTS.CAPTURED:
          await processPaymentCaptured(event);
          break;

        default:
          console.log(`[PaymentService] Unhandled event type: ${event.eventType}`);
      }
    },
  });

  console.log('[PaymentService] ✅ Listening on topic:', KAFKA_TOPICS.PAYMENTS);
}

// ─── Graceful shutdown ────────────────────────────────────────────────────────
async function shutdown(signal: string): Promise<void> {
  console.log(`[PaymentService] ${signal} received — shutting down`);
  await disconnectKafka();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('uncaughtException',  (err) => { console.error('[Uncaught]', err); process.exit(1); });
process.on('unhandledRejection', (err) => { console.error('[Unhandled]', err); process.exit(1); });

start().catch(err => {
  console.error('[PaymentService] Fatal startup error:', err);
  process.exit(1);
});
