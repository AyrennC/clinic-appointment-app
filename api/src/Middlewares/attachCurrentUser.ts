import { hasTokenWithId } from './isAuth';
import Logger from '../Loaders/Logger';
import { ClinicModel } from '../Models';
import { Clinic } from '../Models/Clinic';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export interface HasCurrentUser {
  currentUser: Clinic;
}

const attachCurrentUser: RequestHandler = async (
  req: Request & HasCurrentUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const clinic = hasTokenWithId(req)
      ? await ClinicModel.findByPk(req.token.id)
      : null;
    if (!clinic) {
      return res.sendStatus(401);
    }
    req.currentUser = clinic;
    return next();
  } catch (e) {
    Logger.error('Error attaching clinic to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
