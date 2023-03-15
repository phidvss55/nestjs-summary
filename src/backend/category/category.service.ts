import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CategoryEntity from "src/entities/category.entity";
import { Repository } from "typeorm";
import CreateCategoryDto from "./dto/createCategory.dto";
import UpdateCategoryDto from "./dto/updateCategory.dto";
import { CategoryNotFound } from "./exceptions/not_found.exception";

export class CategoryService {
  @InjectRepository(CategoryEntity)
  private categoryRepository: Repository<CategoryEntity>

  async getAllCategories(paging: any, filter: any) {
    let condition: any = {}
    if (filter.hot) {
      condition.c_hot = filter.hot
    }
    if (filter.status) {
      condition.c_status = filter.status
    }
    return await this.categoryRepository.findAndCount({
      where: condition,
      take: paging.page_size,
      skip: (paging.page - 1) * paging.page_size
    })
  }

  async storeCategory(category: CreateCategoryDto) {
    const cateEntity = await this.categoryRepository.create(category);
    return await this.categoryRepository.save(cateEntity);
  }

  async show(id: number) {
    let cate = await this.categoryRepository.findOne({ where: { id } })
    if (!cate) {
      throw new CategoryNotFound(id);
    }
    return cate;
  }

  async update(id: number, categoryData: UpdateCategoryDto) {
    let cate = await this.categoryRepository.findOne({ where: { id } })
    if (!cate) {
      throw new CategoryNotFound(id)
    }

    await this.categoryRepository.update(id, categoryData);
    return Object.assign(cate, categoryData)
  }

  async destroy(id: number) {
    let cate = await this.categoryRepository.findOne({ where: { id } })
    if (!cate) {
      throw new CategoryNotFound(id)
    }

    return await this.categoryRepository.delete(id);
  }
}