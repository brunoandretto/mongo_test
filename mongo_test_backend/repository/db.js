const { MongoClient } = require('mongodb');

const DB_USERNAME = process.env.DB_USERNAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const client = new MongoClient(
  `mongodb://${DB_USERNAME}:${process.env.DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { useUnifiedTopology: true }
);

module.exports = class Database {
  static name = DB_NAME;

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
};

process.on('exit', () => {
  console.log('############### Closing database connection... ###############');
  client.close();
});
