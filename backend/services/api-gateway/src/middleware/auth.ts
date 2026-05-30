import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRedisClient, REDIS_KEYS } from '@grapepay/shared';
import { AuthPayload } from '@grapepay/shared';

const JWT_SECRET = process.env.JWT_SECRET || 'grapepay-dev-secret-change-in-prod';

// Extend Express Request to carry the decoded auth payload
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
      merchantId?: string;
    }
  }
}

// ─── JWT Bearer Auth ──────────────────────────────────────────────────────────
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid Authorization header' });
      return;
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    // Check if session is blacklisted (logout invalidation via Redis)
    const redis = getRedisClient();
    const sessionKey = REDIS_KEYS.session(decoded.userId);
    const blacklisted = await redis.get(`blacklist:${token.slice(-20)}`);
    if (blacklisted) {
      res.status(401).json({ error: 'Token has been revoked' });
      return;
    }

    req.user       = decoded;
    req.merchantId = decoded.merchantId;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
    } else {
      next(err);
    }
  }
}

// ─── API Key Auth (for server-to-server / SDK) ────────────────────────────────
export async function authenticateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const apiKey = req.headers['x-api-key'] as string;
    if (!apiKey) {
      res.status(401).json({ error: 'Missing x-api-key header' });
      return;
    }

    const keyPrefix = apiKey.slice(0, 12);
    const redis     = getRedisClient();
    const cached    = await redis.get(REDIS_KEYS.apiKeyHash(keyPrefix));

    if (!cached) {
      res.status(401).json({ error: 'Invalid API key' });
      return;
    }

    const payload: AuthPayload = JSON.parse(cached);
    req.user       = payload;
    req.merchantId = payload.merchantId;
    next();
  } catch (err) {
    next(err);
  }
}

// ─── Role Guard ───────────────────────────────────────────────────────────────
export function requireRole(...roles: AuthPayload['role'][]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }
    next();
  };
}
