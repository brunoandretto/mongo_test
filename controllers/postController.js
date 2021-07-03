const idValidator = require('./validators/id.js');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const URI = 'mongodb://mongo_test_user:super_secure_passw0rd@mongo_test_db:27017/mongo_test';
const client = new MongoClient(URI, { useUnifiedTopology: true });

exports.findPostById = async function (path, ...ignore) {
  return client.connect().then(async () => {
    const id = path.split('/')[2].toLowerCase();
    if (!idValidator.validObjectId(id)) {
      return {code: 400, body: {message: 'Invalid parameters' }};
    }
    const _id = new ObjectId(id);
    const database = client.db('mongo_test');
    const posts = database.collection('posts');
    const query = { _id: _id };
    const result = await posts.findOne(query);
    if (result) {
      return {code: 200, body: result}
    }
    return {code: 404, body: {message: 'Post not found'}}

  }).catch((error) => {
    console.log('##### Exception caught at findPostById: #####');
    console.log(error);
    return {code: 500, body: {message: 'Internal Server Error'}};
  })
};

process.on('exit', () => {
  client.close();
})
