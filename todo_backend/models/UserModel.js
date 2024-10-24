// UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  image:{
    type: String,
  },

},  { timestamps: true }
);

const User = mongoose.model('users', userSchema);

module.exports = User;
