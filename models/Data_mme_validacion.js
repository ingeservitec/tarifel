const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres'});
const Data_mme_validacionSchema = sequelize.define('Data_mme_validacion', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
fecha:{type: DataTypes.STRING,allowNull: false,trim: true},
trimestre:{type: DataTypes.INTEGER,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
facturacion:{type: DataTypes.INTEGER,allowNull: false,trim: true},
subsidios:{type: DataTypes.INTEGER,allowNull: false,trim: true},
contribuciones:{type: DataTypes.INTEGER,allowNull: false,trim: true},
contrib_no_recaud_desp_6m:{type: DataTypes.INTEGER,allowNull: false,trim: true},
contrib_recaud_desp_de_conc:{type: DataTypes.INTEGER,allowNull: false,trim: true},
giros_recibidos:{type: DataTypes.INTEGER,allowNull: false,trim: true},
giro_sobrante:{type: DataTypes.STRING,allowNull: true,trim: true},
ultimo_giro_incluido:{type: DataTypes.INTEGER,allowNull: true,trim: true},
})
module.exports = Data_mme_validacionSchema;
