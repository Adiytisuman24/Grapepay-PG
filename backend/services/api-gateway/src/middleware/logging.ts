import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Attach a unique request ID to every incoming request
export function requestId(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = (req.headers['x-request-id'] as string) || uuidv4();
  req.headers['x-request-id'] = id;
  res.setHeader('x-request-id', id);
  next();
}

// Structured access logging
export function accessLog(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();

  res.on('finish', () => {
    const log = {
      ts:        new Date().toISOString(),
      requestId: req.headers['x-request-id'],
      method:    req.method,
      path:      req.path,
      status:    res.statusCode,
      durationMs: Date.now() - start,
      ip:        req.ip,
      merchantId: (req as any).merchantId,
      userAgent: req.headers['user-agent'],
    };

    // Use stderr for errors, stdout for normal traffic
    if (res.statusCode >= 500) {
      console.error('[ACCESS]', JSON.stringify(log));
    } else {
      console.log('[ACCESS]', JSON.stringify(log));
    }
  });

  next();
}
