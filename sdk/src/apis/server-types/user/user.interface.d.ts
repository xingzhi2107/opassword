import { UserEntity } from './user.entity';
export declare type UserData = Omit<UserEntity, 'password' | 'hashPassword'>;
export interface UserRO {
  user: UserData;
  token?: string;
}
