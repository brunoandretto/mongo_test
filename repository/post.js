const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const URI = 'mongodb://mongo_test_user:super_secure_passw0rd@mongo_test_db:27017/mongo_test';
const client = new MongoClient(URI, { useUnifiedTopology: true });

exports.findPostById = async function (id) {
  const _id = new ObjectId(id);
  return client.connect()
    .then(async () => {
      const database = client.db('mongo_test');
      const posts = database.collection('posts');
      const query = { _id: _id };
      return await posts.findOne(query);
    });
};

process.on('exit', () => {
  client.close();
})
