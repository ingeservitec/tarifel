const { DataTypes } = require("sequelize");
const db = require("../config/db.js");
const Data_creg_cxSchema = db.define("Data_creg_cx", {
  // Model attributes are defined here
  fecha: { type: DataTypes.STRING, allowNull: false, trim: true },
  creador: { type: DataTypes.INTEGER, allowNull: false, trim: true },
  empresa_id: { type: DataTypes.STRING, allowNull: false, trim: true },
  resolucion: { type: DataTypes.STRING, allowNull: false, trim: true },
  mo: { type: DataTypes.FLOAT, allowNull: false, trim: true },
  RCT: { type: DataTypes.FLOAT, allowNull: false, trim: true },
  RCAE: { type: DataTypes.FLOAT, allowNull: false, trim: true },
  RCSNE: { type: DataTypes.FLOAT, allowNull: false, trim: true },
  RCNU: { type: DataTypes.FLOAT, allowNull: false, trim: true },
  Cf: { type: DataTypes.FLOAT, allowNull: false, trim: true },
  PUI: { type: DataTypes.FLOAT, allowNull: false, trim: true },
});
module.exports = Data_creg_cxSchema;
