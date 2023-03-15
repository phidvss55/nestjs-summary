import { InjectRepository } from "@nestjs/typeorm";
import CategoryEntity from "src/entities/category.entity";
import { Repository } from "typeorm";
import CreateCategoryDto from "./dto/createCategory.dto";

export class CategoryService {
  @InjectRepository(CategoryEntity)
  private categoryRepository: Repository<CategoryEntity>

  getAllCategories() {
    return this.categoryRepository.find()
  }

  async storeCategory(category: CreateCategoryDto) {
    let res = await this.categoryRepository.save(category)
    console.log(res)
  }

}