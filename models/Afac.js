const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize(process.env.URI);
const AfacSchema = sequelize.define('data_xm_afac', {
  // Model attributes are defined here
  anho: {
    type: DataTypes.NUMBER,
    allowNull: false,
    trim:true
  },
  mes: {
    type: DataTypes.NUMBER,
    allowNull: false,
    trim:true
  },
  comprasbolsa: {
    type: DataTypes.NUMBER,
    unique: true,
    allowNull: false,
    trim:true
    // allowNull defaults to true
  },
  empresa: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    trim:true
  }
}
);
module.exports = AfacSchema;
