import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import Swal from 'sweetalert2'


const NUEVO_DATA_RES_COMPONENTES_CU_TARIFA= gql`
mutation nuevoRes_componentes_cu_tarifa($input:Res_componentes_cu_tarifaInput ){
nuevoRes_componentes_cu_tarifa(input:$input){
id
creador
anho
mes
qc
pc
ref_g
max_g
cr
ad
aj
pb
gc
tx
dtun_nt1_e
dtun_nt1_c
dtun_nt1_p
dtun_nt2
dtun_nt3
cdi_100
cdi_50
cdm
cd4
cd3
cd2
dnt1
dnt2
dnt3
dnt4
crs
rcal
r
iprstn
pr_nt1
pr_nt2
pr_nt3
pr_nt4
cer
cfm
rc
ul_trim_val_mme
anho_ul_trim_val_mme
sub1
sub2
n_sub1
m_sub2
facturacion_t
r1
r2
sup_def
cfs
cfe
c_ast
cvr
cv
cu_nt1_100
cu_nt1_50
cu_nt1_0
cu_nt2
cu_nt3
cu_nt4
nt1_100_estrato_1_men_cs
nt1_100_estrato_2_men_cs
nt1_100_estrato_3_men_cs
nt1_100_estrato_4_men_cs
nt1_100_estrato_5_men_cs
nt1_100_estrato_6_men_cs
nt1_100_estrato_4
nt1_100_estrato_5
nt1_100_estrato_6
nt1_100_c
nt1_100_i_con_c
nt1_100_i_sin_c
nt1_100_p
nt1_100_o
nt1_50_estrato_1_men_cs
nt1_50_estrato_2_men_cs
nt1_50_estrato_3_men_cs
nt1_50_estrato_4_men_cs
nt1_50_estrato_5_men_cs
nt1_50_estrato_6_men_cs
nt1_50_estrato_4
nt1_50_estrato_5
nt1_50_estrato_6
nt1_50_c
nt1_50_i_con_c
nt1_50_i_sin_c
nt1_50_p
nt1_50_o
nt1_0_estrato_1_men_cs
nt1_0_estrato_2_men_cs
nt1_0_estrato_3_men_cs
nt1_0_estrato_4_men_cs
nt1_0_estrato_5_men_cs
nt1_0_estrato_6_men_cs
nt1_0_estrato_4
nt1_0_estrato_5
nt1_0_estrato_6
nt1_0_c
nt1_0_i_con_c
nt1_0_i_sin_c
nt1_0_p
nt1_0_o
nt2_c
nt2_i_con_c
nt2_i_sin_c
nt2_o
nt2_ap
nt2_bsnmen_cs
nt2_bsnmay_cs
nt3_c
nt3_i_con_c
nt3_i_sin_c
nt3_o
nt3_ap
empresa_id
cu_nt1_100_ot: Float
cu_nt1_50_ot: Float
cu_nt1_0_ot: Float
cu_nt2_ot: Float
cu_nt3_ot: Float
saldo_nt1_100_ot: Float
saldo_nt1_50_ot: Float
saldo_nt1_0_ot: Float
saldo_nt2_ot: Float
saldo_nt3_ot: Float
pv: Float
}
}
`;
const OBTENER_RES_COMPONENTES_CU_TARIFA= gql`
query obtenerRes_componentes_cu_tarifa{
obtenerRes_componentes_cu_tarifa{
id
creador
anho
mes
qc
pc
ref_g
max_g
cr
ad
aj
pb
gc
tx
dtun_nt1_e
dtun_nt1_c
dtun_nt1_p
dtun_nt2
dtun_nt3
cdi_100
cdi_50
cdm
cd4
cd3
cd2
dnt1
dnt2
dnt3
dnt4
crs
rcal
r
iprstn
pr_nt1
pr_nt2
pr_nt3
pr_nt4
cer
cfm
rc
ul_trim_val_mme
anho_ul_trim_val_mme
sub1
sub2
n_sub1
m_sub2
facturacion_t
r1
r2
sup_def
cfs
cfe
c_ast
cvr
cv
cu_nt1_100
cu_nt1_50
cu_nt1_0
cu_nt2
cu_nt3
cu_nt4
nt1_100_estrato_1_men_cs
nt1_100_estrato_2_men_cs
nt1_100_estrato_3_men_cs
nt1_100_estrato_4_men_cs
nt1_100_estrato_5_men_cs
nt1_100_estrato_6_men_cs
nt1_100_estrato_4
nt1_100_estrato_5
nt1_100_estrato_6
nt1_100_c
nt1_100_i_con_c
nt1_100_i_sin_c
nt1_100_p
nt1_100_o
nt1_50_estrato_1_men_cs
nt1_50_estrato_2_men_cs
nt1_50_estrato_3_men_cs
nt1_50_estrato_4_men_cs
nt1_50_estrato_5_men_cs
nt1_50_estrato_6_men_cs
nt1_50_estrato_4
nt1_50_estrato_5
nt1_50_estrato_6
nt1_50_c
nt1_50_i_con_c
nt1_50_i_sin_c
nt1_50_p
nt1_50_o
nt1_0_estrato_1_men_cs
nt1_0_estrato_2_men_cs
nt1_0_estrato_3_men_cs
nt1_0_estrato_4_men_cs
nt1_0_estrato_5_men_cs
nt1_0_estrato_6_men_cs
nt1_0_estrato_4
nt1_0_estrato_5
nt1_0_estrato_6
nt1_0_c
nt1_0_i_con_c
nt1_0_i_sin_c
nt1_0_p
nt1_0_o
nt2_c
nt2_i_con_c
nt2_i_sin_c
nt2_o
nt2_ap
nt2_bsnmen_cs
nt2_bsnmay_cs
nt3_c
nt3_i_con_c
nt3_i_sin_c
nt3_o
nt3_ap
empresa_id
cu_nt1_100_ot
cu_nt1_50_ot
cu_nt1_0_ot
cu_nt2_ot
cu_nt3_ot
saldo_nt1_100_ot
saldo_nt1_50_ot
saldo_nt1_0_ot
saldo_nt2_ot
saldo_nt3_ot
pv
}
}
`;
const OBTENER_DATA_DANE = gql`
query obtenerData_dane{
obtenerData_dane{
id
creador
anho
mes
ipp_oferta_interna
ipc
empresa_id
}
}
`;
const OBTENER_USUARIO = gql`
query obtenerUsuario{
obtenerUsuario {
id
nombre
apellido
empresa
}
}
`;

const OBTENER_DATA_EMPRESAS = gql`
query obtenerData_empresa {
  obtenerData_empresa{
    id
    anho
    mes
    mercado
    numero_usuarios_r
    numero_usuarios_nr
    ventas_usuarios_r_nt1_e
    ventas_usuarios_r_nt1_c
    ventas_usuarios_r_nt1_u
    ventas_usuarios_r_nt2
    ventas_usuarios_r_nt3
    ventas_usuarios_nr_kwh
    costo_garantias_mem_cop
    costo_garantias_str_sdl_cop
    pui_cop_kwh
    vsne_kwh
    vnu_kwh
    vae_kwh
  }
}
`;


const OBTENER_DATA_XM_TSERV = gql`
query obtenerData_xm_tserv {
obtenerData_xm_tserv {
id
anho
mes
creador
empresa_id
fecha
agente
beneficiario
concepto
tipopago
 
magnitud
  }
}
`;

const OBTENER_DATA_XM_TRSM = gql`
query obtenerData_xm_trsm {
obtenerData_xm_trsm {
  anho
  mes
  creador
  empresa_id
  fecha
  codigo
  descripcion
  valor  
  }
}
`;


const OBTENER_DATA_XM_DSPCTTO = gql`
query obtenerData_xm_dspctto {
obtenerData_xm_dspctto {
id
anho
mes
dia
creador
contrato
vendedor
comprador
tipo
tipomerc
desp_hora_1
desp_hora_2
desp_hora_3
desp_hora_4
desp_hora_5
desp_hora_6
desp_hora_7
desp_hora_8
desp_hora_9
desp_hora_10
desp_hora_11
desp_hora_12
desp_hora_13
desp_hora_14
desp_hora_15
desp_hora_16
desp_hora_17
desp_hora_18
desp_hora_19
desp_hora_20
desp_hora_21
desp_hora_22
desp_hora_23
desp_hora_24
trf_hora_1
trf_hora_2
trf_hora_3
trf_hora_4
trf_hora_5
trf_hora_6
trf_hora_7
trf_hora_8
trf_hora_9
trf_hora_10
trf_hora_11
trf_hora_12
trf_hora_13
trf_hora_14
trf_hora_15
trf_hora_16
trf_hora_17
trf_hora_18
trf_hora_19
trf_hora_20
trf_hora_21
trf_hora_22
trf_hora_23
trf_hora_24
  }
}
`;

const OBTENER_DATA_XM_AFAC = gql`
query obtenerData_xm_afac {
obtenerData_xm_afac {
id
anho
mes
agente
perdida_real_kwh
demanda_real_kwh
generacion_real_kwh
compras_en_bolsa_kwh
compras_en_bolsa_cop
ventas_en_bolsa_kwh
ventas_en_bolsa_cop
compras_en_desviacion_kwh
compras_en_desviacion_cop
ventas_en_desviacion_kwh
ventas_en_desviacion_cop
compras_en_reconciliacion_kwh
compras_en_reconciliacion_cop
ventas_en_reconciliacion_kwh
ventas_en_reconciliacion_cop
compras_en_contratos_kwh
ventas_en_contratos_kwh
compras_energia_en_bolsa_kwh
compras_energia_en_bolsa_cop
ventas_energia_en_bolsa_kwh
ventas_energia_en_bolsa_cop
vr_cargo_por_confiabilidad_cop
vd_cargo_por_confiabilidad_cop
neto_cxc_cop
compras_cargo_por_confiabilidad_cop
ventas_cargo_por_confiabilidad_cop
compras_en_bolsa_nacional_kwh
compras_en_bolsa_nacional_cop
ventas_en_bolsa_nacional_kwh
ventas_en_bolsa_nacional_cop
compras_en_bolsa_internacional_kwh
compras_en_bolsa_internacional_cop
ventas_en_bolsa_internacional_kwh
ventas_en_bolsa_internacional_cop
servicios_agc_cop
responsabilidad_comercial_agc_kwh
responsabilidad_comercial_agc_cop
total_compras_cop
total_ventas_cop
valor_a_pagar_por_srpf_cop
valor_a_recibir_por_srpf_cop
total_restricciones_cop
rentas_de_congestion_cop
restricciones_aliviadas_cop
vebo_kwh
rentas_de_congestion_por_importacion_cop
distribucion_saldo_neto_tie_en_merito_cop
distribucion_saldo_neto_tie_fuera_de_merito_cop
compras_bolsa_con_saldo_neto_tie_merito_cop
rendimientos_financieros_por_exportaciones_tie_cop
alivio_por_cioef_cop
compras_ndc_cop
ventas_desviaciones_oefh_cop
compras_desviaciones_oefh_cop
devolucion_dineros_del_cargo_por_confiabilidad_cop
cobro_dinero_cargo_por_confiabilidad_cop
compras_arranque_y_parada_cop
ventas_arranque_y_parada_cop
ventas_por_eeve_cop
compras_por_eeve_cop
restricciones_por_eeve_cop
cobro_uso_respaldo_cop
alivio_restricciones_res_05_2010_cop
compras_en_bolsa_ties_cop
ventas_en_bolsa_ties_cop
magnitud_en_kwh__de_compras_en_bolsa_de_ties
magnitud_en_kwh_de_ventas_en_bolsa_ties
alivio_por_ejecucion_de_garantia_cop
valor_total_ejecucion_de_garantia_cop
alivio_por_vcsrcfvd_cop
voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop
vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop
costo_de_exportacion_cop
total_costo_de_exportacion_cop
total_de_generacion_ideal_en_kwh_del_agente
total_de_holgura_de_agc_en_kwh_asignados_al_agente
energia_vendida_y_embalsada_asignada_kwh
vr_demanda_res_155_2014
alivio_asociado_a_la_resolucion_creg_024_2015_en_cop
cobro_autogeneradores_res_024_2015
valor_a_favor_para_generador_res_178_2015
valor_a_cargo_para_comercializador_res_178_2015
valor_a_cargo_para_generador_res_195_2015
valor_a_favor_para_generador_res_195_2015
valor_a_favor_para_comercializador_res_195_2015
valor_a_cargo_para_comercializador_res_195_2015
valor_a_cargo_pagos_de_energia_excedentaria_cop
valor_a_favor_por_energia_excedentaria_cop
vc_rd_resolucion_011_de_2015
vf_rd_resolucion_011_de_2015
valor_a_favor_delta_ajuste_rd
valor_a_cargo_delta_ajuste_rd
valor_a_cargo_r026_2016_cop
valor_a_favor_r026_2016_cop
valor_a_favor_r029_2016_cop
rf039_resolucion_039_de_2016
rc039_resolucion_039_de_2016
balance_final_029_de_2016
valor_a_cargo_para_comercializador_res_062_2013
valor_a_favor_para_generador_res_062_2013
valor_del_de_tie_res_049_2018_kwh
valor_del_de_tie_res_049_2018_cop
magnitud_desviacion_despacho_res_060_2019_kwh
valor_desviacion_despacho_res_060_2019_cop
magnitud_desviacion_redespacho_res_060_2019_kwh
valor_desviacion_redespacho_res_060_2019_kwh
desviacion_generacion_variable_res_060_2019_kwh
alivio_desviaciones_res_creg_060_2019_cop
valor_pago_ajuste_res_140_2017_cop
valor_cobro_ajuste_res_140_2017_cop
valor_pago_excedente_res_140_2017_cop
valor_cobro_faltante_res_140_2017_cop  
compras_en_bolsa_ajustes_cop
  }
}
`;

const OBTENER_DATA_XM_ADEM = gql`
query obtenerData_xm_adem {
obtenerData_xm_adem {
id
anho
mes
dia
creador
cod_contenido
agente
contenido
cont_hora_1
cont_hora_2
cont_hora_3
cont_hora_4
cont_hora_5
cont_hora_6
cont_hora_7
cont_hora_8
cont_hora_9
cont_hora_10
cont_hora_11
cont_hora_12
cont_hora_13
cont_hora_14
cont_hora_15
cont_hora_16
cont_hora_17
cont_hora_18
cont_hora_19
cont_hora_20
cont_hora_21
cont_hora_22
cont_hora_23
cont_hora_24 
  }
}
`;

const OBTENER_DATA_MME_VALIDACION = gql`
query obtenerData_mme_validacion{
obtenerData_mme_validacion{
id
creador
empresa_id
fecha
trimestre
anho
facturacion
subsidios
contribuciones
contrib_no_recaud_desp_6m
contrib_recaud_desp_de_conc
giros_recibidos
}
}
`;

const OBTENER_DATA_MME_GIRO = gql`
query obtenerData_mme_giro{
obtenerData_mme_giro{
id
creador
empresa_id
fecha
fondo
resolucion
link_resolucion
giro_cop

}
}
`;
const OBTENER_DATA_CREG_CX = gql`
query obtenerData_creg_cx{
obtenerData_creg_cx{
id
fecha
creador
empresa_id
resolucion
mo
RCT
RCAE
RCSNE
RCNU
Cf
PUI
}
}
`;

const OBTENER_DATA_BANREPUBLICA_TCO = gql`
query obtenerData_banrepublica_tco{
obtenerData_banrepublica_tco{
id
creador
anho_semana
tasa_cred_com_credito_consumo
monto_cred_com_credito_consumo
tasa_cred_com_odinario
monto_cred_com_odinario
tasa__cred_com_preferencial_o_corporativo
monto__cred_com_preferencial_o_corporativo
tasa__cred_com_tesoreria
monto__cred_com_tesoreria
tasa_colocacion_banco_republica
monto_colocacion_banco_republica
tasa_colocacion_sin_tesoreria
monto_colocacion_sin_tesoreria
tasa_colocacion_total
monto_colocacion_total
empresa_id

}
}
`;

const OBTENER_DATA_BANREPUBLICA_TCAP = gql`
query obtenerData_banrepublica_tcap{
obtenerData_banrepublica_tcap{
id
creador
fecha
empresa_id
tasa_a_30_cdt_bancos_comerciales
monto_a_30_cdt_bancos_comerciales
tasa_entre_31_y_44_cdt_bancos_comerciales
monto_entre_31_y_44_cdt_bancos_comerciales
tasa_a_45_cdt_bancos_comerciales
monto_a_45_cdt_bancos_comerciales
tasa_entre_46_y_59_cdt_bancos_comerciales
monto_entre_46_y_59_cdt_bancos_comerciales
tasa_a_60_cdt_bancos_comerciales
monto_a_60_cdt_bancos_comerciales
tasa_entre_61_y_89_cdt_bancos_comerciales
monto_entre_61_y_89_cdt_bancos_comerciales
tasa_a_90_cdt_bancos_comerciales
monto_a_90_cdt_bancos_comerciales
tasa_entre_91_y_119_cdt_bancos_comerciales
monto_entre_91_y_119_cdt_bancos_comerciales
tasa_a_120_cdt_bancos_comerciales
monto_a_120_cdt_bancos_comerciales
tasa_entre_121_y_179_cdt_bancos_comerciales
monto_entre_121_y_179_cdt_bancos_comerciales
tasa_a_180_cdt_bancos_comerciales
monto_a_180_cdt_bancos_comerciales
tasa_entre_181_y_359_cdt_bancos_comerciales
monto_entre_181_y_359_cdt_bancos_comerciales
tasa_a_360_cdt_bancos_comerciales
monto_a_360_cdt_bancos_comerciales
tasa_superiores_a_360_cdt_bancos_comerciales
monto_superiores_a_360_cdt_bancos_comerciales
tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales
monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales
tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales
monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales
tasa_entre_2_y_14_cdats_cdat_bancos_comerciales
monto_entre_2_y_14_cdats_cdat_bancos_comerciales
tasa_entre_15_y_29_cdats_cdat_bancos_comerciales
monto_entre_15_y_29_cdat_bancos_comerciales
tasa_a_30_cdats_cdat_bancos_comerciales
monto_a_30_cdat_bancos_comerciales
tasa_entre_31_y_90_cdats_cdat_bancos_comerciales
monto_entre_31_y_90_cdat_bancos_comerciales
tasa_entre_91_y_180_cdats_cdat_bancos_comerciales
monto_entre_91_y_180_cdat_bancos_comerciales
tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales
monto_de_181_en_adelante_cdats_cdat_bancos_comerciales
tasa_cap_cdat_oficinas_cdat_bancos_comerciales
monto_cap_cdat_oficinas_cdat_bancos_comerciales
}
}
`;

const OBTENER_DATA_DATAXMSTN = gql`
query obtenerDataxmstn{
obtenerDataxmstn{
id
creador
empresa_id
anho
mes
t_cop_kwh
t_prima_cop_kwh
Energia_sin_kwh
Ing_Reg_Bruto_T_cop
Ing_Compensar_T_cop
Ing_Reg_Neto_T_cop
delta_t_cop_kwh

}
}
`;

const OBTENER_DATA_XM_CPROG = gql`
query obtenerData_xm_cprog{
obtenerData_xm_cprog{
id
creador
empresa_id
anho
mes
agente
cargo_cprog_cop_kwh
}
}
`;

const OBTENER_DATA_XM_D015 = gql`
query obtenerData_xm_d015{
obtenerData_xm_d015{
id
creador
empresa_id
anho
mes
cargo_por_uso_dt1_cop_kwh
cargo_por_uso_dt2_cop_kwh
cargo_por_uso_dt3_cop_kwh
cargo_de_inversion_cdi1_cop_kwh
cargo_por_aom_cda1_cop_kwh
cargo_nivel_de_tension_cd2_cop_kwh
cargo_nivel_de_tension_cd3_cop_kwh
cargo_nivel_de_tension_cd3_2_cop_kwh
cargo_nivel_de_tension_cd4_cop_kwh
cargo_por_incentivos_dtcs_cop_kwh
fraccion_dtcs_cop_kwh
ia1
ia2
ia3
iaa1_cop
iaa2_cop
iaa3_cop
irm1_cop
irm2_cop
irm3_cop
fm
iaaom1_cop
iaaom2_cop
iaaom3_cop
aomni1_cop
aomni2_cop
aomni3_cop
ima_n1
ima_n2
ima_n3
imn_n1
imn_n2
imn_n3
aim_n1
aim_n2
aim_n3
naim_n1
naim_n2
naim_n3
fraccion_aim_n1_inversion
fraccion_aim_n1_aom
bra1_cop
bra2_cop
bra3_cop
brae1_cop
brae2_cop
brae3_cop
braen1_cop
braen2_cop
braen3_cop
rc1_cop
rc2_cop
rc3_cop
cdi_aj_1_cop2007_kwh
cd_aj_2_cop2007_kwh
cd_aj_3_cop2007_kwh
cdm_aj_1_cop2007_kwh
iapa1
iapa2
iapa3
iapa1_tant
iapa2_tant
iapa3_tant
oi1_cop
oj2_cop
oj3_cop
irespaldo1_cop
irespaldo2_cop
irespaldo3_cop
imunts1_cop
imunts2_cop
imunts3_cop
ireactiva1_cop
ireactiva2_cop
ireactiva3_cop
aombase1
aombase2
aombase3
brae1_tant_cop
brae2_tant_cop
brae3_tant_cop
deltabraenj_1_cop
deltabraenj_2_cop
deltabraenj_3_cop
deltaingj_1_cop
deltaingj_2_cop
deltaingj_3_cop
brt1_cop
brt2_cop
brt3_cop
rcbia1_cop
rcbia2_cop
rcbia3_cop
rcna1_cop
rcna2_cop
rcna3_cop
rcnafo1_cop
rcnafo2_cop
rcnafo3_cop
inve1_cop
inve2_cop
inve3_cop
inva1_cop
inva2_cop
inva3_cop
inva1_tant_cop
inva2_tant_cop
inva3_tant_cop
invr1_maximo_tant_cop
invr2_maximo_tant_cop
invr3_maximo_tant_cop
invr1_delta_cop
invr2_delta_cop
invr3_delta_cop
invr1_tant_cop
invr2_tant_cop
invr3_tant_cop
pr1
pr2
pr3
pj_1
pj_2
pj_3
pj_1_creg097
pj_2_creg097
pj_3_creg097
acumulado_eej1_kwh
acumulado_eej2_kwh
acumulado_eej3_kwh
acumulado_fej3_2_kwh
euj_2_creg097_kwh
fej3_2_creg097_kwh
ic_saidi_cop
ic_saifi_cop
conp_cop
vcdij_tant_kwh
vcinj_tant_kwh
vacpiec1
vacpiec2
vacpiec3
vacni1
vacni2
vacni3
r_tasa_retorno_actividad_distribucion
famb
css1_cop
css2_cop
css3_cop
dismining1_cop
dismining2_cop
dismining3_cop

}
}
`;

const OBTENER_DATA_XM_DTUN = gql`
query obtenerData_xm_dtun{
obtenerData_xm_dtun{
id
creador
empresa_id
anho
mes
area
nivel_tension
valor
operador_red
version
}
}
`;
const OBTENER_DATA_XM_IPR = gql`
query obtenerData_xm_ipr{
obtenerData_xm_ipr{
id
creador
empresa_id
anho
mes
strID
agrupaORMercado
fechavigencia
conceptoID
nivelEntrada
nivelSalida
valor

}
}
`;
const OBTENER_DATA_XM_GUATAPE= gql`
query obtenerData_xm_guatape{
        obtenerData_xm_guatape{
id
creador
empresa_id
anho
mes
agente
demanda_kwh
crs_variable_guatape_cop
}
}
`;

const OBTENER_DATA_EMPRESA_ANUAL= gql`
query obtenerData_empresa_anual{
obtenerData_empresa_anual{
id
creador
empresa_id
anho
contribuciones_creg
contribuciones_sspd

}
}
`;

const NuevoCalculo_CU= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_DATA_DANE);
const { data:data2, error:error2, loading:loading2} = useQuery(OBTENER_USUARIO);
const { data:data3, error:error3, loading:loading3} = useQuery(OBTENER_DATA_EMPRESAS);
const { data:data4, error:error4, loading:loading4} = useQuery(OBTENER_DATA_XM_TSERV);
const { data:data5, error:error5, loading:loading5} = useQuery(OBTENER_DATA_XM_TRSM);
const { data:data6, error:error6, loading:loading6} = useQuery(OBTENER_DATA_XM_DSPCTTO);
const { data:data7, error:error7, loading:loading7} = useQuery(OBTENER_DATA_XM_AFAC);
const { data:data8, error:error8, loading:loading8} = useQuery(OBTENER_DATA_XM_ADEM);
const { data:data9, error:error9, loading:loading9} = useQuery(OBTENER_DATA_MME_VALIDACION);
const { data:data10, error:error10, loading:loading10} = useQuery(OBTENER_DATA_MME_GIRO);
const { data:data11, error:error11, loading:loading11} = useQuery(OBTENER_DATA_CREG_CX);
const { data:data12, error:error12, loading:loading12} = useQuery(OBTENER_DATA_BANREPUBLICA_TCO);
const { data:data13, error:error13, loading:loading13} = useQuery(OBTENER_DATA_BANREPUBLICA_TCAP);
const { data:data14, error:error14, loading:loading14} = useQuery(OBTENER_DATA_DATAXMSTN);
const { data:data15, error:error15, loading:loading15} = useQuery(OBTENER_DATA_XM_CPROG);
const { data:data16, error:error16, loading:loading16} = useQuery(OBTENER_DATA_XM_IPR);
const { data:data17, error:error17, loading:loading17} = useQuery(OBTENER_DATA_XM_D015);
const { data:data18, error:error18, loading:loading18} = useQuery(OBTENER_DATA_XM_DTUN);
const { data:data19, error:error19, loading:loading19} = useQuery(OBTENER_DATA_XM_GUATAPE);
const { data:data20, error:error20, loading:loading20} = useQuery(OBTENER_RES_COMPONENTES_CU_TARIFA);
const { data:data21, error:error21, loading:loading21} = useQuery(OBTENER_DATA_EMPRESA_ANUAL);


const [nuevoRes_componentes_cu_tarifa]=useMutation(NUEVO_DATA_RES_COMPONENTES_CU_TARIFA, {
  update(cache, { data: { nuevoRes_componentes_cu_tarifa} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerRes_componentes_cu_tarifa} = cache.readQuery({ query: OBTENER_RES_COMPONENTES_CU_TARIFA});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_RES_COMPONENTES_CU_TARIFA,
data: {
  obtenerRes_componentes_cu_tarifa: [...obtenerRes_componentes_cu_tarifa, nuevoRes_componentes_cu_tarifa]
}
})
}
})
const [dataCargada, setDataCargada] = useState(0)
const [creador, setcreador] = useState(0);const [anho, setAnho] = useState(props.anho);const [mes, setMes] = useState(props.mes);const [qc, setQc] = useState(0);
const [mc, setMc] = useState(0);
const [pc, setPc] = useState(0);const [ref_g, setRef_G] = useState(0);const [max_g, setMax_G] = useState(0);const [cr, setCr] = useState(0);
const [ad, setAd] = useState(0);const [aj, setAj] = useState(0);const [pb, setPb] = useState(0);
const [gc, setGc] = useState(0);
const [tx, setTx] = useState(0);const [dtun_nt1_e, setDtun_Nt1_E] = useState(0);const [dtun_nt1_c, setDtun_Nt1_C] = useState(0);
const [dtun_nt1_p, setDtun_Nt1_P] = useState(0);const [dtun_nt2, setDtun_Nt2] = useState(0);const [dtun_nt3, setDtun_Nt3] = useState(0);
const [cdi_100, setCdi_100] = useState(0);const [cdi_50, setCdi_50] = useState(0);const [cdm, setCdm] = useState(0);const [cd4, setCd4] = useState(0);
const [cd3, setCd3] = useState(0);const [cd2, setCd2] = useState(0);const [dnt1, setDnt1] = useState(0);const [dnt2, setDnt2] = useState(0);
const [dnt3, setDnt3] = useState(0);const [dnt4, setDnt4] = useState(0);const [crs, setCrs] = useState(0);const [rcal, setRcal] = useState(0)
;const [r, setR] = useState(0);const [iprstn, setIprstn] = useState(0);const [pr_nt1, setPr_Nt1] = useState(0);
const [pr_nt2, setPr_Nt2] = useState(0);const [pr_nt3, setPr_Nt3] = useState(0);const [pr_nt4, setPr_Nt4] = useState(0);
const [cer, setCer] = useState(0);const [cfm, setCfm] = useState(0);const [x, setX] = useState(0);const [rc, setRc] = useState(0);const [ul_trim_val_mme, setUl_Trim_Val_Mme] = useState(0);
const [anho_ul_trim_val_mme, setAnho_Ul_Trim_Val_Mme] = useState(0);const [sub1, setSub1] = useState(0);const [sub2, setSub2] = useState(0);
const [n_sub1, setN_Sub1] = useState(0);const [m_sub2, setM_Sub2] = useState(0);const [facturacion_t, setFacturacion_T] = useState(0);
const [r1, setR1] = useState(0);const [r2, setR2] = useState(0);const [sup_def, setSup_Def] = useState(0);const [cfs, setCfs] = useState(0);
const [cfe, setCfe] = useState(0);const [c_ast, setC_Ast] = useState(0);const [cvr, setCvr] = useState(0);const [cv, setCv] = useState(0);
const [cu_nt1_100, setCu_Nt1_100] = useState(0);const [cu_nt1_50, setCu_Nt1_50] = useState(0);const [cu_nt1_0, setCu_Nt1_0] = useState(0);
const [cu_nt2, setCu_Nt2] = useState(0);const [cu_nt3, setCu_Nt3] = useState(0);const [cu_nt4, setCu_Nt4] = useState(0);
const [nt1_100_estrato_1_men_cs, setNt1_100_Estrato_1_Men_Cs] = useState(0);const [nt1_100_estrato_2_men_cs, setNt1_100_Estrato_2_Men_Cs] = useState(0);
const [nt1_100_estrato_3_men_cs, setNt1_100_Estrato_3_Men_Cs] = useState(0);const [nt1_100_estrato_4_men_cs, setNt1_100_Estrato_4_Men_Cs] = useState(0);
const [nt1_100_estrato_5_men_cs, setNt1_100_Estrato_5_Men_Cs] = useState(0);const [nt1_100_estrato_6_men_cs, setNt1_100_Estrato_6_Men_Cs] = useState(0);
const [nt1_100_estrato_4, setNt1_100_Estrato_4] = useState(0);const [nt1_100_estrato_5, setNt1_100_Estrato_5] = useState(0);
const [nt1_100_estrato_6, setNt1_100_Estrato_6] = useState(0);const [nt1_100_c, setNt1_100_C] = useState(0);const [nt1_100_i_con_c, setNt1_100_I_Con_C] = useState(0);
const [nt1_100_i_sin_c, setNt1_100_I_Sin_C] = useState(0);const [nt1_100_p, setNt1_100_P] = useState(0);const [nt1_100_o, setNt1_100_O] = useState(0);
const [nt1_50_estrato_1_men_cs, setNt1_50__Estrato_1_Men_Cs] = useState(0);
const [nt1_50_estrato_2_men_cs, setNt1_50__Estrato_2_Men_Cs] = useState(0);
const [nt1_50_estrato_3_men_cs, setNt1_50__Estrato_3_Men_Cs] = useState(0);
const [nt1_50_estrato_4_men_cs, setNt1_50__Estrato_4_Men_Cs] = useState(0);const [nt1_50_estrato_5_men_cs, setNt1_50__Estrato_5_Men_Cs] = useState(0);
const [nt1_50_estrato_6_men_cs, setNt1_50__Estrato_6_Men_Cs] = useState(0);const [nt1_50_estrato_4, setNt1_50__Estrato_4] = useState(0);
const [nt1_50_estrato_5, setNt1_50__Estrato_5] = useState(0);const [nt1_50_estrato_6, setNt1_50__Estrato_6] = useState(0);
const [nt1_50_c, setNt1_50__C] = useState(0);const [nt1_50_i_con_c, setNt1_50__I_Con_C] = useState(0);
const [nt1_50_i_sin_c, setNt1_50__I_Sin_C] = useState(0);const [nt1_50_p, setNt1_50__P] = useState(0);
const [nt1_50_o, setNt1_50__O] = useState(0);const [nt1_0_estrato_1_men_cs, setNt1_0_Estrato_1_Men_Cs] = useState(0);
const [nt1_0_estrato_2_men_cs, setNt1_0_Estrato_2_Men_Cs] = useState(0);const [nt1_0_estrato_3_men_cs, setNt1_0_Estrato_3_Men_Cs] = useState(0);
const [nt1_0_estrato_4_men_cs, setNt1_0_Estrato_4_Men_Cs] = useState(0);const [nt1_0_estrato_5_men_cs, setNt1_0_Estrato_5_Men_Cs] = useState(0);
const [nt1_0_estrato_6_men_cs, setNt1_0_Estrato_6_Men_Cs] = useState(0);const [nt1_0_estrato_4, setNt1_0_Estrato_4] = useState(0);
const [nt1_0_estrato_5, setNt1_0_Estrato_5] = useState(0);const [nt1_0_estrato_6, setNt1_0_Estrato_6] = useState(0);
const [nt1_0_c, setNt1_0_C] = useState(0);const [nt1_0_i_con_c, setNt1_0_I_Con_C] = useState(0);const [nt1_0_i_sin_c, setNt1_0_I_Sin_C] = useState(0);
const [nt1_0_p, setNt1_0_P] = useState(0);const [nt1_0_o, setNt1_0_O] = useState(0);const [nt2_c, setNt2_C] = useState(0);
const [nt2_i_con_c, setNt2_I_Con_C] = useState(0);const [nt2_i_sin_c, setNt2_I_Sin_C] = useState(0);const [nt2_o, setNt2_O] = useState(0);
const [nt2_ap, setNt2_Ap] = useState(0);const [nt2_bsnmen_cs, setNt2_Bsnmen_Cs] = useState(0);const [nt2_bsnmay_cs, setNt2_Bsnmay_Cs] = useState(0);
const [nt3_c, setNt3_C] = useState(0);const [nt3_i_con_c, setNt3_I_Con_C] = useState(0);const [nt3_i_sin_c, setNt3_I_Sin_C] = useState(0);
const [nt3_o, setNt3_O] = useState(0);const [nt3_ap, setNt3_Ap] = useState(0);const [empresa_id, setempresa_id] = useState(0);
const [porc_subE1_100, setPorc_subE1_100] = useState(0);
const [porc_subE2_100, setPorc_subE2_100] = useState(0)
const [porc_subE1_50, setPorc_subE1_50] = useState(0)
const [porc_subE2_50, setPorc_subE2_50] = useState(0)
const [porc_subE1_0, setPorc_subE1_0] = useState(0)
const [porc_subE2_0, setPorc_subE2_0] = useState(0)
const [pv, setPv] = useState(0);
const [cu_nt1_100_ot, setCu_Nt1_100_ot] = useState(0);const [cu_nt1_50_ot, setCu_Nt1_50_ot] = useState(0);const [cu_nt1_0_ot, setCu_Nt1_0_ot] = useState(0);
const [cu_nt2_ot, setCu_Nt2_ot] = useState(0);const [cu_nt3_ot, setCu_Nt3_ot] = useState(0);
const [saldo_nt1_100_ot, setSaldo_Nt1_100_ot] = useState(0);const [saldo_nt1_50_ot, setSaldo_Nt1_50_ot] = useState(0);const [saldo_nt1_0_ot, setSaldo_Nt1_0_ot] = useState(0);
const [saldo_nt2_ot, setSaldo_Nt2_ot] = useState(0);const [saldo_nt3_ot, setSaldo_Nt3_ot] = useState(0);
const [saldo_total_ot, setSaldo_Total_ot] = useState(0);



        const [status, setStatus] = useState(false);
        let text = "";

porc_subE2_0

var data_empresa, data_empresam, data_dane, data_danem
if (mes===1){
        var mesm=12
        var anhom=anho-1  
        var mesm2=11
        var anhom2=anho-1 
}
else{
        if(mes===2){
        var mesm=m-1
        var anhom=anho  
        var mesm2=12
        var anhom2=anho-1            
        }
        var mesm=mes-1
        var anhom=anho   
        var mesm2=mes-2
        var anhom2=anho   
}



useEffect(() => {

if(loading2) return null;
setcreador(parseInt(data2.obtenerUsuario.id));
setempresa_id(data2.obtenerUsuario.empresa);

},[]);
      

const formik=useFormik({
initialValues: {
creador:creador,anho:anho,mes:mes,qc:qc,pc:pc,ref_g:ref_g,max_g:max_g,cr:cr,ad:ad,aj:aj,
pb:pb,gc:gc,tx:tx,dtun_nt1_e:dtun_nt1_e,dtun_nt1_c:dtun_nt1_c,dtun_nt1_p:dtun_nt1_p,dtun_nt2:dtun_nt2,dtun_nt3:dtun_nt3,
cdi_100:cdi_100,cdi_50:cdi_50,cdm:cdm,cd4:cd4,cd3:cd3,cd2:cd2,dnt1:dnt1,dnt2:dnt2,dnt3:dnt3,dnt4:dnt4,crs:crs,rcal:rcal,r:r,iprstn:iprstn,pr_nt1:pr_nt1,
pr_nt2:pr_nt2,pr_nt3:pr_nt3,pr_nt4:pr_nt4,cer:cer,cfm:cfm,rc:rc,ul_trim_val_mme:ul_trim_val_mme,anho_ul_trim_val_mme:anho_ul_trim_val_mme,sub1:sub1,sub2:sub2,
n_sub1:n_sub1,m_sub2:m_sub2,facturacion_t:facturacion_t,r1:r1,r2:r2,sup_def:sup_def,cfs:cfs,cfe:cfe,c_ast:c_ast,cvr:cvr,cv:cv,cu_nt1_100:cu_nt1_100,cu_nt1_50:cu_nt1_50,
cu_nt1_0:cu_nt1_0,cu_nt2:cu_nt2,cu_nt3:cu_nt3,cu_nt4:cu_nt4,nt1_100_estrato_1_men_cs:nt1_100_estrato_1_men_cs,nt1_100_estrato_2_men_cs:nt1_100_estrato_2_men_cs,
nt1_100_estrato_3_men_cs:nt1_100_estrato_3_men_cs,nt1_100_estrato_4_men_cs:nt1_100_estrato_4_men_cs,nt1_100_estrato_5_men_cs:nt1_100_estrato_5_men_cs,
nt1_100_estrato_6_men_cs:nt1_100_estrato_6_men_cs,nt1_100_estrato_4:nt1_100_estrato_4,nt1_100_estrato_5:nt1_100_estrato_5,nt1_100_estrato_6:nt1_100_estrato_6,
nt1_100_c:nt1_100_c,nt1_100_i_con_c:nt1_100_i_con_c,nt1_100_i_sin_c:nt1_100_i_sin_c,nt1_100_p:nt1_100_p,nt1_100_o:nt1_100_o,
nt1_50_estrato_1_men_cs:nt1_50_estrato_1_men_cs,nt1_50_estrato_2_men_cs:nt1_50_estrato_2_men_cs,nt1_50_estrato_3_men_cs:nt1_50_estrato_3_men_cs,
nt1_50_estrato_4_men_cs:nt1_50_estrato_4_men_cs,nt1_50_estrato_5_men_cs:nt1_50_estrato_5_men_cs,nt1_50_estrato_6_men_cs:nt1_50_estrato_6_men_cs,
nt1_50_estrato_4:nt1_50_estrato_4,nt1_50_estrato_5:nt1_50_estrato_5,nt1_50_estrato_6:nt1_50_estrato_6,nt1_50_c:nt1_50_c,
nt1_50_i_con_c:nt1_50_i_con_c,nt1_50_i_sin_c:nt1_50_i_sin_c,nt1_50_p:nt1_50_p,nt1_50_o:nt1_50_o,nt1_0_estrato_1_men_cs:nt1_0_estrato_1_men_cs,
nt1_0_estrato_2_men_cs:nt1_0_estrato_2_men_cs,nt1_0_estrato_3_men_cs:nt1_0_estrato_3_men_cs,nt1_0_estrato_4_men_cs:nt1_0_estrato_4_men_cs,
nt1_0_estrato_5_men_cs:nt1_0_estrato_5_men_cs,nt1_0_estrato_6_men_cs:nt1_0_estrato_6_men_cs,nt1_0_estrato_4:nt1_0_estrato_4,nt1_0_estrato_5:nt1_0_estrato_5,
nt1_0_estrato_6:nt1_0_estrato_6,nt1_0_c:nt1_0_c,nt1_0_i_con_c:nt1_0_i_con_c,nt1_0_i_sin_c:nt1_0_i_sin_c,nt1_0_p:nt1_0_p,nt1_0_o:nt1_0_o,nt2_c:nt2_c,nt2_i_con_c:nt2_i_con_c,
nt2_i_sin_c:nt2_i_sin_c,nt2_o:nt2_o,nt2_ap:nt2_ap,nt2_bsnmen_cs:nt2_bsnmen_cs,nt2_bsnmay_cs:nt2_bsnmay_cs,nt3_c:nt3_c,nt3_i_con_c:nt3_i_con_c,nt3_i_sin_c:nt3_i_sin_c,
nt3_o:nt3_o,nt3_ap:nt3_ap,empresa_id:empresa_id,pv:pv,cu_nt1_100_ot:cu_nt1_100_ot,cu_nt1_50_ot:cu_nt1_50_ot,cu_nt1_0_ot:cu_nt1_0_ot,cu_nt2_ot:cu_nt2_ot,
cu_nt3_ot:cu_nt3_ot,saldo_nt1_100_ot:saldo_nt1_100_ot,saldo_nt1_50_ot:saldo_nt1_50_ot,saldo_nt1_0_ot:saldo_nt1_0_ot,saldo_nt2_ot:saldo_nt2_ot,saldo_nt3_ot:saldo_nt3_ot
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
}),
onSubmit: async valores => {
const{creador,anho,mes,qc,pc,ref_g,max_g,cr,ad,aj,pb,gc,tx,dtun_nt1_e,dtun_nt1_c,dtun_nt1_p,dtun_nt2,dtun_nt3,cdi_100,cdi_50,cdm,cd4,cd3,cd2,dnt1,dnt2,dnt3,dnt4,crs,rcal,r,iprstn,pr_nt1,pr_nt2,pr_nt3,pr_nt4,cer,cfm,rc,ul_trim_val_mme,anho_ul_trim_val_mme,sub1,sub2,n_sub1,m_sub2,facturacion_t,r1,r2,sup_def,cfs,cfe,c_ast,cvr,cv,cu_nt1_100,cu_nt1_50,cu_nt1_0,cu_nt2,cu_nt3,cu_nt4,nt1_100_estrato_1_men_cs,nt1_100_estrato_2_men_cs,nt1_100_estrato_3_men_cs,nt1_100_estrato_4_men_cs,nt1_100_estrato_5_men_cs,nt1_100_estrato_6_men_cs,nt1_100_estrato_4,nt1_100_estrato_5,nt1_100_estrato_6,nt1_100_c,nt1_100_i_con_c,nt1_100_i_sin_c,nt1_100_p,nt1_100_o,nt1_50_estrato_1_men_cs,nt1_50_estrato_2_men_cs,nt1_50_estrato_3_men_cs,nt1_50_estrato_4_men_cs,nt1_50_estrato_5_men_cs,nt1_50_estrato_6_men_cs,nt1_50_estrato_4,nt1_50_estrato_5,nt1_50_estrato_6,nt1_50_c,nt1_50_i_con_c,nt1_50_i_sin_c,nt1_50_p,nt1_50_o,nt1_0_estrato_1_men_cs,nt1_0_estrato_2_men_cs,nt1_0_estrato_3_men_cs,nt1_0_estrato_4_men_cs,nt1_0_estrato_5_men_cs,nt1_0_estrato_6_men_cs,nt1_0_estrato_4,nt1_0_estrato_5,nt1_0_estrato_6,nt1_0_c,nt1_0_i_con_c,nt1_0_i_sin_c,nt1_0_p,nt1_0_o,nt2_c,nt2_i_con_c,nt2_i_sin_c,nt2_o,nt2_ap,nt2_bsnmen_cs,nt2_bsnmay_cs,nt3_c,nt3_i_con_c,nt3_i_sin_c,nt3_o,nt3_ap,empresa_id}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
console.log(valores)
const{data}=await nuevoRes_componentes_cu_tarifa({
variables:{
input:{
creador,anho,mes,qc,pc,ref_g,max_g,cr,ad,aj,pb,gc,tx,dtun_nt1_e,dtun_nt1_c,dtun_nt1_p,dtun_nt2,dtun_nt3,cdi_100,cdi_50,cdm,cd4,cd3,cd2,dnt1,dnt2,dnt3,dnt4,crs,rcal,r,iprstn,pr_nt1,pr_nt2,pr_nt3,pr_nt4,cer,cfm,rc,ul_trim_val_mme,anho_ul_trim_val_mme,sub1,sub2,n_sub1,m_sub2,facturacion_t,r1,r2,sup_def,cfs,cfe,c_ast,cvr,cv,cu_nt1_100,cu_nt1_50,cu_nt1_0,cu_nt2,cu_nt3,cu_nt4,nt1_100_estrato_1_men_cs,nt1_100_estrato_2_men_cs,nt1_100_estrato_3_men_cs,nt1_100_estrato_4_men_cs,nt1_100_estrato_5_men_cs,nt1_100_estrato_6_men_cs,nt1_100_estrato_4,nt1_100_estrato_5,nt1_100_estrato_6,nt1_100_c,nt1_100_i_con_c,nt1_100_i_sin_c,nt1_100_p,nt1_100_o,nt1_50_estrato_1_men_cs,nt1_50_estrato_2_men_cs,nt1_50_estrato_3_men_cs,nt1_50_estrato_4_men_cs,nt1_50_estrato_5_men_cs,nt1_50_estrato_6_men_cs,nt1_50_estrato_4,nt1_50_estrato_5,nt1_50_estrato_6,nt1_50_c,nt1_50_i_con_c,nt1_50_i_sin_c,nt1_50_p,nt1_50_o,nt1_0_estrato_1_men_cs,nt1_0_estrato_2_men_cs,nt1_0_estrato_3_men_cs,nt1_0_estrato_4_men_cs,nt1_0_estrato_5_men_cs,nt1_0_estrato_6_men_cs,nt1_0_estrato_4,nt1_0_estrato_5,nt1_0_estrato_6,nt1_0_c,nt1_0_i_con_c,nt1_0_i_sin_c,nt1_0_p,nt1_0_o,nt2_c,nt2_i_con_c,nt2_i_sin_c,nt2_o,nt2_ap,nt2_bsnmen_cs,nt2_bsnmay_cs,nt3_c,nt3_i_con_c,nt3_i_sin_c,nt3_o,nt3_ap,empresa_id
}
}
});
} catch (error) {
console.log(valores)
console.log(error);
}
}
})

useEffect(() => {
        if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
                && !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){     
                const Alfa=0.036578428408 //***************************** */
        setGc((qc*(Alfa*pc+(1-Alfa)*mc)+(1-qc)*pb)+aj)
        setRef_G(qc*(Alfa*pc+(1-Alfa)*mc)+(1-qc)*mc)
        setMax_G((qc*(Alfa*pc+(1-Alfa)*mc)+(1-qc)*mc)*1.3)
        setCr(qc*(Alfa*pc+(1-Alfa)*mc)+(1-qc)*pb)
        setCfm(cfm*(1-x))

                        const data_xm_dtun=data18.obtenerData_xm_dtun
                        const data_xm_dtunm1=data_xm_dtun.filter(data_xm_dtun => data_xm_dtun.anho===anhom && data_xm_dtun.mes===mes && data_xm_dtun.operador_red==='ENELAR Mercado de Comercialización ARAUCA'  && data_xm_dtun.nivel_tension===1)                        
                        const data_xm_dtunm2=data_xm_dtun.filter(data_xm_dtun => data_xm_dtun.anho===anhom && data_xm_dtun.mes===mes && data_xm_dtun.operador_red==='ENELAR Mercado de Comercialización ARAUCA'  && data_xm_dtun.nivel_tension===2)            
                        const data_xm_dtunm3=data_xm_dtun.filter(data_xm_dtun => data_xm_dtun.anho===anhom && data_xm_dtun.mes===mes && data_xm_dtun.operador_red==='ENELAR Mercado de Comercialización ARAUCA'  && data_xm_dtun.nivel_tension===3)            
                        const data_xm_d015=data17.obtenerData_xm_d015
                        const data_xm_d015m=data_xm_d015.filter(data_xm_d015 => data_xm_d015.anho===anho && data_xm_d015.mes===mes && data_xm_d015.empresa_id===data2.obtenerUsuario.empresa)                                                                              

                        if(data_xm_dtunm1.length>0){
                                setDnt1(data_xm_dtunm1[0].valor)
                                setDnt2(data_xm_dtunm2[0].valor)
                                setDnt3(data_xm_dtunm3[0].valor)
                        }
                        else{
                                
                                setDnt1(data_xm_d015m[0].cargo_por_uso_dt1_cop_kwh)
                                setDnt2(data_xm_d015m[0].cargo_por_uso_dt2_cop_kwh)
                                setDnt3(data_xm_d015m[0].cargo_por_uso_dt3_cop_kwh)
                                setCdi_100(data_xm_d015m[0].cargo_de_inversion_cdi1_cop_kwh)
                                setCdi_50(data_xm_d015m[0].cargo_de_inversion_cdi1_cop_kwh/2)
                                setCd2(data_xm_d015m[0].cargo_nivel_de_tension_cd2_cop_kwh)
                                setCd3(data_xm_d015m[0].cargo_nivel_de_tension_cd3_cop_kwh)
                                setCd4(data_xm_d015m[0].cargo_nivel_de_tension_cd4_cop_kwh)
                                setCdm(data_xm_d015m[0].cargo_por_aom_cda1_cop_kwh)
                        }
        

        }
        },[qc,pc,pb,iprstn,x]);


        useEffect(() => {
                if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
                && !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){     

                        const data_xm_ipr=data16.obtenerData_xm_ipr
                        const data_xm_iprm1=data_xm_ipr.filter(data_xm_ipr => data_xm_ipr.anho===anho && data_xm_ipr.mes===mes && data_xm_ipr.agrupaORMercado==='GUVM' && data_xm_ipr.nivelEntrada===1)
                        const data_xm_iprm2=data_xm_ipr.filter(data_xm_ipr => data_xm_ipr.anho===anho && data_xm_ipr.mes===mes && data_xm_ipr.agrupaORMercado==='GUVM' && data_xm_ipr.nivelEntrada===2)
                        const data_xm_iprm3=data_xm_ipr.filter(data_xm_ipr => data_xm_ipr.anho===anho && data_xm_ipr.mes===mes && data_xm_ipr.agrupaORMercado==='GUVM' && data_xm_ipr.nivelEntrada===3)
                        const data_xm_iprm4=data_xm_ipr.filter(data_xm_ipr => data_xm_ipr.anho===anho && data_xm_ipr.mes===mes && data_xm_ipr.agrupaORMercado==='GUVM' && data_xm_ipr.nivelEntrada===4)
                        const data_xm_cprog=data15.obtenerData_xm_cprog
                        const data_xm_cprogm=data_xm_cprog.filter(data_xm_cprog => data_xm_cprog.anho===anho && data_xm_cprog.mes===mes && data_xm_cprog.agente==='EGVD')
                        setPr_Nt1(((gc*(data_xm_iprm1[0].valor+iprstn))/(1-(data_xm_iprm1[0].valor+iprstn))+(tx*data_xm_iprm1[0].valor/(1-data_xm_iprm1[0].valor)))+data_xm_cprogm[0].cargo_cprog_cop_kwh)
                        setPr_Nt2(((gc*(data_xm_iprm2[0].valor+iprstn))/(1-(data_xm_iprm2[0].valor+iprstn))+(tx*data_xm_iprm2[0].valor/(1-data_xm_iprm2[0].valor)))+data_xm_cprogm[0].cargo_cprog_cop_kwh)        
                        setPr_Nt3(((gc*(data_xm_iprm3[0].valor+iprstn))/(1-(data_xm_iprm3[0].valor+iprstn))+(tx*data_xm_iprm3[0].valor/(1-data_xm_iprm3[0].valor)))+data_xm_cprogm[0].cargo_cprog_cop_kwh)
                        setPr_Nt4(((gc*(data_xm_iprm4[0].valor+iprstn))/(1-(data_xm_iprm4[0].valor+iprstn))+(tx*data_xm_iprm4[0].valor/(1-data_xm_iprm4[0].valor)))+data_xm_cprogm[0].cargo_cprog_cop_kwh)
                }
        },[gc]);

useEffect(() => {
if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
&& !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){     
setCu_Nt1_100(gc+tx+r+cv+pr_nt1+dnt1)
setCu_Nt1_50(gc+tx+r+cv+pr_nt1+dnt1-cdi_50)
setCu_Nt1_0(gc+tx+r+cv+pr_nt1+dnt1-cdi_100)
setCu_Nt2(gc+tx+r+cv+pr_nt2+dnt2)
setCu_Nt3(gc+tx+r+cv+pr_nt3+dnt3)
}
},[gc,cv,tx,r,pr_nt1]);






useEffect(() => {
        if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
                && !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){     
setNt1_100_Estrato_1_Men_Cs(cu_nt1_100*(1-porc_subE1_100))
setNt1_100_Estrato_2_Men_Cs(cu_nt1_100*(1-porc_subE2_100))
setNt1_100_Estrato_3_Men_Cs(cu_nt1_100*(1-0.15))
setNt1_100_Estrato_4_Men_Cs(cu_nt1_100)
setNt1_100_Estrato_5_Men_Cs(cu_nt1_100*1.2)
setNt1_100_Estrato_6_Men_Cs(cu_nt1_100*1.2)
setNt1_100_Estrato_4(cu_nt1_100)
setNt1_100_Estrato_5(cu_nt1_100*1.2)
setNt1_100_Estrato_6(cu_nt1_100*1.2)
setNt1_100_C (cu_nt1_100*1.2)
setNt1_100_I_Con_C (cu_nt1_100*1.2)
setNt1_100_I_Sin_C (cu_nt1_100)
setNt1_100_P (cu_nt1_100)
setNt1_100_O (cu_nt1_100)
setNt1_50__Estrato_1_Men_Cs((cu_nt1_100-cdi_100/2)*(1-porc_subE1_50))
setNt1_50__Estrato_2_Men_Cs((cu_nt1_100-cdi_100/2)*(1-porc_subE2_50))
setNt1_50__Estrato_3_Men_Cs((cu_nt1_100-cdi_100/2)*(1-0.15))
setNt1_50__Estrato_4_Men_Cs((cu_nt1_100-cdi_100/2))
setNt1_50__Estrato_5_Men_Cs((cu_nt1_100-cdi_100/2)*(1.2))
setNt1_50__Estrato_6_Men_Cs((cu_nt1_100-cdi_100/2)*(1.2))
setNt1_50__Estrato_4((cu_nt1_100-cdi_100/2)*(1))
setNt1_50__Estrato_5((cu_nt1_100-cdi_100/2)*(1.2))
setNt1_50__Estrato_6((cu_nt1_100-cdi_100/2)*(1.2))
setNt1_50__C((cu_nt1_100-cdi_100/2)*(1.2))
setNt1_50__I_Con_C((cu_nt1_100-cdi_100/2)*(1.2))
setNt1_50__I_Sin_C((cu_nt1_100-cdi_100/2)*(1))
setNt1_50__P((cu_nt1_100-cdi_100/2)*(1))
 setNt1_50__O((cu_nt1_100-cdi_100/2)*(1))
 setNt1_0_Estrato_1_Men_Cs((cu_nt1_100-cdi_100)*(1-porc_subE1_0))
 setNt1_0_Estrato_2_Men_Cs((cu_nt1_100-cdi_100)*(1-porc_subE2_0))
 setNt1_0_Estrato_3_Men_Cs((cu_nt1_100-cdi_100)*(1-0.15))
 setNt1_0_Estrato_4_Men_Cs((cu_nt1_100-cdi_100)*(1))
 setNt1_0_Estrato_5_Men_Cs((cu_nt1_100-cdi_100)*(1.2))
 setNt1_0_Estrato_6_Men_Cs((cu_nt1_100-cdi_100)*(1.2))
 setNt1_0_Estrato_4((cu_nt1_100-cdi_100))
 setNt1_0_Estrato_5((cu_nt1_100-cdi_100)*1.2)
 setNt1_0_Estrato_6((cu_nt1_100-cdi_100)*1.2)
 setNt1_0_C((cu_nt1_100-cdi_100)*1.2)
 setNt1_0_I_Con_C((cu_nt1_100-cdi_100)*1.2)
 setNt1_0_I_Sin_C((cu_nt1_100-cdi_100)*1)
 setNt1_0_P((cu_nt1_100-cdi_100)*1)
 setNt1_0_O((cu_nt1_100-cdi_100)*1)
 setNt2_C(cu_nt2*1.2)
 setNt2_I_Con_C(cu_nt2*1.2)
 setNt2_I_Sin_C(cu_nt2)
 setNt2_O(cu_nt2)
 setNt2_Ap(cu_nt2)
 setNt2_Bsnmen_Cs(cu_nt2*(1-0.60))
 setNt2_Bsnmay_Cs(cu_nt2)
 setNt3_C(cu_nt3)
 setNt3_I_Con_C(cu_nt3*1.2)
 setNt3_I_Sin_C(cu_nt3)
 setNt3_O(cu_nt3)
 setNt3_Ap(cu_nt3)
 setempresa_id(data2.obtenerUsuario.empresa);
}
},[porc_subE1_100,porc_subE2_100,porc_subE1_50,porc_subE2_50,porc_subE1_0,porc_subE2_0]);

useEffect(() => {
if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
&& !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){     
setCfs(((sub1*(((1+r1)**(n_sub1+0.63))-1))-(sub2*(((1+r2)**(m_sub2))-1)))/facturacion_t)
setCfe((((sub1*(((1+r1)**(n_sub1+0.63))-1))-(sub2*(((1+r2)**(m_sub2))-1)))/facturacion_t)+0.00042)
}
},[n_sub1,m_sub2,r1,r2,sub1,sub2,facturacion_t]);



useEffect(() => {
if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
&& !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){     
const data_Res_componentes_cu_tarifa=data20.obtenerRes_componentes_cu_tarifa
const data_Res_componentes_cu_tarifam=data_Res_componentes_cu_tarifa.filter(data_Res_componentes_cu_tarifa => data_Res_componentes_cu_tarifa.anho===anhom && data_Res_componentes_cu_tarifa.mes===mesm) 
setC_Ast((data_Res_componentes_cu_tarifam[0].gc+data_Res_componentes_cu_tarifam[0].tx+data_Res_componentes_cu_tarifam[0].dtun_nt1_e+data_Res_componentes_cu_tarifam[0].pr_nt1+data_Res_componentes_cu_tarifam[0].r)*(cfe+0.0273+rc))
}
},[cfe,rc]);
        

useEffect(() => {
if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
&& !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){     
const data_Res_componentes_cu_tarifa=data20.obtenerRes_componentes_cu_tarifa
const data_Res_componentes_cu_tarifam=data_Res_componentes_cu_tarifa.filter(data_Res_componentes_cu_tarifa => data_Res_componentes_cu_tarifa.anho===anhom && data_Res_componentes_cu_tarifa.mes===mesm) 
data_dane=data1.obtenerData_dane
data_danem=data_dane.filter(data_dane => data_dane.anho===anhom && data_dane.mes===mesm)
const data_danem2=data_dane.filter(data_dane => data_dane.anho===anhom2 && data_dane.mes===mesm2)        
const tarifamc1_100=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_1_men_cs*data_danem[0].ipc/data_danem2[0].ipc
const tarifamc2_100=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_2_men_cs*data_danem[0].ipc/data_danem2[0].ipc
const tarifamc1_50=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_1_men_cs*data_danem[0].ipc/data_danem2[0].ipc
const tarifamc2_50=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_2_men_cs*data_danem[0].ipc/data_danem2[0].ipc
const tarifamc1_0=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_1_men_cs*data_danem[0].ipc/data_danem2[0].ipc
const tarifamc2_0=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_2_men_cs*data_danem[0].ipc/data_danem2[0].ipc
if ((1-(tarifamc1_100/cu_nt1_100))<0.6){
setPorc_subE1_100(1-(tarifamc1_100/cu_nt1_100))
}
else{
setPorc_subE1_100(0.6)
}
if ((1-(tarifamc2_100/cu_nt1_100))<0.5){
setPorc_subE2_100(1-(tarifamc2_100/cu_nt1_100))
}
else{
setPorc_subE2_100(0.5)
}
if ((1-(tarifamc1_50/cu_nt1_50))<0.6){
setPorc_subE1_50(1-(tarifamc1_50/cu_nt1_50))
}
else{
setPorc_subE1_50(0.6)
}
if ((1-(tarifamc2_50/cu_nt1_50))<0.5){
setPorc_subE2_50(1-(tarifamc2_50/cu_nt1_50))
}
else{
setPorc_subE2_50(0.5)
}
if ((1-(tarifamc1_0/cu_nt1_0))<0.6){
setPorc_subE1_0(1-(tarifamc1_0/cu_nt1_0))
}
else{
setPorc_subE1_0(0.6)
}
if ((1-(tarifamc2_0/cu_nt1_0))<0.5){
setPorc_subE2_0(1-(tarifamc2_0/cu_nt1_0))
}
else{
setPorc_subE2_0(0.5)
}
}},[cu_nt1_100,cu_nt1_50,cu_nt1_0]);


useEffect(() => {
        if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
        && !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){    

if (status) 
{

        const data_Res_componentes_cu_tarifa=data20.obtenerRes_componentes_cu_tarifa
        const data_Res_componentes_cu_tarifam=data_Res_componentes_cu_tarifa.filter(data_Res_componentes_cu_tarifa => data_Res_componentes_cu_tarifa.anho===anhom && data_Res_componentes_cu_tarifa.mes===mesm) 

        data_empresa=data3.obtenerData_empresa
        data_empresam=data_empresa.filter(data_empresa => data_empresa.anho===anhom && data_empresa.mes===mesm)

        setCu_Nt1_100_ot(data_Res_componentes_cu_tarifam[0].cu_nt1_100_ot*(1+pv/100))
        setCu_Nt1_50_ot(data_Res_componentes_cu_tarifam[0].cu_nt1_50_ot*(1+pv/100))
        setCu_Nt1_0_ot(data_Res_componentes_cu_tarifam[0].cu_nt1_0_ot*(1+pv/100))
        setCu_Nt2_ot(data_Res_componentes_cu_tarifam[0].cu_nt2_ot*(1+pv/100))
        setCu_Nt3_ot(data_Res_componentes_cu_tarifam[0].cu_nt3_ot*(1+pv/100))

}
        }},[pv]);

        useEffect(() => {
                if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
                && !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){    
        
        if (status) 
        {
                const data_Res_componentes_cu_tarifa=data20.obtenerRes_componentes_cu_tarifa
                const data_Res_componentes_cu_tarifam=data_Res_componentes_cu_tarifa.filter(data_Res_componentes_cu_tarifa => data_Res_componentes_cu_tarifa.anho===anhom && data_Res_componentes_cu_tarifa.mes===mesm) 
        
                data_empresa=data3.obtenerData_empresa
                data_empresam=data_empresa.filter(data_empresa => data_empresa.anho===anhom && data_empresa.mes===mesm)
        
                setSaldo_Nt1_100_ot(((cu_nt1_100-(data_Res_componentes_cu_tarifam[0].cu_nt1_100_ot*(1+pv/100)))*data_empresam[0].ventas_usuarios_r_nt1_e)+data_Res_componentes_cu_tarifam[0].saldo_nt1_100_ot)
                setSaldo_Nt1_50_ot(((cu_nt1_50-(data_Res_componentes_cu_tarifam[0].cu_nt1_50_ot*(1+pv/100)))*data_empresam[0].ventas_usuarios_r_nt1_c)+data_Res_componentes_cu_tarifam[0].saldo_nt1_50_ot)
                setSaldo_Nt1_0_ot(((cu_nt1_0-(data_Res_componentes_cu_tarifam[0].cu_nt1_0_ot*(1+pv/100)))*data_empresam[0].ventas_usuarios_r_nt1_u)+data_Res_componentes_cu_tarifam[0].saldo_nt1_0_ot)
                setSaldo_Nt2_ot(((cu_nt2-(data_Res_componentes_cu_tarifam[0].cu_nt2_ot*(1+pv/100)))*data_empresam[0].ventas_usuarios_r_nt2)+data_Res_componentes_cu_tarifam[0].saldo_nt2_ot)
                setSaldo_Nt3_ot(((cu_nt3-(data_Res_componentes_cu_tarifam[0].cu_nt3_ot*(1+pv/100)))*data_empresam[0].ventas_usuarios_r_nt3)+data_Res_componentes_cu_tarifam[0].saldo_nt3_ot)

        }
                }},[cu_nt1_100_ot,cu_nt1_50_ot,cu_nt1_0_ot,cu_nt2_ot,cu_nt3_ot]);



                useEffect(() => {
                        if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
                        && !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){    
                if (status) 
                {
                        setSaldo_Total_ot(saldo_nt1_100_ot+saldo_nt1_50_ot+saldo_nt1_0_ot+saldo_nt2_ot+saldo_nt3_ot)

                }
                        }},[saldo_nt1_100_ot,saldo_nt1_50_ot,saldo_nt1_0_ot,saldo_nt2_ot,saldo_nt3_ot]);


        useEffect(() => {
                if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
                && !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){     
                        const data_empresa_anual=data21.obtenerData_empresa_anual
                        const data_empresaanualm=data_empresa_anual.filter(data_empresa_anual => data_empresa_anual.anho===anho-1)
                        const data_xm_tserv=data4.obtenerData_xm_tserv
                         data_empresa=data3.obtenerData_empresa
                         data_empresam=data_empresa.filter(data_empresa => data_empresa.anho===anhom && data_empresa.mes===mesm)
                        
                         const data_xm_tservmcnd=data_xm_tserv.filter(data_xm_tserv => data_xm_tserv.anho===anhom && data_xm_tserv.mes===mesm && data_xm_tserv.agente===data2.obtenerUsuario.empresa && data_xm_tserv.concepto==="CND")                
                         const data_xm_tservmsiciva=data_xm_tserv.filter(data_xm_tserv => data_xm_tserv.anho===anhom && data_xm_tserv.mes===mesm && data_xm_tserv.agente===data2.obtenerUsuario.empresa && data_xm_tserv.concepto==="SIC_IVA")   
                         setCer((data_empresaanualm[0].contribuciones_creg+data_empresaanualm[0].contribuciones_sspd)/12)
   
                setCv(c_ast+cvr+(((((data_empresaanualm[0].contribuciones_creg+data_empresaanualm[0].contribuciones_sspd)/12)+
                data_xm_tservmcnd[0].magnitud+data_xm_tservmsiciva[0].magnitud+data_empresam[0].costo_garantias_mem_cop)/(data_empresam[0].ventas_usuarios_r_nt1_e+
                        data_empresam[0].ventas_usuarios_r_nt1_c+
                        data_empresam[0].ventas_usuarios_r_nt1_u+
                        data_empresam[0].ventas_usuarios_r_nt2+
                        data_empresam[0].ventas_usuarios_r_nt3+
                        data_empresam[0].ventas_usuarios_nr_kwh))) )   
                }
                },[c_ast]);   

useEffect(() => {
        
        if(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8 && !loading9 && !loading9 && !loading10 && !loading11
                && !loading12 && !loading13  && !loading14  && !loading15  && !loading16  && !loading17 && !loading18 && !loading19 && !loading20 && !loading21){     
                // try{
                        const data_xm_afac=data7.obtenerData_xm_afac
                        const data_xm_afacm=data_xm_afac.filter(data_xm_afac => data_xm_afac.anho===anhom && data_xm_afac.mes===mesm && data_xm_afac.agente===data2.obtenerUsuario.empresa)
                        const data_xm_dspctto=data6.obtenerData_xm_dspctto
                        const data_xm_dspcttom=data_xm_dspctto.filter(data_xm_dspctto => data_xm_dspctto.anho===anhom && data_xm_dspctto.mes===mesm && data_xm_dspctto.comprador===data2.obtenerUsuario.empresa && data_xm_dspctto.tipomerc==='R')
                        const data_xm_trsm=data5.obtenerData_xm_trsm
                        const data_xm_trsmm=data_xm_trsm.filter(data_xm_trsm => data_xm_trsm.anho===anhom && data_xm_trsm.mes===mesm)
                        const data_xm_stn=data14.obtenerDataxmstn
                        const data_xm_stnm=data_xm_stn.filter(data_xm_stn => data_xm_stn.anho===anhom && data_xm_stn.mes===mes)
                        const data_xm_guatape=data19.obtenerData_xm_guatape
                        const data_xm_guatapem=data_xm_guatape.filter(data_xm_guatape => data_xm_guatape.anho===anhom && data_xm_guatape.mes===mes && data_xm_guatape.agente===data2.obtenerUsuario.empresa)
                        data_empresa=data3.obtenerData_empresa
                        data_empresam=data_empresa.filter(data_empresa => data_empresa.anho===anhom && data_empresa.mes===mesm)


                        const data_creg_cx=data11.obtenerData_creg_cx
                        const data_creg_cxm=data_creg_cx //Tomar el mas reciente              
                       
                        
                        const data_xm_mme_validacion=data9.obtenerData_mme_validacion
                        data_dane=data1.obtenerData_dane
                       data_danem=data_dane.filter(data_dane => data_dane.anho===anhom && data_dane.mes===mesm)
                        const data_xm_adem=data8.obtenerData_xm_adem
                        const data_xm_ademm=data_xm_adem.filter(data_xm_adem => data_xm_adem.anho===anhom && data_xm_adem.mes===mesm)       
                        const data_mme_giro=data10.obtenerData_mme_giro       
                        const data_banrepublica_tco=data12.obtenerData_banrepublica_tco
                        const data_banrepublica_tcap=data13.obtenerData_banrepublica_tcap
                        
         
                        setQc(Math.min(1,(data_xm_afacm[0].compras_en_contratos_kwh)/((data_xm_afacm[0].demanda_real_kwh)+(data_xm_afacm[0].perdida_real_kwh))))
                        if (data_xm_afacm[0].compras_en_bolsa_nacional_kwh===0){
                          setPb(0)
                        } else{
                          setPb((data_xm_afacm[0].compras_energia_en_bolsa_cop+data_xm_afacm[0].compras_en_bolsa_ajustes_cop)/data_xm_afacm[0].compras_energia_en_bolsa_kwh)
                        }
                        
                        var Energia_contratos = 0;
                        var Costo_contratos = 0;
                          data_xm_dspcttom.forEach(function (obj) {
                            Energia_contratos += parseFloat(obj.desp_hora_1)+parseFloat(obj.desp_hora_2)+parseFloat(obj.desp_hora_3)+parseFloat(obj.desp_hora_4)+parseFloat(obj.desp_hora_5)+parseFloat(obj.desp_hora_6)+parseFloat(obj.desp_hora_7)+parseFloat(obj.desp_hora_8)+parseFloat(obj.desp_hora_9)+parseFloat(obj.desp_hora_10)+parseFloat(obj.desp_hora_11)+parseFloat(obj.desp_hora_12)+parseFloat(obj.desp_hora_13)+parseFloat(obj.desp_hora_14)+parseFloat(obj.desp_hora_15)+parseFloat(obj.desp_hora_16)+parseFloat(obj.desp_hora_17)+parseFloat(obj.desp_hora_18)+parseFloat(obj.desp_hora_19)+parseFloat(obj.desp_hora_20)+parseFloat(obj.desp_hora_21)+parseFloat(obj.desp_hora_22)+parseFloat(obj.desp_hora_23)+parseFloat(obj.desp_hora_24);
                            Costo_contratos += parseFloat(obj.desp_hora_1)*parseFloat(obj.trf_hora_1)+parseFloat(obj.desp_hora_2)*parseFloat(obj.trf_hora_2)+parseFloat(obj.desp_hora_3)*parseFloat(obj.trf_hora_3)+parseFloat(obj.desp_hora_4)*parseFloat(obj.trf_hora_4)+parseFloat(obj.desp_hora_5)*parseFloat(obj.trf_hora_5)+parseFloat(obj.desp_hora_6)*parseFloat(obj.trf_hora_6)+parseFloat(obj.desp_hora_7)*parseFloat(obj.trf_hora_7)+parseFloat(obj.desp_hora_8)*parseFloat(obj.trf_hora_8)+parseFloat(obj.desp_hora_9)*parseFloat(obj.trf_hora_9)+parseFloat(obj.desp_hora_10)*parseFloat(obj.trf_hora_10)+parseFloat(obj.desp_hora_11)*parseFloat(obj.trf_hora_11)+parseFloat(obj.desp_hora_12)*parseFloat(obj.trf_hora_12)+parseFloat(obj.desp_hora_13)*parseFloat(obj.trf_hora_13)+parseFloat(obj.desp_hora_14)*parseFloat(obj.trf_hora_14)+parseFloat(obj.desp_hora_15)*parseFloat(obj.trf_hora_15)+parseFloat(obj.desp_hora_16)*parseFloat(obj.trf_hora_16)+parseFloat(obj.desp_hora_17)*parseFloat(obj.trf_hora_17)+parseFloat(obj.desp_hora_18)*parseFloat(obj.trf_hora_18)+parseFloat(obj.desp_hora_19)*parseFloat(obj.trf_hora_19)+parseFloat(obj.desp_hora_20)*parseFloat(obj.trf_hora_20)+parseFloat(obj.desp_hora_21)*parseFloat(obj.trf_hora_21)+parseFloat(obj.desp_hora_22)*parseFloat(obj.trf_hora_22)+parseFloat(obj.desp_hora_23)*parseFloat(obj.trf_hora_23)+parseFloat(obj.desp_hora_24)*parseFloat(obj.trf_hora_24);
                        });
                        if ((data_xm_afacm[0].compras_en_contratos_kwh)/((data_xm_afacm[0].demanda_real_kwh)+(data_xm_afacm[0].perdida_real_kwh))<=1){
                                setPc(Costo_contratos/Energia_contratos)
                        } else{
                                const w=((data_xm_afacm[0].demanda_real_kwh)+(data_xm_afacm[0].perdida_real_kwh))/Energia_contratos 
                                setPc((Costo_contratos/Energia_contratos)*w)
                        }
                        const Alfa=0.584204941605 //***************************** */
                        setMc(data_xm_trsmm.filter(data_xm_trsmm => data_xm_trsmm.codigo==='MC')[0].valor)
                        setAd(0)
                        setAj(0)                        
                        setPc(Costo_contratos/Energia_contratos)
                        setTx(data_xm_stnm[0].t_prima_cop_kwh+data_xm_stnm[0].delta_t_cop_kwh)
                        setCrs(data_xm_afacm[0].restricciones_aliviadas_cop)-(data_xm_afacm[0].ventas_en_desviacion_cop+data_xm_guatapem[0].crs_variable_guatape_cop)
                        setR((data_xm_afacm[0].restricciones_aliviadas_cop-data_xm_afacm[0].ventas_en_desviacion_cop+data_xm_guatapem[0].crs_variable_guatape_cop)/(data_empresam[0].ventas_usuarios_r_nt1_e+
                                data_empresam[0].ventas_usuarios_r_nt1_c+
                                data_empresam[0].ventas_usuarios_r_nt1_u+
                                data_empresam[0].ventas_usuarios_r_nt2+
                                data_empresam[0].ventas_usuarios_r_nt3+
                                data_empresam[0].ventas_usuarios_nr_kwh))
                        setIprstn((data_xm_afacm[0].perdida_real_kwh)/((data_xm_afacm[0].demanda_real_kwh)+(data_xm_afacm[0].perdida_real_kwh)))
                        
         
                        if (anho===2015)
                        {
                                setX(0)
                        }
                        if (anho===2016)
                        {
                                setX(0.00725)
                        }
                        if (anho===2017)
                        {
                                setX(0.00725*2)
                        }
                        if (anho===2018)
                        {
                                setX(0.00725*3)
                        }
                        if (anho>=2019)
                        {
                                setX(0.00725*4)
                        }
                        setCfm(data_creg_cxm[0].Cf*data_danem[0].ipc/79.56)
                        setCvr((((1-0)*data_creg_cxm[0].Cf*data_empresam[0].numero_usuarios_r)+(data_empresam[0].costo_garantias_str_sdl_cop)+(data_empresam[0].pui_cop_kwh))/(data_empresam[0].ventas_usuarios_r_nt1_e+
                        data_empresam[0].ventas_usuarios_r_nt1_c+
                        data_empresam[0].ventas_usuarios_r_nt1_u+
                        data_empresam[0].ventas_usuarios_r_nt2+
                        data_empresam[0].ventas_usuarios_r_nt3))
                        setRc((data_creg_cxm[0].RCT*((data_empresam[0].ventas_usuarios_r_nt1_e+data_empresam[0].ventas_usuarios_r_nt1_c+data_empresam[0].ventas_usuarios_r_nt1_u+data_empresam[0].ventas_usuarios_r_nt2+data_empresam[0].ventas_usuarios_r_nt3)-data_empresam[0].vae_kwh-data_empresam[0].vnu_kwh-data_empresam[0].vsne_kwh)+
                        data_creg_cxm[0].RCAE*(data_empresam[0].vae_kwh)+data_creg_cxm[0].RCSNE*(data_empresam[0].vsne_kwh)+data_creg_cxm[0].RCNU*(data_empresam[0].vnu_kwh))/(data_empresam[0].ventas_usuarios_r_nt1_e+
                                data_empresam[0].ventas_usuarios_r_nt1_c+
                                data_empresam[0].ventas_usuarios_r_nt1_u+
                                data_empresam[0].ventas_usuarios_r_nt2+
                                data_empresam[0].ventas_usuarios_r_nt3))
                                            
                        var len = data_xm_mme_validacion.length, maxa= -Infinity;
                        while (len>0) {
                                len--      
                                if (data_xm_mme_validacion[len].anho > maxa) {
                                maxa = data_xm_mme_validacion[len].anho;
                                }
                        }
                        setAnho_Ul_Trim_Val_Mme(maxa)
                        var len = data_xm_mme_validacion.length, maxt = -Infinity;
                        while (len>0) {
                          len--      
                          if (data_xm_mme_validacion[len].trimestre > maxt && maxa=== data_xm_mme_validacion[len].anho ) {
                                maxt = data_xm_mme_validacion[len].trimestre;
                          }
                        }
                        setUl_Trim_Val_Mme(maxt)
                        var len = data_xm_mme_validacion.length, summ = 0, defsub1, defsub2, defsub3, defsub4, tri_primer_tri_val,anho_primer_tri_val,tri_segundo_tri_val,anho_segundo_tri_val,tri_tercer_tri_val,anho_tercer_tri_val,tri_cuarto_tri_val,anho_cuarto_tri_val,seg_mes_cuarto_tri_val;
                        while (len>0) {
                        len--                          
                        if (maxt=== 4 && data_xm_mme_validacion[len].anho===maxa && (data_xm_mme_validacion[len].trimestre===4 ||data_xm_mme_validacion[len].trimestre===3||data_xm_mme_validacion[len].trimestre===2||data_xm_mme_validacion[len].trimestre===1 )) {
                        summ = summ + parseFloat(data_xm_mme_validacion[len].facturacion);  
                                if (data_xm_mme_validacion[len].trimestre===1){
                                        defsub1=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                        tri_primer_tri_val=1
                                        anho_primer_tri_val=maxa
                                }
                                if (data_xm_mme_validacion[len].trimestre===2){
                                        defsub2=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                        tri_segundo_tri_val=2
                                        anho_segundo_tri_val=maxa
                                }
                                if (data_xm_mme_validacion[len].trimestre===3){
                                        defsub3=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                        tri_tercer_tri_val=3
                                        anho_tercer_tri_val=maxa
                                }
                                if (data_xm_mme_validacion[len].trimestre===4){
                                        defsub4=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                        tri_cuarto_tri_val=4
                                        anho_cuarto_tri_val=maxa
                                        seg_mes_cuarto_tri_val=10
                                }
                        }
                        if (maxt=== 3 && ((data_xm_mme_validacion[len].anho===maxa && data_xm_mme_validacion[len].trimestre===3) ||( data_xm_mme_validacion[len].anho===maxa && data_xm_mme_validacion[len].trimestre===2) || (data_xm_mme_validacion[len].anho===maxa && data_xm_mme_validacion[len].trimestre===1) || (data_xm_mme_validacion[len].anho===maxa-1 && data_xm_mme_validacion[len].trimestre===4))) {
                        summ = summ + parseFloat(data_xm_mme_validacion[len].facturacion);       
                        if (data_xm_mme_validacion[len].trimestre===4){
                                defsub1=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_primer_tri_val=4
                                anho_primer_tri_val=maxa-1
                        }
                        if (data_xm_mme_validacion[len].trimestre===1){
                                defsub2=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_segundo_tri_val=1
                                anho_segundo_tri_val=maxa
                        }
                        if (data_xm_mme_validacion[len].trimestre===2){
                                defsub3=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_tercer_tri_val=2
                                anho_tercer_tri_val=maxa
                        }
                        if (data_xm_mme_validacion[len].trimestre===3){
                                defsub4=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_cuarto_tri_val=3
                                anho_cuarto_tri_val=maxa
                                seg_mes_cuarto_tri_val=2
                        }   
                        }
                        if (maxt=== 2 && ((data_xm_mme_validacion[len].anho===maxa && data_xm_mme_validacion[len].trimestre===2) ||( data_xm_mme_validacion[len].anho===maxa && data_xm_mme_validacion[len].trimestre===1) || (data_xm_mme_validacion[len].anho===maxa-1 && data_xm_mme_validacion[len].trimestre===4) || (data_xm_mme_validacion[len].anho===maxa-1 && data_xm_mme_validacion[len].trimestre===3))) {
                        summ = summ + parseFloat(data_xm_mme_validacion[len].facturacion);    
                        if (data_xm_mme_validacion[len].trimestre===3){
                                defsub1=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_primer_tri_val=3
                                anho_primer_tri_val=maxa-1
                        }
                        if (data_xm_mme_validacion[len].trimestre===4){
                                defsub2=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_segundo_tri_val=4
                                anho_segundo_tri_val=maxa-1
                        }
                        if (data_xm_mme_validacion[len].trimestre===1){
                                defsub3=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_tercer_tri_val=1
                                anho_tercer_tri_val=maxa
                        }
                        if (data_xm_mme_validacion[len].trimestre===2){
                                defsub4=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_cuarto_tri_val=2
                                anho_cuarto_tri_val=maxa
                                seg_mes_cuarto_tri_val=5
                        }      
                        }
                        if (maxt=== 1 && ((data_xm_mme_validacion[len].anho===maxa && data_xm_mme_validacion[len].trimestre===1) ||( data_xm_mme_validacion[len].anho===maxa-1 && data_xm_mme_validacion[len].trimestre===4) || (data_xm_mme_validacion[len].anho===maxa-1 && data_xm_mme_validacion[len].trimestre===3) || (data_xm_mme_validacion[len].anho===maxa-1 && data_xm_mme_validacion[len].trimestre===2))) {
                        summ = summ + parseFloat(data_xm_mme_validacion[len].facturacion); 
                        if (data_xm_mme_validacion[len].trimestre===2){
                                defsub1=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_primer_tri_val=2
                                anho_primer_tri_val=maxa-1
                        }
                        if (data_xm_mme_validacion[len].trimestre===3){
                                defsub2=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_segundo_tri_val=3
                                anho_segundo_tri_val=maxa-1
                        }
                        if (data_xm_mme_validacion[len].trimestre===4){
                                defsub3=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_tercer_tri_val=4
                                anho_tercer_tri_val=maxa-1
                        }
                        if (data_xm_mme_validacion[len].trimestre===1){
                                defsub4=data_xm_mme_validacion[len].subsidios-data_xm_mme_validacion[len].contribuciones
                                tri_cuarto_tri_val=1
                                anho_cuarto_tri_val=maxa
                                seg_mes_cuarto_tri_val=2
                        }         
                        }
                        }
                        setFacturacion_T((summ/4).toString())
                        var len = data_mme_giro.length, summg1 = 0,summg2 = 0,summg3 = 0,summg4 = 0;
                        while (len>0) {
                        len--      
                        if (maxt=== 4){
                        if(data_mme_giro[len].fondo==='FSSRI' &&  parseFloat(data_mme_giro[len].fecha.substr(0,4))===maxa && (parseFloat(data_mme_giro[len].fecha.substr(5,2))===1||parseFloat(data_mme_giro[len].fecha.substr(5,2))===2||parseFloat(data_mme_giro[len].fecha.substr(5,2))===3) ){
                        summg1 = summg1 + data_mme_giro[len].giro_cop;  
                        }
                        if(data_mme_giro[len].fondo==='FSSRI' &&  parseFloat(data_mme_giro[len].fecha.substr(0,4))===maxa && (parseFloat(data_mme_giro[len].fecha.substr(5,2))===4||parseFloat(data_mme_giro[len].fecha.substr(5,2))===5||parseFloat(data_mme_giro[len].fecha.substr(5,2))===6) ){
                        summg2 = summg1 + data_mme_giro[len].giro_cop;  
                        }
                        if(data_mme_giro[len].fondo==='FSSRI' &&  parseFloat(data_mme_giro[len].fecha.substr(0,4))===maxa && (parseFloat(data_mme_giro[len].fecha.substr(5,2))===7||parseFloat(data_mme_giro[len].fecha.substr(5,2))===8||parseFloat(data_mme_giro[len].fecha.substr(5,2))===9) ){
                        summg3 = summg3 + data_mme_giro[len].giro_cop;  
                        }
                        if(data_mme_giro[len].fondo==='FSSRI' &&  parseFloat(data_mme_giro[len].fecha.substr(0,4))===maxa && (parseFloat(data_mme_giro[len].fecha.substr(5,2))===10||parseFloat(data_mme_giro[len].fecha.substr(5,2))===11||parseFloat(data_mme_giro[len].fecha.substr(5,2))===12) ){
                        summg4 = summg4 + data_mme_giro[len].giro_cop;  
                        }
                        }       
                        }
                        var data_mme_giro_ordenado = [...data_mme_giro]
                        data_mme_giro_ordenado.sort((a,b) => (a.fecha > b.fecha) ? 1 : ((b.fecha > a.fecha) ? -1 : 0))
                        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                       // Defino variables
                        var len1 = 0, len2=0, len3, summ = 0, defsub, defsub2, defsub3, defsub4, array_sub2M=[],array_sub1N=[],saldo1T=defsub1,giro_sobrante1T,saldo1T,saldo2T,saldo3T,saldo4T,giro_sobrante2T,giro_sobrante3T,giro_sobrante4T,ultimo_giro_incluido,fecha_ultimo_giro_4T;
                        //Para cada trimestre de los validados en firme que ya estan identificados
                        //Saldo es igual al deficit de cada trimestre                         // if(len1 === 2){
                        // saldo=defsub2
                        // }
                        // if(len1 === 3){
                        // saldo=defsub3
                        // }
                        // if(len1 === 4){
                        // saldo=defsub4
                        // }
                        //Para ese deficit de ese trimestre en el que estoy recorro los giros, acaba cuando recorra todos los hgiros o cuando el saldo llegue a cero
                        while (len2<data_mme_giro_ordenado.length-1 && saldo1T!=0) {
                        len2++
                        //Si estamos hablando de que ese 1 trimestre validado es el primer trimestre dle año, evaluo giros que esten dentro de ese trimestre
                        var firstDate = new Date(parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len2].fecha.substr(8,2)) );
                        var secondDate = new Date(maxa, 1, 1);
                        if(tri_primer_tri_val===1 &&(data_mme_giro_ordenado[len2].fondo==='FSSRI' &&  parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0,4))===maxa && (parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===1||parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===2||parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===3) )){
                        //Saldo será igual al saldo anterior menos ese giro
                        saldo1T=saldo1T-data_mme_giro_ordenado[len2].giro_cop  

                        //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero
                        if (saldo1T>0){
                                array_sub2M.push([1,data_mme_giro_ordenado[len2].giro_cop, Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                ultimo_giro_incluido=len2
                                giro_sobrante1T =0
                        }
                        else{
                                array_sub2M.push([1,(data_mme_giro_ordenado[len2].giro_cop+saldo1T), Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                giro_sobrante1T = (-saldo1T)
                                saldo1T=0
                                ultimo_giro_incluido=len2
                                fecha_ultimo_giro_4T=data_mme_giro_ordenado[len2].fecha  
                        }

                        }
                        }


                        
    
                        //Ya tengo SUb2 para ese trimestre, ahora miro sub 1, si aun hay saldo                         
                        len3 = ultimo_giro_incluido


                        while (len3<data_mme_giro_ordenado.length-1 && saldo1T>0) {
                                len3++
                                //Evaluo si, hablando de que 1T, sea el primer trimestre del año el giro sea posterior al fin del trimestre 
                                if(tri_primer_tri_val===1 && data_mme_giro_ordenado[len2].fondo==='FSSRI'){


                                var fecha_fin_trimestre= new Date(maxa, 3, 31);
                                var GiroDate = new Date(parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8,2)) );
                                        if ( Math.round(((GiroDate - fecha_fin_trimestre) / oneDay))>0){
                                                //Se descuenta del saldo ese giro
                                                var firstDate = new Date(parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8,2)) );
                                                if (len3===ultimo_giro_incluido-1){
                                                        saldo1T=saldo1T- giro_sobrante1T   
                                                                                                      //se evalua si aunqueda saldo y se garda sub1 y N
                                                if (saldo1T>0){
                                                        array_sub1N.push([1,giro_sobrante1T, Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),giro_sobrante1T* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                        giro_sobrante1T =0
                                                        ultimo_giro_incluido=len3
                                                }
                                                else{
                                                        array_sub1N.push([1,(giro_sobrante1T+saldo1T), Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),(giro_sobrante1T+saldo1T)* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                        giro_sobrante1T = (-saldo1T)
                                                        ultimo_giro_incluido=len3
                                                        saldo1T=0                                         
                                                }    
                                                }
                                                else{
                                                        saldo1T=saldo1T-data_mme_giro_ordenado[len3].giro_cop 
                                                                                                      //se evalua si aunqueda saldo y se garda sub1 y N
                                                if (saldo1T>0){
                                                        array_sub1N.push([1,data_mme_giro_ordenado[len3].giro_cop, Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),data_mme_giro_ordenado[len3].giro_cop* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                        giro_sobrante1T =0
                                                        ultimo_giro_incluido=len3
                                                        fecha_ultimo_giro_4T=data_mme_giro_ordenado[len3].fecha  
                                                }
                                                else{
                                                        array_sub1N.push([1,(data_mme_giro_ordenado[len3].giro_cop+saldo1T), Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),(data_mme_giro_ordenado[len3].giro_cop+saldo1T)* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                        giro_sobrante1T = (-saldo1T)
                                                        ultimo_giro_incluido=len3
                                                        saldo1T=0      
                                                        fecha_ultimo_giro_4T=data_mme_giro_ordenado[len3].fecha                                     
                                                }
                                                }
        
                                                
                                                
  
                                              
                                        } 
                                }
                        }

                        
                        len2=ultimo_giro_incluido-1
                        saldo2T=defsub2



                        while (len2<data_mme_giro_ordenado.length-1 && saldo2T!=0) {
                                len2++
                                //AÑADIR LA OPCION DE QUE SEAN OTROS TRIMETSRES
                                //Si estamos hablando de que ese 1 trimestre validado es el primer trimestre dle año, evaluo giros que esten dentro de ese trimestre
                                if(tri_segundo_tri_val===2 &&(data_mme_giro_ordenado[len2].fondo==='FSSRI' &&  parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0,4))===maxa && (parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===4||parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===5||parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===6) )){
                                        var firstDate = new Date(parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len2].fecha.substr(8,2)) );
                                        var secondDate = new Date(maxa, 4, 1);
         
                                        //Saldo será igual al saldo anterior menos ese giro
                                if (len2===ultimo_giro_incluido){
                                        saldo2T=saldo2T- giro_sobrante1T       
                                                                       //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero
                                if (saldo2T>0){
                                        array_sub2M.push([2,giro_sobrante1T, Math.round(Math.abs((firstDate - secondDate) / oneDay)),giro_sobrante1T* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                        ultimo_giro_incluido=len2
                                        giro_sobrante2T =0
                                        
                                }
                                else{
                                        array_sub2M.push([2,(giro_sobrante1T+saldo2T), Math.round(Math.abs((firstDate - secondDate) / oneDay)),(giro_sobrante1T+saldo2T)* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                        giro_sobrante2T = (-saldo2T)
                                        ultimo_giro_incluido=len2
                                        saldo2T=0
                                }
                                }
                                else{
                                        saldo2T=saldo2T-data_mme_giro_ordenado[len2].giro_cop 
                                                                       //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero
                                if (saldo2T>0){
                                        array_sub2M.push([2,data_mme_giro_ordenado[len2].giro_cop, Math.round(Math.abs((firstDate - secondDate) / oneDay)),data_mme_giro_ordenado[len2].giro_cop* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                        ultimo_giro_incluido=len2
                                        giro_sobrante2T =0
                                        fecha_ultimo_giro_4T=data_mme_giro_ordenado[len2].fecha  
                                        
                                }
                                else{
                                        array_sub2M.push([2,(data_mme_giro_ordenado[len2].giro_cop+saldo2T), Math.round(Math.abs((firstDate - secondDate) / oneDay)),(data_mme_giro_ordenado[len2].giro_cop+saldo2T)* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                        giro_sobrante2T = (-saldo2T)
                                        ultimo_giro_incluido=len2
                                        saldo2T=0
                                        fecha_ultimo_giro_4T=data_mme_giro_ordenado[len2].fecha  
                                }
                                }
                                 


                                }
                                
                                }

                                                        //Ya tengo SUb2 para ese trimestre, ahora miro sub 1, si aun hay saldo                         
                        len3 = ultimo_giro_incluido

                        while (len3<data_mme_giro_ordenado.length-1 && saldo2T>0) {
                                len3++
                                //Evaluo si, hablando de que 2T, sea el primer trimestre del año el giro sea posterior al fin del trimestre 

                                if( tri_segundo_tri_val===2 && data_mme_giro_ordenado[len2].fondo==='FSSRI'){
                                var fecha_fin_trimestre= new Date(maxa, 6, 30);
                                var GiroDate = new Date(parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8,2)) );
                                        if ( Math.round(((GiroDate - fecha_fin_trimestre) / oneDay))>0){
                                                //Se descuenta del saldo ese giro
                                                var firstDate = new Date(parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8,2)) );
                                                if (len3===ultimo_giro_incluido){
                                                        saldo2T=saldo2T- giro_sobrante2T  
                                                                                                        //se evalua si aunqueda saldo y se garda sub1 y N
                                                if (saldo2T>0){
                                                        array_sub1N.push([2,giro_sobrante2T, Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),giro_sobrante2T* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                        ultimo_giro_incluido=len3
                                                }
                                                else{
                                                        array_sub1N.push([2,(giro_sobrante2T+saldo2T), Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),(giro_sobrante2T+saldo2T)* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                        giro_sobrante2T = (-saldo2T)
                                                        ultimo_giro_incluido=len3
                                                        saldo2T=0                                         
                                                }     
                                                }
                                                else{
                                                        saldo2T=saldo2T-data_mme_giro_ordenado[len3].giro_cop 
                                                                                                        //se evalua si aunqueda saldo y se garda sub1 y N
                                                if (saldo2T>0){
                                                        array_sub1N.push([2,data_mme_giro_ordenado[len3].giro_cop, Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),data_mme_giro_ordenado[len3].giro_cop* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                        ultimo_giro_incluido=len3
                                                        fecha_ultimo_giro_4T=data_mme_giro_ordenado[len3].fecha  
                                                }
                                                else{
                                                        array_sub1N.push([2,(data_mme_giro_ordenado[len3].giro_cop+saldo2T), Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),(data_mme_giro_ordenado[len3].giro_cop+saldo2T)* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                        giro_sobrante2T = (-saldo2T)
                                                        ultimo_giro_incluido=len3
                                                        saldo2T=0            
                                                        fecha_ultimo_giro_4T=data_mme_giro_ordenado[len3].fecha                               
                                                }
                                                }
        
                                                
                                                

                                          
                                        } 
                                }

                        }

                      
                        len2=ultimo_giro_incluido-1
                        saldo3T=defsub3


                        while (len2<data_mme_giro_ordenado.length-1 && saldo3T!=0) {
                                len2++
                                //AÑADIR LA OPCION DE QUE SEAN OTROS TRIMETSRES
                                //Si estamos hablando de que ese 1 trimestre validado es el primer trimestre dle año, evaluo giros que esten dentro de ese trimestre
                                if(tri_tercer_tri_val===3 &&(data_mme_giro_ordenado[len2].fondo==='FSSRI' &&  parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0,4))===maxa && (parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===7||parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===8||parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===9) )){
                                //Saldo será igual al saldo anterior menos ese giro
                                var firstDate = new Date(parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len2].fecha.substr(8,2)) );
                                var secondDate = new Date(maxa, 7, 1);
                                //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero

                                if (len2===ultimo_giro_incluido){

                                        saldo3T=saldo3T- giro_sobrante2T  
                                        if (saldo3T>0){
                                        
                                                array_sub2M.push([3,giro_sobrante2T, Math.round(Math.abs((firstDate - secondDate) / oneDay)),giro_sobrante2T* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                                ultimo_giro_incluido=len2
                                                giro_sobrante3T =0
                                                
                                        }
                                        else{
                                   
                                                array_sub2M.push([3,(giro_sobrante2T+saldo3T), Math.round(Math.abs((firstDate - secondDate) / oneDay)),(giro_sobrante2T+saldo3T)* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                                giro_sobrante3T = (-saldo3T)
                                                ultimo_giro_incluido=len2
                                                saldo3T=0
                                        }     
                                }
                                else{
                                        saldo3T=saldo3T-data_mme_giro_ordenado[len2].giro_cop 
                                        if (saldo3T>0){
                                                array_sub2M.push([3,data_mme_giro_ordenado[len2].giro_cop, Math.round(Math.abs((firstDate - secondDate) / oneDay)),data_mme_giro_ordenado[len2].giro_cop* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                                ultimo_giro_incluido=len2
                                                giro_sobrante3T =0
                                                fecha_ultimo_giro_4T=data_mme_giro_ordenado[len2].fecha  
                                                
                                        }
                                        else{
                                                array_sub2M.push([3,(data_mme_giro_ordenado[len2].giro_cop+saldo3T), Math.round(Math.abs((firstDate - secondDate) / oneDay)),(data_mme_giro_ordenado[len2].giro_cop+saldo3T)* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
                                                giro_sobrante3T = (-saldo3T)
                                                ultimo_giro_incluido=len2
                                                saldo3T=0
                                                fecha_ultimo_giro_4T=data_mme_giro_ordenado[len2].fecha  
                                        }
                                }
                                 

                                


                                }
                                
                                }

                                                        //Ya tengo SUb2 para ese trimestre, ahora miro sub 1, si aun hay saldo                         
                        len3 = ultimo_giro_incluido

                        while (len3<data_mme_giro_ordenado.length-1 && saldo3T>0) {
                                len3++
                                //Evaluo si, hablando de que 2T, sea el primer trimestre del año el giro sea posterior al fin del trimestre 

                                if( tri_tercer_tri_val===3 && data_mme_giro_ordenado[len2].fondo==='FSSRI'){
                                var fecha_fin_trimestre= new Date(maxa, 9, 30);
                                var GiroDate = new Date(parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8,2)) );
                                        if ( Math.round(((GiroDate - fecha_fin_trimestre) / oneDay))>0){
                                                //Se descuenta del saldo ese giro
                                                var firstDate = new Date(parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8,2)) );
                                                if (len3===ultimo_giro_incluido){
                                                        saldo3T=saldo3T- giro_sobrante3T  
                                                        if (saldo3T>0){
                                                                array_sub1N.push([3,giro_sobrante3T, Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),giro_sobrante3T* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                                ultimo_giro_incluido=len3
                                                        }
                                                        else{
                                                                array_sub1N.push([3,(giro_sobrante3T+saldo3T), Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),(giro_sobrante3T+saldo3T)* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                                giro_sobrante3T = (-saldo3T)
                                                                ultimo_giro_incluido=len3
                                                                saldo3T=0                                         
                                                        }     
                                                }
                                                else{
                                                        saldo3T=saldo3T-data_mme_giro_ordenado[len3].giro_cop 
                                                        if (saldo3T>0){
                                                                array_sub1N.push([3,data_mme_giro_ordenado[len3].giro_cop, Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),data_mme_giro_ordenado[len3].giro_cop* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                                ultimo_giro_incluido=len3
                                                                fecha_ultimo_giro_4T=data_mme_giro_ordenado[len3].fecha  
                                                        }
                                                        else{
                                                                array_sub1N.push([3,(data_mme_giro_ordenado[len3].giro_cop+saldo3T), Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),(data_mme_giro_ordenado[len3].giro_cop+saldo3T)* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
                                                                giro_sobrante3T = (-saldo3T)
                                                                ultimo_giro_incluido=len3
                                                                saldo3T=0    
                                                                fecha_ultimo_giro_4T=data_mme_giro_ordenado[len3].fecha                                       
                                                        }
                                                }
        
                                        } 
                                }

                        }

                        len2=ultimo_giro_incluido-1
                        saldo4T=defsub4
                        
while (len2<data_mme_giro_ordenado.length-1 && saldo4T!=0) {
len2++
//AÑADIR LA OPCION DE QUE SEAN OTROS TRIMETSRES
//Si estamos hablando de que ese 1 trimestre validado es el primer trimestre dle año, evaluo giros que esten dentro de ese trimestre
if(tri_cuarto_tri_val===4 &&(data_mme_giro_ordenado[len2].fondo==='FSSRI' &&  parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0,4))===maxa && (parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===10||parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===11||parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2))===12) )){
//Saldo será igual al saldo anterior menos ese giro
var firstDate = new Date(parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len2].fecha.substr(8,2)) );
var secondDate = new Date(maxa, 10, 1);
if (len2===ultimo_giro_incluido){
saldo4T=saldo4T- giro_sobrante3T    
                        //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero
if (saldo4T>0){
array_sub2M.push([4,giro_sobrante3T, Math.round(Math.abs((firstDate - secondDate) / oneDay)),giro_sobrante3T*Math.round(Math.abs((firstDate - secondDate) / oneDay))])
ultimo_giro_incluido=len2
giro_sobrante4T =0


}
else{
array_sub2M.push([4,(giro_sobrante3T+saldo4T), Math.round(Math.abs((firstDate - secondDate) / oneDay)),(giro_sobrante3T+saldo4T)* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
giro_sobrante4T = (-saldo4T)
ultimo_giro_incluido=len2
saldo4T=0

}

}
else{
saldo4T=saldo4T-data_mme_giro_ordenado[len2].giro_cop 
                        //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero
if (saldo4T>0){
array_sub2M.push([4,data_mme_giro_ordenado[len2].giro_cop, Math.round(Math.abs((firstDate - secondDate) / oneDay)),data_mme_giro_ordenado[len2].giro_cop*Math.round(Math.abs((firstDate - secondDate) / oneDay))])
ultimo_giro_incluido=len2
giro_sobrante4T =0
fecha_ultimo_giro_4T=data_mme_giro_ordenado[len2].fecha  
}
else{
array_sub2M.push([4,(data_mme_giro_ordenado[len2].giro_cop+saldo4T), Math.round(Math.abs((firstDate - secondDate) / oneDay)),(data_mme_giro_ordenado[len2].giro_cop+saldo4T)* Math.round(Math.abs((firstDate - secondDate) / oneDay))])
giro_sobrante4T = (-saldo4T)
ultimo_giro_incluido=len2
saldo4T=0
fecha_ultimo_giro_4T=data_mme_giro_ordenado[len2].fecha  
}

}
}
}

//Ya tengo SUb2 para ese trimestre, ahora miro sub 1, si aun hay saldo                         
len3 = ultimo_giro_incluido
while (len3<data_mme_giro_ordenado.length-1 && saldo4T>0) {
len3++
//Evaluo si, hablando de que 2T, sea el primer trimestre del año el giro sea posterior al fin del trimestre 
if( tri_cuarto_tri_val===4 && data_mme_giro_ordenado[len2].fondo==='FSSRI'){
var fecha_fin_trimestre= new Date(maxa, 12, 31);
var GiroDate = new Date(parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8,2)) );
if ( Math.round(((GiroDate - fecha_fin_trimestre) / oneDay))>0){
//Se descuenta del saldo ese giro
var firstDate = new Date(parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0,4)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5,2)), parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8,2)) );
if (len3===ultimo_giro_incluido){
saldo4T=saldo4T- giro_sobrante4T  
if (saldo4T>0){
array_sub1N.push([4,giro_sobrante4T, Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),giro_sobrante4T* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
ultimo_giro_incluido=len3

}
else{
array_sub1N.push([4,(giro_sobrante4T+saldo4T), Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),(giro_sobrante4T+saldo4T)* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
giro_sobrante4T = (-saldo4T)
ultimo_giro_incluido=len3
saldo4T=0    
                                     
}     
}
else{
saldo4T=saldo4T-data_mme_giro_ordenado[len3].giro_cop 
if (saldo4T>0){
array_sub1N.push([4,data_mme_giro_ordenado[len3].giro_cop, Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),data_mme_giro_ordenado[len3].giro_cop* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
ultimo_giro_incluido=len3
fecha_ultimo_giro_4T=data_mme_giro_ordenado[len3].fecha  
}
else{
array_sub1N.push([4,(data_mme_giro_ordenado[len3].giro_cop+saldo4T), Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay)),(data_mme_giro_ordenado[len3].giro_cop+saldo4T)* Math.round(Math.abs((firstDate - fecha_fin_trimestre) / oneDay))])
giro_sobrante4T = (-saldo4T)
ultimo_giro_incluido=len3
saldo4T=0
fecha_ultimo_giro_4T=data_mme_giro_ordenado[len3].fecha                                
}
}
} 
}
}


var len1=0,len2=0,len3=0,sub2mt=[],sub1mt=[], sub2mpt=[],sub1npt=[],sub1p,sub2p,sub1np ,sub2mp
while (len1<4){  
len1++
sub1p=0
sub2p=0
sub1np=0
sub2mp=0
while (len2<array_sub2M.filter(array_sub2M => array_sub2M[0]===len1).length){
sub2p=(array_sub2M.filter(array_sub2M => array_sub2M[0]===len1)[len2][1]+sub2p)
sub2mp=(array_sub2M.filter(array_sub2M => array_sub2M[0]===len1)[len2][3]+sub2mp)
len2++
}
sub2p = sub2p || 0
sub2mp = sub2mp || 0

sub2mt.push(sub2p)
sub2mpt.push(sub2mp)
len2=0
while (len3<array_sub1N.filter(array_sub1N => array_sub1N[0]===len1).length){
sub1p=(array_sub1N.filter(array_sub1N => array_sub1N[0]===len1)[len3][1]+sub1p)
sub1np=(array_sub1N.filter(array_sub1N => array_sub1N[0]===len1)[len3][3]+sub1np)
len3++
}
sub1p = sub1p || 0
sub1np = sub1np || 0

sub1mt.push(sub1p)
sub1npt.push(sub1np)
len3=0
}


setSub1((sub1mt[0]+sub1mt[1]+sub1mt[2]+sub1mt[3])/4)
setSub2((sub2mt[0]+sub2mt[1]+sub2mt[2]+sub2mt[3])/4)

setN_Sub1((sub1npt[0]+sub1npt[1]+sub1npt[2]+sub1npt[3])/(sub1mt[0]+sub1mt[1]+sub1mt[2]+sub1mt[3]))
setM_Sub2((sub2mpt[0]+sub2mpt[1]+sub2mpt[2]+sub2mpt[3])/(sub2mt[0]+sub2mt[1]+sub2mt[2]+sub2mt[3]))


//r1 y r2:
//1. Fecha del primer dia del segundo mes del ultimo trimestre 
//2. Fecha del primer dia del ultimo giro que le pego al ultimo trmestre 
//3. Recorrer matriz, consolidar tasa por monto y monto, que sea superior e inferior a las fechas 
//4. Dividir los consolidados

//1. Fecha del primer dia des segundo mes del ultimo trimestre 
//2. Fecha del primer dia del ultimo giro que le pego al ultimo trmestre 


var firstDate = new Date(anho_cuarto_tri_val, seg_mes_cuarto_tri_val, 1 ).getTime();
var secondDate = new Date(parseFloat(fecha_ultimo_giro_4T.substr(0,4)), parseFloat(fecha_ultimo_giro_4T.substr(5,2))-1, 1).getTime();



var data_mme_giro_ordenado = [...data_mme_giro]
data_mme_giro_ordenado.sort((a,b) => (a.fecha > b.fecha) ? 1 : ((b.fecha > a.fecha) ? -1 : 0))


var len1=0, date_tcap,sum_tasa_x_monto_cap=0,sum_monto_cap=0,date_tcap




while (len1<data_banrepublica_tcap.length-1){  
        len1++
        date_tcap = new Date(parseFloat(data_banrepublica_tcap[len1].fecha.split("-")[0]), parseFloat(data_banrepublica_tcap[len1].fecha.split("-")[1])-1, data_banrepublica_tcap[len1].fecha.split("-")[2]).getTime();
        if(date_tcap>=firstDate && date_tcap<secondDate ){
                sum_tasa_x_monto_cap=(data_banrepublica_tcap[len1].tasa_a_30_cdats_cdat_bancos_comerciales*data_banrepublica_tcap[len1].monto_a_30_cdat_bancos_comerciales)+sum_tasa_x_monto_cap
                sum_monto_cap=(data_banrepublica_tcap[len1].monto_a_30_cdat_bancos_comerciales)+sum_monto_cap
        }
}

setR2(((1+(sum_tasa_x_monto_cap/sum_monto_cap))**(1/12))-1)

const getSundayFromWeekNum = (weekNum, year) => {
        const sunday = new Date(year, 0, (1 + (weekNum - 1) * 7)-7);
        while (sunday.getDay() !== 0) {
          sunday.setDate(sunday.getDate() - 1);
        }
        return sunday;
      }
 
var len1=0, date_tco,sum_tasa_x_monto_co=0,sum_monto_co=0,conteo=0
while (len1<data_banrepublica_tco.length-1){  
        len1++
        date_tco = (getSundayFromWeekNum(parseFloat(data_banrepublica_tco[len1].anho_semana.substr(4,2))+1, parseFloat(data_banrepublica_tco[len1].anho_semana.substr(0,4))))
        if(date_tco>=firstDate && date_tco<secondDate ){
             
                sum_tasa_x_monto_co=(data_banrepublica_tco[len1].tasa__cred_com_preferencial_o_corporativo*data_banrepublica_tco[len1].monto__cred_com_preferencial_o_corporativo)+sum_tasa_x_monto_co
                sum_monto_co=(data_banrepublica_tco[len1].monto__cred_com_preferencial_o_corporativo)+sum_monto_co
                conteo++
        }
}

setR1(((1+((sum_tasa_x_monto_co/sum_monto_co)/100))**(1/12))-1)
                        //Últimos cuatro trimestres validados
                        //1. Ir a la tabla y coger los ultimos cuatro
                        //2. Promedio = Facturacióni,j,T:
                        //2.1 Si Tri es 4 vaya y busque 1 2 y 3 del mismo año 
                        //2.2 Si Tri es 3 vaya y busque 2 1  del mismo año y 4 del año anterior
                        //3. Giros recibidos en el trimestre versus el deficit de ese trimestre desde ese primer T en analisis ->Sub 2
                        //4. Giros recibidos en el trimestre versus el deficit del proximo trimestre desde ese primer T en analisis ->Sub 1
                        //5. For que recorra cada uno de los giros y vaya comparando?
                        //6. N esos dias de retrazo 
                        //7. M esos dias de anticipo
        
                        // OK Ordenar giros de menor a mayor 
                        // 1 para cada trimestre iniciando con el primero Deficit - Giro =Saldo || SI >0 || SI aun esta en trimestre => Dias desde inicio de trimestre hasta ese dia de giro    SUb 2 N 
                        // 2 para cada dato Deficit - Giro =Saldo || SI >0 || SI esta por fuera del trimestre => Dias desde fin  de trimestre hasta ese dia de giro    SUb 1 M
                        // 3 para cada dato Deficit - Giro =Saldo || SI <0 || Paso al siguiente trimestre con ese ultimo saldo de giro que quedo volviendo a 1 
                        // }

                        // 1. 


                        // catch( ex ) {

                        //         // execution continues here when an error was thrown. You can also inspect the `ex`ception object
                        //     }
        
        
                }
                },[loading1,loading2,loading3,loading4,loading5,loading6,loading7,loading8,loading9,loading9,loading10,loading11,loading12,loading13,loading14,loading15,loading16,loading17,loading18,loading19,loading20]);        
        
                Object.filter = (obj, predicate) => 
            Object.keys(obj)
                  .filter( key => predicate(obj[key]) )
                  .reduce( (res, key) => (res[key] = obj[key], res), {} );

          return (
            <div>
            <Modal show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="myModal"
            onHide={props.close}>
            <Modal.Header closeButton>
            <Modal.Title>CU y Tarifas Calculadas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="container p-0">
        <div className="card col-sm ">
        <div className="card-header h6">
        <dt>Estado de Información:</dt> 
        </div>
        <div className="card-body shadow ">
        
                { !loading1? (data1.obtenerData_dane.filter(obtenerData_dane => obtenerData_dane.anho===anhom && obtenerData_dane.mes===mesm)).length>0? <p> Ok DATA_DANE</p>:<p>No se encontraron insumos en DATA_DANE</p>: null}
                { !loading3? (data3.obtenerData_empresa.filter(obtenerData_empresa => obtenerData_empresa.anho===anhom && obtenerData_empresa.mes===mesm)).length>0? <p> Ok DATA_EMPRESA</p>:<p>No se encontraron insumos en  DATA_EMPRESA</p>: null}
                { !loading4? (data4.obtenerData_xm_tserv.filter(obtenerData_xm_tserv => obtenerData_xm_tserv.anho===anhom && obtenerData_xm_tserv.mes===mesm)).length>0? <p> Ok DATA_XM_TSERV</p>:<p>No se encontraron insumos en DATA_XM_TSERV</p>: null}
                { !loading5? (data5.obtenerData_xm_trsm.filter(obtenerData_xm_trsm => obtenerData_xm_trsm.anho===anhom && obtenerData_xm_trsm.mes===mesm)).length>0? <p> Ok DATA_XM_TRSM</p>:<p>No se encontraron insumos en DATA_XM_TRSM</p>: null}
                { !loading6? (data6.obtenerData_xm_dspctto.filter(obtenerData_xm_dspctto => obtenerData_xm_dspctto.anho===anhom && obtenerData_xm_dspctto.mes===mesm)).length>0? <p> Ok DATA_XM_DSPCTTO</p>:<p>No se encontraron insumos en DATA_XM_DSPCTTO</p>: null}
                { !loading7? (data7.obtenerData_xm_afac.filter(obtenerData_xm_afac => obtenerData_xm_afac.anho===anhom && obtenerData_xm_afac.mes===mesm)).length>0? <p> Ok DATA_XM_AFAC</p>:<p>No se encontraron insumos en DATA_XM_AFAC</p>: null}
                { !loading8? (data8.obtenerData_xm_adem.filter(obtenerData_xm_adem => obtenerData_xm_adem.anho===anhom && obtenerData_xm_adem.mes===mesm)).length>0? <p> Ok DATA_XM_ADEM</p>:<p>No se encontraron insumos en DATA_XM_ADEM</p>: null}
                {/* { !loading9? (data9.obtenerData_mme_validacion.filter(obtenerData_mme_validacion => obtenerData_mme_validacion.anho===anhom && obtenerData_mme_validacion.mes===mesm)).length>0? <p> Ok DATA_MME_VALIDACION</p>:<p>No se encontraron insumos en DATA_MME_VALIDACION</p>: null}
                { !loading10? (data10.obtenerData_mme_giro.filter(obtenerData_mme_giro => obtenerData_mme_giro.anho===anhom && obtenerData_mme_giro.mes===mesm)).length>0? <p> Ok DATA_MME_GIRO</p>:<p>No se encontraron insumos en DATA_MME_GIRO</p>: null} */}
                { !loading11? data11.obtenerData_creg_cx.length>0? <p> Ok DATA_CREG_CX</p>:<p>No se encontraron insumos en DATA_CREG_CX</p>: null}
                {/* { !loading12? (data12.obtenerData_banrepublica_tco.filter(obtenerData_banrepublica_tco => obtenerData_banrepublica_tco.anho===anhom && obtenerData_banrepublica_tco.mes===mesm)).length>0? <p> Ok DATA_BANREPUBLICA_TCO</p>:<p>No se encontraron insumos en DATA_BANREPUBLICA_TCO</p>: null} */}
                {/* { !loading13? (data13.obtenerData_banrepublica_tcap.filter(obtenerData_banrepublica_tcap => obtenerData_banrepublica_tcap.anho===anhom && obtenerData_banrepublica_tcap.mes===mesm)).length>0? <p> Ok DATA_BANREPUBLICA_TCAP</p>:<p>No se encontraron insumos en DATA_BANREPUBLICA_TCAP</p>: null} */}
                { !loading14? (data14.obtenerDataxmstn.filter(obtenerDataxmstn => obtenerDataxmstn.anho===anhom && obtenerDataxmstn.mes===mesm)).length>0? <p> Ok DATA_DATAXMSTN</p>:<p>No se encontraron insumos en DATA_DATAXMSTN</p>: null}
                { !loading15? (data15.obtenerData_xm_cprog.filter(obtenerData_xm_cprog => obtenerData_xm_cprog.anho===anho && obtenerData_xm_cprog.mes===mes)).length>0? <p> Ok DATA_XM_CPROG</p>:<p>No se encontraron insumos en DATA_XM_CPROG</p>: null}
                { !loading16? (data16.obtenerData_xm_ipr.filter(obtenerData_xm_ipr => obtenerData_xm_ipr.anho===anho && obtenerData_xm_ipr.mes===mes)).length>0? <p> Ok DATA_XM_IPR</p>:<p>No se encontraron insumos en DATA_XM_IPR</p>: null}
                { !loading17? (data17.obtenerData_xm_d015.filter(obtenerData_xm_d015 => obtenerData_xm_d015.anho===anhom && obtenerData_xm_d015.mes===mesm)).length>0? <p> Ok DATA_XM_D015</p>:<p>No se encontraron insumos en DATA_XM_D015</p>: null}
                { !loading18? (data18.obtenerData_xm_dtun.filter(obtenerData_xm_dtun => obtenerData_xm_dtun.anho===anhom && obtenerData_xm_dtun.mes===mesm)).length>0? <p> Ok DATA_XM_DTUN</p>:<p>No se encontraron insumos en DATA_XM_DTUN</p>: null}
                { !loading19? (data19.obtenerData_xm_guatape.filter(obtenerData_xm_guatape => obtenerData_xm_guatape.anho===anhom && obtenerData_xm_guatape.mes===mesm)).length>0? <p> Ok DATA_XM_GUATAPE</p>:<p>No se encontraron insumos en DATA_XM_GUATAPE</p>: null}
                {/* { !loading20? (data20.obtenerRes_componentes_cu_tarifa.filter(obtenerRes_componentes_cu_tarifa => obtenerRes_componentes_cu_tarifa.anho===anhom && obtenerRes_componentes_cu_tarifa.mes===mesm)).length>0? <p> Ok RES_COMPONENTES_CU_TARIFA</p>:<p>No se encontraron insumos en RES_COMPONENTES_CU_TARIFA</p>: null} */}
        </div>
</div>
</div>

<div className="container p-0">
<div className="card col-sm ">
<div className="card-header h6">
<dt>Resultados:</dt>
</div>
<div className="card-body shadow ">

<form
onSubmit={formik.handleSubmit}
>
<div className="form-group row">
<label htmlFor="creador" className="col-sm-7 col-form-label">creador</label><div className="col-sm-5">
<input type="number" className="form-control" id="creador" placeholder="creador"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.creador}></input></div></div>
{ formik.touched.creador&& formik.errors.creador? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.creador}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="anho" className="col-sm-7 col-form-label">Anho</label><div className="col-sm-5">
<input type="number" className="form-control" id="anho" placeholder="Anho"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.anho}></input></div></div>
{ formik.touched.anho&& formik.errors.anho? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.anho}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="mes" className="col-sm-7 col-form-label">Mes</label><div className="col-sm-5">
<input type="number" className="form-control" id="mes" placeholder="Mes"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.mes}></input></div></div>
{ formik.touched.mes&& formik.errors.mes? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.mes}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="qc" className="col-sm-7 col-form-label">Qc</label><div className="col-sm-5">
<input type="number" className="form-control" id="qc" placeholder="Qc"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.qc}></input></div></div>
{ formik.touched.qc&& formik.errors.qc? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.qc}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="pc" className="col-sm-7 col-form-label">Pc</label><div className="col-sm-5">
<input type="number" className="form-control" id="pc" placeholder="Pc"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pc}></input></div></div>
{ formik.touched.pc&& formik.errors.pc? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.pc}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="ref_g" className="col-sm-7 col-form-label">Ref_G</label><div className="col-sm-5">
<input type="number" className="form-control" id="ref_g" placeholder="Ref_G"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ref_g}></input></div></div>
{ formik.touched.ref_g&& formik.errors.ref_g? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.ref_g}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="max_g" className="col-sm-7 col-form-label">Max_G</label><div className="col-sm-5">
<input type="number" className="form-control" id="max_g" placeholder="Max_G"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.max_g}></input></div></div>
{ formik.touched.max_g&& formik.errors.max_g? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.max_g}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cr" className="col-sm-7 col-form-label">Cr</label><div className="col-sm-5">
<input type="number" className="form-control" id="cr" placeholder="Cr"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cr}></input></div></div>
{ formik.touched.cr&& formik.errors.cr? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cr}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="ad" className="col-sm-7 col-form-label">Ad</label><div className="col-sm-5">
<input type="number" className="form-control" id="ad" placeholder="Ad"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ad}></input></div></div>
{ formik.touched.ad&& formik.errors.ad? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.ad}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="aj" className="col-sm-7 col-form-label">Aj</label><div className="col-sm-5">
<input type="number" className="form-control" id="aj" placeholder="Aj"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aj}></input></div></div>
{ formik.touched.aj&& formik.errors.aj? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.aj}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="pb" className="col-sm-7 col-form-label">Pb</label><div className="col-sm-5">
<input type="number" className="form-control" id="pb" placeholder="Pb"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pb}></input></div></div>
{ formik.touched.pb&& formik.errors.pb? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.pb}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="gc" className="col-sm-7 col-form-label">Gc</label><div className="col-sm-5">
<input type="number" className="form-control" id="gc" placeholder="Gc"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.gc}></input></div></div>
{ formik.touched.gc&& formik.errors.gc? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.gc}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="tx" className="col-sm-7 col-form-label">Tx</label><div className="col-sm-5">
<input type="number" className="form-control" id="tx" placeholder="Tx"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tx}></input></div></div>
{ formik.touched.tx&& formik.errors.tx? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.tx}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="dtun_nt1_e" className="col-sm-7 col-form-label">Dtun_Nt1_E</label><div className="col-sm-5">
<input type="number" className="form-control" id="dtun_nt1_e" placeholder="Dtun_Nt1_E"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dtun_nt1_e}></input></div></div>
{ formik.touched.dtun_nt1_e&& formik.errors.dtun_nt1_e? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.dtun_nt1_e}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="dtun_nt1_c" className="col-sm-7 col-form-label">Dtun_Nt1_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="dtun_nt1_c" placeholder="Dtun_Nt1_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dtun_nt1_c}></input></div></div>
{ formik.touched.dtun_nt1_c&& formik.errors.dtun_nt1_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.dtun_nt1_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="dtun_nt1_p" className="col-sm-7 col-form-label">Dtun_Nt1_P</label><div className="col-sm-5">
<input type="number" className="form-control" id="dtun_nt1_p" placeholder="Dtun_Nt1_P"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dtun_nt1_p}></input></div></div>
{ formik.touched.dtun_nt1_p&& formik.errors.dtun_nt1_p? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.dtun_nt1_p}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="dtun_nt2" className="col-sm-7 col-form-label">Dtun_Nt2</label><div className="col-sm-5">
<input type="number" className="form-control" id="dtun_nt2" placeholder="Dtun_Nt2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dtun_nt2}></input></div></div>
{ formik.touched.dtun_nt2&& formik.errors.dtun_nt2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.dtun_nt2}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="dtun_nt3" className="col-sm-7 col-form-label">Dtun_Nt3</label><div className="col-sm-5">
<input type="number" className="form-control" id="dtun_nt3" placeholder="Dtun_Nt3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dtun_nt3}></input></div></div>
{ formik.touched.dtun_nt3&& formik.errors.dtun_nt3? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.dtun_nt3}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cdi_100" className="col-sm-7 col-form-label">Cdi_100</label><div className="col-sm-5">
<input type="number" className="form-control" id="cdi_100" placeholder="Cdi_100"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cdi_100}></input></div></div>
{ formik.touched.cdi_100&& formik.errors.cdi_100? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cdi_100}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cdi_50" className="col-sm-7 col-form-label">Cdi_50</label><div className="col-sm-5">
<input type="number" className="form-control" id="cdi_50" placeholder="Cdi_50"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cdi_50}></input></div></div>
{ formik.touched.cdi_50&& formik.errors.cdi_50? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cdi_50}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cdm" className="col-sm-7 col-form-label">Cdm</label><div className="col-sm-5">
<input type="number" className="form-control" id="cdm" placeholder="Cdm"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cdm}></input></div></div>
{ formik.touched.cdm&& formik.errors.cdm? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cdm}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cd4" className="col-sm-7 col-form-label">Cd4</label><div className="col-sm-5">
<input type="number" className="form-control" id="cd4" placeholder="Cd4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cd4}></input></div></div>
{ formik.touched.cd4&& formik.errors.cd4? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cd4}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cd3" className="col-sm-7 col-form-label">Cd3</label><div className="col-sm-5">
<input type="number" className="form-control" id="cd3" placeholder="Cd3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cd3}></input></div></div>
{ formik.touched.cd3&& formik.errors.cd3? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cd3}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cd2" className="col-sm-7 col-form-label">Cd2</label><div className="col-sm-5">
<input type="number" className="form-control" id="cd2" placeholder="Cd2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cd2}></input></div></div>
{ formik.touched.cd2&& formik.errors.cd2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cd2}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="dnt1" className="col-sm-7 col-form-label">Dnt1</label><div className="col-sm-5">
<input type="number" className="form-control" id="dnt1" placeholder="Dnt1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dnt1}></input></div></div>
{ formik.touched.dnt1&& formik.errors.dnt1? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.dnt1}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="dnt2" className="col-sm-7 col-form-label">Dnt2</label><div className="col-sm-5">
<input type="number" className="form-control" id="dnt2" placeholder="Dnt2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dnt2}></input></div></div>
{ formik.touched.dnt2&& formik.errors.dnt2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.dnt2}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="dnt3" className="col-sm-7 col-form-label">Dnt3</label><div className="col-sm-5">
<input type="number" className="form-control" id="dnt3" placeholder="Dnt3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dnt3}></input></div></div>
{ formik.touched.dnt3&& formik.errors.dnt3? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.dnt3}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="dnt4" className="col-sm-7 col-form-label">Dnt4</label><div className="col-sm-5">
<input type="number" className="form-control" id="dnt4" placeholder="Dnt4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dnt4}></input></div></div>
{ formik.touched.dnt4&& formik.errors.dnt4? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.dnt4}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="crs" className="col-sm-7 col-form-label">Crs</label><div className="col-sm-5">
<input type="number" className="form-control" id="crs" placeholder="Crs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.crs}></input></div></div>
{ formik.touched.crs&& formik.errors.crs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.crs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="rcal" className="col-sm-7 col-form-label">Rcal</label><div className="col-sm-5">
<input type="number" className="form-control" id="rcal" placeholder="Rcal"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcal}></input></div></div>
{ formik.touched.rcal&& formik.errors.rcal? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.rcal}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="r" className="col-sm-7 col-form-label">R</label><div className="col-sm-5">
<input type="number" className="form-control" id="r" placeholder="R"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.r}></input></div></div>
{ formik.touched.r&& formik.errors.r? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.r}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="iprstn" className="col-sm-7 col-form-label">Iprstn</label><div className="col-sm-5">
<input type="number" className="form-control" id="iprstn" placeholder="Iprstn"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iprstn}></input></div></div>
{ formik.touched.iprstn&& formik.errors.iprstn? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.iprstn}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="pr_nt1" className="col-sm-7 col-form-label">Pr_Nt1</label><div className="col-sm-5">
<input type="number" className="form-control" id="pr_nt1" placeholder="Pr_Nt1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pr_nt1}></input></div></div>
{ formik.touched.pr_nt1&& formik.errors.pr_nt1? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.pr_nt1}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="pr_nt2" className="col-sm-7 col-form-label">Pr_Nt2</label><div className="col-sm-5">
<input type="number" className="form-control" id="pr_nt2" placeholder="Pr_Nt2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pr_nt2}></input></div></div>
{ formik.touched.pr_nt2&& formik.errors.pr_nt2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.pr_nt2}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="pr_nt3" className="col-sm-7 col-form-label">Pr_Nt3</label><div className="col-sm-5">
<input type="number" className="form-control" id="pr_nt3" placeholder="Pr_Nt3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pr_nt3}></input></div></div>
{ formik.touched.pr_nt3&& formik.errors.pr_nt3? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.pr_nt3}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="pr_nt4" className="col-sm-7 col-form-label">Pr_Nt4</label><div className="col-sm-5">
<input type="number" className="form-control" id="pr_nt4" placeholder="Pr_Nt4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pr_nt4}></input></div></div>
{ formik.touched.pr_nt4&& formik.errors.pr_nt4? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.pr_nt4}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cer" className="col-sm-7 col-form-label">Cer</label><div className="col-sm-5">
<input type="number" className="form-control" id="cer" placeholder="Cer"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cer}></input></div></div>
{ formik.touched.cer&& formik.errors.cer? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cer}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cfm" className="col-sm-7 col-form-label">Cfm</label><div className="col-sm-5">
<input type="number" className="form-control" id="cfm" placeholder="Cfm"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cfm}></input></div></div>
{ formik.touched.cfm&& formik.errors.cfm? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cfm}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="rc" className="col-sm-7 col-form-label">Rc</label><div className="col-sm-5">
<input type="number" className="form-control" id="rc" placeholder="Rc"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rc}></input></div></div>
{ formik.touched.rc&& formik.errors.rc? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.rc}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="ul_trim_val_mme" className="col-sm-7 col-form-label">Ul_Trim_Val_Mme</label><div className="col-sm-5">
<input type="number" className="form-control" id="ul_trim_val_mme" placeholder="Ul_Trim_Val_Mme"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ul_trim_val_mme}></input></div></div>
{ formik.touched.ul_trim_val_mme&& formik.errors.ul_trim_val_mme? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.ul_trim_val_mme}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="anho_ul_trim_val_mme" className="col-sm-7 col-form-label">Anho_Ul_Trim_Val_Mme</label><div className="col-sm-5">
<input type="number" className="form-control" id="anho_ul_trim_val_mme" placeholder="Anho_Ul_Trim_Val_Mme"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.anho_ul_trim_val_mme}></input></div></div>
{ formik.touched.anho_ul_trim_val_mme&& formik.errors.anho_ul_trim_val_mme? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.anho_ul_trim_val_mme}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="sub1" className="col-sm-7 col-form-label">Sub1</label><div className="col-sm-5">
<input type="number" className="form-control" id="sub1" placeholder="Sub1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.sub1}></input></div></div>
{ formik.touched.sub1&& formik.errors.sub1? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.sub1}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="sub2" className="col-sm-7 col-form-label">Sub2</label><div className="col-sm-5">
<input type="number" className="form-control" id="sub2" placeholder="Sub2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.sub2}></input></div></div>
{ formik.touched.sub2&& formik.errors.sub2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.sub2}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="n_sub1" className="col-sm-7 col-form-label">N_Sub1</label><div className="col-sm-5">
<input type="number" className="form-control" id="n_sub1" placeholder="N_Sub1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.n_sub1}></input></div></div>
{ formik.touched.n_sub1&& formik.errors.n_sub1? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.n_sub1}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="m_sub2" className="col-sm-7 col-form-label">M_Sub2</label><div className="col-sm-5">
<input type="number" className="form-control" id="m_sub2" placeholder="M_Sub2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.m_sub2}></input></div></div>
{ formik.touched.m_sub2&& formik.errors.m_sub2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.m_sub2}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="facturacion_t" className="col-sm-7 col-form-label">Facturacion_T</label><div className="col-sm-5">
<input type="number" className="form-control" id="facturacion_t" placeholder="Facturacion_T"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.facturacion_t}></input></div></div>
{ formik.touched.facturacion_t&& formik.errors.facturacion_t? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.facturacion_t}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="r1" className="col-sm-7 col-form-label">R1</label><div className="col-sm-5">
<input type="number" className="form-control" id="r1" placeholder="R1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.r1}></input></div></div>
{ formik.touched.r1&& formik.errors.r1? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.r1}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="r2" className="col-sm-7 col-form-label">R2</label><div className="col-sm-5">
<input type="number" className="form-control" id="r2" placeholder="R2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.r2}></input></div></div>
{ formik.touched.r2&& formik.errors.r2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.r2}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="sup_def" className="col-sm-7 col-form-label">Sup_Def</label><div className="col-sm-5">
<input type="number" className="form-control" id="sup_def" placeholder="Sup_Def"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.sup_def}></input></div></div>
{ formik.touched.sup_def&& formik.errors.sup_def? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.sup_def}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cfs" className="col-sm-7 col-form-label">Cfs</label><div className="col-sm-5">
<input type="number" className="form-control" id="cfs" placeholder="Cfs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cfs}></input></div></div>
{ formik.touched.cfs&& formik.errors.cfs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cfs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cfe" className="col-sm-7 col-form-label">Cfe</label><div className="col-sm-5">
<input type="number" className="form-control" id="cfe" placeholder="Cfe"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cfe}></input></div></div>
{ formik.touched.cfe&& formik.errors.cfe? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cfe}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="c_ast" className="col-sm-7 col-form-label">C_Ast</label><div className="col-sm-5">
<input type="number" className="form-control" id="c_ast" placeholder="C_Ast"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.c_ast}></input></div></div>
{ formik.touched.c_ast&& formik.errors.c_ast? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.c_ast}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cvr" className="col-sm-7 col-form-label">Cvr</label><div className="col-sm-5">
<input type="number" className="form-control" id="cvr" placeholder="Cvr"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cvr}></input></div></div>
{ formik.touched.cvr&& formik.errors.cvr? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cvr}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cv" className="col-sm-7 col-form-label">Cv</label><div className="col-sm-5">
<input type="number" className="form-control" id="cv" placeholder="Cv"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cv}></input></div></div>
{ formik.touched.cv&& formik.errors.cv? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cv}</p>
</div>
) : null  }
<div className="form-group row">
<label htmlFor="cu_nt1_100" className="col-sm-7 col-form-label">Cu_Nt1_100</label><div className="col-sm-5">
<input type="number" className="form-control" id="cu_nt1_100" placeholder="Cu_Nt1_100"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt1_100}></input></div></div>
{ formik.touched.cu_nt1_100&& formik.errors.cu_nt1_100? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt1_100}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cu_nt1_50" className="col-sm-7 col-form-label">Cu_Nt1_50</label><div className="col-sm-5">
<input type="number" className="form-control" id="cu_nt1_50" placeholder="Cu_Nt1_50"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt1_50}></input></div></div>
{ formik.touched.cu_nt1_50&& formik.errors.cu_nt1_50? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt1_50}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cu_nt1_0" className="col-sm-7 col-form-label">Cu_Nt1_0</label><div className="col-sm-5">
<input type="number" className="form-control" id="cu_nt1_0" placeholder="Cu_Nt1_0"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt1_0}></input></div></div>
{ formik.touched.cu_nt1_0&& formik.errors.cu_nt1_0? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt1_0}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cu_nt2" className="col-sm-7 col-form-label">Cu_Nt2</label><div className="col-sm-5">
<input type="number" className="form-control" id="cu_nt2" placeholder="Cu_Nt2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt2}></input></div></div>
{ formik.touched.cu_nt2&& formik.errors.cu_nt2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt2}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cu_nt3" className="col-sm-7 col-form-label">Cu_Nt3</label><div className="col-sm-5">
<input type="number" className="form-control" id="cu_nt3" placeholder="Cu_Nt3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt3}></input></div></div>
{ formik.touched.cu_nt3&& formik.errors.cu_nt3? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt3}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="cu_nt4" className="col-sm-7 col-form-label">Cu_Nt4</label><div className="col-sm-5">
<input type="number" className="form-control" id="cu_nt4" placeholder="Cu_Nt4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt4}></input></div></div>
{ formik.touched.cu_nt4&& formik.errors.cu_nt4? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt4}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_estrato_1_men_cs" className="col-sm-7 col-form-label">Nt1_100_Estrato_1_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_estrato_1_men_cs" placeholder="Nt1_100_Estrato_1_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_estrato_1_men_cs}></input></div></div>
{ formik.touched.nt1_100_estrato_1_men_cs&& formik.errors.nt1_100_estrato_1_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_estrato_1_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_estrato_2_men_cs" className="col-sm-7 col-form-label">Nt1_100_Estrato_2_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_estrato_2_men_cs" placeholder="Nt1_100_Estrato_2_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_estrato_2_men_cs}></input></div></div>
{ formik.touched.nt1_100_estrato_2_men_cs&& formik.errors.nt1_100_estrato_2_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_estrato_2_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_estrato_3_men_cs" className="col-sm-7 col-form-label">Nt1_100_Estrato_3_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_estrato_3_men_cs" placeholder="Nt1_100_Estrato_3_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_estrato_3_men_cs}></input></div></div>
{ formik.touched.nt1_100_estrato_3_men_cs&& formik.errors.nt1_100_estrato_3_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_estrato_3_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_estrato_4_men_cs" className="col-sm-7 col-form-label">Nt1_100_Estrato_4_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_estrato_4_men_cs" placeholder="Nt1_100_Estrato_4_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_estrato_4_men_cs}></input></div></div>
{ formik.touched.nt1_100_estrato_4_men_cs&& formik.errors.nt1_100_estrato_4_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_estrato_4_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_estrato_5_men_cs" className="col-sm-7 col-form-label">Nt1_100_Estrato_5_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_estrato_5_men_cs" placeholder="Nt1_100_Estrato_5_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_estrato_5_men_cs}></input></div></div>
{ formik.touched.nt1_100_estrato_5_men_cs&& formik.errors.nt1_100_estrato_5_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_estrato_5_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_estrato_6_men_cs" className="col-sm-7 col-form-label">Nt1_100_Estrato_6_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_estrato_6_men_cs" placeholder="Nt1_100_Estrato_6_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_estrato_6_men_cs}></input></div></div>
{ formik.touched.nt1_100_estrato_6_men_cs&& formik.errors.nt1_100_estrato_6_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_estrato_6_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_estrato_4" className="col-sm-7 col-form-label">Nt1_100_Estrato_4</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_estrato_4" placeholder="Nt1_100_Estrato_4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_estrato_4}></input></div></div>
{ formik.touched.nt1_100_estrato_4&& formik.errors.nt1_100_estrato_4? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_estrato_4}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_estrato_5" className="col-sm-7 col-form-label">Nt1_100_Estrato_5</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_estrato_5" placeholder="Nt1_100_Estrato_5"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_estrato_5}></input></div></div>
{ formik.touched.nt1_100_estrato_5&& formik.errors.nt1_100_estrato_5? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_estrato_5}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_estrato_6" className="col-sm-7 col-form-label">Nt1_100_Estrato_6</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_estrato_6" placeholder="Nt1_100_Estrato_6"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_estrato_6}></input></div></div>
{ formik.touched.nt1_100_estrato_6&& formik.errors.nt1_100_estrato_6? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_estrato_6}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_c" className="col-sm-7 col-form-label">Nt1_100_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_c" placeholder="Nt1_100_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_c}></input></div></div>
{ formik.touched.nt1_100_c&& formik.errors.nt1_100_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_i_con_c" className="col-sm-7 col-form-label">Nt1_100_I_Con_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_i_con_c" placeholder="Nt1_100_I_Con_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_i_con_c}></input></div></div>
{ formik.touched.nt1_100_i_con_c&& formik.errors.nt1_100_i_con_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_i_con_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_i_sin_c" className="col-sm-7 col-form-label">Nt1_100_I_Sin_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_i_sin_c" placeholder="Nt1_100_I_Sin_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_i_sin_c}></input></div></div>
{ formik.touched.nt1_100_i_sin_c&& formik.errors.nt1_100_i_sin_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_i_sin_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_p" className="col-sm-7 col-form-label">Nt1_100_P</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_p" placeholder="Nt1_100_P"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_p}></input></div></div>
{ formik.touched.nt1_100_p&& formik.errors.nt1_100_p? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_p}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_100_o" className="col-sm-7 col-form-label">Nt1_100_O</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_100_o" placeholder="Nt1_100_O"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_100_o}></input></div></div>
{ formik.touched.nt1_100_o&& formik.errors.nt1_100_o? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_100_o}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_estrato_1_men_cs" className="col-sm-7 col-form-label">Nt1_50__Estrato_1_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_estrato_1_men_cs" placeholder="Nt1_50__Estrato_1_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_estrato_1_men_cs}></input></div></div>
{ formik.touched.nt1_50_estrato_1_men_cs&& formik.errors.nt1_50_estrato_1_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_estrato_1_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_estrato_2_men_cs" className="col-sm-7 col-form-label">Nt1_50__Estrato_2_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_estrato_2_men_cs" placeholder="Nt1_50__Estrato_2_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_estrato_2_men_cs}></input></div></div>
{ formik.touched.nt1_50_estrato_2_men_cs&& formik.errors.nt1_50_estrato_2_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_estrato_2_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_estrato_3_men_cs" className="col-sm-7 col-form-label">Nt1_50__Estrato_3_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_estrato_3_men_cs" placeholder="Nt1_50__Estrato_3_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_estrato_3_men_cs}></input></div></div>
{ formik.touched.nt1_50_estrato_3_men_cs&& formik.errors.nt1_50_estrato_3_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_estrato_3_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_estrato_4_men_cs" className="col-sm-7 col-form-label">Nt1_50__Estrato_4_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_estrato_4_men_cs" placeholder="Nt1_50__Estrato_4_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_estrato_4_men_cs}></input></div></div>
{ formik.touched.nt1_50_estrato_4_men_cs&& formik.errors.nt1_50_estrato_4_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_estrato_4_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_estrato_5_men_cs" className="col-sm-7 col-form-label">Nt1_50__Estrato_5_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_estrato_5_men_cs" placeholder="Nt1_50__Estrato_5_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_estrato_5_men_cs}></input></div></div>
{ formik.touched.nt1_50_estrato_5_men_cs&& formik.errors.nt1_50_estrato_5_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_estrato_5_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_estrato_6_men_cs" className="col-sm-7 col-form-label">Nt1_50__Estrato_6_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_estrato_6_men_cs" placeholder="Nt1_50__Estrato_6_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_estrato_6_men_cs}></input></div></div>
{ formik.touched.nt1_50_estrato_6_men_cs&& formik.errors.nt1_50_estrato_6_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_estrato_6_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_estrato_4" className="col-sm-7 col-form-label">Nt1_50__Estrato_4</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_estrato_4" placeholder="Nt1_50__Estrato_4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_estrato_4}></input></div></div>
{ formik.touched.nt1_50_estrato_4&& formik.errors.nt1_50_estrato_4? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_estrato_4}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_estrato_5" className="col-sm-7 col-form-label">Nt1_50__Estrato_5</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_estrato_5" placeholder="Nt1_50__Estrato_5"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_estrato_5}></input></div></div>
{ formik.touched.nt1_50_estrato_5&& formik.errors.nt1_50_estrato_5? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_estrato_5}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_estrato_6" className="col-sm-7 col-form-label">Nt1_50__Estrato_6</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_estrato_6" placeholder="Nt1_50__Estrato_6"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_estrato_6}></input></div></div>
{ formik.touched.nt1_50_estrato_6&& formik.errors.nt1_50_estrato_6? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_estrato_6}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_c" className="col-sm-7 col-form-label">Nt1_50__C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_c" placeholder="Nt1_50__C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_c}></input></div></div>
{ formik.touched.nt1_50_c&& formik.errors.nt1_50_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_i_con_c" className="col-sm-7 col-form-label">Nt1_50__I_Con_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_i_con_c" placeholder="Nt1_50__I_Con_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_i_con_c}></input></div></div>
{ formik.touched.nt1_50_i_con_c&& formik.errors.nt1_50_i_con_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_i_con_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_i_sin_c" className="col-sm-7 col-form-label">Nt1_50__I_Sin_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_i_sin_c" placeholder="Nt1_50__I_Sin_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_i_sin_c}></input></div></div>
{ formik.touched.nt1_50_i_sin_c&& formik.errors.nt1_50_i_sin_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_i_sin_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_p" className="col-sm-7 col-form-label">Nt1_50__P</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_p" placeholder="Nt1_50__P"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_p}></input></div></div>
{ formik.touched.nt1_50_p&& formik.errors.nt1_50_p? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_p}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_50_o" className="col-sm-7 col-form-label">Nt1_50__O</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_50_o" placeholder="Nt1_50__O"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_50_o}></input></div></div>
{ formik.touched.nt1_50_o&& formik.errors.nt1_50_o? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_50_o}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_estrato_1_men_cs" className="col-sm-7 col-form-label">Nt1_0_Estrato_1_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_estrato_1_men_cs" placeholder="Nt1_0_Estrato_1_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_estrato_1_men_cs}></input></div></div>
{ formik.touched.nt1_0_estrato_1_men_cs&& formik.errors.nt1_0_estrato_1_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_estrato_1_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_estrato_2_men_cs" className="col-sm-7 col-form-label">Nt1_0_Estrato_2_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_estrato_2_men_cs" placeholder="Nt1_0_Estrato_2_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_estrato_2_men_cs}></input></div></div>
{ formik.touched.nt1_0_estrato_2_men_cs&& formik.errors.nt1_0_estrato_2_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_estrato_2_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_estrato_3_men_cs" className="col-sm-7 col-form-label">Nt1_0_Estrato_3_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_estrato_3_men_cs" placeholder="Nt1_0_Estrato_3_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_estrato_3_men_cs}></input></div></div>
{ formik.touched.nt1_0_estrato_3_men_cs&& formik.errors.nt1_0_estrato_3_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_estrato_3_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_estrato_4_men_cs" className="col-sm-7 col-form-label">Nt1_0_Estrato_4_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_estrato_4_men_cs" placeholder="Nt1_0_Estrato_4_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_estrato_4_men_cs}></input></div></div>
{ formik.touched.nt1_0_estrato_4_men_cs&& formik.errors.nt1_0_estrato_4_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_estrato_4_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_estrato_5_men_cs" className="col-sm-7 col-form-label">Nt1_0_Estrato_5_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_estrato_5_men_cs" placeholder="Nt1_0_Estrato_5_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_estrato_5_men_cs}></input></div></div>
{ formik.touched.nt1_0_estrato_5_men_cs&& formik.errors.nt1_0_estrato_5_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_estrato_5_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_estrato_6_men_cs" className="col-sm-7 col-form-label">Nt1_0_Estrato_6_Men_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_estrato_6_men_cs" placeholder="Nt1_0_Estrato_6_Men_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_estrato_6_men_cs}></input></div></div>
{ formik.touched.nt1_0_estrato_6_men_cs&& formik.errors.nt1_0_estrato_6_men_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_estrato_6_men_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_estrato_4" className="col-sm-7 col-form-label">Nt1_0_Estrato_4</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_estrato_4" placeholder="Nt1_0_Estrato_4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_estrato_4}></input></div></div>
{ formik.touched.nt1_0_estrato_4&& formik.errors.nt1_0_estrato_4? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_estrato_4}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_estrato_5" className="col-sm-7 col-form-label">Nt1_0_Estrato_5</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_estrato_5" placeholder="Nt1_0_Estrato_5"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_estrato_5}></input></div></div>
{ formik.touched.nt1_0_estrato_5&& formik.errors.nt1_0_estrato_5? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_estrato_5}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_estrato_6" className="col-sm-7 col-form-label">Nt1_0_Estrato_6</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_estrato_6" placeholder="Nt1_0_Estrato_6"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_estrato_6}></input></div></div>
{ formik.touched.nt1_0_estrato_6&& formik.errors.nt1_0_estrato_6? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_estrato_6}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_c" className="col-sm-7 col-form-label">Nt1_0_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_c" placeholder="Nt1_0_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_c}></input></div></div>
{ formik.touched.nt1_0_c&& formik.errors.nt1_0_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_i_con_c" className="col-sm-7 col-form-label">Nt1_0_I_Con_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_i_con_c" placeholder="Nt1_0_I_Con_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_i_con_c}></input></div></div>
{ formik.touched.nt1_0_i_con_c&& formik.errors.nt1_0_i_con_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_i_con_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_i_sin_c" className="col-sm-7 col-form-label">Nt1_0_I_Sin_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_i_sin_c" placeholder="Nt1_0_I_Sin_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_i_sin_c}></input></div></div>
{ formik.touched.nt1_0_i_sin_c&& formik.errors.nt1_0_i_sin_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_i_sin_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_p" className="col-sm-7 col-form-label">Nt1_0_P</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_p" placeholder="Nt1_0_P"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_p}></input></div></div>
{ formik.touched.nt1_0_p&& formik.errors.nt1_0_p? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_p}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt1_0_o" className="col-sm-7 col-form-label">Nt1_0_O</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt1_0_o" placeholder="Nt1_0_O"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt1_0_o}></input></div></div>
{ formik.touched.nt1_0_o&& formik.errors.nt1_0_o? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt1_0_o}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt2_c" className="col-sm-7 col-form-label">Nt2_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt2_c" placeholder="Nt2_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt2_c}></input></div></div>
{ formik.touched.nt2_c&& formik.errors.nt2_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt2_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt2_i_con_c" className="col-sm-7 col-form-label">Nt2_I_Con_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt2_i_con_c" placeholder="Nt2_I_Con_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt2_i_con_c}></input></div></div>
{ formik.touched.nt2_i_con_c&& formik.errors.nt2_i_con_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt2_i_con_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt2_i_sin_c" className="col-sm-7 col-form-label">Nt2_I_Sin_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt2_i_sin_c" placeholder="Nt2_I_Sin_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt2_i_sin_c}></input></div></div>
{ formik.touched.nt2_i_sin_c&& formik.errors.nt2_i_sin_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt2_i_sin_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt2_o" className="col-sm-7 col-form-label">Nt2_O</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt2_o" placeholder="Nt2_O"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt2_o}></input></div></div>
{ formik.touched.nt2_o&& formik.errors.nt2_o? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt2_o}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt2_ap" className="col-sm-7 col-form-label">Nt2_Ap</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt2_ap" placeholder="Nt2_Ap"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt2_ap}></input></div></div>
{ formik.touched.nt2_ap&& formik.errors.nt2_ap? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt2_ap}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt2_bsnmen_cs" className="col-sm-7 col-form-label">Nt2_Bsnmen_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt2_bsnmen_cs" placeholder="Nt2_Bsnmen_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt2_bsnmen_cs}></input></div></div>
{ formik.touched.nt2_bsnmen_cs&& formik.errors.nt2_bsnmen_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt2_bsnmen_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt2_bsnmay_cs" className="col-sm-7 col-form-label">Nt2_Bsnmay_Cs</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt2_bsnmay_cs" placeholder="Nt2_Bsnmay_Cs"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt2_bsnmay_cs}></input></div></div>
{ formik.touched.nt2_bsnmay_cs&& formik.errors.nt2_bsnmay_cs? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt2_bsnmay_cs}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt3_c" className="col-sm-7 col-form-label">Nt3_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt3_c" placeholder="Nt3_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt3_c}></input></div></div>
{ formik.touched.nt3_c&& formik.errors.nt3_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt3_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt3_i_con_c" className="col-sm-7 col-form-label">Nt3_I_Con_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt3_i_con_c" placeholder="Nt3_I_Con_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt3_i_con_c}></input></div></div>
{ formik.touched.nt3_i_con_c&& formik.errors.nt3_i_con_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt3_i_con_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt3_i_sin_c" className="col-sm-7 col-form-label">Nt3_I_Sin_C</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt3_i_sin_c" placeholder="Nt3_I_Sin_C"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt3_i_sin_c}></input></div></div>
{ formik.touched.nt3_i_sin_c&& formik.errors.nt3_i_sin_c? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt3_i_sin_c}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="nt3_o" className="col-sm-7 col-form-label">Nt3_O</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt3_o" placeholder="Nt3_O"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt3_o}></input></div></div>
{ formik.touched.nt3_o&& formik.errors.nt3_o? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt3_o}</p>
</div>
) : null  }
<div className="form-group row">
<label htmlFor="nt3_ap" className="col-sm-7 col-form-label">Nt3_Ap</label><div className="col-sm-5">
<input type="number" className="form-control" id="nt3_ap" placeholder="Nt3_Ap"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nt3_ap}></input></div></div>
{ formik.touched.nt3_ap&& formik.errors.nt3_ap? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.nt3_ap}</p>
</div>
) : null  }
<div className="form-group row">
<label htmlFor="empresa_id" className="col-sm-7 col-form-label">empresa_id</label><div className="col-sm-5">
<input type="text" className="form-control" id="empresa_id" placeholder="empresa_id"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.empresa_id ?
formik.values.empresa_id.charAt(0).toUpperCase() + formik.values.empresa_id.slice(1):''}readOnly></input></div></div>
{ formik.touched.empresa_id&& formik.errors.empresa_id? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.empresa_id}</p>
</div>
) : null  }

    <input type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
value={status?"Aplicación Opción Tarifaria: SI":"Aplicación Opción Tarifaria: NO" } 
onClick={e => setStatus(!status)}/> 

{status?<div className="container p-3">
<div className="card col-sm ">
{/* <div className="card-body shadow "></div> */}

<div className="container p-3">
<div className="card col-sm ">
<div className="form-group row">
<label htmlFor="pv" className="col-sm-7 col-form-label">PV (%)</label><div className="col-sm-5">
<input type="number" className="form-control" id="pv" placeholder="PV (%)"
onChange={formik.handleChange,e => setPv(e.target.value)}
onBlur={formik.handleBlur}
value={formik.values.pv}></input></div></div>
{ formik.touched.pv&& formik.errors.pv? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.pv}</p>
</div>
) : null  }
</div>
</div>





<div className="container ">
<div className="col-md-12">
<div className="row ">
<div className="col-md-3">
<div>NT</div>        
</div>

<div className="col-md-3">
<div>Calculado</div>
</div>

<div className="col-md-3">
<div>Aplicado</div>
</div>

<div className="col-md-3">
<div>Saldo</div>
</div>
</div>
</div>
</div>


<div className="container ">
<div className="col-md-12">
<div className="row ">

<div className="col-md-3">
<label htmlFor="cu_nt1_100" className="col-sm-7 col-form-label">1_100</label>
<label htmlFor="cu_nt1_50" className="col-sm-7 col-form-label">1_50</label>
<label htmlFor="cu_nt1_0" className="col-sm-7 col-form-label">1_0</label>
<label htmlFor="Cu_Nt2" className="col-sm-7 col-form-label">2</label>
<label htmlFor="Cu_Nt3" className="col-sm-7 col-form-label">3</label>
</div>

<div className="col-md-3">
<div className="col-md-10">
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt1_100" placeholder="Cu_Nt1_100"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt1_100}></input>
</div>
{ formik.touched.cu_nt1_100&& formik.errors.cu_nt1_100? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt1_100}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt1_50" placeholder="Cu_Nt1_50"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt1_50}></input>
</div>
{ formik.touched.cu_nt1_50&& formik.errors.cu_nt1_50? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt1_50}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt1_0" placeholder="Cu_Nt1_0"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt1_0}></input>
</div>
{ formik.touched.cu_nt1_0&& formik.errors.cu_nt1_0? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt1_0}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt2" placeholder="Cu_Nt2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt2}></input>
</div>
{ formik.touched.cu_nt2&& formik.errors.cu_nt2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt2}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt3" placeholder="Cu_Nt3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt3}></input>
</div>
{ formik.touched.cu_nt3&& formik.errors.cu_nt3? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt3}</p>
</div>
) : null  }
</div>
</div>

<div className="col-md-3">
<div className="col-md-10">
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt1_100_ot" placeholder="Cu_Nt1_100_ot"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt1_100_ot}></input>
</div>
{ formik.touched.cu_nt1_100_ot&& formik.errors.cu_nt1_100_ot? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt1_100_ot}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt1_50_ot" placeholder="Cu_Nt1_50_ot"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt1_50_ot}></input>
</div>
{ formik.touched.cu_nt1_50_ot&& formik.errors.cu_nt1_50_ot? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt1_50_ot}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt1_0_ot" placeholder="Cu_Nt1_0_ot"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt1_0_ot}></input>
</div>
{ formik.touched.cu_nt1_0_ot&& formik.errors.cu_nt1_0_ot? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt1_0_ot}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt2_ot" placeholder="Cu_Nt2_ot"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt2_ot}></input>
</div>
{ formik.touched.cu_nt2_ot&& formik.errors.cu_nt2_ot? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt2_ot}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="cu_nt3_ot" placeholder="Cu_Nt3_ot"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cu_nt3_ot}></input>
</div>
{ formik.touched.cu_nt3_ot&& formik.errors.cu_nt3_ot? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.cu_nt3_ot}</p>
</div>
) : null  }
</div>
</div>
<div className="col-md-3">
<div className="col-md-10">
<div className="form-group row">
<input type="number" className="form-control" id="saldo_nt1_100" placeholder="saldo_Nt1_100"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.saldo_nt1_100_ot}></input>
</div>
{formik.touched.saldo_nt1_100&& formik.errors.saldo_nt1_100? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.saldo_nt1_100_ot}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="saldo_nt1_50" placeholder="saldo_Nt1_50"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.saldo_nt1_50_ot}></input>
</div>
{ formik.touched.saldo_nt1_50&& formik.errors.saldo_nt1_50? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.saldo_nt1_50_ot}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="saldo_nt1_0" placeholder="saldo_Nt1_0"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.saldo_nt1_0_ot}></input>
</div>
{ formik.touched.saldo_nt1_0&& formik.errors.saldo_nt1_0? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.saldo_nt1_0_ot}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="saldo_nt2" placeholder="saldo_Nt2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.saldo_nt2_ot}></input>
</div>
{ formik.touched.saldo_nt2&& formik.errors.cu_nt2? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.saldo_nt2_ot}</p>
</div>
) : null  }
<div className="form-group row">
<input type="number" className="form-control" id="saldo_nt3" placeholder="saldo_Nt3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.saldo_nt3_ot}></input>
</div>
{ formik.touched.saldo_nt3&& formik.errors.saldo_nt3? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.saldo_nt3_ot}</p>
</div>
) : null  }
</div>
</div>
</div>
<div className="container p-3">
<div className="col-md-12">
  <div className="row ">
  <div className="col-md-6">
<label htmlFor="saldo_total_ot" className="col-sm-7 col-form-label text-right">Saldo Total</label>
</div>
<div className="col-md-6">
<div className="form-group row">
<input type="number" min="0.01" step="any" readOnly className="form-control" id="saldo_total_ot" placeholder="Saldo_Total_ot"
value={saldo_total_ot}></input>
</div>

</div>
</div>
</div>
</div>
    

</div>
</div>

</div>
</div>

:null } 
<div className="container">
<div className="row">
<div className="col-sm">
<input
type="submit"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
value="Guardar"
/>
</div>
<div className="col-sm">
<input
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
value="Cancelar"
onClick={props.close}
/>
</div>
</div>
</div>
</form>
</div>
</div>
</div>
</Modal.Body>
<Modal.Footer>
</Modal.Footer>
</Modal>
</div>

)
}

    
export default NuevoCalculo_CU





