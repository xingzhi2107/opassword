import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrUser = createParamDecorator(
  (key: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    // if route is protected, there is a user set in auth.middleware
    if (!!req.user) {
      return !!key ? req.user[key] : req.user;
    } else {
      return null;
    }
  },
);
