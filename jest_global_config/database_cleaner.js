const { createIndexes } = require('../migrations/create_indexes');

module.exports = class DatabaseCleaner {
  static dropCollections(Database) {
    let database;
    return Database.instance()
      .then((client) => {
        return client.db(Database.name);
      })
      .then((db) => {
        database = db;
        return db.listCollections().toArray();
      })
      .then((collections) => {
        const promises = collections.map(function(coll) {
          return database.dropCollection(coll['name']);
        });
        return Promise.all(promises);
      })
      .then(() => {
        return createIndexes({ db: database });
      });
  }
};
