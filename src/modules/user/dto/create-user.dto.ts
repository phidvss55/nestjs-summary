import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsDate, IsNotEmpty, MaxDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Abcd@1234' })
  password: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  @MaxDate(require('moment')().subtract(10, 'y').toDate())
  @ApiProperty({ example: '12-03-2000' })
  dob: Date;

  @ApiProperty({ example: 'Johnny' })
  firstname?: string;

  @ApiProperty({ example: 'Alex' })
  lastname?: string;
}
