const UserModel = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const router = express.Router();
const authorize = require("../middleware/Authorize");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../vars/.env" });
var CryptoJS = require("crypto-js");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profilephoto") {
      cb(null, "../client/public/uploads/profilephotos");
    }
    if (file.fieldname === "resume") {
      cb(null, "../client/public/uploads/resumes");
    }
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getMilliseconds() + file.originalname);
  },
});
const upload = multer({ storage: Storage });

router.get("/", async (req, res) => {
  const users = await UserModel.find();
  const filtered = users.map((item) => {
    const changed = {
      _id: item._id,
      firstname: item.firstname,
      lastname: item.lastname,
      profilephoto: item.profilephoto,
      skills: item.skills,
      experience: item.experience,
      bio: item.bio,
      country: item.country,
      category: item.category,
      city: item.city,
    };
    return changed;
  });
  res.send(filtered);
});

router.post("/register", (req, res) => {
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
          UserModel.find({ email: req.body.email }, (err, user) => {
            if (user.length > 0) {
              res.status(401).send({ msg: "User already exist" });
            } else {
              const user = new UserModel(data);
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

router.post("/login", (req, res) => {
  try {
    UserModel.find({ email: req.body.email }, (err, user) => {
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

router.get("/:id", authorize, (req, res) => {
  try {
    UserModel.findById(req.params.id, (err, user) => {
      if (!user) {
        res.status(404).send({ msg: "User not found" });
      } else {
        const filtered = {
          _id: user._id,
          firstname: user.firstname,
          email: user.email,
          profilephoto: user.profilephoto,
          lastname: user.lastname,
          skills: user.skills,
          experience: user.experience,
          bio: user.bio,
          projects: user.projects,
          country: user.country,
          city: user.city,
          resume: user.resume,
          links: user.links,
          category: user.category,
        };
        res.send(filtered);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", authorize, (req, res) => {
  try {
    UserModel.findByIdAndDelete(req.params.id, (err, done) => {
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

router.put("/details/:id", authorize, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: {
      category: req.body.category,
      skills: req.body.skills,
      bio: req.body.bio,
      experience: req.body.experience,
    },
  }).then((value) => {
    if (value) {
      res.send(value);
    } else {
      res.status(404).send("no user");
    }
  });
});

router.put(
  "/links/:id",
  authorize,
  upload.fields([
    { name: "profilephoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files.profilephoto[0]);
    UserModel.findByIdAndUpdate(req.params.id, {
      $set: {
        profilephoto: req.files.profilephoto[0].filename,
        resume: req.files.resume[0].filename,
        links: JSON.parse(req.body.links),
      },
    }).then((value) => {
      if (value) {
        res.send(value);
      } else {
        res.status(404).send("no user");
      }
    });
  }
);

//Add links without image
router.put("/links/:id", authorize, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: { links: req.body.data },
  })
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/linksedit/:id", authorize, (req, res) => {
  console.log("body: ", req.body);
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: { links: req.body },
  })
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/skillsedit/:id", authorize, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: {
      category: req.body.category,
      skills: req.body.skills,
      experience: req.body.experience,
    },
  })
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(401).send({ msg: err.message });
    });
});

router.put("/detailsedit/:id", authorize, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      country: req.body.country,
      city: req.body.city,
      bio: req.body.bio,
    },
  }).then((value) => {
    if (value) {
      res.send(value);
    } else {
      res.status(404).send("no user");
    }
  });
});

router.put("/addproject/:id", authorize, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $push: {
      projects: req.body.project,
    },
  }).then((value) => {
    if (value) {
      res.send(value);
    } else {
      res.status(404).send("no user");
    }
  });
});

router.put("/deleteproject/:id", authorize, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $pull: {
      projects: { title: req.body.projectTitle },
    },
  }).then((value) => {
    if (value) {
      res.send(value);
    } else {
      res.status(404).send("no user");
    }
  });
});
router.put("/userpassword/:id", (req, res) => {
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
          UserModel.findByIdAndUpdate(instr, {
            $set: {
              password: data.password,
            },
          }).then((value) => {
            if (value) {
              res.send(value);
            } else {
              res.status(404).send("no user");
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "photizotradinginstitution@gmail.com",
    pass: "kfzuroluicokeaij",
  },
});

router.post("/resetpassword/", (req, res) => {
  UserModel.find({ email: req.body.email }).then((value) => {
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
        html: `<div><h3>Hello! You're about to reset your password</h3><a href="http://localhost:3000/userpassword/${instr}">Reset Your Password</a></div>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(401).send({ msg: "Email not sent!" });
        } else {
          res.status(200).send(info.response);
        }
      });
    } else {
      console.log("nopps");
      res.status(404).send({ msg: "User not found!" });
    }
  });
});

module.exports = router;
