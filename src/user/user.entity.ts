import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IsEmail, Length, IsOptional } from 'class-validator';
import { OPBaseEntity } from '../common/common.entity';

@Entity('user')
@Index('email_removeAt_index', ['email', 'removedAt'], { unique: true })
export class UserEntity extends OPBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsEmail()
  @Length(2, 100)
  email: string;

  @Column({ default: '', length: 50 })
  @Length(6, 24)
  @IsOptional()
  nickname: string;

  @Column({ default: '' })
  @Length(2, 200)
  @IsOptional()
  bio: string;

  @Column({ default: '' })
  @Length(0, 300)
  @IsOptional()
  profileUrl: string;

  @Column({ length: 128 })
  @Length(8, 32)
  password: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;
}
