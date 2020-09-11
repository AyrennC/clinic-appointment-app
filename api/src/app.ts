import 'reflect-metadata';

import config from './config';
import Loaders from './Loaders';
import Logger from './Loaders/Logger';
import express from 'express';

function startServer() {
  const app = express();

  Loaders({ app });

  app.listen(config.port, () => {
    Logger.info(`Server listening on port: ${config.port}`);
  });
}

startServer();
