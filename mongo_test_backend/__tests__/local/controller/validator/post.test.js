const postValidator = require('../../../../controller/validator/post.js');

describe('valid post', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('returns object with default fields', () => {
    const input = {
      title: 'ok',
      short_description: 'ok',
      content: 'ok'
    }
    const exptectedResponse = {
      title: 'ok',
      short_description: 'ok',
      content: 'ok',
      reactions: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    }
  
    const result = postValidator.validPost(input);
  
    expect(result).toStrictEqual(exptectedResponse);
  });
});

describe('invalid post', () => {
  test('returns false if missing title field', () => {
    const input = {
      short_description: 'ok',
      content: 'ok'
    }
  
    const result = postValidator.validPost(input);
  
    expect(result).toBe(false);
  });
  
  test('returns false if missing short_description field', () => {
    const input = {
      title: 'ok',
      content: 'ok'
    }
  
    const result = postValidator.validPost(input);
  
    expect(result).toBe(false);
  });
  
  test('returns false if missing content field', () => {
    const input = {
      title: 'ok',
      short_description: 'ok'
    }
  
    const result = postValidator.validPost(input);
  
    expect(result).toBe(false);
  });
});
