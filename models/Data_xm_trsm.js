const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize(process.env.URI);
const Data_xm_trsmSchema = sequelize.define('Data_xm_trsm', {
  // Model attributes are defined here
     
    creador: {type: DataTypes.INTEGER,allowNull: false,trim: true},
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
    empresa_id: {  
      type: DataTypes.STRING,  
      allowNull: false,  
      trim: true  
      },
    fecha: {  
        type: DataTypes.STRING,  
        allowNull: false,  
        trim: true  
        },

    codigo: {  
        type: DataTypes.STRING,  
        allowNull: false,  
        trim: true  
        },

    descripcion: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },

    valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim:true
     }
}
);
module.exports = Data_xm_trsmSchema;
