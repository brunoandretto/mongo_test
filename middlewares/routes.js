const controllers = require('../controllers');

const getRoutes = new Map([
  // Posts routes:
  [/^\/post\/[a-f0-9]{24}\/?$/, controllers.postController.findPostById],
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
