const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize(process.env.URI);
const Data_xm_d015Schema = sequelize.define('Data_xm_d015', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
cargo_por_uso_dt1_cop_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_por_uso_dt2_cop_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_por_uso_dt3_cop_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_de_inversion_cdi1_cop_kwh:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cargo_por_aom_cda1_cop_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cargo_nivel_de_tension_cd2_cop_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cargo_nivel_de_tension_cd3_cop_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cargo_nivel_de_tension_cd3_2_cop_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cargo_nivel_de_tension_cd4_cop_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cargo_por_incentivos_dtcs_cop_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
fraccion_dtcs_cop_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ia1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ia2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ia3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iaa1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iaa2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iaa3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
irm1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
irm2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
irm3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
fm:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iaaom1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iaaom2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iaaom3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
aomni1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
aomni2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
aomni3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ima_n1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ima_n2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ima_n3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
imn_n1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
imn_n2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
imn_n3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
aim_n1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
aim_n2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
aim_n3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
naim_n1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
naim_n2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
naim_n3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
fraccion_aim_n1_inversion:{type: DataTypes.FLOAT,allowNull: true,trim: true},
fraccion_aim_n1_aom:{type: DataTypes.FLOAT,allowNull: true,trim: true},
bra1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
bra2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
bra3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
brae1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
brae2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
brae3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
braen1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
braen2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
braen3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rc1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rc2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rc3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cdi_aj_1_cop2007_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cd_aj_2_cop2007_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cd_aj_3_cop2007_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
cdm_aj_1_cop2007_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iapa1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iapa2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iapa3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iapa1_tant:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iapa2_tant:{type: DataTypes.FLOAT,allowNull: true,trim: true},
iapa3_tant:{type: DataTypes.FLOAT,allowNull: true,trim: true},
oi1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
oj2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
oj3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
irespaldo1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
irespaldo2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
irespaldo3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
imunts1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
imunts2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
imunts3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ireactiva1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ireactiva2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ireactiva3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
aombase1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
aombase2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
aombase3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
brae1_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
brae2_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
brae3_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
deltabraenj_1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
deltabraenj_2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
deltabraenj_3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
deltaingj_1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
deltaingj_2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
deltaingj_3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
brt1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
brt2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
brt3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rcbia1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rcbia2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rcbia3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rcna1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rcna2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rcna3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rcnafo1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rcnafo2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
rcnafo3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
inve1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
inve2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
inve3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
inva1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
inva2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
inva3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
inva1_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
inva2_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
inva3_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
invr1_maximo_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
invr2_maximo_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
invr3_maximo_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
invr1_delta_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
invr2_delta_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
invr3_delta_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
invr1_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
invr2_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
invr3_tant_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
pr1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
pr2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
pr3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
pj_1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
pj_2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
pj_3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
pj_1_creg097:{type: DataTypes.FLOAT,allowNull: true,trim: true},
pj_2_creg097:{type: DataTypes.FLOAT,allowNull: true,trim: true},
pj_3_creg097:{type: DataTypes.FLOAT,allowNull: true,trim: true},
acumulado_eej1_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
acumulado_eej2_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
acumulado_eej3_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
acumulado_fej3_2_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
euj_2_creg097_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
fej3_2_creg097_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ic_saidi_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
ic_saifi_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
conp_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
vcdij_tant_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
vcinj_tant_kwh:{type: DataTypes.FLOAT,allowNull: true,trim: true},
vacpiec1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
vacpiec2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
vacpiec3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
vacni1:{type: DataTypes.FLOAT,allowNull: true,trim: true},
vacni2:{type: DataTypes.FLOAT,allowNull: true,trim: true},
vacni3:{type: DataTypes.FLOAT,allowNull: true,trim: true},
r_tasa_retorno_actividad_distribucion:{type: DataTypes.FLOAT,allowNull: true,trim: true},
famb:{type: DataTypes.FLOAT,allowNull: true,trim: true},
css1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
css2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
css3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
dismining1_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
dismining2_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true},
dismining3_cop:{type: DataTypes.FLOAT,allowNull: true,trim: true}
})
module.exports = Data_xm_d015Schema;
