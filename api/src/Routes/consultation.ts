import { IConsultationInputDTO } from '../Interfaces/IConsultation';
import container from '../Loaders/IoC';
import attachCurrentUser, {
  HasCurrentUser,
} from '../Middlewares/attachCurrentUser';
import isAuth from '../Middlewares/isAuth';
import ClinicService from '../Services/ClinicService';
import { celebrate, Joi } from 'celebrate';
import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
const route = Router();

export default (app: Router): void => {
  app.use('/consultation', route);

  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        doctor: Joi.string().required(),
        patient: Joi.string().required(),
        diagnosis: Joi.string().required(),
        medication: Joi.string().required(),
        fee: Joi.number().required(),
      }),
    }),
    isAuth,
    attachCurrentUser,
    async (
      req: Request & HasCurrentUser,
      res: Response,
      next: NextFunction
    ) => {
      const logger = container.get<Logger>('Logger');
      logger.debug(
        'Calling createConsultation endpoint with body: %o',
        req.body
      );
      try {
        const clinicServiceInstance = container.get<ClinicService>(
          'ClinicService'
        );
        const { consultation } = await clinicServiceInstance.createConsultation(
          req.currentUser,
          req.body as IConsultationInputDTO
        );
        return res.status(201).json({ consultation });
      } catch (e) {
        logger.error('error: %o', e);
        return next(e);
      }
    }
  );

  route.get(
    '/list',
    isAuth,
    attachCurrentUser,
    async (
      req: Request & HasCurrentUser,
      res: Response,
      next: NextFunction
    ) => {
      const logger = container.get<Logger>('Logger');
      logger.debug('Calling listConsultation endpoint with body: %o', req.body);
      try {
        const clinicServiceInstance = container.get<ClinicService>(
          'ClinicService'
        );
        const { consultations } = await clinicServiceInstance.listConsultations(
          req.currentUser
        );

        return res.status(200).json({ consultations });
      } catch (e) {
        logger.error('error: %o', e);
        return next(e);
      }
    }
  );
};
