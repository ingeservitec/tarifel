const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Data_Formato_7_SSPDs = db.define("Data_Formato_7_SSPDs", {
    creador: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    empresa_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anho: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_mercado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nt_prop: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gm: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tm: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    prnm: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dnm: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cvm: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    rm: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cuvm: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'createdat'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedat'
    }
}, {
    // Model options can be set here
});

module.exports = Data_Formato_7_SSPDs;