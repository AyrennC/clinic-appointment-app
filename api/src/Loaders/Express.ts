import routes from '../Routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

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
};
