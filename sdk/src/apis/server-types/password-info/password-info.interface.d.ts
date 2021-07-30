import { PasswordInfoEntity } from './password-info.entity';
export declare type PasswordInfoPlainData = Omit<PasswordInfoEntity, 'userId'>;
export interface PasswordInfoRO {
  passwordInfo: PasswordInfoPlainData;
}
