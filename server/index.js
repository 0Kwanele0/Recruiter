const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const App = express();

App.use(cors());

mongoose.connect(process.env.MONGO_URL, {}, (err) => {
  if (!err) {
    console.log("Connected to DataBase");
  } else {
    console.log(err);
  }
});

App.get("/", (req, res) => {
  res.send("Hello from the other side!");
});

App.listen(3001, () => {
  console.log("Server Running...");
});
