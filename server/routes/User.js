const UserModel = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const router = express.Router();

const Storage = multer.diskStorage({
  destination: "../client/public/uploads/profilephotos",
  filename: (req, file, cb) => {
    cb(null, new Date().getMilliseconds() + file.originalname);
  },
});
const upload = multer({ storage: Storage });

router.get("/", async (req, res) => {
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

router.get("/:id", (req, res) => {
  try {
    UserModel.findById(req.params.id, (err, user) => {
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

router.delete("/:id", (req, res) => {
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

router.put("/details/:id", (req, res) => {
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
router.put("/links/:id", upload.single("profilephoto"), (req, res) => {
  console.log(req.file);
  console.log(req.body.links);
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: {
      profilephoto: req.file.filename,
      links: req.body.links,
    },
  }).then((value) => {
    if (value) {
      res.send(value);
    } else {
      res.status(404).send("no user");
    }
  });
});
router.put("/links/:id", (req, res) => {
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

module.exports = router;
