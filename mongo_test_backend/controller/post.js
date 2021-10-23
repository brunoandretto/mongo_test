const idValidator = require('./validator/id.js');
const postValidator = require('./validator/post.js');
const postRepository = require('../repository/post.js');
const response = require('./response.js');
const { MissingRequiredFieldsException, InvalidIdException } = require('../exception.js');

exports.findPostById = function (path) {
  try {
    const id = path.split('/')[2].toLowerCase();
    idValidator.validObjectId(id);
    return postRepository.findPostById(id)
      .then((result) => {
        if (result) {
          return response.ok(result);
        }
        return response.notFound();
      }).catch((error) => {
        console.log(error);
        return response.internalServerError();
      });
  } catch(error) {
    if (error instanceof InvalidIdException) {
      return response.badRequest(error.message);
    } else {
      console.log(error);
      return response.internalServerError();
    }
  }
};

exports.createPost = function (_path, _queryString, body) {
  try {
    const parameters = postValidator.validPost(body);
    return postRepository.createPost(parameters)
      .then((result) => {
        return response.okCreated(result);
      }).catch((error) => {
        console.log(error);
        return response.internalServerError();
      });
  } catch(error) {
    if (error instanceof MissingRequiredFieldsException) {
      return response.badRequest(error.message);
    } else {
      console.log(error);
      return response.internalServerError();
    }
  }
};
