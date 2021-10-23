const controllers = require('../controller');

const getRoutes = new Map([
  // Health Check
  [/^\/$/, function () { return { code: 200 }; }],

  // Posts routes:
  [/^\/post\/[a-zA-Z0-9]+\/?$/, controllers.postController.findPostById],
]);

const postRoutes = new Map([
  // Posts routes:
  [/^\/post\/?$/, controllers.postController.createPost],
]);


module.exports = {
  GET: async function (path, queryString, body) {
    for (var [key, value] of getRoutes) {
      if (key.test(path)) {
        return await value(path, queryString, body);
      }
    }
  },
  POST: async function (path, queryString, body) {
    for (var [key, value] of postRoutes) {
      if (key.test(path)) {
        return await value(path, queryString, body);
      }
    }
  }
};
