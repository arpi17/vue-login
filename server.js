const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// User Model
const User = require('./UserModel');

// Validators
const validateRegistration = require('./validators/register');
const validateLogin = require('./validators/login');

// Connect to database
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
        newUser.save().then(() => res.json({ success: true }));
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
      }
      const payload = {
        id: user._id,
        username: user.username
      };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h' }, (err, token) => {
        return res.json({ user: user.username, token });
      });
    });
  });
});

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist/'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
