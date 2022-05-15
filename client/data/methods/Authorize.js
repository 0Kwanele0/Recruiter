import jwt from "express-jwt";

export default async function (token) {
  try {
    const verify = await jwt.verify(token, process.env.JWT_TOKEN);
    verify.then((data) => {
      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
}
