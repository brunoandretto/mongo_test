const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const URI = 'mongodb://mongo_test_user:super_secure_passw0rd@mongo_test_db:27017/mongo_test';
const client = new MongoClient(URI, { useUnifiedTopology: true });

module.exports = {
  findPostById: async function (...args) {
    return client.connect().then(async () => {
      const id = args[0].split('/')[2];
      const _id = new ObjectId(id);
      const database = client.db('mongo_test');
      const posts = database.collection('posts');
      const query = { _id: _id };
      const result = await posts.findOne(query);
      return result ? result : {};
    }).catch((error) => {
      console.log('##### Exception caught at findPostById: #####');
      console.log(error);
      return { code: 500, message: "Internal Server Error" };
    })
  }
};

process.on('exit', () => {
  client.close();
})
