import { Sequelize } from "sequelize-typescript";
import Follower from "../models/Follower";
import Tweet from "../models/Tweet";
import User from "../models/User";
import Notification from "../models/Notification";

const db = new Sequelize(
  String(process.env.DATABASE_NAME),
  String(process.env.POSTGRES_USER),
  String(process.env.POSTGRES_PASS),
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 520,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    /* logging: false, */
  }
);

db.addModels([User, Tweet, Follower, Notification]);

export default db;
