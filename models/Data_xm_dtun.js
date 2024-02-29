const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize(process.env.URI);
const Data_xm_dtunSchema = sequelize.define('Data_xm_dtun', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
area:{type: DataTypes.STRING,allowNull: false,trim: true},
nivel_tension:{type: DataTypes.INTEGER,allowNull: false,trim: true},
valor:{type: DataTypes.FLOAT,allowNull: false,trim: true},
operador_red:{type: DataTypes.STRING,allowNull: false,trim: true},
version:{type: DataTypes.STRING,allowNull: false,trim: true},
})
module.exports = Data_xm_dtunSchema;
