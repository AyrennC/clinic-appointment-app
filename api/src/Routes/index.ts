import auth from './auth';
import consultation from './consultation';
import { Router } from 'express';

export default (): Router => {
  const app = Router();
  auth(app);
  consultation(app);

  return app;
};
