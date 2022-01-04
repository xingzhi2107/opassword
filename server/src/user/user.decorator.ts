import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { OPException } from '../common/common.error';
import { UserErrorCodes } from './user.error';

export const CurrUser = createParamDecorator(
  (key: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!!req.user) {
      return !!key ? req.user[key] : req.user;
    } else {
      throw new OPException(UserErrorCodes.UnauthorizedException);
    }
  },
);
