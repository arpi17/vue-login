const express = require("express");
const mongoose = require("mongoose");

const app = express();
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
