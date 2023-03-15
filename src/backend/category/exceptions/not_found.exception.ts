import { NotFoundException } from "@nestjs/common";

export class CategoryNotFound extends NotFoundException {
    constructor(id: number) {
        super(`Category of id ${id} is not found.`);
    }
}

export default CategoryNotFound;