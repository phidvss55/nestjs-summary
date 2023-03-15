import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import CreatePostDto from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString({ each: true })
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export default UpdatePostDto;