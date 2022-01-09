exports.createUser = function(client) {
  const db = client.db(process.env.DB_NAME)
  return db.addUser(process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    roles: [{ role: 'readWrite', db: process.env.DB_NAME }]
  }).then((result) => {
    console.log('result', result)
    console.log('User created!')
    process.exit(0)
  }).catch((error) => {
    if (error['code'] !== 51003) {
      throw error
    }
    console.log('User already exists.')
    process.exit(0)
  })
}
