import { gql } from "@apollo/react-hooks";

export const OBTENER_USUARIO = gql`
query obtenerUsuario{
obtenerUsuario {
id
nombre
apellido
empresa
}
}
`;



export const OBTENER_DATA_EMPRESAS = gql`
query obtenerData_empresa {
  obtenerData_empresa{
    id
    anho
    mes
    mercado
    empresa_id
    numero_usuarios_r
    numero_usuarios_nr
    ventas_usuarios_r_nt1_e
    ventas_usuarios_r_nt1_c
    ventas_usuarios_r_nt1_u
    ventas_usuarios_r_nt2
    ventas_usuarios_r_nt3
    ventas_usuarios_nr_kwh
    pui_cop_kwh
    vsne_kwh    
    vnu_kwh
    vae_kwh
    
  }
}
`;

export const ELIMINAR_DATA_EMPRESAS = gql`
mutation eliminarDataEmpresa ($eliminarDataEmpresaId: ID!) {
    eliminarDataEmpresa(id: $eliminarDataEmpresaId)
}
`;
export const NUEVO_DATA_EMPRESA = gql`
  mutation nuevoDataempresa($input: DataempresaInput) {
    nuevoDataempresa(input: $input) {
      id
      empresa_id
      creador
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
      pui_cop_kwh
      vsne_kwh
      vnu_kwh
      vae_kwh
      g_exc1
      g_exc1_21
      g_exc2
      g_exc3
      ggd
    }
  }
`;

export const OBTENER_DATA_XM_AFAC = gql`
query obtenerData_xm_afac {
  obtenerData_xm_afac {
  id
  anho
mes
agente
creador
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

export const  ELIMINAR_DATAXMAFAC= gql`
mutation eliminarDataxmafac ($eliminarDataxmafacId: ID!) {
eliminarDataxmafac(id: $eliminarDataxmafacId)
}
`;


export const NUEVO_DATA_RES_COMPONENTES_CU_TARIFA= gql`
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
nt2_estrato_1_men_cs
nt3_estrato_1_men_cs
nt4_estrato_1_men_cs
nt2_estrato_2_men_cs
nt3_estrato_2_men_cs
nt4_estrato_2_men_cs
empresa_id
cu_nt1_100_ot
cu_nt1_50_ot
cu_nt1_0_ot
cu_nt2_ot
cu_nt3_ot
cu_nt4_ot
saldo_nt1_100_ot
saldo_nt1_50_ot
saldo_nt1_0_ot
saldo_nt2_ot
saldo_nt3_ot
pv
giro_sobrante
ultimo_giro_incluido
cg
cgcu
}
}
`;
export const OBTENER_RES_COMPONENTES_CU_TARIFA= gql`
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
cu_nt4_ot
saldo_nt1_100_ot
saldo_nt1_50_ot
saldo_nt1_0_ot
saldo_nt2_ot
saldo_nt3_ot
pv
giro_sobrante
ultimo_giro_incluido
cg
cgcu
}
}
`;
export const OBTENER_DATA_DANE = gql`
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



export const OBTENER_DATA_XM_TSERV = gql`
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
valor
  }
}
`;

export const OBTENER_DATA_XM_TRSM = gql`
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


export const OBTENER_DATA_XM_DSPCTTO = gql`
query obtenerData_xm_dspctto {
obtenerData_xm_dspctto {
id
anho
mes
dia
creador
empresa_id
contrato
vendedor
comprador
tipo
tipomerc
tipoasigna
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


export const OBTENER_DATA_XM_ADEM = gql`
query obtenerData_xm_adem {
obtenerData_xm_adem {
id
anho
mes
dia
creador
empresa_id
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

export const OBTENER_DATA_MME_VALIDACION = gql`
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
giro_sobrante
ultimo_giro_incluido
}
}
`;

export const OBTENER_DATA_MME_GIRO = gql`
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
export const OBTENER_DATA_CREG_CX = gql`
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

export const OBTENER_DATA_BANREPUBLICA_TCO = gql`
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

export const OBTENER_DATA_BANREPUBLICA_TCAP = gql`
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

export const OBTENER_DATAXMSTN = gql`
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

export const OBTENER_DATA_XM_CPROG = gql`
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

export const OBTENER_DATA_XM_D015 = gql`
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


export const NUEVO_DATA_XM_D015 = gql`
  mutation nuevoData_xm_d015($input: [Data_xm_d015Input]) {
    nuevoData_xm_d015(input: $input) {
      datos {  
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
    errores {
      mensaje
      tipo
      registrosErrores {
        empresa_id
      anho
      mes
      cargo_por_uso_dt1_cop_kwh
      cargo_por_uso_dt2_cop_kwh
      cargo_por_uso_dt3_cop_kwh
      }
    }
    }
  }
`;

export const OBTENER_DATA_XM_DTUN = gql`
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
export const OBTENER_DATA_XM_IPR = gql`
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
export const OBTENER_DATA_XM_GUATAPE= gql`
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

export const OBTENER_DATA_EMPRESA_ANUAL= gql`
query obtenerData_empresa_anual{
obtenerData_empresa_anual{
id
creador
empresa_id
anho
contribuciones_creg
contribuciones_sspd
porc_contribucion_creg
porc_contribucion_sspd
}
}
`;

export const ACTUALIZATDATA_MME_VALIDACION= gql`
mutation actualizarData_mme_validacion($actualizarDataMmeValidacionId: ID!, $input:Data_mme_validacionInput){
actualizarData_mme_validacion(id: $actualizarDataMmeValidacionId,input: $input){
giro_sobrante
ultimo_giro_incluido
}
}
`;

export const OBTENER_DATA_XM_STR = gql`
query obtenerData_xm_str{
obtenerData_xm_str{
id
creador
empresa_id
anho
mes
total_ingreso_mensual_bruto_str_cop_norte
energia_del_str_kwh_norte
cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte
cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte
cargo_por_uso_dt4_cop_kwh_norte
factor_para_referir_las_medidas_de_energia_del_nt_4_norte
valor_diferencial_despues_de_compensacion_cop_kwh_norte
total_ingreso_mensual_bruto_str_cop_sur
energia_del_str_kwh_sur
cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur
cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur
cargo_por_uso_dt4_cop_kwh_sur
factor_para_referir_las_medidas_de_energia_del_nt_4_sur
valor_diferencial_despues_de_compensacion_cop_kwh_sur
}
}
`;
export const OBTENER_DATA_EMPRESA_GARANTIA = gql`
query obtenerData_empresa_garantia{
obtenerData_empresa_garantia{
id
creador
empresa_id
tipo_garantia
nit_beneficiario
dv_beneficiario
emisor_banco
numero_garantia
fecha_inicio_vigencia
fecha_fin_vigencia
valor_garantia
costo_garantia
}
}
`;

export const OBTENER_DATA_EMPRESA_AGPE = gql`
query obtenerData_empresa_agpe{
obtenerData_empresa_agpe{
id
creador
empresa_id
niu
anho
mes
dia
tipo_ene
hora_01
hora_02
hora_03
hora_04
hora_05
hora_06
hora_07
hora_08
hora_09
hora_10
hora_11
hora_12
hora_13
hora_14
hora_15
hora_16
hora_17
hora_18
hora_19
hora_20
hora_21
hora_22
hora_23
hora_24

}
}
`;
export const ELIMINAR_DATAXMSTN= gql`
mutation eliminarDataxmstn ($eliminarDataxmstnId: ID!) {
eliminarDataxmstn(id: $eliminarDataxmstnId)
}
`;

export const ELIMINAR_DATA_XM_CPROG= gql`
mutation eliminarData_xm_cprog ($eliminarData_xm_cprogId: ID!) {
eliminarData_xm_cprog(id: $eliminarData_xm_cprogId)
}
`;



export const OBTENER_DATA_XM_STN = gql`
  query obtenerData_xm_stn {
    obtenerData_xm_stn {
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
      periodo
      CRS_Variante_Guatape {
        agente
        crs_variable_guatape_cop
        demanda_kwh
      }
    }
  }
`;

export const ELIMINAR_DATA_XM_STN = gql`
  mutation eliminarData_xm_stn($eliminarDataId: [ID!]!) {
    eliminarData_xm_stn(ids: $eliminarDataId)
  }
`;

export const ACTUALIZAR_DATA_XM_STN = gql`
  mutation actualizarData_xm_stn($id: ID!, $input: Data_xm_stnInput) {
    actualizarData_xm_stn(id: $id, input: $input) {
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

export const NUEVO_DATA_XM_STN = gql`
  mutation nuevoData_xm_stn($input: [Data_xm_stnInput]) {
    nuevoData_xm_stn(input: $input) {
      datos {
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
        CRS_Variante_Guatape {
          agente
          crs_variable_guatape_cop
          demanda_kwh
        }
      }
      errores {
        mensaje
        tipo
        registrosErrores {
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
    }
  }
`;


export const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!, $folder: String) {
    singleUpload(file: $file, folder: $folder) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export const ELIMINAR_DATA_XM_STR = gql`
  mutation eliminarData_xm_str($eliminarDataId: [ID!]!) {
    eliminarData_xm_str(ids: $eliminarDataId)
  }
`;

export const NUEVO_DATA_XM_STR = gql`
  mutation nuevoData_xm_str($input: [Data_xm_strInput]) {
    nuevoData_xm_str(input: $input) {
      datos {
        id
        creador
        empresa_id
        anho
        mes
        total_ingreso_mensual_bruto_str_cop_norte
        energia_del_str_kwh_norte
        cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte
        cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte
        cargo_por_uso_dt4_cop_kwh_norte
        factor_para_referir_las_medidas_de_energia_del_nt_4_norte
        valor_diferencial_despues_de_compensacion_cop_kwh_norte
        total_ingreso_mensual_bruto_str_cop_sur
        energia_del_str_kwh_sur
        cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur
        cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur
        cargo_por_uso_dt4_cop_kwh_sur
        factor_para_referir_las_medidas_de_energia_del_nt_4_sur
        valor_diferencial_despues_de_compensacion_cop_kwh_sur
      }
      errores {
        mensaje
        tipo
        registrosErrores {
          id
          creador
          empresa_id
          anho
          mes
          total_ingreso_mensual_bruto_str_cop_norte
          energia_del_str_kwh_norte
          cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte
          cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte
          cargo_por_uso_dt4_cop_kwh_norte
          factor_para_referir_las_medidas_de_energia_del_nt_4_norte
          valor_diferencial_despues_de_compensacion_cop_kwh_norte
          total_ingreso_mensual_bruto_str_cop_sur
          energia_del_str_kwh_sur
          cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur
          cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur
          cargo_por_uso_dt4_cop_kwh_sur
          factor_para_referir_las_medidas_de_energia_del_nt_4_sur
          valor_diferencial_despues_de_compensacion_cop_kwh_sur
        }
      }
    }
  }
`;





export const NUEVO_DATA_XM_CPROG = gql`
  mutation nuevoData_xm_cprog($input: [Data_xm_cprogInput]) {
    nuevoData_xm_cprog(input: $input) {
      datos {
      id
      creador
      empresa_id
      anho
      mes
      agente
      cargo_cprog_cop_kwh
    }
    errores {
      mensaje
      tipo
      registrosErrores {
        anho
        mes
        agente
        cargo_cprog_cop_kwh
      }
    }
    }
  }
`;