const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const DataempresamessinSchema = db.define('data_empresa', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.INTEGER,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mercado:{type: DataTypes.STRING,allowNull: false,trim: true},
numero_usuarios_r:{type: DataTypes.INTEGER,allowNull: false,trim: true},
numero_usuarios_nr:{type: DataTypes.INTEGER,allowNull: false,trim: true},
ventas_usuarios_r_nt1_e:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ventas_usuarios_r_nt1_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ventas_usuarios_r_nt1_u:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ventas_usuarios_r_nt2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ventas_usuarios_r_nt3:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ventas_usuarios_nr_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
pui_cop_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
vsne_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
vnu_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
vae_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
g_exc1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
g_exc1_21:{type: DataTypes.FLOAT,allowNull: true,trim: true},
g_exc2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
g_exc3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ggd:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cot: {
    type: DataTypes.FLOAT,
    //ref: ProyectosSchema.hasOne(UsuariosSchema)
    // allowNull defaults to true
  },
})
module.exports = DataempresamessinSchema;
