const express = require('express');
const userController = require('./userController');
const validationUserDocument = require('./validation/validationUserDocument');
const validateLoginRequest = require('./validation/validateLoginRequest');
const middlewareValidation = require('../../middlewares/middlewareValidation');
var multer = require('multer');
const middlewareAuth = require('../../middlewares/middlewareAuth');
const validationOfAddingStatus = require('./validation/validationOfAddingStatus');

var upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post(
  '/register',
  upload.single('avatar'),
  middlewareValidation(validationUserDocument),
  userController.addOne
);

router.post(
  '/log-in',
  middlewareValidation(validateLoginRequest),
  userController.logIn
);

router.post(
  '/adding-status',
  [middlewareValidation(validationOfAddingStatus), middlewareAuth],
  userController.addingStatus
);

module.exports = { router };
