import { PartialType } from '@nestjs/mapped-types';
import RegisterDto from './RegisterDto.dto';

export class LoginDto extends PartialType(RegisterDto) {}
