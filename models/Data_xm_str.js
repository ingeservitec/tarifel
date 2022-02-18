const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres'});
const Data_xm_strSchema = sequelize.define('Data_xm_str', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
total_ingreso_mensual_bruto_str_cop_norte:{type: DataTypes.FLOAT,allowNull: false,trim: true},
energia_del_str_kwh_norte:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_por_uso_dt4_cop_kwh_norte:{type: DataTypes.FLOAT,allowNull: false,trim: true},
factor_para_referir_las_medidas_de_energia_del_nt_4_norte:{type: DataTypes.FLOAT,allowNull: false,trim: true},
valor_diferencial_despues_de_compensacion_cop_kwh_norte:{type: DataTypes.FLOAT,allowNull: false,trim: true},
total_ingreso_mensual_bruto_str_cop_sur:{type: DataTypes.FLOAT,allowNull: false,trim: true},
energia_del_str_kwh_sur:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_por_uso_dt4_cop_kwh_sur:{type: DataTypes.FLOAT,allowNull: false,trim: true},
factor_para_referir_las_medidas_de_energia_del_nt_4_sur:{type: DataTypes.FLOAT,allowNull: false,trim: true},
valor_diferencial_despues_de_compensacion_cop_kwh_sur:{type: DataTypes.FLOAT,allowNull: false,trim: true},

})
module.exports = Data_xm_strSchema;
