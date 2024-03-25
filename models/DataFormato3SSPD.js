// DataFormato3SSPD.js
const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const DataFormato3SSPD = db.define("Data_Formato_3_SSPD", {
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
        allowNull: false 
    },
    cargoHorario: { 
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    inicioFranjaHoraria: { 
        type: DataTypes.STRING,
        allowNull: false 
    },
    finFranjaHoraria: { 
        type: DataTypes.STRING,
        allowNull: false 
    },
    estratoOSector: { 
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    porcentajeSubsidiado100OR: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    porcentajeSubsidiado50OR: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    porcentajeSubsidiado0OR: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    tarifaNivel1100OR: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    tarifaNivel150OR: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    tarifaNivel10OR: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    tarifaNivel2: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    tarifaNivel3: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    tarifaNivel4: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    cfm: { 
        type: DataTypes.FLOAT,
        allowNull: false 
    },
    fechaPublicacion: { 
        type: DataTypes.DATEONLY 
    },
    diarioPublicacion: { 
        type: DataTypes.STRING 
    },
    tarifaOT: { 
        type: DataTypes.INTEGER,
        allowNull: false 
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
        field: 'createdAt' 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        field: 'updatedAt' 
    }
}, {
    // Opciones adicionales si son necesarias
});

module.exports = DataFormato3SSPD;
