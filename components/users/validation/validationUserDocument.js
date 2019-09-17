const moment = require('moment');
const {
  requiredStringMethod,
  requiredDate,
  requiredInEnum,
  checkType,
  requiredPhoneNumber,
  validateEmail
} = require('./validationMethods');

const userSchema = async req => {
  const document = { ...req.body };
  req.body.avatar = req.file.path;
  req.body.birthdate = moment(document.birthdate, 'YYYY-MM-DD');

  let errors = {};
  errors.first_name = requiredStringMethod(document.first_name);
  errors.last_name = requiredStringMethod(document.last_name);
  errors.country_code = requiredInEnum(document.country_code, ['EG', 'US']);
  errors.phone_number = await requiredPhoneNumber(document.phone_number);
  errors.gender = requiredInEnum(document.gender, ['male', 'female']);
  errors.birthdate = requiredDate(document.birthdate);
  errors.avatar = checkType(req.file.originalname);
  errors.email = await validateEmail(document.email);
  errors.password = requiredStringMethod(document.password);

  return errors;
};

module.exports = userSchema;
