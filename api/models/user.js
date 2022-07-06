const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  adress: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  jobTitle: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  about: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  );
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    photo: Joi.string(),
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    email: Joi.string().min(5).max(50).email(),
    password: Joi.string().min(5).max(255),
    phoneNumber: Joi.string().min(5).max(50),
    adress: Joi.string().min(5).max(50),
    jobTitle: Joi.string().min(5).max(50),
    about: Joi.string().min(5).max(255),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
