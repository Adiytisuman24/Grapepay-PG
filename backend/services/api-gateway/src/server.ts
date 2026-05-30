import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Middleware
import { requestId, accessLog }        from './middleware/logging';
import { rateLimitByIP }               from './middleware/rateLimit';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Routes
import healthRouter   from './routes/health';
import authRouter     from './routes/auth';
import paymentsRouter from './routes/payments';
import invoicesRouter from './routes/invoices';
import customersRouter from './routes/customers';
import webhooksRouter from './routes/webhooks';

const app: Express = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// ─── Trust proxy (behind nginx / ALB) ────────────────────────────────────────
app.set('trust proxy', 1);

// ─── Security headers ─────────────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({
  origin:      process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:3001'],
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-request-id'],
}));

// ─── Raw body capture (required for webhook signature verification) ────────────
app.use('/v1/webhooks', express.raw({ type: 'application/json' }), (req, _res, next) => {
  (req as any).rawBody = req.body;
  next();
});

// ─── JSON body parsing ────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Request tracing + access logging ────────────────────────────────────────
app.use(requestId);
app.use(accessLog);

// ─── Global IP rate limit ─────────────────────────────────────────────────────
app.use(rateLimitByIP);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/health',       healthRouter);
app.use('/v1/auth',      authRouter);
app.use('/v1/payments',  paymentsRouter);
app.use('/v1/invoices',  invoicesRouter);
app.use('/v1/customers', customersRouter);
app.use('/v1/webhooks',  webhooksRouter);

// ─── 404 + error handlers (must be last) ──────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start server ──────────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`[API Gateway] 🚀 Running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// ─── Graceful shutdown ────────────────────────────────────────────────────────
async function shutdown(signal: string): Promise<void> {
  console.log(`[API Gateway] ${signal} received — shutting down gracefully`);
  server.close(async () => {
    const { disconnectKafka } = await import('@grapepay/shared');
    await disconnectKafka();
    console.log('[API Gateway] Shutdown complete');
    process.exit(0);
  });

  // Force kill after 10s
  setTimeout(() => {
    console.error('[API Gateway] Forced shutdown after timeout');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('uncaughtException',  (err) => { console.error('[Uncaught]', err); process.exit(1); });
process.on('unhandledRejection', (err) => { console.error('[Unhandled]', err); process.exit(1); });

export default app;
