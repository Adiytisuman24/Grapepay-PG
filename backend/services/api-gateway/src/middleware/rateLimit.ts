import { Request, Response, NextFunction } from 'express';
import { getRedisClient, REDIS_KEYS } from '@grapepay/shared';

const WINDOW_MS      = parseInt(process.env.RATE_LIMIT_WINDOW_MS   || '60000');
const MAX_REQUESTS   = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');
const MERCHANT_LIMIT = parseInt(process.env.RATE_LIMIT_MERCHANT     || '500');

// ─── IP-based rate limit ──────────────────────────────────────────────────────
export async function rateLimitByIP(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ip    = req.ip || req.socket.remoteAddress || 'unknown';
    const redis = getRedisClient();
    const key   = REDIS_KEYS.rateLimitIP(ip);

    const current = await redis.incr(key);
    if (current === 1) {
      await redis.pexpire(key, WINDOW_MS);
    }

    const ttl = await redis.pttl(key);
    res.setHeader('X-RateLimit-Limit',     MAX_REQUESTS);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - current));
    res.setHeader('X-RateLimit-Reset',     Date.now() + ttl);

    if (current > MAX_REQUESTS) {
      res.status(429).json({
        error:   'Too many requests',
        retryAfter: Math.ceil(ttl / 1000),
      });
      return;
    }
    next();
  } catch {
    // If Redis is down, fail open (don't block legitimate traffic)
    next();
  }
}

// ─── Merchant-level rate limit ────────────────────────────────────────────────
export async function rateLimitByMerchant(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const merchantId = req.merchantId;
    if (!merchantId) { next(); return; }

    const redis   = getRedisClient();
    const key     = REDIS_KEYS.rateLimitMerch(merchantId);
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.pexpire(key, WINDOW_MS);
    }

    if (current > MERCHANT_LIMIT) {
      const ttl = await redis.pttl(key);
      res.status(429).json({
        error:      'Merchant rate limit exceeded',
        retryAfter: Math.ceil(ttl / 1000),
      });
      return;
    }
    next();
  } catch {
    next();
  }
}
