const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres'});
const Data_mme_giroSchema = sequelize.define('Data_mme_giro', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
fecha:{type: DataTypes.STRING,allowNull: false,trim: true},
fondo:{type: DataTypes.STRING,allowNull: false,trim: true},
resolucion:{type: DataTypes.STRING,allowNull: false,trim: true},
link_resolucion:{type: DataTypes.STRING,allowNull: false,trim: true},
giro_cop:{type: DataTypes.INTEGER,allowNull: false,trim: true},

})
module.exports = Data_mme_giroSchema;
