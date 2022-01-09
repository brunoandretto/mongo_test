exports.InvalidIdException = function(message) {
  this.name = 'InvalidIdException';
  this.message = message || 'Invalid ID';
  this.stack = (new Error()).stack;
};

exports.MissingRequiredFieldsException = function(message) {
  this.name = 'MissingRequiredFieldsException';
  this.message = message || 'Missing required fields';
  this.stack = (new Error()).stack;
};

exports.InvalidDateException = function(message) {
  this.name = 'InvalidDateException';
  this.message = message || 'Invalid date';
  this.stack = (new Error()).stack;
};
