const idValidator = require('../../../../controller/validator/id.js');
const { InvalidIdException } = require('../../../../exception.js');

test('returns true if id has 24 digits from a through f and 0 through 9', () => {
  const result = idValidator.validObjectId('60c4f8e061f566c252bd3ef4');

  expect(result).toBe(true);
});

test('returns false if id has invalid characters', () => {
  expect(() => {
    idValidator.validObjectId('$%c4f8e061f566c252bd3ef4');
  }).toThrow(InvalidIdException);
});

test('returns false if id has invalid length', () => {
  expect(() => {
    idValidator.validObjectId('60c4f8e061f566c252bd3ef4123');
  }).toThrow(InvalidIdException);
});
