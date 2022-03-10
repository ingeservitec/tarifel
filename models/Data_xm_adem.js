const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize('postgres://tarifel:t4r1f3l@localhost:5432/tarifel');
const Data_xm_ademsSchema = sequelize.define('Data_xm_adem', {
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
    
    cod_contenido: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    
    agente: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    
    contenido: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_1: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_2: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_3: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_4: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_5: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_6: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_7: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_8: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_9: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_10: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_11: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_12: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_13: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_14: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_15: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_16: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_17: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_18: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_19: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_20: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_21: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_22: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_23: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cont_hora_24: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    }
}
);
module.exports = Data_xm_ademsSchema;
