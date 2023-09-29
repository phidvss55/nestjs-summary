import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/CreateProductDto.dto';
import UpdatePostDto from './dto/UpdateProductDto.dto';

@Injectable()
export class ProductService {
  @InjectRepository(ProductEntity)
  private productRepository: Repository<ProductEntity>;

  getListProducts() {
    return this.productRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.productRepository.findOne({
      where: { id },
    });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.productRepository.create(post);
    await this.productRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.productRepository.update(id, post);
    const updatedPost = await this.productRepository.findOne({
      where: { id },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.productRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
