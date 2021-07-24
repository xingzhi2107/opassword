import { PasswordInfoEntity } from './password-info.entity';

export type PasswordInfoPlainData = Omit<PasswordInfoEntity, 'userId'>;

export interface PasswordInfoRO {
  passwordInfo: PasswordInfoPlainData;
}
