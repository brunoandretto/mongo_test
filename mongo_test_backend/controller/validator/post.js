const MANDATORY_FIELDS = ['title', 'short_description', 'content'];

exports.validPost = function (body) {
  const fields = (({ title, short_description, content }) => ({ title, short_description, content }))(body);
  if (!hasMandatoryFields(fields)) {
    return false;
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

function hasMandatoryFields(body) {
  return MANDATORY_FIELDS.every(key => body[key]);
}
