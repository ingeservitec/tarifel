const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const AfacSchema = db.define('Data_xm_afac', {
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
