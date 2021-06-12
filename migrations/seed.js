const { MongoClient } = require('mongodb');

const DB_URI = "mongodb://mongo_test_db:27017"
const DB_NAME = "mongo_test"
const client = new MongoClient(DB_URI);

// const db = mongo(DB_URI)

// const promisifyDB = db => method => (...args) => new Promise((resolve, reject) => db[method](...args, (err, res) => err ? reject(err) : resolve(res)))

// const db = Object.keys(dbSync).reduce((obj, key) => ({ ...obj, [key]: (...args) => new Promise((res, rej) => dbSync[key](...args, (err, result) => err ? reject(err) : resolve(result))) }), {})
// await db.addUser('mongo_test_user', 'super_secure_passw0rd')

async function createUser() {
  const db = client.db(DB_NAME)
  return db.addUser('mongo_test_user', 'super_secure_passw0rd', {
    roles: [{ role: 'readWrite', db: DB_NAME }]
  }).then((result) => {
    console.log('result', result)
    console.log('User created!')
  }).catch((error) => {
    if (error['code'] !== 51003) {
      throw error
    }
    console.log('User already exists.')
    process.exit(0)
  })
}

client.connect().then(() => createUser())

process.on('exit', () => {
  console.log('#################### Ended seed script. ####################')
})
