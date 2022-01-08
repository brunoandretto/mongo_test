exports.createIndexes = function({ db = null, client = null }) {
  if (!db) {
    db = client.db(process.env.DB_NAME)
  }

  return db.collection('users').createIndex(
      { "document": 1 },
      { name: "users unique document", unique: true }
    )
}
