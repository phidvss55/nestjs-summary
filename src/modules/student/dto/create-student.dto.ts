import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Faculty } from '../entities/student.entity';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  sID: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsEnum(Faculty, { message: 'Please enter correct faculty.' })
  faculty: Faculty;

  user: any;
}
