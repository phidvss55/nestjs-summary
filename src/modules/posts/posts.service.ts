import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ProducerService } from '../kafka/producer.service';

@Injectable()
export class PostsService {
  constructor(private readonly producerService: ProducerService) {}

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: 'Hello World',
        },
      ],
    });

    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
