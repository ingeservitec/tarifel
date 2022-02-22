import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import Swal from 'sweetalert2'
import XLSX from "xlsx";

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

const OBTENER_DATA_EMPRESA_ANUAL= gql`
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


const Res_componentes_cu_tarifa= () => {
const { data, error, loading} = useQuery(OBTENER_RES_COMPONENTES_CU_TARIFA);
const { data:data2, error:error2, loading:loading2} = useQuery(OBTENER_DATA_XM_DSPCTTO);
const { data:data3, error:error3, loading:loading3} = useQuery(OBTENER_USUARIO);
const { data:data4, error:error4, loading:loading4} = useQuery(OBTENER_DATA_XM_AFAC);
const { data:data5, error:error5, loading:loading5} = useQuery(OBTENER_DATA_EMPRESAS);
const { data:data6, error:error6, loading:loading6} = useQuery(OBTENER_DATA_CREG_CX);
const { data:data7, error:error7, loading:loading7} = useQuery(OBTENER_DATA_EMPRESA_ANUAL);
const [loader, showLoader, hideLoader] = useFullPageLoader();
const [comments, setComments] = useState([]);
const [totalItems, setTotalItems] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [search, setSearch] = useState("");
const [sorting, setSorting] = useState({ field: "", order: "" });
const [showLogin, setShowLogin] = useState(false);
const [showLogin2, setShowLogin2] = useState(false);

const ITEMS_PER_PAGE = 3;
const headers = [
{ name: "Id", field: "id", sortable: false },,
{ name: "Exportar Memorias", field: "exportar", sortable: true},
{ name: "Exportar SSPD", field: "exportar", sortable: true},
{ name: "creador", field: "creador", sortable: true},{ name: "Anho", field: "anho", sortable: true},
{ name: "Mes", field: "mes", sortable: true},{ name: "Qc", field: "qc", sortable: true},{ name: "Pc", field: "pc", sortable: true},
{ name: "Ref_G", field: "ref_g", sortable: true},{ name: "Max_G", field: "max_g", sortable: true},{ name: "Cr", field: "cr", sortable: true},
{ name: "Ad", field: "ad", sortable: true},{ name: "Aj", field: "aj", sortable: true},{ name: "Pb", field: "pb", sortable: true},
{ name: "Gc", field: "gc", sortable: true},{ name: "Tx", field: "tx", sortable: true},{ name: "Dtun_Nt1_E", field: "dtun_nt1_e", sortable: true},
{ name: "Dtun_Nt1_C", field: "dtun_nt1_c", sortable: true},{ name: "Dtun_Nt1_P", field: "dtun_nt1_p", sortable: true},{ name: "Dtun_Nt2", field: "dtun_nt2", sortable: true},
{ name: "Dtun_Nt3", field: "dtun_nt3", sortable: true},{ name: "Cdi_100", field: "cdi_100", sortable: true},
{ name: "Cdi_50", field: "cdi_50", sortable: true},
{ name: "Cdm", field: "cdm", sortable: true},{ name: "Cd4", field: "cd4", sortable: true},{ name: "Cd3", field: "cd3", sortable: true},
{ name: "Cd2", field: "cd2", sortable: true},{ name: "Dnt1", field: "dnt1", sortable: true},{ name: "Dnt2", field: "dnt2", sortable: true},
{ name: "Dnt3", field: "dnt3", sortable: true},{ name: "Dnt4", field: "dnt4", sortable: true},{ name: "Crs", field: "crs", sortable: true},
{ name: "Rcal", field: "rcal", sortable: true},{ name: "R", field: "r", sortable: true},{ name: "Iprstn", field: "iprstn", sortable: true},
{ name: "Pr_Nt1", field: "pr_nt1", sortable: true},{ name: "Pr_Nt2", field: "pr_nt2", sortable: true},{ name: "Pr_Nt3", field: "pr_nt3", sortable: true},
{ name: "Pr_Nt4", field: "pr_nt4", sortable: true},{ name: "Cer", field: "cer", sortable: true},{ name: "Cfm", field: "cfm", sortable: true},
{ name: "Rc", field: "rc", sortable: true},{ name: "Ul_Trim_Val_Mme", field: "ul_trim_val_mme", sortable: true},
{ name: "Anho_Ul_Trim_Val_Mme", field: "anho_ul_trim_val_mme", sortable: true},{ name: "Sub1", field: "sub1", sortable: true},
{ name: "Sub2", field: "sub2", sortable: true},{ name: "N_Sub1", field: "n_sub1", sortable: true},{ name: "M_Sub2", field: "m_sub2", sortable: true},
{ name: "Facturacion_T", field: "facturacion_t", sortable: true},{ name: "R1", field: "r1", sortable: true},{ name: "R2", field: "r2", sortable: true},
{ name: "Sup_Def", field: "sup_def", sortable: true},{ name: "Cfs", field: "cfs", sortable: true},{ name: "Cfe", field: "cfe", sortable: true},
{ name: "C_Ast", field: "c_ast", sortable: true},{ name: "CG", field: "cg", sortable: true},{ name: "CGCU", field: "cgcu", sortable: true},
{ name: "Cvr", field: "cvr", sortable: true},{ name: "Cv", field: "cv", sortable: true},
{ name: "Cu_Nt1_100", field: "cu_nt1_100", sortable: true},{ name: "Cu_Nt1_50", field: "cu_nt1_50", sortable: true},
{ name: "Cu_Nt1_0", field: "cu_nt1_0", sortable: true},{ name: "Cu_Nt2", field: "cu_nt2", sortable: true},
{ name: "Cu_Nt3", field: "cu_nt3", sortable: true},{ name: "Cu_Nt4", field: "cu_nt4", sortable: true},
{ name: "Cu_Nt1_100_ot", field: "cu_nt1_100_ot", sortable: true},{ name: "Cu_Nt1_50_ot", field: "cu_nt1_50_ot", sortable: true},
{ name: "Cu_Nt1_0_ot", field: "cu_nt1_0_ot", sortable: true},{ name: "Cu_Nt2_ot", field: "cu_nt2_ot", sortable: true},
{ name: "Cu_Nt3_ot", field: "cu_nt3_ot", sortable: true},
{ name: "Saldo_Nt1_100_ot", field: "saldo_nt1_100_ot", sortable: true},{ name: "Saldo_Nt1_50_ot", field: "saldo_nt1_50_ot", sortable: true},
{ name: "Saldo_Nt1_0_ot", field: "saldo_nt1_0_ot", sortable: true},{ name: "Saldo_Nt2_ot", field: "saldo_nt2_ot", sortable: true},
{ name: "Saldo_Nt3_ot", field: "saldo_nt3_ot", sortable: true},
{ name: "PV", field: "pv", sortable: true},
{ name: "Nt1_100_Estrato_1_Men_Cs", field: "nt1_100_estrato_1_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_2_Men_Cs", field: "nt1_100_estrato_2_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_3_Men_Cs", field: "nt1_100_estrato_3_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_4_Men_Cs", field: "nt1_100_estrato_4_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_5_Men_Cs", field: "nt1_100_estrato_5_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_6_Men_Cs", field: "nt1_100_estrato_6_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_4", field: "nt1_100_estrato_4", sortable: true},{ name: "Nt1_100_Estrato_5", field: "nt1_100_estrato_5", sortable: true},
{ name: "Nt1_100_Estrato_6", field: "nt1_100_estrato_6", sortable: true},{ name: "Nt1_100_C", field: "nt1_100_c", sortable: true},
{ name: "Nt1_100_I_Con_C", field: "nt1_100_i_con_c", sortable: true},{ name: "Nt1_100_I_Sin_C", field: "nt1_100_i_sin_c", sortable: true},
{ name: "Nt1_100_P", field: "nt1_100_p", sortable: true},{ name: "Nt1_100_O", field: "nt1_100_o", sortable: true},
{ name: "Nt1_50_Estrato_1_Men_Cs", field: "nt1_50_estrato_1_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_2_Men_Cs", field: "nt1_50_estrato_2_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_3_Men_Cs", field: "nt1_50_estrato_3_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_4_Men_Cs", field: "nt1_50_estrato_4_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_5_Men_Cs", field: "nt1_50_estrato_5_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_6_Men_Cs", field: "nt1_50_estrato_6_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_4", field: "nt1_50_estrato_4", sortable: true},
{ name: "Nt1_50_Estrato_5", field: "nt1_50_estrato_5", sortable: true},
{ name: "Nt1_50_Estrato_6", field: "nt1_50_estrato_6", sortable: true},
{ name: "Nt1_50_C", field: "nt1_50_c", sortable: true},{ name: "Nt1_50_I_Con_C", field: "nt1_50_i_con_c", sortable: true},
{ name: "Nt1_50_I_Sin_C", field: "nt1_50_i_sin_c", sortable: true},{ name: "Nt1_50_P", field: "nt1_50_p", sortable: true},
{ name: "Nt1_50_O", field: "nt1_50_o", sortable: true},{ name: "Nt1_0_Estrato_1_Men_Cs", field: "nt1_0_estrato_1_men_cs", sortable: true},
{ name: "Nt1_0_Estrato_2_Men_Cs", field: "nt1_0_estrato_2_men_cs", sortable: true},{ name: "Nt1_0_Estrato_3_Men_Cs", field: "nt1_0_estrato_3_men_cs", sortable: true},
{ name: "Nt1_0_Estrato_4_Men_Cs", field: "nt1_0_estrato_4_men_cs", sortable: true},{ name: "Nt1_0_Estrato_5_Men_Cs", field: "nt1_0_estrato_5_men_cs", sortable: true},
{ name: "Nt1_0_Estrato_6_Men_Cs", field: "nt1_0_estrato_6_men_cs", sortable: true},{ name: "Nt1_0_Estrato_4", field: "nt1_0_estrato_4", sortable: true},
{ name: "Nt1_0_Estrato_5", field: "nt1_0_estrato_5", sortable: true},{ name: "Nt1_0_Estrato_6", field: "nt1_0_estrato_6", sortable: true},
{ name: "Nt1_0_C", field: "nt1_0_c", sortable: true},{ name: "Nt1_0_I_Con_C", field: "nt1_0_i_con_c", sortable: true},
{ name: "Nt1_0_I_Sin_C", field: "nt1_0_i_sin_c", sortable: true},{ name: "Nt1_0_P", field: "nt1_0_p", sortable: true},
{ name: "Nt1_0_O", field: "nt1_0_o", sortable: true},{ name: "Nt2_C", field: "nt2_c", sortable: true},{ name: "Nt2_I_Con_C", field: "nt2_i_con_c", sortable: true},
{ name: "Nt2_I_Sin_C", field: "nt2_i_sin_c", sortable: true},{ name: "Nt2_O", field: "nt2_o", sortable: true},{ name: "Nt2_Ap", field: "nt2_ap", sortable: true},
{ name: "Nt2_Bsnmen_Cs", field: "nt2_bsnmen_cs", sortable: true},{ name: "Nt2_Bsnmay_Cs", field: "nt2_bsnmay_cs", sortable: true},
{ name: "Nt3_C", field: "nt3_c", sortable: true},{ name: "Nt3_I_Con_C", field: "nt3_i_con_c", sortable: true},{ name: "Nt3_I_Sin_C", field: "nt3_i_sin_c", sortable: true},
{ name: "Nt2_estrato_1_men_cs", field: "nt2_estrato_1_men_cs", sortable: true},
{ name: "Nt3_estrato_1_men_cs", field: "nt3_estrato_1_men_cs", sortable: true},
{ name: "Nt4_estrato_1_men_cs", field: "nt4_estrato_1_men_cs", sortable: true},
{ name: "Nt2_estrato_2_men_cs", field: "nt2_estrato_2_men_cs", sortable: true},
{ name: "Nt3_estrato_2_men_cs", field: "nt3_estrato_2_men_cs", sortable: true},
{ name: "Nt4_estrato_2_men_cs", field: "nt4_estrato_2_men_cs", sortable: true},
{ name: "giro_sobrante", field: "giro_sobrante", sortable: true},{ name: "ultimo_giro_incluido", field: "ultimo_giro_incluido", sortable: true},
{ name: "saldo_nt1_100_ot", field: "saldo_nt1_100_ot", sortable: true},{ name: "saldo_nt1_50_ot", field: "saldo_nt1_50_ot", sortable: true},
{ name: "saldo_nt1_0_ot", field: "saldo_nt1_0_ot", sortable: true},{ name: "saldo_nt2_ot", field: "saldo_nt2_ot", sortable: true},
{ name: "saldo_nt3_ot", field: "saldo_nt3_ot", sortable: true},{ name: "pv", field: "pv", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true}
];
useEffect(() => {
if(loading) return 'Cargando....';
setComments(data.obtenerRes_componentes_cu_tarifa);
});
const commentsData = useMemo(() => {
let computedComments = comments;
if (search) {
computedComments = computedComments.filter(
comment=>
// comment.anho.toLowerCase().includes(search.toLowerCase()) ||
// comment.mes.toLowerCase().includes(search.toLowerCase())
(comment.anho).toString()+'-'+(comment.mes).toString()===search ||
(comment.anho).toString()===search ||
(comment.mes).toString()===search
);
}
setTotalItems(computedComments.length);
//Sorting comments
if (sorting.field) {
const reversed = sorting.order === "asc" ? 1 : -1;
// console.log(computedComments)
computedComments = computedComments.sort(
(a, b) =>
// reversed * a[sorting.field].localeCompare(b[sorting.field])
parseInt(reversed * a[sorting.field])-parseInt(b[sorting.field])
);
}
//Current Page slice




return computedComments.slice(
(currentPage - 1) * ITEMS_PER_PAGE,
(currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
);
}, [comments, currentPage, search, sorting])

function roundToTwo(num) {    
    return num.toFixed(2);
}

function roundToFive(num) {    
    return +(Math.round(num + "e+5")  + "e-5");
}


const exportarMemorias=(id)=>{

    Swal.fire({
        title: '¿Deseas exportar memorias de cálculo?',
        // text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Exportar',
        cancelButtonText: 'No, Cancelar'
      }).then( async (result) => {
        if (result.value) {
            try {
                const data_Res_componentes_cu_tarifa=data.obtenerRes_componentes_cu_tarifa
                const data_Res_componentes_cu_tarifam=data_Res_componentes_cu_tarifa.filter(data_Res_componentes_cu_tarifa => data_Res_componentes_cu_tarifa.id===id) 
                downloadExcel("Memorias "+data_Res_componentes_cu_tarifam[0].anho + '-' +data_Res_componentes_cu_tarifam[0].mes,"Memorias "+data_Res_componentes_cu_tarifam[0].anho + '-' +data_Res_componentes_cu_tarifam[0].mes+".xlsx",data_Res_componentes_cu_tarifam)
                Swal.fire(
                    'Exportado',
                    data_Res_componentes_cu_tarifam.anho + '-' +data_Res_componentes_cu_tarifam.mes ,
                    'success'
                   
                );
               
                
            } catch (error) {
                console.log(error)
            }
            
        }
      })
}


const exportarFormatosSSPD=(id)=>{

    Swal.fire({
        title: '¿Deseas exportar memorias de cálculo?',
        // text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Exportar',
        cancelButtonText: 'No, Cancelar'
      }).then( async (result) => {
        if (result.value) {
            try {
                
                const data_Res_componentes_cu_tarifa=data.obtenerRes_componentes_cu_tarifa
                const data_Res_componentes_cu_tarifam=data_Res_componentes_cu_tarifa.filter(data_Res_componentes_cu_tarifa => data_Res_componentes_cu_tarifa.id===id) 
                console.log(data_Res_componentes_cu_tarifam)

                var mesm,anhom,mesm2,anhom2

                if (data_Res_componentes_cu_tarifam[0].mes===1){
                        mesm=12
                        anhom=data_Res_componentes_cu_tarifam[0].anho-1  
                        mesm2=11
                        anhom2=data_Res_componentes_cu_tarifam[0].anho-1 
                }
                else{
                        if(data_Res_componentes_cu_tarifam[0].mes===2){
                        mesm=data_Res_componentes_cu_tarifam[0].mes-1
                        anhom=data_Res_componentes_cu_tarifam[0].anho  
                        mesm2=12
                        anhom2=data_Res_componentes_cu_tarifam[0].anho-1            
                        }
                        mesm=data_Res_componentes_cu_tarifam[0].mes-1
                        anhom=data_Res_componentes_cu_tarifam[0].anho   
                        mesm2=data_Res_componentes_cu_tarifam[0].mes-2
                        anhom2=data_Res_componentes_cu_tarifam[0].anho   
                }
     
const data_empresa=data5.obtenerData_empresa
const data_empresam=data_empresa.filter(data_empresa => data_empresa.anho===anhom && data_empresa.mes===mesm)
                
var mercado
console.log(data_empresam)
if(data_empresam[0].mercado==="GUAVIARE"){
mercado=681
}



                if (data_Res_componentes_cu_tarifam[0].cg>0 ||data_Res_componentes_cu_tarifam[0].cgcu>0) {
                    var recuperacionGarantias="Si"
                    var observaciónRecuperacionGarantias=""
                }
                 else {
                                   var recuperacionGarantias="No"
                    var observaciónRecuperacionGarantias="La empresa cubre los cargos por uso del MEM y STR a través de prepago con cuenta custodia"
                  }
                  
               
                const formulario_1_sspd=
                [{"¿Recuperará la empresa a través del componente de comercialización el costo de las garantías financieras constituidas?":
                recuperacionGarantias,
                "Observación":observaciónRecuperacionGarantias}]
                const formato_2_sspd=
                [{"Tipo de Garantía":1,
                "NIT Beneficiario":2,
                "DV Beneficiario":1,
                "Emisor":2,
                "Número Garantía":1,
                "Mes Cobertura":2,
                "Fecha Inicio Vigencia":1,
                "Fecha Finalización Vigencia":2,
                "Valor Total Garantía":1,
                "Costo Garantía":2,
                "Costo a Recuperar":1            
                }]

                if (data_Res_componentes_cu_tarifam[0].cg>0 ||data_Res_componentes_cu_tarifam[0].cgcu>0) {
                    var recuperacionGarantias="Si"
                    var observaciónRecuperacionGarantias=""
                }
                 else {
                   
                    var recuperacionGarantias="No"
                    var observaciónRecuperacionGarantias="La empresa cubre los cargos por uso del MEM y STR a través de prepago con cuenta custodia"
                  }

                  if (data_Res_componentes_cu_tarifam[0].cu_nt1_0_ot>0) {
                    var opcionTarifaria=1
                }
                 else {
                    var opcionTarifaria=2
                  }

                  
                  var formato_3_sspd=[], Tarifa_100, Tarifa_50,Tarifa_0,Tarifa_NT2,Tarifa_NT3,Tarifa_NT4
         
                  for (let index = 0; index < 11; index++) {
               
                    if (index===0) {
                        Tarifa_100=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_1_men_cs
                        Tarifa_50=data_Res_componentes_cu_tarifam[0].nt1_50_estrato_1_men_cs  
                        Tarifa_0=data_Res_componentes_cu_tarifam[0].nt1_0_estrato_1_men_cs  
                        Tarifa_NT2= data_Res_componentes_cu_tarifam[0].nt2_estrato_1_men_cs
                        Tarifa_NT3= data_Res_componentes_cu_tarifam[0].nt3_estrato_1_men_cs
                        Tarifa_NT4= data_Res_componentes_cu_tarifam[0].nt4_estrato_1_men_cs
                        } 
                    if (index===2) {
                        Tarifa_100=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_2_men_cs
                        Tarifa_50=data_Res_componentes_cu_tarifam[0].nt1_50_estrato_2_men_cs  
                        Tarifa_0=data_Res_componentes_cu_tarifam[0].nt1_0_estrato_2_men_cs  
                        Tarifa_NT2=data_Res_componentes_cu_tarifam[0].nt2_estrato_2_men_cs
                        Tarifa_NT3= data_Res_componentes_cu_tarifam[0].nt3_estrato_2_men_cs
                        Tarifa_NT4= data_Res_componentes_cu_tarifam[0].nt4_estrato_2_men_cs
                        } 
                    if (index===3) {
                        Tarifa_100=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_3_men_cs
                        Tarifa_50=data_Res_componentes_cu_tarifam[0].nt1_50_estrato_3_men_cs  
                        Tarifa_0=data_Res_componentes_cu_tarifam[0].nt1_0_estrato_3_men_cs  
                        Tarifa_NT2= data_Res_componentes_cu_tarifam[0].nt2_o*(0.85)
                        Tarifa_NT3= data_Res_componentes_cu_tarifam[0].nt3_o*(0.85)
                        Tarifa_NT4= 1
                        } 
                        if (index===4 || index===7 || index===9) {
                            Tarifa_100=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_4
                            Tarifa_50=data_Res_componentes_cu_tarifam[0].nt1_50_estrato_4  
                            Tarifa_0=data_Res_componentes_cu_tarifam[0].nt1_0_estrato_4  
                            Tarifa_NT2= data_Res_componentes_cu_tarifam[0].nt2_o
                            Tarifa_NT3= data_Res_componentes_cu_tarifam[0].nt3_o
                            Tarifa_NT4= 1

                            } 
                        if (index===5 || index===6 || index===8 || index===10) {
                            Tarifa_100=data_Res_componentes_cu_tarifam[0].nt1_100_estrato_5
                            Tarifa_50=data_Res_componentes_cu_tarifam[0].nt1_50_estrato_5
                            Tarifa_0=data_Res_componentes_cu_tarifam[0].nt1_0_estrato_5  
                            Tarifa_NT2= data_Res_componentes_cu_tarifam[0].nt2_c
                            Tarifa_NT3= data_Res_componentes_cu_tarifam[0].nt3_c
                            Tarifa_NT4= 1
                            } 

                            if (index<3) {
                                formato_3_sspd.push({"ID Mercado":mercado,
                                "Cargo Horario":4,
                                "Inicio franja horaria":"0:00",
                                "Fin franja horaria":"23:59",
                                "Estrato o Sector":index+1,
                                "% Subsidiado 100% OR":roundToTwo((1-(Tarifa_100/data_Res_componentes_cu_tarifam[0].cu_nt1_100))*100),
                                "% Subsidiado 50% OR":roundToTwo((1-(Tarifa_50/data_Res_componentes_cu_tarifam[0].cu_nt1_100))*100),
                                "% Subsidiado 0% OR":roundToTwo((1-(Tarifa_0/data_Res_componentes_cu_tarifam[0].cu_nt1_100))*100),
                                "Tarifa Nivel 1 100% OR":roundToFive(Tarifa_100),
                                "Tarifa Nivel 1 50% OR":roundToFive(Tarifa_50),
                                "Tarifa Nivel 1 0% OR":roundToFive(Tarifa_0),
                                "Tarifa Nivel 2":roundToFive(Tarifa_NT2),
                                "Tarifa Nivel 3":roundToFive(Tarifa_NT3),
                                "Tarifa Nivel 4":roundToFive(Tarifa_NT4),
                                "cfm":data_Res_componentes_cu_tarifam[0].cfm.toFixed(4),   
                                "Fecha Publicación":"",
                                "Diario Publicación":"",
                                "Tarifa OT":opcionTarifaria                              
                                })
                            }
                            if (index>2) {
                                formato_3_sspd.push({"ID Mercado":mercado,
                                "Cargo Horario":4,
                                "Inicio franja horaria":"0:00",
                                "Fin franja horaria":"23:59",
                                "Estrato o Sector":index+1,
                                "% Subsidiado 100% OR":roundToTwo(0),
                                "% Subsidiado 50% OR":roundToTwo(0),
                                "% Subsidiado 0% OR":roundToTwo(0),
                                "Tarifa Nivel 1 100% OR":roundToFive(Tarifa_100),
                                "Tarifa Nivel 1 50% OR":roundToFive(Tarifa_50),
                                "Tarifa Nivel 1 0% OR":roundToFive(Tarifa_0),
                                "Tarifa Nivel 2":roundToFive(Tarifa_NT2),
                                "Tarifa Nivel 3":roundToFive(Tarifa_NT3),
                                "Tarifa Nivel 4":roundToFive(Tarifa_NT4),
                                "cfm":data_Res_componentes_cu_tarifam[0].cfm.toFixed(4),   
                                "Fecha Publicación":"",
                                "Diario Publicación":"",
                                "Tarifa OT":opcionTarifaria                               
                                })
                            }
                 
                    }

                const formato_4_sspd=
                [{"ID Mercado":'',
                "Año corregido":'',
                "Mes corregido":'',
                "Cargo Horario":'',
                "Inicio franja horaria":'',
                "Fin franja horaria":'',
                "Estrato o Sector":'',
                "% Subsidiado 100% OR":'',
                "% Subsidiado 50% OR":'',
                "% Subsidiado 0% OR":'',
                "Tarifa Nivel 1 100% OR":'',
                "Tarifa Nivel 1 50% OR":'',
                "Tarifa Nivel 1 0% OR":'',
                "Tarifa Nivel 2":'',
                "Tarifa Nivel 3":'',
                "Tarifa Nivel 4":'',
                "cfm":'',   
                "Fecha Publicación":'',
                "Diario Publicación":'',
                "Tarifa OT":''                              
                }]

                const formulario_5_sspd=
                [{"¿Aplicó la empresa para este mes la opción tarifaria?:":opcionTarifaria,                           
                }]

if (opcionTarifaria===1){
var nt_prop, sam, cuvc, cuv, formato_6_sspd=[],formato_7_sspd=[],Prnm,Dnm,CUvm

for (let index = 0; index < 5; index++) {
    if (index===0) {
        nt_prop="1-100"
        sam=data_Res_componentes_cu_tarifam[0].saldo_nt1_100_ot
        cuvc=data_Res_componentes_cu_tarifam[0].cu_nt1_100
        cuv=data_Res_componentes_cu_tarifam[0].cu_nt1_100_ot
        } 
        if (index===1) {
            nt_prop="1-50"
            sam=data_Res_componentes_cu_tarifam[0].saldo_nt1_50_ot
            cuvc=data_Res_componentes_cu_tarifam[0].cu_nt1_50
            cuv=data_Res_componentes_cu_tarifam[0].cu_nt1_50_ot
            } 
            if (index===2) {
                nt_prop="1-0"
                sam=data_Res_componentes_cu_tarifam[0].saldo_nt1_0_ot
                cuvc=data_Res_componentes_cu_tarifam[0].cu_nt1_0
                cuv=data_Res_componentes_cu_tarifam[0].cu_nt1_0_ot
                } 
                if (index===3) {
                    nt_prop="2"
                    sam=data_Res_componentes_cu_tarifam[0].saldo_nt2_ot
                    cuvc=data_Res_componentes_cu_tarifam[0].cu_nt2
                    cuv=data_Res_componentes_cu_tarifam[0].cu_nt2_ot
                    } 
                    if (index===4) {
                        nt_prop="3"
                        sam=data_Res_componentes_cu_tarifam[0].saldo_nt3_ot
                        cuvc=data_Res_componentes_cu_tarifam[0].cu_nt3
                        cuv=data_Res_componentes_cu_tarifam[0].cu_nt3_ot
                        } 
                formato_6_sspd.push(
                {"ID Mercado":mercado,
                "NT y PROP":nt_prop,
                "PV":data_Res_componentes_cu_tarifam[0].pv,
                "SAm-1":2,
                "VRt-1":1,
                "CUVC":roundToFive(cuvc),
                "CUVm-1":1,
                "CUv":roundToFive(cuv),
                "VRm-1":1,
                "rEM":2,
                "SAm":sam.toFixed(0)                           
                })
            }
            formato_7_sspd.push(
                {"ID Mercado":"SE APLICO OPCIÓN TARIFARIA",
                "NT y PROP":"",
                "Gm":"",
                "Tm":"",
                "Prnm":"",
                "Dnm":"",
                "Cvm":"",
                "Rm":"",
                "CUvm":"",
                "Cargo Horario":""                       
                })
        }
else{
    formato_6_sspd.push(
        {"ID Mercado":"NO SE APLICO OPCIÓN TARIFARIA",
        "NT y PROP":"",
        "PV":"",
        "SAm-1":"",
        "VRt-1":"",
        "CUVC":"",
        "CUVm-1":"",
        "CUv":"",
        "VRm-1":"",
        "rEM":"",
        "SAm":""                           
        })

        for (let index = 0; index < 5; index++) {
            if (index===0) {
                nt_prop="1-100"
                Prnm=data_Res_componentes_cu_tarifam[0].pr_nt1
                Dnm=data_Res_componentes_cu_tarifam[0].dnt1
                CUvm=data_Res_componentes_cu_tarifam[0].cu_nt1_100
                } 
                if (index===1) {
                    nt_prop="1-50"
                    Prnm=data_Res_componentes_cu_tarifam[0].pr_nt1
                    Dnm=data_Res_componentes_cu_tarifam[0].dnt1 - data_Res_componentes_cu_tarifam[0].cdi_50
                    CUvm=data_Res_componentes_cu_tarifam[0].cu_nt1_50
                    } 
                    if (index===2) {
                        nt_prop="1-0"
                        Prnm=data_Res_componentes_cu_tarifam[0].pr_nt1
                        Dnm=data_Res_componentes_cu_tarifam[0].dnt1 - data_Res_componentes_cu_tarifam[0].cdi_100
                        CUvm=data_Res_componentes_cu_tarifam[0].cu_nt1_0
                        } 
                        if (index===3) {
                            nt_prop="2"
                            Prnm=data_Res_componentes_cu_tarifam[0].pr_nt2
                            Dnm=data_Res_componentes_cu_tarifam[0].dnt2
                            CUvm=data_Res_componentes_cu_tarifam[0].cu_nt2
                            } 
                            if (index===4) {
                                nt_prop="3"
                                Prnm=data_Res_componentes_cu_tarifam[0].pr_nt3
                                Dnm=data_Res_componentes_cu_tarifam[0].dnt3
                                CUvm=data_Res_componentes_cu_tarifam[0].cu_nt3
                                } 
        formato_7_sspd.push({"ID Mercado":mercado,
        "NT y PROP":nt_prop,
        "Gm":data_Res_componentes_cu_tarifam[0].gc,
        "Tm":data_Res_componentes_cu_tarifam[0].tx,
        "Prnm":Prnm,
        "Dnm":Dnm,
        "Cvm":data_Res_componentes_cu_tarifam[0].cv,
        "Rm":data_Res_componentes_cu_tarifam[0].r,
        "CUvm":CUvm,
        "Cargo Horario":4                       
        })
    }
}


                
                const formato_8_sspd=
                [{"ID Mercado":"",
                "Año corregido":"",
                "Mes corregido":"",
                "NT y Prop":"",
                "Gm":"",
                "Tm":"",
                "Prnm":"",
                "Dnm":"",
                "Cvm":"",
                "Rm":"",
                "CUvm":"",
                "Cargo Horario":""                                   
                }]


                const data_xm_dspctto=data2.obtenerData_xm_dspctto
                const data_xm_dspcttom=data_xm_dspctto.filter(data_xm_dspctto => data_xm_dspctto.anho===anhom && data_xm_dspctto.mes===mesm && data_xm_dspctto.comprador===data3.obtenerUsuario.empresa && data_xm_dspctto.tipomerc==='R')
                var Energia_contratos = 0, Costo_contratos = 0;
                  data_xm_dspcttom.forEach(function (obj) {
                    Energia_contratos += parseFloat(obj.desp_hora_1)+parseFloat(obj.desp_hora_2)+parseFloat(obj.desp_hora_3)+parseFloat(obj.desp_hora_4)+parseFloat(obj.desp_hora_5)+parseFloat(obj.desp_hora_6)+parseFloat(obj.desp_hora_7)+parseFloat(obj.desp_hora_8)+parseFloat(obj.desp_hora_9)+parseFloat(obj.desp_hora_10)+parseFloat(obj.desp_hora_11)+parseFloat(obj.desp_hora_12)+parseFloat(obj.desp_hora_13)+parseFloat(obj.desp_hora_14)+parseFloat(obj.desp_hora_15)+parseFloat(obj.desp_hora_16)+parseFloat(obj.desp_hora_17)+parseFloat(obj.desp_hora_18)+parseFloat(obj.desp_hora_19)+parseFloat(obj.desp_hora_20)+parseFloat(obj.desp_hora_21)+parseFloat(obj.desp_hora_22)+parseFloat(obj.desp_hora_23)+parseFloat(obj.desp_hora_24);
                    Costo_contratos += parseFloat(obj.desp_hora_1)*parseFloat(obj.trf_hora_1)+parseFloat(obj.desp_hora_2)*parseFloat(obj.trf_hora_2)+parseFloat(obj.desp_hora_3)*parseFloat(obj.trf_hora_3)+parseFloat(obj.desp_hora_4)*parseFloat(obj.trf_hora_4)+parseFloat(obj.desp_hora_5)*parseFloat(obj.trf_hora_5)+parseFloat(obj.desp_hora_6)*parseFloat(obj.trf_hora_6)+parseFloat(obj.desp_hora_7)*parseFloat(obj.trf_hora_7)+parseFloat(obj.desp_hora_8)*parseFloat(obj.trf_hora_8)+parseFloat(obj.desp_hora_9)*parseFloat(obj.trf_hora_9)+parseFloat(obj.desp_hora_10)*parseFloat(obj.trf_hora_10)+parseFloat(obj.desp_hora_11)*parseFloat(obj.trf_hora_11)+parseFloat(obj.desp_hora_12)*parseFloat(obj.trf_hora_12)+parseFloat(obj.desp_hora_13)*parseFloat(obj.trf_hora_13)+parseFloat(obj.desp_hora_14)*parseFloat(obj.trf_hora_14)+parseFloat(obj.desp_hora_15)*parseFloat(obj.trf_hora_15)+parseFloat(obj.desp_hora_16)*parseFloat(obj.trf_hora_16)+parseFloat(obj.desp_hora_17)*parseFloat(obj.trf_hora_17)+parseFloat(obj.desp_hora_18)*parseFloat(obj.trf_hora_18)+parseFloat(obj.desp_hora_19)*parseFloat(obj.trf_hora_19)+parseFloat(obj.desp_hora_20)*parseFloat(obj.trf_hora_20)+parseFloat(obj.desp_hora_21)*parseFloat(obj.trf_hora_21)+parseFloat(obj.desp_hora_22)*parseFloat(obj.trf_hora_22)+parseFloat(obj.desp_hora_23)*parseFloat(obj.trf_hora_23)+parseFloat(obj.desp_hora_24)*parseFloat(obj.trf_hora_24);
                });
               
                const data_xm_afac=data4.obtenerData_xm_afac
                const data_xm_afacm=data_xm_afac.filter(data_xm_afac => data_xm_afac.anho===anhom && data_xm_afac.mes===mesm && data_xm_afac.agente===data3.obtenerUsuario.empresa)
                var w=0
                if ((data_xm_afacm[0].compras_en_contratos_kwh)/((data_xm_afacm[0].demanda_real_kwh)+(data_xm_afacm[0].perdida_real_kwh))>1){
                    w=((data_xm_afacm[0].demanda_real_kwh)+(data_xm_afacm[0].perdida_real_kwh))/Energia_contratos 
                }
                

                
                const data_creg_cx=data6.obtenerData_creg_cx
                const data_creg_cxm=data_creg_cx
                
                const data_empresa_anual=data7.obtenerData_empresa_anual
                const data_empresaanualm=data_empresa_anual.filter(data_empresa_anual => data_empresa_anual.anho===data_Res_componentes_cu_tarifam[0].anho-1)



                const formato_9_sspd=
                [{"ID Mercado":mercado,
                "ECC":Energia_contratos,
                "VECC":Costo_contratos,
                "AECC":0,
                "AVECC":0,
                "AMC":0,
                "CB MR":data_xm_afacm[0].compras_energia_en_bolsa_kwh,
                "VCB MR":data_xm_afacm[0].compras_energia_en_bolsa_cop,
                "ACB MR":0,
                "AVCB MR":data_xm_afacm[0].compras_en_bolsa_ajustes_cop,
                "CB MNR":0,
                "VCB MNR":0,   
                "AGPE":0,
                "GD":0,
                "GTr":0,
                "CUG":0,
                "CLP":0,
                "ACLP":0,
                "w":w,
                "PSA":0,
                "EGP":0,
                "ADm":data_Res_componentes_cu_tarifam[0].ad,
                "VRm-1":(data_empresam[0].ventas_usuarios_r_nt1_e+
                                data_empresam[0].ventas_usuarios_r_nt1_c+
                                data_empresam[0].ventas_usuarios_r_nt1_u+
                                data_empresam[0].ventas_usuarios_r_nt2+
                                data_empresam[0].ventas_usuarios_r_nt3+
                                data_empresam[0].ventas_usuarios_nr_kwh),
                "i":0,
                "AJ":data_Res_componentes_cu_tarifam[0].aj,
                "Alfa":0.036578428408,
                "DCR AGPE":0,
                "ADMRE G":0,
                "APRRE G":0,
                "ADR IPRSTN":0,
                "APR IPRSTN":0,
                "AREST":0,
                "Cfj":data_creg_cxm[0].Cf,
                "RCT":data_creg_cxm[0].RCT,
                "RCAE":data_creg_cxm[0].RCAE, 
                "IFSSRI":0,
                "IFOES":0,
                "Balance Subsidios":1,
                "AÑO":data_Res_componentes_cu_tarifam[0].anho_ul_trim_val_mme,
                "TRIM":data_Res_componentes_cu_tarifam[0].ul_trim_val_mme,
                "MG TRIM":2,
                "Sub1":data_Res_componentes_cu_tarifam[0].sub1,
                "Sub2":data_Res_componentes_cu_tarifam[0].sub2,
                "N":data_Res_componentes_cu_tarifam[0].n_sub1,    
                "M":data_Res_componentes_cu_tarifam[0].m_sub2,  
                "r1":data_Res_componentes_cu_tarifam[0].r1,  
                "r2":data_Res_componentes_cu_tarifam[0].r2,  
                "Facturación":data_Res_componentes_cu_tarifam[0].facturacion_t,  
                "Actividad":"CI",        
                "%CREG":data_empresaanualm[0].porc_contribucion_creg,    
                "%SSPD":data_empresaanualm[0].porc_contribucion_sspd,  
                "CREG ($)":data_empresaanualm[0].contribuciones_creg*data_empresaanualm[0].porc_contribucion_creg,  
                "SSPD ($)":data_empresaanualm[0].contribuciones_sspd*data_empresaanualm[0].porc_contribucion_sspd,  
                "PUI":0          
                }]
                var ws1 = XLSX.utils.json_to_sheet(formulario_1_sspd);
                var ws2 = XLSX.utils.json_to_sheet(formato_2_sspd);
                var ws3 = XLSX.utils.json_to_sheet(formato_3_sspd);
                var ws4 = XLSX.utils.json_to_sheet(formato_4_sspd);
                var ws5 = XLSX.utils.json_to_sheet(formulario_5_sspd);
                var ws6 = XLSX.utils.json_to_sheet(formato_6_sspd);
                var ws7 = XLSX.utils.json_to_sheet(formato_7_sspd);
                var ws8 = XLSX.utils.json_to_sheet(formato_8_sspd);
                var ws9 = XLSX.utils.json_to_sheet(formato_9_sspd);

                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws1, "formulario_1_sspd");
                XLSX.utils.book_append_sheet(wb, ws2, "formato_2_sspd");
                XLSX.utils.book_append_sheet(wb, ws3, "formato_3_sspd");
                XLSX.utils.book_append_sheet(wb, ws4, "formato_4_sspd");
                XLSX.utils.book_append_sheet(wb, ws5, "formulario_5_sspd");
                XLSX.utils.book_append_sheet(wb, ws6, "formato_6_sspd");
                XLSX.utils.book_append_sheet(wb, ws7, "formato_7_sspd");
                XLSX.utils.book_append_sheet(wb, ws8, "formato_8_sspd");
                XLSX.utils.book_append_sheet(wb, ws9, "formato_9_sspd");

                XLSX.writeFile(wb, "Formatos_SSPD_"+ data_Res_componentes_cu_tarifam[0].anho + '_' +data_Res_componentes_cu_tarifam[0].mes+".xlsx");

      
                Swal.fire(
                    'Exportado',
                    'Periodo: '+ data_Res_componentes_cu_tarifam[0].anho + '-' +data_Res_componentes_cu_tarifam[0].mes ,
                    'success'
                   
                );
               
                
            } catch (error) {
                console.log(error)
            }
            
        }
      })
}

const downloadExcel = (name_hoja,name_file,data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, name_hoja);
    XLSX.writeFile(workbook, name_file);
  };

return (

<div className="container p-0">
<div className="card col-sm ">
<div className="card-header h6">
<dt>Historico CU y Tarifas Calculadas</dt>
</div>
<div className="card-body shadow ">
<div className="card-body shadow">
<div className="overflow-x-scroll">
<div className="row w-100">
<div className="col mb-3 col-12 text-center">
<div className="row"></div>
<div className="col-md-6">
<Paginacion
total={totalItems}
itemsPerPage={ITEMS_PER_PAGE}
currentPage={currentPage}
onPageChange={page => setCurrentPage(page)}
/>
<div className="col-md-6 d-flex flex-row m-2">
<Search onSearch={value => {
setSearch(value);
setCurrentPage(1);
}}/>
</div>
</div>
<table className="table table-striped table-hover" >
<TableHeader
headers ={headers}
onSorting={(field, order) =>
setSorting({ field, order })
}/>
<tbody>
{commentsData.map(comment => (
<tr key={comment.id}>
<th scope="row" >
{comment.id}
</th>
<td ><button 
className="bg-gray-400 w-20  text-white uppercase hover:cursor-pointer hover:bg-green-900 rounded"
onClick={()=>exportarMemorias(comment.id)}
>XLS</button></td>
<td ><button 
className="bg-gray-400 w-20  text-white uppercase hover:cursor-pointer hover:bg-green-900 rounded"
onClick={()=>exportarFormatosSSPD(comment.id)}
>XLS</button></td>
<td>{comment.creador}</td>
<td>{comment.anho}</td>
<td>{comment.mes}</td>
<td>{comment.qc}</td>
<td>{comment.pc}</td>
<td>{comment.ref_g}</td>
<td>{comment.max_g}</td>
<td>{comment.cr}</td>
<td>{comment.ad}</td>
<td>{comment.aj}</td>
<td>{comment.pb}</td>
<td>{comment.gc}</td>
<td>{comment.tx}</td>
<td>{comment.dtun_nt1_e}</td>
<td>{comment.dtun_nt1_c}</td>
<td>{comment.dtun_nt1_p}</td>
<td>{comment.dtun_nt2}</td>
<td>{comment.dtun_nt3}</td>
<td>{comment.cdi_100}</td>
<td>{comment.cdi_50}</td>
<td>{comment.cdm}</td>
<td>{comment.cd4}</td>
<td>{comment.cd3}</td>
<td>{comment.cd2}</td>
<td>{comment.dnt1}</td>
<td>{comment.dnt2}</td>
<td>{comment.dnt3}</td>
<td>{comment.dnt4}</td>
<td>{comment.crs}</td>
<td>{comment.rcal}</td>
<td>{comment.r}</td>
<td>{comment.iprstn}</td>
<td>{comment.pr_nt1}</td>
<td>{comment.pr_nt2}</td>
<td>{comment.pr_nt3}</td>
<td>{comment.pr_nt4}</td>
<td>{comment.cer}</td>
<td>{comment.cfm}</td>
<td>{comment.rc}</td>
<td>{comment.ul_trim_val_mme}</td>
<td>{comment.anho_ul_trim_val_mme}</td>
<td>{comment.sub1}</td>
<td>{comment.sub2}</td>
<td>{comment.n_sub1}</td>
<td>{comment.m_sub2}</td>
<td>{comment.facturacion_t}</td>
<td>{comment.r1}</td>
<td>{comment.r2}</td>
<td>{comment.sup_def}</td>
<td>{comment.cfs}</td>
<td>{comment.cfe}</td>
<td>{comment.c_ast}</td>
<td>{comment.cg}</td>
<td>{comment.cgcu}</td>
<td>{comment.cvr}</td>
<td>{comment.cv}</td>
<td>{comment.cu_nt1_100}</td>
<td>{comment.cu_nt1_50}</td>
<td>{comment.cu_nt1_0}</td>
<td>{comment.cu_nt2}</td>
<td>{comment.cu_nt3}</td>
<td>{comment.cu_nt4}</td>
<td>{comment.cu_nt1_100_ot}</td>
<td>{comment.cu_nt1_50_ot}</td>
<td>{comment.cu_nt1_0_ot}</td>
<td>{comment.cu_nt2_ot}</td>
<td>{comment.cu_nt3_ot}</td>
<td>{comment.pv}</td>
<td>{comment.saldo_nt1_100_ot}</td>
<td>{comment.saldo_nt1_50_ot}</td>
<td>{comment.saldo_nt1_0_ot}</td>
<td>{comment.saldo_nt2_ot}</td>
<td>{comment.saldo_nt3_ot}</td>
<td>{comment.nt1_100_estrato_1_men_cs}</td>
<td>{comment.nt1_100_estrato_2_men_cs}</td>
<td>{comment.nt1_100_estrato_3_men_cs}</td>
<td>{comment.nt1_100_estrato_4_men_cs}</td>
<td>{comment.nt1_100_estrato_5_men_cs}</td>
<td>{comment.nt1_100_estrato_6_men_cs}</td>
<td>{comment.nt1_100_estrato_4}</td>
<td>{comment.nt1_100_estrato_5}</td>
<td>{comment.nt1_100_estrato_6}</td>
<td>{comment.nt1_100_c}</td>
<td>{comment.nt1_100_i_con_c}</td>
<td>{comment.nt1_100_i_sin_c}</td>
<td>{comment.nt1_100_p}</td>
<td>{comment.nt1_100_o}</td>
<td>{comment.nt1_50_estrato_1_men_cs}</td>
<td>{comment.nt1_50_estrato_2_men_cs}</td>
<td>{comment.nt1_50_estrato_3_men_cs}</td>
<td>{comment.nt1_50_estrato_4_men_cs}</td>
<td>{comment.nt1_50_estrato_5_men_cs}</td>
<td>{comment.nt1_50_estrato_6_men_cs}</td>
<td>{comment.nt1_50_estrato_4}</td>
<td>{comment.nt1_50_estrato_5}</td>
<td>{comment.nt1_50_estrato_6}</td>
<td>{comment.nt1_50_c}</td>
<td>{comment.nt1_50_i_con_c}</td>
<td>{comment.nt1_50_i_sin_c}</td>
<td>{comment.nt1_50_p}</td>
<td>{comment.nt1_50_o}</td>
<td>{comment.nt1_0_estrato_1_men_cs}</td>
<td>{comment.nt1_0_estrato_2_men_cs}</td>
<td>{comment.nt1_0_estrato_3_men_cs}</td>
<td>{comment.nt1_0_estrato_4_men_cs}</td>
<td>{comment.nt1_0_estrato_5_men_cs}</td>
<td>{comment.nt1_0_estrato_6_men_cs}</td>
<td>{comment.nt1_0_estrato_4}</td>
<td>{comment.nt1_0_estrato_5}</td>
<td>{comment.nt1_0_estrato_6}</td>
<td>{comment.nt1_0_c}</td>
<td>{comment.nt1_0_i_con_c}</td>
<td>{comment.nt1_0_i_sin_c}</td>
<td>{comment.nt1_0_p}</td>
<td>{comment.nt1_0_o}</td>
<td>{comment.nt2_c}</td>
<td>{comment.nt2_i_con_c}</td>
<td>{comment.nt2_i_sin_c}</td>
<td>{comment.nt2_o}</td>
<td>{comment.nt2_ap}</td>
<td>{comment.nt2_bsnmen_cs}</td>
<td>{comment.nt2_bsnmay_cs}</td>
<td>{comment.nt3_c}</td>
<td>{comment.nt3_i_con_c}</td>
<td>{comment.nt3_i_sin_c}</td>
<td>{comment.nt3_o}</td>
<td>{comment.nt3_ap}</td>
<td>{comment.nt2_estrato_1_men_cs}</td>
<td>{comment.nt3_estrato_1_men_cs}</td>
<td>{comment.nt4_estrato_1_men_cs}</td>
<td>{comment.nt2_estrato_2_men_cs}</td>
<td>{comment.nt3_estrato_2_men_cs}</td>
<td>{comment.nt4_estrato_2_men_cs}</td>
<td>{comment.giro_sobrante}</td>
<td>{comment.ultimo_giro_incluido}</td>
<td>{comment.saldo_nt1_100_ot}</td>
<td>{comment.saldo_nt1_50_ot}</td>
<td>{comment.saldo_nt1_0_ot}</td>
<td>{comment.saldo_nt2_ot}</td>
<td>{comment.saldo_nt3_ot}</td>
<td>{comment.pv}</td>
<td>{comment.empresa_id}</td>

</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
);
}
export default Res_componentes_cu_tarifa;

