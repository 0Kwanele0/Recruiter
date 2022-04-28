const express = require("express");
const routes = express.Router();
const UserModel = require("../models/User");

routes.get("/", (req, res) => {
  try {
    UserModel.find().then((user) => {
      res.send(user);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = routes;
