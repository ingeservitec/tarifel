//Shema
//Esto señala que empieza codigo de GraphQL
// Lo que este despues d elos dos puntos es lo qu eva a retornar

const { gql } = require("apollo-server");

const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: String
    empresa: String
    sector: String
  }

  type Token {
    token: String
  }
  type Afac {
    id: ID
    anho: Int
    mes: Int
    comprasbolsa: Float
    empresa: String
  }

  type Data_empresa {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    mercado: String
    numero_usuarios_r: Int
    numero_usuarios_nr: Int
    ventas_usuarios_r_nt1_e: Float
    ventas_usuarios_r_nt1_c: Float
    ventas_usuarios_r_nt1_u: Float
    ventas_usuarios_r_nt2: Float
    ventas_usuarios_r_nt3: Float
    ventas_usuarios_nr_kwh: Float
    pui_cop_kwh: Float
    vsne_kwh: Float
    vnu_kwh: Float
    vae_kwh: Float
    g_exc1: Float
    g_exc1_21: Float
    g_exc2: Float
    g_exc3: Float
    ggd: Float
    cot: Float
    cv_nt1: Float
    cv_nt2: Float
    cv_nt3: Float
    cv_nt4: Float
  }

  type Token {
    token: String
  }

  type Data_xm_afac {
    id: ID
    anho: Int
    mes: Int
    agente: String
    empresa_id: String
    creador: Int
    perdida_real_kwh: Float
    demanda_real_kwh: Float
    generacion_real_kwh: Float
    compras_en_bolsa_kwh: Float
    compras_en_bolsa_cop: Float
    ventas_en_bolsa_kwh: Float
    ventas_en_bolsa_cop: Float
    compras_en_desviacion_kwh: Float
    compras_en_desviacion_cop: Float
    ventas_en_desviacion_kwh: Float
    ventas_en_desviacion_cop: Float
    compras_en_reconciliacion_kwh: Float
    compras_en_reconciliacion_cop: Float
    ventas_en_reconciliacion_kwh: Float
    ventas_en_reconciliacion_cop: Float
    compras_en_contratos_kwh: Float
    ventas_en_contratos_kwh: Float
    compras_energia_en_bolsa_kwh: Float
    compras_energia_en_bolsa_cop: Float
    ventas_energia_en_bolsa_kwh: Float
    ventas_energia_en_bolsa_cop: Float
    vr_cargo_por_confiabilidad_cop: Float
    vd_cargo_por_confiabilidad_cop: Float
    neto_cxc_cop: Float
    compras_cargo_por_confiabilidad_cop: Float
    ventas_cargo_por_confiabilidad_cop: Float
    compras_en_bolsa_nacional_kwh: Float
    compras_en_bolsa_nacional_cop: Float
    ventas_en_bolsa_nacional_kwh: Float
    ventas_en_bolsa_nacional_cop: Float
    compras_en_bolsa_internacional_kwh: Float
    compras_en_bolsa_internacional_cop: Float
    ventas_en_bolsa_internacional_kwh: Float
    ventas_en_bolsa_internacional_cop: Float
    servicios_agc_cop: Float
    responsabilidad_comercial_agc_kwh: Float
    responsabilidad_comercial_agc_cop: Float
    total_compras_cop: Float
    total_ventas_cop: Float
    valor_a_pagar_por_srpf_cop: Float
    valor_a_recibir_por_srpf_cop: Float
    total_restricciones_cop: Float
    rentas_de_congestion_cop: Float
    restricciones_aliviadas_cop: Float
    vebo_kwh: Float
    rentas_de_congestion_por_importacion_cop: Float
    distribucion_saldo_neto_tie_en_merito_cop: Float
    distribucion_saldo_neto_tie_fuera_de_merito_cop: Float
    compras_bolsa_con_saldo_neto_tie_merito_cop: Float
    rendimientos_financieros_por_exportaciones_tie_cop: Float
    alivio_por_cioef_cop: Float
    compras_ndc_cop: Float
    ventas_desviaciones_oefh_cop: Float
    compras_desviaciones_oefh_cop: Float
    devolucion_dineros_del_cargo_por_confiabilidad_cop: Float
    cobro_dinero_cargo_por_confiabilidad_cop: Float
    compras_arranque_y_parada_cop: Float
    ventas_arranque_y_parada_cop: Float
    ventas_por_eeve_cop: Float
    compras_por_eeve_cop: Float
    restricciones_por_eeve_cop: Float
    cobro_uso_respaldo_cop: Float
    alivio_restricciones_res_05_2010_cop: Float
    compras_en_bolsa_ties_cop: Float
    ventas_en_bolsa_ties_cop: Float
    magnitud_en_kwh__de_compras_en_bolsa_de_ties: Float
    magnitud_en_kwh_de_ventas_en_bolsa_ties: Float
    alivio_por_ejecucion_de_garantia_cop: Float
    valor_total_ejecucion_de_garantia_cop: Float
    alivio_por_vcsrcfvd_cop: Float
    voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop: Float
    vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop: Float
    costo_de_exportacion_cop: Float
    total_costo_de_exportacion_cop: Float
    total_de_generacion_ideal_en_kwh_del_agente: Float
    total_de_holgura_de_agc_en_kwh_asignados_al_agente: Float
    energia_vendida_y_embalsada_asignada_kwh: Float
    vr_demanda_res_155_2014: Float
    alivio_asociado_a_la_resolucion_creg_024_2015_en_cop: Float
    cobro_autogeneradores_res_024_2015: Float
    valor_a_favor_para_generador_res_178_2015: Float
    valor_a_cargo_para_comercializador_res_178_2015: Float
    valor_a_cargo_para_generador_res_195_2015: Float
    valor_a_favor_para_generador_res_195_2015: Float
    valor_a_favor_para_comercializador_res_195_2015: Float
    valor_a_cargo_para_comercializador_res_195_2015: Float
    valor_a_cargo_pagos_de_energia_excedentaria_cop: Float
    valor_a_favor_por_energia_excedentaria_cop: Float
    vc_rd_resolucion_011_de_2015: Float
    vf_rd_resolucion_011_de_2015: Float
    valor_a_favor_delta_ajuste_rd: Float
    valor_a_cargo_delta_ajuste_rd: Float
    valor_a_cargo_r026_2016_cop: Float
    valor_a_favor_r026_2016_cop: Float
    valor_a_favor_r029_2016_cop: Float
    rf039_resolucion_039_de_2016: Float
    rc039_resolucion_039_de_2016: Float
    balance_final_029_de_2016: Float
    valor_a_cargo_para_comercializador_res_062_2013: Float
    valor_a_favor_para_generador_res_062_2013: Float
    valor_del_de_tie_res_049_2018_kwh: Float
    valor_del_de_tie_res_049_2018_cop: Float
    magnitud_desviacion_despacho_res_060_2019_kwh: Float
    valor_desviacion_despacho_res_060_2019_cop: Float
    magnitud_desviacion_redespacho_res_060_2019_kwh: Float
    valor_desviacion_redespacho_res_060_2019_kwh: Float
    desviacion_generacion_variable_res_060_2019_kwh: Float
    alivio_desviaciones_res_creg_060_2019_cop: Float
    valor_pago_ajuste_res_140_2017_cop: Float
    valor_cobro_ajuste_res_140_2017_cop: Float
    valor_pago_excedente_res_140_2017_cop: Float
    valor_cobro_faltante_res_140_2017_cop: Float
    compras_en_bolsa_ajustes_cop: Float
  }

  type Data_xm_adem {
    id: ID
    anho: Int
    mes: Int
    dia: Int
    creador: Int
    empresa_id: String
    cod_contenido: String
    agente: String
    contenido: String
    cont_hora_1: Float
    cont_hora_2: Float
    cont_hora_3: Float
    cont_hora_4: Float
    cont_hora_5: Float
    cont_hora_6: Float
    cont_hora_7: Float
    cont_hora_8: Float
    cont_hora_9: Float
    cont_hora_10: Float
    cont_hora_11: Float
    cont_hora_12: Float
    cont_hora_13: Float
    cont_hora_14: Float
    cont_hora_15: Float
    cont_hora_16: Float
    cont_hora_17: Float
    cont_hora_18: Float
    cont_hora_19: Float
    cont_hora_20: Float
    cont_hora_21: Float
    cont_hora_22: Float
    cont_hora_23: Float
    cont_hora_24: Float
  }

  type Data_xm_dspctto {
    id: ID
    creador: Int
    usuario_id: String
    empresa_id: String
    anho: Int
    mes: Int
    dia: Int
    contrato: String
    vendedor: String
    comprador: String
    tipo: String
    tipomerc: String
    tipoasigna: String
    desp_hora_1: Float
    desp_hora_2: Float
    desp_hora_3: Float
    desp_hora_4: Float
    desp_hora_5: Float
    desp_hora_6: Float
    desp_hora_7: Float
    desp_hora_8: Float
    desp_hora_9: Float
    desp_hora_10: Float
    desp_hora_11: Float
    desp_hora_12: Float
    desp_hora_13: Float
    desp_hora_14: Float
    desp_hora_15: Float
    desp_hora_16: Float
    desp_hora_17: Float
    desp_hora_18: Float
    desp_hora_19: Float
    desp_hora_20: Float
    desp_hora_21: Float
    desp_hora_22: Float
    desp_hora_23: Float
    desp_hora_24: Float
    trf_hora_1: Float
    trf_hora_2: Float
    trf_hora_3: Float
    trf_hora_4: Float
    trf_hora_5: Float
    trf_hora_6: Float
    trf_hora_7: Float
    trf_hora_8: Float
    trf_hora_9: Float
    trf_hora_10: Float
    trf_hora_11: Float
    trf_hora_12: Float
    trf_hora_13: Float
    trf_hora_14: Float
    trf_hora_15: Float
    trf_hora_16: Float
    trf_hora_17: Float
    trf_hora_18: Float
    trf_hora_19: Float
    trf_hora_20: Float
    trf_hora_21: Float
    trf_hora_22: Float
    trf_hora_23: Float
    trf_hora_24: Float
  }

  type Data_xm_tserv {
    id: ID
    anho: Int
    mes: Int
    creador: Int
    empresa_id: String
    fecha: String
    agente: String
    beneficiario: String
    concepto: String
    tipopago: String
    valor: Float
    magnitud: Float
  }

  type Data_xm_trsm {
    id: ID
    anho: Int
    mes: Int
    creador: Int
    empresa_id: String
    fecha: String
    codigo: String
    descripcion: String
    valor: Float
    usuario_id: String
  }

  type Data_xm_stn {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Float
    t_cop_kwh: Float
    t_prima_cop_kwh: Float
    Energia_sin_kwh: String
    Ing_Reg_Bruto_T_cop: Float
    Ing_Compensar_T_cop: Float
    Ing_Reg_Neto_T_cop: Float
    delta_t_cop_kwh: Float
    periodo: String
    CRS_Variante_Guatape: [CRS_Variante_Guatape]
  }

  type Data_xm_dtun {
    id: ID
  }

  type Data_dane {
    id: ID
    creador: Int
    anho: Int
    mes: Int
    ipp_oferta_interna: Float
    ipc: Float
  }

  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
    empresa: String!
    sector: String
  }

  input AutenticarInput {
    email: String!
    password: String!
  }
  input AfacInput {
    anho: Int!
    mes: Int!
    comprasbolsa: Float!
  }
  input DataempresaInput {
    id: ID
    creador: Int
    anho: Int
    mes: Int
    empresa_id: String
    mercado: String
    numero_usuarios_r: Int
    numero_usuarios_nr: Int
    ventas_usuarios_r_nt1_e: Float
    ventas_usuarios_r_nt1_c: Float
    ventas_usuarios_r_nt1_u: Float
    ventas_usuarios_r_nt2: Float
    ventas_usuarios_r_nt3: Float
    ventas_usuarios_nr_kwh: Float
    pui_cop_kwh: Float
    vsne_kwh: Float
    vnu_kwh: Float
    vae_kwh: Float
    g_exc1: Float
    g_exc1_21: Float
    g_exc2: Float
    g_exc3: Float
    ggd: Float
    cot: Float
    cv_nt1: Float
    cv_nt2: Float
    cv_nt3: Float
    cv_nt4: Float
  }
  input DataxmafacInput {
    id: ID
    anho: Int
    mes: Int
    agente: String
    empresa_id: String
    creador: Int
    perdida_real_kwh: Float
    demanda_real_kwh: Float
    generacion_real_kwh: Float
    compras_en_bolsa_kwh: Float
    compras_en_bolsa_cop: Float
    ventas_en_bolsa_kwh: Float
    ventas_en_bolsa_cop: Float
    compras_en_desviacion_kwh: Float
    compras_en_desviacion_cop: Float
    ventas_en_desviacion_kwh: Float
    ventas_en_desviacion_cop: Float
    compras_en_reconciliacion_kwh: Float
    compras_en_reconciliacion_cop: Float
    ventas_en_reconciliacion_kwh: Float
    ventas_en_reconciliacion_cop: Float
    compras_en_contratos_kwh: Float
    ventas_en_contratos_kwh: Float
    compras_energia_en_bolsa_kwh: Float
    compras_energia_en_bolsa_cop: Float
    ventas_energia_en_bolsa_kwh: Float
    ventas_energia_en_bolsa_cop: Float
    vr_cargo_por_confiabilidad_cop: Float
    vd_cargo_por_confiabilidad_cop: Float
    neto_cxc_cop: Float
    compras_cargo_por_confiabilidad_cop: Float
    ventas_cargo_por_confiabilidad_cop: Float
    compras_en_bolsa_nacional_kwh: Float
    compras_en_bolsa_nacional_cop: Float
    ventas_en_bolsa_nacional_kwh: Float
    ventas_en_bolsa_nacional_cop: Float
    compras_en_bolsa_internacional_kwh: Float
    compras_en_bolsa_internacional_cop: Float
    ventas_en_bolsa_internacional_kwh: Float
    ventas_en_bolsa_internacional_cop: Float
    servicios_agc_cop: Float
    responsabilidad_comercial_agc_kwh: Float
    responsabilidad_comercial_agc_cop: Float
    total_compras_cop: Float
    total_ventas_cop: Float
    valor_a_pagar_por_srpf_cop: Float
    valor_a_recibir_por_srpf_cop: Float
    total_restricciones_cop: Float
    rentas_de_congestion_cop: Float
    restricciones_aliviadas_cop: Float
    vebo_kwh: Float
    rentas_de_congestion_por_importacion_cop: Float
    distribucion_saldo_neto_tie_en_merito_cop: Float
    distribucion_saldo_neto_tie_fuera_de_merito_cop: Float
    compras_bolsa_con_saldo_neto_tie_merito_cop: Float
    rendimientos_financieros_por_exportaciones_tie_cop: Float
    alivio_por_cioef_cop: Float
    compras_ndc_cop: Float
    ventas_desviaciones_oefh_cop: Float
    compras_desviaciones_oefh_cop: Float
    devolucion_dineros_del_cargo_por_confiabilidad_cop: Float
    cobro_dinero_cargo_por_confiabilidad_cop: Float
    compras_arranque_y_parada_cop: Float
    ventas_arranque_y_parada_cop: Float
    ventas_por_eeve_cop: Float
    compras_por_eeve_cop: Float
    restricciones_por_eeve_cop: Float
    cobro_uso_respaldo_cop: Float
    alivio_restricciones_res_05_2010_cop: Float
    compras_en_bolsa_ties_cop: Float
    ventas_en_bolsa_ties_cop: Float
    magnitud_en_kwh__de_compras_en_bolsa_de_ties: Float
    magnitud_en_kwh_de_ventas_en_bolsa_ties: Float
    alivio_por_ejecucion_de_garantia_cop: Float
    valor_total_ejecucion_de_garantia_cop: Float
    alivio_por_vcsrcfvd_cop: Float
    voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop: Float
    vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop: Float
    costo_de_exportacion_cop: Float
    total_costo_de_exportacion_cop: Float
    total_de_generacion_ideal_en_kwh_del_agente: Float
    total_de_holgura_de_agc_en_kwh_asignados_al_agente: Float
    energia_vendida_y_embalsada_asignada_kwh: Float
    vr_demanda_res_155_2014: Float
    alivio_asociado_a_la_resolucion_creg_024_2015_en_cop: Float
    cobro_autogeneradores_res_024_2015: Float
    valor_a_favor_para_generador_res_178_2015: Float
    valor_a_cargo_para_comercializador_res_178_2015: Float
    valor_a_cargo_para_generador_res_195_2015: Float
    valor_a_favor_para_generador_res_195_2015: Float
    valor_a_favor_para_comercializador_res_195_2015: Float
    valor_a_cargo_para_comercializador_res_195_2015: Float
    valor_a_cargo_pagos_de_energia_excedentaria_cop: Float
    valor_a_favor_por_energia_excedentaria_cop: Float
    vc_rd_resolucion_011_de_2015: Float
    vf_rd_resolucion_011_de_2015: Float
    valor_a_favor_delta_ajuste_rd: Float
    valor_a_cargo_delta_ajuste_rd: Float
    valor_a_cargo_r026_2016_cop: Float
    valor_a_favor_r026_2016_cop: Float
    valor_a_favor_r029_2016_cop: Float
    rf039_resolucion_039_de_2016: Float
    rc039_resolucion_039_de_2016: Float
    balance_final_029_de_2016: Float
    valor_a_cargo_para_comercializador_res_062_2013: Float
    valor_a_favor_para_generador_res_062_2013: Float
    valor_del_de_tie_res_049_2018_kwh: Float
    valor_del_de_tie_res_049_2018_cop: Float
    magnitud_desviacion_despacho_res_060_2019_kwh: Float
    valor_desviacion_despacho_res_060_2019_cop: Float
    magnitud_desviacion_redespacho_res_060_2019_kwh: Float
    valor_desviacion_redespacho_res_060_2019_kwh: Float
    desviacion_generacion_variable_res_060_2019_kwh: Float
    alivio_desviaciones_res_creg_060_2019_cop: Float
    valor_pago_ajuste_res_140_2017_cop: Float
    valor_cobro_ajuste_res_140_2017_cop: Float
    valor_pago_excedente_res_140_2017_cop: Float
    valor_cobro_faltante_res_140_2017_cop: Float
    compras_en_bolsa_ajustes_cop: Float
  }

  input DataxmademInput {
    id: ID
    anho: Int
    mes: Int
    dia: Int
    creador: Int
    empresa_id: String
    cod_contenido: String
    agente: String
    contenido: String

    cont_hora_1: Float
    cont_hora_2: Float
    cont_hora_3: Float
    cont_hora_4: Float
    cont_hora_5: Float
    cont_hora_6: Float
    cont_hora_7: Float
    cont_hora_8: Float
    cont_hora_9: Float
    cont_hora_10: Float
    cont_hora_11: Float
    cont_hora_12: Float
    cont_hora_13: Float
    cont_hora_14: Float
    cont_hora_15: Float
    cont_hora_16: Float
    cont_hora_17: Float
    cont_hora_18: Float
    cont_hora_19: Float
    cont_hora_20: Float
    cont_hora_21: Float
    cont_hora_22: Float
    cont_hora_23: Float
    cont_hora_24: Float
  }

  input Data_xm_dspcttoInput {
    id: ID
    creador: Int
    usuario_id: String
    empresa_id: String
    anho: Int
    mes: Int
    dia: Int
    contrato: String
    vendedor: String
    comprador: String
    tipo: String
    tipomerc: String
    tipoasigna: String
    desp_hora_1: Float
    desp_hora_2: Float
    desp_hora_3: Float
    desp_hora_4: Float
    desp_hora_5: Float
    desp_hora_6: Float
    desp_hora_7: Float
    desp_hora_8: Float
    desp_hora_9: Float
    desp_hora_10: Float
    desp_hora_11: Float
    desp_hora_12: Float
    desp_hora_13: Float
    desp_hora_14: Float
    desp_hora_15: Float
    desp_hora_16: Float
    desp_hora_17: Float
    desp_hora_18: Float
    desp_hora_19: Float
    desp_hora_20: Float
    desp_hora_21: Float
    desp_hora_22: Float
    desp_hora_23: Float
    desp_hora_24: Float
    trf_hora_1: Float
    trf_hora_2: Float
    trf_hora_3: Float
    trf_hora_4: Float
    trf_hora_5: Float
    trf_hora_6: Float
    trf_hora_7: Float
    trf_hora_8: Float
    trf_hora_9: Float
    trf_hora_10: Float
    trf_hora_11: Float
    trf_hora_12: Float
    trf_hora_13: Float
    trf_hora_14: Float
    trf_hora_15: Float
    trf_hora_16: Float
    trf_hora_17: Float
    trf_hora_18: Float
    trf_hora_19: Float
    trf_hora_20: Float
    trf_hora_21: Float
    trf_hora_22: Float
    trf_hora_23: Float
    trf_hora_24: Float
  }

  input DataxmtservInput {
    id: ID
    anho: Int
    mes: Int
    creador: Int
    empresa_id: String
    fecha: String
    agente: String
    beneficiario: String
    concepto: String
    tipopago: String
    valor: Float
    magnitud: Float
  }

  input Data_xm_trsmInput {
    id: ID
    creador: Int
    usuario_id: String
    empresa_id: String
    anho: Int
    mes: Int
    fecha: String
    codigo: String
    descripcion: String
    valor: Float
  }

  type Data_creg_cx {
    id: ID
    fecha: String
    creador: Int
    empresa_id: String
    resolucion: String
    mo: Float
    RCT: Float
    RCAE: Float
    RCSNE: Float
    RCNU: Float
    Cf: Float
    PUI: Float
  }

  type DataCregCxResponse {
    records: [Data_creg_cx]
    totalRecords: Int
  }

  input Data_creg_cxInput {
    id: ID
    fecha: String
    creador: Int
    empresa_id: String
    resolucion: String
    mo: Float
    RCT: Float
    RCAE: Float
    RCSNE: Float
    RCNU: Float
    Cf: Float
    PUI: Float
  }

  type Data_dane {
    id: ID
    creador: Int
    anho: Int
    mes: Int
    ipp_oferta_interna: Float
    ipc: Float
    empresa_id: String
  }
  input Data_daneInput {
    id: ID
    creador: Int
    anho: Int
    mes: Int
    ipp_oferta_interna: Float
    ipc: Float
    empresa_id: String
  }

  type Data_banrepublica_tcap {
    id: ID
    creador: Int
    fecha: String
    empresa_id: String
    tasa_a_30_cdt_bancos_comerciales: Float
    monto_a_30_cdt_bancos_comerciales: Float
    tasa_entre_31_y_44_cdt_bancos_comerciales: Float
    monto_entre_31_y_44_cdt_bancos_comerciales: Float
    tasa_a_45_cdt_bancos_comerciales: Float
    monto_a_45_cdt_bancos_comerciales: Float
    tasa_entre_46_y_59_cdt_bancos_comerciales: Float
    monto_entre_46_y_59_cdt_bancos_comerciales: Float
    tasa_a_60_cdt_bancos_comerciales: Float
    monto_a_60_cdt_bancos_comerciales: Float
    tasa_entre_61_y_89_cdt_bancos_comerciales: Float
    monto_entre_61_y_89_cdt_bancos_comerciales: Float
    tasa_a_90_cdt_bancos_comerciales: Float
    monto_a_90_cdt_bancos_comerciales: Float
    tasa_entre_91_y_119_cdt_bancos_comerciales: Float
    monto_entre_91_y_119_cdt_bancos_comerciales: Float
    tasa_a_120_cdt_bancos_comerciales: Float
    monto_a_120_cdt_bancos_comerciales: Float
    tasa_entre_121_y_179_cdt_bancos_comerciales: Float
    monto_entre_121_y_179_cdt_bancos_comerciales: Float
    tasa_a_180_cdt_bancos_comerciales: Float
    monto_a_180_cdt_bancos_comerciales: Float
    tasa_entre_181_y_359_cdt_bancos_comerciales: Float
    monto_entre_181_y_359_cdt_bancos_comerciales: Float
    tasa_a_360_cdt_bancos_comerciales: Float
    monto_a_360_cdt_bancos_comerciales: Float
    tasa_superiores_a_360_cdt_bancos_comerciales: Float
    monto_superiores_a_360_cdt_bancos_comerciales: Float
    tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales: Float
    monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales: Float
    tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales: Float
    monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales: Float
    tasa_entre_2_y_14_cdats_cdat_bancos_comerciales: Float
    monto_entre_2_y_14_cdats_cdat_bancos_comerciales: Float
    tasa_entre_15_y_29_cdats_cdat_bancos_comerciales: Float
    monto_entre_15_y_29_cdat_bancos_comerciales: Float
    tasa_a_30_cdats_cdat_bancos_comerciales: Float
    monto_a_30_cdat_bancos_comerciales: Float
    tasa_entre_31_y_90_cdats_cdat_bancos_comerciales: Float
    monto_entre_31_y_90_cdat_bancos_comerciales: Float
    tasa_entre_91_y_180_cdats_cdat_bancos_comerciales: Float
    monto_entre_91_y_180_cdat_bancos_comerciales: Float
    tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales: Float
    monto_de_181_en_adelante_cdats_cdat_bancos_comerciales: Float
    tasa_cap_cdat_oficinas_cdat_bancos_comerciales: Float
    monto_cap_cdat_oficinas_cdat_bancos_comerciales: Float
  }
  input Data_banrepublica_tcapInput {
    id: ID
    creador: Int
    fecha: String
    empresa_id: String
    tasa_a_30_cdt_bancos_comerciales: Float
    monto_a_30_cdt_bancos_comerciales: Float
    tasa_entre_31_y_44_cdt_bancos_comerciales: Float
    monto_entre_31_y_44_cdt_bancos_comerciales: Float
    tasa_a_45_cdt_bancos_comerciales: Float
    monto_a_45_cdt_bancos_comerciales: Float
    tasa_entre_46_y_59_cdt_bancos_comerciales: Float
    monto_entre_46_y_59_cdt_bancos_comerciales: Float
    tasa_a_60_cdt_bancos_comerciales: Float
    monto_a_60_cdt_bancos_comerciales: Float
    tasa_entre_61_y_89_cdt_bancos_comerciales: Float
    monto_entre_61_y_89_cdt_bancos_comerciales: Float
    tasa_a_90_cdt_bancos_comerciales: Float
    monto_a_90_cdt_bancos_comerciales: Float
    tasa_entre_91_y_119_cdt_bancos_comerciales: Float
    monto_entre_91_y_119_cdt_bancos_comerciales: Float
    tasa_a_120_cdt_bancos_comerciales: Float
    monto_a_120_cdt_bancos_comerciales: Float
    tasa_entre_121_y_179_cdt_bancos_comerciales: Float
    monto_entre_121_y_179_cdt_bancos_comerciales: Float
    tasa_a_180_cdt_bancos_comerciales: Float
    monto_a_180_cdt_bancos_comerciales: Float
    tasa_entre_181_y_359_cdt_bancos_comerciales: Float
    monto_entre_181_y_359_cdt_bancos_comerciales: Float
    tasa_a_360_cdt_bancos_comerciales: Float
    monto_a_360_cdt_bancos_comerciales: Float
    tasa_superiores_a_360_cdt_bancos_comerciales: Float
    monto_superiores_a_360_cdt_bancos_comerciales: Float
    tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales: Float
    monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales: Float
    tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales: Float
    monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales: Float
    tasa_entre_2_y_14_cdats_cdat_bancos_comerciales: Float
    monto_entre_2_y_14_cdats_cdat_bancos_comerciales: Float
    tasa_entre_15_y_29_cdats_cdat_bancos_comerciales: Float
    monto_entre_15_y_29_cdat_bancos_comerciales: Float
    tasa_a_30_cdats_cdat_bancos_comerciales: Float
    monto_a_30_cdat_bancos_comerciales: Float
    tasa_entre_31_y_90_cdats_cdat_bancos_comerciales: Float
    monto_entre_31_y_90_cdat_bancos_comerciales: Float
    tasa_entre_91_y_180_cdats_cdat_bancos_comerciales: Float
    monto_entre_91_y_180_cdat_bancos_comerciales: Float
    tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales: Float
    monto_de_181_en_adelante_cdats_cdat_bancos_comerciales: Float
    tasa_cap_cdat_oficinas_cdat_bancos_comerciales: Float
    monto_cap_cdat_oficinas_cdat_bancos_comerciales: Float
  }
  type Data_banrepublica_tco {
    id: ID
    creador: Int
    anho_semana: String
    tasa_cred_com_credito_consumo: Float
    monto_cred_com_credito_consumo: Float
    tasa_cred_com_odinario: Float
    monto_cred_com_odinario: Float
    tasa__cred_com_preferencial_o_corporativo: Float
    monto__cred_com_preferencial_o_corporativo: Float
    tasa__cred_com_tesoreria: Float
    monto__cred_com_tesoreria: Float
    tasa_colocacion_banco_republica: Float
    monto_colocacion_banco_republica: Float
    tasa_colocacion_sin_tesoreria: Float
    monto_colocacion_sin_tesoreria: Float
    tasa_colocacion_total: Float
    monto_colocacion_total: Float
    empresa_id: String
  }
  input Data_banrepublica_tcoInput {
    id: ID
    creador: Int
    anho_semana: String
    tasa_cred_com_credito_consumo: Float
    monto_cred_com_credito_consumo: Float
    tasa_cred_com_odinario: Float
    monto_cred_com_odinario: Float
    tasa__cred_com_preferencial_o_corporativo: Float
    monto__cred_com_preferencial_o_corporativo: Float
    tasa__cred_com_tesoreria: Float
    monto__cred_com_tesoreria: Float
    tasa_colocacion_banco_republica: Float
    monto_colocacion_banco_republica: Float
    tasa_colocacion_sin_tesoreria: Float
    monto_colocacion_sin_tesoreria: Float
    tasa_colocacion_total: Float
    monto_colocacion_total: Float
    empresa_id: String
  }

  type Data_mme_validacion {
    id: ID
    creador: Int
    empresa_id: String
    fecha: String
    trimestre: Int
    anho: Int
    facturacion: String
    subsidios: String
    contribuciones: Int
    contrib_no_recaud_desp_6m: Int
    contrib_recaud_desp_de_conc: Int
    giros_recibidos: String
    giro_sobrante: String
    ultimo_giro_incluido: Int
  }

  input Data_mme_validacionInput {
    id: ID
    creador: Int
    empresa_id: String
    fecha: String
    trimestre: Int
    anho: Int
    subsidios: String
    facturacion: String
    contribuciones: Int
    contrib_no_recaud_desp_6m: Int
    contrib_recaud_desp_de_conc: Int
    giros_recibidos: String
    giro_sobrante: String
    ultimo_giro_incluido: Int
  }

  type Data_mme_giro {
    id: ID
    creador: Int
    empresa_id: String
    fecha: String
    fondo: String
    resolucion: String
    link_resolucion: String
    giro_cop: String
  }
  input Data_mme_giroInput {
    id: ID
    creador: Int
    empresa_id: String
    fecha: String
    fondo: String
    resolucion: String
    link_resolucion: String
    giro_cop: String
  }

  type Res_componentes_cu_tarifa {
    id: ID
    creador: Int
    anho: Int
    mes: Int
    mercado: String
    qc: Float
    pc: Float
    ref_g: Float
    max_g: Float
    cr: Float
    ad: Float
    aj: Float
    pb: Float
    mc: Float
    w1: Float
    w2: Float
    pcsub: Float
    alfa: Float
    gc: Float
    tx: Float
    dtun_nt1_e: Float
    dtun_nt1_c: Float
    dtun_nt1_p: Float
    dtun_nt2: Float
    dtun_nt3: Float
    cdi_100: Float
    cdi_50: Float
    cdm: Float
    cd4: Float
    cd3: Float
    cd2: Float
    dnt1: Float
    dnt2: Float
    dnt3: Float
    dnt4: Float
    guatape: Float
    ventas_desv: Float
    restricciones_aliviadas: Float
    ventas_totales: Float
    data_xm_iprm1: Float
    data_xm_iprm2: Float
    data_xm_iprm3: Float
    data_xm_iprm4: Float
    delta_t: Float
    t_prima: Float
    crs: Float
    rcal: Float
    r: Float
    iprstn: Float
    pr_nt1: Float
    pr_nt2: Float
    pr_nt3: Float
    pr_nt4: Float
    cer: Float
    cfm: Float
    rc: Float
    ul_trim_val_mme: Int
    anho_ul_trim_val_mme: Int
    sub1: Float
    sub2: Float
    n_sub1: Float
    m_sub2: Float
    facturacion_t: String
    r1: Float
    r2: Float
    sup_def: Float
    cfs: Float
    cfe: Float
    c_ast: Float
    cvr: Float
    cv: Float
    cu_nt1_100: Float
    cu_nt1_50: Float
    cu_nt1_0: Float
    cu_nt2: Float
    cu_nt3: Float
    cu_nt4: Float
    nt1_100_estrato_1_men_cs: Float
    nt1_100_estrato_2_men_cs: Float
    nt1_100_estrato_3_men_cs: Float
    nt1_100_estrato_4_men_cs: Float
    nt1_100_estrato_5_men_cs: Float
    nt1_100_estrato_6_men_cs: Float
    nt1_100_estrato_4: Float
    nt1_100_estrato_5: Float
    nt1_100_estrato_6: Float
    nt1_100_c: Float
    nt1_100_i_con_c: Float
    nt1_100_i_sin_c: Float
    nt1_100_p: Float
    nt1_100_o: Float
    nt1_50_estrato_1_men_cs: Float
    nt1_50_estrato_2_men_cs: Float
    nt1_50_estrato_3_men_cs: Float
    nt1_50_estrato_4_men_cs: Float
    nt1_50_estrato_5_men_cs: Float
    nt1_50_estrato_6_men_cs: Float
    nt1_50_estrato_4: Float
    nt1_50_estrato_5: Float
    nt1_50_estrato_6: Float
    nt1_50_c: Float
    nt1_50_i_con_c: Float
    nt1_50_i_sin_c: Float
    nt1_50_p: Float
    nt1_50_o: Float
    nt1_0_estrato_1_men_cs: Float
    nt1_0_estrato_2_men_cs: Float
    nt1_0_estrato_3_men_cs: Float
    nt1_0_estrato_4_men_cs: Float
    nt1_0_estrato_5_men_cs: Float
    nt1_0_estrato_6_men_cs: Float
    nt1_0_estrato_4: Float
    nt1_0_estrato_5: Float
    nt1_0_estrato_6: Float
    nt1_0_c: Float
    nt1_0_i_con_c: Float
    nt1_0_i_sin_c: Float
    nt1_0_p: Float
    nt1_0_o: Float
    nt2_c: Float
    nt2_i_con_c: Float
    nt2_i_sin_c: Float
    nt2_o: Float
    nt2_ap: Float
    nt2_bsnmen_cs: Float
    nt2_bsnmay_cs: Float
    nt3_c: Float
    nt3_i_con_c: Float
    nt3_i_sin_c: Float
    nt3_o: Float
    nt3_ap: Float
    nt2_estrato_1_men_cs: Float
    nt3_estrato_1_men_cs: Float
    nt4_estrato_1_men_cs: Float
    nt2_estrato_2_men_cs: Float
    nt3_estrato_2_men_cs: Float
    nt4_estrato_2_men_cs: Float
    empresa_id: String
    cu_nt1_100_ot: Float
    cu_nt1_50_ot: Float
    cu_nt1_0_ot: Float
    cu_nt2_ot: Float
    cu_nt3_ot: Float
    cu_nt4_ot: Float
    saldo_nt1_100_ot: Float
    saldo_nt1_50_ot: Float
    saldo_nt1_0_ot: Float
    saldo_nt2_ot: Float
    saldo_nt3_ot: Float
    pv: Float
    giro_sobrante: Float
    ultimo_giro_incluido: Int
    cg: Float
    cgcu: Float
    cot: Float
    cv_nt1: Float
    cv_nt2: Float
    cv_nt3: Float
    cv_nt4: Float
  }

  input Res_componentes_cu_tarifaInput {
    id: ID
    creador: Int
    anho: Int
    mes: Int
    mercado: String
    qc: Float
    pc: Float
    ref_g: Float
    max_g: Float
    cr: Float
    ad: Float
    aj: Float
    pb: Float
    mc: Float
    w1: Float
    w2: Float
    pcsub: Float
    alfa: Float
    gc: Float
    tx: Float
    dtun_nt1_e: Float
    dtun_nt1_c: Float
    dtun_nt1_p: Float
    dtun_nt2: Float
    dtun_nt3: Float
    cdi_100: Float
    cdi_50: Float
    cdm: Float
    cd4: Float
    cd3: Float
    cd2: Float
    dnt1: Float
    dnt2: Float
    dnt3: Float
    dnt4: Float
    guatape: Float
    ventas_desv: Float
    restricciones_aliviadas: Float
    ventas_totales: Float
    data_xm_iprm1: Float
    data_xm_iprm2: Float
    data_xm_iprm3: Float
    data_xm_iprm4: Float
    delta_t: Float
    t_prima: Float
    crs: Float
    rcal: Float
    r: Float
    iprstn: Float
    pr_nt1: Float
    pr_nt2: Float
    pr_nt3: Float
    pr_nt4: Float
    cer: Float
    cfm: Float
    rc: Float
    ul_trim_val_mme: Int
    anho_ul_trim_val_mme: Int
    sub1: Float
    sub2: Float
    n_sub1: Float
    m_sub2: Float
    facturacion_t: String
    r1: Float
    r2: Float
    sup_def: Float
    cfs: Float
    cfe: Float
    c_ast: Float
    cvr: Float
    cv: Float
    cu_nt1_100: Float
    cu_nt1_50: Float
    cu_nt1_0: Float
    cu_nt2: Float
    cu_nt3: Float
    cu_nt4: Float
    nt1_100_estrato_1_men_cs: Float
    nt1_100_estrato_2_men_cs: Float
    nt1_100_estrato_3_men_cs: Float
    nt1_100_estrato_4_men_cs: Float
    nt1_100_estrato_5_men_cs: Float
    nt1_100_estrato_6_men_cs: Float
    nt1_100_estrato_4: Float
    nt1_100_estrato_5: Float
    nt1_100_estrato_6: Float
    nt1_100_c: Float
    nt1_100_i_con_c: Float
    nt1_100_i_sin_c: Float
    nt1_100_p: Float
    nt1_100_o: Float
    nt1_50_estrato_1_men_cs: Float
    nt1_50_estrato_2_men_cs: Float
    nt1_50_estrato_3_men_cs: Float
    nt1_50_estrato_4_men_cs: Float
    nt1_50_estrato_5_men_cs: Float
    nt1_50_estrato_6_men_cs: Float
    nt1_50_estrato_4: Float
    nt1_50_estrato_5: Float
    nt1_50_estrato_6: Float
    nt1_50_c: Float
    nt1_50_i_con_c: Float
    nt1_50_i_sin_c: Float
    nt1_50_p: Float
    nt1_50_o: Float
    nt1_0_estrato_1_men_cs: Float
    nt1_0_estrato_2_men_cs: Float
    nt1_0_estrato_3_men_cs: Float
    nt1_0_estrato_4_men_cs: Float
    nt1_0_estrato_5_men_cs: Float
    nt1_0_estrato_6_men_cs: Float
    nt1_0_estrato_4: Float
    nt1_0_estrato_5: Float
    nt1_0_estrato_6: Float
    nt1_0_c: Float
    nt1_0_i_con_c: Float
    nt1_0_i_sin_c: Float
    nt1_0_p: Float
    nt1_0_o: Float
    nt2_c: Float
    nt2_i_con_c: Float
    nt2_i_sin_c: Float
    nt2_o: Float
    nt2_ap: Float
    nt2_bsnmen_cs: Float
    nt2_bsnmay_cs: Float
    nt3_c: Float
    nt3_i_con_c: Float
    nt3_i_sin_c: Float
    nt3_o: Float
    nt3_ap: Float
    nt2_estrato_1_men_cs: Float
    nt3_estrato_1_men_cs: Float
    nt4_estrato_1_men_cs: Float
    nt2_estrato_2_men_cs: Float
    nt3_estrato_2_men_cs: Float
    nt4_estrato_2_men_cs: Float
    empresa_id: String
    cu_nt1_100_ot: Float
    cu_nt1_50_ot: Float
    cu_nt1_0_ot: Float
    cu_nt2_ot: Float
    cu_nt3_ot: Float
    cu_nt4_ot: Float
    saldo_nt1_100_ot: Float
    saldo_nt1_50_ot: Float
    saldo_nt1_0_ot: Float
    saldo_nt2_ot: Float
    saldo_nt3_ot: Float
    pv: Float
    giro_sobrante: Float
    ultimo_giro_incluido: Int
    cg: Float
    cgcu: Float
    cot: Float
    cv_nt1: Float
    cv_nt2: Float
    cv_nt3: Float
    cv_nt4: Float
  }
  type Dataxmstn {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    t_cop_kwh: Float
    t_prima_cop_kwh: Float
    Energia_sin_kwh: Float
    Ing_Reg_Bruto_T_cop: String
    Ing_Compensar_T_cop: String
    Ing_Reg_Neto_T_cop: String
    delta_t_cop_kwh: Float
  }
  input DataxmstnInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    t_cop_kwh: Float
    t_prima_cop_kwh: Float
    Energia_sin_kwh: Float
    Ing_Reg_Bruto_T_cop: String
    Ing_Compensar_T_cop: String
    Ing_Reg_Neto_T_cop: String
    delta_t_cop_kwh: Float
  }
  type Data_xm_guatape {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    agente: String
    demanda_kwh: Float
    crs_variable_guatape_cop: Float
  }
  input Data_xm_guatapeInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    agente: String
    demanda_kwh: Float
    crs_variable_guatape_cop: Float
  }
  type Data_xm_cprog {
    id: ID
    creador: Int
    anho: Int
    mes: Int
    agente: String
    cargo_cprog_cop_kwh: Float
    createdAt: String
    updatedAt: String
  }
  input Data_xm_cprogInput {
    id: ID
    creador: Int
    anho: Int
    mes: Int
    agente: String
    cargo_cprog_cop_kwh: Float
    createdAt: String
    updatedAt: String
  }
  type Data_xm_ipr {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    strID: String
    agrupaORMercado: String
    fechavigencia: String
    conceptoID: String
    nivelEntrada: Int
    nivelSalida: Int
    valor: Float
  }
  input Data_xm_iprInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    strID: String
    agrupaORMercado: String
    fechavigencia: String
    conceptoID: String
    nivelEntrada: Int
    nivelSalida: Int
    valor: Float
  }
  type Data_xm_d015 {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    cargo_por_uso_dt1_cop_kwh: Float
    cargo_por_uso_dt2_cop_kwh: Float
    cargo_por_uso_dt3_cop_kwh: Float
    cargo_de_inversion_cdi1_cop_kwh: Float
    cargo_por_aom_cda1_cop_kwh: Float
    cargo_nivel_de_tension_cd2_cop_kwh: Float
    cargo_nivel_de_tension_cd3_cop_kwh: Float
    cargo_nivel_de_tension_cd3_2_cop_kwh: Float
    cargo_nivel_de_tension_cd4_cop_kwh: Float
    cargo_por_incentivos_dtcs_cop_kwh: Float
    fraccion_dtcs_cop_kwh: Float
    ia1: Float
    ia2: Float
    ia3: Float
    iaa1_cop: Float
    iaa2_cop: Float
    iaa3_cop: Float
    irm1_cop: Float
    irm2_cop: Float
    irm3_cop: Float
    fm: Float
    iaaom1_cop: Float
    iaaom2_cop: Float
    iaaom3_cop: Float
    aomni1_cop: Float
    aomni2_cop: Float
    aomni3_cop: Float
    ima_n1: Float
    ima_n2: Float
    ima_n3: Float
    imn_n1: Float
    imn_n2: Float
    imn_n3: Float
    aim_n1: Float
    aim_n2: Float
    aim_n3: Float
    naim_n1: Float
    naim_n2: Float
    naim_n3: Float
    fraccion_aim_n1_inversion: Float
    fraccion_aim_n1_aom: Float
    bra1_cop: Float
    bra2_cop: Float
    bra3_cop: Float
    brae1_cop: Float
    brae2_cop: Float
    brae3_cop: Float
    braen1_cop: Float
    braen2_cop: Float
    braen3_cop: Float
    rc1_cop: Float
    rc2_cop: Float
    rc3_cop: Float
    cdi_aj_1_cop2007_kwh: Float
    cd_aj_2_cop2007_kwh: Float
    cd_aj_3_cop2007_kwh: Float
    cdm_aj_1_cop2007_kwh: Float
    iapa1: Float
    iapa2: Float
    iapa3: Float
    iapa1_tant: Float
    iapa2_tant: Float
    iapa3_tant: Float
    oi1_cop: Float
    oj2_cop: Float
    oj3_cop: Float
    irespaldo1_cop: Float
    irespaldo2_cop: Float
    irespaldo3_cop: Float
    imunts1_cop: Float
    imunts2_cop: Float
    imunts3_cop: Float
    ireactiva1_cop: Float
    ireactiva2_cop: Float
    ireactiva3_cop: Float
    aombase1: Float
    aombase2: Float
    aombase3: Float
    brae1_tant_cop: Float
    brae2_tant_cop: Float
    brae3_tant_cop: Float
    deltabraenj_1_cop: Float
    deltabraenj_2_cop: Float
    deltabraenj_3_cop: Float
    deltaingj_1_cop: Float
    deltaingj_2_cop: Float
    deltaingj_3_cop: Float
    brt1_cop: Float
    brt2_cop: Float
    brt3_cop: Float
    rcbia1_cop: Float
    rcbia2_cop: Float
    rcbia3_cop: Float
    rcna1_cop: Float
    rcna2_cop: Float
    rcna3_cop: Float
    rcnafo1_cop: Float
    rcnafo2_cop: Float
    rcnafo3_cop: Float
    inve1_cop: Float
    inve2_cop: Float
    inve3_cop: Float
    inva1_cop: Float
    inva2_cop: Float
    inva3_cop: Float
    inva1_tant_cop: Float
    inva2_tant_cop: Float
    inva3_tant_cop: Float
    invr1_maximo_tant_cop: Float
    invr2_maximo_tant_cop: Float
    invr3_maximo_tant_cop: Float
    invr1_delta_cop: Float
    invr2_delta_cop: Float
    invr3_delta_cop: Float
    invr1_tant_cop: Float
    invr2_tant_cop: Float
    invr3_tant_cop: Float
    pr1: Float
    pr2: Float
    pr3: Float
    pj_1: Float
    pj_2: Float
    pj_3: Float
    pj_1_creg097: Float
    pj_2_creg097: Float
    pj_3_creg097: Float
    acumulado_eej1_kwh: Float
    acumulado_eej2_kwh: Float
    acumulado_eej3_kwh: Float
    acumulado_fej3_2_kwh: Float
    euj_2_creg097_kwh: Float
    fej3_2_creg097_kwh: Float
    ic_saidi_cop: Float
    ic_saifi_cop: Float
    conp_cop: Float
    vcdij_tant_kwh: Float
    vcinj_tant_kwh: Float
    vacpiec1: Float
    vacpiec2: Float
    vacpiec3: Float
    vacni1: Float
    vacni2: Float
    vacni3: Float
    r_tasa_retorno_actividad_distribucion: Float
    famb: Float
    css1_cop: Float
    css2_cop: Float
    css3_cop: Float
    dismining1_cop: Float
    dismining2_cop: Float
    dismining3_cop: Float
  }
  input Data_xm_d015Input {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    cargo_por_uso_dt1_cop_kwh: Float
    cargo_por_uso_dt2_cop_kwh: Float
    cargo_por_uso_dt3_cop_kwh: Float
    cargo_de_inversion_cdi1_cop_kwh: Float
    cargo_por_aom_cda1_cop_kwh: Float
    cargo_nivel_de_tension_cd2_cop_kwh: Float
    cargo_nivel_de_tension_cd3_cop_kwh: Float
    cargo_nivel_de_tension_cd3_2_cop_kwh: Float
    cargo_nivel_de_tension_cd4_cop_kwh: Float
    cargo_por_incentivos_dtcs_cop_kwh: Float
    fraccion_dtcs_cop_kwh: Float
    ia1: Float
    ia2: Float
    ia3: Float
    iaa1_cop: Float
    iaa2_cop: Float
    iaa3_cop: Float
    irm1_cop: Float
    irm2_cop: Float
    irm3_cop: Float
    fm: Float
    iaaom1_cop: Float
    iaaom2_cop: Float
    iaaom3_cop: Float
    aomni1_cop: Float
    aomni2_cop: Float
    aomni3_cop: Float
    ima_n1: Float
    ima_n2: Float
    ima_n3: Float
    imn_n1: Float
    imn_n2: Float
    imn_n3: Float
    aim_n1: Float
    aim_n2: Float
    aim_n3: Float
    naim_n1: Float
    naim_n2: Float
    naim_n3: Float
    fraccion_aim_n1_inversion: Float
    fraccion_aim_n1_aom: Float
    bra1_cop: Float
    bra2_cop: Float
    bra3_cop: Float
    brae1_cop: Float
    brae2_cop: Float
    brae3_cop: Float
    braen1_cop: Float
    braen2_cop: Float
    braen3_cop: Float
    rc1_cop: Float
    rc2_cop: Float
    rc3_cop: Float
    cdi_aj_1_cop2007_kwh: Float
    cd_aj_2_cop2007_kwh: Float
    cd_aj_3_cop2007_kwh: Float
    cdm_aj_1_cop2007_kwh: Float
    iapa1: Float
    iapa2: Float
    iapa3: Float
    iapa1_tant: Float
    iapa2_tant: Float
    iapa3_tant: Float
    oi1_cop: Float
    oj2_cop: Float
    oj3_cop: Float
    irespaldo1_cop: Float
    irespaldo2_cop: Float
    irespaldo3_cop: Float
    imunts1_cop: Float
    imunts2_cop: Float
    imunts3_cop: Float
    ireactiva1_cop: Float
    ireactiva2_cop: Float
    ireactiva3_cop: Float
    aombase1: Float
    aombase2: Float
    aombase3: Float
    brae1_tant_cop: Float
    brae2_tant_cop: Float
    brae3_tant_cop: Float
    deltabraenj_1_cop: Float
    deltabraenj_2_cop: Float
    deltabraenj_3_cop: Float
    deltaingj_1_cop: Float
    deltaingj_2_cop: Float
    deltaingj_3_cop: Float
    brt1_cop: Float
    brt2_cop: Float
    brt3_cop: Float
    rcbia1_cop: Float
    rcbia2_cop: Float
    rcbia3_cop: Float
    rcna1_cop: Float
    rcna2_cop: Float
    rcna3_cop: Float
    rcnafo1_cop: Float
    rcnafo2_cop: Float
    rcnafo3_cop: Float
    inve1_cop: Float
    inve2_cop: Float
    inve3_cop: Float
    inva1_cop: Float
    inva2_cop: Float
    inva3_cop: Float
    inva1_tant_cop: Float
    inva2_tant_cop: Float
    inva3_tant_cop: Float
    invr1_maximo_tant_cop: Float
    invr2_maximo_tant_cop: Float
    invr3_maximo_tant_cop: Float
    invr1_delta_cop: Float
    invr2_delta_cop: Float
    invr3_delta_cop: Float
    invr1_tant_cop: Float
    invr2_tant_cop: Float
    invr3_tant_cop: Float
    pr1: Float
    pr2: Float
    pr3: Float
    pj_1: Float
    pj_2: Float
    pj_3: Float
    pj_1_creg097: Float
    pj_2_creg097: Float
    pj_3_creg097: Float
    acumulado_eej1_kwh: Float
    acumulado_eej2_kwh: Float
    acumulado_eej3_kwh: Float
    acumulado_fej3_2_kwh: Float
    euj_2_creg097_kwh: Float
    fej3_2_creg097_kwh: Float
    ic_saidi_cop: Float
    ic_saifi_cop: Float
    conp_cop: Float
    vcdij_tant_kwh: Float
    vcinj_tant_kwh: Float
    vacpiec1: Float
    vacpiec2: Float
    vacpiec3: Float
    vacni1: Float
    vacni2: Float
    vacni3: Float
    r_tasa_retorno_actividad_distribucion: Float
    famb: Float
    css1_cop: Float
    css2_cop: Float
    css3_cop: Float
    dismining1_cop: Float
    dismining2_cop: Float
    dismining3_cop: Float
  }
  type Data_xm_dtun {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    area: String
    nivel_tension: Int
    valor: Float
    operador_red: String
    version: String
  }
  input Data_xm_dtunInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    area: String
    nivel_tension: Int
    valor: Float
    operador_red: String
    version: String
  }

  type Data_empresa_anual {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    contribuciones_creg: Int
    contribuciones_sspd: Int
    porc_contribucion_creg: Float
    porc_contribucion_sspd: Float
  }
  input Data_empresa_anualInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    contribuciones_creg: Int
    contribuciones_sspd: Int
    porc_contribucion_creg: Float
    porc_contribucion_sspd: Float
  }

  type Data_xm_str {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    total_ingreso_mensual_bruto_str_cop_norte: String
    energia_del_str_kwh_norte: Float
    cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte: Float
    cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte: Float
    cargo_por_uso_dt4_cop_kwh_norte: Float
    factor_para_referir_las_medidas_de_energia_del_nt_4_norte: Float
    valor_diferencial_despues_de_compensacion_cop_kwh_norte: Float
    total_ingreso_mensual_bruto_str_cop_sur: Float
    energia_del_str_kwh_sur: Float
    cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur: Float
    cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur: Float
    cargo_por_uso_dt4_cop_kwh_sur: Float
    factor_para_referir_las_medidas_de_energia_del_nt_4_sur: Float
    valor_diferencial_despues_de_compensacion_cop_kwh_sur: Float
    periodo: String
  }
  input Data_xm_strInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    total_ingreso_mensual_bruto_str_cop_norte: String
    energia_del_str_kwh_norte: Float
    cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte: Float
    cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte: Float
    cargo_por_uso_dt4_cop_kwh_norte: Float
    factor_para_referir_las_medidas_de_energia_del_nt_4_norte: Float
    valor_diferencial_despues_de_compensacion_cop_kwh_norte: Float
    total_ingreso_mensual_bruto_str_cop_sur: Float
    energia_del_str_kwh_sur: Float
    cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur: Float
    cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur: Float
    cargo_por_uso_dt4_cop_kwh_sur: Float
    factor_para_referir_las_medidas_de_energia_del_nt_4_sur: Float
    valor_diferencial_despues_de_compensacion_cop_kwh_sur: Float
    periodo: String
  }

  type ErrorData_xm_str {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_str
  }

  type ResponseData_xm_str {
    datos: [Data_xm_str]
    errores: [ErrorData_xm_str]
  }

  type Data_empresa_garantia {
    id: ID
    creador: Int
    empresa_id: String
    tipo_garantia: String
    nit_beneficiario: Int
    dv_beneficiario: Int
    emisor_banco: String
    numero_garantia: String
    fecha_inicio_vigencia: String
    fecha_fin_vigencia: String
    valor_garantia: String
    costo_garantia: Int
  }
  input Data_empresa_garantiaInput {
    id: ID
    creador: Int
    empresa_id: String
    tipo_garantia: String
    nit_beneficiario: Int
    dv_beneficiario: Int
    emisor_banco: String
    numero_garantia: String
    fecha_inicio_vigencia: String
    fecha_fin_vigencia: String
    valor_garantia: String
    costo_garantia: Int
  }

  type Data_xm_trsd {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    dia: Int
    codigo: String
    contenido: String
    hora_01: Float
    hora_02: Float
    hora_03: Float
    hora_04: Float
    hora_05: Float
    hora_06: Float
    hora_07: Float
    hora_08: Float
    hora_09: Float
    hora_10: Float
    hora_11: Float
    hora_12: Float
    hora_13: Float
    hora_14: Float
    hora_15: Float
    hora_16: Float
    hora_17: Float
    hora_18: Float
    hora_19: Float
    hora_20: Float
    hora_21: Float
    hora_22: Float
    hora_23: Float
    hora_24: Float
  }
  input Data_xm_trsdInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    dia: Int
    codigo: String
    contenido: String
    hora_01: Float
    hora_02: Float
    hora_03: Float
    hora_04: Float
    hora_05: Float
    hora_06: Float
    hora_07: Float
    hora_08: Float
    hora_09: Float
    hora_10: Float
    hora_11: Float
    hora_12: Float
    hora_13: Float
    hora_14: Float
    hora_15: Float
    hora_16: Float
    hora_17: Float
    hora_18: Float
    hora_19: Float
    hora_20: Float
    hora_21: Float
    hora_22: Float
    hora_23: Float
    hora_24: Float
  }

  type Data_empresa_agpe {
    id: ID
    creador: Int
    empresa_id: String
    niu: Int
    anho: Int
    mes: Int
    dia: Int
    tipo_ene: String
    hora_01: Float
    hora_02: Float
    hora_03: Float
    hora_04: Float
    hora_05: Float
    hora_06: Float
    hora_07: Float
    hora_08: Float
    hora_09: Float
    hora_10: Float
    hora_11: Float
    hora_12: Float
    hora_13: Float
    hora_14: Float
    hora_15: Float
    hora_16: Float
    hora_17: Float
    hora_18: Float
    hora_19: Float
    hora_20: Float
    hora_21: Float
    hora_22: Float
    hora_23: Float
    hora_24: Float
  }
  input Data_empresa_agpeInput {
    id: ID
    creador: Int
    empresa_id: String
    niu: Int
    anho: Int
    mes: Int
    dia: Int
    tipo_ene: String
    hora_01: Float
    hora_02: Float
    hora_03: Float
    hora_04: Float
    hora_05: Float
    hora_06: Float
    hora_07: Float
    hora_08: Float
    hora_09: Float
    hora_10: Float
    hora_11: Float
    hora_12: Float
    hora_13: Float
    hora_14: Float
    hora_15: Float
    hora_16: Float
    hora_17: Float
    hora_18: Float
    hora_19: Float
    hora_20: Float
    hora_21: Float
    hora_22: Float
    hora_23: Float
    hora_24: Float
  }

  type ErrorData_xm_stn {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_stn
  }

  type ResponseData_xm_stn {
    datos: [Data_xm_stn]
    errores: [ErrorData_xm_stn]
  }

  input Data_xm_stnInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Float
    t_cop_kwh: Float
    t_prima_cop_kwh: Float
    Energia_sin_kwh: String
    Ing_Reg_Bruto_T_cop: Float
    Ing_Compensar_T_cop: Float
    Ing_Reg_Neto_T_cop: Float
    delta_t_cop_kwh: Float
    periodo: String
    CRS_Variante_Guatape: [CRS_Variante_GuatapeInput]
  }

  input CRS_Variante_GuatapeInput {
    agente: String
    crs_variable_guatape_cop: Float
    demanda_kwh: Float
  }

  type CRS_Variante_Guatape {
    agente: String
    crs_variable_guatape_cop: Float
    demanda_kwh: Float
  }

  type ErrorData_xm_d015 {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_d015
  }

  type ResponseData_xm_d015 {
    datos: [Data_xm_d015]
    errores: [ErrorData_xm_d015]
  }

  type ResponseData_xm_cprog {
    datos: [Data_xm_cprog]
    errores: [ErrorData_xm_cprog]
  }

  type ErrorData_xm_cprog {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_cprog
  }

  type ErrorData_xm_trsm {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_trsm
  }

  type ResponseData_xm_trsm {
    datos: [Data_xm_trsm]
    errores: [ErrorData_xm_trsm]
  }

  type ErrorData_xm_dspctto {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_dspctto
  }

  type ResponseData_xm_dspctto {
    datos: [Data_xm_dspctto]
    errores: [ErrorData_xm_dspctto]
  }
  input ValoresFiltrablesInput {
    campo: String
    valores: [String]
  }
  input QueryOptions {
    page: Int
    limit: Int
    searchText: String
    sortOrder: String
    sortField: String
    searchOptions: [SearchOption]
    exportarTodos: Boolean
    idInput: ID
    exportarTodosPdf: Boolean
    camposFiltrables: [String]
    filters: [ValoresFiltrablesInput] # Agrega el campo de filtros
  }

  input SearchOption {
    field: String
    type: String
    search: Boolean
  }

  type ValoresFiltrables {
    campo: String
    valores: [String]
  }

  type Dataempresamessin {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    mercado: String
    numero_usuarios_r: Int
    numero_usuarios_nr: Int
    ventas_usuarios_r_nt1_e: Float
    ventas_usuarios_r_nt1_c: Float
    ventas_usuarios_r_nt1_u: Float
    ventas_usuarios_r_nt2: Float
    ventas_usuarios_r_nt3: Float
    ventas_usuarios_nr_kwh: Float
    pui_cop_kwh: Float
    vsne_kwh: Float
    vnu_kwh: Float
    vae_kwh: Float
    g_exc1: Float
    g_exc1_21: Float
    g_exc2: Float
    g_exc3: Float
    ggd: Float
    cot: Float
  }
  input DataempresamessinInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    mercado: String
    numero_usuarios_r: Int
    numero_usuarios_nr: Int
    ventas_usuarios_r_nt1_e: Float
    ventas_usuarios_r_nt1_c: Float
    ventas_usuarios_r_nt1_u: Float
    ventas_usuarios_r_nt2: Float
    ventas_usuarios_r_nt3: Float
    ventas_usuarios_nr_kwh: Float
    pui_cop_kwh: Float
    vsne_kwh: Float
    vnu_kwh: Float
    vae_kwh: Float
    g_exc1: Float
    g_exc1_21: Float
    g_exc2: Float
    g_exc3: Float
    ggd: Float
    cot: Float
  }

  type DataempresamessinResponse {
    records: [Dataempresamessin]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }
  type ErrorDataempresamessin {
    tipo: String
    mensaje: String
    registrosErrores: Dataempresamessin
  }

  type ResponseEmpresaGarantia {
    records: [EmpresaGarantia]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type ResponseDataempresamessin {
    datos: [Dataempresamessin]
    errores: [ErrorDataempresamessin]
  }

  type ResponseEmpresaGarantia {
    datos: [EmpresaGarantia]
    errores: [ErrorEmpresaGarantia]
  }
  type ErrorEmpresaGarantia {
    tipo: String
    mensaje: String
    registrosErrores: EmpresaGarantia
  }

  type EmpresaGarantia {
    tipo_garantia: String
    nit_beneficiario: Int
    dv_beneficiario: Int
    emisor_banco: String
    numero_garantia: String
    fecha_inicio_vigencia: String
    fecha_fin_vigencia: String
    valor_garantia: String
    costo_garantia: Float
  }

  input EmpresaGarantiaInput {
    creador: Int
    empresa_id: String
    tipo_garantia: String!
    nit_beneficiario: Int!
    dv_beneficiario: Int!
    emisor_banco: String!
    numero_garantia: String!
    fecha_inicio_vigencia: String!
    fecha_fin_vigencia: String!
    valor_garantia: String!
    costo_garantia: Float!
  }

  type DataEmpresaAnual {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    contribuciones_creg: Int
    contribuciones_sspd: Int
    porc_contribucion_creg: Float
    porc_contribucion_sspd: Float
  }

  input DataEmpresaAnualInput {
    creador: Int
    empresa_id: String
    anho: Int!
    contribuciones_creg: Int!
    contribuciones_sspd: Int!
    porc_contribucion_creg: Float!
    porc_contribucion_sspd: Float!
  }

  type DataEmpresaAnualResponse {
    records: [DataEmpresaAnual]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type ResponseDataEmpresaAnual {
    datos: [DataEmpresaAnual]
    errores: [ErrorDataEmpresaAnual]
  }

  type ErrorDataEmpresaAnual {
    tipo: String
    mensaje: String
    registrosErrores: DataEmpresaAnual
  }

  type DataXmAfacResponse {
    records: [Data_xm_afac]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type DataXmDspcttoResponse {
    records: [Data_xm_dspctto]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type DataXmTrsmResponse {
    records: [Data_xm_trsm]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }
  type ErrorData_xm_afac {
    tipo: String
    mensaje: String
    registrosErrores: [Data_xm_afac]
  }

  type ResponseData_xm_afac {
    datos: [Data_xm_afac]
    errores: [ErrorData_xm_afac]
  }

  type ErrorData_xm_dspctto {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_dspctto
  }

  type ResponseData_xm_dspctto {
    datos: [Data_xm_dspctto]
    errores: [ErrorData_xm_dspctto]
  }

  type ErrorData_xm_trsm {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_trsm
  }

  type ResponseData_xm_trsm {
    datos: [Data_xm_trsm]
    errores: [ErrorData_xm_trsm]
  }

  type Data_xm_strResponse {
    records: [Data_xm_str]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }
  type Data_xm_stnResponse {
    records: [Data_xm_stn]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type ErrorData_xm_str {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_str
  }

  type ResponseData_xm_str {
    datos: [Data_xm_str]
    errores: [ErrorData_xm_str]
  }
  type ErrorData_xm_stn {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_stn
  }

  type ResponseData_xm_stn {
    datos: [Data_xm_stn]
    errores: [ErrorData_xm_stn]
  }

  type DataXmIpr {
    id: ID!
    creador: Int
    empresa_id: String
    anho: Int!
    mes: Int!
    strID: String!
    agrupaORMercado: String!
    fechavigencia: String!
    conceptoID: String!
    nivelEntrada: Int!
    nivelSalida: Int!
    valor: Float!
  }

  input DataXmIprInput {
    creador: Int
    empresa_id: String
    anho: Int!
    mes: Int!
    strID: String!
    agrupaORMercado: String!
    fechavigencia: String!
    conceptoID: String!
    nivelEntrada: Int!
    nivelSalida: Int!
    valor: Float!
  }

  type DataXmIprResponse {
    records: [DataXmIpr]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type ResponseDataXmIpr {
    datos: [DataXmIpr]
    errores: [ErrorDataXmIpr]
  }

  type ErrorDataXmIpr {
    tipo: String
    mensaje: String
    registrosErrores: DataXmIpr
  }

  type DataXmD015Response {
    records: [Data_xm_d015]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type ResponseDataXmD015 {
    datos: [Data_xm_d015]
    errores: [ErrorDataXmD015]
  }

  type ErrorDataXmD015 {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_d015
  }
  type DataXmCprog {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    agente: String
    cargo_cprog_cop_kwh: Float
  }

  input DataXmCprogInput {
    anho: Int!
    mes: Int!
    agente: String!
    cargo_cprog_cop_kwh: Float!
  }

  type DataXmCprogResponse {
    records: [DataXmCprog]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type ResponseDataXmCprog {
    datos: [DataXmCprog]
    errores: [ErrorDataXmCprog]
  }

  type ErrorDataXmCprog {
    tipo: String
    mensaje: String
    registrosErrores: DataXmCprog
  }

  type DataRes_componentes_cu_tarifaResponse {
    records: [Res_componentes_cu_tarifa]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type ResponseRes_componentes_cu_tarifa {
    datos: [Res_componentes_cu_tarifa]
    errores: [ErrorRes_componentes_cu_tarifa]
  }

  type ErrorRes_componentes_cu_tarifa {
    tipo: String
    mensaje: String
    registrosErrores: Res_componentes_cu_tarifa
  }
  type Data_dane_ipp {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    tipo: String
    ipp_pn_produccion_nacional: Float
    ipp_pn_agricultura_ganaderia_pesca: Float
    ipp_pn_mineria: Float
    ipp_pn_industria: Float
    ipp_oi_oferta_interna: Float
    ipp_oi_agricultura_ganaderia_pesca: Float
    ipp_oi_mineria: Float
    ipp_oi_industria: Float
    ipp_pd_productos_consumo_interno: Float
    ipp_pd_importados: Float
    ipp_pd_exportados: Float
  }
  input Data_dane_ippInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    tipo: String
    ipp_pn_produccion_nacional: Float
    ipp_pn_agricultura_ganaderia_pesca: Float
    ipp_pn_mineria: Float
    ipp_pn_industria: Float
    ipp_oi_oferta_interna: Float
    ipp_oi_agricultura_ganaderia_pesca: Float
    ipp_oi_mineria: Float
    ipp_oi_industria: Float
    ipp_pd_productos_consumo_interno: Float
    ipp_pd_importados: Float
    ipp_pd_exportados: Float
  }

  type ErrorData_dane_ipp {
    tipo: String
    mensaje: String
    registrosErrores: Data_dane_ipp
  }

  type ResponseData_dane_ipp {
    datos: [Data_dane_ipp]
    errores: [ErrorData_dane_ipp]
  }

  type Data_dane_ipc {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    ipc: Float
  }
  input Data_dane_ipcInput {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    ipc: Float
  }

  type ErrorData_dane_ipc {
    tipo: String
    mensaje: String
    registrosErrores: Data_dane_ipc
  }

  type ResponseData_dane_ipc {
    datos: [Data_dane_ipc]
    errores: [ErrorData_dane_ipc]
  }
  type Data_dane_ipcResponse {
    records: [Data_dane_ipc]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type Data_dane_ippResponse {
    records: [Data_dane_ipp]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type DataXmTservResponse {
    records: [Data_xm_tserv]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type ResponseDataXmTserv {
    datos: [Data_xm_tserv]
    errores: [ErrorDataXmTserv]
  }

  type ErrorDataXmTserv {
    tipo: String
    mensaje: String
    registrosErrores: Data_xm_tserv
  }

  type DataFormulario1SSPD {
    id: ID
    anho: Int
    mes: Int
    recuperacion_garantias: String
    observacion_recuperacion_garantias: String
    creador: Int
    empresa_id: String
  }

  type DataFormulario1SSPD_Response {
    registros: [DataFormulario1SSPD]
    totalPages: Int
  }

  type DataFormato2SSPD {
    id: ID
    anho: Int
    mes: Int
    tipo_garantia: String
    nit_beneficiario: Int
    dv_beneficiario: Int
    emisor: String
    numero_garantia: String
    mes_recuperacion: Int
    fecha_inicio_vigencia: String
    fecha_finalizacion_vigencia: String
    valor_total_garantia: Float
    costo_garantia: Float
    costo_a_recuperar: Float
  }

  type DataFormato2SSPD_Response {
    registros: [DataFormato2SSPD]
    totalPages: Int
  }

  type DataFormato3SSPD {
    id: ID
    anho: Int
    mes: Int
    idMercado: String
    cargoHorario: String
    inicioFranjaHoraria: String
    finFranjaHoraria: String
    estratoOSector: String
    porcentajeSubsidiado100OR: Float
    porcentajeSubsidiado50OR: Float
    porcentajeSubsidiado0OR: Float
    tarifaNivel1100OR: Float
    tarifaNivel150OR: Float
    tarifaNivel10OR: Float
    tarifaNivel2: Float
    tarifaNivel3: Float
    tarifaNivel4: Float
    cfm: Float
    fechaPublicacion: String
    diarioPublicacion: String
    tarifaOT: Float
  }

  type DataFormato3SSPD_Response {
    registros: [DataFormato3SSPD]
    totalPages: Int
  }

  type DataFormulario5SSPD {
    anho: Int
    mes: Int
    opcionTarifaria: String
    creador: Int
  }
  type DataFormulario5SSPD_Response {
    registros: [DataFormulario5SSPD]
    totalPages: Int
  }

  type DataFormato6SSPD {
    anho: Int
    mes: Int
    idMercado: String
    ntProp: Float
    pv: Float
    sam1: Float
    vRt1: Float
    cuvc: Float
    cuvm1: Float
    cuv: Float
    vRm1: Float
    rEM: Float
    sam: Float
    aplicoOpcionTarifaria: String
  }

  type DataFormato6SSPD_Response {
    registros: [DataFormato6SSPD]
    totalPages: Int
  }

  type DataFormato9SSPD {
    id: ID
    creador: Int
    empresa_id: String
    anho: Int
    mes: Int
    idmercado: Int
    ecc: Int
    vecc: String

    aecc: Int
    avecc: Int
    amc: Float
    cb_mr: String
    vcb_mr: String
    acb_mr: Int
    avcbmr: Int
    cb_mnr: Int
    vcb_mnr: Int
    agpe: Float
    gd: Float
    gtr: Float
    cug: Float
    clp: Int
    aclp: Int
    w: Float
    psa: Float
    egp: Float
    adm: Int
    vrm1: Int
    i: Float
    aj: Float
    alfa: Float
    dcr_agpe: Int
    admre: Int
    aprre_g: Int
    adr_iprstn: Int
    apr_iprstn: Int
    arest: Int
    cfj: Float
    rct: Float
    rcae: Float
    ifssri: Float
    ifoes: Float
    balancesubsidios: Float
    ano: Int
    trim: Int
    mgtrim: Int
    sub1: String
    sub2: String
    n: Float
    m: Float
    r1: Float
    r2: Float
    facturacion: String
    actividad: Int
    porc_creg_cx: Float
    porc_sspd_cx: Float
    costo_creg_valor: Int
    costo_sspd_valor: Int
    pui: Int
  }

  type DataFormato9SSPD_Response {
    registros: [DataFormato9SSPD]
    totalPages: Int
  }

  type DataFormato7SSPD_Response {
    registros: [DataFormato7SSPDs]
    totalPages: Int
  }

  type DataFormato7SSPDs {
  id: ID
    creador: Int
    empresa_id: String
    id_mercado: String!
    anho: Int!
    mes: Int!
    nt_prop: String!
    gm: Float!
    tm: Float!
    prnm: Float!
    dnm: Float!
    cvm: Float!
    rm: Float!
    cuvm: Float!
  
  }

  input DataFormato7SSPDsInput {

    anho: Int!
    mes: Int!
    id_mercado: String!
    nt_prop: String!
    gm: Float!
    tm: Float!
    prnm: Float!
    dnm: Float!
    cvm: Float!
    rm: Float!
    cuvm: Float!
  }
  

  type DataEmpresaEnergiaContratoAtipico {
    id: ID!
    anho: Int!
    mes: Int!
    id_contrato: Int!
    energia_comprada: Float!
    costo: Float!
    empresa_id: String
    creador: Int
    createdAt: String
    updatedAt: String
}

input DataEmpresaEnergiaContratoAtipicoInput {
    anho: Int!
    mes: Int!
    id_contrato: Int!
    energia_comprada: Float!
    costo: Float!
    empresa_id: String
    creador: Int
}



type DataEmpresaEnergiaContratoAtipicoResponse {
    records: [DataEmpresaEnergiaContratoAtipico]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
}



type ResponseDataEmpresaEnergiaContratoAtipico {
    datos: [DataEmpresaEnergiaContratoAtipico]
    errores: [ErrorDataEmpresaEnergiaContratoAtipico]
}

type ErrorDataEmpresaEnergiaContratoAtipico {
    tipo: String
    mensaje: String
    registrosErrores: DataEmpresaEnergiaContratoAtipico
}


type DataMmeValidacion {
  id: ID
  creador: Int
  empresa_id: String
  fecha: String!
  trimestre: Int!
  anho: Int!
  facturacion: String!
  subsidios: String!
  contribuciones: Int!
  contrib_no_recaud_desp_6m: Int!
  contrib_recaud_desp_de_conc: Int!
  giros_recibidos: String
  giro_sobrante: String
  ultimo_giro_incluido: Int
}

input DataMmeValidacionInput {
  id: ID
  creador: Int
  empresa_id: String
  fecha: String!
  trimestre: Int!
  anho: Int!
  facturacion: String!
  subsidios: String!
  contribuciones: Int!
  contrib_no_recaud_desp_6m: Int!
  contrib_recaud_desp_de_conc: Int!
  giros_recibidos: String!
  giro_sobrante: String
  ultimo_giro_incluido: Int
}

type DataMmeValidacionResponse {
  records: [DataMmeValidacion]
  totalRecords: Int
  valoresFiltrables: [ValoresFiltrables]
}

type ResponseDataMmeValidacion {
  datos: [DataMmeValidacion]
  errores: [ErrorDataMmeValidacion]
}

type ErrorDataMmeValidacion {
  tipo: String
  mensaje: String
  registrosErrores: DataMmeValidacion
}

type DataMmeGiro {
  id: ID!
  creador: Int
  empresa_id: String
  fecha: String!
  fondo: String!
  resolucion: String!
  link_resolucion: String!
  giro_cop: String!
}

input DataMmeGiroInput {
  id: ID
  creador: Int
  empresa_id: String
  fecha: String!
  fondo: String!
  resolucion: String!
  link_resolucion: String!
  giro_cop: String!
}

type DataMmeGiroResponse {
  records: [DataMmeGiro]
  totalRecords: Int
  valoresFiltrables: [ValoresFiltrables]
}

type ResponseDataMmeGiro {
  datos: [DataMmeGiro]
  errores: [ErrorDataMmeGiro]
}

type ErrorDataMmeGiro {
  tipo: String
  mensaje: String
  registrosErrores: DataMmeGiro
}


  type DataBanrepublicaTco {
    id: ID
    creador: Int
    anho_semana: String
    tasa_cred_com_credito_consumo: Float
    monto_cred_com_credito_consumo: Float
    tasa_cred_com_odinario: Float
    monto_cred_com_odinario: Float
    tasa__cred_com_preferencial_o_corporativo: Float
    monto__cred_com_preferencial_o_corporativo: Float
    tasa__cred_com_tesoreria: Float
    monto__cred_com_tesoreria: Float
    tasa_colocacion_banco_republica: Float
    monto_colocacion_banco_republica: Float
    tasa_colocacion_sin_tesoreria: Float
    monto_colocacion_sin_tesoreria: Float
    tasa_colocacion_total: Float
    monto_colocacion_total: Float
    empresa_id: String
    tasa_cred_com_odinario_31_365: Float
    monto_cred_com_odinario_31_365: Float 
  }

  input DataBanrepublicaTcoInput {
    creador: Int
    anho_semana: String
    tasa_cred_com_credito_consumo: Float
    monto_cred_com_credito_consumo: Float
    tasa_cred_com_odinario: Float
    monto_cred_com_odinario: Float
    tasa__cred_com_preferencial_o_corporativo: Float
    monto__cred_com_preferencial_o_corporativo: Float
    tasa__cred_com_tesoreria: Float
    monto__cred_com_tesoreria: Float
    tasa_colocacion_banco_republica: Float
    monto_colocacion_banco_republica: Float
    tasa_colocacion_sin_tesoreria: Float
    monto_colocacion_sin_tesoreria: Float
    tasa_colocacion_total: Float
    monto_colocacion_total: Float
    empresa_id: String
    tasa_cred_com_odinario_31_365: Float
    monto_cred_com_odinario_31_365: Float 
  }

  type DataBanrepublicaTcoResponse {
    records: [DataBanrepublicaTco]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

  type ResponseDataBanrepublicaTco {
    datos: [DataBanrepublicaTco]
    errores: [ErrorDataBanrepublicaTco]
  }

  type ErrorDataBanrepublicaTco {
    tipo: String
    mensaje: String
    registrosErrores: DataBanrepublicaTco
  }

 

    type DataBanrepublicaTcap {
      id: ID!
      creador: Int
      empresa_id: String
      fecha: String
      tasa_a_30_cdt_bancos_comerciales: Float
      monto_a_30_cdt_bancos_comerciales: Float
      tasa_entre_31_y_44_cdt_bancos_comerciales: Float
      monto_entre_31_y_44_cdt_bancos_comerciales: Float
      tasa_a_45_cdt_bancos_comerciales: Float
      monto_a_45_cdt_bancos_comerciales: Float
      tasa_entre_46_y_59_cdt_bancos_comerciales: Float
      monto_entre_46_y_59_cdt_bancos_comerciales: Float
      tasa_a_60_cdt_bancos_comerciales: Float
      monto_a_60_cdt_bancos_comerciales: Float
      tasa_entre_61_y_89_cdt_bancos_comerciales: Float
      monto_entre_61_y_89_cdt_bancos_comerciales: Float
      tasa_a_90_cdt_bancos_comerciales: Float
      monto_a_90_cdt_bancos_comerciales: Float
      tasa_entre_91_y_119_cdt_bancos_comerciales: Float
      monto_entre_91_y_119_cdt_bancos_comerciales: Float
      tasa_a_120_cdt_bancos_comerciales: Float
      monto_a_120_cdt_bancos_comerciales: Float
      tasa_entre_121_y_179_cdt_bancos_comerciales: Float
      monto_entre_121_y_179_cdt_bancos_comerciales: Float
      tasa_a_180_cdt_bancos_comerciales: Float
      monto_a_180_cdt_bancos_comerciales: Float
      tasa_entre_181_y_359_cdt_bancos_comerciales: Float
      monto_entre_181_y_359_cdt_bancos_comerciales: Float
      tasa_a_360_cdt_bancos_comerciales: Float
      monto_a_360_cdt_bancos_comerciales: Float
      tasa_superiores_a_360_cdt_bancos_comerciales: Float
      monto_superiores_a_360_cdt_bancos_comerciales: Float
      tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales: Float
      monto_cap_cdt_red_de_oficinas_cdt_bancos_comerciales: Float
      tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales: Float
      monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales: Float
      tasa_entre_2_y_14_cdats_cdat_bancos_comerciales: Float
      monto_entre_2_y_14_cdats_cdat_bancos_comerciales: Float
      tasa_entre_15_y_29_cdats_cdat_bancos_comerciales: Float
      monto_entre_15_y_29_cdat_bancos_comerciales: Float
      tasa_a_30_cdats_cdat_bancos_comerciales: Float
      monto_a_30_cdat_bancos_comerciales: Float
      tasa_entre_31_y_90_cdats_cdat_bancos_comerciales: Float
      monto_entre_31_y_90_cdat_bancos_comerciales: Float
      tasa_entre_91_y_180_cdats_cdat_bancos_comerciales: Float
      monto_entre_91_y_180_cdat_bancos_comerciales: Float
      tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales: Float
      monto_de_181_en_adelante_cdats_cdat_bancos_comerciales: Float
      tasa_cap_cdat_oficinas_cdat_bancos_comerciales: Float
      monto_cap_cdat_oficinas_cdat_bancos_comerciales: Float
    }
  
    input DataBanrepublicaTcapInput {
      creador: Int
      empresa_id: String
      fecha: String!
      tasa_a_30_cdt_bancos_comerciales: Float
      monto_a_30_cdt_bancos_comerciales: Float
      tasa_entre_31_y_44_cdt_bancos_comerciales: Float
      monto_entre_31_y_44_cdt_bancos_comerciales: Float
      tasa_a_45_cdt_bancos_comerciales: Float
      monto_a_45_cdt_bancos_comerciales: Float
      tasa_entre_46_y_59_cdt_bancos_comerciales: Float
      monto_entre_46_y_59_cdt_bancos_comerciales: Float
      tasa_a_60_cdt_bancos_comerciales: Float
      monto_a_60_cdt_bancos_comerciales: Float
      tasa_entre_61_y_89_cdt_bancos_comerciales: Float
      monto_entre_61_y_89_cdt_bancos_comerciales: Float
      tasa_a_90_cdt_bancos_comerciales: Float
      monto_a_90_cdt_bancos_comerciales: Float
      tasa_entre_91_y_119_cdt_bancos_comerciales: Float
      monto_entre_91_y_119_cdt_bancos_comerciales: Float
      tasa_a_120_cdt_bancos_comerciales: Float
      monto_a_120_cdt_bancos_comerciales: Float
      tasa_entre_121_y_179_cdt_bancos_comerciales: Float
      monto_entre_121_y_179_cdt_bancos_comerciales: Float
      tasa_a_180_cdt_bancos_comerciales: Float
      monto_a_180_cdt_bancos_comerciales: Float
      tasa_entre_181_y_359_cdt_bancos_comerciales: Float
      monto_entre_181_y_359_cdt_bancos_comerciales: Float
      tasa_a_360_cdt_bancos_comerciales: Float
      monto_a_360_cdt_bancos_comerciales: Float
      tasa_superiores_a_360_cdt_bancos_comerciales: Float
      monto_superiores_a_360_cdt_bancos_comerciales: Float
      tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales: Float
      monto_cap_cdt_red_de_oficinas_cdt_bancos_comerciales: Float
      tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales: Float
      monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales: Float
      tasa_entre_2_y_14_cdats_cdat_bancos_comerciales: Float
      monto_entre_2_y_14_cdats_cdat_bancos_comerciales: Float
      tasa_entre_15_y_29_cdats_cdat_bancos_comerciales: Float
      monto_entre_15_y_29_cdat_bancos_comerciales: Float
      tasa_a_30_cdats_cdat_bancos_comerciales: Float
      monto_a_30_cdat_bancos_comerciales: Float
      tasa_entre_31_y_90_cdats_cdat_bancos_comerciales: Float
      monto_entre_31_y_90_cdat_bancos_comerciales: Float
      tasa_entre_91_y_180_cdats_cdat_bancos_comerciales: Float
      monto_entre_91_y_180_cdat_bancos_comerciales: Float
      tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales: Float
      monto_de_181_en_adelante_cdats_cdat_bancos_comerciales: Float
      tasa_cap_cdat_oficinas_cdat_bancos_comerciales: Float
      monto_cap_cdat_oficinas_cdat_bancos_comerciales: Float
    }
  
    type ErrorDataBanrepublicaTca {
      tipo: String
      mensaje: String
      registrosErrores: DataBanrepublicaTcap
    }
    
    type DataBanrepublicaTcapMutationResponse {
      datos: [DataBanrepublicaTcap]
      errores: [ErrorDataBanrepublicaTca]
    }
    
  type DataBanrepublicaTcapResponse {
    records: [DataBanrepublicaTcap]
    totalRecords: Int
    valoresFiltrables: [ValoresFiltrables]
  }

type ReporteExcelResponse {
     excelBase64: String
     success: Boolean
     message: String
  }


  type Query {
    #Usuarios
    obtenerUsuario: Usuario
    #Afac
    obtenerAfac: [Afac]
    #datos_empresa
    obtenerData_empresa: [Data_empresa]
    obtenerData_xm_afac(options: QueryOptions!): DataXmAfacResponse

    #Query Data_xm_dspctto
    obtenerData_xm_dspctto(options: QueryOptions!): DataXmDspcttoResponse

    #Query Data_xm_trsm

    obtenerData_xm_trsm(options: QueryOptions!): DataXmTrsmResponse

    #Data_creg_cx
    obtenerData_creg_cx(options: QueryOptions!): DataCregCxResponse
    #Query Data_dane
    obtenerData_dane: [Data_dane]
    #Query Data_banrepublica_tcap
    obtenerData_banrepublica_tcap: [Data_banrepublica_tcap]
    #Query Data_banrepublica_tco
    obtenerData_banrepublica_tco: [Data_banrepublica_tco]
    #Query Data_mme_validacion
    obtenerData_mme_validacion: [Data_mme_validacion]
    #Query Data_mme_giro
    obtenerData_mme_giro: [Data_mme_giro]
    #Query Res_componentes_cu_tarifa
    obtenerRes_componentes_cu_tarifa: [Res_componentes_cu_tarifa]

    #Query Data_xm_guatape
    obtenerData_xm_guatape: [Data_xm_guatape]
    #Query Data_xm_cprog
    obtenerData_xm_cprog: [Data_xm_cprog]
    #Query Data_xm_ipr
    obtenerData_xm_ipr: [Data_xm_ipr]
    #Query Data_xm_d015
    obtenerData_xm_d015: [Data_xm_d015]
    #Query Data_xm_dtun
    obtenerData_xm_dtun: [Data_xm_dtun]
    #Query Data_empresa_anual
    obtenerData_empresa_anual: [Data_empresa_anual]
    #Query Data_xm_stn
    obtenerData_xm_stn(options: QueryOptions!): Data_xm_stnResponse

    #Query Data_xm_str
    obtenerData_xm_str(options: QueryOptions!): Data_xm_strResponse
    #Query data_empresa_garantia
    obtenerData_empresa_garantia: [Data_empresa_garantia]
    #Query Data_xm_trsd
    obtenerData_xm_trsd: [Data_xm_trsd]
    #Query data_empresa_agpe
    obtenerData_empresa_agpe: [Data_empresa_agpe]
    obtenerDataempresamessin(options: QueryOptions!): DataempresamessinResponse

    obtenerEmpresaGarantias(options: QueryOptions): ResponseEmpresaGarantia

    obtenerDataEmpresaAnual(options: QueryOptions!): DataEmpresaAnualResponse
    #Data_xm_adem
    obtenerData_xm_adem: [Data_xm_adem]
    #Data_xm_tserv
    obtenerData_xm_tserv: [Data_xm_tserv]
    obtenerDataXmIpr(options: QueryOptions!): DataXmIprResponse

    obtenerDataXmD015(options: QueryOptions!): DataXmD015Response
    obtenerDataXmCprog(options: QueryOptions!): DataXmCprogResponse

    obtenerResComponentesCuTarifas(
      options: QueryOptions!
    ): DataRes_componentes_cu_tarifaResponse
    #Query Data_dane_ipp
    obtenerData_dane_ipp(options: QueryOptions!): Data_dane_ippResponse
    #Query Data_dane_ipc
    obtenerData_dane_ipc(options: QueryOptions!): Data_dane_ipcResponse
    obtenerDataXmTserv(options: QueryOptions!): DataXmTservResponse

    obtenerDataFormulario1SSPD(
      selectedStartPeriod: String!
      selectedEndPeriod: String!
      page: Int!
      limit: Int!
    ): DataFormulario1SSPD_Response

    obtenerDataFormulario5SSPD(
      selectedStartPeriod: String!
      selectedEndPeriod: String!
      page: Int!
      limit: Int!
    ): DataFormulario5SSPD_Response

    obtenerDataFormato2SSPD(
      selectedStartPeriod: String!
      selectedEndPeriod: String!
      page: Int!
      limit: Int!
    ): DataFormato2SSPD_Response
    obtenerDataFormato3SSPD(
      selectedStartPeriod: String!
      selectedEndPeriod: String!
      page: Int!
      limit: Int!
    ): DataFormato3SSPD_Response

    obtenerDataFormato6SSPD(
      selectedStartPeriod: String!
      selectedEndPeriod: String!
      page: Int!
      limit: Int!
    ): DataFormato6SSPD_Response

    obtenerDataFormato9SSPD(
      selectedStartPeriod: String!
      selectedEndPeriod: String!
      page: Int!
      limit: Int!
    ): DataFormato9SSPD_Response

    obtenerDataFormato7SSPDs(
      selectedStartPeriod: String!
      selectedEndPeriod: String!
      page: Int!
      limit: Int!
    ): DataFormato7SSPD_Response

    obtenerDataEmpresaEnergiaContratoAtipico(options: QueryOptions!): DataEmpresaEnergiaContratoAtipicoResponse

    obtenerDataMmeValidacion(options: QueryOptions!): DataMmeValidacionResponse
    obtenerDataMmeGiro(options: QueryOptions!): DataMmeGiroResponse

    obtenerDataBanrepublicaTco(options: QueryOptions!): DataBanrepublicaTcoResponse
    obtenerDataBanrepublicaTcap(options: QueryOptions!): DataBanrepublicaTcapResponse
    
   obtenerDataReporteSSPDCIRCULARCREG1192017(
     options: QueryOptions!
    ): ReporteExcelResponse
  }
  type Mutation {
    #Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
    #Afac
    nuevoAfac(input: AfacInput): Afac
    #DataEmpresa
    nuevoDataempresa(input: DataempresaInput): Data_empresa
    #DataXmafac
    nuevoDataxmafac(input: DataxmafacInput): Data_xm_afac
    #DataXmadem
    nuevoDataxmadem(input: DataxmademInput): Data_xm_adem

    #DataXmtserv
    nuevoDataxmtserv(input: DataxmtservInput): Data_xm_tserv

    #Mutation DataXmtrsm
    nuevoData_creg_cx(input: Data_creg_cxInput): Data_creg_cx
    #MutationData_dane
    nuevoData_dane(input: Data_daneInput): Data_dane
    #MutationData_banrepublica_tcap
    nuevoData_banrepublica_tcap(
      input: Data_banrepublica_tcapInput
    ): Data_banrepublica_tcap
    #MutationData_banrepublica_tco
    nuevoData_banrepublica_tco(
      input: Data_banrepublica_tcoInput
    ): Data_banrepublica_tco
    #MutationData_mme_validacion
    nuevoData_mme_validacion(
      input: Data_mme_validacionInput
    ): Data_mme_validacion
    #MutationData_mme_giro
    nuevoData_mme_giro(input: Data_mme_giroInput): Data_mme_giro
    #MutationRes_componentes_cu_tarifa
    nuevoRes_componentes_cu_tarifa(
      input: Res_componentes_cu_tarifaInput
    ): Res_componentes_cu_tarifa

    #MutationData_xm_guatape
    nuevoData_xm_guatape(input: Data_xm_guatapeInput): Data_xm_guatape
    #MutationData_xm_cprog
    nuevoData_xm_cprog(input: [Data_xm_cprogInput]): ResponseData_xm_cprog
    #MutationData_xm_ipr
    nuevoData_xm_ipr(input: Data_xm_iprInput): Data_xm_ipr
    #MutationData_xm_d015
    nuevoData_xm_d015(input: [Data_xm_d015Input]): ResponseData_xm_d015
    #MutationData_xm_dtun
    nuevoData_xm_dtun(input: Data_xm_dtunInput): Data_xm_dtun
    #MutationData_empresa_anual
    nuevoData_empresa_anual(input: Data_empresa_anualInput): Data_empresa_anual
    #MutationData_mme_validacion Actualizar
    actualizarData_mme_validacion(
      id: ID!
      input: Data_mme_validacionInput
    ): Data_mme_validacion
    #Mutation DataEmpresa Eliminar
    eliminarDataEmpresa(id: ID!): String

    #Mutationdata_empresa_garantia
    nuevoData_empresa_garantia(
      input: Data_empresa_garantiaInput
    ): Data_empresa_garantia
    #MutationData_xm_trsd
    nuevoData_xm_trsd(input: Data_xm_trsdInput): Data_xm_trsd
    #MutationData_empresa_agpe
    nuevoData_empresa_agpe(input: Data_empresa_agpeInput): Data_empresa_agpe
    #MutationDataxmafacEliminar
    eliminarDataxmafac(id: ID!): String

    #MutationData_xm_cprogEliminar
    eliminarData_xm_cprog(id: ID!): String

    # Mutation para eliminar datos de la tabla Dataempresamessin
    eliminarDataempresamessin(ids: [ID!]!): [String]
    #MutationDataempresamessin
    nuevoDataempresamessin(
      input: [DataempresamessinInput]
    ): ResponseDataempresamessin

    nuevoEmpresaGarantia(input: [EmpresaGarantiaInput]): ResponseEmpresaGarantia
    actualizarEmpresaGarantia(
      id: ID!
      input: EmpresaGarantiaInput!
    ): EmpresaGarantia
    eliminarEmpresaGarantia(ids: [ID!]!): [String]
    nuevoDataEmpresaAnual(
      input: [DataEmpresaAnualInput]
    ): ResponseDataEmpresaAnual

    actualizarDataEmpresaAnual(
      id: ID!
      input: DataEmpresaAnualInput!
    ): DataEmpresaAnual
    eliminarDataEmpresaAnual(id: ID!): Boolean

    #MutationData_xm_afac
    nuevoData_xm_afac(input: [DataxmafacInput]): ResponseData_xm_afac

    # Mutation para eliminar datos de la tabla Data_xm_afac
    eliminarData_xm_afac(ids: [ID!]!): [String]

    # Mutation para actualizar datos de la tablaData_xm_afac
    actualizarData_xm_afac(id: ID!, input: DataxmafacInput): Data_xm_afac

    #MutationData_xm_dspctto
    nuevoData_xm_dspctto(input: [Data_xm_dspcttoInput]): ResponseData_xm_dspctto

    # Mutation para eliminar datos de la tabla Data_xm_dspctto
    eliminarData_xm_dspctto(ids: [ID!]!): [String]
    # Mutation para actualizar datos de la tablaData_xm_dspctto
    actualizarData_xm_dspctto(
      id: ID!
      input: Data_xm_dspcttoInput
    ): Data_xm_dspctto
    #MutationData_xm_trsm
    nuevoData_xm_trsm(input: [Data_xm_trsmInput]): ResponseData_xm_trsm

    # Mutation para eliminar datos de la tabla Data_xm_trsm
    eliminarData_xm_trsm(ids: [ID!]!): [String]

    # Mutation para actualizar datos de la tablaData_xm_trsm
    actualizarData_xm_trsm(id: ID!, input: Data_xm_trsmInput): Data_xm_trsm

    #MutationData_xm_stn
    nuevoData_xm_stn(input: [Data_xm_stnInput]): ResponseData_xm_stn

    # Mutation para eliminar datos de la tabla Data_xm_stn
    eliminarData_xm_stn(ids: [ID!]!): [String]

    # Mutation para actualizar datos de la tablaData_xm_stn
    actualizarData_xm_stn(id: ID!, input: Data_xm_stnInput): Data_xm_stn

    #MutationData_xm_str
    nuevoData_xm_str(input: [Data_xm_strInput]): ResponseData_xm_str

    # Mutation para eliminar datos de la tabla Data_xm_str
    eliminarData_xm_str(ids: [ID!]!): [String]

    # Mutation para actualizar datos de la tablaData_xm_str
    actualizarData_xm_str(id: ID!, input: Data_xm_strInput): Data_xm_str

    nuevoDataXmIpr(input: [DataXmIprInput]!): ResponseDataXmIpr
    actualizarDataXmIpr(id: ID!, input: DataXmIprInput!): DataXmIpr
    eliminarDataXmIpr(ids: [ID!]!): [String]
    nuevoDataXmD015(input: [Data_xm_d015Input]): ResponseDataXmD015
    actualizarDataXmD015(id: ID!, input: Data_xm_d015Input): Data_xm_d015
    eliminarDataXmD015(ids: [ID!]!): [String]
    nuevoDataXmCprog(input: [DataXmCprogInput]): ResponseDataXmCprog
    actualizarDataXmCprog(id: ID!, input: DataXmCprogInput): DataXmCprog
    eliminarDataXmCprog(ids: [ID!]!): [String]

    nuevoResComponentesCuTarifa(
      input: [Res_componentes_cu_tarifaInput]
    ): ResponseRes_componentes_cu_tarifa
    actualizarResComponentesCuTarifa(
      id: ID!
      input: Res_componentes_cu_tarifaInput
    ): Res_componentes_cu_tarifa
    eliminarResComponentesCuTarifa(ids: [ID!]!): [String]

    #MutationData_dane_ipp
    nuevoData_dane_ipp(input: [Data_dane_ippInput]): ResponseData_dane_ipp

    # Mutation para eliminar datos de la tabla Data_dane_ipp
    eliminarData_dane_ipp(ids: [ID!]!): [String]
    # Mutation para actualizar datos de la tablaData_dane_ipp
    actualizarData_dane_ipp(id: ID!, input: Data_dane_ippInput): Data_dane_ipp

    #MutationData_dane_ipc
    nuevoData_dane_ipc(input: [Data_dane_ipcInput]): ResponseData_dane_ipc

    # Mutation para eliminar datos de la tabla Data_dane_ipc
    eliminarData_dane_ipc(ids: [ID!]!): [String]

    # Mutation para actualizar datos de la tablaData_dane_ipc
    actualizarData_dane_ipc(id: ID!, input: Data_dane_ipcInput): Data_dane_ipc

    nuevoDataXmTserv(input: [DataxmtservInput]): ResponseDataXmTserv
    actualizarDataXmTserv(id: ID!, input: DataxmtservInput): Data_xm_tserv
    eliminarDataXmTserv(ids: [ID!]!): [String]
    eliminarData_res_componentes_cu_tarifa(ids: [ID!]!): [String]

    nuevoDataFormato7SSPDs(input: DataFormato7SSPDsInput!): DataFormato7SSPDs
    actualizarDataFormato7SSPDs(
      id: ID!
      input: DataFormato7SSPDsInput!
    ): DataFormato7SSPDs
    eliminarDataFormato7SSPDs(ids: [ID!]!): [ID!]
    nuevoDataEmpresaEnergiaContratoAtipico(input: [DataEmpresaEnergiaContratoAtipicoInput!]!): ResponseDataEmpresaEnergiaContratoAtipico
        actualizarDataEmpresaEnergiaContratoAtipico(id: ID!, input: DataEmpresaEnergiaContratoAtipicoInput!): DataEmpresaEnergiaContratoAtipico
        eliminarDataEmpresaEnergiaContratoAtipico(ids: [ID!]!): [String]

        nuevoDataMmeValidacion(input: [DataMmeValidacionInput]): ResponseDataMmeValidacion
        actualizarDataMmeValidacion(id: ID!, input: DataMmeValidacionInput): DataMmeValidacion
        
        nuevoDataMmeGiro(input: [DataMmeGiroInput]): ResponseDataMmeGiro
  actualizarDataMmeGiro(id: ID!, input: DataMmeGiroInput): DataMmeGiro

  eliminarDataMmeGiro(ids: [ID!]!): [String]
  eliminarDataMmeValidacion(ids: [ID!]!): [String]

    nuevoDataBanrepublicaTco(input: [DataBanrepublicaTcoInput]): ResponseDataBanrepublicaTco
    actualizarDataBanrepublicaTco(id: ID!, input: DataBanrepublicaTcoInput): DataBanrepublicaTco
    eliminarDataBanrepublicaTco(ids: [ID!]!): [String]

    nuevoDataBanrepublicaTcap(input: [DataBanrepublicaTcapInput!]): DataBanrepublicaTcapMutationResponse
    actualizarDataBanrepublicaTcap(id: ID!, input: DataBanrepublicaTcapInput!): DataBanrepublicaTcapMutationResponse
    eliminarDataBanrepublicaTcap(ids: [ID!]): [String]

    nuevoDataBanrepublicaTco31365(input: [DataBanrepublicaTcoInput!]): ResponseDataBanrepublicaTco

    
  }
`;

module.exports = typeDefs;

