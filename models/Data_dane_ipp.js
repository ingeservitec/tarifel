const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Data_dane_ippSchema = db.define('Data_dane_ipp', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
tipo:{type: DataTypes.STRING,allowNull: false,trim: true},
ipp_pn_produccion_nacional:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_pn_agricultura_ganaderia_pesca:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_pn_mineria:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_pn_industria:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_oi_oferta_interna:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_oi_agricultura_ganaderia_pesca:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_oi_mineria:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_oi_industria:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_pd_productos_consumo_interno:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_pd_importados:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ipp_pd_exportados:{type: DataTypes.FLOAT,allowNull: false,trim: true},
})
module.exports = Data_dane_ippSchema;