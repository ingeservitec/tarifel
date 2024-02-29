const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'ApexifPost', {host: 'localhost',dialect:'postgres');
const sequelize = new Sequelize(process.env.URI);
const Data_xm_afacsSchema = sequelize.define('Data_xm_afac', {
  // Model attributes are defined here
   
  
  anho: {  
    type: DataTypes.INTEGER,  
    allowNull: false,  
    trim: true  
    },
    
    mes: {  
    type: DataTypes.INTEGER,  
    allowNull: false,  
    trim: true  
    },
    
    empresa_id: {  
      type: DataTypes.STRING,  
      allowNull: false,  
      trim: true  
      },
      


    agente: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    trim: true  
    },
    
    creador: {  
    type: DataTypes.INTEGER,  
    allowNull: false,  
    trim: true  
    },
    
    perdida_real_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    demanda_real_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    generacion_real_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_bolsa_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_bolsa_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_bolsa_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_bolsa_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_desviacion_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_desviacion_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_desviacion_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_desviacion_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_reconciliacion_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_reconciliacion_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_reconciliacion_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_reconciliacion_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_contratos_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_contratos_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_energia_en_bolsa_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_energia_en_bolsa_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_energia_en_bolsa_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_energia_en_bolsa_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    vr_cargo_por_confiabilidad_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    vd_cargo_por_confiabilidad_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    neto_cxc_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_cargo_por_confiabilidad_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_cargo_por_confiabilidad_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_bolsa_nacional_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_bolsa_nacional_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_bolsa_nacional_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_bolsa_nacional_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_bolsa_internacional_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_bolsa_internacional_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_bolsa_internacional_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_bolsa_internacional_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    servicios_agc_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    responsabilidad_comercial_agc_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    responsabilidad_comercial_agc_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    total_compras_cop:{  
        type: DataTypes.FLOAT,  
        allowNull: false,  
        trim: true  
        },
    
    total_ventas_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_pagar_por_srpf_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_recibir_por_srpf_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    total_restricciones_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    rentas_de_congestion_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    restricciones_aliviadas_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    vebo_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    rentas_de_congestion_por_importacion_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    distribucion_saldo_neto_tie_en_merito_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    distribucion_saldo_neto_tie_fuera_de_merito_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_bolsa_con_saldo_neto_tie_merito_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    rendimientos_financieros_por_exportaciones_tie_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    alivio_por_cioef_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_ndc_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_desviaciones_oefh_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_desviaciones_oefh_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    devolucion_dineros_del_cargo_por_confiabilidad_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cobro_dinero_cargo_por_confiabilidad_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_arranque_y_parada_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_arranque_y_parada_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_por_eeve_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_por_eeve_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    restricciones_por_eeve_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cobro_uso_respaldo_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    alivio_restricciones_res_05_2010_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    compras_en_bolsa_ties_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    ventas_en_bolsa_ties_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    magnitud_en_kwh__de_compras_en_bolsa_de_ties: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    magnitud_en_kwh_de_ventas_en_bolsa_ties: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    alivio_por_ejecucion_de_garantia_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_total_ejecucion_de_garantia_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    alivio_por_vcsrcfvd_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    costo_de_exportacion_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    total_costo_de_exportacion_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    total_de_generacion_ideal_en_kwh_del_agente: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    total_de_holgura_de_agc_en_kwh_asignados_al_agente: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    energia_vendida_y_embalsada_asignada_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    vr_demanda_res_155_2014: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    alivio_asociado_a_la_resolucion_creg_024_2015_en_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    cobro_autogeneradores_res_024_2015: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_favor_para_generador_res_178_2015: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_cargo_para_comercializador_res_178_2015: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_cargo_para_generador_res_195_2015: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_favor_para_generador_res_195_2015: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_favor_para_comercializador_res_195_2015: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_cargo_para_comercializador_res_195_2015: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_cargo_pagos_de_energia_excedentaria_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_favor_por_energia_excedentaria_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    vc_rd_resolucion_011_de_2015: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    vf_rd_resolucion_011_de_2015: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_favor_delta_ajuste_rd: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_cargo_delta_ajuste_rd: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_cargo_r026_2016_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_favor_r026_2016_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_favor_r029_2016_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    rf039_resolucion_039_de_2016: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    rc039_resolucion_039_de_2016: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    balance_final_029_de_2016: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_cargo_para_comercializador_res_062_2013: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_a_favor_para_generador_res_062_2013: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_del_de_tie_res_049_2018_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_del_de_tie_res_049_2018_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    magnitud_desviacion_despacho_res_060_2019_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_desviacion_despacho_res_060_2019_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    magnitud_desviacion_redespacho_res_060_2019_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_desviacion_redespacho_res_060_2019_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    desviacion_generacion_variable_res_060_2019_kwh: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    alivio_desviaciones_res_creg_060_2019_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_pago_ajuste_res_140_2017_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_cobro_ajuste_res_140_2017_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_pago_excedente_res_140_2017_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    
    valor_cobro_faltante_res_140_2017_cop: {  
    type: DataTypes.FLOAT,  
    allowNull: false,  
    trim: true  
    },
    compras_en_bolsa_ajustes_cop: {  
      type: DataTypes.FLOAT,  
      allowNull: false,  
      trim: true  
      }
}
);
module.exports = Data_xm_afacsSchema;

//La tabla se llama usuario para sequalice en Postgres se llama usuarios 
