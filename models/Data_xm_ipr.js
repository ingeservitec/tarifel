const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize(process.env.URI);
const Data_xm_iprSchema = sequelize.define('Data_xm_ipr', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
strID:{type: DataTypes.STRING,allowNull: false,trim: true},
agrupaORMercado:{type: DataTypes.STRING,allowNull: false,trim: true},
fechavigencia:{type: DataTypes.STRING,allowNull: false,trim: true},
conceptoID:{type: DataTypes.STRING,allowNull: false,trim: true},
nivelEntrada:{type: DataTypes.INTEGER,allowNull: false,trim: true},
nivelSalida:{type: DataTypes.INTEGER,allowNull: false,trim: true},
valor:{type: DataTypes.FLOAT,allowNull: false,trim: true},
})
module.exports = Data_xm_iprSchema;
