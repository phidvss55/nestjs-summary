import { Faculty } from '../entities/student.entity';

export class CreateStudentDto {
  sID: number;

  name: string;

  year: number;

  score: number;

  faculty: Faculty;
}
