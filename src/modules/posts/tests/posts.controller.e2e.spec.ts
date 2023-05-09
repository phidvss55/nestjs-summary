import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { PostEntity as Post } from '../entity/post.entity';

describe('PostController (e2e)', () => {
  const postUrl = `http://localhost:5000/api/posts`;

  const mockPost: Post = {
    title: 'this is title',
    content: 'cotnent',
  };

  describe('Create Post (POST)', () => {
    it('it should throw error that unautheorized', () => {
      return request(postUrl)
        .post('')
        .set('Accept', 'application/json')
        .send(mockPost)
        .expect((response: request.Response) => {
          const { statusCode } = response.body;
          expect(statusCode).toBe(401);
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
