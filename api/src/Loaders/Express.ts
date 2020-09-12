import routes from '../Routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Response } from 'express';

export default ({ app }: { app: express.Application }): void => {
  app.use(cors());

  app.use(bodyParser.json());
  app.use(routes());

  /// catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, _req, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, _req, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
