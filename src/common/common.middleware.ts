import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

const morganIns = morgan('tiny');

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  morganIns(req, res, console.error);
  next();
}
