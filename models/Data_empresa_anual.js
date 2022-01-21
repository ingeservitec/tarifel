const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres'});
const Data_empresa_anualSchema = sequelize.define('data_empresa_anual', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
contribuciones_creg:{type: DataTypes.INTEGER,allowNull: false,trim: true},
contribuciones_sspd:{type: DataTypes.INTEGER,allowNull: false,trim: true},
})
module.exports = Data_empresa_anualSchema;
