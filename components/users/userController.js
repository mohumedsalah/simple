const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('./userModel');

exports.addOne = async (req, res) => {
  try {
    const document = req.body;
    document.password = await bcrypt.hash(document.password, 4);
    const result = await UserModel.register(document);
    return res.status(200).json({
      id: result._id,
      first_name: result.first_name,
      last_name: result.last_name,
      country_code: result.country_code,
      phone_number: result.phone_number,
      gender: result.gender,
      birthdate: result.birthdate
    });
  } catch (e) {
    return res.status(500).json('error from data base');
  }
};

exports.logIn = async (req, res) => {
  try {
    const document = req.body;
    const user = await UserModel.findOne({
      phone_number: document.phone_number
    });
    if (!user) {
      return res.status(400).json('This Phone not register');
    }
    const ret = await bcrypt.compare(document.password, user.password);
    if (!ret) {
      return res.status(400).json('Phone number of password not correct');
    }
    const token = jwt.sign(
      {
        phone_number: document.phone_number,
        password: document.password
      },
      config.get('jwtPrivateKey')
    );
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json('error from data base');
  }
};
