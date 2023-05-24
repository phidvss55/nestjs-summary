import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class Authenticate extends Document {
  @Prop()
  @ApiProperty({ example: 'Johnny Depp' })
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  @ApiProperty({ example: 'depp@gmail.com' })
  email: string;

  @Prop()
  @ApiProperty({ example: 'abc123' })
  password: string;
}

export const AuthenticateSchema = SchemaFactory.createForClass(Authenticate);
