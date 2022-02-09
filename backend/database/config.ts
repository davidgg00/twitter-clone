import { Sequelize } from "sequelize";

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

export default db;
