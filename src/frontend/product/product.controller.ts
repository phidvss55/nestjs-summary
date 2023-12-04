import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('lists')
  async getListProducts() {
    return await this.productService.getListProducts();
  }

  @Post('store')
  store() {
    return this.productService.getListProducts();
  }

  @Get('show/:id')
  show() {
    return this.productService.getListProducts();
  }

  @Put(':id')
  update(id: number) {
    return this.productService.getListProducts();
  }

  @Delete(':id')
  delete(id: number) {
    return this.productService.getListProducts();
  }
}
