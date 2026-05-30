import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDb, TABLES, getRedisClient, REDIS_KEYS, CACHE_TTL } from '@grapepay/shared';
import { AuthPayload } from '@grapepay/shared';
import { createError } from '../middleware/errorHandler';
import { authenticate } from '../middleware/auth';

const router = Router();

const JWT_SECRET     = process.env.JWT_SECRET     || 'grapepay-dev-secret-change-in-prod';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// ─── POST /v1/auth/register ───────────────────────────────────────────────────
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, businessName, businessType } = req.body;

    if (!name || !email || !password || !businessName) {
      throw createError('name, email, password, businessName are required', 400, 'VALIDATION_ERROR');
    }
    if (password.length < 8) {
      throw createError('Password must be at least 8 characters', 400, 'WEAK_PASSWORD');
    }

    const merchantId = `mer_${uuidv4().replace(/-/g, '')}`;
    const userId     = `usr_${uuidv4().replace(/-/g, '')}`;
    const now        = new Date().toISOString();
    const passwordHash = await bcrypt.hash(password, 12);

    // Create merchant record
    await dynamoDb.send(new PutCommand({
      TableName: TABLES.MERCHANTS,
      Item: {
        merchantId,
        name,
        email,
        businessName,
        businessType: businessType || 'other',
        kycStatus:    'pending',
        isActive:     true,
        createdAt:    now,
      },
      ConditionExpression: 'attribute_not_exists(merchantId)',
    }));

    // Create user record (admin role for owner)
    await dynamoDb.send(new PutCommand({
      TableName: TABLES.MERCHANTS, // Users stored alongside merchants in same table with SK pattern
      Item: {
        pk:        `USER#${userId}`,
        sk:        `MERCHANT#${merchantId}`,
        userId,
        merchantId,
        email,
        name,
        role:        'admin',
        passwordHash,
        isActive:    true,
        createdAt:   now,
        lastLoginAt: now,
      },
      ConditionExpression: 'attribute_not_exists(pk)',
    }));

    const payload: AuthPayload = { userId, merchantId, role: 'admin' };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      data: { token, merchantId, userId, role: 'admin' },
    });
  } catch (err) {
    next(err);
  }
});

// ─── POST /v1/auth/login ──────────────────────────────────────────────────────
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError('email and password are required', 400, 'VALIDATION_ERROR');
    }

    // Look up user by email via GSI
    const result = await dynamoDb.send(new QueryCommand({
      TableName:                 TABLES.MERCHANTS,
      IndexName:                 'email-index',
      KeyConditionExpression:    'email = :email',
      FilterExpression:          'begins_with(pk, :prefix)',
      ExpressionAttributeValues: { ':email': email, ':prefix': 'USER#' },
      Limit: 1,
    }));

    const user = result.Items?.[0];
    if (!user) throw createError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    if (!user.isActive) throw createError('Account is deactivated', 403, 'ACCOUNT_DISABLED');

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) throw createError('Invalid credentials', 401, 'INVALID_CREDENTIALS');

    const payload: AuthPayload = {
      userId:     user.userId,
      merchantId: user.merchantId,
      role:       user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Cache session info in Redis
    const redis = getRedisClient();
    await redis.setex(
      REDIS_KEYS.session(user.userId),
      CACHE_TTL.SESSION,
      JSON.stringify(payload)
    );

    res.json({
      data: { token, merchantId: user.merchantId, userId: user.userId, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

// ─── POST /v1/auth/logout ─────────────────────────────────────────────────────
router.post('/logout', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token  = req.headers.authorization!.slice(7);
    const userId = req.user!.userId;
    const redis  = getRedisClient();

    // Blacklist the token and clear session
    await Promise.all([
      redis.setex(`blacklist:${token.slice(-20)}`, CACHE_TTL.SESSION, '1'),
      redis.del(REDIS_KEYS.session(userId)),
    ]);

    res.json({ data: { message: 'Logged out successfully' } });
  } catch (err) {
    next(err);
  }
});

// ─── GET /v1/auth/me ──────────────────────────────────────────────────────────
router.get('/me', authenticate, async (req: Request, res: Response) => {
  res.json({ data: req.user });
});

export default router;
