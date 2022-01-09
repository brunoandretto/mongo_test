exports.ok = function(body) {
  return {code: 200, body: body};
};

exports.okCreated = function(body) {
  return {code: 201, body: body};
};

exports.badRequest = function(message=null) {
  if(!message) {
    message = 'Invalid Parameters';
  }
  return {code: 400, body: {message: message }};
};

exports.internalServerError = function() {
  return {code: 500, body: {message: 'Internal Server Error'}};
};

exports.notFound = function() {
  return {code: 404, body: {message: 'Not Found'}};
};
