const postController = require('../../../controllers/post.js');
const postFixture = require('../fixtures/post.json');
const postRepository = require('../../../repository/post.js');

jest.mock('../../../repository/post.js');

describe('findPostById', () => {
  describe('when invalid parameters', () => {
    test('returns bad request response', () => {
      const id = 'abc123';
      const input = `/post/${id}`;
      const expectedResult = {code: 400, body: {message: 'Invalid parameters'}};

      const result = postController.findPostById(input);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('when post exists', () => {
    test('returns ok response', () => {
      const id = '60c4f8e061f566c252bd3ef4';
      const input = `/post/${id}`;
      const mockResult = Promise.resolve(postFixture);
      postRepository.findPostById.mockResolvedValue(mockResult);
      const expectedResult = {code: 200, body: postFixture};

      return postController.findPostById(input).then((result) => {
        expect(result).toStrictEqual(expectedResult);
      });
    });
  });

  describe('when post does not exist', () => {
    test('returns not found response', () => {
      const id = '60c4f8e061f566c252bd3ef4';
      const input = `/post/${id}`;
      const mockResult = Promise.resolve(null);
      postRepository.findPostById.mockResolvedValue(mockResult);
      const expectedResult = {code: 404, body: {message: 'Post not found'}};

      return postController.findPostById(input).then((result) => {
        expect(result).toStrictEqual(expectedResult);
      });
    });
  });

  describe('when exception is raised', () => {
    test('returns internal error response', () => {
      const id = '60c4f8e061f566c252bd3ef4';
      const input = `/post/${id}`;
      const mockResult = Promise.reject(new Error('Error!'));
      postRepository.findPostById.mockResolvedValue(mockResult);
      const expectedResult = {code: 500, body: {message: 'Internal Server Error'}};

      return postController.findPostById(input).then((result) => {
        expect(result).toStrictEqual(expectedResult);
      });
    });
  });
});
