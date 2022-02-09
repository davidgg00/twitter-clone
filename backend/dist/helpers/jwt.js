"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jwt = require("jsonwebtoken");
const generateJWT = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        expiresIn: "1h",
    }, process.env.SECRET_KEY);
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=jwt.js.map