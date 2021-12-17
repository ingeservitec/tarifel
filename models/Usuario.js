const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres'});
const UsuariosSchema = sequelize.define('usuario', {
  // Model attributes are defined here
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    trim:true
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    trim:true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    trim:true
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    trim:true
    // allowNull defaults to true
  },
  creado: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
    trim:true
  }
}
);
module.exports = UsuariosSchema;
