import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PasswordInfoService } from './password-info.service';
import { CurrUser } from '../user/user.decorator';
import {
  CreatePasswordInfoDto,
  PatchUpdatePasswordInfoDto,
} from './password-info.dto';
import {
  FetchSimpleListEntitiesDto,
  QuerySimpleListIdsDto,
} from '../common/common.dto';
import { ParseSimpleListQuery } from '../common/common.decorator';

@Controller('password-info')
export class PasswordInfoController {
  constructor(private readonly passwordInfoService: PasswordInfoService) {}

  @Post('/')
  create(@CurrUser('id') userId: number, @Body() dto: CreatePasswordInfoDto) {
    console.log('zhenguo debug, userId: ', userId);
    return this.passwordInfoService.createPasswordInfo(userId, dto);
  }

  @Get('/ids')
  getSimpleListIds(
    @CurrUser('id') userId: number,
    @ParseSimpleListQuery() queryDto: QuerySimpleListIdsDto,
  ) {
    return this.passwordInfoService.fetchSimpleListIds(userId, queryDto);
  }

  @Post('/fetch-entities')
  getSimpleListData(
    @CurrUser('id') userId: number,
    @Body() dto: FetchSimpleListEntitiesDto,
  ) {
    return this.passwordInfoService.fetchSimpleListData(userId, dto);
  }

  @Patch('/:id')
  patchUpdate(
    @CurrUser('id') userId: number,
    @Param('id') id,
    @Body() dto: PatchUpdatePasswordInfoDto,
  ) {
    return this.passwordInfoService.patchUpdatePasswordInfo(userId, id, dto);
  }

  @Delete('/:id')
  softRemove(@CurrUser('id') userId: number, @Param('id') id) {
    return this.passwordInfoService.softRemovePasswordInfo(userId, id);
  }
}
