import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import Swal from "sweetalert2";

const NUEVO_DATA_RES_COMPONENTES_CU_TARIFA = gql`
  mutation nuevoRes_componentes_cu_tarifa(
    $input: Res_componentes_cu_tarifaInput
  ) {
    nuevoRes_componentes_cu_tarifa(input: $input) {
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
const OBTENER_RES_COMPONENTES_CU_TARIFA = gql`
  query obtenerRes_componentes_cu_tarifa {
    obtenerRes_componentes_cu_tarifa {
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
const OBTENER_DATA_DANE = gql`
  query obtenerData_dane {
    obtenerData_dane {
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
  query obtenerUsuario {
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
    obtenerData_empresa {
      id
      anho
      mes
      empresa_id
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
      valor
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

const OBTENER_DATA_XM_AFAC = gql`
  query obtenerData_xm_afac {
    obtenerData_xm_afac {
      id
      anho
      mes
      empresa_id
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

const OBTENER_DATA_MME_VALIDACION = gql`
  query obtenerData_mme_validacion {
    obtenerData_mme_validacion {
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

const OBTENER_DATA_MME_GIRO = gql`
  query obtenerData_mme_giro {
    obtenerData_mme_giro {
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
  query obtenerData_creg_cx {
    obtenerData_creg_cx {
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
  query obtenerData_banrepublica_tco {
    obtenerData_banrepublica_tco {
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
  query obtenerData_banrepublica_tcap {
    obtenerData_banrepublica_tcap {
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
  query obtenerDataxmstn {
    obtenerDataxmstn {
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
  query obtenerData_xm_cprog {
    obtenerData_xm_cprog {
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
  query obtenerData_xm_d015 {
    obtenerData_xm_d015 {
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
  query obtenerData_xm_dtun {
    obtenerData_xm_dtun {
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
  query obtenerData_xm_ipr {
    obtenerData_xm_ipr {
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
const OBTENER_DATA_XM_GUATAPE = gql`
  query obtenerData_xm_guatape {
    obtenerData_xm_guatape {
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

const OBTENER_DATA_EMPRESA_ANUAL = gql`
  query obtenerData_empresa_anual {
    obtenerData_empresa_anual {
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

const ACTUALIZATDATA_MME_VALIDACION = gql`
  mutation actualizarData_mme_validacion(
    $actualizarDataMmeValidacionId: ID!
    $input: Data_mme_validacionInput
  ) {
    actualizarData_mme_validacion(
      id: $actualizarDataMmeValidacionId
      input: $input
    ) {
      giro_sobrante
      ultimo_giro_incluido
    }
  }
`;

const OBTENER_DATA_XM_STR = gql`
  query obtenerData_xm_str {
    obtenerData_xm_str {
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
const OBTENER_DATA_EMPRESA_GARANTIA = gql`
  query obtenerData_empresa_garantia {
    obtenerData_empresa_garantia {
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

const OBTENER_DATA_EMPRESA_AGPE = gql`
  query obtenerData_empresa_agpe {
    obtenerData_empresa_agpe {
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

const NuevoCalculo_CU = (props) => {
  const {
    data: data1,
    error: error1,
    loading: loading1,
  } = useQuery(OBTENER_DATA_DANE);
  const {
    data: data2,
    error: error2,
    loading: loading2,
  } = useQuery(OBTENER_USUARIO);
  const {
    data: data3,
    error: error3,
    loading: loading3,
  } = useQuery(OBTENER_DATA_EMPRESAS);
  const {
    data: data4,
    error: error4,
    loading: loading4,
  } = useQuery(OBTENER_DATA_XM_TSERV);
  const {
    data: data5,
    error: error5,
    loading: loading5,
  } = useQuery(OBTENER_DATA_XM_TRSM);
  const {
    data: data6,
    error: error6,
    loading: loading6,
  } = useQuery(OBTENER_DATA_XM_DSPCTTO);
  const {
    data: data7,
    error: error7,
    loading: loading7,
  } = useQuery(OBTENER_DATA_XM_AFAC);
  const {
    data: data8,
    error: error8,
    loading: loading8,
  } = useQuery(OBTENER_DATA_XM_ADEM);
  const {
    data: data9,
    error: error9,
    loading: loading9,
  } = useQuery(OBTENER_DATA_MME_VALIDACION);
  const {
    data: data10,
    error: error10,
    loading: loading10,
  } = useQuery(OBTENER_DATA_MME_GIRO);
  const {
    data: data11,
    error: error11,
    loading: loading11,
  } = useQuery(OBTENER_DATA_CREG_CX);
  const {
    data: data12,
    error: error12,
    loading: loading12,
  } = useQuery(OBTENER_DATA_BANREPUBLICA_TCO);
  const {
    data: data13,
    error: error13,
    loading: loading13,
  } = useQuery(OBTENER_DATA_BANREPUBLICA_TCAP);
  const {
    data: data14,
    error: error14,
    loading: loading14,
  } = useQuery(OBTENER_DATA_DATAXMSTN);
  const {
    data: data15,
    error: error15,
    loading: loading15,
  } = useQuery(OBTENER_DATA_XM_CPROG);
  const {
    data: data16,
    error: error16,
    loading: loading16,
  } = useQuery(OBTENER_DATA_XM_IPR);
  const {
    data: data17,
    error: error17,
    loading: loading17,
  } = useQuery(OBTENER_DATA_XM_D015);
  const {
    data: data18,
    error: error18,
    loading: loading18,
  } = useQuery(OBTENER_DATA_XM_DTUN);
  const {
    data: data19,
    error: error19,
    loading: loading19,
  } = useQuery(OBTENER_DATA_XM_GUATAPE);
  const {
    data: data20,
    error: error20,
    loading: loading20,
  } = useQuery(OBTENER_RES_COMPONENTES_CU_TARIFA);
  const {
    data: data21,
    error: error21,
    loading: loading21,
  } = useQuery(OBTENER_DATA_EMPRESA_ANUAL);
  const {
    data: data22,
    error: error22,
    loading: loading22,
  } = useQuery(OBTENER_DATA_XM_STR);
  const {
    data: data23,
    error: error23,
    loading: loading23,
  } = useQuery(OBTENER_DATA_EMPRESA_GARANTIA);
  const {
    data: data24,
    error: error24,
    loading: loading24,
  } = useQuery(OBTENER_DATA_EMPRESA_AGPE);
  const [actualizarData_mme_validacion] = useMutation(
    ACTUALIZATDATA_MME_VALIDACION
  );
  const [nuevoRes_componentes_cu_tarifa] = useMutation(
    NUEVO_DATA_RES_COMPONENTES_CU_TARIFA,
    {
      update(cache, { data: { nuevoRes_componentes_cu_tarifa } }) {
        // Obtener el objeto de cache que deseamos actualizar
        const { obtenerRes_componentes_cu_tarifa } = cache.readQuery({
          query: OBTENER_RES_COMPONENTES_CU_TARIFA,
        });
        // Reescribimos el cache ( el cache nunca se debe modificar )
        cache.writeQuery({
          query: OBTENER_RES_COMPONENTES_CU_TARIFA,
          data: {
            obtenerRes_componentes_cu_tarifa: [
              ...obtenerRes_componentes_cu_tarifa,
              nuevoRes_componentes_cu_tarifa,
            ],
          },
        });
      },
    }
  );

  const [creador, setCreador] = useState(0);
  const [anho, setAnho] = useState(props.anho);
  const [mes, setMes] = useState(props.mes);
  const [qc, setQc] = useState(0);
  const [mc, setMc] = useState(0);
  const [pc, setPc] = useState(0);
  const [pcSub, setPcSub] = useState(0);
  const [kwhSubasta, setKwhSubasta] = useState(0);
  const [kwhBilaterales, setKwhBilaterales] = useState(0);
  const [ref_g, setRef_G] = useState(0);
  const [max_g, setMax_G] = useState(0);
  const [cr, setCr] = useState(0);
  const [ad, setAd] = useState(0);
  const [aj, setAj] = useState(0);
  const [pb, setPb] = useState(0);
  const [gc, setGc] = useState(0);
  const [tx, setTx] = useState(0);
  const [dtun_nt1_e, setDtun_Nt1_E] = useState(0);
  const [dtun_nt1_c, setDtun_Nt1_C] = useState(0);
  const [dtun_nt1_p, setDtun_Nt1_P] = useState(0);
  const [dtun_nt2, setDtun_Nt2] = useState(0);
  const [dtun_nt3, setDtun_Nt3] = useState(0);
  const [cdi_100, setCdi_100] = useState(0);
  const [cdi_50, setCdi_50] = useState(0);
  const [cdm, setCdm] = useState(0);
  const [cd4, setCd4] = useState(0);
  const [cd3, setCd3] = useState(0);
  const [cd2, setCd2] = useState(0);
  const [dnt1, setDnt1] = useState(0);
  const [dnt2, setDnt2] = useState(0);
  const [dnt3, setDnt3] = useState(0);
  const [dnt4, setDnt4] = useState(0);
  const [crs, setCrs] = useState(0);
  const [rcal, setRcal] = useState(0);
  const [r, setR] = useState(0);
  const [iprstn, setIprstn] = useState(0);
  const [pr_nt1, setPr_Nt1] = useState(0);
  const [pr_nt2, setPr_Nt2] = useState(0);
  const [pr_nt3, setPr_Nt3] = useState(0);
  const [pr_nt4, setPr_Nt4] = useState(0);
  const [cer, setCer] = useState(0);
  const [cfm, setCfm] = useState(0);
  const [x, setX] = useState(0);
  const [rc, setRc] = useState(0);
  const [ul_trim_val_mme, setUl_Trim_Val_Mme] = useState(0);
  const [anho_ul_trim_val_mme, setAnho_Ul_Trim_Val_Mme] = useState(0);
  const [sub1, setSub1] = useState(0);
  const [sub2, setSub2] = useState(0);
  const [n_sub1, setN_Sub1] = useState(0);
  const [m_sub2, setM_Sub2] = useState(0);
  const [facturacion_t, setFacturacion_T] = useState(0);
  const [r1, setR1] = useState(0);
  const [r2, setR2] = useState(0);
  const [sup_def, setSup_Def] = useState(0);
  const [cfs, setCfs] = useState(0);
  const [cfe, setCfe] = useState(0);
  const [c_ast, setC_Ast] = useState(0);
  const [cg, setCg] = useState(0);
  const [cgcu, setCgcu] = useState(0);
  const [cgsubasta, setCgsubasta] = useState(0);
  const [cvr, setCvr] = useState(0);
  const [cv, setCv] = useState(0);
  const [cu_nt1_100, setCu_Nt1_100] = useState(0);
  const [cu_nt1_50, setCu_Nt1_50] = useState(0);
  const [cu_nt1_0, setCu_Nt1_0] = useState(0);
  const [cu_nt2, setCu_Nt2] = useState(0);
  const [cu_nt3, setCu_Nt3] = useState(0);
  const [cu_nt4, setCu_Nt4] = useState(0);
  const [nt1_100_estrato_1_men_cs, setNt1_100_Estrato_1_Men_Cs] = useState(0);
  const [nt1_100_estrato_2_men_cs, setNt1_100_Estrato_2_Men_Cs] = useState(0);
  const [nt1_100_estrato_3_men_cs, setNt1_100_Estrato_3_Men_Cs] = useState(0);
  const [nt1_100_estrato_4_men_cs, setNt1_100_Estrato_4_Men_Cs] = useState(0);
  const [nt1_100_estrato_5_men_cs, setNt1_100_Estrato_5_Men_Cs] = useState(0);
  const [nt1_100_estrato_6_men_cs, setNt1_100_Estrato_6_Men_Cs] = useState(0);
  const [nt1_100_estrato_4, setNt1_100_Estrato_4] = useState(0);
  const [nt1_100_estrato_5, setNt1_100_Estrato_5] = useState(0);
  const [nt1_100_estrato_6, setNt1_100_Estrato_6] = useState(0);
  const [nt1_100_c, setNt1_100_C] = useState(0);
  const [nt1_100_i_con_c, setNt1_100_I_Con_C] = useState(0);
  const [nt1_100_i_sin_c, setNt1_100_I_Sin_C] = useState(0);
  const [nt1_100_p, setNt1_100_P] = useState(0);
  const [nt1_100_o, setNt1_100_O] = useState(0);
  const [nt1_50_estrato_1_men_cs, setNt1_50__Estrato_1_Men_Cs] = useState(0);
  const [nt1_50_estrato_2_men_cs, setNt1_50__Estrato_2_Men_Cs] = useState(0);
  const [nt1_50_estrato_3_men_cs, setNt1_50__Estrato_3_Men_Cs] = useState(0);
  const [nt1_50_estrato_4_men_cs, setNt1_50__Estrato_4_Men_Cs] = useState(0);
  const [nt1_50_estrato_5_men_cs, setNt1_50__Estrato_5_Men_Cs] = useState(0);
  const [nt1_50_estrato_6_men_cs, setNt1_50__Estrato_6_Men_Cs] = useState(0);
  const [nt1_50_estrato_4, setNt1_50__Estrato_4] = useState(0);
  const [nt1_50_estrato_5, setNt1_50__Estrato_5] = useState(0);
  const [nt1_50_estrato_6, setNt1_50__Estrato_6] = useState(0);
  const [nt1_50_c, setNt1_50__C] = useState(0);
  const [nt1_50_i_con_c, setNt1_50__I_Con_C] = useState(0);
  const [nt1_50_i_sin_c, setNt1_50__I_Sin_C] = useState(0);
  const [nt1_50_p, setNt1_50__P] = useState(0);
  const [nt1_50_o, setNt1_50__O] = useState(0);
  const [nt1_0_estrato_1_men_cs, setNt1_0_Estrato_1_Men_Cs] = useState(0);
  const [nt1_0_estrato_2_men_cs, setNt1_0_Estrato_2_Men_Cs] = useState(0);
  const [nt1_0_estrato_3_men_cs, setNt1_0_Estrato_3_Men_Cs] = useState(0);
  const [nt1_0_estrato_4_men_cs, setNt1_0_Estrato_4_Men_Cs] = useState(0);
  const [nt1_0_estrato_5_men_cs, setNt1_0_Estrato_5_Men_Cs] = useState(0);
  const [nt1_0_estrato_6_men_cs, setNt1_0_Estrato_6_Men_Cs] = useState(0);
  const [nt1_0_estrato_4, setNt1_0_Estrato_4] = useState(0);
  const [nt1_0_estrato_5, setNt1_0_Estrato_5] = useState(0);
  const [nt1_0_estrato_6, setNt1_0_Estrato_6] = useState(0);
  const [nt1_0_c, setNt1_0_C] = useState(0);
  const [nt1_0_i_con_c, setNt1_0_I_Con_C] = useState(0);
  const [nt1_0_i_sin_c, setNt1_0_I_Sin_C] = useState(0);
  const [nt1_0_p, setNt1_0_P] = useState(0);
  const [nt1_0_o, setNt1_0_O] = useState(0);
  const [nt2_c, setNt2_C] = useState(0);
  const [nt2_i_con_c, setNt2_I_Con_C] = useState(0);
  const [nt2_i_sin_c, setNt2_I_Sin_C] = useState(0);
  const [nt2_o, setNt2_O] = useState(0);
  const [nt2_ap, setNt2_Ap] = useState(0);
  const [nt2_bsnmen_cs, setNt2_Bsnmen_Cs] = useState(0);
  const [nt2_bsnmay_cs, setNt2_Bsnmay_Cs] = useState(0);
  const [nt3_c, setNt3_C] = useState(0);
  const [nt3_i_con_c, setNt3_I_Con_C] = useState(0);
  const [nt3_i_sin_c, setNt3_I_Sin_C] = useState(0);
  const [nt3_o, setNt3_O] = useState(0);
  const [nt3_ap, setNt3_Ap] = useState(0);
  const [nt2_estrato_1_men_cs, setNt2_estrato_1_men_cs] = useState(0);
  const [nt3_estrato_1_men_cs, setNt3_estrato_1_men_cs] = useState(0);
  const [nt4_estrato_1_men_cs, setNt4_estrato_1_men_cs] = useState(0);
  const [nt2_estrato_2_men_cs, setNt2_estrato_2_men_cs] = useState(0);
  const [nt3_estrato_2_men_cs, setNt3_estrato_2_men_cs] = useState(0);
  const [nt4_estrato_2_men_cs, setNt4_estrato_2_men_cs] = useState(0);
  const [empresa_id, setempresa_id] = useState(0);
  const [porc_subE1_100, setPorc_subE1_100] = useState(0);
  const [porc_subE2_100, setPorc_subE2_100] = useState(0);
  const [porc_subE1_50, setPorc_subE1_50] = useState(0);
  const [porc_subE2_50, setPorc_subE2_50] = useState(0);
  const [porc_subE1_0, setPorc_subE1_0] = useState(0);
  const [porc_subE2_0, setPorc_subE2_0] = useState(0);
  const [porc_subE1_NT2, setPorc_subE1_NT2] = useState(0);
  const [porc_subE1_NT3, setPorc_subE1_NT3] = useState(0);
  const [porc_subE1_NT4, setPorc_subE1_NT4] = useState(0);
  const [porc_subE2_NT2, setPorc_subE2_NT2] = useState(0);
  const [porc_subE2_NT3, setPorc_subE2_NT3] = useState(0);
  const [porc_subE2_NT4, setPorc_subE2_NT4] = useState(0);
  const [pv, setPv] = useState(0);
  const [cu_nt1_100_ot, setCu_Nt1_100_ot] = useState(0);
  const [cu_nt1_50_ot, setCu_Nt1_50_ot] = useState(0);
  const [cu_nt1_0_ot, setCu_Nt1_0_ot] = useState(0);
  const [cu_nt2_ot, setCu_Nt2_ot] = useState(0);
  const [cu_nt3_ot, setCu_Nt3_ot] = useState(0);
  const [cu_nt4_ot, setCu_Nt4_ot] = useState(0);
  const [saldo_nt1_100_ot, setSaldo_Nt1_100_ot] = useState(0);
  const [saldo_nt1_50_ot, setSaldo_Nt1_50_ot] = useState(0);
  const [saldo_nt1_0_ot, setSaldo_Nt1_0_ot] = useState(0);
  const [saldo_nt2_ot, setSaldo_Nt2_ot] = useState(0);
  const [saldo_nt3_ot, setSaldo_Nt3_ot] = useState(0);
  const [saldo_total_ot, setSaldo_Total_ot] = useState(0);
  const [giro_sobrante, setGiro_sobrante] = useState(0);
  const [tasaOt, setTasaot] = useState(0);
  const [ultimo_giro_incluido, setUltimo_giro_incluido] = useState(0);

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  let text = "";

  var data_empresa,
    data_empresam,
    data_empresam2,
    data_dane,
    data_danem,
    data_xm_afac,
    data_xm_afacm,
    data_danem2;
  if (mes === 1) {
    var mesm = 12;
    var anhom = anho - 1;
    var mesm2 = 11;
    var anhom2 = anho - 1;
  } else {
    if (mes === 2) {
      var mesm = mes - 1;
      var anhom = anho;
      var mesm2 = 12;
      var anhom2 = anho - 1;
    } else {
      var mesm = mes - 1;
      var anhom = anho;
      var mesm2 = mes - 2;
      var anhom2 = anho;
    }
  }

  function roundToTwo(num) {
    return +(Math.round(num + "e+5") + "e-5");
  }

  function dateRange(startDate, endDate) {
    var start = startDate.split("-");
    var end = endDate.split("-");
    var startYear = parseInt(start[0]);
    var endYear = parseInt(end[0]);
    var dates = [];

    for (var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
      for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        var month = j + 1;
        var displayMonth = month < 10 ? "0" + month : month;
        dates.push([i, displayMonth, "01"].join("-"));
      }
    }
    return dates;
  }

  useEffect(() => {
    if (loading2) return null;
    setCreador(parseInt(data2.obtenerUsuario.id));
    setempresa_id(data2.obtenerUsuario.empresa);
  }, []);

  const formik = useFormik({
    initialValues: {
      creador: creador,
      anho: anho,
      mes: mes,
      qc: qc,
      pc: pc,
      ref_g: ref_g,
      max_g: max_g,
      cr: cr,
      ad: ad,
      aj: aj,
      pb: pb,
      gc: gc,
      tx: tx,
      dtun_nt1_e: dtun_nt1_e,
      dtun_nt1_c: dtun_nt1_c,
      dtun_nt1_p: dtun_nt1_p,
      dtun_nt2: dtun_nt2,
      dtun_nt3: dtun_nt3,
      cdi_100: cdi_100,
      cdi_50: cdi_50,
      cdm: cdm,
      cd4: cd4,
      cd3: cd3,
      cd2: cd2,
      dnt1: dnt1,
      dnt2: dnt2,
      dnt3: dnt3,
      dnt4: dnt4,
      crs: crs,
      rcal: rcal,
      r: r,
      iprstn: iprstn,
      pr_nt1: pr_nt1,
      pr_nt2: pr_nt2,
      pr_nt3: pr_nt3,
      pr_nt4: pr_nt4,
      cer: cer,
      cfm: cfm,
      rc: rc,
      ul_trim_val_mme: ul_trim_val_mme,
      anho_ul_trim_val_mme: anho_ul_trim_val_mme,
      sub1: sub1,
      sub2: sub2,
      n_sub1: n_sub1,
      m_sub2: m_sub2,
      facturacion_t: facturacion_t.toString(),
      r1: r1,
      r2: r2,
      sup_def: sup_def,
      cfs: cfs,
      cfe: cfe,
      c_ast: c_ast,
      cg: cg,
      cgcu: cgcu,
      cvr: cvr,
      cv: cv,
      cu_nt1_100: cu_nt1_100,
      cu_nt1_50: cu_nt1_50,
      cu_nt1_0: cu_nt1_0,
      cu_nt2: cu_nt2,
      cu_nt3: cu_nt3,
      cu_nt4: cu_nt4,
      nt1_100_estrato_1_men_cs: nt1_100_estrato_1_men_cs,
      nt1_100_estrato_2_men_cs: nt1_100_estrato_2_men_cs,
      nt1_100_estrato_3_men_cs: nt1_100_estrato_3_men_cs,
      nt1_100_estrato_4_men_cs: nt1_100_estrato_4_men_cs,
      nt1_100_estrato_5_men_cs: nt1_100_estrato_5_men_cs,
      nt1_100_estrato_6_men_cs: nt1_100_estrato_6_men_cs,
      nt1_100_estrato_4: nt1_100_estrato_4,
      nt1_100_estrato_5: nt1_100_estrato_5,
      nt1_100_estrato_6: nt1_100_estrato_6,
      nt1_100_c: nt1_100_c,
      nt1_100_i_con_c: nt1_100_i_con_c,
      nt1_100_i_sin_c: nt1_100_i_sin_c,
      nt1_100_p: nt1_100_p,
      nt1_100_o: nt1_100_o,
      nt1_50_estrato_1_men_cs: nt1_50_estrato_1_men_cs,
      nt1_50_estrato_2_men_cs: nt1_50_estrato_2_men_cs,
      nt1_50_estrato_3_men_cs: nt1_50_estrato_3_men_cs,
      nt1_50_estrato_4_men_cs: nt1_50_estrato_4_men_cs,
      nt1_50_estrato_5_men_cs: nt1_50_estrato_5_men_cs,
      nt1_50_estrato_6_men_cs: nt1_50_estrato_6_men_cs,
      nt1_50_estrato_4: nt1_50_estrato_4,
      nt1_50_estrato_5: nt1_50_estrato_5,
      nt1_50_estrato_6: nt1_50_estrato_6,
      nt1_50_c: nt1_50_c,
      nt1_50_i_con_c: nt1_50_i_con_c,
      nt1_50_i_sin_c: nt1_50_i_sin_c,
      nt1_50_p: nt1_50_p,
      nt1_50_o: nt1_50_o,
      nt1_0_estrato_1_men_cs: nt1_0_estrato_1_men_cs,
      nt1_0_estrato_2_men_cs: nt1_0_estrato_2_men_cs,
      nt1_0_estrato_3_men_cs: nt1_0_estrato_3_men_cs,
      nt1_0_estrato_4_men_cs: nt1_0_estrato_4_men_cs,
      nt1_0_estrato_5_men_cs: nt1_0_estrato_5_men_cs,
      nt1_0_estrato_6_men_cs: nt1_0_estrato_6_men_cs,
      nt1_0_estrato_4: nt1_0_estrato_4,
      nt1_0_estrato_5: nt1_0_estrato_5,
      nt1_0_estrato_6: nt1_0_estrato_6,
      nt1_0_c: nt1_0_c,
      nt1_0_i_con_c: nt1_0_i_con_c,
      nt1_0_i_sin_c: nt1_0_i_sin_c,
      nt1_0_p: nt1_0_p,
      nt1_0_o: nt1_0_o,
      nt2_c: nt2_c,
      nt2_i_con_c: nt2_i_con_c,
      nt2_i_sin_c: nt2_i_sin_c,
      nt2_o: nt2_o,
      nt2_ap: nt2_ap,
      nt2_bsnmen_cs: nt2_bsnmen_cs,
      nt2_bsnmay_cs: nt2_bsnmay_cs,
      nt3_c: nt3_c,
      nt3_i_con_c: nt3_i_con_c,
      nt3_i_sin_c: nt3_i_sin_c,
      nt3_o: nt3_o,
      nt3_ap: nt3_ap,
      nt2_estrato_1_men_cs: nt2_estrato_1_men_cs,
      nt3_estrato_1_men_cs: nt3_estrato_1_men_cs,
      nt4_estrato_1_men_cs: nt4_estrato_1_men_cs,
      nt2_estrato_2_men_cs: nt2_estrato_2_men_cs,
      nt3_estrato_2_men_cs: nt3_estrato_2_men_cs,
      nt4_estrato_2_men_cs: nt4_estrato_2_men_cs,
      empresa_id: empresa_id,
      pv: pv,
      cu_nt1_100_ot: cu_nt1_100_ot,
      cu_nt1_50_ot: cu_nt1_50_ot,
      cu_nt1_0_ot: cu_nt1_0_ot,
      cu_nt2_ot: cu_nt2_ot,
      cu_nt3_ot: cu_nt3_ot,
      cu_nt4_ot: cu_nt4_ot,
      saldo_nt1_100_ot: saldo_nt1_100_ot,
      saldo_nt1_50_ot: saldo_nt1_50_ot,
      saldo_nt1_0_ot: saldo_nt1_0_ot,
      saldo_nt2_ot: saldo_nt2_ot,
      saldo_nt3_ot: saldo_nt3_ot,
      giro_sobrante: giro_sobrante,
      ultimo_giro_incluido: ultimo_giro_incluido,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      creador: Yup.string().required("El creador es obligatorio"),
    }),
    onSubmit: async (valores) => {
      setLoading(true);
      const {
        creador,
        anho,
        mes,
        qc,
        pc,
        ref_g,
        max_g,
        cr,
        ad,
        aj,
        pb,
        gc,
        tx,
        dtun_nt1_e,
        dtun_nt1_c,
        dtun_nt1_p,
        dtun_nt2,
        dtun_nt3,
        cdi_100,
        cdi_50,
        cdm,
        cd4,
        cd3,
        cd2,
        dnt1,
        dnt2,
        dnt3,
        dnt4,
        crs,
        rcal,
        r,
        iprstn,
        pr_nt1,
        pr_nt2,
        pr_nt3,
        pr_nt4,
        cer,
        cfm,
        rc,
        ul_trim_val_mme,
        anho_ul_trim_val_mme,
        sub1,
        sub2,
        n_sub1,
        m_sub2,
        facturacion_t,
        r1,
        r2,
        sup_def,
        cfs,
        cfe,
        c_ast,
        cg,
        cgcu,
        cvr,
        cv,
        cu_nt1_100,
        cu_nt1_50,
        cu_nt1_0,
        cu_nt2,
        cu_nt3,
        cu_nt4,
        nt1_100_estrato_1_men_cs,
        nt1_100_estrato_2_men_cs,
        nt1_100_estrato_3_men_cs,
        nt1_100_estrato_4_men_cs,
        nt1_100_estrato_5_men_cs,
        nt1_100_estrato_6_men_cs,
        nt1_100_estrato_4,
        nt1_100_estrato_5,
        nt1_100_estrato_6,
        nt1_100_c,
        nt1_100_i_con_c,
        nt1_100_i_sin_c,
        nt1_100_p,
        nt1_100_o,
        nt1_50_estrato_1_men_cs,
        nt1_50_estrato_2_men_cs,
        nt1_50_estrato_3_men_cs,
        nt1_50_estrato_4_men_cs,
        nt1_50_estrato_5_men_cs,
        nt1_50_estrato_6_men_cs,
        nt1_50_estrato_4,
        nt1_50_estrato_5,
        nt1_50_estrato_6,
        nt1_50_c,
        nt1_50_i_con_c,
        nt1_50_i_sin_c,
        nt1_50_p,
        nt1_50_o,
        nt1_0_estrato_1_men_cs,
        nt1_0_estrato_2_men_cs,
        nt1_0_estrato_3_men_cs,
        nt1_0_estrato_4_men_cs,
        nt1_0_estrato_5_men_cs,
        nt1_0_estrato_6_men_cs,
        nt1_0_estrato_4,
        nt1_0_estrato_5,
        nt1_0_estrato_6,
        nt1_0_c,
        nt1_0_i_con_c,
        nt1_0_i_sin_c,
        nt1_0_p,
        nt1_0_o,
        nt2_c,
        nt2_i_con_c,
        nt2_i_sin_c,
        nt2_o,
        nt2_ap,
        nt2_bsnmen_cs,
        nt2_bsnmay_cs,
        nt3_c,
        nt3_i_con_c,
        nt3_i_sin_c,
        nt3_o,
        nt3_ap,
        nt2_estrato_1_men_cs,
        nt3_estrato_1_men_cs,
        nt4_estrato_1_men_cs,
        nt2_estrato_2_men_cs,
        nt3_estrato_2_men_cs,
        nt4_estrato_2_men_cs,
        empresa_id,
        pv,
        cu_nt1_100_ot,
        cu_nt1_50_ot,
        cu_nt1_0_ot,
        cu_nt2_ot,
        cu_nt3_ot,
        cu_nt4_ot,
        saldo_nt1_100_ot,
        saldo_nt1_50_ot,
        saldo_nt1_0_ot,
        saldo_nt2_ot,
        saldo_nt3_ot,
        giro_sobrante,
        ultimo_giro_incluido,
      } = valores;
      Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
      setLoading(false);
      props.close();
      try {
        const { data } = await nuevoRes_componentes_cu_tarifa({
          variables: {
            input: {
              creador,
              anho,
              mes,
              qc,
              pc,
              ref_g,
              max_g,
              cr,
              ad,
              aj,
              pb,
              gc,
              tx,
              dtun_nt1_e,
              dtun_nt1_c,
              dtun_nt1_p,
              dtun_nt2,
              dtun_nt3,
              cdi_100,
              cdi_50,
              cdm,
              cd4,
              cd3,
              cd2,
              dnt1,
              dnt2,
              dnt3,
              dnt4,
              crs,
              rcal,
              r,
              iprstn,
              pr_nt1,
              pr_nt2,
              pr_nt3,
              pr_nt4,
              cer,
              cfm,
              rc,
              ul_trim_val_mme,
              anho_ul_trim_val_mme,
              sub1,
              sub2,
              n_sub1,
              m_sub2,
              facturacion_t,
              r1,
              r2,
              sup_def,
              cfs,
              cfe,
              c_ast,
              cg,
              cgcu,
              cvr,
              cv,
              cu_nt1_100,
              cu_nt1_50,
              cu_nt1_0,
              cu_nt2,
              cu_nt3,
              cu_nt4,
              nt1_100_estrato_1_men_cs,
              nt1_100_estrato_2_men_cs,
              nt1_100_estrato_3_men_cs,
              nt1_100_estrato_4_men_cs,
              nt1_100_estrato_5_men_cs,
              nt1_100_estrato_6_men_cs,
              nt1_100_estrato_4,
              nt1_100_estrato_5,
              nt1_100_estrato_6,
              nt1_100_c,
              nt1_100_i_con_c,
              nt1_100_i_sin_c,
              nt1_100_p,
              nt1_100_o,
              nt1_50_estrato_1_men_cs,
              nt1_50_estrato_2_men_cs,
              nt1_50_estrato_3_men_cs,
              nt1_50_estrato_4_men_cs,
              nt1_50_estrato_5_men_cs,
              nt1_50_estrato_6_men_cs,
              nt1_50_estrato_4,
              nt1_50_estrato_5,
              nt1_50_estrato_6,
              nt1_50_c,
              nt1_50_i_con_c,
              nt1_50_i_sin_c,
              nt1_50_p,
              nt1_50_o,
              nt1_0_estrato_1_men_cs,
              nt1_0_estrato_2_men_cs,
              nt1_0_estrato_3_men_cs,
              nt1_0_estrato_4_men_cs,
              nt1_0_estrato_5_men_cs,
              nt1_0_estrato_6_men_cs,
              nt1_0_estrato_4,
              nt1_0_estrato_5,
              nt1_0_estrato_6,
              nt1_0_c,
              nt1_0_i_con_c,
              nt1_0_i_sin_c,
              nt1_0_p,
              nt1_0_o,
              nt2_c,
              nt2_i_con_c,
              nt2_i_sin_c,
              nt2_o,
              nt2_ap,
              nt2_bsnmen_cs,
              nt2_bsnmay_cs,
              nt3_c,
              nt3_i_con_c,
              nt3_i_sin_c,
              nt3_o,
              nt3_ap,
              nt2_estrato_1_men_cs,
              nt3_estrato_1_men_cs,
              nt4_estrato_1_men_cs,
              nt2_estrato_2_men_cs,
              nt3_estrato_2_men_cs,
              nt4_estrato_2_men_cs,
              empresa_id,
              pv,
              cu_nt1_100_ot,
              cu_nt1_50_ot,
              cu_nt1_0_ot,
              cu_nt2_ot,
              cu_nt3_ot,
              cu_nt4_ot,
              saldo_nt1_100_ot,
              saldo_nt1_50_ot,
              saldo_nt1_0_ot,
              saldo_nt2_ot,
              saldo_nt3_ot,
              giro_sobrante,
              ultimo_giro_incluido,
            },
          },
        });
      } catch (error) {
        console.log(valores);
        console.log(error);
      }
    },
  });

  const actualizarData_mme_validaciogirosob = async (
    id_val,
    giro_sobranteb,
    ultimo_giro_incluidob
  ) => {
    try {
      const { Resultado } = await actualizarData_mme_validacion({
        variables: {
          actualizarDataMmeValidacionId: id_val,
          input: {
            ultimo_giro_incluido: ultimo_giro_incluidob,
            giro_sobrante: giro_sobranteb,
          },
        },
      });
    } catch (error) {
      console.log(error);
      // Handle any errors as appropriate
    }
  };

  // Calculo de Variables y componentes del CU

  useEffect(() => {
    if (
      !loading1 &&
      !loading2 &&
      !loading3 &&
      !loading4 &&
      !loading5 &&
      !loading6 &&
      !loading7 &&
      !loading8 &&
      !loading9 &&
      !loading9 &&
      !loading10 &&
      !loading11 &&
      !loading12 &&
      !loading13 &&
      !loading14 &&
      !loading15 &&
      !loading16 &&
      !loading17 &&
      !loading18 &&
      !loading19 &&
      !loading20 &&
      !loading21 &&
      !loading22
    ) {
      try {
        data_xm_afac = data7.obtenerData_xm_afac;
        data_xm_afacm = data_xm_afac.filter(
          (data_xm_afac) =>
            data_xm_afac.anho === anhom &&
            data_xm_afac.mes === mesm &&
            data_xm_afac.agente === data2.obtenerUsuario.empresa
        );
        const data_xm_dspctto = data6.obtenerData_xm_dspctto;
        const data_xm_dspcttom = data_xm_dspctto.filter(
          (data_xm_dspctto) =>
            data_xm_dspctto.anho === anhom &&
            data_xm_dspctto.mes === mesm &&
            data_xm_dspctto.comprador === data2.obtenerUsuario.empresa &&
            data_xm_dspctto.tipomerc === "R" &&
            data_xm_dspctto.tipoasigna === "CP"
        );
        const data_xm_dspcttomsub = data_xm_dspctto.filter(
          (data_xm_dspctto) =>
            data_xm_dspctto.anho === anhom &&
            data_xm_dspctto.mes === mesm &&
            data_xm_dspctto.comprador === data2.obtenerUsuario.empresa &&
            data_xm_dspctto.tipomerc === "R" &&
            data_xm_dspctto.tipoasigna === "SC"
        );
        var data_xm_trsm = data5.obtenerData_xm_trsm;
        var data_xm_trsmm = data_xm_trsm.filter(
          (data_xm_trsm) =>
            data_xm_trsm.anho === anhom &&
            data_xm_trsm.mes === mesm &&
            data_xm_trsm.empresa_id === data2.obtenerUsuario.empresa
        );
        var data_xm_trsmm2 = data_xm_trsm.filter(
          (data_xm_trsm) =>
            data_xm_trsm.anho === anhom2 &&
            data_xm_trsm.mes === mesm &&
            data_xm_trsm.empresa_id === data2.obtenerUsuario.empresa
        );

        var ipcm = data_xm_trsmm.filter(
          (data_xm_trsmm) =>
            data_xm_trsmm.codigo === "IPDC" &&
            data_xm_trsmm.anho === anhom &&
            data_xm_trsmm.mes === mesm
        )[0].valor;
        const ipcm2 = data_xm_trsmm2.filter(
          (data_xm_trsmm2) =>
            data_xm_trsmm2.codigo === "IPDC" &&
            data_xm_trsmm2.anho === anhom &&
            data_xm_trsmm2.mes === mesm
        )[0].valor;
        data_xm_trsm.anho === anhom && data_xm_trsm.mes === mesm;
        const data_xm_stn = data14.obtenerDataxmstn;
        const data_xm_stnm = data_xm_stn.filter(
          (data_xm_stn) =>
            data_xm_stn.anho === anho &&
            data_xm_stn.mes === mes &&
            data_xm_stn.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_guatape = data19.obtenerData_xm_guatape;
        const data_xm_guatapem = data_xm_guatape.filter(
          (data_xm_guatape) =>
            data_xm_guatape.anho === anho &&
            data_xm_guatape.mes === mes &&
            data_xm_guatape.agente === data2.obtenerUsuario.empresa &&
            data_xm_guatape.empresa_id === data2.obtenerUsuario.empresa
        );
        data_empresa = data3.obtenerData_empresa;
        data_empresam = data_empresa.filter(
          (data_empresa) =>
            data_empresa.anho === anhom &&
            data_empresa.mes === mesm &&
            data_empresa.empresa_id === data2.obtenerUsuario.empresa
        );
        data_empresam2 = data_empresa.filter(
          (data_empresa) =>
            data_empresa.anho === anhom2 &&
            data_empresa.mes === mesm2 &&
            data_empresa.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_creg_cx = data11.obtenerData_creg_cx;
        const data_creg_cxm = data_creg_cx.filter(
          (data_creg_cx) =>
            data_creg_cx.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_mme_validacion = data9.obtenerData_mme_validacion;
        const data_xm_mme_validacione = data_xm_mme_validacion.filter(
          (data_xm_mme_validacion) =>
            data_xm_mme_validacion.empresa_id === data2.obtenerUsuario.empresa
        );
        data_dane = data1.obtenerData_dane;
        data_danem = data_dane.filter(
          (data_dane) =>
            data_dane.anho === anhom &&
            data_dane.mes === mesm &&
            data_dane.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_adem = data8.obtenerData_xm_adem;
        const data_xm_ademm = data_xm_adem.filter(
          (data_xm_adem) =>
            data_xm_adem.anho === anhom &&
            data_xm_adem.mes === mesm &&
            data_xm_adem.empresa_id === data2.obtenerUsuario.empresa &&
            data_xm_adem.agente === data2.obtenerUsuario.empresa
        );
        const data_mme_giro = data10.obtenerData_mme_giro;
        const data_mme_giro_e = data_mme_giro.filter(
          (data_mme_giro) =>
            data_mme_giro.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_banrepublica_tco = data12.obtenerData_banrepublica_tco;
        const data_banrepublica_tco_e = data_banrepublica_tco.filter(
          (data_banrepublica_tco) =>
            data_banrepublica_tco.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_banrepublica_tcap = data13.obtenerData_banrepublica_tcap;
        const data_banrepublica_tcap_e = data_banrepublica_tcap.filter(
          (data_banrepublica_tcap) =>
            data_banrepublica_tcap.empresa_id === data2.obtenerUsuario.empresa
        );

        const data_Res_componentes_cu_tarifa =
          data20.obtenerRes_componentes_cu_tarifa;
        const data_Res_componentes_cu_tarifam =
          data_Res_componentes_cu_tarifa.filter(
            (data_Res_componentes_cu_tarifa) =>
              data_Res_componentes_cu_tarifa.anho === anhom &&
              data_Res_componentes_cu_tarifa.mes === mesm &&
              data_Res_componentes_cu_tarifa.empresa_id ===
                data2.obtenerUsuario.empresa
          );
        const data_empresa_garantias = data23.obtenerData_empresa_garantia;
        const data_empresa_garantiasm = data_empresa_garantias.filter(
          (data_empresa_garantias) =>
            Date.parse(data_empresa_garantias.fecha_inicio_vigencia) <=
              Date.parse(new Date(anhom2, mesm2, 30)) &&
            Date.parse(data_empresa_garantias.fecha_fin_vigencia) >=
              Date.parse(new Date(anhom2, mesm2, 30)) &&
            data_empresa_garantias.empresa_id === data2.obtenerUsuario.empresa
        );

        const data_xm_dtun = data18.obtenerData_xm_dtun;

        const data_xm_d015 = data17.obtenerData_xm_d015;
        const data_xm_d015m = data_xm_d015.filter(
          (data_xm_d015) =>
            data_xm_d015.anho === anho &&
            data_xm_d015.mes === mes &&
            data_xm_d015.empresa_id === data2.obtenerUsuario.empresa
        );
        console.log(data22);
        const data_xm_str = data22.obtenerData_xm_str;
        const data_xm_strm = data_xm_str.filter(
          (data_xm_str) =>
            data_xm_str.anho === anho &&
            data_xm_str.mes === mes &&
            data_xm_str.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_ipr = data16.obtenerData_xm_ipr;
        const data_xm_cprog = data15.obtenerData_xm_cprog;

        const data_empresa_anual = data21.obtenerData_empresa_anual;
        const data_empresaanualm = data_empresa_anual.filter(
          (data_empresa_anual) =>
            data_empresa_anual.anho === anho - 1 &&
            data_empresa_anual.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_tserv = data4.obtenerData_xm_tserv;

        const data_xm_tservmcnd = data_xm_tserv.filter(
          (data_xm_tserv) =>
            data_xm_tserv.anho === anhom &&
            data_xm_tserv.mes === mesm &&
            data_xm_tserv.agente === data2.obtenerUsuario.empresa &&
            data_xm_tserv.concepto === "CND" &&
            data_xm_tserv.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_tservmsic = data_xm_tserv.filter(
          (data_xm_tserv) =>
            data_xm_tserv.anho === anhom &&
            data_xm_tserv.mes === mesm &&
            data_xm_tserv.agente === data2.obtenerUsuario.empresa &&
            data_xm_tserv.concepto === "SIC" &&
            data_xm_tserv.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_tservmsiciva = data_xm_tserv.filter(
          (data_xm_tserv) =>
            data_xm_tserv.anho === anhom &&
            data_xm_tserv.mes === mesm &&
            data_xm_tserv.agente === data2.obtenerUsuario.empresa &&
            data_xm_tserv.concepto === "SIC_IVA" &&
            data_xm_tserv.empresa_id === data2.obtenerUsuario.empresa
        );

        const data_empresa_agpe = data24.obtenerData_empresa_agpe;
        const data_empresa_agpem = data_empresa_agpe.filter(
          (data_empresa_agpe) =>
            data_empresa_agpe.anho === anhom &&
            data_empresa_agpe.mes === mesm &&
            data_empresa_agpe.empresa_id === data2.obtenerUsuario.empresa
        );

        var q11,
          q21,
          qexc2,
          q3,
          qgd,
          aj_,
          w1,
          w2,
          qc_,
          mc_,
          name_mercado_or,
          name_sistema_or,
          name_or,
          alfa,
          tipoCalculo,
          PP1,
          PP21,
          PPExc2,
          PP3,
          PPGD,
          gTransitorio,
          max_g_,
          cr_,
          ad_,
          i_aj,
          pc_,
          pb_,
          pcSub_,
          cgsubasta_acu = 0,
          cgcu_acu = 0,
          cg_acu = 0,
          gc_,
          iprstn_,
          tx_,
          cer_;

        for (let index = 0; index < data_empresa_garantiasm.length; index++) {
          var meses_garantizados = dateRange(
            data_empresa_garantiasm[index].fecha_inicio_vigencia,
            data_empresa_garantiasm[index].fecha_fin_vigencia
          );

          if (
            data_empresa_garantiasm[index].tipo_garantia === "Subasta_FERNC"
          ) {
            cgsubasta_acu =
              +data_empresa_garantiasm[index].costo_garantia /
              meses_garantizados.length;
          }
          if (data_empresa_garantiasm[index].tipo_garantia === "MEM") {
            cg_acu =
              +data_empresa_garantiasm[index].costo_garantia /
              meses_garantizados.length;
          }
          if (data_empresa_garantiasm[index].tipo_garantia === "STR") {
            cgcu_acu =
              +data_empresa_garantiasm[index].costo_garantia /
              meses_garantizados.length;
          }
        }
        setCgsubasta(cgsubasta_acu);
        setCg(cg_acu);
        setCgcu(cgcu_acu);

        //Qc= Min(1-Qagd, ((C1+C2+SUM(l=3...n)(Cl))/DCR)

        var demandaRegulada = 0,
          perdidaRegulada = 0,
          dcr = 0,
          Energia_contratos = 0,
          Costo_contratos = 0,
          qagd;
        for (let index = 0; index < data_xm_ademm.length; index++) {
          if (data_xm_ademm[index].cod_contenido == "DMRE") {
            demandaRegulada =
              demandaRegulada +
              data_xm_ademm[index].cont_hora_1 +
              data_xm_ademm[index].cont_hora_2 +
              data_xm_ademm[index].cont_hora_3 +
              data_xm_ademm[index].cont_hora_4 +
              data_xm_ademm[index].cont_hora_5 +
              data_xm_ademm[index].cont_hora_6 +
              data_xm_ademm[index].cont_hora_7 +
              data_xm_ademm[index].cont_hora_8 +
              data_xm_ademm[index].cont_hora_9 +
              data_xm_ademm[index].cont_hora_10 +
              data_xm_ademm[index].cont_hora_11 +
              data_xm_ademm[index].cont_hora_12 +
              data_xm_ademm[index].cont_hora_13 +
              data_xm_ademm[index].cont_hora_14 +
              data_xm_ademm[index].cont_hora_15 +
              data_xm_ademm[index].cont_hora_16 +
              data_xm_ademm[index].cont_hora_17 +
              data_xm_ademm[index].cont_hora_18 +
              data_xm_ademm[index].cont_hora_19 +
              data_xm_ademm[index].cont_hora_20 +
              data_xm_ademm[index].cont_hora_21 +
              data_xm_ademm[index].cont_hora_22 +
              data_xm_ademm[index].cont_hora_23 +
              data_xm_ademm[index].cont_hora_24;
          }
          if (data_xm_ademm[index].cod_contenido == "PRRE") {
            perdidaRegulada =
              perdidaRegulada +
              data_xm_ademm[index].cont_hora_1 +
              data_xm_ademm[index].cont_hora_2 +
              data_xm_ademm[index].cont_hora_3 +
              data_xm_ademm[index].cont_hora_4 +
              data_xm_ademm[index].cont_hora_5 +
              data_xm_ademm[index].cont_hora_6 +
              data_xm_ademm[index].cont_hora_7 +
              data_xm_ademm[index].cont_hora_8 +
              data_xm_ademm[index].cont_hora_9 +
              data_xm_ademm[index].cont_hora_10 +
              data_xm_ademm[index].cont_hora_11 +
              data_xm_ademm[index].cont_hora_12 +
              data_xm_ademm[index].cont_hora_13 +
              data_xm_ademm[index].cont_hora_14 +
              data_xm_ademm[index].cont_hora_15 +
              data_xm_ademm[index].cont_hora_16 +
              data_xm_ademm[index].cont_hora_17 +
              data_xm_ademm[index].cont_hora_18 +
              data_xm_ademm[index].cont_hora_19 +
              data_xm_ademm[index].cont_hora_20 +
              data_xm_ademm[index].cont_hora_21 +
              data_xm_ademm[index].cont_hora_22 +
              data_xm_ademm[index].cont_hora_23 +
              data_xm_ademm[index].cont_hora_24;
          }
        }

        dcr = demandaRegulada + perdidaRegulada;
        //qagd=min(1, Q11+Q21+2+Q3+QGD)
        //Q11: 	Relación entre: i)  GExc1 Cantidad de excedentes de energía de los AGPE, con capacidad instalada o nominal menor o igual a 0,1 MW, que se les aplica crédito de energía de acuerdo con el literal a) del numeral 1) del artículo 25 de esta resolución, para el Comercializador Minorista i, liquidados en el mes m-1, con destino al mercado regulado; y ii) DCR
        //Q11= min(1,(SUM(Mercados j)(Usuarios AGPE)(GExc1))/DCR)
        //GExc1= Corresponde a la energía  de qué trata el artículo 26 de esta resolución, para el AGPE u, con capacidad instalada o nominal menor o igual a 0,1 MW, expresado en kWh, del Comercializador Minorista i, en el mercado de comercialización mj, en el mes m-1.
        //Exc1=	Excedente de energía horaria acumulada en el mes m con fines de uso para el crédito de energía para el usuario u, que se encuentra en el mercado de comercialización j y que es atendido por el comercializador i, en kWh. Se calcula como la suma de energía entregada a la red en todas las horas del mes m, iniciando a partir de la primera hora de dicho mes y que como máximo podría llegar al valor de Imp Por lo anterior, el valor resultante de energía puede tomar valores entre cero (0) y Imp
        //Q21: Relación entre: i) GExc1 21 cantidad de excedentes de energía de los AGPE, con capacidad instalada o nominal mayor a 0,1 MW y menor o igual a 1 MW, que se les aplica crédito de energía de acuerdo con el literal a) numeral 2) del artículo 25 de esta resolución, para el Comercializador Minorista i, liquidados en el mes m-1, con destino al mercado regulado; y ii) DCR
        //Q21= min(1,(SUM(Mercados j)(Usuarios AGPE)(GExc1 21))/DCR)
        //GExc1_21= Corresponde a la energía  de que trata el artículo 26 de esta resolución, para el AGPE u, con capacidad instalada o nominal mayor a 0,1 MW y menor o igual a 1 MW, expresado en kWh, del Comercializador Minorista i, en el mercado de comercialización mj, en el mes m-1.
        //QExc2: Relación entre: i) Exc2 cantidad de excedentes de energía de los AGPE, con capacidad instalada o nominal menor o igual a 1 MW, que les aplica lo establecido en los literales b) de los numerales 1) y 2) del artículo 25 de esta resolución, para el Comercializador Minorista i, liquidados en el mes m-1, con destino al mercado regulado; y ii)  Se calcula de la siguiente forma (valor adimensional):
        //QExc2= min(1,(SUM(Mercados j)(Usuarios AGPE)(horas(GExc2))/DCR)
        //GExc2: Todo excedente de energía en la hora h del AGPE u, en kWh, iniciando h en la hora hx para el mes m, en el mercado de comercialización j. Tener en cuenta que: i) La energía de que trata esta variable tiene un tratamiento horario.  ii) Para poder aplicar esta variable se debe cumplir que la suma de la energía entregada a la red en todas las horas del mes m fue superior al total de la energía importada o consumida durante el mismo mes m. iii) En la hora hx pueden existir cantidades de energía que se deben valorar. Esto es, para la hora hx la cantidad de energía que se debe valorar es el cálculo de: EEHA -
        //Q3: Relación entre: i) GExc3 excedentes de energía de los AGPE, con capacidad instalada o nominal menor o igual 1 MW, que le aplica lo establecido en el literal b) numeral 1) del artículo 23 de esta resolución, para el Comercializador Minorista i, liquidados en el mes m-1, con destino al mercado regulado; y ii)
        //Q3= min(1,(SUM(Mercados j)(Usuarios AGPE)(horas(GExc3))/DCR)
        //GExc3: corresponde a la energía excedente en la hora h para el AGPE u, con capacidad instalada menor o igual a 1 MW, expresado en kWh, del Comercializador Minorista i, en el mercado de comercialización mj, en el mes m-1, que le aplica lo establecido en el literal b) numeral 1) del artículo 23 de esta resolución.
        //QGD: Relación entre: i) GGD energía de los GD con capacidad instalada o nominal menor a 1 MW, que les aplica lo establecido en el literal b) del artículo 22 de esta resolución, y que la energía es comprada por el Comercializador Minorista i en los mercados de comercialización mj donde se encuentre integrado con el OR, en la hora h, liquidados en el mes m-1, con destino al mercado regulado; y ii)
        //QGD= min(1,(SUM(Mercados j)(Usuarios GGD)(horas(GGD))/DCR)
        //GGD: corresponde a la energía en la hora h para el generador distribuido gd, con capacidad instalada menor a 1 MW, expresado en kWh, que vende al Comercializador Minorista i que está integrado con el OR en el mercado de comercialización mj, en el mes m-1, que le aplica lo establecido en el literal b) del artículo 22 de esta resolución.

        //Q11
        //1. filtrar por mayo
        //2. Para cada usuario calcular suma de todas las exportacionesy suma importaciones
        //3 Si Exp > Imp limite Imp sino Exp

        const data_empresa_agpem_cons = [
          ...data_empresa_agpem
            .reduce((r, o) => {
              const key = o.niu + "-" + o.tipo_ene;
              const item =
                r.get(key) ||
                Object.assign({}, o, {
                  hora_01: 0,
                  hora_02: 0,
                  hora_03: 0,
                  hora_04: 0,
                  hora_05: 0,
                  hora_06: 0,
                  hora_07: 0,
                  hora_08: 0,
                  hora_09: 0,
                  hora_10: 0,
                  hora_11: 0,
                  hora_12: 0,
                  hora_13: 0,
                  hora_14: 0,
                  hora_15: 0,
                  hora_16: 0,
                  hora_17: 0,
                  hora_18: 0,
                  hora_19: 0,
                  hora_20: 0,
                  hora_21: 0,
                  hora_22: 0,
                  hora_23: 0,
                  hora_24: 0,
                });
              item.hora_01 += o.hora_01;
              item.hora_02 += o.hora_02;
              item.hora_03 += o.hora_03;
              item.hora_04 += o.hora_04;
              item.hora_05 += o.hora_05;
              item.hora_06 += o.hora_06;
              item.hora_07 += o.hora_07;
              item.hora_08 += o.hora_08;
              item.hora_09 += o.hora_09;
              item.hora_10 += o.hora_10;
              item.hora_11 += o.hora_11;
              item.hora_12 += o.hora_12;
              item.hora_13 += o.hora_13;
              item.hora_14 += o.hora_14;
              item.hora_15 += o.hora_15;
              item.hora_16 += o.hora_16;
              item.hora_17 += o.hora_17;
              item.hora_18 += o.hora_18;
              item.hora_19 += o.hora_19;
              item.hora_20 += o.hora_20;
              item.hora_21 += o.hora_21;
              item.hora_22 += o.hora_22;
              item.hora_23 += o.hora_23;
              item.hora_24 += o.hora_24;
              return r.set(key, item);
            }, new Map())
            .values(),
        ];
        var usu_agpe = [],
          imp,
          exp,
          g_exc1_u,
          g_exc1_ = 0;
        console.log(data_empresa_agpem_cons);
        for (let index = 0; index < data_empresa_agpem_cons.length; index++) {
          if (data_empresa_agpem_cons[index].tipo_ene === "Imp") {
            for (
              let index1 = 0;
              index1 < data_empresa_agpem_cons.length;
              index1++
            ) {
              if (
                data_empresa_agpem_cons[index1].tipo_ene === "Exp" &&
                data_empresa_agpem_cons[index].niu ===
                  data_empresa_agpem_cons[index1].niu
              ) {
                imp =
                  data_empresa_agpem_cons[index].hora_01 +
                  data_empresa_agpem_cons[index].hora_02 +
                  data_empresa_agpem_cons[index].hora_03 +
                  data_empresa_agpem_cons[index].hora_04 +
                  data_empresa_agpem_cons[index].hora_05 +
                  data_empresa_agpem_cons[index].hora_06 +
                  data_empresa_agpem_cons[index].hora_07 +
                  data_empresa_agpem_cons[index].hora_08 +
                  data_empresa_agpem_cons[index].hora_09 +
                  data_empresa_agpem_cons[index].hora_10 +
                  data_empresa_agpem_cons[index].hora_11 +
                  data_empresa_agpem_cons[index].hora_12 +
                  data_empresa_agpem_cons[index].hora_13 +
                  data_empresa_agpem_cons[index].hora_14 +
                  data_empresa_agpem_cons[index].hora_15 +
                  data_empresa_agpem_cons[index].hora_16 +
                  data_empresa_agpem_cons[index].hora_17 +
                  data_empresa_agpem_cons[index].hora_18 +
                  data_empresa_agpem_cons[index].hora_19 +
                  data_empresa_agpem_cons[index].hora_20 +
                  data_empresa_agpem_cons[index].hora_21 +
                  data_empresa_agpem_cons[index].hora_22 +
                  data_empresa_agpem_cons[index].hora_23 +
                  data_empresa_agpem_cons[index].hora_24;
                exp =
                  data_empresa_agpem_cons[index1].hora_01 +
                  data_empresa_agpem_cons[index1].hora_02 +
                  data_empresa_agpem_cons[index1].hora_03 +
                  data_empresa_agpem_cons[index1].hora_04 +
                  data_empresa_agpem_cons[index1].hora_05 +
                  data_empresa_agpem_cons[index1].hora_06 +
                  data_empresa_agpem_cons[index1].hora_07 +
                  data_empresa_agpem_cons[index1].hora_08 +
                  data_empresa_agpem_cons[index1].hora_09 +
                  data_empresa_agpem_cons[index1].hora_10 +
                  data_empresa_agpem_cons[index1].hora_11 +
                  data_empresa_agpem_cons[index1].hora_12 +
                  data_empresa_agpem_cons[index1].hora_13 +
                  data_empresa_agpem_cons[index1].hora_14 +
                  data_empresa_agpem_cons[index1].hora_15 +
                  data_empresa_agpem_cons[index1].hora_16 +
                  data_empresa_agpem_cons[index1].hora_17 +
                  data_empresa_agpem_cons[index1].hora_18 +
                  data_empresa_agpem_cons[index1].hora_19 +
                  data_empresa_agpem_cons[index1].hora_20 +
                  data_empresa_agpem_cons[index1].hora_21 +
                  data_empresa_agpem_cons[index1].hora_22 +
                  data_empresa_agpem_cons[index1].hora_23 +
                  data_empresa_agpem_cons[index1].hora_24;
                if (exp > imp) {
                  g_exc1_u = imp;
                } else {
                  g_exc1_u = exp;
                }
                g_exc1_ = g_exc1_ + g_exc1_u;
                usu_agpe.push([
                  data_empresa_agpem_cons[index].niu,
                  imp,
                  exp,
                  g_exc1_u,
                ]);
              }
            }
          }
        }

        q11 = Math.min(1, g_exc1_ / dcr);
        q21 = Math.min(1, data_empresam[0].g_exc1_21 / dcr); //capacidad instalada o nominal mayor a 0,1 MW y menor o igual a 1 MW
        qexc2 = Math.min(1, data_empresam[0].g_exc2 / dcr); //Para este caso las exportaciones no sobrepasaron las imp y hx
        q3 = Math.min(1, data_empresam[0].g_exc3 / dcr); // Que no sea FNCER
        qgd = Math.min(1, data_empresam[0].ggd / dcr); //No hay GD

        qagd = Math.min(1, q11 + q21 + qexc2 + q3 + qgd);

        if (data_xm_afacm[0].compras_en_bolsa_nacional_kwh === 0) {
          pb_ = 0;
        } else {
          pb_ = roundToTwo(
            (data_xm_afacm[0].compras_energia_en_bolsa_cop +
              data_xm_afacm[0].compras_en_bolsa_ajustes_cop) /
              data_xm_afacm[0].compras_energia_en_bolsa_kwh
          );
        }

        setPb(pb_);

        data_xm_dspcttom.forEach(function (obj) {
          Energia_contratos +=
            parseFloat(obj.desp_hora_1) +
            parseFloat(obj.desp_hora_2) +
            parseFloat(obj.desp_hora_3) +
            parseFloat(obj.desp_hora_4) +
            parseFloat(obj.desp_hora_5) +
            parseFloat(obj.desp_hora_6) +
            parseFloat(obj.desp_hora_7) +
            parseFloat(obj.desp_hora_8) +
            parseFloat(obj.desp_hora_9) +
            parseFloat(obj.desp_hora_10) +
            parseFloat(obj.desp_hora_11) +
            parseFloat(obj.desp_hora_12) +
            parseFloat(obj.desp_hora_13) +
            parseFloat(obj.desp_hora_14) +
            parseFloat(obj.desp_hora_15) +
            parseFloat(obj.desp_hora_16) +
            parseFloat(obj.desp_hora_17) +
            parseFloat(obj.desp_hora_18) +
            parseFloat(obj.desp_hora_19) +
            parseFloat(obj.desp_hora_20) +
            parseFloat(obj.desp_hora_21) +
            parseFloat(obj.desp_hora_22) +
            parseFloat(obj.desp_hora_23) +
            parseFloat(obj.desp_hora_24);
          Costo_contratos +=
            parseFloat(obj.desp_hora_1) * parseFloat(obj.trf_hora_1) +
            parseFloat(obj.desp_hora_2) * parseFloat(obj.trf_hora_2) +
            parseFloat(obj.desp_hora_3) * parseFloat(obj.trf_hora_3) +
            parseFloat(obj.desp_hora_4) * parseFloat(obj.trf_hora_4) +
            parseFloat(obj.desp_hora_5) * parseFloat(obj.trf_hora_5) +
            parseFloat(obj.desp_hora_6) * parseFloat(obj.trf_hora_6) +
            parseFloat(obj.desp_hora_7) * parseFloat(obj.trf_hora_7) +
            parseFloat(obj.desp_hora_8) * parseFloat(obj.trf_hora_8) +
            parseFloat(obj.desp_hora_9) * parseFloat(obj.trf_hora_9) +
            parseFloat(obj.desp_hora_10) * parseFloat(obj.trf_hora_10) +
            parseFloat(obj.desp_hora_11) * parseFloat(obj.trf_hora_11) +
            parseFloat(obj.desp_hora_12) * parseFloat(obj.trf_hora_12) +
            parseFloat(obj.desp_hora_13) * parseFloat(obj.trf_hora_13) +
            parseFloat(obj.desp_hora_14) * parseFloat(obj.trf_hora_14) +
            parseFloat(obj.desp_hora_15) * parseFloat(obj.trf_hora_15) +
            parseFloat(obj.desp_hora_16) * parseFloat(obj.trf_hora_16) +
            parseFloat(obj.desp_hora_17) * parseFloat(obj.trf_hora_17) +
            parseFloat(obj.desp_hora_18) * parseFloat(obj.trf_hora_18) +
            parseFloat(obj.desp_hora_19) * parseFloat(obj.trf_hora_19) +
            parseFloat(obj.desp_hora_20) * parseFloat(obj.trf_hora_20) +
            parseFloat(obj.desp_hora_21) * parseFloat(obj.trf_hora_21) +
            parseFloat(obj.desp_hora_22) * parseFloat(obj.trf_hora_22) +
            parseFloat(obj.desp_hora_23) * parseFloat(obj.trf_hora_23) +
            parseFloat(obj.desp_hora_24) * parseFloat(obj.trf_hora_24);
        });

        const w = dcr / Energia_contratos;

        if (Energia_contratos / dcr <= 1) {
          pc_ = roundToTwo(Costo_contratos / Energia_contratos);
        } else {
          pc_ = pc_ * w;
        }
        console.log("pc_");
        console.log(pc_);
        console.log(w);
        console.log(roundToTwo(Costo_contratos / Energia_contratos));
        console.log(Energia_contratos / dcr <= 1);
        console.log(Energia_contratos);
        console.log(dcr);
        setPc(pc_);
        var Energia_contratos_sub = 0,
          Costo_contratos_sub = 0;
        if (data_xm_dspcttomsub.length > 0) {
          data_xm_dspcttomsub.forEach(function (obj) {
            Energia_contratos_sub +=
              parseFloat(obj.desp_hora_1) +
              parseFloat(obj.desp_hora_2) +
              parseFloat(obj.desp_hora_3) +
              parseFloat(obj.desp_hora_4) +
              parseFloat(obj.desp_hora_5) +
              parseFloat(obj.desp_hora_6) +
              parseFloat(obj.desp_hora_7) +
              parseFloat(obj.desp_hora_8) +
              parseFloat(obj.desp_hora_9) +
              parseFloat(obj.desp_hora_10) +
              parseFloat(obj.desp_hora_11) +
              parseFloat(obj.desp_hora_12) +
              parseFloat(obj.desp_hora_13) +
              parseFloat(obj.desp_hora_14) +
              parseFloat(obj.desp_hora_15) +
              parseFloat(obj.desp_hora_16) +
              parseFloat(obj.desp_hora_17) +
              parseFloat(obj.desp_hora_18) +
              parseFloat(obj.desp_hora_19) +
              parseFloat(obj.desp_hora_20) +
              parseFloat(obj.desp_hora_21) +
              parseFloat(obj.desp_hora_22) +
              parseFloat(obj.desp_hora_23) +
              parseFloat(obj.desp_hora_24);
            Costo_contratos_sub +=
              parseFloat(obj.desp_hora_1) * parseFloat(obj.trf_hora_1) +
              parseFloat(obj.desp_hora_2) * parseFloat(obj.trf_hora_2) +
              parseFloat(obj.desp_hora_3) * parseFloat(obj.trf_hora_3) +
              parseFloat(obj.desp_hora_4) * parseFloat(obj.trf_hora_4) +
              parseFloat(obj.desp_hora_5) * parseFloat(obj.trf_hora_5) +
              parseFloat(obj.desp_hora_6) * parseFloat(obj.trf_hora_6) +
              parseFloat(obj.desp_hora_7) * parseFloat(obj.trf_hora_7) +
              parseFloat(obj.desp_hora_8) * parseFloat(obj.trf_hora_8) +
              parseFloat(obj.desp_hora_9) * parseFloat(obj.trf_hora_9) +
              parseFloat(obj.desp_hora_10) * parseFloat(obj.trf_hora_10) +
              parseFloat(obj.desp_hora_11) * parseFloat(obj.trf_hora_11) +
              parseFloat(obj.desp_hora_12) * parseFloat(obj.trf_hora_12) +
              parseFloat(obj.desp_hora_13) * parseFloat(obj.trf_hora_13) +
              parseFloat(obj.desp_hora_14) * parseFloat(obj.trf_hora_14) +
              parseFloat(obj.desp_hora_15) * parseFloat(obj.trf_hora_15) +
              parseFloat(obj.desp_hora_16) * parseFloat(obj.trf_hora_16) +
              parseFloat(obj.desp_hora_17) * parseFloat(obj.trf_hora_17) +
              parseFloat(obj.desp_hora_18) * parseFloat(obj.trf_hora_18) +
              parseFloat(obj.desp_hora_19) * parseFloat(obj.trf_hora_19) +
              parseFloat(obj.desp_hora_20) * parseFloat(obj.trf_hora_20) +
              parseFloat(obj.desp_hora_21) * parseFloat(obj.trf_hora_21) +
              parseFloat(obj.desp_hora_22) * parseFloat(obj.trf_hora_22) +
              parseFloat(obj.desp_hora_23) * parseFloat(obj.trf_hora_23) +
              parseFloat(obj.desp_hora_24) * parseFloat(obj.trf_hora_24);
          });
          pcSub_ = roundToTwo(Costo_contratos_sub / Energia_contratos_sub);
        }
        if (isNaN(pcSub_)) {
          pcSub_ = 0;
        }
        setPcSub(pcSub_);
        //Qc= Min(1-Qagd, ((C1+C2+SUM(l=3...n)(Cl))/DCR)

        //w1: Ponderador de los precios de los contratos resultantes de las
        // convocatorias públicas a las que hace referencia la Resolución
        // CREG 130 de 2019 o aquella que la modifique, sustituya o
        // adicione, del comercializador i, en el mes m-1.

        //w2: Ponderador de los precios de los contratos de largo plazo
        // destinados al mercado regulado adjudicados en las subastas
        // administradas por el Ministerio de Minas y Energía al
        // comercializador i, en el mes m-1.

        //gTransitorio: Costo de compra de energía a AGPE y GD por parte del
        // comercializador i en el mes m, para el mercado de comercialización
        // j de acuerdo con lo establecido en el Anexo 2 de la Resolución
        // CREG 174 de 2021 o aquella que la modifique, sustituya o
        // adicione.

        //egp: Valor unitario de la devolución que el comercializador i debe hacer
        // a favor del usuario, en caso de que, por incumplimiento de un
        // vendedor, se ejecute la garantía de cumplimiento de la que trata el
        // artículo 34 de la Resolución 40590 de 2019 del Ministerio de Minas
        // y Energía, asociada a los contratos asignados en las subastas
        // administradas por el Ministerio de Minas y Energía con destino al
        // mercado regulado. El comercializador debe devolver a sus
        // usuarios la totalidad del monto resultante de la ejecución de la
        // garantía de cumplimiento, el mes siguiente a la ejecución.

        // Gc=w1*Qc*(alfa*pc+(1-alfa)*mc)+w2*Qc*PSA+CUG-EGP+SUM(w1*Qc*Pl)+(1-Qc-Qagd)*Pb+Gtransitorio+AJ

        //wl= Cl/SUM(l=n..n)(Cl)

        w1 = Energia_contratos / (Energia_contratos_sub + Energia_contratos);

        w2 =
          Energia_contratos_sub / (Energia_contratos_sub + Energia_contratos);
        qagd = 0; // Caso ENerguaviare que aun no tiene AGPE info
        qc_ = roundToTwo(
          Math.min(1 - qagd, (Energia_contratos_sub + Energia_contratos) / dcr)
        );
        mc_ = roundToTwo(
          data_xm_trsmm.filter(
            (data_xm_trsmm) =>
              data_xm_trsmm.codigo === "MC" &&
              data_xm_trsmm.empresa_id === data2.obtenerUsuario.empresa
          )[0].valor
        );

        switch (data2.obtenerUsuario.empresa) {
          case "ENIC":
            name_mercado_or = "ENELAR Mercado de Comercialización ARAUCA";
            alfa = 0.584204941605;
            name_sistema_or = "ARAM";
            name_or = "ENID";
            tipoCalculo = 1;

          case "EGVC":
            name_mercado_or =
              "ENERGUAVIARE Mercado de Comercialización GUAVIARE";
            alfa = 0.036578428408;
            name_sistema_or = "GUVM";
            name_or = "EGVD";
            tipoCalculo = 1;

          case "EMPC":
            name_mercado_or = "ENELAR Mercado de Comercialización ARAUCA";
            alfa = 0.036578428408;
            name_sistema_or = "GUVM";
            name_or = "EGVD";
            tipoCalculo = 2;
          default:
            break;
        }
        // 1. SIN
        // 2 Interconexión si cargos Cx y Dx
        // i) El componente que remunera la actividad de generación se sustituirá por los costos de compra de energía en el Sistema Interconectado Nacional;
        // ii) Los costos de transmisión corresponderán a los cargos regulados para el Sistema de Transmisión Nacional;
        // iii) Al cargo de distribución se le adicionará el cobro por concepto de cargos de distribución de niveles superiores que efectúe el Operador de Red al cual se conecta la antigua zona no interconectada. En caso de entrar a formar parte de un STR, el LAC realizará los pagos y cobros correspondientes, de conformidad con lo establecido en la Resolución CREG-082 de 2002 o aquellas que la modifiquen o sustituyan;
        // iv) El cargo de comercialización corresponderá al aprobado para las ZNI;
        // v) Los demás cargos de la fórmula tarifaria general del SIN podrán ser aplicados por el prestador del servicio el mes siguiente a la interconexión.

        //PP1 Precio promedio ponderado actualizado para el mes m-1, de los AGPE, con capacidad instalada o nominal menor o igual a 0,1 MW, para la energía que se les aplica crédito de energía de acuerdo con el literal a) del numeral 1) del artículo 25 de esta resolución, para el Comercializador Minorista i, liquidados en el mes m-1, con destino al mercado regulado. Es expresado en pesos por kilovatio hora (COP/kWh) y se calcula así:
        //PP1= CUm-1 - Cvm-1
        //PP21 Precio promedio ponderado actualizado para el mes m-1, de los AGPE, con capacidad instalada o nominal mayor a 0,1 MW y menor o igual a 1 MW, para la energía que le aplica crédito de energía de acuerdo con el literal a) numeral 2) del artículo 25 de esta resolución, para el Comercializador Minorista i, liquidados en el mes m-1, con destino al mercado regulado. Es expresado en pesos por kilovatio hora (COP/kWh) y se calcula así:
        //PP21= Gm-1
        //PPExc2= Precio promedio ponderado actualizado para el mes m-1, de los AGPE, con capacidad instalada o nominal menor o igual a 1 MW, para la energía que le aplica lo establecido en los literales b) de los numerales 1) y 2) del artículo 25 de esta resolución, para el Comercializador Minorista i, liquidados en el mes m-1, con destino al mercado regulado. Es expresado en pesos por kilovatio hora (COP/kWh) y se calcula así:
        //PP3= 	Precio promedio ponderado actualizado para el mes m-1, de los AGPE, con capacidad instalada o nominal menor o igual a 1 MW, para la energía que le aplica lo establecido en el literal b) numeral 1) del artículo 23 de esta resolución, para el Comercializador Minorista i, liquidados en el mes m-1, con destino al mercado regulado. Es expresado en pesos por kilovatio hora (COP/kWh) y se calcula así:

        PP1 =
          data_Res_componentes_cu_tarifam[0].cu_nt1_0 -
          data_Res_componentes_cu_tarifam[0].cv;
        PP21 = data_Res_componentes_cu_tarifam[0].gc;
        PPExc2 = 0; //**Cambiar cuando exista */
        PP3 = 0; //**Cambiar cuando exista */
        PP3 = 0; //**Cambiar cuando exista */
        PPGD = 0; //**Cambiar cuando exista */
        //G Transitorio Q*P

        gTransitorio =
          q11 * PP1 + q21 * PP21 + qexc2 * PPExc2 + q3 * PP3 + qgd * PPGD;
        gTransitorio = 0; //Caso Energuaviare

        max_g_ = roundToTwo(
          (qc_ * (alfa * pc_ + (1 - alfa) * mc_) + (1 - qc_) * mc_) * 1.3
        );
        //cr_=(w1*qc_*(alfa*pc_+(1-alfa)*mc_))+(w2*qc_*pcSub_)+(cgsubasta_acu/dcr)+((1-qc_-qagd)*pb_)+gTransitorio //***Concpeto CREG
        cr_ = qc_ * (alfa * pc_ + (1 - alfa) * mc_) + (1 - qc_) * pb_; //***Concpeto CREG

        const getSundayFromWeekNum = (weekNum, year) => {
          const sunday = new Date(year, 0, 1 + (weekNum - 1) * 7 - 7);
          while (sunday.getDay() !== 0) {
            sunday.setDate(sunday.getDate() - 1);
          }
          return sunday;
        };

        var len1_ = 0,
          anho_semana = 0;
        while (len1_ < data_banrepublica_tco_e.length - 1) {
          len1_++;
          date_tco = getSundayFromWeekNum(
            parseFloat(
              data_banrepublica_tco_e[len1_].anho_semana.substr(4, 2)
            ) + 1,
            parseFloat(data_banrepublica_tco_e[len1_].anho_semana.substr(0, 4))
          );

          if (
            date_tco.getMonth() + 1 == mesm &&
            date_tco.getFullYear() + 1 == anhom
          ) {
            if (
              parseFloat(data_banrepublica_tco_e[len1_].anho_semana) >
              anho_semana
            ) {
              anho_semana = parseFloat(
                data_banrepublica_tco_e[len1_].anho_semana
              );
              i_aj =
                (1 +
                  (data_banrepublica_tco_e[len1_]
                    .tasa__cred_com_preferencial_o_corporativo *
                    data_banrepublica_tco_e[len1_]
                      .monto__cred_com_preferencial_o_corporativo) /
                    data_banrepublica_tco_e[len1_]
                      .monto__cred_com_preferencial_o_corporativo) **
                  (1 / 12) -
                1;
            }
          }
        }

        ad_ =
          (data_Res_componentes_cu_tarifam[0].ad +
            (data_Res_componentes_cu_tarifam[0].cr -
              data_Res_componentes_cu_tarifam[0].gc) *
              (data_empresam[0].ventas_usuarios_r_nt1_e +
                data_empresam[0].ventas_usuarios_r_nt1_c +
                data_empresam[0].ventas_usuarios_r_nt1_u +
                data_empresam[0].ventas_usuarios_r_nt2 +
                data_empresam[0].ventas_usuarios_r_nt3)) *
          (1 + i_aj);

        if (ad_ < 0) {
          ad_ = 0;
        }

        aj_ = Math.min(
          max_g_ - cr_,
          ad_ /
            (data_empresam[0].ventas_usuarios_r_nt1_e +
              data_empresam[0].ventas_usuarios_r_nt1_c +
              data_empresam[0].ventas_usuarios_r_nt1_u +
              data_empresam[0].ventas_usuarios_r_nt2 +
              data_empresam[0].ventas_usuarios_r_nt3)
        );

        if (cgsubasta_acu / dcr > 1) {
          gc_ =
            w1 * qc_ * (alfa * pc_ + (1 - alfa) * mc_) +
            w2 * qc_ * pcSub_ +
            1 +
            (1 - qc_ - qagd) * pb_ +
            gTransitorio +
            aj_;
        } else {
          gc_ =
            w1 * qc_ * (alfa * pc_ + (1 - alfa) * mc_) +
            w2 * qc_ * pcSub_ +
            cgsubasta_acu / dcr +
            (1 - qc_ - qagd) * pb_ +
            gTransitorio +
            aj_;
        }

        setRef_G(
          roundToTwo(qc_ * (alfa * pc_ + (1 - alfa) * mc_) + (1 - qc_) * mc_)
        );

        setMax_G(max_g_);
        setQc(qc_);
        setGc(roundToTwo(gc_));

        setKwhSubasta(Energia_contratos_sub);
        setKwhBilaterales(Energia_contratos);
        // const alfa=0.584204941605 //***************************** */
        setMc(mc_);
        setAd(roundToTwo(ad_));
        setCr(roundToTwo(cr_));
        setAj(roundToTwo(aj_));
        tx_ = roundToTwo(
          data_xm_stnm[0].t_prima_cop_kwh + data_xm_stnm[0].delta_t_cop_kwh
        );
        setTx(tx_);

        iprstn_ =
          data_xm_afacm[0].perdida_real_kwh /
          (data_xm_afacm[0].demanda_real_kwh +
            data_xm_afacm[0].perdida_real_kwh);
        setIprstn(roundToTwo(iprstn_));

        console.log(iprstn_);
        console.log("info del PR");
        console.log(name_sistema_or);
        console.log(data2.obtenerUsuario.empresa);
        const data_xm_iprm1 = data_xm_ipr.filter(
          (data_xm_ipr) =>
            data_xm_ipr.anho === anho &&
            data_xm_ipr.mes === mes &&
            data_xm_ipr.agrupaORMercado === name_sistema_or &&
            data_xm_ipr.nivelEntrada === 1 &&
            data_xm_ipr.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_iprm2 = data_xm_ipr.filter(
          (data_xm_ipr) =>
            data_xm_ipr.anho === anho &&
            data_xm_ipr.mes === mes &&
            data_xm_ipr.agrupaORMercado === name_sistema_or &&
            data_xm_ipr.nivelEntrada === 2 &&
            data_xm_ipr.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_iprm3 = data_xm_ipr.filter(
          (data_xm_ipr) =>
            data_xm_ipr.anho === anho &&
            data_xm_ipr.mes === mes &&
            data_xm_ipr.agrupaORMercado === name_sistema_or &&
            data_xm_ipr.nivelEntrada === 3 &&
            data_xm_ipr.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_iprm4 = data_xm_ipr.filter(
          (data_xm_ipr) =>
            data_xm_ipr.anho === anho &&
            data_xm_ipr.mes === mes &&
            data_xm_ipr.agrupaORMercado === name_sistema_or &&
            data_xm_ipr.nivelEntrada === 4 &&
            data_xm_ipr.empresa_id === data2.obtenerUsuario.empresa
        );

        const data_xm_cprogm = data_xm_cprog.filter(
          (data_xm_cprog) =>
            data_xm_cprog.anho === anho &&
            data_xm_cprog.mes === mes &&
            data_xm_cprog.agente === name_or &&
            data_xm_cprog.empresa_id === data2.obtenerUsuario.empresa
        );
        var pr_nt1_, pr_nt2_, pr_nt3_, pr_nt4_;

        pr_nt1_ = roundToTwo(
          (gc_ * (data_xm_iprm1[0].valor + iprstn_)) /
            (1 - (data_xm_iprm1[0].valor + iprstn_)) +
            (tx_ * data_xm_iprm1[0].valor) / (1 - data_xm_iprm1[0].valor) +
            data_xm_cprogm[0].cargo_cprog_cop_kwh
        );
        pr_nt2_ = roundToTwo(
          (gc_ * (data_xm_iprm2[0].valor + iprstn_)) /
            (1 - (data_xm_iprm2[0].valor + iprstn_)) +
            (tx_ * data_xm_iprm2[0].valor) / (1 - data_xm_iprm2[0].valor) +
            data_xm_cprogm[0].cargo_cprog_cop_kwh
        );
        pr_nt3_ = roundToTwo(
          (gc_ * (data_xm_iprm3[0].valor + iprstn_)) /
            (1 - (data_xm_iprm3[0].valor + iprstn_)) +
            (tx_ * data_xm_iprm3[0].valor) / (1 - data_xm_iprm3[0].valor) +
            data_xm_cprogm[0].cargo_cprog_cop_kwh
        );
        pr_nt4_ = roundToTwo(
          (gc_ * (data_xm_iprm4[0].valor + iprstn_)) /
            (1 - (data_xm_iprm4[0].valor + iprstn_)) +
            (tx_ * data_xm_iprm4[0].valor) / (1 - data_xm_iprm4[0].valor) +
            data_xm_cprogm[0].cargo_cprog_cop_kwh
        );
        console.log("CPROG");
        console.log(data_xm_cprogm[0].cargo_cprog_cop_kwh);

        setPr_Nt1(pr_nt1_);
        setPr_Nt2(pr_nt2_);
        setPr_Nt3(pr_nt3_);
        setPr_Nt4(pr_nt4_);

        var dnt1_, dnt2_, dnt3_, dnt4_, cdi_100_, cdi_50_;
        dnt1_ = roundToTwo(data_xm_d015m[0].cargo_por_uso_dt1_cop_kwh);
        setDnt1(dnt1_);
        dnt2_ = roundToTwo(data_xm_d015m[0].cargo_por_uso_dt2_cop_kwh);
        setDnt2(dnt2_);
        dnt3_ = roundToTwo(data_xm_d015m[0].cargo_por_uso_dt3_cop_kwh);
        setDnt3(dnt3_);
        cdi_100_ = roundToTwo(data_xm_d015m[0].cargo_de_inversion_cdi1_cop_kwh);
        setCdi_100(cdi_100_);
        cdi_50_ = roundToTwo(
          data_xm_d015m[0].cargo_de_inversion_cdi1_cop_kwh / 2
        );
        setCdi_50(cdi_50_);
        setCd2(roundToTwo(data_xm_d015m[0].cargo_nivel_de_tension_cd2_cop_kwh));
        setCd3(roundToTwo(data_xm_d015m[0].cargo_nivel_de_tension_cd3_cop_kwh));
        setCd4(roundToTwo(data_xm_d015m[0].cargo_nivel_de_tension_cd4_cop_kwh));
        setCdm(roundToTwo(data_xm_d015m[0].cargo_por_aom_cda1_cop_kwh));
        dnt4_ = roundToTwo(
          (data_xm_strm[0].cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur +
            data_xm_strm[0]
              .valor_diferencial_despues_de_compensacion_cop_kwh_sur) /
            (1 - data_xm_iprm4[0].valor)
        );
        console.log("PR4");
        console.log(data_xm_iprm4[0].valor);
        setDnt4(dnt4_);

        const data_xm_dtunm1 = data_xm_dtun.filter(
          (data_xm_dtun) =>
            data_xm_dtun.anho === anho &&
            data_xm_dtun.mes === mes &&
            data_xm_dtun.operador_red === name_mercado_or &&
            data_xm_dtun.nivel_tension === 1 &&
            data_xm_dtun.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_dtunm2 = data_xm_dtun.filter(
          (data_xm_dtun) =>
            data_xm_dtun.anho === anho &&
            data_xm_dtun.mes === mes &&
            data_xm_dtun.operador_red === name_mercado_or &&
            data_xm_dtun.nivel_tension === 2 &&
            data_xm_dtun.empresa_id === data2.obtenerUsuario.empresa
        );
        const data_xm_dtunm3 = data_xm_dtun.filter(
          (data_xm_dtun) =>
            data_xm_dtun.anho === anho &&
            data_xm_dtun.mes === mes &&
            data_xm_dtun.operador_red === name_mercado_or &&
            data_xm_dtun.nivel_tension === 3 &&
            data_xm_dtun.empresa_id === data2.obtenerUsuario.empresa
        );

        var dtun_nt1_e_, dtun_nt1_c_, dtun_nt1_p_, dtun_nt2_, dtun_nt3_;
        if (data_xm_dtunm1.length > 0) {
          dtun_nt1_e_ = roundToTwo(data_xm_dtunm1[0].valor);
          setDtun_Nt1_E(dtun_nt1_e_);
          dtun_nt1_c_ = roundToTwo(
            data_xm_dtunm1[0].valor -
              data_xm_d015m[0].cargo_de_inversion_cdi1_cop_kwh / 2
          );
          setDtun_Nt1_C(dtun_nt1_c_);
          dtun_nt1_p_ = roundToTwo(
            data_xm_dtunm1[0].valor -
              data_xm_d015m[0].cargo_de_inversion_cdi1_cop_kwh
          );
          setDtun_Nt1_P(dtun_nt1_p_);
          dtun_nt2_ = roundToTwo(data_xm_dtunm2[0].valor);
          setDtun_Nt2(dtun_nt2_);
          dtun_nt3_ = roundToTwo(data_xm_dtunm3[0].valor);
          setDtun_Nt3(dtun_nt3_);
        }

        console.log(data_xm_afacm[0].restricciones_aliviadas_cop);
        console.log(data_xm_afacm[0].ventas_en_desviacion_cop);
        console.log(data_xm_guatapem[0].crs_variable_guatape_cop);
        setCrs(
          data_xm_afacm[0].restricciones_aliviadas_cop -
            data_xm_afacm[0].ventas_en_desviacion_cop +
            data_xm_guatapem[0].crs_variable_guatape_cop
        );
        var r_;
        r_ = roundToTwo(
          (data_xm_afacm[0].restricciones_aliviadas_cop -
            data_xm_afacm[0].ventas_en_desviacion_cop +
            data_xm_guatapem[0].crs_variable_guatape_cop) /
            (data_empresam[0].ventas_usuarios_r_nt1_e +
              data_empresam[0].ventas_usuarios_r_nt1_c +
              data_empresam[0].ventas_usuarios_r_nt1_u +
              data_empresam[0].ventas_usuarios_r_nt2 +
              data_empresam[0].ventas_usuarios_r_nt3 +
              data_empresam[0].ventas_usuarios_nr_kwh)
        );

        setR(r_);

        cer_ =
          ((data_empresaanualm[0].contribuciones_creg *
            data_empresaanualm[0].porc_contribucion_creg) /
            100 +
            (data_empresaanualm[0].contribuciones_sspd *
              data_empresaanualm[0].porc_contribucion_sspd) /
              100) /
          12;
        setCer(cer_);

        var x_, cfm_;

        if (anho === 2015) {
          x_ = 0;
        }
        if (anho === 2016) {
          x_ = 0.00725;
        }
        if (anho === 2017) {
          x_ = 0.00725 * 2;
        }
        if (anho === 2018) {
          x_ = 0.00725 * 3;
        }
        if (anho >= 2019) {
          x_ = 0.00725 * 4;
        }

        cfm_ = roundToTwo((data_creg_cxm[0].Cf * ipcm * (1 - x_)) / 79.55965);
        // cfm_=(roundToTwo(6146.19*ipcm/79.55965))
        setX(x_);
        setCfm(cfm_);

        var rc_;
        rc_ = roundToTwo(
          (data_creg_cxm[0].RCT *
            (data_empresam[0].ventas_usuarios_r_nt1_e +
              data_empresam[0].ventas_usuarios_r_nt1_c +
              data_empresam[0].ventas_usuarios_r_nt1_u +
              data_empresam[0].ventas_usuarios_r_nt2 +
              data_empresam[0].ventas_usuarios_r_nt3 -
              data_empresam[0].vae_kwh -
              data_empresam[0].vnu_kwh -
              data_empresam[0].vsne_kwh) +
            data_creg_cxm[0].RCAE * data_empresam[0].vae_kwh +
            data_creg_cxm[0].RCSNE * data_empresam[0].vsne_kwh +
            data_creg_cxm[0].RCNU * data_empresam[0].vnu_kwh) /
            (data_empresam[0].ventas_usuarios_r_nt1_e +
              data_empresam[0].ventas_usuarios_r_nt1_c +
              data_empresam[0].ventas_usuarios_r_nt1_u +
              data_empresam[0].ventas_usuarios_r_nt2 +
              data_empresam[0].ventas_usuarios_r_nt3)
        );

        setRc(rc_);

        var len = data_xm_mme_validacione.length,
          maxa = -Infinity;
        while (len > 0) {
          len--;
          if (data_xm_mme_validacione[len].anho > maxa) {
            maxa = data_xm_mme_validacione[len].anho;
          }
        }
        setAnho_Ul_Trim_Val_Mme(maxa);

        var len = data_xm_mme_validacione.length,
          maxt = -Infinity;
        while (len > 0) {
          len--;
          if (
            data_xm_mme_validacione[len].trimestre > maxt &&
            maxa === data_xm_mme_validacione[len].anho
          ) {
            maxt = data_xm_mme_validacione[len].trimestre;
          }
        }

        setUl_Trim_Val_Mme(maxt);

        var len = 4,
          tri_validados = [],
          index = 0,
          summ = 0,
          trimestre,
          anho_trimestre,
          fecha_inicio_trimestre,
          fecha_fin_trimestre;
        while (len > 0) {
          len--;
          index++;
          if (maxt - len >= 1) {
            trimestre = maxt - len;
            anho_trimestre = maxa;
          } else {
            if (maxt - len === -2) {
              trimestre = 2;
              anho_trimestre = maxa - 1;
            }
            if (maxt - len === -1) {
              trimestre = 3;
              anho_trimestre = maxa - 1;
            }
            if (maxt - len === 0) {
              trimestre = 4;
              anho_trimestre = maxa - 1;
            }
          }
          if (trimestre === 1) {
            fecha_inicio_trimestre = new Date(anho_trimestre, 1 - 1, 1);
            fecha_fin_trimestre = new Date(anho_trimestre, 3 - 1, 31);
          }
          if (trimestre === 2) {
            fecha_inicio_trimestre = new Date(anho_trimestre, 4 - 1, 1);
            fecha_fin_trimestre = new Date(anho_trimestre, 6 - 1, 30);
          }
          if (trimestre === 3) {
            fecha_inicio_trimestre = new Date(anho_trimestre, 7 - 1, 1);
            fecha_fin_trimestre = new Date(anho_trimestre, 9 - 1, 30);
          }
          if (trimestre === 4) {
            fecha_inicio_trimestre = new Date(anho_trimestre, 10 - 1, 1);
            fecha_fin_trimestre = new Date(anho_trimestre, 12 - 1, 31);
          }

          for (
            let index1 = 0;
            index1 < data_xm_mme_validacione.length;
            index1++
          ) {
            if (
              data_xm_mme_validacione[index1].anho === anho_trimestre &&
              data_xm_mme_validacione[index1].trimestre === trimestre
            ) {
              tri_validados.push([
                index,
                trimestre,
                anho_trimestre,
                parseFloat(data_xm_mme_validacione[index1].subsidios) -
                  data_xm_mme_validacione[index1].contribuciones,
                parseFloat(data_xm_mme_validacione[index1].facturacion),
                fecha_inicio_trimestre,
                fecha_fin_trimestre,
              ]);
              summ =
                summ + parseFloat(data_xm_mme_validacione[index1].facturacion);
            }
          }
        }

        var facturacion_t_;
        facturacion_t_ = (summ / 4).toString();

        setFacturacion_T(facturacion_t_);

        var data_mme_giro_ordenado = [...data_mme_giro_e];

        data_mme_giro_ordenado.sort((a, b) =>
          a.fecha > b.fecha ? 1 : b.fecha > a.fecha ? -1 : 0
        );
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

        var len1 = 0,
          len2,
          len3,
          summ = 0,
          array_sub2M = [],
          array_sub1N = [],
          saldo,
          giro_sobranteb,
          ultimo_giro_incluidob,
          fecha_ultimo_giro;

        //Review Trimestre anterior el cual para arranque se incluye manual
        if (tri_validados[0][1] === 1) {
          giro_sobranteb = parseFloat(
            data_xm_mme_validacione.filter(
              (data_xm_mme_validacione) =>
                data_xm_mme_validacione.anho === tri_validados[0][2] - 1 &&
                data_xm_mme_validacione.trimestre === 4
            )[0].giro_sobrante
          );
          ultimo_giro_incluidob = data_xm_mme_validacione.filter(
            (data_xm_mme_validacione) =>
              data_xm_mme_validacione.anho === tri_validados[0][2] - 1 &&
              data_xm_mme_validacione.trimestre === 4
          )[0].ultimo_giro_incluido;
        } else {
          giro_sobranteb = parseFloat(
            data_xm_mme_validacione.filter(
              (data_xm_mme_validacione) =>
                data_xm_mme_validacione.anho === tri_validados[0][2] &&
                data_xm_mme_validacione.trimestre === tri_validados[0][1] - 1
            )[0].giro_sobrante
          );
          ultimo_giro_incluidob = data_xm_mme_validacione.filter(
            (data_xm_mme_validacione) =>
              data_xm_mme_validacione.anho === tri_validados[0][2] &&
              data_xm_mme_validacione.trimestre === tri_validados[0][1] - 1
          )[0].ultimo_giro_incluido;
        }

        if (giro_sobranteb === null || ultimo_giro_incluidob === null) {
          giro_sobranteb = 0;
          ultimo_giro_incluidob = 0;
        }

        for (let index = 0; index < 4; index++) {
          saldo = tri_validados[index][3];

          len2 = ultimo_giro_incluidob;

          while (len2 < data_mme_giro_ordenado.length - 1 && saldo != 0) {
            var fecha_giro = new Date(
              parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0, 4)),
              parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5, 2)) - 1,
              parseFloat(data_mme_giro_ordenado[len2].fecha.substr(8, 2))
            );
            var fecha_inicial_giros = new Date(2019, 1, 1);

            if (
              data_mme_giro_ordenado[len2].fondo === "FSSRI" &&
              Date.parse(fecha_giro) >= Date.parse(fecha_inicial_giros) &&
              Date.parse(fecha_giro) <= Date.parse(tri_validados[index][6])
            ) {
              if (giro_sobranteb > 0) {
                var fecha_giro = new Date(
                  parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0, 4)),
                  parseFloat(data_mme_giro_ordenado[len2].fecha.substr(5, 2)) -
                    1,
                  parseFloat(data_mme_giro_ordenado[len2].fecha.substr(8, 2))
                );

                saldo = saldo - giro_sobranteb;

                //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero
                if (saldo > 0) {
                  array_sub2M.push([
                    index + 1,
                    giro_sobranteb,
                    Math.round(
                      Math.abs(
                        (Date.parse(tri_validados[index][6]) - fecha_giro) /
                          oneDay
                      )
                    ),
                    giro_sobranteb *
                      Math.round(
                        Math.abs(
                          (tri_validados[index][6] - fecha_giro) / oneDay
                        )
                      ),
                  ]);
                  ultimo_giro_incluidob = len2;
                  giro_sobranteb = 0;
                } else {
                  array_sub2M.push([
                    index + 1,
                    giro_sobranteb + saldo,
                    Math.round(
                      Math.abs(
                        (Date.parse(tri_validados[index][6]) - fecha_giro) /
                          oneDay
                      )
                    ),
                    (giro_sobranteb + saldo) *
                      Math.round(
                        Math.abs(
                          (tri_validados[index][6] - fecha_giro) / oneDay
                        )
                      ),
                  ]);
                  giro_sobranteb = -saldo;
                  ultimo_giro_incluidob = len2;
                  saldo = 0;
                }
              } else {
                saldo =
                  saldo - parseFloat(data_mme_giro_ordenado[len2].giro_cop);
                //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero

                if (saldo > 0) {
                  array_sub2M.push([
                    index + 1,
                    parseFloat(data_mme_giro_ordenado[len2].giro_cop),
                    Math.round(
                      Math.abs((tri_validados[index][6] - fecha_giro) / oneDay)
                    ),
                    parseFloat(data_mme_giro_ordenado[len2].giro_cop) *
                      Math.round(
                        Math.abs(
                          (tri_validados[index][6] - fecha_giro) / oneDay
                        )
                      ),
                  ]);

                  ultimo_giro_incluidob = len2;
                  giro_sobranteb = 0;
                  fecha_ultimo_giro = data_mme_giro_ordenado[len2].fecha;
                } else {
                  array_sub2M.push([
                    index + 1,
                    parseFloat(data_mme_giro_ordenado[len2].giro_cop) + saldo,
                    Math.round(
                      Math.abs((tri_validados[index][6] - fecha_giro) / oneDay)
                    ),
                    (parseFloat(data_mme_giro_ordenado[len2].giro_cop) +
                      saldo) *
                      Math.round(
                        Math.abs(
                          (tri_validados[index][6] - fecha_giro) / oneDay
                        )
                      ),
                  ]);
                  giro_sobranteb = -saldo;
                  ultimo_giro_incluidob = len2;
                  saldo = 0;
                  fecha_ultimo_giro = data_mme_giro_ordenado[len2].fecha;
                }
              }
            }
            len2++;
          }

          len3 = ultimo_giro_incluidob;

          while (len3 < data_mme_giro_ordenado.length - 1 && saldo > 0) {
            //Evaluo si, hablando de que 2T, sea el primer trimestre del año el giro sea posterior al fin del trimestre
            var fecha_giro = new Date(
              parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0, 4)),
              parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5, 2)) - 1,
              parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8, 2))
            );

            if (
              data_mme_giro_ordenado[len3].fondo === "FSSRI" &&
              Date.parse(fecha_giro) > Date.parse(tri_validados[index][6])
            ) {
              //Se descuenta del saldo ese giro

              if (giro_sobranteb > 0) {
                saldo = saldo - giro_sobranteb;
                var fecha_giro = new Date(
                  parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0, 4)),
                  parseFloat(data_mme_giro_ordenado[len3].fecha.substr(5, 2)) -
                    1,
                  parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8, 2))
                );
                //se evalua si aunqueda saldo y se garda sub1 y N
                if (saldo > 0) {
                  array_sub1N.push([
                    index + 1,
                    giro_sobranteb,
                    Math.round(
                      Math.abs(
                        (fecha_giro - Date.parse(tri_validados[index][6])) /
                          oneDay
                      )
                    ),
                    giro_sobranteb *
                      Math.round(
                        Math.abs(
                          (fecha_giro - tri_validados[index][6]) / oneDay
                        )
                      ),
                  ]);

                  ultimo_giro_incluidob = len3;
                  giro_sobranteb = 0;
                } else {
                  array_sub1N.push([
                    index + 1,
                    giro_sobranteb + saldo,
                    Math.round(
                      Math.abs(
                        (fecha_giro - Date.parse(tri_validados[index][6])) /
                          oneDay
                      )
                    ),
                    (giro_sobranteb + saldo) *
                      Math.round(
                        Math.abs(
                          (fecha_giro - tri_validados[index][6]) / oneDay
                        )
                      ),
                  ]);
                  giro_sobranteb = -saldo;
                  ultimo_giro_incluidob = len3;
                  saldo = 0;
                }
              } else {
                saldo =
                  saldo - parseFloat(data_mme_giro_ordenado[len3].giro_cop);
                //se evalua si aunqueda saldo y se garda sub1 y N
                if (saldo > 0) {
                  array_sub1N.push([
                    index + 1,
                    parseFloat(data_mme_giro_ordenado[len3].giro_cop),
                    Math.round(
                      Math.abs(
                        (fecha_giro - Date.parse(tri_validados[index][6])) /
                          oneDay
                      )
                    ),
                    parseFloat(data_mme_giro_ordenado[len3].giro_cop) *
                      Math.round(
                        Math.abs(
                          (fecha_giro - tri_validados[index][6]) / oneDay
                        )
                      ),
                  ]);
                  ultimo_giro_incluidob = len3;
                  fecha_ultimo_giro = data_mme_giro_ordenado[len3].fecha;
                } else {
                  array_sub1N.push([
                    index + 1,
                    parseFloat(data_mme_giro_ordenado[len3].giro_cop) + saldo,
                    Math.round(
                      Math.abs(
                        (fecha_giro - Date.parse(tri_validados[index][6])) /
                          oneDay
                      )
                    ),
                    (parseFloat(data_mme_giro_ordenado[len3].giro_cop) +
                      saldo) *
                      Math.round(
                        Math.abs(
                          (fecha_giro - tri_validados[index][6]) / oneDay
                        )
                      ),
                  ]);
                  giro_sobranteb = -saldo;
                  ultimo_giro_incluidob = len3;
                  saldo = 0;
                  fecha_ultimo_giro = data_mme_giro_ordenado[len3].fecha;
                }
              }
            }
            len3++;
          }
          console.log("Review SUb1");
          console.log(array_sub1N);

          actualizarData_mme_validaciogirosob(
            data_xm_mme_validacione.filter(
              (data_xm_mme_validacione) =>
                data_xm_mme_validacione.anho === tri_validados[index][2] &&
                data_xm_mme_validacione.trimestre === tri_validados[index][1] &&
                data_xm_mme_validacione.empresa_id ===
                  data2.obtenerUsuario.empresa
            )[0].id,
            giro_sobranteb.toString(),
            ultimo_giro_incluidob
          );
        }

        setGiro_sobrante(giro_sobranteb);
        setUltimo_giro_incluido(ultimo_giro_incluidob);

        var len1 = 0,
          len2 = 0,
          len3 = 0,
          sub2mt = [],
          sub1mt = [],
          sub2mpt = [],
          sub1npt = [],
          sub1p,
          sub2p,
          sub1np,
          sub2mp;
        while (len1 < 4) {
          len1++;
          sub1p = 0;
          sub2p = 0;
          sub1np = 0;
          sub2mp = 0;
          while (
            len2 <
            array_sub2M.filter((array_sub2M) => array_sub2M[0] === len1).length
          ) {
            sub2p =
              array_sub2M.filter((array_sub2M) => array_sub2M[0] === len1)[
                len2
              ][1] + sub2p;
            sub2mp =
              array_sub2M.filter((array_sub2M) => array_sub2M[0] === len1)[
                len2
              ][3] + sub2mp;
            len2++;
          }
          sub2p = sub2p || 0;
          sub2mp = sub2mp || 0;

          sub2mt.push(sub2p);
          sub2mpt.push(sub2mp);
          len2 = 0;
          while (
            len3 <
            array_sub1N.filter((array_sub1N) => array_sub1N[0] === len1).length
          ) {
            sub1p =
              array_sub1N.filter((array_sub1N) => array_sub1N[0] === len1)[
                len3
              ][1] + sub1p;
            sub1np =
              array_sub1N.filter((array_sub1N) => array_sub1N[0] === len1)[
                len3
              ][3] + sub1np;
            len3++;
          }
          sub1p = sub1p || 0;
          sub1np = sub1np || 0;

          sub1mt.push(sub1p);
          sub1npt.push(sub1np);
          len3 = 0;
        }
        var sub1_, sub2_, n_Sub1_, m_Sub2_;

        sub1_ = (sub1mt[0] + sub1mt[1] + sub1mt[2] + sub1mt[3]) / 4;
        sub2_ = (sub2mt[0] + sub2mt[1] + sub2mt[2] + sub2mt[3]) / 4;
        setSub1(sub1_);
        setSub2(sub2_);

        if (sub1mt[0] + sub1mt[1] + sub1mt[2] + sub1mt[3] === 0) {
          n_Sub1_ = 0;
        } else {
          n_Sub1_ = roundToTwo(
            (sub1npt[0] / sub1mt[0] +
              sub1npt[1] / sub1mt[1] +
              sub1npt[2] / sub1mt[2] +
              sub1npt[3] / sub1mt[3]) /
              4 /
              30
          );
        }

        if (sub2mt[0] + sub2mt[1] + sub2mt[2] + sub2mt[3] === 0) {
          m_Sub2_ = 0;
        } else {
          m_Sub2_ = roundToTwo(
            (sub2mpt[0] + sub2mpt[1] + sub2mpt[2] + sub2mpt[3]) /
              (sub2mt[0] + sub2mt[1] + sub2mt[2] + sub2mt[3]) /
              30
          );
        }
        setN_Sub1(n_Sub1_);
        setM_Sub2(m_Sub2_);

        function subtractWeeks(numOfWeeks, date = new Date()) {
          date.setDate(date.getDate() - numOfWeeks * 7);

          return date;
        }

        var firstDate = subtractWeeks(26);

        var len1 = 0,
          date_tcap,
          sum_tasa_x_monto_cap = 0,
          sum_monto_cap = 0,
          date_tcap;

        while (len1 < data_banrepublica_tcap_e.length - 1) {
          len1++;
          date_tcap = new Date(
            parseFloat(data_banrepublica_tcap_e[len1].fecha.split("-")[0]),
            parseFloat(data_banrepublica_tcap_e[len1].fecha.split("-")[1]) - 1,
            data_banrepublica_tcap_e[len1].fecha.split("-")[2]
          ).getTime();
          if (date_tcap >= firstDate) {
            sum_tasa_x_monto_cap =
              data_banrepublica_tcap_e[len1]
                .tasa_a_30_cdats_cdat_bancos_comerciales *
                data_banrepublica_tcap_e[len1]
                  .monto_a_30_cdat_bancos_comerciales +
              sum_tasa_x_monto_cap;
            sum_monto_cap =
              data_banrepublica_tcap_e[len1]
                .monto_a_30_cdat_bancos_comerciales + sum_monto_cap;
          }
        }
        setTasaot(
          roundToTwo((1 + sum_tasa_x_monto_cap / sum_monto_cap) ** (1 / 12) - 1)
        );

        //r1 y r2:
        //1. Fecha del primer dia del segundo mes del ultimo trimestre
        //2. Fecha del primer dia del ultimo giro que le pego al ultimo trmestre
        //3. Recorrer matriz, consolidar tasa por monto y monto, que sea superior e inferior a las fechas
        //4. Dividir los consolidados

        //1. Fecha del primer dia des segundo mes del ultimo trimestre
        //2. Fecha del primer dia del ultimo giro que le pego al ultimo trmestre

        var firstDate = new Date(
          tri_validados[3][5].setMonth(tri_validados[3][5].getMonth() + 1)
        ).getTime();
        var secondDate = new Date(
          parseFloat(fecha_ultimo_giro.substr(0, 4)),
          parseFloat(fecha_ultimo_giro.substr(5, 2)) - 1,
          1
        ).getTime();

        data_mme_giro_ordenado.sort((a, b) =>
          a.fecha > b.fecha ? 1 : b.fecha > a.fecha ? -1 : 0
        );

        var len1 = 0,
          date_tcap,
          sum_tasa_x_monto_cap = 0,
          sum_monto_cap = 0,
          date_tcap,
          r2_;

        while (len1 < data_banrepublica_tcap_e.length - 1) {
          len1++;
          date_tcap = new Date(
            parseFloat(data_banrepublica_tcap_e[len1].fecha.split("-")[0]),
            parseFloat(data_banrepublica_tcap_e[len1].fecha.split("-")[1]) - 1,
            parseFloat(data_banrepublica_tcap_e[len1].fecha.split("-")[2])
          ).getTime();
          if (date_tcap >= firstDate && date_tcap < secondDate) {
            sum_tasa_x_monto_cap =
              data_banrepublica_tcap_e[len1]
                .tasa_a_30_cdats_cdat_bancos_comerciales *
                data_banrepublica_tcap_e[len1]
                  .monto_a_30_cdat_bancos_comerciales +
              sum_tasa_x_monto_cap;
            sum_monto_cap =
              data_banrepublica_tcap_e[len1]
                .monto_a_30_cdat_bancos_comerciales + sum_monto_cap;
          }
        }
        r2_ = roundToTwo(
          (1 + sum_tasa_x_monto_cap / sum_monto_cap) ** (1 / 12) - 1
        );

        setR2(r2_);

        var len1 = 0,
          date_tco,
          sum_tasa_x_monto_co = 0,
          sum_monto_co = 0,
          conteo = 0,
          r1_;
        while (len1 < data_banrepublica_tco_e.length - 1) {
          len1++;
          date_tco = getSundayFromWeekNum(
            parseFloat(data_banrepublica_tco_e[len1].anho_semana.substr(4, 2)) +
              1,
            parseFloat(data_banrepublica_tco_e[len1].anho_semana.substr(0, 4))
          );
          if (date_tco >= firstDate && date_tco < secondDate) {
            sum_tasa_x_monto_co =
              data_banrepublica_tco_e[len1]
                .tasa__cred_com_preferencial_o_corporativo *
                data_banrepublica_tco_e[len1]
                  .monto__cred_com_preferencial_o_corporativo +
              sum_tasa_x_monto_co;
            sum_monto_co =
              data_banrepublica_tco_e[len1]
                .monto__cred_com_preferencial_o_corporativo + sum_monto_co;
            conteo++;
          }
        }

        r1_ = roundToTwo(
          (1 + sum_tasa_x_monto_co / sum_monto_co / 100) ** (1 / 12) - 1
        );

        setR1(r1_);
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

        var cfs_ = 0,
          cfe_ = 0,
          c_ast_,
          cvr_;

        if (sub1_ >= 0 || sub2_ >= 0) {
          cfs_ = roundToTwo(
            ((sub1_ * ((1 + r1_) ** (n_Sub1_ + 0.63) - 1) -
              sub2_ * ((1 + r2_) ** m_Sub2_ - 1)) /
              facturacion_t_) *
              100
          );
          cfe_ = cfs_ + 0.042;
        }
        setN_Sub1(n_Sub1_);
        setM_Sub2(m_Sub2_);
        setCfs(cfs_);
        setCfe(cfe_);

        cvr_ = roundToTwo(
          ((1 - 0) * cfm_ * data_empresam2[0].numero_usuarios_r +
            cgcu +
            data_empresam[0].pui_cop_kwh) /
            (data_empresam2[0].ventas_usuarios_r_nt1_e +
              data_empresam2[0].ventas_usuarios_r_nt1_c +
              data_empresam2[0].ventas_usuarios_r_nt1_u +
              data_empresam2[0].ventas_usuarios_r_nt2 +
              618470 +
              data_empresam2[0].ventas_usuarios_r_nt3)
        );

        console.log("Review CVR");
        console.log(cfm_);
        console.log(
          data_empresam2[0].ventas_usuarios_r_nt1_e +
            data_empresam2[0].ventas_usuarios_r_nt1_c +
            data_empresam2[0].ventas_usuarios_r_nt1_u +
            data_empresam2[0].ventas_usuarios_r_nt2 +
            618470 +
            data_empresam2[0].ventas_usuarios_r_nt3
        );
        console.log(data_empresam2[0].ventas_usuarios_r_nt2);
        console.log(data_empresam2[0].numero_usuarios_r);
        console.log(cgcu);
        console.log(data_empresam[0].pui_cop_kwh);
        setCvr(cvr_);

        if (data_Res_componentes_cu_tarifam[0].dtun_nt1_e > 0) {
          c_ast_ = roundToTwo(
            ((data_Res_componentes_cu_tarifam[0].gc +
              data_Res_componentes_cu_tarifam[0].tx +
              data_Res_componentes_cu_tarifam[0].dtun_nt1_e +
              data_Res_componentes_cu_tarifam[0].pr_nt1 +
              data_Res_componentes_cu_tarifam[0].r) *
              (cfe_ + 2.73 + rc_)) /
              100
          );
        } else {
          c_ast_ = roundToTwo(
            ((data_Res_componentes_cu_tarifam[0].gc +
              data_Res_componentes_cu_tarifam[0].tx +
              data_Res_componentes_cu_tarifam[0].dnt1 +
              data_Res_componentes_cu_tarifam[0].pr_nt1 +
              data_Res_componentes_cu_tarifam[0].r) *
              (cfe_ + 2.73 + rc_)) /
              100
          );
        }

        setC_Ast(c_ast_);

        var cv_;

        console.log(
          data_empresam[0].ventas_usuarios_r_nt1_e +
            data_empresam[0].ventas_usuarios_r_nt1_c +
            data_empresam[0].ventas_usuarios_r_nt1_u +
            data_empresam[0].ventas_usuarios_r_nt2 +
            data_empresam[0].ventas_usuarios_r_nt3 +
            data_empresam[0].ventas_usuarios_nr_kwh
        );
        cv_ = roundToTwo(
          c_ast_ +
            cvr_ +
            (cer_ +
              data_xm_tservmcnd[0].valor +
              data_xm_tservmsiciva[0].valor +
              data_xm_tservmsic[0].valor +
              cg_acu) /
              (data_empresam[0].ventas_usuarios_r_nt1_e +
                data_empresam[0].ventas_usuarios_r_nt1_c +
                data_empresam[0].ventas_usuarios_r_nt1_u +
                data_empresam[0].ventas_usuarios_r_nt2 +
                data_empresam[0].ventas_usuarios_r_nt3 +
                data_empresam[0].ventas_usuarios_nr_kwh)
        );
        //cv_=98.8861  May 2022
        //cv_=78.96043 Jun 2022
        setCv(cv_);
      } catch (ex) {
        console.log("No hay datos calculo principal");
        console.log(ex);
        //         // execution continues here when an error was thrown. You can also inspect the `ex`ception object
      }
    }
  }, [
    loading1,
    loading2,
    loading3,
    loading4,
    loading5,
    loading6,
    loading7,
    loading8,
    loading9,
    loading9,
    loading10,
    loading11,
    loading12,
    loading13,
    loading14,
    loading15,
    loading16,
    loading17,
    loading18,
    loading19,
    loading20,
  ]);

  useEffect(() => {
    if (
      !loading1 &&
      !loading2 &&
      !loading3 &&
      !loading4 &&
      !loading5 &&
      !loading6 &&
      !loading7 &&
      !loading8 &&
      !loading9 &&
      !loading9 &&
      !loading10 &&
      !loading11 &&
      !loading12 &&
      !loading13 &&
      !loading14 &&
      !loading15 &&
      !loading16 &&
      !loading17 &&
      !loading18 &&
      !loading19 &&
      !loading20 &&
      !loading21
    ) {
      var cu_nt1_100_, cu_nt1_50_, cu_nt1_0_, cu_nt2_, cu_nt3_, cu_nt4_;
      if (dtun_nt1_e > 0) {
        cu_nt1_100_ = roundToTwo(gc + tx + r + cv + pr_nt1 + dtun_nt1_e);
        cu_nt1_50_ = roundToTwo(gc + tx + r + cv + pr_nt1 + dtun_nt1_c);
        cu_nt1_0_ = roundToTwo(gc + tx + r + cv + pr_nt1 + dtun_nt1_p);
        cu_nt2_ = roundToTwo(gc + tx + r + cv + pr_nt2 + dtun_nt2);
        cu_nt3_ = roundToTwo(gc + tx + r + cv + pr_nt3 + dtun_nt3);
        cu_nt4_ = roundToTwo(gc + tx + r + cv + pr_nt4 + dnt4);
      } else {
        cu_nt1_100_ = roundToTwo(gc + tx + r + cv + pr_nt1 + dnt1);
        cu_nt1_50_ = roundToTwo(gc + tx + r + cv + pr_nt1 + dnt1 - cdi_50);
        cu_nt1_0_ = roundToTwo(gc + tx + r + cv + pr_nt1 + dnt1 - cdi_100);
        cu_nt2_ = roundToTwo(gc + tx + r + cv + pr_nt2 + dnt2);
        cu_nt3_ = roundToTwo(gc + tx + r + cv + pr_nt3 + dnt3);
        cu_nt4_ = roundToTwo(gc + tx + r + cv + pr_nt4 + dnt4);
      }
      console.log(cu_nt1_100_);

      setCu_Nt1_100(cu_nt1_100_);
      setCu_Nt1_50(cu_nt1_50_);
      setCu_Nt1_0(cu_nt1_0_);
      setCu_Nt2(cu_nt2_);
      setCu_Nt3(cu_nt3_);
      setCu_Nt4(cu_nt4_);
    }
  }, [gc, tx, r, cv, pr_nt1, dtun_nt1_e, dnt1]);

  useEffect(() => {
    if (
      !loading1 &&
      !loading2 &&
      !loading3 &&
      !loading4 &&
      !loading5 &&
      !loading6 &&
      !loading7 &&
      !loading8 &&
      !loading9 &&
      !loading9 &&
      !loading10 &&
      !loading11 &&
      !loading12 &&
      !loading13 &&
      !loading14 &&
      !loading15 &&
      !loading16 &&
      !loading17 &&
      !loading18 &&
      !loading19 &&
      !loading20 &&
      !loading21
    ) {
      const data_Res_componentes_cu_tarifa =
        data20.obtenerRes_componentes_cu_tarifa;
      const data_Res_componentes_cu_tarifam =
        data_Res_componentes_cu_tarifa.filter(
          (data_Res_componentes_cu_tarifa) =>
            data_Res_componentes_cu_tarifa.anho === anhom &&
            data_Res_componentes_cu_tarifa.mes === mesm &&
            data_Res_componentes_cu_tarifa.empresa_id ===
              data2.obtenerUsuario.empresa
        );
      data_empresa = data3.obtenerData_empresa;
      data_empresam = data_empresa.filter(
        (data_empresa) =>
          data_empresa.anho === anhom &&
          data_empresa.mes === mesm &&
          data_empresa.empresa_id === data2.obtenerUsuario.empresa
      );

      data_dane = data1.obtenerData_dane;
      data_danem = data_dane.filter(
        (data_dane) =>
          data_dane.anho === anhom &&
          data_dane.mes === mesm &&
          data_dane.empresa_id === data2.obtenerUsuario.empresa
      );
      data_danem2 = data_dane.filter(
        (data_dane) =>
          data_dane.anho === anhom2 &&
          data_dane.mes === mesm2 &&
          data_dane.empresa_id === data2.obtenerUsuario.empresa
      );
      var data_xm_trsm = data5.obtenerData_xm_trsm;
      var data_xm_trsmm = data_xm_trsm.filter(
        (data_xm_trsm) =>
          data_xm_trsm.anho === anhom &&
          data_xm_trsm.mes === mesm &&
          data_xm_trsm.empresa_id === data2.obtenerUsuario.empresa
      );
      var ipcm = data_xm_trsmm.filter(
        (data_xm_trsmm) =>
          data_xm_trsmm.codigo === "IPDC" &&
          data_xm_trsmm.anho === anhom &&
          data_xm_trsmm.mes === mesm
      )[0].valor;

      var cu_nt1_100_ot_,
        cu_nt1_50_ot_,
        cu_nt1_0_ot_,
        cu_nt2_ot_,
        cu_nt3_ot_,
        cu_nt4_ot_;
      if (data_Res_componentes_cu_tarifam[0].saldo_nt1_100_ot > 0) {
        cu_nt1_100_ot_ = roundToTwo(
          data_Res_componentes_cu_tarifam[0].cu_nt1_100_ot * (1 + pv / 100)
        );
      } else {
        cu_nt1_100_ot_ = cu_nt1_100;
      }
      if (data_Res_componentes_cu_tarifam[0].saldo_nt1_50_ot > 0) {
        cu_nt1_50_ot_ = roundToTwo(
          data_Res_componentes_cu_tarifam[0].cu_nt1_50_ot * (1 + pv / 100)
        );
      } else {
        cu_nt1_50_ot_ = cu_nt1_50;
      }
      if (data_Res_componentes_cu_tarifam[0].saldo_nt1_0_ot > 0) {
        cu_nt1_0_ot_ = roundToTwo(
          data_Res_componentes_cu_tarifam[0].cu_nt1_0_ot * (1 + pv / 100)
        );
      } else {
        cu_nt1_0_ot_ = cu_nt1_0;
      }
      if (data_Res_componentes_cu_tarifam[0].saldo_nt2_ot > 0) {
        cu_nt2_ot_ = roundToTwo(
          data_Res_componentes_cu_tarifam[0].cu_nt2_ot * (1 + pv / 100)
        );
      } else {
        cu_nt2_ot_ = cu_nt2;
      }
      if (data_Res_componentes_cu_tarifam[0].saldo_nt3_ot > 0) {
        cu_nt3_ot_ = roundToTwo(
          data_Res_componentes_cu_tarifam[0].cu_nt3_ot * (1 + pv / 100)
        );
      } else {
        cu_nt3_ot_ = cu_nt3;
      }
      cu_nt4_ot_ = cu_nt4;

      setCu_Nt1_100_ot(cu_nt1_100_ot_);
      setCu_Nt1_50_ot(cu_nt1_50_ot_);
      setCu_Nt1_0_ot(cu_nt1_0_ot_);
      setCu_Nt2_ot(cu_nt2_ot_);
      setCu_Nt3_ot(cu_nt3_ot_);
      setCu_Nt4_ot(cu_nt4_ot_);

      const tarifamc1_100 =
        data_Res_componentes_cu_tarifam[0].nt1_100_estrato_1_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt1_100_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt1_100_ot
        );
      const tarifamc2_100 =
        data_Res_componentes_cu_tarifam[0].nt1_100_estrato_2_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt1_100_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt1_100_ot
        );
      const tarifamc1_50 =
        data_Res_componentes_cu_tarifam[0].nt1_50_estrato_1_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt1_50_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt1_50_ot
        );
      const tarifamc2_50 =
        data_Res_componentes_cu_tarifam[0].nt1_50_estrato_2_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt1_50_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt1_50_ot
        );
      const tarifamc1_0 =
        data_Res_componentes_cu_tarifam[0].nt1_0_estrato_1_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt1_0_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt1_0_ot
        );
      const tarifamc2_0 =
        data_Res_componentes_cu_tarifam[0].nt1_0_estrato_2_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt1_0_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt1_0_ot
        );
      const tarifamc1_NT2 =
        data_Res_componentes_cu_tarifam[0].nt2_estrato_1_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt2_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt2_ot
        );
      const tarifamc1_NT3 =
        data_Res_componentes_cu_tarifam[0].nt3_estrato_1_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt3_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt3_ot
        );
      const tarifamc1_NT4 =
        data_Res_componentes_cu_tarifam[0].nt4_estrato_1_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt4_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt4_ot
        );
      const tarifamc2_NT2 =
        data_Res_componentes_cu_tarifam[0].nt2_estrato_2_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt2_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt2_ot
        );
      const tarifamc2_NT3 =
        data_Res_componentes_cu_tarifam[0].nt3_estrato_2_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt3_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt3_ot
        );
      const tarifamc2_NT4 =
        data_Res_componentes_cu_tarifam[0].nt4_estrato_2_men_cs *
        Math.min(
          ipcm / data_danem2[0].ipc,
          cu_nt4_ot_ / data_Res_componentes_cu_tarifam[0].cu_nt4_ot
        );

      var porc_subE1_100_,
        porc_subE2_100_,
        porc_subE1_50_,
        porc_subE2_50_,
        porc_subE1_0_,
        porc_subE2_0_,
        porc_subE1_NT2_,
        porc_subE2_NT2_,
        porc_subE1_NT3_,
        porc_subE2_NT3_,
        porc_subE1_NT4_,
        porc_subE2_NT4_;
      if (1 - tarifamc1_100 / cu_nt1_100_ot_ < 0.6) {
        porc_subE1_100_ = 1 - tarifamc1_100 / cu_nt1_100_ot_;
      } else {
        porc_subE1_100_ = 0.6;
      }
      if (1 - tarifamc2_100 / cu_nt1_100_ot_ < 0.5) {
        porc_subE2_100_ = 1 - tarifamc2_100 / cu_nt1_100_ot_;
      } else {
        porc_subE2_100_ = 0.5;
      }
      if (1 - tarifamc1_50 / cu_nt1_50_ot_ < 0.6) {
        porc_subE1_50_ = 1 - tarifamc1_50 / cu_nt1_50_ot_;
      } else {
        porc_subE1_50_ = 0.6;
      }
      if (1 - tarifamc2_50 / cu_nt1_50_ot_ < 0.5) {
        porc_subE2_50_ = 1 - tarifamc2_50 / cu_nt1_50_ot_;
      } else {
        porc_subE2_50_ = 0.5;
      }
      if (1 - tarifamc1_0 / cu_nt1_0_ot_ < 0.6) {
        porc_subE1_0_ = 1 - tarifamc1_0 / cu_nt1_0_ot_;
      } else {
        porc_subE1_0_ = 0.6;
      }
      if (1 - tarifamc2_0 / cu_nt1_0_ot_ < 0.5) {
        porc_subE2_0_ = 1 - tarifamc2_0 / cu_nt1_0_ot_;
      } else {
        porc_subE2_0_ = 0.5;
      }
      if (1 - tarifamc1_NT2 / cu_nt2_ot_ < 0.6) {
        porc_subE1_NT2_ = 1 - tarifamc1_NT2 / cu_nt2_ot_;
      } else {
        porc_subE1_NT2_ = 0.6;
      }
      if (1 - tarifamc1_NT3 / cu_nt3_ot_ < 0.6) {
        porc_subE1_NT3_ = 1 - tarifamc1_NT3 / cu_nt3_ot_;
      } else {
        porc_subE1_NT3_ = 0.6;
      }
      if (1 - tarifamc1_NT4 / cu_nt4_ot_ < 0.6) {
        porc_subE1_NT4_ = 1 - tarifamc1_NT4 / cu_nt4_ot_;
      } else {
        porc_subE1_NT4_ = 0.6;
      }
      if (1 - tarifamc2_NT2 / cu_nt2_ot_ < 0.5) {
        porc_subE2_NT2_ = 1 - tarifamc2_NT2 / cu_nt2_ot_;
      } else {
        porc_subE2_NT2_ = 0.5;
      }
      if (1 - tarifamc2_NT3 / cu_nt3_ot_ < 0.5) {
        porc_subE2_NT3_ = 1 - tarifamc2_NT3 / cu_nt3_ot_;
      } else {
        porc_subE2_NT3_ = 0.5;
      }
      if (1 - tarifamc2_NT4 / cu_nt4_ot_ < 0.5) {
        porc_subE2_NT4_ = 1 - tarifamc2_NT4 / cu_nt4_ot_;
      } else {
        porc_subE2_NT4_ = 0.5;
      }
      setPorc_subE1_100(porc_subE1_100_);
      setPorc_subE2_100(porc_subE2_100_);
      setPorc_subE1_50(porc_subE1_50_);
      setPorc_subE2_50(porc_subE2_50_);
      setPorc_subE1_0(porc_subE1_0_);
      setPorc_subE2_0(porc_subE2_0_);
      setPorc_subE1_NT2(porc_subE1_NT2_);
      setPorc_subE1_NT3(porc_subE2_NT2_);
      setPorc_subE1_NT4(porc_subE1_NT3_);
      setPorc_subE2_NT2(porc_subE2_NT3_);
      setPorc_subE2_NT3(porc_subE1_NT4_);
      setPorc_subE2_NT4(porc_subE2_NT4_);
      //Res https://gestornormativo.creg.gov.co/gestor/entorno/docs/resolucion_creg_101-31_2022.htm OCT y NOv
//       setNt1_100_Estrato_1_Men_Cs(
//         roundToTwo(cu_nt1_100_ot_ * (1 - porc_subE1_100_))
//       );
//       setNt1_100_Estrato_2_Men_Cs(
//         roundToTwo(cu_nt1_100_ot_ * (1 - porc_subE2_100_))
//       );

setNt1_100_Estrato_1_Men_Cs(
                roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_1_men_cs * pv)
              );
              setNt1_100_Estrato_2_Men_Cs(
                roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_2_men_cs * pv)
              );
      setNt1_100_Estrato_3_Men_Cs(roundToTwo(cu_nt1_100_ot_ * (1 - 0.15)));
      setNt1_100_Estrato_4_Men_Cs(roundToTwo(cu_nt1_100_ot_));
      setNt1_100_Estrato_5_Men_Cs(roundToTwo(cu_nt1_100_ot_ * 1.2));
      setNt1_100_Estrato_6_Men_Cs(roundToTwo(cu_nt1_100_ot_ * 1.2));
      setNt1_100_Estrato_4(roundToTwo(cu_nt1_100_ot_));
      setNt1_100_Estrato_5(roundToTwo(cu_nt1_100_ot_ * 1.2));
      setNt1_100_Estrato_6(roundToTwo(cu_nt1_100_ot_ * 1.2));
      setNt1_100_C(roundToTwo(cu_nt1_100_ot_ * 1.2));
      setNt1_100_I_Con_C(roundToTwo(cu_nt1_100_ot_ * 1.2));
      setNt1_100_I_Sin_C(roundToTwo(cu_nt1_100_ot_));
      setNt1_100_P(roundToTwo(cu_nt1_100_ot_));
      setNt1_100_O(roundToTwo(cu_nt1_100_ot_));

      setNt1_50__Estrato_1_Men_Cs(
        roundToTwo(cu_nt1_50_ot_ * (1 - porc_subE1_50_))
      );
      setNt1_50__Estrato_2_Men_Cs(
        roundToTwo(cu_nt1_50_ot_ * (1 - porc_subE2_50_))
      );
      setNt1_50__Estrato_3_Men_Cs(roundToTwo(cu_nt1_50_ot_ * (1 - 0.15)));
      setNt1_50__Estrato_4_Men_Cs(roundToTwo(cu_nt1_50_ot_));
      setNt1_50__Estrato_5_Men_Cs(roundToTwo(cu_nt1_50_ot_ * 1.2));
      setNt1_50__Estrato_6_Men_Cs(roundToTwo(cu_nt1_50_ot_ * 1.2));
      setNt1_50__Estrato_4(roundToTwo(cu_nt1_50_ot_ * 1));
      setNt1_50__Estrato_5(roundToTwo(cu_nt1_50_ot_ * 1.2));
      setNt1_50__Estrato_6(roundToTwo(cu_nt1_50_ot_ * 1.2));
      setNt1_50__C(roundToTwo(cu_nt1_50_ot_ * 1.2));
      setNt1_50__I_Con_C(roundToTwo(cu_nt1_50_ot_ * 1.2));
      setNt1_50__I_Sin_C(roundToTwo(cu_nt1_50_ot_ * 1));
      setNt1_50__P(roundToTwo(cu_nt1_50_ot_ * 1));
      setNt1_50__O(roundToTwo(cu_nt1_50_ot_ * 1));

      setNt1_0_Estrato_1_Men_Cs(roundToTwo(cu_nt1_0_ot_ * (1 - porc_subE1_0_)));
      setNt1_0_Estrato_2_Men_Cs(roundToTwo(cu_nt1_0_ot_ * (1 - porc_subE2_0_)));
      setNt1_0_Estrato_3_Men_Cs(roundToTwo(cu_nt1_0_ot_ * (1 - 0.15)));
      setNt1_0_Estrato_4_Men_Cs(roundToTwo(cu_nt1_0_ot_ * 1));
      setNt1_0_Estrato_5_Men_Cs(roundToTwo(cu_nt1_0_ot_ * 1.2));
      setNt1_0_Estrato_6_Men_Cs(roundToTwo(cu_nt1_0_ot_ * 1.2));
      setNt1_0_Estrato_4(roundToTwo(cu_nt1_0_ot_));
      setNt1_0_Estrato_5(roundToTwo(cu_nt1_0_ot_ * 1.2));
      setNt1_0_Estrato_6(roundToTwo(cu_nt1_0_ot_ * 1.2));
      setNt1_0_C(roundToTwo(cu_nt1_0_ot_ * 1.2));
      setNt1_0_I_Con_C(roundToTwo(cu_nt1_0_ot_ * 1.2));
      setNt1_0_I_Sin_C(roundToTwo(cu_nt1_0_ot_ * 1));
      setNt1_0_P(roundToTwo(cu_nt1_0_ot_ * 1));
      setNt1_0_O(roundToTwo(cu_nt1_0_ot_ * 1));

      setNt2_C(roundToTwo(cu_nt2_ot_ * 1.2));
      setNt2_I_Con_C(roundToTwo(cu_nt2_ot_ * 1.2));
      setNt2_I_Sin_C(roundToTwo(cu_nt2_ot_));
      setNt2_O(roundToTwo(cu_nt2_ot_));
      setNt2_Ap(roundToTwo(cu_nt2_ot_));
      setNt2_Bsnmen_Cs(roundToTwo(cu_nt2_ot_ * (1 - porc_subE1_NT2_)));
      setNt2_Bsnmay_Cs(roundToTwo(cu_nt2_ot_));
      setNt2_estrato_1_men_cs(roundToTwo(cu_nt2_ot_ * (1 - porc_subE1_NT2_)));
      setNt2_estrato_2_men_cs(roundToTwo(cu_nt2_ot_ * (1 - porc_subE2_NT2_)));

      setNt3_C(roundToTwo(cu_nt3_ot_));
      setNt3_I_Con_C(roundToTwo(cu_nt3_ot_ * 1.2));
      setNt3_I_Sin_C(roundToTwo(cu_nt3_ot_));
      setNt3_O(roundToTwo(cu_nt3_ot_));
      setNt3_Ap(roundToTwo(cu_nt3_ot_));
      setNt3_estrato_2_men_cs(roundToTwo(cu_nt3_ot_ * (1 - porc_subE2_NT3_)));
      setNt3_estrato_1_men_cs(roundToTwo(cu_nt3_ot_ * (1 - porc_subE1_NT3_)));

      setNt4_estrato_1_men_cs(roundToTwo(cu_nt4_ot_ * (1 - porc_subE1_NT4_)));
      setNt4_estrato_2_men_cs(roundToTwo(cu_nt4_ot_ * (1 - porc_subE2_NT4_)));

      var saldo_nt1_100_ot_,
        saldo_nt1_50_ot_,
        saldo_nt1_0_ot_,
        saldo_nt2_ot_,
        saldo_nt3_ot_;

      saldo_nt1_100_ot_ =
        ((cu_nt1_100 -
          data_Res_componentes_cu_tarifam[0].cu_nt1_100_ot * (1 + pv / 100)) *
          data_empresam[0].ventas_usuarios_r_nt1_e +
          data_Res_componentes_cu_tarifam[0].saldo_nt1_100_ot) *
        (1 + tasaOt);
      saldo_nt1_50_ot_ =
        ((cu_nt1_50 -
          data_Res_componentes_cu_tarifam[0].cu_nt1_50_ot * (1 + pv / 100)) *
          data_empresam[0].ventas_usuarios_r_nt1_c +
          data_Res_componentes_cu_tarifam[0].saldo_nt1_50_ot) *
        (1 + tasaOt);
      saldo_nt1_0_ot_ =
        ((cu_nt1_0 -
          data_Res_componentes_cu_tarifam[0].cu_nt1_0_ot * (1 + pv / 100)) *
          data_empresam[0].ventas_usuarios_r_nt1_u +
          data_Res_componentes_cu_tarifam[0].saldo_nt1_0_ot) *
        (1 + tasaOt);
      saldo_nt2_ot_ =
        ((cu_nt2 -
          data_Res_componentes_cu_tarifam[0].cu_nt2_ot * (1 + pv / 100)) *
          data_empresam[0].ventas_usuarios_r_nt2 +
          data_Res_componentes_cu_tarifam[0].saldo_nt2_ot) *
        (1 + tasaOt);
      saldo_nt3_ot_ =
        ((cu_nt3 -
          data_Res_componentes_cu_tarifam[0].cu_nt3_ot * (1 + pv / 100)) *
          data_empresam[0].ventas_usuarios_r_nt3 +
          data_Res_componentes_cu_tarifam[0].saldo_nt3_ot) *
        (1 + tasaOt);

      if (saldo_nt1_100_ot_ < 0) {
        setSaldo_Nt1_100_ot(0);
      } else {
        setSaldo_Nt1_100_ot(saldo_nt1_100_ot_);
      }
      if (saldo_nt1_50_ot_ < 0) {
        setSaldo_Nt1_50_ot(0);
      } else {
        setSaldo_Nt1_50_ot(saldo_nt1_50_ot_);
      }
      if (saldo_nt1_0_ot_ < 0) {
        setSaldo_Nt1_0_ot(0);
      } else {
        setSaldo_Nt1_0_ot(saldo_nt1_0_ot_);
      }
      if (saldo_nt2_ot_ < 0) {
        setSaldo_Nt2_ot(0);
      } else {
        setSaldo_Nt2_ot(saldo_nt2_ot_);
      }
      if (saldo_nt3_ot_ < 0) {
        setSaldo_Nt3_ot(0);
      } else {
        setSaldo_Nt3_ot(saldo_nt3_ot_);
      }
      setSaldo_Total_ot(
        saldo_nt1_100_ot_ +
          saldo_nt1_50_ot_ +
          saldo_nt1_0_ot_ +
          saldo_nt2_ot_ +
          saldo_nt3_ot_
      );
    }
  }, [pv, cu_nt1_100]);

  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  const onChange = (e) => {
    formik.handleChange;

    setPv(parseFloat(e.target.value));
  };

  return (
    <div>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="myModal"
        onHide={props.close}
      >
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
                {!loading1 ? (
                  data1.obtenerData_dane.filter(
                    (obtenerData_dane) =>
                      obtenerData_dane.anho === anhom &&
                      obtenerData_dane.mes === mesm &&
                      obtenerData_dane.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_DANE</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_DANE</p>
                  )
                ) : null}
                {!loading3 ? (
                  data3.obtenerData_empresa.filter(
                    (obtenerData_empresa) =>
                      obtenerData_empresa.anho === anhom &&
                      obtenerData_empresa.mes === mesm &&
                      obtenerData_empresa.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_EMPRESA</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_EMPRESA</p>
                  )
                ) : null}
                {!loading4 ? (
                  data4.obtenerData_xm_tserv.filter(
                    (obtenerData_xm_tserv) =>
                      obtenerData_xm_tserv.anho === anhom &&
                      obtenerData_xm_tserv.mes === mesm &&
                      obtenerData_xm_tserv.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_TSERV</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_TSERV</p>
                  )
                ) : null}
                {!loading5 ? (
                  data5.obtenerData_xm_trsm.filter(
                    (obtenerData_xm_trsm) =>
                      obtenerData_xm_trsm.anho === anhom &&
                      obtenerData_xm_trsm.mes === mesm &&
                      obtenerData_xm_trsm.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_TRSM</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_TRSM</p>
                  )
                ) : null}
                {!loading6 ? (
                  data6.obtenerData_xm_dspctto.filter(
                    (obtenerData_xm_dspctto) =>
                      obtenerData_xm_dspctto.anho === anhom &&
                      obtenerData_xm_dspctto.mes === mesm &&
                      obtenerData_xm_dspctto.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_DSPCTTO</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_DSPCTTO</p>
                  )
                ) : null}
                {!loading7 ? (
                  data7.obtenerData_xm_afac.filter(
                    (obtenerData_xm_afac) =>
                      obtenerData_xm_afac.anho === anhom &&
                      obtenerData_xm_afac.mes === mesm &&
                      obtenerData_xm_afac.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_AFAC</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_AFAC</p>
                  )
                ) : null}
                {!loading8 ? (
                  data8.obtenerData_xm_adem.filter(
                    (obtenerData_xm_adem) =>
                      obtenerData_xm_adem.anho === anhom &&
                      obtenerData_xm_adem.mes === mesm &&
                      obtenerData_xm_adem.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_ADEM</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_ADEM</p>
                  )
                ) : null}
                {/* { !loading9? (data9.obtenerData_mme_validacion.filter(obtenerData_mme_validacion => obtenerData_mme_validacion.anho===anhom && obtenerData_mme_validacion.mes===mesm)).length>0? <p> Ok DATA_MME_VALIDACION</p>:<p>No se encontraron insumos en DATA_MME_VALIDACION</p>: null}
                { !loading10? (data10.obtenerData_mme_giro.filter(obtenerData_mme_giro => obtenerData_mme_giro.anho===anhom && obtenerData_mme_giro.mes===mesm)).length>0? <p> Ok DATA_MME_GIRO</p>:<p>No se encontraron insumos en DATA_MME_GIRO</p>: null} */}
                {!loading11 ? (
                  data11.obtenerData_creg_cx.length > 0 ? (
                    <p> Ok DATA_CREG_CX</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_CREG_CX</p>
                  )
                ) : null}
                {/* { !loading12? (data12.obtenerData_banrepublica_tco.filter(obtenerData_banrepublica_tco => obtenerData_banrepublica_tco.anho===anhom && obtenerData_banrepublica_tco.mes===mesm)).length>0? <p> Ok DATA_BANREPUBLICA_TCO_e</p>:<p>No se encontraron insumos en DATA_BANREPUBLICA_TCO</p>: null} */}
                {/* { !loading13? (data13.obtenerData_banrepublica_tcap.filter(obtenerData_banrepublica_tcap => obtenerData_banrepublica_tcap.anho===anhom && obtenerData_banrepublica_tcap.mes===mesm)).length>0? <p> Ok DATA_BANREPUBLICA_TCAP_e</p>:<p>No se encontraron insumos en DATA_BANREPUBLICA_TCAP</p>: null} */}
                {!loading14 ? (
                  data14.obtenerDataxmstn.filter(
                    (obtenerDataxmstn) =>
                      obtenerDataxmstn.anho === anho &&
                      obtenerDataxmstn.mes === mes &&
                      obtenerDataxmstn.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_DATAXMSTN</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_DATAXMSTN</p>
                  )
                ) : null}
                {!loading15 ? (
                  data15.obtenerData_xm_cprog.filter(
                    (obtenerData_xm_cprog) =>
                      obtenerData_xm_cprog.anho === anho &&
                      obtenerData_xm_cprog.mes === mes &&
                      obtenerData_xm_cprog.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_CPROG</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_CPROG</p>
                  )
                ) : null}
                {!loading16 ? (
                  data16.obtenerData_xm_ipr.filter(
                    (obtenerData_xm_ipr) =>
                      obtenerData_xm_ipr.anho === anho &&
                      obtenerData_xm_ipr.mes === mes &&
                      obtenerData_xm_ipr.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_IPR</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_IPR</p>
                  )
                ) : null}
                {!loading17 ? (
                  data17.obtenerData_xm_d015.filter(
                    (obtenerData_xm_d015) =>
                      obtenerData_xm_d015.anho === anho &&
                      obtenerData_xm_d015.mes === mes &&
                      obtenerData_xm_d015.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_D015</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_D015</p>
                  )
                ) : null}
                {!loading18 ? (
                  data18.obtenerData_xm_dtun.filter(
                    (obtenerData_xm_dtun) =>
                      obtenerData_xm_dtun.anho === anho &&
                      obtenerData_xm_dtun.mes === mes &&
                      obtenerData_xm_dtun.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_DTUN</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_DTUN</p>
                  )
                ) : null}
                {!loading19 ? (
                  data19.obtenerData_xm_guatape.filter(
                    (obtenerData_xm_guatape) =>
                      obtenerData_xm_guatape.anho === anho &&
                      obtenerData_xm_guatape.mes === mes &&
                      obtenerData_xm_guatape.empresa_id ===
                        data2.obtenerUsuario.empresa
                  ).length > 0 ? (
                    <p> Ok DATA_XM_GUATAPE</p>
                  ) : (
                    <p>No se encontraron insumos en DATA_XM_GUATAPE</p>
                  )
                ) : null}
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
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group row">
                    <label
                      htmlFor="creador"
                      className="col-sm-7 col-form-label"
                    >
                      creador
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="creador"
                        placeholder="creador"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.creador}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.creador && formik.errors.creador ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.creador}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="anho" className="col-sm-7 col-form-label">
                      Anho
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="anho"
                        placeholder="Anho"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.anho}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.anho && formik.errors.anho ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.anho}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="mes" className="col-sm-7 col-form-label">
                      Mes
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="mes"
                        placeholder="Mes"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mes}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.mes && formik.errors.mes ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.mes}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="qc" className="col-sm-7 col-form-label">
                      Qc
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="qc"
                        placeholder="Qc"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.qc}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.qc && formik.errors.qc ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.qc}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="pc" className="col-sm-7 col-form-label">
                      Pc
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="pc"
                        placeholder="Pc"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pc}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.pc && formik.errors.pc ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.pc}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="ref_g" className="col-sm-7 col-form-label">
                      Ref_G
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="ref_g"
                        placeholder="Ref_G"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ref_g}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.ref_g && formik.errors.ref_g ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.ref_g}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="max_g" className="col-sm-7 col-form-label">
                      Max_G
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="max_g"
                        placeholder="Max_G"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.max_g}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.max_g && formik.errors.max_g ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.max_g}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cr" className="col-sm-7 col-form-label">
                      Cr
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cr"
                        placeholder="Cr"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cr}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cr && formik.errors.cr ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cr}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="ad" className="col-sm-7 col-form-label">
                      Ad
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="ad"
                        placeholder="Ad"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ad}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.ad && formik.errors.ad ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.ad}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="aj" className="col-sm-7 col-form-label">
                      Aj
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="aj"
                        placeholder="Aj"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.aj}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.aj && formik.errors.aj ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.aj}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="pb" className="col-sm-7 col-form-label">
                      Pb
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="pb"
                        placeholder="Pb"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pb}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.pb && formik.errors.pb ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.pb}</p>
                    </div>
                  ) : null}

                  {/* <div className="form-group row">
<div class="row ">
    <div class="col-md-6">

    <label htmlFor="gc" className="col-form-label">Gc</label>

    </div>
    <div class="col-md-3">
    <input type="number" className="form-control" id="gc" placeholder="Gc"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.gc}></input>

   
    </div>
    <div class="col-md-2 px-1">
    <button className="px-2"><i className="fa fa-sliders white"></i></button>
    <button className="px-2"><i className="fa fa-info mr-2 white"></i></button>
    </div>
    
    </div>
</div>
{ formik.touched.gc&& formik.errors.gc? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.gc}</p>
</div>
) : null  } */}

                  <div className="form-group row">
                    <label htmlFor="gc" className="col-sm-7 col-form-label">
                      Gc
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="gc"
                        placeholder="Gc"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gc}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.gc && formik.errors.gc ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.gc}</p>
                    </div>
                  ) : null}

                  <div className="form-group row">
                    <label htmlFor="tx" className="col-sm-7 col-form-label">
                      Tx
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="tx"
                        placeholder="Tx"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tx}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.tx && formik.errors.tx ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.tx}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="dtun_nt1_e"
                      className="col-sm-7 col-form-label"
                    >
                      Dtun_Nt1_E
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="dtun_nt1_e"
                        placeholder="Dtun_Nt1_E"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dtun_nt1_e}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.dtun_nt1_e && formik.errors.dtun_nt1_e ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.dtun_nt1_e}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="dtun_nt1_c"
                      className="col-sm-7 col-form-label"
                    >
                      Dtun_Nt1_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="dtun_nt1_c"
                        placeholder="Dtun_Nt1_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dtun_nt1_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.dtun_nt1_c && formik.errors.dtun_nt1_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.dtun_nt1_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="dtun_nt1_p"
                      className="col-sm-7 col-form-label"
                    >
                      Dtun_Nt1_P
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="dtun_nt1_p"
                        placeholder="Dtun_Nt1_P"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dtun_nt1_p}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.dtun_nt1_p && formik.errors.dtun_nt1_p ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.dtun_nt1_p}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="dtun_nt2"
                      className="col-sm-7 col-form-label"
                    >
                      Dtun_Nt2
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="dtun_nt2"
                        placeholder="Dtun_Nt2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dtun_nt2}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.dtun_nt2 && formik.errors.dtun_nt2 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.dtun_nt2}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="dtun_nt3"
                      className="col-sm-7 col-form-label"
                    >
                      Dtun_Nt3
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="dtun_nt3"
                        placeholder="Dtun_Nt3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dtun_nt3}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.dtun_nt3 && formik.errors.dtun_nt3 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.dtun_nt3}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="cdi_100"
                      className="col-sm-7 col-form-label"
                    >
                      Cdi_100
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cdi_100"
                        placeholder="Cdi_100"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cdi_100}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cdi_100 && formik.errors.cdi_100 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cdi_100}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cdi_50" className="col-sm-7 col-form-label">
                      Cdi_50
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cdi_50"
                        placeholder="Cdi_50"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cdi_50}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cdi_50 && formik.errors.cdi_50 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cdi_50}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cdm" className="col-sm-7 col-form-label">
                      Cdm
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cdm"
                        placeholder="Cdm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cdm}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cdm && formik.errors.cdm ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cdm}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cd4" className="col-sm-7 col-form-label">
                      Cd4
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cd4"
                        placeholder="Cd4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cd4}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cd4 && formik.errors.cd4 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cd4}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cd3" className="col-sm-7 col-form-label">
                      Cd3
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cd3"
                        placeholder="Cd3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cd3}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cd3 && formik.errors.cd3 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cd3}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cd2" className="col-sm-7 col-form-label">
                      Cd2
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cd2"
                        placeholder="Cd2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cd2}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cd2 && formik.errors.cd2 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cd2}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="dnt1" className="col-sm-7 col-form-label">
                      Dnt1
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="dnt1"
                        placeholder="Dnt1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dnt1}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.dnt1 && formik.errors.dnt1 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.dnt1}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="dnt2" className="col-sm-7 col-form-label">
                      Dnt2
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="dnt2"
                        placeholder="Dnt2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dnt2}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.dnt2 && formik.errors.dnt2 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.dnt2}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="dnt3" className="col-sm-7 col-form-label">
                      Dnt3
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="dnt3"
                        placeholder="Dnt3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dnt3}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.dnt3 && formik.errors.dnt3 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.dnt3}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="dnt4" className="col-sm-7 col-form-label">
                      Dnt4
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="dnt4"
                        placeholder="Dnt4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dnt4}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.dnt4 && formik.errors.dnt4 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.dnt4}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="crs" className="col-sm-7 col-form-label">
                      Crs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="crs"
                        placeholder="Crs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.crs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.crs && formik.errors.crs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.crs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="rcal" className="col-sm-7 col-form-label">
                      Rcal
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="rcal"
                        placeholder="Rcal"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rcal}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.rcal && formik.errors.rcal ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.rcal}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="r" className="col-sm-7 col-form-label">
                      R
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="r"
                        placeholder="R"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.r}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.r && formik.errors.r ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.r}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="iprstn" className="col-sm-7 col-form-label">
                      Iprstn
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="iprstn"
                        placeholder="Iprstn"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.iprstn}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.iprstn && formik.errors.iprstn ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.iprstn}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="pr_nt1" className="col-sm-7 col-form-label">
                      Pr_Nt1
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="pr_nt1"
                        placeholder="Pr_Nt1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pr_nt1}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.pr_nt1 && formik.errors.pr_nt1 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.pr_nt1}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="pr_nt2" className="col-sm-7 col-form-label">
                      Pr_Nt2
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="pr_nt2"
                        placeholder="Pr_Nt2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pr_nt2}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.pr_nt2 && formik.errors.pr_nt2 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.pr_nt2}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="pr_nt3" className="col-sm-7 col-form-label">
                      Pr_Nt3
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="pr_nt3"
                        placeholder="Pr_Nt3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pr_nt3}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.pr_nt3 && formik.errors.pr_nt3 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.pr_nt3}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="pr_nt4" className="col-sm-7 col-form-label">
                      Pr_Nt4
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="pr_nt4"
                        placeholder="Pr_Nt4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pr_nt4}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.pr_nt4 && formik.errors.pr_nt4 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.pr_nt4}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cer" className="col-sm-7 col-form-label">
                      Cer
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cer"
                        placeholder="Cer"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cer}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cer && formik.errors.cer ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cer}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cfm" className="col-sm-7 col-form-label">
                      Cfm
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cfm"
                        placeholder="Cfm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cfm}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cfm && formik.errors.cfm ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cfm}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="rc" className="col-sm-7 col-form-label">
                      Rc
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="rc"
                        placeholder="Rc"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rc}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.rc && formik.errors.rc ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.rc}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="ul_trim_val_mme"
                      className="col-sm-7 col-form-label"
                    >
                      Ul_Trim_Val_Mme
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="ul_trim_val_mme"
                        placeholder="Ul_Trim_Val_Mme"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ul_trim_val_mme}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.ul_trim_val_mme &&
                  formik.errors.ul_trim_val_mme ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.ul_trim_val_mme}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="anho_ul_trim_val_mme"
                      className="col-sm-7 col-form-label"
                    >
                      Anho_Ul_Trim_Val_Mme
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="anho_ul_trim_val_mme"
                        placeholder="Anho_Ul_Trim_Val_Mme"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.anho_ul_trim_val_mme}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.anho_ul_trim_val_mme &&
                  formik.errors.anho_ul_trim_val_mme ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.anho_ul_trim_val_mme}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="sub1" className="col-sm-7 col-form-label">
                      Sub1
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="sub1"
                        placeholder="Sub1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sub1}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.sub1 && formik.errors.sub1 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.sub1}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="sub2" className="col-sm-7 col-form-label">
                      Sub2
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="sub2"
                        placeholder="Sub2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sub2}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.sub2 && formik.errors.sub2 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.sub2}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="n_sub1" className="col-sm-7 col-form-label">
                      N_Sub1
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="n_sub1"
                        placeholder="N_Sub1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.n_sub1}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.n_sub1 && formik.errors.n_sub1 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.n_sub1}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="m_sub2" className="col-sm-7 col-form-label">
                      M_Sub2
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="m_sub2"
                        placeholder="M_Sub2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.m_sub2}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.m_sub2 && formik.errors.m_sub2 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.m_sub2}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="facturacion_t"
                      className="col-sm-7 col-form-label"
                    >
                      Facturacion_T
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="facturacion_t"
                        placeholder="Facturacion_T"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.facturacion_t}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.facturacion_t &&
                  formik.errors.facturacion_t ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.facturacion_t}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="r1" className="col-sm-7 col-form-label">
                      R1
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="r1"
                        placeholder="R1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.r1}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.r1 && formik.errors.r1 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.r1}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="r2" className="col-sm-7 col-form-label">
                      R2
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="r2"
                        placeholder="R2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.r2}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.r2 && formik.errors.r2 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.r2}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="sup_def"
                      className="col-sm-7 col-form-label"
                    >
                      Sup_Def
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="sup_def"
                        placeholder="Sup_Def"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sup_def}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.sup_def && formik.errors.sup_def ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.sup_def}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cfs" className="col-sm-7 col-form-label">
                      Cfs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cfs"
                        placeholder="Cfs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cfs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cfs && formik.errors.cfs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cfs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cfe" className="col-sm-7 col-form-label">
                      Cfe
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cfe"
                        placeholder="Cfe"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cfe}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cfe && formik.errors.cfe ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cfe}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="c_ast" className="col-sm-7 col-form-label">
                      C_Ast
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="c_ast"
                        placeholder="C_Ast"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.c_ast}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.c_ast && formik.errors.c_ast ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.c_ast}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cvr" className="col-sm-7 col-form-label">
                      Cvr
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cvr"
                        placeholder="Cvr"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cvr}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cvr && formik.errors.cvr ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cvr}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cv" className="col-sm-7 col-form-label">
                      Cv
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cv"
                        placeholder="Cv"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cv}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cv && formik.errors.cv ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cv}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="cu_nt1_100"
                      className="col-sm-7 col-form-label"
                    >
                      Cu_Nt1_100
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cu_nt1_100"
                        placeholder="Cu_Nt1_100"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cu_nt1_100}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cu_nt1_100 && formik.errors.cu_nt1_100 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cu_nt1_100}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="cu_nt1_50"
                      className="col-sm-7 col-form-label"
                    >
                      Cu_Nt1_50
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cu_nt1_50"
                        placeholder="Cu_Nt1_50"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cu_nt1_50}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cu_nt1_50 && formik.errors.cu_nt1_50 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cu_nt1_50}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="cu_nt1_0"
                      className="col-sm-7 col-form-label"
                    >
                      Cu_Nt1_0
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cu_nt1_0"
                        placeholder="Cu_Nt1_0"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cu_nt1_0}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cu_nt1_0 && formik.errors.cu_nt1_0 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cu_nt1_0}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cu_nt2" className="col-sm-7 col-form-label">
                      Cu_Nt2
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cu_nt2"
                        placeholder="Cu_Nt2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cu_nt2}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cu_nt2 && formik.errors.cu_nt2 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cu_nt2}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cu_nt3" className="col-sm-7 col-form-label">
                      Cu_Nt3
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cu_nt3"
                        placeholder="Cu_Nt3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cu_nt3}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cu_nt3 && formik.errors.cu_nt3 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cu_nt3}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="cu_nt4" className="col-sm-7 col-form-label">
                      Cu_Nt4
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="cu_nt4"
                        placeholder="Cu_Nt4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cu_nt4}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.cu_nt4 && formik.errors.cu_nt4 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.cu_nt4}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_estrato_1_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_Estrato_1_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_estrato_1_men_cs"
                        placeholder="Nt1_100_Estrato_1_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_estrato_1_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_estrato_1_men_cs &&
                  formik.errors.nt1_100_estrato_1_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_estrato_1_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_estrato_2_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_Estrato_2_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_estrato_2_men_cs"
                        placeholder="Nt1_100_Estrato_2_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_estrato_2_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_estrato_2_men_cs &&
                  formik.errors.nt1_100_estrato_2_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_estrato_2_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_estrato_3_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_Estrato_3_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_estrato_3_men_cs"
                        placeholder="Nt1_100_Estrato_3_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_estrato_3_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_estrato_3_men_cs &&
                  formik.errors.nt1_100_estrato_3_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_estrato_3_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_estrato_4_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_Estrato_4_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_estrato_4_men_cs"
                        placeholder="Nt1_100_Estrato_4_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_estrato_4_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_estrato_4_men_cs &&
                  formik.errors.nt1_100_estrato_4_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_estrato_4_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_estrato_5_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_Estrato_5_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_estrato_5_men_cs"
                        placeholder="Nt1_100_Estrato_5_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_estrato_5_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_estrato_5_men_cs &&
                  formik.errors.nt1_100_estrato_5_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_estrato_5_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_estrato_6_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_Estrato_6_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_estrato_6_men_cs"
                        placeholder="Nt1_100_Estrato_6_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_estrato_6_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_estrato_6_men_cs &&
                  formik.errors.nt1_100_estrato_6_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_estrato_6_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_estrato_4"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_Estrato_4
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_estrato_4"
                        placeholder="Nt1_100_Estrato_4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_estrato_4}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_estrato_4 &&
                  formik.errors.nt1_100_estrato_4 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_estrato_4}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_estrato_5"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_Estrato_5
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_estrato_5"
                        placeholder="Nt1_100_Estrato_5"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_estrato_5}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_estrato_5 &&
                  formik.errors.nt1_100_estrato_5 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_estrato_5}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_estrato_6"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_Estrato_6
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_estrato_6"
                        placeholder="Nt1_100_Estrato_6"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_estrato_6}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_estrato_6 &&
                  formik.errors.nt1_100_estrato_6 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_estrato_6}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_c"
                        placeholder="Nt1_100_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_c && formik.errors.nt1_100_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_i_con_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_I_Con_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_i_con_c"
                        placeholder="Nt1_100_I_Con_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_i_con_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_i_con_c &&
                  formik.errors.nt1_100_i_con_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_i_con_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_i_sin_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_I_Sin_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_i_sin_c"
                        placeholder="Nt1_100_I_Sin_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_i_sin_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_i_sin_c &&
                  formik.errors.nt1_100_i_sin_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_i_sin_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_p"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_P
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_p"
                        placeholder="Nt1_100_P"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_p}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_p && formik.errors.nt1_100_p ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_p}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_100_o"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_100_O
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_100_o"
                        placeholder="Nt1_100_O"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_100_o}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_100_o && formik.errors.nt1_100_o ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_100_o}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_estrato_1_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__Estrato_1_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_estrato_1_men_cs"
                        placeholder="Nt1_50__Estrato_1_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_estrato_1_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_estrato_1_men_cs &&
                  formik.errors.nt1_50_estrato_1_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_estrato_1_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_estrato_2_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__Estrato_2_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_estrato_2_men_cs"
                        placeholder="Nt1_50__Estrato_2_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_estrato_2_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_estrato_2_men_cs &&
                  formik.errors.nt1_50_estrato_2_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_estrato_2_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_estrato_3_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__Estrato_3_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_estrato_3_men_cs"
                        placeholder="Nt1_50__Estrato_3_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_estrato_3_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_estrato_3_men_cs &&
                  formik.errors.nt1_50_estrato_3_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_estrato_3_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_estrato_4_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__Estrato_4_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_estrato_4_men_cs"
                        placeholder="Nt1_50__Estrato_4_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_estrato_4_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_estrato_4_men_cs &&
                  formik.errors.nt1_50_estrato_4_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_estrato_4_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_estrato_5_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__Estrato_5_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_estrato_5_men_cs"
                        placeholder="Nt1_50__Estrato_5_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_estrato_5_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_estrato_5_men_cs &&
                  formik.errors.nt1_50_estrato_5_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_estrato_5_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_estrato_6_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__Estrato_6_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_estrato_6_men_cs"
                        placeholder="Nt1_50__Estrato_6_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_estrato_6_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_estrato_6_men_cs &&
                  formik.errors.nt1_50_estrato_6_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_estrato_6_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_estrato_4"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__Estrato_4
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_estrato_4"
                        placeholder="Nt1_50__Estrato_4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_estrato_4}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_estrato_4 &&
                  formik.errors.nt1_50_estrato_4 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_estrato_4}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_estrato_5"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__Estrato_5
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_estrato_5"
                        placeholder="Nt1_50__Estrato_5"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_estrato_5}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_estrato_5 &&
                  formik.errors.nt1_50_estrato_5 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_estrato_5}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_estrato_6"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__Estrato_6
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_estrato_6"
                        placeholder="Nt1_50__Estrato_6"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_estrato_6}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_estrato_6 &&
                  formik.errors.nt1_50_estrato_6 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_estrato_6}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_c"
                        placeholder="Nt1_50__C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_c && formik.errors.nt1_50_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_i_con_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__I_Con_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_i_con_c"
                        placeholder="Nt1_50__I_Con_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_i_con_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_i_con_c &&
                  formik.errors.nt1_50_i_con_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_i_con_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_i_sin_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__I_Sin_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_i_sin_c"
                        placeholder="Nt1_50__I_Sin_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_i_sin_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_i_sin_c &&
                  formik.errors.nt1_50_i_sin_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_i_sin_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_p"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__P
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_p"
                        placeholder="Nt1_50__P"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_p}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_p && formik.errors.nt1_50_p ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_p}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_50_o"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_50__O
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_50_o"
                        placeholder="Nt1_50__O"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_50_o}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_50_o && formik.errors.nt1_50_o ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_50_o}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_estrato_1_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_Estrato_1_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_estrato_1_men_cs"
                        placeholder="Nt1_0_Estrato_1_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_estrato_1_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_estrato_1_men_cs &&
                  formik.errors.nt1_0_estrato_1_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_estrato_1_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_estrato_2_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_Estrato_2_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_estrato_2_men_cs"
                        placeholder="Nt1_0_Estrato_2_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_estrato_2_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_estrato_2_men_cs &&
                  formik.errors.nt1_0_estrato_2_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_estrato_2_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_estrato_3_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_Estrato_3_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_estrato_3_men_cs"
                        placeholder="Nt1_0_Estrato_3_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_estrato_3_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_estrato_3_men_cs &&
                  formik.errors.nt1_0_estrato_3_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_estrato_3_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_estrato_4_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_Estrato_4_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_estrato_4_men_cs"
                        placeholder="Nt1_0_Estrato_4_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_estrato_4_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_estrato_4_men_cs &&
                  formik.errors.nt1_0_estrato_4_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_estrato_4_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_estrato_5_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_Estrato_5_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_estrato_5_men_cs"
                        placeholder="Nt1_0_Estrato_5_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_estrato_5_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_estrato_5_men_cs &&
                  formik.errors.nt1_0_estrato_5_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_estrato_5_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_estrato_6_men_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_Estrato_6_Men_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_estrato_6_men_cs"
                        placeholder="Nt1_0_Estrato_6_Men_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_estrato_6_men_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_estrato_6_men_cs &&
                  formik.errors.nt1_0_estrato_6_men_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_estrato_6_men_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_estrato_4"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_Estrato_4
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_estrato_4"
                        placeholder="Nt1_0_Estrato_4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_estrato_4}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_estrato_4 &&
                  formik.errors.nt1_0_estrato_4 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_estrato_4}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_estrato_5"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_Estrato_5
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_estrato_5"
                        placeholder="Nt1_0_Estrato_5"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_estrato_5}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_estrato_5 &&
                  formik.errors.nt1_0_estrato_5 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_estrato_5}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_estrato_6"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_Estrato_6
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_estrato_6"
                        placeholder="Nt1_0_Estrato_6"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_estrato_6}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_estrato_6 &&
                  formik.errors.nt1_0_estrato_6 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_estrato_6}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_c"
                        placeholder="Nt1_0_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_c && formik.errors.nt1_0_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_i_con_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_I_Con_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_i_con_c"
                        placeholder="Nt1_0_I_Con_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_i_con_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_i_con_c &&
                  formik.errors.nt1_0_i_con_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_i_con_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_i_sin_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_I_Sin_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_i_sin_c"
                        placeholder="Nt1_0_I_Sin_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_i_sin_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_i_sin_c &&
                  formik.errors.nt1_0_i_sin_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_i_sin_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_p"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_P
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_p"
                        placeholder="Nt1_0_P"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_p}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_p && formik.errors.nt1_0_p ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_p}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt1_0_o"
                      className="col-sm-7 col-form-label"
                    >
                      Nt1_0_O
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt1_0_o"
                        placeholder="Nt1_0_O"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt1_0_o}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt1_0_o && formik.errors.nt1_0_o ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt1_0_o}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="nt2_c" className="col-sm-7 col-form-label">
                      Nt2_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt2_c"
                        placeholder="Nt2_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt2_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt2_c && formik.errors.nt2_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt2_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt2_i_con_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt2_I_Con_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt2_i_con_c"
                        placeholder="Nt2_I_Con_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt2_i_con_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt2_i_con_c && formik.errors.nt2_i_con_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt2_i_con_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt2_i_sin_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt2_I_Sin_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt2_i_sin_c"
                        placeholder="Nt2_I_Sin_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt2_i_sin_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt2_i_sin_c && formik.errors.nt2_i_sin_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt2_i_sin_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="nt2_o" className="col-sm-7 col-form-label">
                      Nt2_O
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt2_o"
                        placeholder="Nt2_O"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt2_o}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt2_o && formik.errors.nt2_o ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt2_o}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="nt2_ap" className="col-sm-7 col-form-label">
                      Nt2_Ap
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt2_ap"
                        placeholder="Nt2_Ap"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt2_ap}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt2_ap && formik.errors.nt2_ap ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt2_ap}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt2_bsnmen_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt2_Bsnmen_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt2_bsnmen_cs"
                        placeholder="Nt2_Bsnmen_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt2_bsnmen_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt2_bsnmen_cs &&
                  formik.errors.nt2_bsnmen_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt2_bsnmen_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt2_bsnmay_cs"
                      className="col-sm-7 col-form-label"
                    >
                      Nt2_Bsnmay_Cs
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt2_bsnmay_cs"
                        placeholder="Nt2_Bsnmay_Cs"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt2_bsnmay_cs}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt2_bsnmay_cs &&
                  formik.errors.nt2_bsnmay_cs ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt2_bsnmay_cs}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="nt3_c" className="col-sm-7 col-form-label">
                      Nt3_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt3_c"
                        placeholder="Nt3_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt3_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt3_c && formik.errors.nt3_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt3_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt3_i_con_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt3_I_Con_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt3_i_con_c"
                        placeholder="Nt3_I_Con_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt3_i_con_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt3_i_con_c && formik.errors.nt3_i_con_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt3_i_con_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="nt3_i_sin_c"
                      className="col-sm-7 col-form-label"
                    >
                      Nt3_I_Sin_C
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt3_i_sin_c"
                        placeholder="Nt3_I_Sin_C"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt3_i_sin_c}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt3_i_sin_c && formik.errors.nt3_i_sin_c ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt3_i_sin_c}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="nt3_o" className="col-sm-7 col-form-label">
                      Nt3_O
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt3_o"
                        placeholder="Nt3_O"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt3_o}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt3_o && formik.errors.nt3_o ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt3_o}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label htmlFor="nt3_ap" className="col-sm-7 col-form-label">
                      Nt3_Ap
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="number"
                        className="form-control"
                        id="nt3_ap"
                        placeholder="Nt3_Ap"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nt3_ap}
                      ></input>
                    </div>
                  </div>
                  {formik.touched.nt3_ap && formik.errors.nt3_ap ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nt3_ap}</p>
                    </div>
                  ) : null}
                  <div className="form-group row">
                    <label
                      htmlFor="empresa_id"
                      className="col-sm-7 col-form-label"
                    >
                      empresa_id
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="text"
                        className="form-control"
                        id="empresa_id"
                        placeholder="empresa_id"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values.empresa_id
                            ? formik.values.empresa_id.charAt(0).toUpperCase() +
                              formik.values.empresa_id.slice(1)
                            : ""
                        }
                        readOnly
                      ></input>
                    </div>
                  </div>
                  {formik.touched.empresa_id && formik.errors.empresa_id ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.empresa_id}</p>
                    </div>
                  ) : null}

                  <input
                    type="button"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
                    value={
                      status
                        ? "Aplicación Opción Tarifaria: SI"
                        : "Aplicación Opción Tarifaria: NO"
                    }
                    onClick={(e) => setStatus(!status)}
                  />

                  {status ? (
                    <div className="container p-3">
                      <div className="card col-sm ">
                        {/* <div className="card-body shadow "></div> */}

                        <div className="container p-3">
                          <div className="card col-sm ">
                            <div className="form-group row">
                              <label
                                htmlFor="pv"
                                className="col-sm-7 col-form-label"
                              >
                                PV (%)
                              </label>
                              <div className="col-sm-5">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="pv"
                                  placeholder="PV (%)"
                                  onChange={onChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.pv}
                                ></input>
                              </div>
                            </div>
                            {formik.touched.pv && formik.errors.pv ? (
                              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.pv}</p>
                              </div>
                            ) : null}
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
                                <label
                                  htmlFor="cu_nt1_100"
                                  className="col-sm-7 col-form-label"
                                >
                                  1_100
                                </label>
                                <label
                                  htmlFor="cu_nt1_50"
                                  className="col-sm-7 col-form-label"
                                >
                                  1_50
                                </label>
                                <label
                                  htmlFor="cu_nt1_0"
                                  className="col-sm-7 col-form-label"
                                >
                                  1_0
                                </label>
                                <label
                                  htmlFor="Cu_Nt2"
                                  className="col-sm-7 col-form-label"
                                >
                                  2
                                </label>
                                <label
                                  htmlFor="Cu_Nt3"
                                  className="col-sm-7 col-form-label"
                                >
                                  3
                                </label>
                              </div>

                              <div className="col-md-3">
                                <div className="col-md-10">
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt1_100"
                                      placeholder="Cu_Nt1_100"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt1_100}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt1_100 &&
                                  formik.errors.cu_nt1_100 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt1_100}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt1_50"
                                      placeholder="Cu_Nt1_50"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt1_50}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt1_50 &&
                                  formik.errors.cu_nt1_50 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt1_50}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt1_0"
                                      placeholder="Cu_Nt1_0"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt1_0}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt1_0 &&
                                  formik.errors.cu_nt1_0 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt1_0}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt2"
                                      placeholder="Cu_Nt2"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt2}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt2 &&
                                  formik.errors.cu_nt2 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt2}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt3"
                                      placeholder="Cu_Nt3"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt3}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt3 &&
                                  formik.errors.cu_nt3 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt3}</p>
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div className="col-md-10">
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt1_100_ot"
                                      placeholder="Cu_Nt1_100_ot"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt1_100_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt1_100_ot &&
                                  formik.errors.cu_nt1_100_ot ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt1_100_ot}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt1_50_ot"
                                      placeholder="Cu_Nt1_50_ot"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt1_50_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt1_50_ot &&
                                  formik.errors.cu_nt1_50_ot ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt1_50_ot}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt1_0_ot"
                                      placeholder="Cu_Nt1_0_ot"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt1_0_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt1_0_ot &&
                                  formik.errors.cu_nt1_0_ot ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt1_0_ot}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt2_ot"
                                      placeholder="Cu_Nt2_ot"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt2_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt2_ot &&
                                  formik.errors.cu_nt2_ot ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt2_ot}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="cu_nt3_ot"
                                      placeholder="Cu_Nt3_ot"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cu_nt3_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.cu_nt3_ot &&
                                  formik.errors.cu_nt3_ot ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.cu_nt3_ot}</p>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="col-md-10">
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="saldo_nt1_100"
                                      placeholder="saldo_Nt1_100"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.saldo_nt1_100_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.saldo_nt1_100 &&
                                  formik.errors.saldo_nt1_100 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.saldo_nt1_100_ot}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="saldo_nt1_50"
                                      placeholder="saldo_Nt1_50"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.saldo_nt1_50_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.saldo_nt1_50 &&
                                  formik.errors.saldo_nt1_50 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.saldo_nt1_50_ot}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="saldo_nt1_0"
                                      placeholder="saldo_Nt1_0"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.saldo_nt1_0_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.saldo_nt1_0 &&
                                  formik.errors.saldo_nt1_0 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.saldo_nt1_0_ot}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="saldo_nt2"
                                      placeholder="saldo_Nt2"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.saldo_nt2_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.saldo_nt2 &&
                                  formik.errors.cu_nt2 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.saldo_nt2_ot}</p>
                                    </div>
                                  ) : null}
                                  <div className="form-group row">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="saldo_nt3"
                                      placeholder="saldo_Nt3"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.saldo_nt3_ot}
                                    ></input>
                                  </div>
                                  {formik.touched.saldo_nt3 &&
                                  formik.errors.saldo_nt3 ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                      <p className="font-bold">Error</p>
                                      <p>{formik.errors.saldo_nt3_ot}</p>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="container p-3">
                              <div className="col-md-12">
                                <div className="row ">
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="saldo_total_ot"
                                      className="col-sm-7 col-form-label text-right"
                                    >
                                      Saldo Total
                                    </label>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <input
                                        type="number"
                                        min="0.01"
                                        step="any"
                                        readOnly
                                        className="form-control"
                                        id="saldo_total_ot"
                                        placeholder="Saldo_Total_ot"
                                        value={roundToTwo(saldo_total_ot)}
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="container">
                    <div className="row">
                      <div className="col-sm">
                        <input
                          type="submit"
                          className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
                          value="Guardar"
                          disabled={loading}
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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default NuevoCalculo_CU;
