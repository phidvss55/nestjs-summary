import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Authenticate } from '../../authenticate/entities/authenticate.entity';
import mongoose from 'mongoose';

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
  @ApiProperty({ description: 'Property', example: 4.3 })
  score: number;

  @Prop()
  @ApiProperty({ description: 'Property', example: 'Faculty 1' })
  faculty: Faculty;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Authenticate' })
  @ApiProperty({ description: 'Property', example: '' })
  user: Authenticate;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
