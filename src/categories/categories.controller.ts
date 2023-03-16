import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import ResponseData from '../utils/responseData';

@Controller('categories')
@ApiTags('Category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    const data = await this.categoriesService.findAll();
    return new ResponseData(200, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const data = this.categoriesService.findOne(+id);
    return new ResponseData(200, data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const data = await this.categoriesService.update(+id, updateCategoryDto);
    return new ResponseData(200, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
