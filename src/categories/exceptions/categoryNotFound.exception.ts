import { NotFoundException } from '@nestjs/common';

class CategoryNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Category of id ${id} is not found`);
  }
}

export default CategoryNotFoundException;
