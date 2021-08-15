const postController = require('../../../controllers/post.js');
const postFixture = require('../fixtures/post.json');
const postRepository = require('../../../repository/post.js');

jest.mock('../../../repository/post.js')

describe('findPostById', () => {
  test('returns bad request response if invalid parameters', () => {
    const id = 'abc123';
    const input = `/post/${id}`;
    const expectedResult = {code: 400, body: {message: 'Invalid parameters'}};

    const result = postController.findPostById(input);
  
    expect(result).toStrictEqual(expectedResult);
  });
  
  test('returns ok response if post exists', () => {
    const id = '60c4f8e061f566c252bd3ef4';
    const input = `/post/${id}`;
    const mockResult = new Promise((resolve, reject) => {resolve()}).then(() => {return postFixture});
    postRepository.findPostById.mockResolvedValue(mockResult);
    const expectedResult = {code: 200, body: postFixture};
  
    return postController.findPostById(input).then((result) => {
      expect(result).toStrictEqual(expectedResult);
    });
  });

  test('returns not found response if post does not exist', () => {
    const id = '60c4f8e061f566c252bd3ef4';
    const input = `/post/${id}`;
    const mockResult = new Promise((resolve, reject) => {resolve()}).then(() => {return null});
    postRepository.findPostById.mockResolvedValue(mockResult);
    const expectedResult = {code: 404, body: {message: 'Post not found'}};
  
    return postController.findPostById(input).then((result) => {
      expect(result).toStrictEqual(expectedResult);
    });
  });

  test('returns internal error response if exception is raised', () => {
    const id = '60c4f8e061f566c252bd3ef4';
    const input = `/post/${id}`;
    const mockResult = new Promise((resolve, reject) => {resolve()}).then(() => {
      throw new Error('Error!')
    });
    postRepository.findPostById.mockResolvedValue(mockResult);
    const expectedResult = {code: 500, body: {message: 'Internal Server Error'}};
  
    return postController.findPostById(input).then((result) => {
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
