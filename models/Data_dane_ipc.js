const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Data_dane_ipcSchema = db.define('Data_dane_ipc', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
ipc:{type: DataTypes.FLOAT,allowNull: false,trim: true},

})
module.exports = Data_dane_ipcSchema;


