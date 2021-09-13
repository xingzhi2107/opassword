import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length } from 'class-validator';
import { OPBaseEntity } from '../common/common.entity';

@Entity('PasswordInfo')
export class PasswordInfoEntity extends OPBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', width: 11, nullable: false })
  userId: number;

  @Column({ default: '', length: 225 })
  @Length(0, 110)
  name: string;

  @Column({ default: '', length: 225 })
  @Length(0, 110)
  account: string;

  @Column({ type: 'text', nullable: false })
  @Length(0, 10000)
  encryptedPassword: string;

  @Column({ default: '', length: 225 })
  @Length(0, 110)
  webSite: string;

  @Column({ type: 'text', nullable: true })
  @Length(0, 1000)
  note: string;
}
