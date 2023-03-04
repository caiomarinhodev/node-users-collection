require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.ldzbt5j.mongodb.net/Cloud0?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", async function (req, res) {
  res.json({ message: "Welcome to our API!" });
});

app.get("/api/users", async function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.status(404).json({ message: "No users found!" });
    }
    res.json(users);
  });
});

app.post("/api/users", async function (req, res) {
  var user = new User(req.body);

  user.save(function (err) {
    if (err) res.status(400).json({ message: "User not created!" });
    res.status(201).json({ message: "User created!", data: user });
  });
});

app.get("/api/users/:id", async function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.status(404).json({ message: "User not found!" });
    res.json(user);
  });
});

app.put("/api/users/:id", async function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.status(404).json({ message: "User not found!" });

    if (req.body.name) {
      user.name = req.body.name;
    } else {
      user.name = user.name;
    }

    if (req.body.email) {
      user.email = req.body.email;
    } else {
      user.email = user.email;
    }

    if (req.body.password) {
      user.password = req.body.password;
    } else {
      user.password = user.password;
    }

    user.save(function (err) {
      if (err) res.status(400).json({ message: "User not updated!" });
      res.json({ message: "User updated!", data: user });
    });
  });
});

app.delete("/api/users/:id", async function (req, res) {
  User.deleteOne({ _id: req.params.id }, function (err) {
    if (err) res.status(404).json({ message: "User not found!" });
    res.status(204).json({ message: "User deleted!" });
  });
});

module.exports = app;
