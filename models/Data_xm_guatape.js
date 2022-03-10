const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize('postgres://tarifel:t4r1f3l@localhost:5432/tarifel');
const Data_xm_guatapeSchema = sequelize.define('Data_xm_guatape', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
agente:{type: DataTypes.STRING,allowNull: false,trim: true},
demanda_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
crs_variable_guatape_cop:{type: DataTypes.FLOAT,allowNull: false,trim: true},

})
module.exports = Data_xm_guatapeSchema;
