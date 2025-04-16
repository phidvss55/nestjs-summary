import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }
}
