import User from "../models/User";

const jwt = require("jsonwebtoken");
export const generateJWT = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      expiresIn: "1h",
    },
    process.env.SECRET_KEY
  );
};
