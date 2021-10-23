const Database = require('../../../repository/db.js');
const DatabaseCleaner = require('../../../../jest_global_config/database_cleaner.js');
const userRepository = require('../../../repository/user.js');

describe('createUser', () => {
  beforeEach(async () => {
    await DatabaseCleaner.dropCollections(Database);
  });

  test('returns created object', () => {
    const input = {
      'name': 'Name',
      'surname': 'Surname',
      'document': '0123456789',
      'birthdate': new Date('1989-01-01T00:00:00Z000'),
      'createdAt': new Date(),
      'updatedAt': new Date(),
      'deleted': false,
    };

    return userRepository.createUser(input).then((result) => {
      expect(input).toStrictEqual(result);
    });
  });
});
