import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './common/common.middleware';
import { OPResInterceptor } from './common/common.interceptor';
import { OPExceptionFilter } from './common/common.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerMiddleware);
  app.useGlobalInterceptors(new OPResInterceptor());
  app.useGlobalFilters(new OPExceptionFilter());

  await app.listen(3000);
}
bootstrap();
