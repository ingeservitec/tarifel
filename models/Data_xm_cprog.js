const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Data_xm_cprogSchema = db.define('Data_xm_cprog', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
agente:{type: DataTypes.STRING,allowNull: false,trim: true},
cargo_cprog_cop_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true}
})
module.exports = Data_xm_cprogSchema;
