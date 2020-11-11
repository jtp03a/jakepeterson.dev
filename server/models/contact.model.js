const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactModel = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true},
  email: { type: String, required: true },
  message: { type: String },
  responded: { type: Boolean }
});

module.exports = mongoose.model('contact', contactModel);