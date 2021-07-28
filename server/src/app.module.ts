import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PasswordInfoModule } from './password-info/password-info.module';
import { AuthMiddleware } from './user/auth.middler';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, PasswordInfoModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/api/ping', method: RequestMethod.GET },
        { path: '/api/user/sign-up-by-email', method: RequestMethod.POST },
        { path: '/api/user/login-by-email', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
