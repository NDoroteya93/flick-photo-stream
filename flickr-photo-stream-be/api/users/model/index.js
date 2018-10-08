const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true }, 
  created: { type: String, required: true }, 
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' }, 
});

module.exports = mongoose.model('user', userModel);
