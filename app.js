const { MongoClient } = require("mongodb");
const Koa = require('koa');

const URI = "mongodb://mongo_test_user:super_secure_passw0rd@mongo_test_db:27017/mongo_test";
const client = new MongoClient(URI, { useUnifiedTopology: true });
const app = new Koa();

async function findPost() {
  return client.connect().then(async () => {
    const database = client.db('mongo_test');
    const posts = database.collection('posts');
    const query = { title: 'Post inicial' };
    return await posts.findOne(query);
  }).catch((error) => {
    console.log('##### Exception caught at findPost: #####')
    console.log(error)
    return { code: 500, message: "Internal Server Error" }
  })
}

app.use(async (ctx, next) => {
  ctx.body = await findPost();
  await next()
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));

process.on('exit', () => {
  client.close()
})

console.log('#################### Ended app script. ####################')
