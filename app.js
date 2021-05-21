const { MongoClient } = require("mongodb");
const Koa = require('koa');

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://api-user:qwerty@localhost:27017";

const client = new MongoClient(uri, { useUnifiedTopology: true });

const app = new Koa();

async function findPost() {
  await client.connect();
  const database = client.db('test');
  const posts = database.collection('posts');
  // Query for a movie that has the title 'Back to the Future'
  const query = { title: 'Post inicial' };
  return posts.findOne(query);
}

app.use(async (ctx, next) => {
  console.time('request')
  await next()
  console.timeEnd('request')
});

app.use(async (ctx, next) => {
  ctx.body = await findPost();
  await next()
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));

process.on('exit', () => {
  client.close()
})
