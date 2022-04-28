const UserModel = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        const data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
          location: req.body.location,
          skills: req.body.skills,
        };
        try {
          UserModel.find({ email: req.body.email }, (err, user) => {
            if (user.length > 0) {
              res.send("User already exist");
            } else {
              const user = new UserModel(data);
              user.save().then((user) => {
                res.send(user);
              });
            }
          });
        } catch (err) {
          console.log(err);
          res.send("Cant save user");
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  try {
    UserModel.find({ email: req.body.email }, (err, user) => {
      if (user.length > 0) {
        bcrypt.compare(req.body.password, user[0].password, (err, done) => {
          if (done) {
            res.send(user[0]);
          } else {
            res.send("Wrong password");
          }
        });
      } else {
        res.send("User doesnt exist");
      }
    });
  } catch (err) {}
});
module.exports = router;
