import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './entities/category.entity';
import { Repository } from 'typeorm';
import CategoryNotFoundException from './exceptions/categoryNotFound.exception';

@Injectable()
export class CategoriesService {
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async create(categoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(categoryDto);

    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  findAll() {
    return this.categoryRepository.find({ relations: ['posts'] });
  }

  findOne(id: number) {
    const cate = this.categoryRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    if (cate) {
      return cate;
    }
    throw new CategoryNotFoundException(id);
  }

  async update(id: number, categoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    await this.categoryRepository.update(id, categoryDto);

    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoryNotFoundException(id);
  }

  async remove(id: number) {
    return;
  }
}
