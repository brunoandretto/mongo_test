const userValidator = require('./validator/user.js');
const userRepository = require('../repository/user.js');
const response = require('./response.js');

const { MissingRequiredFieldsException, InvalidDateException } = require('../exception.js');

exports.createUser = function(_path, _queryString, body) {
  try {
    const parameters = userValidator.validUser(body);
    return userRepository.createUser(parameters)
      .then((result) => {
        return response.okCreated(result);
      }).catch((error) => {
        console.log(error);
        return response.internalServerError();
      });
  } catch(error) {
    if (error instanceof MissingRequiredFieldsException || error instanceof InvalidDateException) {
      return response.badRequest(error.message);
    } else {
      console.log(error);
      return response.internalServerError();
    }
  }
};
