import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { UserService } from './user.service';
import { OPException } from '../common/common.error';
import { UserErrorCodes } from './user.error';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.fetchUserById(decoded.id);

      if (!user) {
        throw new OPException(UserErrorCodes.UnauthorizedException);
      }

      (req as any).user = user.user;
      next();
    } else {
      throw new OPException(UserErrorCodes.UnauthorizedException);
    }
  }
}
