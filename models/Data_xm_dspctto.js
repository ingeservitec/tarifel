const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Data_xm_dspcttosSchema = db.define('Data_xm_dspctto', {
  // Model attributes are defined here
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
    
    dia: {  
    type: DataTypes.INTEGER,  
    allowNull: false,  
    trim: true  
    },
    
    creador: {  
    type: DataTypes.INTEGER,  
    allowNull: false,  
    trim: true  
    },
    empresa_id: {  
      type: DataTypes.STRING,  
      allowNull: false,  
      trim: true  
      },
    
    contrato: {  
    type: DataTypes.INTEGER,  
    allowNull: false,  
    trim: true  
    },
    
    vendedor: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    
    comprador: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    
    tipo: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    
    tipomerc: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    tipoasigna: {  
      type: DataTypes.STRING,  
      allowNull: false,  
      trim: true  
      },
    
    desp_hora_1: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_2: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_3: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_4: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_5: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_6: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_7: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_8: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_9: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_10: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_11: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_12: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_13: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_14: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_15: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_16: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_17: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_18: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_19: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_20: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_21: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_22: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_23: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desp_hora_24: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_1: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_2: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_3: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_4: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_5: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_6: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_7: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_8: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_9: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_10: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_11: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_12: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_13: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_14: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_15: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_16: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_17: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_18: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_19: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_20: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_21: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_22: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_23: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    trf_hora_24: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
}
);
module.exports = Data_xm_dspcttosSchema;
