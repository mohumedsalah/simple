const { requiredStringMethod } = require('./validationMethods');

const userSchema = async req => {
  const document = { ...req.body };

  let errors = {};
  errors.phone_number = requiredStringMethod(document.phone_number);
  errors.password = requiredStringMethod(document.password);
  return errors;
};

module.exports = userSchema;
