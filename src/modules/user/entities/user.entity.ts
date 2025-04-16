import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Address from './address.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../enums/user.enum';
import * as bcrypt from 'bcrypt';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  public id?: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'User email', example: 'johndoe12@gmail.com' })
  public email: string;

  @Column()
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  public name: string;

  @Column()
  @Exclude()
  @ApiProperty({ description: 'Hashed user password' })
  public password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.MEMBER })
  role: UserRoles;

  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: Address;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}

export default User;
