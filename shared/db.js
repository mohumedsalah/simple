const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = Promise;

module.exports = {
  connect: () => {
    const db = config.get('db');

    mongoose.connect(db, { useNewUrlParser: true, poolSize: 10 }, err => {
      if (err) {
        throw err;
      }
      console.log(`Connected to ${db}...`);
    });
  }
};
