const isEmpty = require('lodash.isempty');
const validator = require('validator');

module.exports = function(req, res, next) {
  req.errors = {};
  let { username, password } = req.body;
  const ignoreWhitespace = { ignore_whitespace: true };

  username = !isEmpty(username) ? username : '';
  password = !isEmpty(password) ? password : '';

  // Username
  if (validator.isEmpty(username, ignoreWhitespace)) {
    req.errors.username = 'Username is required';
  }
  // Password
  if (validator.isEmpty(password)) {
    req.errors.password = 'Password is required';
  }

  if (!isEmpty(req.errors)) {
    return res.status(400).json(req.errors);
  }

  next();
};
