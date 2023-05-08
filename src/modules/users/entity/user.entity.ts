import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Roles } from '../../../common/constants/roles.constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Primary key as Option ID',
    example: 1,
  })
  public id?: number;

  @ApiProperty({
    description: 'Name of user',
    example: 'Otter Otwel',
  })
  @Column({ unique: true })
  public email: string;

  @ApiProperty({
    description: 'Email of user',
    example: 'otterotwel@gmail.com',
  })
  @Column()
  public name: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'string',
  })
  @Column()
  public password: string;

  @Exclude()
  @ApiProperty({
    description: 'Refresh token of user',
    example: 'string',
  })
  @Column({
    default: null,
  })
  public refresh_token?: string;

  @Column({
    default: Roles.CUSTOMER,
    enum: Roles,
  })
  @ApiProperty({
    description: 'Role of user',
    example: 'string',
  })
  public role?: string;
}

export default User;
