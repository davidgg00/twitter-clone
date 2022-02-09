import User from "../models/User";
const jwt = require("jsonwebtoken");

const jwtValidation = async (req: any, res: any, next: any) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "Access denied. No token provided." });
  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(404).json({ msg: "User not found" });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token invalid" });
  }
};

export default jwtValidation;
