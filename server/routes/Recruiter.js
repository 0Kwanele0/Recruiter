const RecruiterModel = require("../models/Recruiter");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const recruiterRouter = express.Router();
require("dotenv").config({ path: "../vars/.env" });
const authorize = require('../middleware/Authorize')

recruiterRouter.get("/",authorize, async (req, res) => {
  const users = await RecruiterModel.find();
  res.send(users);
});

recruiterRouter.post("/register", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        const data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
          country: req.body.country,
          city: req.body.city,
        };
        try {
          RecruiterModel.find({ email: req.body.email }, (err, user) => {
            if (user.length > 0) {
              res.status(401).send({ msg: "User already exist" });
            } else {
              const user = new RecruiterModel(data);
              user.save().then((user) => {
                jwt.sign(user.id, process.env.JWT_TOKEN, (err, token) => {
                  if (token) {
                    res.send({ user: user, token: token });
                  }
                });
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

recruiterRouter.post("/login", (req, res) => {
  try {
    RecruiterModel.find({ email: req.body.email }, (err, user) => {
      if (user.length > 0) {
        bcrypt.compare(req.body.password, user[0].password, (err, done) => {
          if (done) {
            jwt.sign(user[0].id, process.env.JWT_TOKEN, (err, token) => {
              if (token) {
                res.send({ user: user[0], token: token });
              }
            });
          } else {
            res.status(401).send({ msg: "Wrong password" });
          }
        });
      } else {
        res.status(404).send({ msg: "User doesnt exist" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

recruiterRouter.get("/:id", (req, res) => {
  try {
    RecruiterModel.findById(req.params.id, (err, user) => {
      if (!user) {
        res.send({ msg: "User not found" });
      } else {
        res.send(user);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

recruiterRouter.delete("/:id", (req, res) => {
  try {
    RecruiterModel.findByIdAndDelete(req.params.id, (err, done) => {
      if (err) {
        throw err;
      } else {
        res.send("Deleted user");
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Failed to delete user");
  }
});

recruiterRouter.put("/:id", (req, res) => {
  RecruiterModel.findByIdAndUpdate(req.params.id, {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      country: req.body.country,
      city: req.body.city,
    },
  }).then((value) => {
    if (value) {
      res.send(value);
    } else {
      res.status(404).send("no user");
    }
  });
});

module.exports = recruiterRouter;
