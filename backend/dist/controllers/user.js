"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.login = exports.register = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const useremailexist = yield User_1.default.findOne({
            where: { email: req.body.email },
        });
        if (useremailexist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const userUsernameexist = yield User_1.default.findOne({
            where: { username: req.body.username },
        });
        if (userUsernameexist) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const salt = yield bcrypt.genSalt(10);
        req.body.password = yield bcrypt.hash(req.body.password, salt);
        yield User_1.default.create(req.body);
        res.json({
            message: "User created successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = yield bcrypt.compare(req.body.password, user === null || user === void 0 ? void 0 : user.getDataValue("password"));
        if (isMatch) {
            const idToken = (0, jwt_1.generateJWT)(user);
            res.json({ user, idToken });
        }
        else {
            res.status(404).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByPk(req.params.id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const user = (yield User_1.default.findByPk(req.params.id));
        if (files) {
            if (files["profile_image_url"]) {
                fs.renameSync(files["profile_image_url"][0].path, files["profile_image_url"][0].path +
                    "." +
                    files["profile_image_url"][0].mimetype.split("/")[1]);
                req.body.profile_image_url =
                    files["profile_image_url"][0].filename +
                        "." +
                        files["profile_image_url"][0].mimetype.split("/")[1];
                if (user.profile_image_url) {
                    fs.unlinkSync("public/images/" + user.profile_image_url);
                }
            }
            if (files["background_image_url"]) {
                fs.renameSync(files["background_image_url"][0].path, files["background_image_url"][0].path +
                    "." +
                    files["background_image_url"][0].mimetype.split("/")[1]);
                req.body.background_image_url =
                    files["background_image_url"][0].filename +
                        "." +
                        files["background_image_url"][0].mimetype.split("/")[1];
                if (user.background_image_url) {
                    fs.unlinkSync("public/images/" + user.background_image_url);
                }
            }
        }
        if (user) {
            yield user.update(req.body);
            res.json({
                message: "User updated successfully",
            });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (user) {
            res.json({
                message: "User deleted successfully",
            });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map