const { MongoClient } = require('mongodb');
const { createIndexes } = require('./create_indexes');
const { createUser } = require('./create_user');

const DB_URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`
const client = new MongoClient(DB_URI);

// const db = mongo(DB_URI)

// const promisifyDB = db => method => (...args) => new Promise((resolve, reject) => db[method](...args, (err, res) => err ? reject(err) : resolve(res)))

// const db = Object.keys(dbSync).reduce((obj, key) => ({ ...obj, [key]: (...args) => new Promise((res, rej) => dbSync[key](...args, (err, result) => err ? reject(err) : resolve(result))) }), {})
// await db.addUser('mongo_test_user', 'super_secure_passw0rd')

client.connect()
  .then(() => createIndexes({client: client}))
  .then(() => createUser(client))
  .then(() => client.close())

process.on('exit', () => {
  console.log('#################### Ended seed script. ####################')
})
