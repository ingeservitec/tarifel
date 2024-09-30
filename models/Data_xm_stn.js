
const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const DataxmstnSchema = db.define('Data_xm_stn', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
t_cop_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
t_prima_cop_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
Energia_sin_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
Ing_Reg_Bruto_T_cop:{type: DataTypes.STRING,allowNull: false,trim: true},
Ing_Compensar_T_cop:{type: DataTypes.STRING,allowNull: false,trim: true},
Ing_Reg_Neto_T_cop:{type: DataTypes.STRING,allowNull: false,trim: true},
delta_t_cop_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
})
module.exports = DataxmstnSchema;
