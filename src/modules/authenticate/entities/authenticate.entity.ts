import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Inventory } from 'src/modules/inventory/entities/inventory.entity';
import { Student } from 'src/modules/student/entities/student.entity';

@Schema({
  timestamps: true,
  collection: 'users',
  toJSON: {
    virtuals: true,
    getters: true,
  },
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
  @Exclude()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', autopopulate: true }] })
  @ApiProperty({ example: [] })
  students?: Student[];

  @Type(() => Inventory)
  inventories: Inventory[];
}

const AuthenticateSchema = SchemaFactory.createForClass(Authenticate);

AuthenticateSchema.virtual('inventories', {
  ref: 'Inventory',
  localField: '_id',
  foreignField: 'user',
});

AuthenticateSchema.virtual('fullName').get(function (this: Authenticate) {
  return `${this.name} ${this.email}`;
});

export { AuthenticateSchema };
