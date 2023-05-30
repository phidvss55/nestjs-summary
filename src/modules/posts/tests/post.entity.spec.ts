import PostEntity from '../entity/post.entity';

describe('PostEntity', () => {
  let postEntity: PostEntity;

  beforeEach(async () => {
    postEntity = new PostEntity();
    postEntity.title = 'lorem 1';
    postEntity.content = 'desc';
  });

  describe('validatePost', () => {
    it('must have title and title must longer than 10 characters', () => {
      let res = postEntity.title.length;
      expect(res).toBeGreaterThanOrEqual(7);
    });
  });
});
