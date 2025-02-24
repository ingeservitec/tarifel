const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const Data_banrepublica_tcoSchema = db.define("Data_banrepublica_tco", {
  // Model attributes are defined here
  creador: { type: DataTypes.INTEGER, allowNull: false, trim: true },
  anho_semana: { type: DataTypes.STRING, allowNull: false, trim: true },
  // Solo estos campos serán requeridos después de Feb 2025
  tasa__cred_com_preferencial_o_corporativo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true,
  },
  monto__cred_com_preferencial_o_corporativo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true,
  },
  // Todos los demás campos se configuran como allowNull: true
  tasa_cred_com_credito_consumo: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_cred_com_credito_consumo: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_cred_com_odinario: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_cred_com_odinario: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa__cred_com_tesoreria: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto__cred_com_tesoreria: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_colocacion_banco_republica: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_colocacion_banco_republica: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_colocacion_sin_tesoreria: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_colocacion_sin_tesoreria: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_colocacion_total: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_colocacion_total: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  empresa_id: { type: DataTypes.STRING, allowNull: false, trim: true },
});

module.exports = Data_banrepublica_tcoSchema;
