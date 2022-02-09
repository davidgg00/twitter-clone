"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.post("/login", users_1.login);
router.post("/register", users_1.register);
router.get("/getUser/:id", users_1.getUser);
router.get("/getAllUsers", users_1.getAllUsers);
module.exports = router;
//# sourceMappingURL=users.js.map