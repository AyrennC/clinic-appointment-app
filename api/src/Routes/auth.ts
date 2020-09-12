import { IClinicInputDTO } from '../Interfaces/IClinic';
import container from '../Loaders/IoC';
import attachCurrentUser, {
  HasCurrentUser,
} from '../Middlewares/attachCurrentUser';
import isAuth from '../Middlewares/isAuth';
import AuthService from '../Services/AuthService';
import { celebrate, Joi } from 'celebrate';
import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().max(200).required(),
        email: Joi.string().email().max(200).required(),
        password: Joi.string().min(8).max(200).required(),
        phone: Joi.string()
          .pattern(/^\d{8}$/)
          .required()
          .error(
            new Joi.ValidationError(
              '',
              [
                {
                  message: 'phone must be an 8 digit number',
                },
              ],
              {}
            )
          ),
        address: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = container.get<Logger>('Logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const authServiceInstance = container.get<AuthService>('AuthService');
        const { clinic, token } = await authServiceInstance.signUp(
          req.body as IClinicInputDTO
        );
        return res.status(201).json({ clinic, token });
      } catch (e) {
        logger.error('error: %o', e);
        return next(e);
      }
    }
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = container.get<Logger>('Logger');
      logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        const { email, password } = req.body;
        const authServiceInstance = container.get<AuthService>('AuthService');
        const { clinic, token } = await authServiceInstance.signIn(
          email,
          password
        );
        return res.json({ clinic, token }).status(200);
      } catch (e) {
        logger.error('error: %o', e);
        return next(e);
      }
    }
  );

  route.get(
    '/me',
    isAuth,
    attachCurrentUser,
    (req: Request & HasCurrentUser, res: Response) => {
      return res.json({ clinic: req.currentUser }).status(200);
    }
  );
};
