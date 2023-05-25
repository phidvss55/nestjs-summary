import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @ApiProperty({ example: 'canvas' })
  item: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  qty: number;

  @IsString()
  @ApiProperty({ example: 'canvas-md123' })
  tags: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({ example: { height: 1, weight: 32, unit: 'm' } })
  size: { height: number; weight: number; unit: string };
}
