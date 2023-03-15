import { IsNotEmpty, IsString } from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './LoginDto.dto';

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default RegisterDto;
