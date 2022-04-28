const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/User");
const approutes = require("./routes/App");
dotenv.config({ path: "./vars/.env" });
const App = express();
App.use(express.json());

App.use(cors());

mongoose.connect(process.env.MONGO_URL, {}, (err) => {
  if (!err) {
    console.log("Connected to DataBase");
  } else {
    console.log(err);
  }
});
App.use("/user/", routes);
App.use(approutes);

App.listen(3001, () => {
  console.log("Server Running...");
});
