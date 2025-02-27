const { DataTypes } = require("sequelize");
const db = require("../config/db.js");
const Data_banrepublica_tcapSchema = db.define("Data_banrepublica_tcap", {
  // Model attributes are defined here
  creador: { type: DataTypes.INTEGER, allowNull: false, trim: true },
  fecha: { type: DataTypes.STRING, allowNull: false, trim: true },
  empresa_id: { type: DataTypes.STRING, allowNull: false, trim: true },
  tasa_a_30_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_a_30_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_entre_31_y_44_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_31_y_44_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_a_45_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_a_45_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_entre_46_y_59_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_46_y_59_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_a_60_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_a_60_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_entre_61_y_89_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_61_y_89_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_a_90_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_a_90_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_entre_91_y_119_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_91_y_119_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_a_120_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_a_120_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_entre_121_y_179_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_121_y_179_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_a_180_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_a_180_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_entre_181_y_359_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_181_y_359_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_a_360_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_a_360_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_superiores_a_360_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_superiores_a_360_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_entre_2_y_14_cdats_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_2_y_14_cdats_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_entre_15_y_29_cdats_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_15_y_29_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_a_30_cdats_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true,
  },
  monto_a_30_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true,
  },
  tasa_entre_31_y_90_cdats_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_31_y_90_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_entre_91_y_180_cdats_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_entre_91_y_180_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_de_181_en_adelante_cdats_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  tasa_cap_cdat_oficinas_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
  monto_cap_cdat_oficinas_cdat_bancos_comerciales: {
    type: DataTypes.FLOAT,
    allowNull: true,
    trim: true,
  },
});
module.exports = Data_banrepublica_tcapSchema;
