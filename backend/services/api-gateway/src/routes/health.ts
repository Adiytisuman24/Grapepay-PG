import { Router, Request, Response } from 'express';
import { dynamoDb, getRedisClient } from '@grapepay/shared';
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb';

const router = Router();

// ─── GET /health ──────────────────────────────────────────────────────────────
router.get('/', async (_req: Request, res: Response) => {
  const checks: Record<string, 'ok' | 'error'> = {};

  // DynamoDB check
  try {
    await dynamoDb.send(new DescribeTableCommand({ TableName: 'grapepay-payments' }) as any);
    checks.dynamodb = 'ok';
  } catch {
    checks.dynamodb = 'error';
  }

  // Redis check
  try {
    const redis = getRedisClient();
    await redis.ping();
    checks.redis = 'ok';
  } catch {
    checks.redis = 'error';
  }

  const allHealthy = Object.values(checks).every(v => v === 'ok');
  res.status(allHealthy ? 200 : 503).json({
    status:    allHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    service:   'api-gateway',
    version:   process.env.npm_package_version || '1.0.0',
    checks,
  });
});

// ─── GET /health/ready ────────────────────────────────────────────────────────
router.get('/ready', (_req: Request, res: Response) => {
  res.json({ ready: true });
});

export default router;
