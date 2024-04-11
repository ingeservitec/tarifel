// DataFormulario1SSPD.js
const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const DataFormulario1SSPD = db.define("Data_Formulario_1_SSPD", {
    anho: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    recuperacion_garantias: { type: DataTypes.STRING },
    observacion_recuperacion_garantias: { type: DataTypes.TEXT },
    creador: { type: DataTypes.INTEGER, allowNull: false },
    empresa_id: { type: DataTypes.STRING, allowNull: false }
    // Agregar otros campos necesarios
});

module.exports = DataFormulario1SSPD;
