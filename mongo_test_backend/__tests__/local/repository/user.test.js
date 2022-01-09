const Database = require('../../../repository/db.js');
const DatabaseCleaner = require('../../../../jest_global_config/database_cleaner.js');
const userRepository = require('../../../repository/user.js');

beforeEach(async () => {
  await DatabaseCleaner.dropCollections(Database);
});

afterAll(async () => {
  await Database.closeConnection();
});

describe('createUser', () => {
  describe('when user does not exist', () => {
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

  describe('when user already exist', () => {
    test('raise exception', () => {
      const input = {
        'name': 'Name',
        'surname': 'Surname',
        'document': '0123456789',
        'birthdate': new Date('1989-01-01T00:00:00Z000'),
        'createdAt': new Date(),
        'updatedAt': new Date(),
        'deleted': false,
      };

      return Database.instance().then((client) => {
        const database = client.db(Database.name);
        return database.collection('users').insertOne(input).then(() => {
          input._id = undefined;
          return userRepository.createUser(input).catch((err) => {
            expect(err.toString()).toMatch(
              /users unique document dup key: { document: "0123456789" }/
            );
          });
        });
      });
    });
  });
});
