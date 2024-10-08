const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Data_xm_tservsSchema = db.define('Data_xm_tserv', {
  // Model attributes are defined here
     
    creador: {  
    type: DataTypes.INTEGER,  
    allowNull: false,  
    trim: true  
    },
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
    fecha: {  
        type: DataTypes.STRING,  
        allowNull: false,  
        trim: true  
        },
    agente: {  
        type: DataTypes.STRING,  
        allowNull: false,  
        trim: true  
        },
    empresa_id: {  
      type: DataTypes.STRING,  
      allowNull: false,  
      trim: true  
      },
    beneficiario: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    concepto: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    tipopago: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim:true
     },
     magnitud: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim:true
  }
}
);
module.exports = Data_xm_tservsSchema;
