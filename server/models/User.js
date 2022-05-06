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
  profilephoto: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  experience: {
    type: Number,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  links: {
    type: Array,
  },
  skills: {
    type: Array,
  },
  field: {
    type: String,
  },
  projects: {
    type: Array,
  },
});

module.exports = new mongoose.model("Users", UserSchema);
