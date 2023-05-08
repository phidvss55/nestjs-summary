import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import PostEntity from '../entity/post.entity';
import { Repository } from 'typeorm';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = app.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
