const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/User");
const recruiterRouter = require("./routes/Recruiter");
dotenv.config({ path: "./vars/.env" });
const App = express();
App.use(express.json());

// App.use(cors());
App.use(cors({ origin: "https://devrecruiter.vercel.app" }));

mongoose.connect(process.env.MONGO_URL, {}, (err) => {
  if (!err) {
    console.log("Connected to DataBase");
  } else {
    console.log(err);
  }
});
App.use("/user/", routes);
App.use("/recruiter/", recruiterRouter);

App.listen(process.env.PORT || 3001, () => {
  console.log("Server Running...");
});
