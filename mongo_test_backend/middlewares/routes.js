const controllers = require('../controllers');

const getRoutes = new Map([
  // Health Check
  [/^\/$/, function () { return { code: 200 } }],

  // Posts routes:
  [/^\/post\/[a-zA-Z0-9]+\/?$/, controllers.postController.findPostById],
]);

module.exports = {
  GET: async function (path, queryString, body) {
    for (var [key, value] of getRoutes) {
      if (key.test(path)) {
        return await value(path, queryString, body);
      }
    }
  }
};
