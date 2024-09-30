const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Data_empresa_EnergiaContratoAtipico = db.define('Data_empresa_EnergiaContratoAtipico', {
    anho: {
        type: DataTypes.INTEGER,
        allowNull: false,
        trim: true
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        trim: true
    },
    id_contrato: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Data_xm_dspctto',
            key: 'id'
        }
    },
    energia_comprada: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        trim: true
    },
    costo: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        trim: true
    },
    empresa_id: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    },
    creador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        trim: true
    }
}, {
    timestamps: true,
    tableName: 'Data_empresa_EnergiaContratoAtipico'
});

module.exports = Data_empresa_EnergiaContratoAtipico;
