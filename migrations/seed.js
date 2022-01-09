const { MongoClient } = require('mongodb');
const { createIndexes } = require('./create_indexes');
const { createUser } = require('./create_user');

const DB_URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`
const client = new MongoClient(DB_URI);

client.connect()
  .then(() => createIndexes({client: client}))
  .then(() => createUser(client))
  .then(() => client.close())

process.on('exit', () => {
  console.log('#################### Ended seed script. ####################')
})
