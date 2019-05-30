const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// User Model
const User = require("./UserModel");

mongoose
  .connect(require("./config/keys").mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes

app.get("/users", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err));
});

app.post("/users/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ username: "User not found" });
    }
    bcrypt.compare(password, user.password).then(isCorrect => {
      if (!isCorrect) {
        return res.status(400).json({ password: "Incorrect password" });
      } else {
        return res.json({ user: user.username });
      }
    });
  });
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
