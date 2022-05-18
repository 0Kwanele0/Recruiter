const RecruiterModel = require("../models/Recruiter");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const recruiterRouter = express.Router();
require("dotenv").config({ path: "../vars/.env" });
const authorize = require("../middleware/Authorize");
var CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");

recruiterRouter.get("/", authorize, async (req, res) => {
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
  } catch (err) {}
});

recruiterRouter.get("/:id", authorize, (req, res) => {
  try {
    RecruiterModel.findById(req.params.id, (err, user) => {
      if (!user) {
        res.send({ msg: "User not found" });
      } else {
        res.send(user);
      }
    });
  } catch (err) {}
});

recruiterRouter.delete("/:id", authorize, (req, res) => {
  try {
    RecruiterModel.findByIdAndDelete(req.params.id, (err, done) => {
      if (err) {
        throw err;
      } else {
        res.send("Deleted user");
      }
    });
  } catch (err) {
    res.send("Failed to delete user");
  }
});

recruiterRouter.put("/:id", authorize, (req, res) => {
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

recruiterRouter.put("/recruiterpassword/:id", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        const data = {
          password: hash,
        };
        try {
          const decrypted = CryptoJS.AES.decrypt(
            decodeURIComponent(req.params.id),
            "Secret Passphrase"
          );
          const instr = decrypted.toString(CryptoJS.enc.Utf8);
          RecruiterModel.findByIdAndUpdate(instr, {
            $set: {
              password: data.password,
            },
          })
            .then((value) => {
              if (value) {
                res.status(200).send(value);
              } else {
                res.status(404).send("no user");
              }
            })
            .catch((err) => {
              res.status(404).send("no user");
            });
        } catch (err) {
          res.send({ msg: "Cant save user" });
        }
      });
    }
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "photizotradinginstitution@gmail.com",
    pass: "kfzuroluicokeaij",
  },
});

recruiterRouter.post("/resetpassword/", (req, res) => {
  RecruiterModel.find({ email: req.body.email }).then((value) => {
    if (value.length > 0) {
      const encrypted = CryptoJS.AES.encrypt(
        `${value[0]._id}`,
        "Secret Passphrase"
      );
      const instr = encodeURIComponent(encrypted.toString());
      const mailOptions = {
        from: "photizotradinginstitution@gmail.com",
        to: value[0].email,
        subject: "Password reset - Recriter",
        html: `<div><h3>Hello! You're about to reset your password</h3><a href="http://localhost:3000/recruiterpassword/${instr}">Reset Your Password</a></div>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(401).send({ msg: "Email not sent!" });
        } else {
          res.status(200).send({ msg: info.response });
        }
      });
    } else {
      res.status(404).send({ msg: "User not found!" });
    }
  });
});

module.exports = recruiterRouter;
