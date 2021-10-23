const userController = require('../../../controller/user.js');
const userFixture = require('../fixture/user.json');
const userRepository = require('../../../repository/user.js');

jest.mock('../../../repository/user.js');

describe('createUser', () => {
  describe('when missing mandatory parameters', () => {
    test('returns bad request response', () => {
      const input = {'test': 'invalid'};
      const expectedResult = {code: 400, body: {message: 'Missing required fields'}};

      const result = userController.createUser(null, null, input);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('when invalid birth date', () => {
    test('returns bad request response', () => {
      const input = {
        'name': 'Name',
        'surname': 'Surname',
        'document': '0123456789',
        'birthDate': '123invalidDate'
      };
      const expectedResult = {code: 400, body: {message: 'Invalid date'}};

      const result = userController.createUser(null, null, input);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('when valid payload', () => {
    test('returns ok response', () => {
      const input = {
        'name': 'Name',
        'surname': 'Surname',
        'document': '0123456789',
        'birthDate': '1989-01-01T00:00:00.000Z'
      };
      const mockResult = Promise.resolve(userFixture);
      userRepository.createUser.mockResolvedValue(mockResult);
      const expectedResult = {code: 201, body: userFixture};

      return userController.createUser(null, null, input).then((result) => {
        expect(result).toStrictEqual(expectedResult);
      });
    });
  });

  describe('when exception is raised', () => {
    test('returns internal error response', () => {
      const input = {
        'name': 'Name',
        'surname': 'Surname',
        'document': '0123456789',
        'birthDate': '1989-01-01T00:00:00.000Z'
      };
      const mockResult = Promise.reject(new Error('Error!'));
      userRepository.createUser.mockResolvedValue(mockResult);
      const expectedResult = {code: 500, body: {message: 'Internal Server Error'}};

      return userController.createUser(null, null, input).then((result) => {
        expect(result).toStrictEqual(expectedResult);
      });
    });
  });
});

