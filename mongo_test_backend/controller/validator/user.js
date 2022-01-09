const { MissingRequiredFieldsException, InvalidDateException } = require('../../exception.js');

const MANDATORY_FIELDS = ['name', 'surname', 'document', 'birthDate'];

exports.validUser = function(body) {
  let fields = (({ name, surname, document, birthDate }) => ({ name, surname, document, birthDate }))(body);
  if (!MANDATORY_FIELDS.every(key => fields[key])) {
    throw new MissingRequiredFieldsException();
  }

  const birthDate = new Date(fields.birthDate);
  if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
    throw new InvalidDateException();
  }
  fields.birthDate = birthDate;

  const defaultFields = {
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  };

  return {...fields, ...defaultFields};
};
