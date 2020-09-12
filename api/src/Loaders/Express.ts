import {
  validationErrorHandler,
  genericErrorHandler,
  jwtErrorHandler,
  notFoundRequestHandler,
} from '../Middlewares/errorHandlers';
import routes from '../Routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

export default ({ app }: { app: express.Application }): void => {
  app.use(cors());

  app.use(bodyParser.json());
  app.use(routes());

  /// catch 404 and forward to error handler
  app.use(notFoundRequestHandler);

  /// error handlers
  app.use(jwtErrorHandler);
  app.use(validationErrorHandler);
  app.use(genericErrorHandler);
};
