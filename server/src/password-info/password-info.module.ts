import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordInfoEntity } from './password-info.entity';
import { PasswordInfoController } from './password-info.controller';
import { PasswordInfoService } from './password-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordInfoEntity])],
  controllers: [PasswordInfoController],
  providers: [PasswordInfoService],
  exports: [PasswordInfoService],
})
export class PasswordInfoModule {}
