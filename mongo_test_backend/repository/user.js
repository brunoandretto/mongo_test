const Database = require('./db.js');

exports.createUser = function(attributes) {
  return Database.instance()
    .then((client) => {
      const database = client.db(Database.name);
      const users = database.collection('users');
      return users.insertOne(attributes);
    })
    .then(() => {
      return attributes;
    });
};
