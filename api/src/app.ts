import 'reflect-metadata';

import config from './config';
import ExpressLoader from './Loaders/Express';
import Logger from './Loaders/Logger';
import express from 'express';

function startServer() {
  const app = express();

  ExpressLoader(app);

  app.listen(config.port, () => {
    Logger.info(`Server listening on port: ${config.port}`);
  });
}

startServer();
