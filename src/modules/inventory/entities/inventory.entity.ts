import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Authenticate } from 'src/modules/authenticate/entities/authenticate.entity';

interface Size {
  height: number;
  weight: number;
  unit: string;
}

@Schema({
  timestamps: true,
  collection: 'inventory',
  toJSON: {
    virtuals: true,
  },
})
export class Inventory extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  @ApiProperty({ example: 'canvas' })
  item: string;

  @Prop()
  @ApiProperty({ example: 123 })
  qty: number;

  @Prop()
  @ApiProperty({ example: 'canvas-sm24' })
  tags: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  @ApiProperty({ example: { height: 12, weight: 12, unit: 'cm' } })
  size: Size;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Authenticate' })
  @Type(() => Authenticate)
  //@ApiProperty({ type: Authenticate })
  user: Authenticate;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
