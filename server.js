const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// User Model
const User = require('./UserModel');

// Validators
const validateRegistration = require('./validators/register');
const validateLogin = require('./validators/login');

mongoose
  .connect(require('./config/keys').mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes

app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err));
});

app.post('/users/register', validateRegistration, (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (user) {
      req.errors.username = 'Username is already taken';
      return res.status(400).json(req.errors);
    }

    const newUser = new User({
      username,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => res.json(user));
      });
    });
  });
});

app.post('/users/login', validateLogin, (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (!user) {
      req.errors.username = 'User not found';
      return res.status(404).json(req.errors);
    }
    bcrypt.compare(password, user.password).then(isCorrect => {
      if (!isCorrect) {
        req.errors.password = 'Incorrect password';
        return res.status(400).json(req.errors);
      } else {
        return res.json({ user: user.username });
      }
    });
  });
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
