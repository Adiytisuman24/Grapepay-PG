import { Request, Response, NextFunction } from 'express';

interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

// Central error handler — must have 4 parameters for Express to treat it as error middleware
export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const isDev      = process.env.NODE_ENV === 'development';

  console.error('[ERROR]', JSON.stringify({
    ts:        new Date().toISOString(),
    requestId: req.headers['x-request-id'],
    path:      req.path,
    method:    req.method,
    status:    statusCode,
    error:     err.message,
    code:      err.code,
    stack:     isDev ? err.stack : undefined,
  }));

  res.status(statusCode).json({
    error: {
      message:   err.message || 'Internal server error',
      code:      err.code    || 'INTERNAL_ERROR',
      requestId: req.headers['x-request-id'],
      ...(isDev && { stack: err.stack }),
    },
  });
}

// 404 handler — call after all routes
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: {
      message:   `Route ${req.method} ${req.path} not found`,
      code:      'NOT_FOUND',
      requestId: req.headers['x-request-id'],
    },
  });
}

// Helper to create typed API errors in routes
export function createError(message: string, statusCode: number, code?: string): ApiError {
  const err: ApiError = new Error(message);
  err.statusCode = statusCode;
  err.code       = code;
  return err;
}
