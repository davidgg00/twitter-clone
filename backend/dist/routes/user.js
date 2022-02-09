"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const jwt_validation_1 = __importDefault(require("../middlewares/jwt-validation"));
const router = (0, express_1.Router)();
router.post("/login", user_1.login);
router.post("/register", user_1.register);
router.get("/getUser/:id", [jwt_validation_1.default], user_1.getUser);
router.get("/getAllUsers", [jwt_validation_1.default], user_1.getAllUsers);
router.put("/updateUser/:id", [jwt_validation_1.default], user_1.updateUser);
router.delete("/deleteUser/:id", [jwt_validation_1.default], user_1.deleteUser);
module.exports = router;
//# sourceMappingURL=user.js.map