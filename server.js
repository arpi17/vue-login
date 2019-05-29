const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
