import { Kafka, Producer, Consumer, logLevel } from 'kafkajs';

const KAFKA_BROKERS = (process.env.KAFKA_BROKERS || 'localhost:9092').split(',');
const SERVICE_NAME  = process.env.SERVICE_NAME || 'grapepay-service';

const kafka = new Kafka({
  clientId: SERVICE_NAME,
  brokers:  KAFKA_BROKERS,
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 8,
  },
});

// ─── Singleton Producer ───────────────────────────────────────────────────────
let producer: Producer | null = null;

export async function getProducer(): Promise<Producer> {
  if (!producer) {
    producer = kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000,
    });
    await producer.connect();
    console.log('[Kafka] Producer connected');
  }
  return producer;
}

// ─── Publish helper ───────────────────────────────────────────────────────────
export async function publishEvent(
  topic: string,
  eventType: string,
  payload: Record<string, unknown>
): Promise<void> {
  const prod = await getProducer();
  const message = {
    eventId:   `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    eventType,
    timestamp: new Date().toISOString(),
    ...payload,
  };
  await prod.send({
    topic,
    messages: [
      {
        key:   payload['paymentId'] as string || payload['customerId'] as string,
        value: JSON.stringify(message),
      },
    ],
  });
  console.log(`[Kafka] Published ${eventType} → ${topic}`);
}

// ─── Consumer factory ─────────────────────────────────────────────────────────
export function createConsumer(groupId: string): Consumer {
  return kafka.consumer({ groupId });
}

// ─── Graceful shutdown ────────────────────────────────────────────────────────
export async function disconnectKafka(): Promise<void> {
  if (producer) {
    await producer.disconnect();
    producer = null;
  }
}
