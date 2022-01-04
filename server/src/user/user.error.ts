import { registerModuleErrors } from '../common/common.error';

export enum UserErrorCodes {
  BadRequest = 400,
  EmailHaveBeenUsed = 20100,
  AccountIsNotExist,
  PasswordIsInvalid,
  UnauthorizedException,
}

const UserErrorMsgs = {
  [UserErrorCodes.BadRequest]: 'Bad request.',
  [UserErrorCodes.EmailHaveBeenUsed]: 'This email have been used!',
  [UserErrorCodes.AccountIsNotExist]: 'Account is not exist!',
  [UserErrorCodes.PasswordIsInvalid]: 'Password is invalid!',
  [UserErrorCodes.UnauthorizedException]: 'Login required!',
};

registerModuleErrors(UserErrorMsgs);
