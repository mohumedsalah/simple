const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
  jwt.verify(req.body.token, config.get('jwtPrivateKey'), (err, value) => {
    if (!err) {
      req.body.user = { ...value };
      return next();
    } else {
      return res.status(400).json('invalid token');
    }
  });
};
