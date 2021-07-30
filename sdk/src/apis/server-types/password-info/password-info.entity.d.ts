import { OPBaseEntity } from '../common/common.entity';
export declare class PasswordInfoEntity extends OPBaseEntity {
  id: number;
  userId: number;
  name: string;
  account: string;
  encryptedPassword: string;
  webSite: string;
  note: string;
}
