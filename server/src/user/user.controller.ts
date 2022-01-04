import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import {
  LoginByPasswordDto,
  PatchUpdateProfileDto,
  SignUpByEmailDto,
} from './user.dto';
import { CurrUser } from './user.decorator';
import { UserData, UserRO } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up-by-email')
  signUpByEmail(@Body() dto: SignUpByEmailDto) {
    return this.userService.signUpByEmail(dto);
  }

  @Post('/login-by-email')
  loginByEmail(@Body() dto: LoginByPasswordDto) {
    return this.userService.loginByEmail(dto);
  }

  @Patch('/profile')
  patchUpdateProfile(
    @CurrUser() user: UserData,
    @Body() dto: PatchUpdateProfileDto,
  ) {
    return this.userService.updateProfile(user.id, dto);
  }

  @Get('/curr-user')
  getCurrUser(@CurrUser() user: UserData): UserRO {
    return {
      user,
    };
  }
}
