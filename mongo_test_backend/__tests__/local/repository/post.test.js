const { ObjectId } = require('mongodb');

const Database = require('../../../repository/db.js');
const DatabaseCleaner = require('../../../../jest_global_config/database_cleaner.js');
const postRepository = require('../../../repository/post.js');

describe('findPostById', () => {
  beforeEach(async () => {
    await DatabaseCleaner.dropCollections(Database);
  });

  describe('when post exists', () => {
    test('returns object', () => {
      const id = '60c4f8e061f566c252bd3ef4';
      const post = {
        '_id': new ObjectId(id),
        'name': 'Jonas',
        'document': '0123456789',
        'birthdate': new Date('1991-05-24T00:00:00Z000'),
        'createdAt': new Date(),
        'updatedAt': new Date(),
        'deleted': false,
      };

      return Database.instance().then((client) => {
        const database = client.db(Database.name);
        return database.collection('posts').insertOne(post).then(() => {
          return postRepository.findPostById(id).then((result) => {
            expect(String(result['_id'])).toMatch(id);
          });
        });
      });
    });
  });

  describe('when post does not exist', () => {
    test('returns null', () => {
      const id = '60c4f8e061f566c252bd3ef4';

      return postRepository.findPostById(id).then((result) => {
        expect(result).toStrictEqual(null);
      });
    });
  });
});
