const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Res_componentes_cu_tarifasSchema = db.define('Res_componentes_cu_tarifa', {
// Model attributes are defined here
creador:{type: DataTypes.INTEGER,allowNull: false,trim: true},
anho:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mes:{type: DataTypes.INTEGER,allowNull: false,trim: true},
mercado:{type: DataTypes.STRING,allowNull: true,trim: true},
qc:{type: DataTypes.FLOAT,allowNull: false,trim: true},
pc:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ref_g:{type: DataTypes.FLOAT,allowNull: false,trim: true},
max_g:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cr:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ad:{type: DataTypes.FLOAT,allowNull: false,trim: true},
aj:{type: DataTypes.FLOAT,allowNull: false,trim: true},
pb:{type: DataTypes.FLOAT,allowNull: false,trim: true},
gc:{type: DataTypes.FLOAT,allowNull: false,trim: true},
tx:{type: DataTypes.FLOAT,allowNull: false,trim: true},
dtun_nt1_e:{type: DataTypes.FLOAT,allowNull: false,trim: true},
dtun_nt1_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
dtun_nt1_p:{type: DataTypes.FLOAT,allowNull: false,trim: true},
dtun_nt2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
dtun_nt3:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cdi_100:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cdi_50:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cdm:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cd4:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cd3:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cd2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
dnt1:{type: DataTypes.FLOAT,allowNull: false,trim: true},
dnt2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
dnt3:{type: DataTypes.FLOAT,allowNull: false,trim: true},
dnt4:{type: DataTypes.FLOAT,allowNull: false,trim: true},
crs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
rcal:{type: DataTypes.FLOAT,allowNull: false,trim: true},
r:{type: DataTypes.FLOAT,allowNull: false,trim: true},
iprstn:{type: DataTypes.FLOAT,allowNull: false,trim: true},
pr_nt1:{type: DataTypes.FLOAT,allowNull: false,trim: true},
pr_nt2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
pr_nt3:{type: DataTypes.FLOAT,allowNull: false,trim: true},
pr_nt4:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cer:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cfm:{type: DataTypes.FLOAT,allowNull: false,trim: true},
rc:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ul_trim_val_mme:{type: DataTypes.INTEGER,allowNull: false,trim: true},
anho_ul_trim_val_mme:{type: DataTypes.INTEGER,allowNull: false,trim: true},
sub1:{type: DataTypes.FLOAT,allowNull: false,trim: true},
sub2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
n_sub1:{type: DataTypes.FLOAT,allowNull: false,trim: true},
m_sub2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
facturacion_t:{type: DataTypes.FLOAT,allowNull: false,trim: true},
r1:{type: DataTypes.FLOAT,allowNull: false,trim: true},
r2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
sup_def:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cfs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cfe:{type: DataTypes.FLOAT,allowNull: false,trim: true},
c_ast:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cvr:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cv:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt1_100:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt1_50:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt1_0:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt3:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt4:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_estrato_1_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_estrato_2_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_estrato_3_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_estrato_4_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_estrato_5_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_estrato_6_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_estrato_4:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_estrato_5:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_estrato_6:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_i_con_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_i_sin_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_p:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_100_o:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_estrato_1_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_estrato_2_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_estrato_3_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_estrato_4_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_estrato_5_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_estrato_6_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_estrato_4:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_estrato_5:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_estrato_6:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_i_con_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_i_sin_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_p:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_50_o:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_estrato_1_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_estrato_2_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_estrato_3_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_estrato_4_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_estrato_5_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_estrato_6_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_estrato_4:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_estrato_5:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_estrato_6:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_i_con_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_i_sin_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_p:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt1_0_o:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt2_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt2_i_con_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt2_i_sin_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt2_o:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt2_ap:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt2_bsnmen_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt2_bsnmay_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt3_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt3_i_con_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt3_i_sin_c:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt3_o:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt3_ap:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt2_estrato_1_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt3_estrato_1_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt4_estrato_1_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt2_estrato_2_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt3_estrato_2_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
nt4_estrato_2_men_cs:{type: DataTypes.FLOAT,allowNull: false,trim: true},
empresa_id:{type: DataTypes.STRING,allowNull: false,trim: true},
cu_nt1_100_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt1_50_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt1_0_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt2_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt3_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cu_nt4_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
pv:{type: DataTypes.FLOAT,allowNull: false,trim: true},
saldo_nt1_100_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
saldo_nt1_50_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
saldo_nt1_0_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
saldo_nt2_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
saldo_nt3_ot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
giro_sobrante:{type: DataTypes.FLOAT,allowNull: false,trim: true},
ultimo_giro_incluido:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cg:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cgcu:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cot:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cv_nt1:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cv_nt2:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cv_nt3:{type: DataTypes.FLOAT,allowNull: false,trim: true},
cv_nt4:{type: DataTypes.FLOAT,allowNull: false,trim: true},
})
module.exports = Res_componentes_cu_tarifasSchema;
