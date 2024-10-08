const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const data_empresa_garantiaSchema = db.define('data_empresa_garantia', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
tipo_garantia:{type: DataTypes.STRING,allowNull: false,trim: true},
nit_beneficiario:{type: DataTypes.INTEGER,allowNull: false,trim: true},
dv_beneficiario:{type: DataTypes.INTEGER,allowNull: false,trim: true},
emisor_banco:{type: DataTypes.STRING,allowNull: false,trim: true},
numero_garantia:{type: DataTypes.INTEGER,allowNull: false,trim: true},
fecha_inicio_vigencia:{type: DataTypes.STRING,allowNull: false,trim: true},
fecha_fin_vigencia:{type: DataTypes.STRING,allowNull: false,trim: true},
valor_garantia:{type: DataTypes.STRING,allowNull: false,trim: true},
costo_garantia:{type: DataTypes.FLOAT,allowNull: false,trim: true},
})
module.exports = data_empresa_garantiaSchema;
