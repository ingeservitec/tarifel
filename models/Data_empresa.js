const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize(process.env.URI);
const Data_empresaSchema = sequelize.define('data_empresa', {
  // Model attributes are defined here
    anho: {
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  mes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  empresa_id: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  mercado: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  numero_usuarios_r: {
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  numero_usuarios_nr: {
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  ventas_usuarios_r_nt1_e: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  ventas_usuarios_r_nt1_c: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  ventas_usuarios_r_nt1_u: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  ventas_usuarios_r_nt2: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  ventas_usuarios_r_nt3: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  ventas_usuarios_nr_kwh: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  pui_cop_kwh: {
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  vsne_kwh: {
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  vnu_kwh: {
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  vnu_kwh: {
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  vae_kwh: {
    type: DataTypes.INTEGER,
    //ref: ProyectosSchema.hasOne(UsuariosSchema)
    // allowNull defaults to true
  },
  ventas_usuarios_nr_kwh: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  g_exc1: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  g_exc1_21: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  g_exc2: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  g_exc3: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  ggd: {
    type: DataTypes.FLOAT,
    allowNull: false,
    trim: true
    // sin espacios en blanco al inicio o al final
  },
  creador: {
    type: DataTypes.INTEGER,
    //ref: ProyectosSchema.hasOne(UsuariosSchema)
    // allowNull defaults to true
  },
}
);
module.exports = Data_empresaSchema;
//La tabla se llama usuario para sequalice en Postgres se llama usuarios 


