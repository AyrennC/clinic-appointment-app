import { CelebrateError, isCelebrateError } from 'celebrate';
import {
  ErrorRequestHandler,
  NextFunction,
  RequestHandler,
  Response,
} from 'express';

export const notFoundRequestHandler: RequestHandler = (_req, _res, next) => {
  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
};

export const jwtErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res: Response,
  next: NextFunction
) => {
  /**
   * Handle 401 thrown by express-jwt library
   */
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).send({ message: err.message }).end();
  }

  return next(err);
};

export const validationErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res: Response,
  next: NextFunction
) => {
  /**
   * Handle 400 thrown by celebrate library
   */
  if (isCelebrateError(err)) {
    const { details } = (err as CelebrateError).details.get('body');
    let errorMessage = 'validation error';
    if (details.length > 0) {
      errorMessage = details[0].message.replace(/"/g, '');
    }
    return res
      .status(err.status || 400)
      .json({ error: { message: errorMessage } })
      .end();
  }

  return next(err);
};

export const genericErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res: Response,
  _next
) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
};
