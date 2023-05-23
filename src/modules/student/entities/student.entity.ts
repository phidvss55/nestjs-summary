import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum Faculty {
  FACULTY_1 = 'Faculty 1',
  FACULTY_2 = 'Faculty 2',
  FACULTY_3 = 'Faculty 3',
  FACULTY_4 = 'Faculty 4',
}

@Schema({
  collection: 'students',
  timestamps: true,
})
export class Student {
  @Prop()
  @ApiProperty({ description: 'Property', example: 1 })
  sID: number;

  @Prop()
  @ApiProperty({ description: 'Property', example: 'Name of this student' })
  name: string;

  @Prop()
  @ApiProperty({ description: 'Property', example: 'year when this student learning' })
  year: number;

  @Prop()
  score: number;

  @Prop()
  faculty: Faculty;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
