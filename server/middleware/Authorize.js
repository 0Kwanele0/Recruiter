require("dotenv").config({ path: "../vars/.env" });
const jwt = require("jsonwebtoken");


function authorize(req, res, next) {
  const authToken = req.headers["recruiter-x-auth-token"];
  if (authToken) {
    try {
      jwt.verify(authToken, process.env.JWT_TOKEN);
      next();
    } catch (err) {
      res.status(401).send(err.message);
      console.log("Wrong error");
    }
  }
}

module.exports = authorize;