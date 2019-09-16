var cors = require('cors');
var helmet = require('helmet');
var bodyParser = require('body-parser');

module.exports = app => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
};
