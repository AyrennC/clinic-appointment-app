import container from './IoC';
import { dbConfig } from '../Models';
import { Logger } from 'winston';

export default (): void => {
  const logger = container.get<Logger>('Logger');

  dbConfig
    .sync()
    .then(() => logger.info('connected to db'))
    .catch(() => {
      throw 'error';
    });
};
