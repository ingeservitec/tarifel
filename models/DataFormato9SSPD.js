// data_formato_9_sspd.js
const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const data_formato_9_sspd = db.define("Data_Formato_9_SSPD", {
    anho: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idmercado: { 
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
    cbmr: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Compras de bolsa MR"
    },
    vcbmr: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Valor de compras de bolsa MR"
    },
    avcbmr: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Ajustes en valor de compras de bolsa MR"
    },
    w: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Factor w"
    },
    adm: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "ADm"
    },
    vrm1: { 
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
    balancesubsidios: { 
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
    mgtrim: { 
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
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "N"
    },
    m: { 
        type: DataTypes.FLOAT,
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
    porccreg: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "%CREG"
    },
    porcsspd: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "%SSPD"
    },
    cregdolares: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "CREG ($)"
    },
    sspddolares: { 
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
});

module.exports = data_formato_9_sspd;
