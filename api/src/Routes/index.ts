import auth from './auth';
import { Router } from 'express';

export default (): Router => {
  const app = Router();
  auth(app);

  return app;
};
