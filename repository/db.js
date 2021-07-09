const { MongoClient } = require('mongodb');

const DB_NAME = 'mongo_test'
const URI = `mongodb://mongo_test_user:super_secure_passw0rd@mongo_test_db:27017/${DB_NAME}`;
const client = new MongoClient(URI, { useUnifiedTopology: true });

module.exports = class Database {
  static name = DB_NAME

  static instance() {
    if (!this.connection) {
      this.connection = client.connect();
    }
    return this.connection;
  }

  static closeConnection() {
    if (this.connection) {
      client.close();
      this.connection = null;
    }
  }
}

process.on('exit', () => {
  console.log('############### Closing database connection... ###############')
  client.close();
})
