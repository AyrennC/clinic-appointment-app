import ExpressLoader from './Express';
import SequelizeLoader from './Sequelize';
import express from 'express';

export default ({ app }: { app: express.Application }): void => {
  ExpressLoader({ app });
  SequelizeLoader();
};
