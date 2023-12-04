import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ResponseData } from 'src/utils/responseData';
import { Paging } from 'src/utils/paging';
import CreateMenuDto from './dto/createMenu.dto';
import UpdateMenuDto from './dto/updateMenu.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('cms/menu')
@ApiTags('Backend/Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('lists')
  async getListMenus(@Query() query) {
    const paging = {
      page: query.page || 1,
      page_size: query.page_size || 10,
    };

    const filter = {
      hot: query.hot || null,
      status: query.status || null,
    };

    const [data, total] = await this.menuService.getListMenus(paging, filter);
    const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);
    return new ResponseData(200, data, 'Success', pagingData);
  }

  @Post('store')
  async createCategory(@Body() dataDto: CreateMenuDto) {
    return await this.menuService.store(dataDto);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const data = await this.menuService.show(Number(id));
    return new ResponseData(200, data);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() updateDataDto: UpdateMenuDto) {
    return this.menuService.update(Number(id), updateDataDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.menuService.destroy(id);
  }
}
