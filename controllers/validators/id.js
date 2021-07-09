exports.validObjectId = function (id) {
  return /^[a-f0-9]{24}$/.test(id) ? true : false;
};
