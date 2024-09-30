// DataFormulario5SSPD.js
const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const DataFormulario5SSPD = db.define("Data_Formulario_5_SSPD", {
    anho: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    opcionTarifaria: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Indica si la empresa aplicó la opción tarifaria para el mes. 1 para sí, 0 para no."
    },
    creador: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    empresa_id: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    createdAt: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW,
        field: 'createdAt' 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW,
        field: 'updatedAt' 
    }
}, {
    tableName: 'Data_Formulario_5_SSPD',
    // Otras opciones del modelo si son necesarias
});

module.exports = DataFormulario5SSPD;
