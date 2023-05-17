import { Type } from 'class-transformer';
import { IsEmail, IsDate, IsNotEmpty, MaxDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @MaxDate(require('moment')().subtract(13, 'y').toDate())
  dob: Date;

  firstname?: string;
  lastname?: string;
}
