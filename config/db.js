
const { Sequelize } = require('sequelize');
request('dotenv').config({path:'variables.env'});
const conectarDB = async() => {
const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres'});
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
      }
}
module.exports = conectarDB;