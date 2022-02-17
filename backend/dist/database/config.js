"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Follower_1 = __importDefault(require("../models/Follower"));
const Tweet_1 = __importDefault(require("../models/Tweet"));
const User_1 = __importDefault(require("../models/User"));
const Notification_1 = __importDefault(require("../models/Notification"));
const db = new sequelize_typescript_1.Sequelize(String(process.env.DATABASE_NAME), String(process.env.POSTGRES_USER), String(process.env.POSTGRES_PASS), {
    host: "localhost",
    dialect: "postgres",
    pool: {
        max: 520,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    /* logging: false, */
});
db.addModels([User_1.default, Tweet_1.default, Follower_1.default, Notification_1.default]);
exports.default = db;
//# sourceMappingURL=config.js.map