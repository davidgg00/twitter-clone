"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(String(process.env.DATABASE_NAME), String(process.env.POSTGRES_USER), String(process.env.POSTGRES_PASS), {
    host: "localhost",
    dialect: "postgres",
    /*  logging: false, */
});
exports.default = db;
//# sourceMappingURL=config.js.map