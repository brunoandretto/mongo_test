const { ObjectId } = require('mongodb');

const Database = require('./db.js');

exports.findPostById = function (id) {
  const _id = new ObjectId(id);
  return Database.instance()
    .then((client) => {
      const database = client.db(Database.name);
      const posts = database.collection('posts');
      const query = { _id: _id };
      return posts.findOne(query);
    });
};

exports.createPost = function (attributes) {
  return Database.instance()
    .then((client) => {
      const database = client.db(Database.name);
      const posts = database.collection('posts');
      return posts.insertOne(attributes);
    })
    .then(() => {
      return attributes;
    });
};
