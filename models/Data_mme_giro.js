const { DataTypes } = require("sequelize");
const db = require("../config/db.js");
const Data_mme_giroSchema = db.define("Data_mme_giro", {
  // Model attributes are defined here
  creador: { type: DataTypes.INTEGER, allowNull: false, trim: true },
  empresa_id: { type: DataTypes.STRING, allowNull: false, trim: true },
  fecha: { type: DataTypes.STRING, allowNull: false, trim: true },
  fondo: { type: DataTypes.STRING, allowNull: false, trim: true },
  resolucion: { type: DataTypes.STRING, allowNull: false, trim: true },
  link_resolucion: { type: DataTypes.STRING, allowNull: false, trim: true },
  giro_cop: { type: DataTypes.STRING, allowNull: false, trim: true },
});
module.exports = Data_mme_giroSchema;
