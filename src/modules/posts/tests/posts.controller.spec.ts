import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import PostEntity from '../entity/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../../modules/users/users.service';
import User from '../../../modules/users/entity/user.entity';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: PostsService,
      useFactory: () => ({
        saveNote: jest.fn(() => []),
        findAllNotes: jest.fn(() => []),
        findOneNote: jest.fn(() => {}),
        updateNote: jest.fn(() => {}),
        deleteNote: jest.fn(() => {}),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        ApiServiceProvider,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = app.get<PostsController>(PostsController);
    service = app.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
