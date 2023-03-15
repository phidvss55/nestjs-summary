import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  c_name: string;

  @IsString()
  @IsNotEmpty()
  c_slug: string;

  @IsOptional()
  c_avatar: string;

  @IsOptional()
  c_banner: string;

  @IsOptional()
  c_description: string;

  @IsNumber()
  @IsNotEmpty()
  c_hot: number;

  @IsNotEmpty()
  @IsNumber()
  c_status: number;
}

export default CreateCategoryDto;