// DataFormato9SSPD.js
const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const DataFormato9SSPD = db.define("Data_Formato_9_SSPD", {
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
    ecc: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Energía en contratos"
    },
    vecc: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Valor de la energía en contratos"
    },
    cbMr: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Compras de bolsa MR"
    },
    vcbMr: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Valor de compras de bolsa MR"
    },
    avcbMr: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Ajustes en valor de compras de bolsa MR"
    },
    w: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Factor w"
    },
    adM: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "ADm"
    },
    vrM1: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "VRm-1"
    },
    aj: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "AJ"
    },
    alfa: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Alfa"
    },
    cfj: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Cfj"
    },
    rct: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "RCT"
    },
    rcae: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "RCAE"
    },
    balanceSubsidios: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Balance de Subsidios"
    },
    ano: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "AÑO"
    },
    trim: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "TRIM"
    },
    mgTrim: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "MG TRIM"
    },
    sub1: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Sub1"
    },
    sub2: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Sub2"
    },
    n: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "N"
    },
    m: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "M"
    },
    r1: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "r1"
    },
    r2: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "r2"
    },
    facturacion: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Facturación"
    },
    actividad: { 
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Actividad"
    },
    porcCreg: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "%CREG"
    },
    porcSspd: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "%SSPD"
    },
    cregDolares: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "CREG ($)"
    },
    sspdDolares: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "SSPD ($)"
    },
    pui: { 
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "PUI"
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
        defaultValue: DataTypes.NOW 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, {
    tableName: 'Data_Formato_9_SSPD',
    // Otras opciones del modelo si son necesarias
});

module.exports = DataFormato9SSPD;
