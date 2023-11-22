import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Column()
  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;
}
