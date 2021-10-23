const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const routes = require('./middleware/routes.js');

const app = new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
  const queryString = ctx.request.querystring ? ctx.request.querystring : '';
  const path = ctx.request.path ? ctx.request.path : '/';
  const body = ctx.request.body ? ctx.request.body : {};
  const method = ctx.request.method;

  if (typeof routes[method] !== 'function') {
    ctx.response.status = 405;
    ctx.body = {};
    return;
  }

  var result = await routes[method](path, queryString, body);
  ctx.response.status = result ? result['code'] : 404;
  ctx.body = result ? result['body'] : {};

  await next();
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
