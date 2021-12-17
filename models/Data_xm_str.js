const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres'});
const Data_xm_strSchema = sequelize.define('Data_xm_str', {
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

    zona: {  
        type: DataTypes.INTEGER,  
        allowNull: false,  
        trim: true  
        },

    creador: {  
    type: DataTypes.INTEGER,  
    allowNull: false,  
    trim: true  
    },
  
    cd4_cop_kwh: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim:true
     },

     delta_cd4_cop_kwh: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim:true
  }
}
);
module.exports = Data_xm_strSchema;
