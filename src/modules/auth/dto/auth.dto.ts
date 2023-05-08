import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from '../../../common/constants/roles.constants';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Password field',
    example: 'Abcd@1234',
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name field',
    example: 'Johnny Deep',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Role field',
    enum: Roles,
  })
  role?: string;
}
