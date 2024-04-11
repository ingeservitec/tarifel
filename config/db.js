

const environment = process.env.NODE_ENV;


if (environment === "development") {
  require("dotenv").config({ path: "config/variablesDev.env" });
} else {
  require("dotenv").config({ path: "config/variablesPro.env" });
}


const { Sequelize } = require('sequelize');


const db = new Sequelize(
  process.env.DATA_BASE,
  process.env.USER_NAME_DB,
  process.env.PASS_DB,
  {
    host: process.env.HOST_DB,
    dialect: 'postgres',
    logging: false, // Desactivar el registro de consultas SQL
  }
);


module.exports = db;
