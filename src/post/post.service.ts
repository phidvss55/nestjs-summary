import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import Post from './entities/post.entity';
import PostNotFoundException from './exceptions/post_not_found.exception';

@Injectable()
export class PostService {
  @InjectRepository(Post)
  private postsRepository: Repository<Post>;

  async create(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);

    return newPost;
  }
  findAll() {
    return this.postsRepository.find();
  }
  async findOne(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (post) {
      return post;
    }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    throw new PostNotFoundException(id);
  }
  async update(id: number, postUpdated: UpdatePostDto) {
    const updatedPost = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!updatedPost) {
      throw new PostNotFoundException(id);
    }

    await this.postsRepository.update(id, postUpdated);

    return Object.assign(updatedPost, postUpdated);
  }
  async remove(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    console.log('deleteResponse', deleteResponse);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
    return 'Post is deleted';
  }
}
