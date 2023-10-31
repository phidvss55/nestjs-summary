import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'abcd.1234@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
