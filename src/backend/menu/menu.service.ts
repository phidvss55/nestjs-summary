import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Menu from 'src/entities/menu.entity';
import { Repository } from 'typeorm';
import CreateMenuDto from './dto/createMenu.dto';
import UpdateMenuDto from './dto/updateMenu.dto';

@Injectable()
export class MenuService {
  @InjectRepository(Menu)
  private menuRepository: Repository<Menu>;

  async getListMenus(paging: any, filters: any) {
    const condition: any = {};
    if (filters.hot) {
      condition.c_hot = filters.hot;
    }

    if (filters.status) {
      condition.c_status = filters.status;
    }

    return await this.menuRepository.findAndCount({
      where: condition,
      take: paging.page_size,
      skip: (paging.page - 1) * paging.page_size,
    });
  }

  async store(menuDto: CreateMenuDto) {
    const newData = await this.menuRepository.create(menuDto);
    return await this.menuRepository.save(newData);
  }

  async show(id: number) {
    return await this.menuRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateMenuDto) {
    await this.menuRepository.update(id, data);
    return await this.show(id);
  }

  async destroy(id: number) {
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException(id);
    }

    return await this.menuRepository.delete(id);
  }
}
