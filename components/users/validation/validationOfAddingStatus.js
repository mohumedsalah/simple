const {
  requiredStringMethod,
  objectValidation
} = require('./validationMethods');

const userSchema = async req => {
  const document = { ...req.body };

  let errors = {};
  errors.phone_number = requiredStringMethod(document.phone_number);
  errors.token = requiredStringMethod(document.token);
  errors.status = objectValidation(document.status);
  return errors;
};

module.exports = userSchema;
