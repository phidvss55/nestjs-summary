import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) {}
    
    @Get('')
    async getListProducts() {
        return await this.categoryService.getListProducts()
    }

    @Post('')
    store() {
        return this.categoryService.getListProducts()
    }

    @Get(':id')
    show() {
        return this.categoryService.getListProducts()
    }

    @Put(':id')
    update(id: number) {
        return this.categoryService.getListProducts()
    }

    @Delete(':id')
    delete(id: number) {
        return this.categoryService.getListProducts()
    }
}
