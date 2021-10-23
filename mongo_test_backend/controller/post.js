const idValidator = require('./validator/id.js');
const postValidator = require('./validator/post.js');
const postRepository = require('../repository/post.js');

exports.findPostById = function (path) {
  const id = path.split('/')[2].toLowerCase();
  if (!idValidator.validObjectId(id)) {
    return badRequestResponse();
  }
  return postRepository.findPostById(id)
    .then((result) => {
      if (result) {
        return {code: 200, body: result};
      }
      return {code: 404, body: {message: 'Post not found'}};
    }).catch((error) => {
      console.log('##### Exception caught at findPostById: #####');
      console.log(error);
      return internalErrorResponse();
    });
};

exports.createPost = function (_path, _queryString, body) {
  const parameters = postValidator.validPost(body);
  if (!parameters) {
    return badRequestResponse();
  }
  return postRepository.createPost(parameters)
    .then((result) => {
      return {code: 201, body: result};
    }).catch((error) => {
      console.log('##### Exception caught at createPost: #####');
      console.log(error);
      return internalErrorResponse();
    });
};

function badRequestResponse() {
  return {code: 400, body: {message: 'Invalid parameters' }};
}

function internalErrorResponse() {
  return {code: 500, body: {message: 'Internal Server Error'}};
}
