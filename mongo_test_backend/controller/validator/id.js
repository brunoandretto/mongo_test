const { InvalidIdException } = require('../../exception.js');

exports.validObjectId = function(id) {
  if (!/^[a-f0-9]{24}$/.test(id)) {
    throw new InvalidIdException();
  }
  return true;
};
