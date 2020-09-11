import config from '../config';
import { Request } from 'express';
import jwt from 'express-jwt';

const getTokenFromHeader = (req: Request) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAuth = jwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'token',
  getToken: getTokenFromHeader,
});

export const hasTokenWithId = (
  req: unknown
): req is { token: { id: string } } =>
  req && typeof (req as { token: { id: unknown } })?.token?.id === 'number';

export default isAuth;
