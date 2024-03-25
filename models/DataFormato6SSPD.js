// DataFormato6SSPD.js
const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const DataFormato6SSPD = db.define("Data_Formato_6_SSPD", {
    anho: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idMercado: { 
        type: DataTypes.STRING,
        allowNull: true 
    },
    ntProp: { 
        type: DataTypes.STRING,
        allowNull: true 
    },
    pv: { 
        type: DataTypes.FLOAT,
        allowNull: true 
    },
    sam1: { 
        type: DataTypes.FLOAT,
        allowNull: true 
    },
    vRt1: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Promedio 12 meses ventas NT" 
    },
    cuvc: { 
        type: DataTypes.FLOAT,
        allowNull: true 
    },
    cuvm1: { 
        type: DataTypes.FLOAT,
        allowNull: true 
    },
    cuv: { 
        type: DataTypes.FLOAT,
        allowNull: true 
    },
    vRm1: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Ventas en el NT" 
    },
    rEM: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Tasa de Interés" 
    },
    sam: { 
        type: DataTypes.FLOAT,
        allowNull: true 
    },
    aplicoOpcionTarifaria: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Indica si se aplicó la opción tarifaria: true para sí, false para no"
    },
    creador: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    empresa_id: { 
        type: DataTypes.INTEGER, 
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
    tableName: 'Data_Formato_6_SSPD',
    // Otras opciones del modelo si son necesarias
});

module.exports = DataFormato6SSPD;
