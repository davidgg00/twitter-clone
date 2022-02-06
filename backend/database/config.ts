import { Sequelize } from "sequelize";

const db = new Sequelize(
  String(process.env.DATABASE_NAME),
  String(process.env.POSTGRES_USER),
  String(process.env.POSTGRES_PASS),
  {
    host: "localhost",
    dialect: "postgres",
    /*  logging: false, */
  }
);

export default db;
