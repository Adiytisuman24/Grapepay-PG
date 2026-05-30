import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => Math.min(times * 100, 3000),
      lazyConnect: true,
    });

    redisClient.on('connect', () =>
      console.log('[Redis] Connected to', REDIS_URL)
    );
    redisClient.on('error', (err: Error) =>
      console.error('[Redis] Error:', err.message)
    );
  }
  return redisClient;
}

// ─── Key helpers ──────────────────────────────────────────────────────────────
export const REDIS_KEYS = {
  session:        (userId: string)     => `session:${userId}`,
  rateLimitIP:    (ip: string)         => `rl:ip:${ip}`,
  rateLimitMerch: (merchantId: string) => `rl:merch:${merchantId}`,
  paymentLock:    (paymentId: string)  => `lock:payment:${paymentId}`,
  merchantCache:  (merchantId: string) => `cache:merchant:${merchantId}`,
  apiKeyHash:     (keyPrefix: string)  => `apikey:${keyPrefix}`,
};

export const CACHE_TTL = {
  SESSION:  3600,   // 1 hour
  MERCHANT: 300,    // 5 minutes
  API_KEY:  86400,  // 24 hours
} as const;
