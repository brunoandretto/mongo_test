const { MissingRequiredFieldsException } = require('../../exception.js');

const MANDATORY_FIELDS = ['title', 'short_description', 'content'];

exports.validPost = function (body) {
  const fields = (({ title, short_description, content }) => ({ title, short_description, content }))(body);
  if (!MANDATORY_FIELDS.every(key => fields[key])) {
    throw new MissingRequiredFieldsException;
  }

  const defaultFields = {
    reactions: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  };
  return {...fields, ...defaultFields};
};
