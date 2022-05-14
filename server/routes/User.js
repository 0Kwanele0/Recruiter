const UserModel = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const router = express.Router();
const authorize = require("../middleware/Authorize");
const jwt = require("jsonwebtoken");

const Storage = multer.diskStorage({
  destination: "../client/public/uploads/profilephotos",
  filename: (req, file, cb) => {
    cb(null, new Date().getMilliseconds() + file.originalname);
  },
});
const upload = multer({ storage: Storage });

router.get("/", authorize, async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
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
        res.send(user);
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
  upload.single("profilephoto"),
  (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, {
      $set: {
        profilephoto: req.file.filename,
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

//not sure about this route
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

router.put("/skillssedit/:id", authorize, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: {
      category: req.body.category,
      skills: req.body.skills,
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

router.put("/detailsedit/:id", authorize, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
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

router.put("/addprojects/:id", authorize, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
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

module.exports = router;
