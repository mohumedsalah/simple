const mongoose = require('mongoose');

const { Schema } = mongoose;
const user = new Schema(
  {
    asked: {
      type: Number,
      default: 0
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    tags: [
      {
        type: String,
        minlength: 2,
        maxlength: 200,
        trim: true
      }
    ]
  },
  {
    timestamps: true,
    autoIndex: true
  }
);

module.exports = mongoose.model('user', user);
