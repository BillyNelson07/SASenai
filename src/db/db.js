import "dotenv/config";
import { Sequelize } from "sequelize";
import database from "../config/databaseConfig.js";

const sequelize = new Sequelize(
  database.name,
  database.user,
  database.password,
  {
    host: database.host,
    port: database.port,
    dialect: "postgres",
    logging: false,
  },
);

export default sequelize;
