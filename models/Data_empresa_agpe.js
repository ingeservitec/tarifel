const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize(process.env.URI);
const Data_empresa_agpeSchema = sequelize.define('Data_empresa_agpe', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
niu:{type: DataTypes.INTEGER,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
dia:{type: DataTypes.INTEGER,allowNull: false,trim: true},
tipo_ene:{type: DataTypes.STRING,allowNull: false,trim: true},
hora_01:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_02:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_03:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_04:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_05:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_06:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_07:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_08:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_09:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_10:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_11:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_12:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_13:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_14:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_15:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_16:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_17:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_18:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_19:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_20:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_21:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_22:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_23:{type: DataTypes.FLOAT,allowNull: false,trim: true},
hora_24:{type: DataTypes.FLOAT,allowNull: false,trim: true},

})
module.exports = Data_empresa_agpeSchema;
