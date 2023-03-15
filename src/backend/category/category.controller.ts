import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/createCategory.dto';

@Controller('cms/category')
@ApiTags('Category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ){}

    @Get('')
    getListAllCategories() {
        return this.categoryService.getAllCategories()
    }

    @Post('')
    store(@Body() categoryDto: CreateCategoryDto) {
        return this.categoryService.storeCategory(categoryDto)
    }

    // @Get(':id')
    // getOne(id: number) {
    //     return this.categoryService.getOneCategory(id)
    // }

    // @Put(':id')
    // update(id: number) {
    //     return this.categoryService.getOneCategory(id)
    // }

    // @Delete(':id')
    // destroy(id: number) {
    //     return this.categoryService.getOneCategory(id)
    // }


}
