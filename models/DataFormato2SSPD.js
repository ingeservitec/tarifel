// DataFormato2SSPD.js
const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const DataFormato2SSPD = db.define("Data_Formato_2_SSPD", {
    anho: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo_garantia: { type: DataTypes.INTEGER },
    nit_beneficiario: { type: DataTypes.STRING },
    dv_beneficiario: { type: DataTypes.STRING },
    emisor: { type: DataTypes.STRING },
    numero_garantia: { type: DataTypes.STRING },
    mes_recuperacion: { type: DataTypes.STRING },
    fecha_inicio_vigencia: { type: DataTypes.DATE },
    fecha_finalizacion_vigencia: { type: DataTypes.DATE },
    valor_total_garantia: { type: DataTypes.FLOAT },
    costo_garantia: { type: DataTypes.FLOAT },
    costo_a_recuperar: { type: DataTypes.FLOAT },
    creador: { type: DataTypes.INTEGER, allowNull: false },
    empresa_id: { type: DataTypes.INTEGER, allowNull: false },
    // campos adicionales si es necesario
    createdAt: { type: DataTypes.DATE, field: 'createdAt' },
    updatedAt: { type: DataTypes.DATE, field: 'updatedAt' }
}, {
    // Otras configuraciones del modelo si son necesarias
});

module.exports = DataFormato2SSPD;
