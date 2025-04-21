const { DataTypes } = require("sequelize");
const db = require("../config/db.js");
const Data_daneSchema = db.define("Data_dane", {
  // Model attributes are defined here
  creador: { type: DataTypes.FLOAT, allowNull: false, trim: true },
  anho: { type: DataTypes.INTEGER, allowNull: false, trim: true },
  mes: { type: DataTypes.INTEGER, allowNull: false, trim: true },
  ipp_oferta_interna: { type: DataTypes.FLOAT, allowNull: false, trim: true },
  ipc: { type: DataTypes.FLOAT, allowNull: false, trim: true },
  empresa_id: { type: DataTypes.STRING, allowNull: false, trim: true },
});
module.exports = Data_daneSchema;
