// DataFormato4SSPD.js
const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const DataFormato4SSPD = db.define("Data_Formato_4_SSPD", {
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
        allowNull: true // Cambiar según la necesidad
    },
    anhoCorregido: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    mesCorregido: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    cargoHorario: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    inicioFranjaHoraria: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    finFranjaHoraria: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    estratoOSector: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    porcentajeSubsidiado100OR: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    porcentajeSubsidiado50OR: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    porcentajeSubsidiado0OR: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    tarifaNivel1100OR: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    tarifaNivel150OR: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    tarifaNivel10OR: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    tarifaNivel2: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    tarifaNivel3: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    tarifaNivel4: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    cfm: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    fechaPublicacion: { 
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    diarioPublicacion: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    tarifaOT: { 
        type: DataTypes.STRING,
        allowNull: true
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

module.exports = DataFormato4SSPD;
