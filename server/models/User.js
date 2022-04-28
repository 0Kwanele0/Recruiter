const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilephoto: {
    data: Buffer,
    type: String,
  },
  bio: {
    type: String,
  },
  employmentstatus: {
    type: Boolean,
  },
  links: {
    type: Array,
  },
  skills: {
    type: Array,
  },
  projects: {
    type: Array,
  },
});

module.exports = new mongoose.model("Users", UserSchema);
