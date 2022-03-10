
const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize('postgres://tarifel:t4r1f3l@localhost:5432/tarifel');
const DataxmstnSchema = sequelize.define('Data_xm_stn', {
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
