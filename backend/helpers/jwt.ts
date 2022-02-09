const jwt = require("jsonwebtoken");
export const generateJWT = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      expiresIn: "1h",
    },
    process.env.SECRET_KEY
  );
};
