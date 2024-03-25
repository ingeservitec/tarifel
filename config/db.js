
const { Sequelize } = require('sequelize');
// request('dotenv').config({path:'variables.env'});


const db = new Sequelize(process.env.URI, {
  logging: false, // Esto desactivará la impresión de consultas SQL en la consola
});
     
module.exports = db;
