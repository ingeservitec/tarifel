const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize('postgres://tarifel:t4r1f3l@localhost:5432/tarifel');
const Data_empresa_anualSchema = sequelize.define('data_empresa_anual', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
contribuciones_creg:{type: DataTypes.INTEGER,allowNull: false,trim: true},
contribuciones_sspd:{type: DataTypes.INTEGER,allowNull: false,trim: true},
porc_contribucion_creg:{type: DataTypes.FLOAT,allowNull: false,trim: true},
porc_contribucion_sspd:{type: DataTypes.FLOAT,allowNull: false,trim: true},
})
module.exports = Data_empresa_anualSchema;
