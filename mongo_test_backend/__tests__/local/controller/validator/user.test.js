const userValidator = require('../../../../controller/validator/user.js');
const { MissingRequiredFieldsException, InvalidDateException } = require('../../../../exception');

describe('valid user', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('returns object with default fields', () => {
    const input = {
      name: 'ok',
      surname: 'ok',
      document: '0123456789',
      birthDate: '1989-01-01T00:00:00.000Z'
    };
    const exptectedResponse = {
      name: 'ok',
      surname: 'ok',
      document: '0123456789',
      birthDate: new Date('1989-01-01T00:00:00.000Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    };

    const result = userValidator.validUser(input);

    expect(result).toStrictEqual(exptectedResponse);
  });
});

describe('invalid user', () => {
  test('throw exception when missing name field', () => {
    const input = {
      surname: 'ok',
      document: '0123456789',
      birthDate: '1989-01-01T00:00:00.000Z'
    };

    expect(() => {
      userValidator.validUser(input);
    }).toThrowError(MissingRequiredFieldsException);
  });

  test('throw exception when missing surname field', () => {
    const input = {
      name: 'ok',
      document: '0123456789',
      birthDate: '1989-01-01T00:00:00.000Z'
    };

    expect(() => {
      userValidator.validUser(input);
    }).toThrowError(MissingRequiredFieldsException);
  });

  test('throw exception when missing document field', () => {
    const input = {
      name: 'ok',
      surname: 'ok',
      birthDate: '1989-01-01T00:00:00.000Z'
    };

    expect(() => {
      userValidator.validUser(input);
    }).toThrowError(MissingRequiredFieldsException);
  });

  test('throw exception when missing birthDate field', () => {
    const input = {
      name: 'ok',
      surname: 'ok',
      document: '0123456789'
    };

    expect(() => {
      userValidator.validUser(input);
    }).toThrowError(MissingRequiredFieldsException);
  });

  test('throw exception when birthDate is invalid Date', () => {
    const input = {
      name: 'ok',
      surname: 'ok',
      document: '0123456789',
      birthDate: 'invalidDate'
    };

    expect(() => {
      userValidator.validUser(input);
    }).toThrowError(InvalidDateException);
  });
});
