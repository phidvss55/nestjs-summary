import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  mn_name: string;

  @IsString()
  @IsNotEmpty()
  mn_slug: string;

  @IsOptional()
  mn_avatar: string;

  @IsOptional()
  mn_banner: string;

  @IsOptional()
  mn_description: string;

  @IsNumber()
  @IsNotEmpty()
  mn_hot: number;

  @IsNotEmpty()
  @IsNumber()
  mn_status: number;
}

export default CreateMenuDto;
