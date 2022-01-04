import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class OPBaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  removedAt: Date;
}
