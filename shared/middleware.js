var cors = require('cors');
var helmet = require('helmet');
var bodyParser = require('body-parser');
const express = require('express');

module.exports = app => {
  app.use(express.static('.'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
};
