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
        res.send("User not found");
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

router.put("/field/:id", (req, res) => {
  UserModel.findById(req.params.id)
    .then(async (value) => {
      const newData = await value
        .updateOne({
          $set: { field: req.body.data },
        })
        .then((value) => {
          res.send(value);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});
router.put("/skills/:id", (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: { skills: req.body.data },
  })
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.send(err);
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
