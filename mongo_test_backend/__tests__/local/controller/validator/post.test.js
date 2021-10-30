const postValidator = require('../../../../controller/validator/post.js');
const { MissingRequiredFieldsException } = require('../../../../exception.js');

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
    };
    const exptectedResponse = {
      title: 'ok',
      short_description: 'ok',
      content: 'ok',
      reactions: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    };

    const result = postValidator.validPost(input);

    expect(result).toStrictEqual(exptectedResponse);
  });
});

describe('invalid post', () => {
  test('returns false if missing title field', () => {
    const input = {
      short_description: 'ok',
      content: 'ok'
    };

    expect(() => {
      postValidator.validPost(input);
    }).toThrow(MissingRequiredFieldsException);
  });

  test('returns false if missing short_description field', () => {
    const input = {
      title: 'ok',
      content: 'ok'
    };

    expect(() => {
      postValidator.validPost(input);
    }).toThrow(MissingRequiredFieldsException);
  });

  test('returns false if missing content field', () => {
    const input = {
      title: 'ok',
      short_description: 'ok'
    };

    expect(() => {
      postValidator.validPost(input);
    }).toThrow(MissingRequiredFieldsException);
  });
});
