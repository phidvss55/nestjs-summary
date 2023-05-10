import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../../modules/users/users.service';
import User from '../../../modules/users/entity/user.entity';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwtAuth.guard';
import { MockAuthGuard } from '../../../modules/auth/guards/mockAuth.guard';
import CreatePostDto from '../dto/createPost.dto';
import { PostEntity as Post } from './../entity/post.entity';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPost: CreatePostDto = {
    title: 'Title mock post',
    content: 'desc',
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: PostsService,
      useFactory: () => ({
        createPost: jest.fn(() => []),
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
    })
      .overrideProvider(JwtAuthGuard)
      .useValue(MockAuthGuard)
      .compile();

    controller = app.get<PostsController>(PostsController);
    service = app.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Post', () => {
    it('should create an post successfully', async () => {
      const results: Post = {
        id: 1,
        title: 'jungle',
        content: 'content',
      };

      // let createPostSpy = jest.spyOn(service, 'createPost');
      // createPostSpy.mockResolvedValue(results);

      jest.spyOn(service, 'createPost').mockImplementation(async () => results);

      expect(await controller.createPost(mockPost)).toBe(results);
    });
  });
});
