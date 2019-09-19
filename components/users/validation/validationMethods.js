const moment = require('moment');
const userService = require('../userService');

const requiredStringMethod = entity => {
  const errors = [];
  if (!entity) {
    errors.push({ error: 'required' });
  } else if (typeof entity !== 'string') {
    errors.push({ error: 'not string' });
  } else if (entity.trim() === '') {
    errors.push({ error: 'blank' });
  }
  return errors;
};
const requiredInEnum = (entity, arrayInclusion) => {
  const errors = [...requiredStringMethod(entity)];
  if (errors.length) {
    return errors;
  }
  const index = arrayInclusion.indexOf(entity);
  if (index === -1) {
    errors.push({ error: 'inclusion' });
  }
  return errors;
};

const requiredDate = date => {
  const errors = [...requiredStringMethod(date)];
  if (errors.length) {
    return errors;
  }
  let Date_ = moment(date, 'YYYY-MM-DD');
  const xx = moment().diff(Date_);
  if (xx <= 0) {
    errors.push({ error: 'future date' });
  }
  return errors;
};
const requiredPhoneNumber = async phone_number => {
  const errors = [...requiredStringMethod(phone_number)];
  if (errors.length) {
    return errors;
  }
  [...phone_number].forEach(char_Phone => {
    if (char_Phone < '0' || char_Phone > '9') {
      errors.push({ error: 'not_a_number', count: 10 });
      return;
    }
  });
  if (phone_number.length < 10) {
    errors.push({ error: 'too_short', count: 10 });
  }
  if (phone_number.length > 15) {
    errors.push({ error: 'too_long', count: 15 });
  }
  const ret = await userService.findUserWithQuery({ phone_number });
  if (ret) {
    errors.push({ error: 'taken' });
  }
  return errors;
};
const validateEmail = async email => {
  const errors = [];
  if (!email || typeof email !== 'string') {
    return errors;
  }
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const retValidEmail = re.test(String(email).toLowerCase());
  if (!retValidEmail) {
    errors.push({ error: 'invalid' });
  }
  const ret = await userService.findUserWithQuery({ email: email });
  if (ret) {
    errors.push({ error: 'taken' });
  }
  return errors;
};
const checkType = file => {
  let errors = [...objectValidation(file)];
  if (errors.length) {
    return errors;
  }
  const avatar = file.originalname;
  errors = [...errors, ...requiredStringMethod(avatar)];
  if (errors.length) {
    return errors;
  }

  const arrayName = avatar.split('.');
  const ext = arrayName[arrayName.length - 1].toLowerCase();
  if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
    errors.push({ error: 'invalid_content_type' });
  }
  return errors;
};

const objectValidation = value => {
  const errors = [];
  if (typeof value !== 'object') {
    errors.push({ error: 'blank' });
  }
  return errors;
};

module.exports = {
  objectValidation,
  requiredStringMethod,
  checkType,
  validateEmail,
  requiredPhoneNumber,
  requiredDate,
  requiredInEnum
};
