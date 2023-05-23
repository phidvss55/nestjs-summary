import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  CATE_1 = 'Category 1',
  CATE_2 = 'Category 2',
  CATE_3 = 'Category 3',
  CATE_4 = 'Category 4',
}

@Schema({ timestamps: true })
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: string;

  @Prop()
  category: Category;
}

export const PostSchema = SchemaFactory.createForClass(Post);
