const mongoose = require('mongoose');

const { Schema } = mongoose;
const user = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true
    },
    last_name: {
      type: String,
      trim: true,
      required: true
    },
    country_code: {
      type: String,
      enum: ['EG', 'US']
    },
    phone_number: {
      type: String,
      minlength: 10,
      maxlength: 15,
      unique: true
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    birthdate: {
      required: true,
      type: Date
    },
    avatar: {
      required: true,
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    autoIndex: true
  }
);

module.exports = mongoose.model('user', user);
