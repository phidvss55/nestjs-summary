import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/utils/responseData';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';
import { Request } from 'express';
import { Paging } from 'src/utils/paging';

@Controller('cms/category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getListAllCategories(@Query() query) {
    const paging = {
      page: query.page || 1,
      page_size: query.page_size || 10,
    };

    const filter = {
      hot: query.hot || null,
      status: query.status || null,
    };

    const [res, count] = await this.categoryService.getAllCategories(paging, filter);
    const pagingData = new Paging(Number(paging.page), Number(paging.page_size), count);
    return new ResponseData(200, res, 'Success', pagingData);
  }

  @Post('')
  async createCategory(@Body() categoryDto: CreateCategoryDto) {
    return await this.categoryService.storeCategory(categoryDto);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const data = await this.categoryService.show(Number(id));
    return new ResponseData(200, data);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() cateData: UpdateCategoryDto) {
    return this.categoryService.update(Number(id), cateData);
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.categoryService.destroy(id);
  }
}
