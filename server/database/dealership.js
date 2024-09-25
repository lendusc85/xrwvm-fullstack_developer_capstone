const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dealerships = new Schema({
	id: {
    type: Number,
    required: true,
	},
	city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  long: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
  },
  fullName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('dealerships', dealerships);
