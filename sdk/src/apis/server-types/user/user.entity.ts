import { OPBaseEntity } from '../common/common.entity';
export interface UserEntity extends OPBaseEntity {
  id: number;
  email: string;
  nickname: string;
  bio: string;
  profileUrl: string;
  password: string;
  emailVerified: boolean;
}
