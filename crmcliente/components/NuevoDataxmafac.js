import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import csv from 'csv';
import Swal from 'sweetalert2' 

const NUEVO_DATA_XMAFAC = gql`
mutation nuevoDataxmafac ($input:DataxmafacInput ){
nuevoDataxmafac(input:$input){
id
empresa_id
creador
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
//Se crea la función y le paso las propiedades
const NuevoDataxmafac =(props) => {
// para que insertado el dato se refresque la tabla y muestre el nuevo dato
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);    
const [nuevoDataxmafac]=useMutation(NUEVO_DATA_XMAFAC, {
      update(cache, { data: { nuevoDataxmafac } } ) {
          // Obtener el objeto de cache que deseamos actualizar
          const { obtenerData_xm_afac} = cache.readQuery({ query: OBTENER_DATA_XM_AFAC  });
          // Reescribimos el cache ( el cache nunca se debe modificar )
          cache.writeQuery({
              query: OBTENER_DATA_XM_AFAC,
              data: {
                obtenerData_xm_afac : [...obtenerData_xm_afac, nuevoDataxmafac ]
              }
          })
      }
  })
  //Datacsv es el csv que se carga para diligenciamiento automatico
    const [datacsv, setDatacsv] = useState("");
    const [fileNames, setFileNames] = useState([]);
    //AGregar estados de cada campo de la tabla
    const [empresa_id, setEmpresa_id] = useState(""); 
    const [anho, setAnho] = useState("");
    const [mes, setMes] = useState("");
    const [agente, setAgente] = useState("");
    const [creador, setCreador] = useState("");
    const [perdida_real_kwh, setPerdida_Real_Kwh] = useState("");const [demanda_real_kwh, setDemanda_Real_Kwh] = useState("");const [generacion_real_kwh, setGeneracion_Real_Kwh] = useState("");const [compras_en_bolsa_kwh, setCompras_En_Bolsa_Kwh] = useState("");const [compras_en_bolsa_cop, setCompras_En_Bolsa_Cop] = useState("");const [ventas_en_bolsa_kwh, setVentas_En_Bolsa_Kwh] = useState("");const [ventas_en_bolsa_cop, setVentas_En_Bolsa_Cop] = useState("");const [compras_en_desviacion_kwh, setCompras_En_Desviacion_Kwh] = useState("");const [compras_en_desviacion_cop, setCompras_En_Desviacion_Cop] = useState("");const [ventas_en_desviacion_kwh, setVentas_En_Desviacion_Kwh] = useState("");const [ventas_en_desviacion_cop, setVentas_En_Desviacion_Cop] = useState("");const [compras_en_reconciliacion_kwh, setCompras_En_Reconciliacion_Kwh] = useState("");const [compras_en_reconciliacion_cop, setCompras_En_Reconciliacion_Cop] = useState("");const [ventas_en_reconciliacion_kwh, setVentas_En_Reconciliacion_Kwh] = useState("");const [ventas_en_reconciliacion_cop, setVentas_En_Reconciliacion_Cop] = useState("");const [compras_en_contratos_kwh, setCompras_En_Contratos_Kwh] = useState("");const [ventas_en_contratos_kwh, setVentas_En_Contratos_Kwh] = useState("");const [compras_energia_en_bolsa_kwh, setCompras_Energia_En_Bolsa_Kwh] = useState("");const [compras_energia_en_bolsa_cop, setCompras_Energia_En_Bolsa_Cop] = useState("");const [ventas_energia_en_bolsa_kwh, setVentas_Energia_En_Bolsa_Kwh] = useState("");const [ventas_energia_en_bolsa_cop, setVentas_Energia_En_Bolsa_Cop] = useState("");const [vr_cargo_por_confiabilidad_cop, setVr_Cargo_Por_Confiabilidad_Cop] = useState("");const [vd_cargo_por_confiabilidad_cop, setVd_Cargo_Por_Confiabilidad_Cop] = useState("");const [neto_cxc_cop, setNeto_Cxc_Cop] = useState("");const [compras_cargo_por_confiabilidad_cop, setCompras_Cargo_Por_Confiabilidad_Cop] = useState("");const [ventas_cargo_por_confiabilidad_cop, setVentas_Cargo_Por_Confiabilidad_Cop] = useState("");const [compras_en_bolsa_nacional_kwh, setCompras_En_Bolsa_Nacional_Kwh] = useState("");const [compras_en_bolsa_nacional_cop, setCompras_En_Bolsa_Nacional_Cop] = useState("");const [ventas_en_bolsa_nacional_kwh, setVentas_En_Bolsa_Nacional_Kwh] = useState("");const [ventas_en_bolsa_nacional_cop, setVentas_En_Bolsa_Nacional_Cop] = useState("");const [compras_en_bolsa_internacional_kwh, setCompras_En_Bolsa_Internacional_Kwh] = useState("");const [compras_en_bolsa_internacional_cop, setCompras_En_Bolsa_Internacional_Cop] = useState("");const [ventas_en_bolsa_internacional_kwh, setVentas_En_Bolsa_Internacional_Kwh] = useState("");const [ventas_en_bolsa_internacional_cop, setVentas_En_Bolsa_Internacional_Cop] = useState("");const [servicios_agc_cop, setServicios_Agc_Cop] = useState("");const [responsabilidad_comercial_agc_kwh, setResponsabilidad_Comercial_Agc_Kwh] = useState("");const [responsabilidad_comercial_agc_cop, setResponsabilidad_Comercial_Agc_Cop] = useState("");const [total_compras_cop, setTotal_Compras_Cop] = useState("");const [total_ventas_cop, setTotal_Ventas_Cop] = useState("");const [valor_a_pagar_por_srpf_cop, setValor_A_Pagar_Por_Srpf_Cop] = useState("");const [valor_a_recibir_por_srpf_cop, setValor_A_Recibir_Por_Srpf_Cop] = useState("");const [total_restricciones_cop, setTotal_Restricciones_Cop] = useState("");const [rentas_de_congestion_cop, setRentas_De_Congestion_Cop] = useState("");const [restricciones_aliviadas_cop, setRestricciones_Aliviadas_Cop] = useState("");const [vebo_kwh, setVebo_Kwh] = useState("");const [rentas_de_congestion_por_importacion_cop, setRentas_De_Congestion_Por_Importacion_Cop] = useState("");const [distribucion_saldo_neto_tie_en_merito_cop, setDistribucion_Saldo_Neto_Tie_En_Merito_Cop] = useState("");const [distribucion_saldo_neto_tie_fuera_de_merito_cop, setDistribucion_Saldo_Neto_Tie_Fuera_De_Merito_Cop] = useState("");const [compras_bolsa_con_saldo_neto_tie_merito_cop, setCompras_Bolsa_Con_Saldo_Neto_Tie_Merito_Cop] = useState("");const [rendimientos_financieros_por_exportaciones_tie_cop, setRendimientos_Financieros_Por_Exportaciones_Tie_Cop] = useState("");const [alivio_por_cioef_cop, setAlivio_Por_Cioef_Cop] = useState("");const [compras_ndc_cop, setCompras_Ndc_Cop] = useState("");const [ventas_desviaciones_oefh_cop, setVentas_Desviaciones_Oefh_Cop] = useState("");const [compras_desviaciones_oefh_cop, setCompras_Desviaciones_Oefh_Cop] = useState("");const [devolucion_dineros_del_cargo_por_confiabilidad_cop, setDevolucion_Dineros_Del_Cargo_Por_Confiabilidad_Cop] = useState("");const [cobro_dinero_cargo_por_confiabilidad_cop, setCobro_Dinero_Cargo_Por_Confiabilidad_Cop] = useState("");const [compras_arranque_y_parada_cop, setCompras_Arranque_Y_Parada_Cop] = useState("");const [ventas_arranque_y_parada_cop, setVentas_Arranque_Y_Parada_Cop] = useState("");const [ventas_por_eeve_cop, setVentas_Por_Eeve_Cop] = useState("");const [compras_por_eeve_cop, setCompras_Por_Eeve_Cop] = useState("");const [restricciones_por_eeve_cop, setRestricciones_Por_Eeve_Cop] = useState("");const [cobro_uso_respaldo_cop, setCobro_Uso_Respaldo_Cop] = useState("");const [alivio_restricciones_res_05_2010_cop, setAlivio_Restricciones_Res_05_2010_Cop] = useState("");const [compras_en_bolsa_ties_cop, setCompras_En_Bolsa_Ties_Cop] = useState("");const [ventas_en_bolsa_ties_cop, setVentas_En_Bolsa_Ties_Cop] = useState("");const [magnitud_en_kwh__de_compras_en_bolsa_de_ties, setMagnitud_En_Kwh__De_Compras_En_Bolsa_De_Ties] = useState("");const [magnitud_en_kwh_de_ventas_en_bolsa_ties, setMagnitud_En_Kwh_De_Ventas_En_Bolsa_Ties] = useState("");const [alivio_por_ejecucion_de_garantia_cop, setAlivio_Por_Ejecucion_De_Garantia_Cop] = useState("");const [valor_total_ejecucion_de_garantia_cop, setValor_Total_Ejecucion_De_Garantia_Cop] = useState("");const [alivio_por_vcsrcfvd_cop, setAlivio_Por_Vcsrcfvd_Cop] = useState("");const [voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop, setVoefv_A_Cargo_Por_La_Oefv_Adquirida_En_La_Srcfv_Cop] = useState("");const [vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop, setVmoefv_A_Cargo_Al_Margen_Del_Precio_Mp_Srcfv_Cop] = useState("");const [costo_de_exportacion_cop, setCosto_De_Exportacion_Cop] = useState("");const [total_costo_de_exportacion_cop, setTotal_Costo_De_Exportacion_Cop] = useState("");const [total_de_generacion_ideal_en_kwh_del_agente, setTotal_De_Generacion_Ideal_En_Kwh_Del_Agente] = useState("");const [total_de_holgura_de_agc_en_kwh_asignados_al_agente, setTotal_De_Holgura_De_Agc_En_Kwh_Asignados_Al_Agente] = useState("");const [energia_vendida_y_embalsada_asignada_kwh, setEnergia_Vendida_Y_Embalsada_Asignada_Kwh] = useState("");const [vr_demanda_res_155_2014, setVr_Demanda_Res_155_2014] = useState("");const [alivio_asociado_a_la_resolucion_creg_024_2015_en_cop, setAlivio_Asociado_A_La_Resolucion_Creg_024_2015_En_Cop] = useState("");const [cobro_autogeneradores_res_024_2015, setCobro_Autogeneradores_Res_024_2015] = useState("");const [valor_a_favor_para_generador_res_178_2015, setValor_A_Favor_Para_Generador_Res_178_2015] = useState("");const [valor_a_cargo_para_comercializador_res_178_2015, setValor_A_Cargo_Para_Comercializador_Res_178_2015] = useState("");const [valor_a_cargo_para_generador_res_195_2015, setValor_A_Cargo_Para_Generador_Res_195_2015] = useState("");const [valor_a_favor_para_generador_res_195_2015, setValor_A_Favor_Para_Generador_Res_195_2015] = useState("");const [valor_a_favor_para_comercializador_res_195_2015, setValor_A_Favor_Para_Comercializador_Res_195_2015] = useState("");const [valor_a_cargo_para_comercializador_res_195_2015, setValor_A_Cargo_Para_Comercializador_Res_195_2015] = useState("");const [valor_a_cargo_pagos_de_energia_excedentaria_cop, setValor_A_Cargo_Pagos_De_Energia_Excedentaria_Cop] = useState("");const [valor_a_favor_por_energia_excedentaria_cop, setValor_A_Favor_Por_Energia_Excedentaria_Cop] = useState("");const [vc_rd_resolucion_011_de_2015, setVc_Rd_Resolucion_011_De_2015] = useState("");const [vf_rd_resolucion_011_de_2015, setVf_Rd_Resolucion_011_De_2015] = useState("");const [valor_a_favor_delta_ajuste_rd, setValor_A_Favor_Delta_Ajuste_Rd] = useState("");const [valor_a_cargo_delta_ajuste_rd, setValor_A_Cargo_Delta_Ajuste_Rd] = useState("");const [valor_a_cargo_r026_2016_cop, setValor_A_Cargo_R026_2016_Cop] = useState("");const [valor_a_favor_r026_2016_cop, setValor_A_Favor_R026_2016_Cop] = useState("");const [valor_a_favor_r029_2016_cop, setValor_A_Favor_R029_2016_Cop] = useState("");const [rf039_resolucion_039_de_2016, setRf039_Resolucion_039_De_2016] = useState("");const [rc039_resolucion_039_de_2016, setRc039_Resolucion_039_De_2016] = useState("");const [balance_final_029_de_2016, setBalance_Final_029_De_2016] = useState("");const [valor_a_cargo_para_comercializador_res_062_2013, setValor_A_Cargo_Para_Comercializador_Res_062_2013] = useState("");const [valor_a_favor_para_generador_res_062_2013, setValor_A_Favor_Para_Generador_Res_062_2013] = useState("");const [valor_del_de_tie_res_049_2018_kwh, setValor_Del_De_Tie_Res_049_2018_Kwh] = useState("");const [valor_del_de_tie_res_049_2018_cop, setValor_Del_De_Tie_Res_049_2018_Cop] = useState("");const [magnitud_desviacion_despacho_res_060_2019_kwh, setMagnitud_Desviacion_Despacho_Res_060_2019_Kwh] = useState("");const [valor_desviacion_despacho_res_060_2019_cop, setValor_Desviacion_Despacho_Res_060_2019_Cop] = useState("");const [magnitud_desviacion_redespacho_res_060_2019_kwh, setMagnitud_Desviacion_Redespacho_Res_060_2019_Kwh] = useState("");const [valor_desviacion_redespacho_res_060_2019_kwh, setValor_Desviacion_Redespacho_Res_060_2019_Kwh] = useState("");const [desviacion_generacion_variable_res_060_2019_kwh, setDesviacion_Generacion_Variable_Res_060_2019_Kwh] = useState("");
    const [alivio_desviaciones_res_creg_060_2019_cop, setAlivio_Desviaciones_Res_Creg_060_2019_Cop] = useState("");const [valor_pago_ajuste_res_140_2017_cop, setValor_Pago_Ajuste_Res_140_2017_Cop] = useState("");const [valor_cobro_ajuste_res_140_2017_cop, setValor_Cobro_Ajuste_Res_140_2017_Cop] = useState("");const [valor_pago_excedente_res_140_2017_cop, setValor_Pago_Excedente_Res_140_2017_Cop] = useState("");const [valor_cobro_faltante_res_140_2017_cop, setValor_Cobro_Faltante_Res_140_2017_Cop] = useState("");const [compras_en_bolsa_ajustes_cop, setCompras_en_bolsa_ajustes_cop] = useState("");
    //habilita para arrastrar archivo
    const onDrop = useCallback(acceptedFiles => {
    setFileNames(acceptedFiles.map(file => file.name));
    //Leer archivo
    const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading failed");
      reader.onload = () => {
        // Parse CSV file
        csv.parse(reader.result, (err, data) => {
          console.log("Parsed CSV data: ", data);
          setDatacsv(data)
        });
      };
        // read file contents
      acceptedFiles.forEach(file => reader.readAsBinaryString(file));
      }, []);
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

      function csvJSON(csv2){
        console.log(csv2)
        var lines=csv2
        console.log(lines)
        var result = [];
        var headers=lines[0].toString().split(";");
        for(var i=1;i<lines.length;i++){
            var obj = {};
            var currentline=lines[i].toString().split(";")
            for(var j=0;j<headers.length;j++){
              if (obj[headers[j]] ='AGENTE')
                obj[headers[j]] = (currentline[j]);
                else{
                  obj[headers[j]] = parseFloat(currentline[j]);
               }    
            }
            result.push(obj);
        }
        //return result; //JavaScript object
        // parseFloat()
        return result; //JSON
      }


      //CUando envio el formulario captura lo que este en campos
      const formik=useFormik({
        initialValues: {
        empresa_id:empresa_id,anho:anho,mes:mes,agente:agente,creador:creador,perdida_real_kwh:perdida_real_kwh,demanda_real_kwh:demanda_real_kwh,generacion_real_kwh:generacion_real_kwh,compras_en_bolsa_kwh:compras_en_bolsa_kwh,compras_en_bolsa_cop:compras_en_bolsa_cop,ventas_en_bolsa_kwh:ventas_en_bolsa_kwh,ventas_en_bolsa_cop:ventas_en_bolsa_cop,compras_en_desviacion_kwh:compras_en_desviacion_kwh,compras_en_desviacion_cop:compras_en_desviacion_cop,ventas_en_desviacion_kwh:ventas_en_desviacion_kwh,ventas_en_desviacion_cop:ventas_en_desviacion_cop,compras_en_reconciliacion_kwh:compras_en_reconciliacion_kwh,compras_en_reconciliacion_cop:compras_en_reconciliacion_cop,ventas_en_reconciliacion_kwh:ventas_en_reconciliacion_kwh,ventas_en_reconciliacion_cop:ventas_en_reconciliacion_cop,compras_en_contratos_kwh:compras_en_contratos_kwh,ventas_en_contratos_kwh:ventas_en_contratos_kwh,compras_energia_en_bolsa_kwh:compras_energia_en_bolsa_kwh,compras_energia_en_bolsa_cop:compras_energia_en_bolsa_cop,ventas_energia_en_bolsa_kwh:ventas_energia_en_bolsa_kwh,ventas_energia_en_bolsa_cop:ventas_energia_en_bolsa_cop,vr_cargo_por_confiabilidad_cop:vr_cargo_por_confiabilidad_cop,vd_cargo_por_confiabilidad_cop:vd_cargo_por_confiabilidad_cop,neto_cxc_cop:neto_cxc_cop,compras_cargo_por_confiabilidad_cop:compras_cargo_por_confiabilidad_cop,ventas_cargo_por_confiabilidad_cop:ventas_cargo_por_confiabilidad_cop,compras_en_bolsa_nacional_kwh:compras_en_bolsa_nacional_kwh,compras_en_bolsa_nacional_cop:compras_en_bolsa_nacional_cop,ventas_en_bolsa_nacional_kwh:ventas_en_bolsa_nacional_kwh,ventas_en_bolsa_nacional_cop:ventas_en_bolsa_nacional_cop,compras_en_bolsa_internacional_kwh:compras_en_bolsa_internacional_kwh,compras_en_bolsa_internacional_cop:compras_en_bolsa_internacional_cop,ventas_en_bolsa_internacional_kwh:ventas_en_bolsa_internacional_kwh,ventas_en_bolsa_internacional_cop:ventas_en_bolsa_internacional_cop,servicios_agc_cop:servicios_agc_cop,responsabilidad_comercial_agc_kwh:responsabilidad_comercial_agc_kwh,responsabilidad_comercial_agc_cop:responsabilidad_comercial_agc_cop,total_compras_cop:total_compras_cop,total_ventas_cop:total_ventas_cop,valor_a_pagar_por_srpf_cop:valor_a_pagar_por_srpf_cop,valor_a_recibir_por_srpf_cop:valor_a_recibir_por_srpf_cop,total_restricciones_cop:total_restricciones_cop,rentas_de_congestion_cop:rentas_de_congestion_cop,restricciones_aliviadas_cop:restricciones_aliviadas_cop,vebo_kwh:vebo_kwh,rentas_de_congestion_por_importacion_cop:rentas_de_congestion_por_importacion_cop,distribucion_saldo_neto_tie_en_merito_cop:distribucion_saldo_neto_tie_en_merito_cop,distribucion_saldo_neto_tie_fuera_de_merito_cop:distribucion_saldo_neto_tie_fuera_de_merito_cop,compras_bolsa_con_saldo_neto_tie_merito_cop:compras_bolsa_con_saldo_neto_tie_merito_cop,rendimientos_financieros_por_exportaciones_tie_cop:rendimientos_financieros_por_exportaciones_tie_cop,alivio_por_cioef_cop:alivio_por_cioef_cop,compras_ndc_cop:compras_ndc_cop,ventas_desviaciones_oefh_cop:ventas_desviaciones_oefh_cop,compras_desviaciones_oefh_cop:compras_desviaciones_oefh_cop,devolucion_dineros_del_cargo_por_confiabilidad_cop:devolucion_dineros_del_cargo_por_confiabilidad_cop,cobro_dinero_cargo_por_confiabilidad_cop:cobro_dinero_cargo_por_confiabilidad_cop,compras_arranque_y_parada_cop:compras_arranque_y_parada_cop,ventas_arranque_y_parada_cop:ventas_arranque_y_parada_cop,ventas_por_eeve_cop:ventas_por_eeve_cop,compras_por_eeve_cop:compras_por_eeve_cop,restricciones_por_eeve_cop:restricciones_por_eeve_cop,cobro_uso_respaldo_cop:cobro_uso_respaldo_cop,alivio_restricciones_res_05_2010_cop:alivio_restricciones_res_05_2010_cop,compras_en_bolsa_ties_cop:compras_en_bolsa_ties_cop,ventas_en_bolsa_ties_cop:ventas_en_bolsa_ties_cop,magnitud_en_kwh__de_compras_en_bolsa_de_ties:magnitud_en_kwh__de_compras_en_bolsa_de_ties,magnitud_en_kwh_de_ventas_en_bolsa_ties:magnitud_en_kwh_de_ventas_en_bolsa_ties,alivio_por_ejecucion_de_garantia_cop:alivio_por_ejecucion_de_garantia_cop,valor_total_ejecucion_de_garantia_cop:valor_total_ejecucion_de_garantia_cop,alivio_por_vcsrcfvd_cop:alivio_por_vcsrcfvd_cop,voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop:voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop,vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop:vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop,costo_de_exportacion_cop:costo_de_exportacion_cop,total_costo_de_exportacion_cop:total_costo_de_exportacion_cop,total_de_generacion_ideal_en_kwh_del_agente:total_de_generacion_ideal_en_kwh_del_agente,total_de_holgura_de_agc_en_kwh_asignados_al_agente:total_de_holgura_de_agc_en_kwh_asignados_al_agente,energia_vendida_y_embalsada_asignada_kwh:energia_vendida_y_embalsada_asignada_kwh,vr_demanda_res_155_2014:vr_demanda_res_155_2014,alivio_asociado_a_la_resolucion_creg_024_2015_en_cop:alivio_asociado_a_la_resolucion_creg_024_2015_en_cop,cobro_autogeneradores_res_024_2015:cobro_autogeneradores_res_024_2015,valor_a_favor_para_generador_res_178_2015:valor_a_favor_para_generador_res_178_2015,valor_a_cargo_para_comercializador_res_178_2015:valor_a_cargo_para_comercializador_res_178_2015,valor_a_cargo_para_generador_res_195_2015:valor_a_cargo_para_generador_res_195_2015,valor_a_favor_para_generador_res_195_2015:valor_a_favor_para_generador_res_195_2015,valor_a_favor_para_comercializador_res_195_2015:valor_a_favor_para_comercializador_res_195_2015,valor_a_cargo_para_comercializador_res_195_2015:valor_a_cargo_para_comercializador_res_195_2015,valor_a_cargo_pagos_de_energia_excedentaria_cop:valor_a_cargo_pagos_de_energia_excedentaria_cop,valor_a_favor_por_energia_excedentaria_cop:valor_a_favor_por_energia_excedentaria_cop,vc_rd_resolucion_011_de_2015:vc_rd_resolucion_011_de_2015,vf_rd_resolucion_011_de_2015:vf_rd_resolucion_011_de_2015,valor_a_favor_delta_ajuste_rd:valor_a_favor_delta_ajuste_rd,valor_a_cargo_delta_ajuste_rd:valor_a_cargo_delta_ajuste_rd,valor_a_cargo_r026_2016_cop:valor_a_cargo_r026_2016_cop,valor_a_favor_r026_2016_cop:valor_a_favor_r026_2016_cop,valor_a_favor_r029_2016_cop:valor_a_favor_r029_2016_cop,rf039_resolucion_039_de_2016:rf039_resolucion_039_de_2016,rc039_resolucion_039_de_2016:rc039_resolucion_039_de_2016,balance_final_029_de_2016:balance_final_029_de_2016,valor_a_cargo_para_comercializador_res_062_2013:valor_a_cargo_para_comercializador_res_062_2013,valor_a_favor_para_generador_res_062_2013:valor_a_favor_para_generador_res_062_2013,valor_del_de_tie_res_049_2018_kwh:valor_del_de_tie_res_049_2018_kwh,valor_del_de_tie_res_049_2018_cop:valor_del_de_tie_res_049_2018_cop,magnitud_desviacion_despacho_res_060_2019_kwh:magnitud_desviacion_despacho_res_060_2019_kwh,valor_desviacion_despacho_res_060_2019_cop:valor_desviacion_despacho_res_060_2019_cop,magnitud_desviacion_redespacho_res_060_2019_kwh:magnitud_desviacion_redespacho_res_060_2019_kwh,valor_desviacion_redespacho_res_060_2019_kwh:valor_desviacion_redespacho_res_060_2019_kwh,desviacion_generacion_variable_res_060_2019_kwh:desviacion_generacion_variable_res_060_2019_kwh,alivio_desviaciones_res_creg_060_2019_cop:alivio_desviaciones_res_creg_060_2019_cop,valor_pago_ajuste_res_140_2017_cop:valor_pago_ajuste_res_140_2017_cop,valor_cobro_ajuste_res_140_2017_cop:valor_cobro_ajuste_res_140_2017_cop,valor_pago_excedente_res_140_2017_cop:valor_pago_excedente_res_140_2017_cop,valor_cobro_faltante_res_140_2017_cop:valor_cobro_faltante_res_140_2017_cop,compras_en_bolsa_ajustes_cop:compras_en_bolsa_ajustes_cop
        }, 
        enableReinitialize: true,
        validationSchema: Yup.object({
        creador: Yup.string()
        .required('El creador es obligatorio'),
        anho: Yup.string()
        .required('El Año es obligatorio')
        }), 
        onSubmit: async valores => {
        console.log(anho)
        const{anho,mes,empresa_id,agente,creador,perdida_real_kwh,demanda_real_kwh,generacion_real_kwh,compras_en_bolsa_kwh,compras_en_bolsa_cop,ventas_en_bolsa_kwh,ventas_en_bolsa_cop,compras_en_desviacion_kwh,compras_en_desviacion_cop,ventas_en_desviacion_kwh,ventas_en_desviacion_cop,compras_en_reconciliacion_kwh,compras_en_reconciliacion_cop,ventas_en_reconciliacion_kwh,ventas_en_reconciliacion_cop,compras_en_contratos_kwh,ventas_en_contratos_kwh,compras_energia_en_bolsa_kwh,compras_energia_en_bolsa_cop,ventas_energia_en_bolsa_kwh,ventas_energia_en_bolsa_cop,vr_cargo_por_confiabilidad_cop,vd_cargo_por_confiabilidad_cop,neto_cxc_cop,compras_cargo_por_confiabilidad_cop,ventas_cargo_por_confiabilidad_cop,compras_en_bolsa_nacional_kwh,compras_en_bolsa_nacional_cop,ventas_en_bolsa_nacional_kwh,ventas_en_bolsa_nacional_cop,compras_en_bolsa_internacional_kwh,compras_en_bolsa_internacional_cop,ventas_en_bolsa_internacional_kwh,ventas_en_bolsa_internacional_cop,servicios_agc_cop,responsabilidad_comercial_agc_kwh,responsabilidad_comercial_agc_cop,total_compras_cop,total_ventas_cop,valor_a_pagar_por_srpf_cop,valor_a_recibir_por_srpf_cop,total_restricciones_cop,rentas_de_congestion_cop,restricciones_aliviadas_cop,vebo_kwh,rentas_de_congestion_por_importacion_cop,distribucion_saldo_neto_tie_en_merito_cop,distribucion_saldo_neto_tie_fuera_de_merito_cop,compras_bolsa_con_saldo_neto_tie_merito_cop,rendimientos_financieros_por_exportaciones_tie_cop,alivio_por_cioef_cop,compras_ndc_cop,ventas_desviaciones_oefh_cop,compras_desviaciones_oefh_cop,devolucion_dineros_del_cargo_por_confiabilidad_cop,cobro_dinero_cargo_por_confiabilidad_cop,compras_arranque_y_parada_cop,ventas_arranque_y_parada_cop,ventas_por_eeve_cop,compras_por_eeve_cop,restricciones_por_eeve_cop,cobro_uso_respaldo_cop,alivio_restricciones_res_05_2010_cop,compras_en_bolsa_ties_cop,ventas_en_bolsa_ties_cop,magnitud_en_kwh__de_compras_en_bolsa_de_ties,magnitud_en_kwh_de_ventas_en_bolsa_ties,alivio_por_ejecucion_de_garantia_cop,valor_total_ejecucion_de_garantia_cop,alivio_por_vcsrcfvd_cop,voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop,vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop,costo_de_exportacion_cop,total_costo_de_exportacion_cop,total_de_generacion_ideal_en_kwh_del_agente,total_de_holgura_de_agc_en_kwh_asignados_al_agente,energia_vendida_y_embalsada_asignada_kwh,vr_demanda_res_155_2014,alivio_asociado_a_la_resolucion_creg_024_2015_en_cop,cobro_autogeneradores_res_024_2015,valor_a_favor_para_generador_res_178_2015,valor_a_cargo_para_comercializador_res_178_2015,valor_a_cargo_para_generador_res_195_2015,valor_a_favor_para_generador_res_195_2015,valor_a_favor_para_comercializador_res_195_2015,valor_a_cargo_para_comercializador_res_195_2015,valor_a_cargo_pagos_de_energia_excedentaria_cop,valor_a_favor_por_energia_excedentaria_cop,vc_rd_resolucion_011_de_2015,vf_rd_resolucion_011_de_2015,valor_a_favor_delta_ajuste_rd,valor_a_cargo_delta_ajuste_rd,valor_a_cargo_r026_2016_cop,valor_a_favor_r026_2016_cop,valor_a_favor_r029_2016_cop,rf039_resolucion_039_de_2016,rc039_resolucion_039_de_2016,balance_final_029_de_2016,valor_a_cargo_para_comercializador_res_062_2013,valor_a_favor_para_generador_res_062_2013,valor_del_de_tie_res_049_2018_kwh,valor_del_de_tie_res_049_2018_cop,magnitud_desviacion_despacho_res_060_2019_kwh,valor_desviacion_despacho_res_060_2019_cop,magnitud_desviacion_redespacho_res_060_2019_kwh,valor_desviacion_redespacho_res_060_2019_kwh,desviacion_generacion_variable_res_060_2019_kwh,alivio_desviaciones_res_creg_060_2019_cop,valor_pago_ajuste_res_140_2017_cop,valor_cobro_ajuste_res_140_2017_cop,valor_pago_excedente_res_140_2017_cop,valor_cobro_faltante_res_140_2017_cop,compras_en_bolsa_ajustes_cop}=valores
        Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
        props.close()
        try {
        const{data}=await nuevoDataxmafac({
        variables:{
          input:{
          anho,mes,agente,empresa_id,creador,perdida_real_kwh,demanda_real_kwh,generacion_real_kwh,compras_en_bolsa_kwh,compras_en_bolsa_cop,ventas_en_bolsa_kwh,ventas_en_bolsa_cop,compras_en_desviacion_kwh,compras_en_desviacion_cop,ventas_en_desviacion_kwh,ventas_en_desviacion_cop,compras_en_reconciliacion_kwh,compras_en_reconciliacion_cop,ventas_en_reconciliacion_kwh,ventas_en_reconciliacion_cop,compras_en_contratos_kwh,ventas_en_contratos_kwh,compras_energia_en_bolsa_kwh,compras_energia_en_bolsa_cop,ventas_energia_en_bolsa_kwh,ventas_energia_en_bolsa_cop,vr_cargo_por_confiabilidad_cop,vd_cargo_por_confiabilidad_cop,neto_cxc_cop,compras_cargo_por_confiabilidad_cop,ventas_cargo_por_confiabilidad_cop,compras_en_bolsa_nacional_kwh,compras_en_bolsa_nacional_cop,ventas_en_bolsa_nacional_kwh,ventas_en_bolsa_nacional_cop,compras_en_bolsa_internacional_kwh,compras_en_bolsa_internacional_cop,ventas_en_bolsa_internacional_kwh,ventas_en_bolsa_internacional_cop,servicios_agc_cop,responsabilidad_comercial_agc_kwh,responsabilidad_comercial_agc_cop,total_compras_cop,total_ventas_cop,valor_a_pagar_por_srpf_cop,valor_a_recibir_por_srpf_cop,total_restricciones_cop,rentas_de_congestion_cop,restricciones_aliviadas_cop,vebo_kwh,rentas_de_congestion_por_importacion_cop,distribucion_saldo_neto_tie_en_merito_cop,distribucion_saldo_neto_tie_fuera_de_merito_cop,compras_bolsa_con_saldo_neto_tie_merito_cop,rendimientos_financieros_por_exportaciones_tie_cop,alivio_por_cioef_cop,compras_ndc_cop,ventas_desviaciones_oefh_cop,compras_desviaciones_oefh_cop,devolucion_dineros_del_cargo_por_confiabilidad_cop,cobro_dinero_cargo_por_confiabilidad_cop,compras_arranque_y_parada_cop,ventas_arranque_y_parada_cop,ventas_por_eeve_cop,compras_por_eeve_cop,restricciones_por_eeve_cop,cobro_uso_respaldo_cop,alivio_restricciones_res_05_2010_cop,compras_en_bolsa_ties_cop,ventas_en_bolsa_ties_cop,magnitud_en_kwh__de_compras_en_bolsa_de_ties,magnitud_en_kwh_de_ventas_en_bolsa_ties,alivio_por_ejecucion_de_garantia_cop,valor_total_ejecucion_de_garantia_cop,alivio_por_vcsrcfvd_cop,voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop,vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop,costo_de_exportacion_cop,total_costo_de_exportacion_cop,total_de_generacion_ideal_en_kwh_del_agente,total_de_holgura_de_agc_en_kwh_asignados_al_agente,energia_vendida_y_embalsada_asignada_kwh,vr_demanda_res_155_2014,alivio_asociado_a_la_resolucion_creg_024_2015_en_cop,cobro_autogeneradores_res_024_2015,valor_a_favor_para_generador_res_178_2015,valor_a_cargo_para_comercializador_res_178_2015,valor_a_cargo_para_generador_res_195_2015,valor_a_favor_para_generador_res_195_2015,valor_a_favor_para_comercializador_res_195_2015,valor_a_cargo_para_comercializador_res_195_2015,valor_a_cargo_pagos_de_energia_excedentaria_cop,valor_a_favor_por_energia_excedentaria_cop,vc_rd_resolucion_011_de_2015,vf_rd_resolucion_011_de_2015,valor_a_favor_delta_ajuste_rd,valor_a_cargo_delta_ajuste_rd,valor_a_cargo_r026_2016_cop,valor_a_favor_r026_2016_cop,valor_a_favor_r029_2016_cop,rf039_resolucion_039_de_2016,rc039_resolucion_039_de_2016,balance_final_029_de_2016,valor_a_cargo_para_comercializador_res_062_2013,valor_a_favor_para_generador_res_062_2013,valor_del_de_tie_res_049_2018_kwh,valor_del_de_tie_res_049_2018_cop,magnitud_desviacion_despacho_res_060_2019_kwh,valor_desviacion_despacho_res_060_2019_cop,magnitud_desviacion_redespacho_res_060_2019_kwh,valor_desviacion_redespacho_res_060_2019_kwh,desviacion_generacion_variable_res_060_2019_kwh,alivio_desviaciones_res_creg_060_2019_cop,valor_pago_ajuste_res_140_2017_cop,valor_cobro_ajuste_res_140_2017_cop,valor_pago_excedente_res_140_2017_cop,valor_cobro_faltante_res_140_2017_cop,compras_en_bolsa_ajustes_cop
          }
        }
        });
        console.log(data);
        } catch (error) {
        console.log(error);
        }
        }
        })
    //Detecta cuando se cargo el archivo y pone en el cajon el valor cargado
    useEffect(() => {
          if (datacsv) {
            var Position=(datacsv[0].indexOf(("Año").toString()))
            setAnho(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Mes").toString()))
            setMes(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("AGENTE").toString()))
            setAgente((datacsv[1][Position]));
            // var Position=(datacsv[0].indexOf(("Creador").toString()))
            // setCreador(parseFloat(datacsv[1][Position]));
            var Position=(datacsv[0].indexOf(("PERDIDA REAL (kWh)").toString()))
            setPerdida_Real_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DEMANDA REAL (kWh)").toString()))
            setDemanda_Real_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("GENERACION REAL (kWh)").toString()))
            setGeneracion_Real_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN BOLSA (KWH)").toString()))
            setCompras_En_Bolsa_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN BOLSA ($)").toString()))
            setCompras_En_Bolsa_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN BOLSA (KWH)").toString()))
            setVentas_En_Bolsa_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN BOLSA ($)").toString()))
            setVentas_En_Bolsa_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN DESVIACION (KWH)").toString()))
            setCompras_En_Desviacion_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN DESVIACION ($)").toString()))
            setCompras_En_Desviacion_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN DESVIACION (KWH)").toString()))
            setVentas_En_Desviacion_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN DESVIACION ($)").toString()))
            setVentas_En_Desviacion_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN RECONCILIACION (KWH)").toString()))
            setCompras_En_Reconciliacion_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN RECONCILIACION ($)").toString()))
            setCompras_En_Reconciliacion_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN RECONCILIACION (KWH)").toString()))
            setVentas_En_Reconciliacion_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN RECONCILIACION ($)").toString()))
            setVentas_En_Reconciliacion_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN CONTRATOS (kWh)").toString()))
            setCompras_En_Contratos_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN CONTRATOS (kWh)").toString()))
            setVentas_En_Contratos_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS ENERGIA EN BOLSA (KWH)").toString()))
            setCompras_Energia_En_Bolsa_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS ENERGIA EN BOLSA ($)").toString()))
            setCompras_Energia_En_Bolsa_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS ENERGIA EN BOLSA (KWH)").toString()))
            setVentas_Energia_En_Bolsa_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS ENERGIA EN BOLSA ($)").toString()))
            setVentas_Energia_En_Bolsa_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VR CARGO POR CONFIABILIDAD ($)").toString()))
            setVr_Cargo_Por_Confiabilidad_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VD CARGO POR CONFIABILIDAD ($)").toString()))
            setVd_Cargo_Por_Confiabilidad_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("NETO CXC ($)").toString()))
            setNeto_Cxc_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS CARGO POR CONFIABILIDAD ($)").toString()))
            setCompras_Cargo_Por_Confiabilidad_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS CARGO POR CONFIABILIDAD ($)").toString()))
            setVentas_Cargo_Por_Confiabilidad_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN BOLSA NACIONAL (KWH)").toString()))
            setCompras_En_Bolsa_Nacional_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN BOLSA NACIONAL ($)").toString()))
            setCompras_En_Bolsa_Nacional_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN BOLSA NACIONAL (KWH)").toString()))
            setVentas_En_Bolsa_Nacional_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN BOLSA NACIONAL ($)").toString()))
            setVentas_En_Bolsa_Nacional_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN BOLSA INTERNACIONAL (KWH)").toString()))
            setCompras_En_Bolsa_Internacional_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN BOLSA INTERNACIONAL ($)").toString()))
            setCompras_En_Bolsa_Internacional_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN BOLSA INTERNACIONAL (KWH)").toString()))
            setVentas_En_Bolsa_Internacional_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN BOLSA INTERNACIONAL ($)").toString()))
            setVentas_En_Bolsa_Internacional_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("SERVICIOS AGC ($)").toString()))
            setServicios_Agc_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RESPONSABILIDAD COMERCIAL AGC (KWH)").toString()))
            setResponsabilidad_Comercial_Agc_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RESPONSABILIDAD COMERCIAL AGC ($)").toString()))
            setResponsabilidad_Comercial_Agc_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TOTAL COMPRAS ($)").toString()))
            setTotal_Compras_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TOTAL VENTAS ($)").toString()))
            setTotal_Ventas_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR A PAGAR POR SRPF ($)").toString()))
            setValor_A_Pagar_Por_Srpf_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR A RECIBIR POR SRPF ($)").toString()))
            setValor_A_Recibir_Por_Srpf_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TOTAL RESTRICCIONES ($)").toString()))
            setTotal_Restricciones_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RENTAS DE CONGESTION ($)").toString()))
            setRentas_De_Congestion_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RESTRICCIONES ALIVIADAS ($)").toString()))
            setRestricciones_Aliviadas_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VEBO (KWH)").toString()))
            setVebo_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RENTAS DE CONGESTIÓN POR IMPORTACIÓN ($)").toString()))
            setRentas_De_Congestion_Por_Importacion_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DISTRIBUCIÓN SALDO NETO TIE EN MÉRITO ($)").toString()))
            setDistribucion_Saldo_Neto_Tie_En_Merito_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DISTRIBUCIÓN SALDO NETO TIE FUERA DE MÉRITO ($)").toString()))
            setDistribucion_Saldo_Neto_Tie_Fuera_De_Merito_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS BOLSA CON SALDO NETO TIE MÉRITO ($)").toString()))
            setCompras_Bolsa_Con_Saldo_Neto_Tie_Merito_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RENDIMIENTOS FINANCIEROS POR EXPORTACIONES TIE($)").toString()))
            setRendimientos_Financieros_Por_Exportaciones_Tie_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("ALIVIO POR CIOEF ($)").toString()))
            setAlivio_Por_Cioef_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS NDC ($)").toString()))
            setCompras_Ndc_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS DESVIACIONES OEFH ($)").toString()))
            setVentas_Desviaciones_Oefh_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS DESVIACIONES OEFH ($)").toString()))
            setCompras_Desviaciones_Oefh_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DEVOLUCION DINEROS DEL CARGO POR CONFIABILIDAD ($)").toString()))
            setDevolucion_Dineros_Del_Cargo_Por_Confiabilidad_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COBRO DINERO CARGO POR CONFIABILIDAD ($)").toString()))
            setCobro_Dinero_Cargo_Por_Confiabilidad_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS ARRANQUE Y PARADA ($)").toString()))
            setCompras_Arranque_Y_Parada_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS ARRANQUE Y PARADA ($)").toString()))
            setVentas_Arranque_Y_Parada_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Ventas por EEVE ($)").toString()))
            setVentas_Por_Eeve_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Compras por EEVE ($)").toString()))
            setCompras_Por_Eeve_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Restricciones por EEVE ($)").toString()))
            setRestricciones_Por_Eeve_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Cobro uso respaldo($)").toString()))
            setCobro_Uso_Respaldo_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Alivio restricciones RES 05/2010 ($)").toString()))
            setAlivio_Restricciones_Res_05_2010_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN BOLSA TIES($)").toString()))
            setCompras_En_Bolsa_Ties_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENTAS EN BOLSA TIES ($)").toString()))
            setVentas_En_Bolsa_Ties_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("MAGNITUD EN Kwh  DE COMPRAS EN BOLSA DE TIES").toString()))
            setMagnitud_En_Kwh__De_Compras_En_Bolsa_De_Ties(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("MAGNITUD EN kwh DE VENTAS EN BOLSA TIES").toString()))
            setMagnitud_En_Kwh_De_Ventas_En_Bolsa_Ties(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("ALIVIO POR EJECUCION DE GARANTIA ($)").toString()))
            setAlivio_Por_Ejecucion_De_Garantia_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR TOTAL EJECUCION DE GARANTIA ($)").toString()))
            setValor_Total_Ejecucion_De_Garantia_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Alivio por VCSRCFVD($)").toString()))
            setAlivio_Por_Vcsrcfvd_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VOEFV a cargo por la OEFV adquirida en la SRCFV($)").toString()))
            setVoefv_A_Cargo_Por_La_Oefv_Adquirida_En_La_Srcfv_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VMOEFV a cargo al Margen del Precio MP SRCFV ($):").toString()))
            setVmoefv_A_Cargo_Al_Margen_Del_Precio_Mp_Srcfv_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Costo de Exportación ($)").toString()))
            setCosto_De_Exportacion_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Total Costo de Exportación ($)").toString()))
            setTotal_Costo_De_Exportacion_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Total de Generación Ideal en kWh del Agente").toString()))
            setTotal_De_Generacion_Ideal_En_Kwh_Del_Agente(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Total de Holgura de AGC en kWh asignados al Agente").toString()))
            setTotal_De_Holgura_De_Agc_En_Kwh_Asignados_Al_Agente(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Energía vendida y embalsada Asignada kWh").toString()))
            setEnergia_Vendida_Y_Embalsada_Asignada_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VR Demanda Res 155/2014").toString()))
            setVr_Demanda_Res_155_2014(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Alivio Asociado a la Resolución CREG 024/2015 en $").toString()))
            setAlivio_Asociado_A_La_Resolucion_Creg_024_2015_En_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Cobro Autogeneradores Res 024/2015").toString()))
            setCobro_Autogeneradores_Res_024_2015(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a favor para generador. Res 178/2015").toString()))
            setValor_A_Favor_Para_Generador_Res_178_2015(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a cargo para comercializador. Res 178/2015").toString()))
            setValor_A_Cargo_Para_Comercializador_Res_178_2015(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a cargo para generador. Res 195/2015").toString()))
            setValor_A_Cargo_Para_Generador_Res_195_2015(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a favor para generador. Res 195/2015").toString()))
            setValor_A_Favor_Para_Generador_Res_195_2015(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a favor para comercializador. Res 195/2015").toString()))
            setValor_A_Favor_Para_Comercializador_Res_195_2015(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a cargo para comercializador. Res 195/2015").toString()))
            setValor_A_Cargo_Para_Comercializador_Res_195_2015(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR A CARGO PAGOS DE ENERGIA EXCEDENTARIA ($)").toString()))
            setValor_A_Cargo_Pagos_De_Energia_Excedentaria_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR A FAVOR POR ENERGIA EXCEDENTARIA ($)").toString()))
            setValor_A_Favor_Por_Energia_Excedentaria_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VC_RD resolución 011 de 2015").toString()))
            setVc_Rd_Resolucion_011_De_2015(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VF_RD resolución 011 de 2015").toString()))
            setVf_Rd_Resolucion_011_De_2015(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a Favor delta ajuste RD").toString()))
            setValor_A_Favor_Delta_Ajuste_Rd(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a Cargo delta ajuste RD").toString()))
            setValor_A_Cargo_Delta_Ajuste_Rd(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR A CARGO R026-2016 ($).").toString()))
            setValor_A_Cargo_R026_2016_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR A FAVOR R026-2016 ($).").toString()))
            setValor_A_Favor_R026_2016_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR A FAVOR R029-2016 ($).").toString()))
            setValor_A_Favor_R029_2016_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RF039 resolución 039 de 2016").toString()))
            setRf039_Resolucion_039_De_2016(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RC039 resolución 039 de 2016").toString()))
            setRc039_Resolucion_039_De_2016(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Balance Final 029 de 2016").toString()))
            setBalance_Final_029_De_2016(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a cargo para comercializador. RES. 062 2013").toString()))
            setValor_A_Cargo_Para_Comercializador_Res_062_2013(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor a favor para generador. RES. 062 2013").toString()))
            setValor_A_Favor_Para_Generador_Res_062_2013(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor del DE TIE. RES. 049 2018 (kWh)").toString()))
            setValor_Del_De_Tie_Res_049_2018_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor del DE TIE. RES. 049 2018 ($)").toString()))
            setValor_Del_De_Tie_Res_049_2018_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Magnitud desviación despacho. RES. 060 2019 (kWh)").toString()))
            setMagnitud_Desviacion_Despacho_Res_060_2019_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor Desviación Despacho. RES. 060 2019 ($)").toString()))
            setValor_Desviacion_Despacho_Res_060_2019_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Magnitud desviación Redespacho. RES. 060 2019(kWh)").toString()))
            setMagnitud_Desviacion_Redespacho_Res_060_2019_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Valor Desviación ReDespacho. RES. 060 2019 (kWh)").toString()))
            setValor_Desviacion_Redespacho_Res_060_2019_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Desviación Generación Variable. RES. 060 2019(kWh)").toString()))
            setDesviacion_Generacion_Variable_Res_060_2019_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Alivio desviaciones Res. CREG 060/2019 ($)").toString()))
            setAlivio_Desviaciones_Res_Creg_060_2019_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR PAGO AJUSTE RES. 140 2017 ($)").toString()))
            setValor_Pago_Ajuste_Res_140_2017_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR COBRO AJUSTE RES. 140 2017 ($)").toString()))
            setValor_Cobro_Ajuste_Res_140_2017_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR PAGO EXCEDENTE RES. 140 2017 ($)").toString()))
            setValor_Pago_Excedente_Res_140_2017_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR COBRO FALTANTE RES. 140 2017 ($)").toString()))
            setValor_Cobro_Faltante_Res_140_2017_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRAS EN BOLSA AJUSTES COP ($)").toString()))
            setCompras_en_bolsa_ajustes_cop(parseFloat(datacsv[1][Position]));
        } else {
        }  
    }, [datacsv])

    useEffect(() => {
        if(loading1) return null;
        setCreador(parseInt(data1.obtenerUsuario.id));
        setEmpresa_id(data1.obtenerUsuario.empresa);
        console.log(empresa_id)
        }, [loading1])
   
    return (
    <div>
    <Modal show={props.show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    id="myModal"
    onHide={props.close}>
    <Modal.Header closeButton>
    <Modal.Title>Adicionar datos a tabla Data AFAC</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div>
        <div className="card  col-sm m-2">
        <div className="App" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Arrastre algun archivo aqui o haga click para cargar</p>
           <div>
        <p className="font-italic h6 ">Archivos cargados:</p>
        <ul>
          {fileNames.map(fileName => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div>
        </div>
        </div>
        </div>
    <form
    onSubmit={formik.handleSubmit}
    >
      <div className="form-group row">
    <label htmlFor="empresa_id" className="col-sm-7 col-form-label">Empresa</label><div className="col-sm-5">
    <input type="text" className="form-control" id="empresa_id" placeholder="Empresa Id"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.empresa_id ?
      formik.values.empresa_id.charAt(0).toUpperCase() + formik.values.empresa_id.slice(1):''}
      
    readOnly></input></div>
    </div>
    { formik.touched.empresa_id&& formik.errors.empresa_id? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
    
    <p>{formik.errors.empresa_id}</p>
    </div>
    ) : null  }
        <div className= "form-group row ">
        <label htmlFor="agente" className="col-sm-7 col-form-label ">Agente</label><div className="col-sm-5">
        <input type= "text" className= "form-control" id= "agente" placeholder= "Agente "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.agente}></input></div>
        </div>
        { formik.touched.agente&& formik.errors.agente? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.agente}</p>
        </div>
        ) : null  }
        <div className= "form-group row ">
        <label htmlFor="anho" className="col-sm-7 col-form-label ">Anho</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "anho" placeholder= "Anho "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.anho}></input></div>
        </div>
        { formik.touched.anho&& formik.errors.anho? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.anho}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="mes" className="col-sm-7 col-form-label ">Mes</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "mes" placeholder= "Mes "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.mes}></input></div>
        </div>
        { formik.touched.mes&& formik.errors.mes? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.mes}</p>
        </div>
        ) : null  }
        {/* <div className= "form-group row ">
        <label htmlFor="creador" className="col-sm-7 col-form-label ">Creador</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "creador" placeholder= "Creador "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.creador}></input></div>
        </div>
        { formik.touched.creador&& formik.errors.creador? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.creador}</p>
        </div>
        ) : null  } */}
        <div className= "form-group row ">
        <label htmlFor="perdida_real_kwh" className="col-sm-7 col-form-label ">Perdida_Real_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "perdida_real_kwh" placeholder= "Perdida_Real_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.perdida_real_kwh}></input></div>
        </div>
        { formik.touched.perdida_real_kwh&& formik.errors.perdida_real_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.perdida_real_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="demanda_real_kwh" className="col-sm-7 col-form-label ">Demanda_Real_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "demanda_real_kwh" placeholder= "Demanda_Real_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.demanda_real_kwh}></input></div>
        </div>
        { formik.touched.demanda_real_kwh&& formik.errors.demanda_real_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.demanda_real_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="generacion_real_kwh" className="col-sm-7 col-form-label ">Generacion_Real_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "generacion_real_kwh" placeholder= "Generacion_Real_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.generacion_real_kwh}></input></div>
        </div>
        { formik.touched.generacion_real_kwh&& formik.errors.generacion_real_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.generacion_real_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_bolsa_kwh" className="col-sm-7 col-form-label ">Compras_En_Bolsa_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_bolsa_kwh" placeholder= "Compras_En_Bolsa_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_bolsa_kwh}></input></div>
        </div>
        { formik.touched.compras_en_bolsa_kwh&& formik.errors.compras_en_bolsa_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_bolsa_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_bolsa_cop" className="col-sm-7 col-form-label ">Compras_En_Bolsa_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_bolsa_cop" placeholder= "Compras_En_Bolsa_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_bolsa_cop}></input></div>
        </div>
        { formik.touched.compras_en_bolsa_cop&& formik.errors.compras_en_bolsa_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_bolsa_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_bolsa_kwh" className="col-sm-7 col-form-label ">Ventas_En_Bolsa_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_bolsa_kwh" placeholder= "Ventas_En_Bolsa_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_bolsa_kwh}></input></div>
        </div>
        { formik.touched.ventas_en_bolsa_kwh&& formik.errors.ventas_en_bolsa_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_bolsa_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_bolsa_cop" className="col-sm-7 col-form-label ">Ventas_En_Bolsa_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_bolsa_cop" placeholder= "Ventas_En_Bolsa_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_bolsa_cop}></input></div>
        </div>
        { formik.touched.ventas_en_bolsa_cop&& formik.errors.ventas_en_bolsa_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_bolsa_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_desviacion_kwh" className="col-sm-7 col-form-label ">Compras_En_Desviacion_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_desviacion_kwh" placeholder= "Compras_En_Desviacion_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_desviacion_kwh}></input></div>
        </div>
        { formik.touched.compras_en_desviacion_kwh&& formik.errors.compras_en_desviacion_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_desviacion_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_desviacion_cop" className="col-sm-7 col-form-label ">Compras_En_Desviacion_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_desviacion_cop" placeholder= "Compras_En_Desviacion_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_desviacion_cop}></input></div>
        </div>
        { formik.touched.compras_en_desviacion_cop&& formik.errors.compras_en_desviacion_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_desviacion_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_desviacion_kwh" className="col-sm-7 col-form-label ">Ventas_En_Desviacion_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_desviacion_kwh" placeholder= "Ventas_En_Desviacion_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_desviacion_kwh}></input></div>
        </div>
        { formik.touched.ventas_en_desviacion_kwh&& formik.errors.ventas_en_desviacion_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_desviacion_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_desviacion_cop" className="col-sm-7 col-form-label ">Ventas_En_Desviacion_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_desviacion_cop" placeholder= "Ventas_En_Desviacion_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_desviacion_cop}></input></div>
        </div>
        { formik.touched.ventas_en_desviacion_cop&& formik.errors.ventas_en_desviacion_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_desviacion_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_reconciliacion_kwh" className="col-sm-7 col-form-label ">Compras_En_Reconciliacion_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_reconciliacion_kwh" placeholder= "Compras_En_Reconciliacion_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_reconciliacion_kwh}></input></div>
        </div>
        { formik.touched.compras_en_reconciliacion_kwh&& formik.errors.compras_en_reconciliacion_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_reconciliacion_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_reconciliacion_cop" className="col-sm-7 col-form-label ">Compras_En_Reconciliacion_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_reconciliacion_cop" placeholder= "Compras_En_Reconciliacion_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_reconciliacion_cop}></input></div>
        </div>
        { formik.touched.compras_en_reconciliacion_cop&& formik.errors.compras_en_reconciliacion_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_reconciliacion_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_reconciliacion_kwh" className="col-sm-7 col-form-label ">Ventas_En_Reconciliacion_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_reconciliacion_kwh" placeholder= "Ventas_En_Reconciliacion_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_reconciliacion_kwh}></input></div>
        </div>
        { formik.touched.ventas_en_reconciliacion_kwh&& formik.errors.ventas_en_reconciliacion_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_reconciliacion_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_reconciliacion_cop" className="col-sm-7 col-form-label ">Ventas_En_Reconciliacion_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_reconciliacion_cop" placeholder= "Ventas_En_Reconciliacion_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_reconciliacion_cop}></input></div>
        </div>
        { formik.touched.ventas_en_reconciliacion_cop&& formik.errors.ventas_en_reconciliacion_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_reconciliacion_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_contratos_kwh" className="col-sm-7 col-form-label ">Compras_En_Contratos_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_contratos_kwh" placeholder= "Compras_En_Contratos_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_contratos_kwh}></input></div>
        </div>
        { formik.touched.compras_en_contratos_kwh&& formik.errors.compras_en_contratos_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_contratos_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_contratos_kwh" className="col-sm-7 col-form-label ">Ventas_En_Contratos_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_contratos_kwh" placeholder= "Ventas_En_Contratos_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_contratos_kwh}></input></div>
        </div>
        { formik.touched.ventas_en_contratos_kwh&& formik.errors.ventas_en_contratos_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_contratos_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_energia_en_bolsa_kwh" className="col-sm-7 col-form-label ">Compras_Energia_En_Bolsa_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_energia_en_bolsa_kwh" placeholder= "Compras_Energia_En_Bolsa_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_energia_en_bolsa_kwh}></input></div>
        </div>
        { formik.touched.compras_energia_en_bolsa_kwh&& formik.errors.compras_energia_en_bolsa_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_energia_en_bolsa_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_energia_en_bolsa_cop" className="col-sm-7 col-form-label ">Compras_Energia_En_Bolsa_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_energia_en_bolsa_cop" placeholder= "Compras_Energia_En_Bolsa_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_energia_en_bolsa_cop}></input></div>
        </div>
        { formik.touched.compras_energia_en_bolsa_cop&& formik.errors.compras_energia_en_bolsa_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_energia_en_bolsa_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_energia_en_bolsa_kwh" className="col-sm-7 col-form-label ">Ventas_Energia_En_Bolsa_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_energia_en_bolsa_kwh" placeholder= "Ventas_Energia_En_Bolsa_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_energia_en_bolsa_kwh}></input></div>
        </div>
        { formik.touched.ventas_energia_en_bolsa_kwh&& formik.errors.ventas_energia_en_bolsa_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_energia_en_bolsa_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_energia_en_bolsa_cop" className="col-sm-7 col-form-label ">Ventas_Energia_En_Bolsa_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_energia_en_bolsa_cop" placeholder= "Ventas_Energia_En_Bolsa_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_energia_en_bolsa_cop}></input></div>
        </div>
        { formik.touched.ventas_energia_en_bolsa_cop&& formik.errors.ventas_energia_en_bolsa_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_energia_en_bolsa_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="vr_cargo_por_confiabilidad_cop" className="col-sm-7 col-form-label ">Vr_Cargo_Por_Confiabilidad_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "vr_cargo_por_confiabilidad_cop" placeholder= "Vr_Cargo_Por_Confiabilidad_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.vr_cargo_por_confiabilidad_cop}></input></div>
        </div>
        { formik.touched.vr_cargo_por_confiabilidad_cop&& formik.errors.vr_cargo_por_confiabilidad_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.vr_cargo_por_confiabilidad_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="vd_cargo_por_confiabilidad_cop" className="col-sm-7 col-form-label ">Vd_Cargo_Por_Confiabilidad_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "vd_cargo_por_confiabilidad_cop" placeholder= "Vd_Cargo_Por_Confiabilidad_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.vd_cargo_por_confiabilidad_cop}></input></div>
        </div>
        { formik.touched.vd_cargo_por_confiabilidad_cop&& formik.errors.vd_cargo_por_confiabilidad_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.vd_cargo_por_confiabilidad_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="neto_cxc_cop" className="col-sm-7 col-form-label ">Neto_Cxc_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "neto_cxc_cop" placeholder= "Neto_Cxc_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.neto_cxc_cop}></input></div>
        </div>
        { formik.touched.neto_cxc_cop&& formik.errors.neto_cxc_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.neto_cxc_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_cargo_por_confiabilidad_cop" className="col-sm-7 col-form-label ">Compras_Cargo_Por_Confiabilidad_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_cargo_por_confiabilidad_cop" placeholder= "Compras_Cargo_Por_Confiabilidad_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_cargo_por_confiabilidad_cop}></input></div>
        </div>
        { formik.touched.compras_cargo_por_confiabilidad_cop&& formik.errors.compras_cargo_por_confiabilidad_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_cargo_por_confiabilidad_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_cargo_por_confiabilidad_cop" className="col-sm-7 col-form-label ">Ventas_Cargo_Por_Confiabilidad_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_cargo_por_confiabilidad_cop" placeholder= "Ventas_Cargo_Por_Confiabilidad_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_cargo_por_confiabilidad_cop}></input></div>
        </div>
        { formik.touched.ventas_cargo_por_confiabilidad_cop&& formik.errors.ventas_cargo_por_confiabilidad_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_cargo_por_confiabilidad_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_bolsa_nacional_kwh" className="col-sm-7 col-form-label ">Compras_En_Bolsa_Nacional_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_bolsa_nacional_kwh" placeholder= "Compras_En_Bolsa_Nacional_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_bolsa_nacional_kwh}></input></div>
        </div>
        { formik.touched.compras_en_bolsa_nacional_kwh&& formik.errors.compras_en_bolsa_nacional_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_bolsa_nacional_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_bolsa_nacional_cop" className="col-sm-7 col-form-label ">Compras_En_Bolsa_Nacional_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_bolsa_nacional_cop" placeholder= "Compras_En_Bolsa_Nacional_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_bolsa_nacional_cop}></input></div>
        </div>
        { formik.touched.compras_en_bolsa_nacional_cop&& formik.errors.compras_en_bolsa_nacional_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_bolsa_nacional_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_bolsa_nacional_kwh" className="col-sm-7 col-form-label ">Ventas_En_Bolsa_Nacional_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_bolsa_nacional_kwh" placeholder= "Ventas_En_Bolsa_Nacional_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_bolsa_nacional_kwh}></input></div>
        </div>
        { formik.touched.ventas_en_bolsa_nacional_kwh&& formik.errors.ventas_en_bolsa_nacional_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_bolsa_nacional_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_bolsa_nacional_cop" className="col-sm-7 col-form-label ">Ventas_En_Bolsa_Nacional_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_bolsa_nacional_cop" placeholder= "Ventas_En_Bolsa_Nacional_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_bolsa_nacional_cop}></input></div>
        </div>
        { formik.touched.ventas_en_bolsa_nacional_cop&& formik.errors.ventas_en_bolsa_nacional_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_bolsa_nacional_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_bolsa_internacional_kwh" className="col-sm-7 col-form-label ">Compras_En_Bolsa_Internacional_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_bolsa_internacional_kwh" placeholder= "Compras_En_Bolsa_Internacional_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_bolsa_internacional_kwh}></input></div>
        </div>
        { formik.touched.compras_en_bolsa_internacional_kwh&& formik.errors.compras_en_bolsa_internacional_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_bolsa_internacional_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_bolsa_internacional_cop" className="col-sm-7 col-form-label ">Compras_En_Bolsa_Internacional_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_bolsa_internacional_cop" placeholder= "Compras_En_Bolsa_Internacional_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_bolsa_internacional_cop}></input></div>
        </div>
        { formik.touched.compras_en_bolsa_internacional_cop&& formik.errors.compras_en_bolsa_internacional_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_bolsa_internacional_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_bolsa_internacional_kwh" className="col-sm-7 col-form-label ">Ventas_En_Bolsa_Internacional_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_bolsa_internacional_kwh" placeholder= "Ventas_En_Bolsa_Internacional_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_bolsa_internacional_kwh}></input></div>
        </div>
        { formik.touched.ventas_en_bolsa_internacional_kwh&& formik.errors.ventas_en_bolsa_internacional_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_bolsa_internacional_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_bolsa_internacional_cop" className="col-sm-7 col-form-label ">Ventas_En_Bolsa_Internacional_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_bolsa_internacional_cop" placeholder= "Ventas_En_Bolsa_Internacional_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_bolsa_internacional_cop}></input></div>
        </div>
        { formik.touched.ventas_en_bolsa_internacional_cop&& formik.errors.ventas_en_bolsa_internacional_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_bolsa_internacional_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="servicios_agc_cop" className="col-sm-7 col-form-label ">Servicios_Agc_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "servicios_agc_cop" placeholder= "Servicios_Agc_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.servicios_agc_cop}></input></div>
        </div>
        { formik.touched.servicios_agc_cop&& formik.errors.servicios_agc_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.servicios_agc_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="responsabilidad_comercial_agc_kwh" className="col-sm-7 col-form-label ">Responsabilidad_Comercial_Agc_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "responsabilidad_comercial_agc_kwh" placeholder= "Responsabilidad_Comercial_Agc_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.responsabilidad_comercial_agc_kwh}></input></div>
        </div>
        { formik.touched.responsabilidad_comercial_agc_kwh&& formik.errors.responsabilidad_comercial_agc_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.responsabilidad_comercial_agc_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="responsabilidad_comercial_agc_cop" className="col-sm-7 col-form-label ">Responsabilidad_Comercial_Agc_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "responsabilidad_comercial_agc_cop" placeholder= "Responsabilidad_Comercial_Agc_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.responsabilidad_comercial_agc_cop}></input></div>
        </div>
        { formik.touched.responsabilidad_comercial_agc_cop&& formik.errors.responsabilidad_comercial_agc_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.responsabilidad_comercial_agc_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="total_compras_cop" className="col-sm-7 col-form-label ">Total_Compras_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "total_compras_cop" placeholder= "Total_Compras_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.total_compras_cop}></input></div>
        </div>
        { formik.touched.total_compras_cop&& formik.errors.total_compras_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.total_compras_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="total_ventas_cop" className="col-sm-7 col-form-label ">Total_Ventas_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "total_ventas_cop" placeholder= "Total_Ventas_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.total_ventas_cop}></input></div>
        </div>
        { formik.touched.total_ventas_cop&& formik.errors.total_ventas_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.total_ventas_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_pagar_por_srpf_cop" className="col-sm-7 col-form-label ">Valor_A_Pagar_Por_Srpf_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_pagar_por_srpf_cop" placeholder= "Valor_A_Pagar_Por_Srpf_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_pagar_por_srpf_cop}></input></div>
        </div>
        { formik.touched.valor_a_pagar_por_srpf_cop&& formik.errors.valor_a_pagar_por_srpf_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_pagar_por_srpf_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_recibir_por_srpf_cop" className="col-sm-7 col-form-label ">Valor_A_Recibir_Por_Srpf_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_recibir_por_srpf_cop" placeholder= "Valor_A_Recibir_Por_Srpf_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_recibir_por_srpf_cop}></input></div>
        </div>
        { formik.touched.valor_a_recibir_por_srpf_cop&& formik.errors.valor_a_recibir_por_srpf_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_recibir_por_srpf_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="total_restricciones_cop" className="col-sm-7 col-form-label ">Total_Restricciones_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "total_restricciones_cop" placeholder= "Total_Restricciones_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.total_restricciones_cop}></input></div>
        </div>
        { formik.touched.total_restricciones_cop&& formik.errors.total_restricciones_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.total_restricciones_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="rentas_de_congestion_cop" className="col-sm-7 col-form-label ">Rentas_De_Congestion_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "rentas_de_congestion_cop" placeholder= "Rentas_De_Congestion_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rentas_de_congestion_cop}></input></div>
        </div>
        { formik.touched.rentas_de_congestion_cop&& formik.errors.rentas_de_congestion_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.rentas_de_congestion_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="restricciones_aliviadas_cop" className="col-sm-7 col-form-label ">Restricciones_Aliviadas_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "restricciones_aliviadas_cop" placeholder= "Restricciones_Aliviadas_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.restricciones_aliviadas_cop}></input></div>
        </div>
        { formik.touched.restricciones_aliviadas_cop&& formik.errors.restricciones_aliviadas_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.restricciones_aliviadas_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="vebo_kwh" className="col-sm-7 col-form-label ">Vebo_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "vebo_kwh" placeholder= "Vebo_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.vebo_kwh}></input></div>
        </div>
        { formik.touched.vebo_kwh&& formik.errors.vebo_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.vebo_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="rentas_de_congestion_por_importacion_cop" className="col-sm-7 col-form-label ">Rentas_De_Congestion_Por_Importacion_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "rentas_de_congestion_por_importacion_cop" placeholder= "Rentas_De_Congestion_Por_Importacion_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rentas_de_congestion_por_importacion_cop}></input></div>
        </div>
        { formik.touched.rentas_de_congestion_por_importacion_cop&& formik.errors.rentas_de_congestion_por_importacion_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.rentas_de_congestion_por_importacion_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="distribucion_saldo_neto_tie_en_merito_cop" className="col-sm-7 col-form-label ">Distribucion_Saldo_Neto_Tie_En_Merito_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "distribucion_saldo_neto_tie_en_merito_cop" placeholder= "Distribucion_Saldo_Neto_Tie_En_Merito_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.distribucion_saldo_neto_tie_en_merito_cop}></input></div>
        </div>
        { formik.touched.distribucion_saldo_neto_tie_en_merito_cop&& formik.errors.distribucion_saldo_neto_tie_en_merito_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.distribucion_saldo_neto_tie_en_merito_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="distribucion_saldo_neto_tie_fuera_de_merito_cop" className="col-sm-7 col-form-label ">Distribucion_Saldo_Neto_Tie_Fuera_De_Merito_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "distribucion_saldo_neto_tie_fuera_de_merito_cop" placeholder= "Distribucion_Saldo_Neto_Tie_Fuera_De_Merito_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.distribucion_saldo_neto_tie_fuera_de_merito_cop}></input></div>
        </div>
        { formik.touched.distribucion_saldo_neto_tie_fuera_de_merito_cop&& formik.errors.distribucion_saldo_neto_tie_fuera_de_merito_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.distribucion_saldo_neto_tie_fuera_de_merito_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_bolsa_con_saldo_neto_tie_merito_cop" className="col-sm-7 col-form-label ">Compras_Bolsa_Con_Saldo_Neto_Tie_Merito_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_bolsa_con_saldo_neto_tie_merito_cop" placeholder= "Compras_Bolsa_Con_Saldo_Neto_Tie_Merito_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_bolsa_con_saldo_neto_tie_merito_cop}></input></div>
        </div>
        { formik.touched.compras_bolsa_con_saldo_neto_tie_merito_cop&& formik.errors.compras_bolsa_con_saldo_neto_tie_merito_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_bolsa_con_saldo_neto_tie_merito_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="rendimientos_financieros_por_exportaciones_tie_cop" className="col-sm-7 col-form-label ">Rendimientos_Financieros_Por_Exportaciones_Tie_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "rendimientos_financieros_por_exportaciones_tie_cop" placeholder= "Rendimientos_Financieros_Por_Exportaciones_Tie_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rendimientos_financieros_por_exportaciones_tie_cop}></input></div>
        </div>
        { formik.touched.rendimientos_financieros_por_exportaciones_tie_cop&& formik.errors.rendimientos_financieros_por_exportaciones_tie_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.rendimientos_financieros_por_exportaciones_tie_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="alivio_por_cioef_cop" className="col-sm-7 col-form-label ">Alivio_Por_Cioef_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "alivio_por_cioef_cop" placeholder= "Alivio_Por_Cioef_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alivio_por_cioef_cop}></input></div>
        </div>
        { formik.touched.alivio_por_cioef_cop&& formik.errors.alivio_por_cioef_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.alivio_por_cioef_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_ndc_cop" className="col-sm-7 col-form-label ">Compras_Ndc_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_ndc_cop" placeholder= "Compras_Ndc_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_ndc_cop}></input></div>
        </div>
        { formik.touched.compras_ndc_cop&& formik.errors.compras_ndc_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_ndc_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_desviaciones_oefh_cop" className="col-sm-7 col-form-label ">Ventas_Desviaciones_Oefh_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_desviaciones_oefh_cop" placeholder= "Ventas_Desviaciones_Oefh_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_desviaciones_oefh_cop}></input></div>
        </div>
        { formik.touched.ventas_desviaciones_oefh_cop&& formik.errors.ventas_desviaciones_oefh_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_desviaciones_oefh_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_desviaciones_oefh_cop" className="col-sm-7 col-form-label ">Compras_Desviaciones_Oefh_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_desviaciones_oefh_cop" placeholder= "Compras_Desviaciones_Oefh_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_desviaciones_oefh_cop}></input></div>
        </div>
        { formik.touched.compras_desviaciones_oefh_cop&& formik.errors.compras_desviaciones_oefh_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_desviaciones_oefh_cop}</p>
        </div>
        ) : null  }


        <div className= "form-group row ">
        <label htmlFor="devolucion_dineros_del_cargo_por_confiabilidad_cop" className="col-sm-7 col-form-label ">Devolucion_Dineros_Del_Cargo_Por_Confiabilidad_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "devolucion_dineros_del_cargo_por_confiabilidad_cop" placeholder= "Devolucion_Dineros_Del_Cargo_Por_Confiabilidad_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.devolucion_dineros_del_cargo_por_confiabilidad_cop}></input></div>
        </div>
        { formik.touched.devolucion_dineros_del_cargo_por_confiabilidad_cop&& formik.errors.devolucion_dineros_del_cargo_por_confiabilidad_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.devolucion_dineros_del_cargo_por_confiabilidad_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="cobro_dinero_cargo_por_confiabilidad_cop" className="col-sm-7 col-form-label ">Cobro_Dinero_Cargo_Por_Confiabilidad_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "cobro_dinero_cargo_por_confiabilidad_cop" placeholder= "Cobro_Dinero_Cargo_Por_Confiabilidad_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.cobro_dinero_cargo_por_confiabilidad_cop}></input></div>
        </div>
        { formik.touched.cobro_dinero_cargo_por_confiabilidad_cop&& formik.errors.cobro_dinero_cargo_por_confiabilidad_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.cobro_dinero_cargo_por_confiabilidad_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_arranque_y_parada_cop" className="col-sm-7 col-form-label ">Compras_Arranque_Y_Parada_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_arranque_y_parada_cop" placeholder= "Compras_Arranque_Y_Parada_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_arranque_y_parada_cop}></input></div>
        </div>
        { formik.touched.compras_arranque_y_parada_cop&& formik.errors.compras_arranque_y_parada_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_arranque_y_parada_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_arranque_y_parada_cop" className="col-sm-7 col-form-label ">Ventas_Arranque_Y_Parada_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_arranque_y_parada_cop" placeholder= "Ventas_Arranque_Y_Parada_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_arranque_y_parada_cop}></input></div>
        </div>
        { formik.touched.ventas_arranque_y_parada_cop&& formik.errors.ventas_arranque_y_parada_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_arranque_y_parada_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_por_eeve_cop" className="col-sm-7 col-form-label ">Ventas_Por_Eeve_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_por_eeve_cop" placeholder= "Ventas_Por_Eeve_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_por_eeve_cop}></input></div>
        </div>
        { formik.touched.ventas_por_eeve_cop&& formik.errors.ventas_por_eeve_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_por_eeve_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_por_eeve_cop" className="col-sm-7 col-form-label ">Compras_Por_Eeve_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_por_eeve_cop" placeholder= "Compras_Por_Eeve_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_por_eeve_cop}></input></div>
        </div>
        { formik.touched.compras_por_eeve_cop&& formik.errors.compras_por_eeve_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_por_eeve_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="restricciones_por_eeve_cop" className="col-sm-7 col-form-label ">Restricciones_Por_Eeve_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "restricciones_por_eeve_cop" placeholder= "Restricciones_Por_Eeve_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.restricciones_por_eeve_cop}></input></div>
        </div>
        { formik.touched.restricciones_por_eeve_cop&& formik.errors.restricciones_por_eeve_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.restricciones_por_eeve_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="cobro_uso_respaldo_cop" className="col-sm-7 col-form-label ">Cobro_Uso_Respaldo_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "cobro_uso_respaldo_cop" placeholder= "Cobro_Uso_Respaldo_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.cobro_uso_respaldo_cop}></input></div>
        </div>
        { formik.touched.cobro_uso_respaldo_cop&& formik.errors.cobro_uso_respaldo_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.cobro_uso_respaldo_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="alivio_restricciones_res_05_2010_cop" className="col-sm-7 col-form-label ">Alivio_Restricciones_Res_05_2010_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "alivio_restricciones_res_05_2010_cop" placeholder= "Alivio_Restricciones_Res_05_2010_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alivio_restricciones_res_05_2010_cop}></input></div>
        </div>
        { formik.touched.alivio_restricciones_res_05_2010_cop&& formik.errors.alivio_restricciones_res_05_2010_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.alivio_restricciones_res_05_2010_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="compras_en_bolsa_ties_cop" className="col-sm-7 col-form-label ">Compras_En_Bolsa_Ties_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_bolsa_ties_cop" placeholder= "Compras_En_Bolsa_Ties_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_bolsa_ties_cop}></input></div>
        </div>
        { formik.touched.compras_en_bolsa_ties_cop&& formik.errors.compras_en_bolsa_ties_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_bolsa_ties_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="ventas_en_bolsa_ties_cop" className="col-sm-7 col-form-label ">Ventas_En_Bolsa_Ties_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "ventas_en_bolsa_ties_cop" placeholder= "Ventas_En_Bolsa_Ties_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ventas_en_bolsa_ties_cop}></input></div>
        </div>
        { formik.touched.ventas_en_bolsa_ties_cop&& formik.errors.ventas_en_bolsa_ties_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.ventas_en_bolsa_ties_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="magnitud_en_kwh__de_compras_en_bolsa_de_ties" className="col-sm-7 col-form-label ">Magnitud_En_Kwh__De_Compras_En_Bolsa_De_Ties</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "magnitud_en_kwh__de_compras_en_bolsa_de_ties" placeholder= "Magnitud_En_Kwh__De_Compras_En_Bolsa_De_Ties "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.magnitud_en_kwh__de_compras_en_bolsa_de_ties}></input></div>
        </div>
        { formik.touched.magnitud_en_kwh__de_compras_en_bolsa_de_ties&& formik.errors.magnitud_en_kwh__de_compras_en_bolsa_de_ties? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.magnitud_en_kwh__de_compras_en_bolsa_de_ties}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="magnitud_en_kwh_de_ventas_en_bolsa_ties" className="col-sm-7 col-form-label ">Magnitud_En_Kwh_De_Ventas_En_Bolsa_Ties</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "magnitud_en_kwh_de_ventas_en_bolsa_ties" placeholder= "Magnitud_En_Kwh_De_Ventas_En_Bolsa_Ties "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.magnitud_en_kwh_de_ventas_en_bolsa_ties}></input></div>
        </div>
        { formik.touched.magnitud_en_kwh_de_ventas_en_bolsa_ties&& formik.errors.magnitud_en_kwh_de_ventas_en_bolsa_ties? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.magnitud_en_kwh_de_ventas_en_bolsa_ties}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="alivio_por_ejecucion_de_garantia_cop" className="col-sm-7 col-form-label ">Alivio_Por_Ejecucion_De_Garantia_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "alivio_por_ejecucion_de_garantia_cop" placeholder= "Alivio_Por_Ejecucion_De_Garantia_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alivio_por_ejecucion_de_garantia_cop}></input></div>
        </div>
        { formik.touched.alivio_por_ejecucion_de_garantia_cop&& formik.errors.alivio_por_ejecucion_de_garantia_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.alivio_por_ejecucion_de_garantia_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_total_ejecucion_de_garantia_cop" className="col-sm-7 col-form-label ">Valor_Total_Ejecucion_De_Garantia_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_total_ejecucion_de_garantia_cop" placeholder= "Valor_Total_Ejecucion_De_Garantia_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_total_ejecucion_de_garantia_cop}></input></div>
        </div>
        { formik.touched.valor_total_ejecucion_de_garantia_cop&& formik.errors.valor_total_ejecucion_de_garantia_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_total_ejecucion_de_garantia_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="alivio_por_vcsrcfvd_cop" className="col-sm-7 col-form-label ">Alivio_Por_Vcsrcfvd_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "alivio_por_vcsrcfvd_cop" placeholder= "Alivio_Por_Vcsrcfvd_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alivio_por_vcsrcfvd_cop}></input></div>
        </div>
        { formik.touched.alivio_por_vcsrcfvd_cop&& formik.errors.alivio_por_vcsrcfvd_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.alivio_por_vcsrcfvd_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop" className="col-sm-7 col-form-label ">Voefv_A_Cargo_Por_La_Oefv_Adquirida_En_La_Srcfv_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop" placeholder= "Voefv_A_Cargo_Por_La_Oefv_Adquirida_En_La_Srcfv_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop}></input></div>
        </div>
        { formik.touched.voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop&& formik.errors.voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop" className="col-sm-7 col-form-label ">Vmoefv_A_Cargo_Al_Margen_Del_Precio_Mp_Srcfv_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop" placeholder= "Vmoefv_A_Cargo_Al_Margen_Del_Precio_Mp_Srcfv_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop}></input></div>
        </div>
        { formik.touched.vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop&& formik.errors.vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="costo_de_exportacion_cop" className="col-sm-7 col-form-label ">Costo_De_Exportacion_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "costo_de_exportacion_cop" placeholder= "Costo_De_Exportacion_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.costo_de_exportacion_cop}></input></div>
        </div>
        { formik.touched.costo_de_exportacion_cop&& formik.errors.costo_de_exportacion_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.costo_de_exportacion_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="total_costo_de_exportacion_cop" className="col-sm-7 col-form-label ">Total_Costo_De_Exportacion_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "total_costo_de_exportacion_cop" placeholder= "Total_Costo_De_Exportacion_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.total_costo_de_exportacion_cop}></input></div>
        </div>
        { formik.touched.total_costo_de_exportacion_cop&& formik.errors.total_costo_de_exportacion_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.total_costo_de_exportacion_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="total_de_generacion_ideal_en_kwh_del_agente" className="col-sm-7 col-form-label ">Total_De_Generacion_Ideal_En_Kwh_Del_Agente</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "total_de_generacion_ideal_en_kwh_del_agente" placeholder= "Total_De_Generacion_Ideal_En_Kwh_Del_Agente "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.total_de_generacion_ideal_en_kwh_del_agente}></input></div>
        </div>
        { formik.touched.total_de_generacion_ideal_en_kwh_del_agente&& formik.errors.total_de_generacion_ideal_en_kwh_del_agente? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.total_de_generacion_ideal_en_kwh_del_agente}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="total_de_holgura_de_agc_en_kwh_asignados_al_agente" className="col-sm-7 col-form-label ">Total_De_Holgura_De_Agc_En_Kwh_Asignados_Al_Agente</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "total_de_holgura_de_agc_en_kwh_asignados_al_agente" placeholder= "Total_De_Holgura_De_Agc_En_Kwh_Asignados_Al_Agente "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.total_de_holgura_de_agc_en_kwh_asignados_al_agente}></input></div>
        </div>
        { formik.touched.total_de_holgura_de_agc_en_kwh_asignados_al_agente&& formik.errors.total_de_holgura_de_agc_en_kwh_asignados_al_agente? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.total_de_holgura_de_agc_en_kwh_asignados_al_agente}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="energia_vendida_y_embalsada_asignada_kwh" className="col-sm-7 col-form-label ">Energia_Vendida_Y_Embalsada_Asignada_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "energia_vendida_y_embalsada_asignada_kwh" placeholder= "Energia_Vendida_Y_Embalsada_Asignada_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.energia_vendida_y_embalsada_asignada_kwh}></input></div>
        </div>
        { formik.touched.energia_vendida_y_embalsada_asignada_kwh&& formik.errors.energia_vendida_y_embalsada_asignada_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.energia_vendida_y_embalsada_asignada_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="vr_demanda_res_155_2014" className="col-sm-7 col-form-label ">Vr_Demanda_Res_155_2014</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "vr_demanda_res_155_2014" placeholder= "Vr_Demanda_Res_155_2014 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.vr_demanda_res_155_2014}></input></div>
        </div>
        { formik.touched.vr_demanda_res_155_2014&& formik.errors.vr_demanda_res_155_2014? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.vr_demanda_res_155_2014}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="alivio_asociado_a_la_resolucion_creg_024_2015_en_cop" className="col-sm-7 col-form-label ">Alivio_Asociado_A_La_Resolucion_Creg_024_2015_En_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "alivio_asociado_a_la_resolucion_creg_024_2015_en_cop" placeholder= "Alivio_Asociado_A_La_Resolucion_Creg_024_2015_En_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alivio_asociado_a_la_resolucion_creg_024_2015_en_cop}></input></div>
        </div>
        { formik.touched.alivio_asociado_a_la_resolucion_creg_024_2015_en_cop&& formik.errors.alivio_asociado_a_la_resolucion_creg_024_2015_en_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.alivio_asociado_a_la_resolucion_creg_024_2015_en_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="cobro_autogeneradores_res_024_2015" className="col-sm-7 col-form-label ">Cobro_Autogeneradores_Res_024_2015</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "cobro_autogeneradores_res_024_2015" placeholder= "Cobro_Autogeneradores_Res_024_2015 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.cobro_autogeneradores_res_024_2015}></input></div>
        </div>
        { formik.touched.cobro_autogeneradores_res_024_2015&& formik.errors.cobro_autogeneradores_res_024_2015? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.cobro_autogeneradores_res_024_2015}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_favor_para_generador_res_178_2015" className="col-sm-7 col-form-label ">Valor_A_Favor_Para_Generador_Res_178_2015</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_favor_para_generador_res_178_2015" placeholder= "Valor_A_Favor_Para_Generador_Res_178_2015 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_favor_para_generador_res_178_2015}></input></div>
        </div>
        { formik.touched.valor_a_favor_para_generador_res_178_2015&& formik.errors.valor_a_favor_para_generador_res_178_2015? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_favor_para_generador_res_178_2015}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_cargo_para_comercializador_res_178_2015" className="col-sm-7 col-form-label ">Valor_A_Cargo_Para_Comercializador_Res_178_2015</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_cargo_para_comercializador_res_178_2015" placeholder= "Valor_A_Cargo_Para_Comercializador_Res_178_2015 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_cargo_para_comercializador_res_178_2015}></input></div>
        </div>
        { formik.touched.valor_a_cargo_para_comercializador_res_178_2015&& formik.errors.valor_a_cargo_para_comercializador_res_178_2015? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_cargo_para_comercializador_res_178_2015}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_cargo_para_generador_res_195_2015" className="col-sm-7 col-form-label ">Valor_A_Cargo_Para_Generador_Res_195_2015</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_cargo_para_generador_res_195_2015" placeholder= "Valor_A_Cargo_Para_Generador_Res_195_2015 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_cargo_para_generador_res_195_2015}></input></div>
        </div>
        { formik.touched.valor_a_cargo_para_generador_res_195_2015&& formik.errors.valor_a_cargo_para_generador_res_195_2015? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_cargo_para_generador_res_195_2015}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_favor_para_generador_res_195_2015" className="col-sm-7 col-form-label ">Valor_A_Favor_Para_Generador_Res_195_2015</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_favor_para_generador_res_195_2015" placeholder= "Valor_A_Favor_Para_Generador_Res_195_2015 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_favor_para_generador_res_195_2015}></input></div>
        </div>
        { formik.touched.valor_a_favor_para_generador_res_195_2015&& formik.errors.valor_a_favor_para_generador_res_195_2015? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_favor_para_generador_res_195_2015}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_favor_para_comercializador_res_195_2015" className="col-sm-7 col-form-label ">Valor_A_Favor_Para_Comercializador_Res_195_2015</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_favor_para_comercializador_res_195_2015" placeholder= "Valor_A_Favor_Para_Comercializador_Res_195_2015 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_favor_para_comercializador_res_195_2015}></input></div>
        </div>
        { formik.touched.valor_a_favor_para_comercializador_res_195_2015&& formik.errors.valor_a_favor_para_comercializador_res_195_2015? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_favor_para_comercializador_res_195_2015}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_cargo_para_comercializador_res_195_2015" className="col-sm-7 col-form-label ">Valor_A_Cargo_Para_Comercializador_Res_195_2015</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_cargo_para_comercializador_res_195_2015" placeholder= "Valor_A_Cargo_Para_Comercializador_Res_195_2015 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_cargo_para_comercializador_res_195_2015}></input></div>
        </div>
        { formik.touched.valor_a_cargo_para_comercializador_res_195_2015&& formik.errors.valor_a_cargo_para_comercializador_res_195_2015? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_cargo_para_comercializador_res_195_2015}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_cargo_pagos_de_energia_excedentaria_cop" className="col-sm-7 col-form-label ">Valor_A_Cargo_Pagos_De_Energia_Excedentaria_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_cargo_pagos_de_energia_excedentaria_cop" placeholder= "Valor_A_Cargo_Pagos_De_Energia_Excedentaria_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_cargo_pagos_de_energia_excedentaria_cop}></input></div>
        </div>
        { formik.touched.valor_a_cargo_pagos_de_energia_excedentaria_cop&& formik.errors.valor_a_cargo_pagos_de_energia_excedentaria_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_cargo_pagos_de_energia_excedentaria_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_favor_por_energia_excedentaria_cop" className="col-sm-7 col-form-label ">Valor_A_Favor_Por_Energia_Excedentaria_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_favor_por_energia_excedentaria_cop" placeholder= "Valor_A_Favor_Por_Energia_Excedentaria_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_favor_por_energia_excedentaria_cop}></input></div>
        </div>
        { formik.touched.valor_a_favor_por_energia_excedentaria_cop&& formik.errors.valor_a_favor_por_energia_excedentaria_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_favor_por_energia_excedentaria_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="vc_rd_resolucion_011_de_2015" className="col-sm-7 col-form-label ">Vc_Rd_Resolucion_011_De_2015</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "vc_rd_resolucion_011_de_2015" placeholder= "Vc_Rd_Resolucion_011_De_2015 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.vc_rd_resolucion_011_de_2015}></input></div>
        </div>
        { formik.touched.vc_rd_resolucion_011_de_2015&& formik.errors.vc_rd_resolucion_011_de_2015? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.vc_rd_resolucion_011_de_2015}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="vf_rd_resolucion_011_de_2015" className="col-sm-7 col-form-label ">Vf_Rd_Resolucion_011_De_2015</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "vf_rd_resolucion_011_de_2015" placeholder= "Vf_Rd_Resolucion_011_De_2015 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.vf_rd_resolucion_011_de_2015}></input></div>
        </div>
        { formik.touched.vf_rd_resolucion_011_de_2015&& formik.errors.vf_rd_resolucion_011_de_2015? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.vf_rd_resolucion_011_de_2015}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_favor_delta_ajuste_rd" className="col-sm-7 col-form-label ">Valor_A_Favor_Delta_Ajuste_Rd</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_favor_delta_ajuste_rd" placeholder= "Valor_A_Favor_Delta_Ajuste_Rd "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_favor_delta_ajuste_rd}></input></div>
        </div>
        { formik.touched.valor_a_favor_delta_ajuste_rd&& formik.errors.valor_a_favor_delta_ajuste_rd? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_favor_delta_ajuste_rd}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_cargo_delta_ajuste_rd" className="col-sm-7 col-form-label ">Valor_A_Cargo_Delta_Ajuste_Rd</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_cargo_delta_ajuste_rd" placeholder= "Valor_A_Cargo_Delta_Ajuste_Rd "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_cargo_delta_ajuste_rd}></input></div>
        </div>
        { formik.touched.valor_a_cargo_delta_ajuste_rd&& formik.errors.valor_a_cargo_delta_ajuste_rd? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_cargo_delta_ajuste_rd}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_cargo_r026_2016_cop" className="col-sm-7 col-form-label ">Valor_A_Cargo_R026_2016_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_cargo_r026_2016_cop" placeholder= "Valor_A_Cargo_R026_2016_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_cargo_r026_2016_cop}></input></div>
        </div>
        { formik.touched.valor_a_cargo_r026_2016_cop&& formik.errors.valor_a_cargo_r026_2016_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_cargo_r026_2016_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_favor_r026_2016_cop" className="col-sm-7 col-form-label ">Valor_A_Favor_R026_2016_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_favor_r026_2016_cop" placeholder= "Valor_A_Favor_R026_2016_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_favor_r026_2016_cop}></input></div>
        </div>
        { formik.touched.valor_a_favor_r026_2016_cop&& formik.errors.valor_a_favor_r026_2016_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_favor_r026_2016_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_favor_r029_2016_cop" className="col-sm-7 col-form-label ">Valor_A_Favor_R029_2016_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_favor_r029_2016_cop" placeholder= "Valor_A_Favor_R029_2016_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_favor_r029_2016_cop}></input></div>
        </div>
        { formik.touched.valor_a_favor_r029_2016_cop&& formik.errors.valor_a_favor_r029_2016_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_favor_r029_2016_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="rf039_resolucion_039_de_2016" className="col-sm-7 col-form-label ">Rf039_Resolucion_039_De_2016</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "rf039_resolucion_039_de_2016" placeholder= "Rf039_Resolucion_039_De_2016 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rf039_resolucion_039_de_2016}></input></div>
        </div>
        { formik.touched.rf039_resolucion_039_de_2016&& formik.errors.rf039_resolucion_039_de_2016? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.rf039_resolucion_039_de_2016}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="rc039_resolucion_039_de_2016" className="col-sm-7 col-form-label ">Rc039_Resolucion_039_De_2016</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "rc039_resolucion_039_de_2016" placeholder= "Rc039_Resolucion_039_De_2016 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rc039_resolucion_039_de_2016}></input></div>
        </div>
        { formik.touched.rc039_resolucion_039_de_2016&& formik.errors.rc039_resolucion_039_de_2016? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.rc039_resolucion_039_de_2016}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="balance_final_029_de_2016" className="col-sm-7 col-form-label ">Balance_Final_029_De_2016</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "balance_final_029_de_2016" placeholder= "Balance_Final_029_De_2016 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.balance_final_029_de_2016}></input></div>
        </div>
        { formik.touched.balance_final_029_de_2016&& formik.errors.balance_final_029_de_2016? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.balance_final_029_de_2016}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_cargo_para_comercializador_res_062_2013" className="col-sm-7 col-form-label ">Valor_A_Cargo_Para_Comercializador_Res_062_2013</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_cargo_para_comercializador_res_062_2013" placeholder= "Valor_A_Cargo_Para_Comercializador_Res_062_2013 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_cargo_para_comercializador_res_062_2013}></input></div>
        </div>
        { formik.touched.valor_a_cargo_para_comercializador_res_062_2013&& formik.errors.valor_a_cargo_para_comercializador_res_062_2013? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_cargo_para_comercializador_res_062_2013}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_a_favor_para_generador_res_062_2013" className="col-sm-7 col-form-label ">Valor_A_Favor_Para_Generador_Res_062_2013</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_a_favor_para_generador_res_062_2013" placeholder= "Valor_A_Favor_Para_Generador_Res_062_2013 "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_a_favor_para_generador_res_062_2013}></input></div>
        </div>
        { formik.touched.valor_a_favor_para_generador_res_062_2013&& formik.errors.valor_a_favor_para_generador_res_062_2013? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_a_favor_para_generador_res_062_2013}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_del_de_tie_res_049_2018_kwh" className="col-sm-7 col-form-label ">Valor_Del_De_Tie_Res_049_2018_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_del_de_tie_res_049_2018_kwh" placeholder= "Valor_Del_De_Tie_Res_049_2018_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_del_de_tie_res_049_2018_kwh}></input></div>
        </div>
        { formik.touched.valor_del_de_tie_res_049_2018_kwh&& formik.errors.valor_del_de_tie_res_049_2018_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_del_de_tie_res_049_2018_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_del_de_tie_res_049_2018_cop" className="col-sm-7 col-form-label ">Valor_Del_De_Tie_Res_049_2018_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_del_de_tie_res_049_2018_cop" placeholder= "Valor_Del_De_Tie_Res_049_2018_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_del_de_tie_res_049_2018_cop}></input></div>
        </div>
        { formik.touched.valor_del_de_tie_res_049_2018_cop&& formik.errors.valor_del_de_tie_res_049_2018_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_del_de_tie_res_049_2018_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="magnitud_desviacion_despacho_res_060_2019_kwh" className="col-sm-7 col-form-label ">Magnitud_Desviacion_Despacho_Res_060_2019_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "magnitud_desviacion_despacho_res_060_2019_kwh" placeholder= "Magnitud_Desviacion_Despacho_Res_060_2019_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.magnitud_desviacion_despacho_res_060_2019_kwh}></input></div>
        </div>
        { formik.touched.magnitud_desviacion_despacho_res_060_2019_kwh&& formik.errors.magnitud_desviacion_despacho_res_060_2019_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.magnitud_desviacion_despacho_res_060_2019_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_desviacion_despacho_res_060_2019_cop" className="col-sm-7 col-form-label ">Valor_Desviacion_Despacho_Res_060_2019_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_desviacion_despacho_res_060_2019_cop" placeholder= "Valor_Desviacion_Despacho_Res_060_2019_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_desviacion_despacho_res_060_2019_cop}></input></div>
        </div>
        { formik.touched.valor_desviacion_despacho_res_060_2019_cop&& formik.errors.valor_desviacion_despacho_res_060_2019_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_desviacion_despacho_res_060_2019_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="magnitud_desviacion_redespacho_res_060_2019_kwh" className="col-sm-7 col-form-label ">Magnitud_Desviacion_Redespacho_Res_060_2019_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "magnitud_desviacion_redespacho_res_060_2019_kwh" placeholder= "Magnitud_Desviacion_Redespacho_Res_060_2019_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.magnitud_desviacion_redespacho_res_060_2019_kwh}></input></div>
        </div>
        { formik.touched.magnitud_desviacion_redespacho_res_060_2019_kwh&& formik.errors.magnitud_desviacion_redespacho_res_060_2019_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.magnitud_desviacion_redespacho_res_060_2019_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_desviacion_redespacho_res_060_2019_kwh" className="col-sm-7 col-form-label ">Valor_Desviacion_Redespacho_Res_060_2019_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_desviacion_redespacho_res_060_2019_kwh" placeholder= "Valor_Desviacion_Redespacho_Res_060_2019_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_desviacion_redespacho_res_060_2019_kwh}></input></div>
        </div>
        { formik.touched.valor_desviacion_redespacho_res_060_2019_kwh&& formik.errors.valor_desviacion_redespacho_res_060_2019_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_desviacion_redespacho_res_060_2019_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="desviacion_generacion_variable_res_060_2019_kwh" className="col-sm-7 col-form-label ">Desviacion_Generacion_Variable_Res_060_2019_Kwh</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "desviacion_generacion_variable_res_060_2019_kwh" placeholder= "Desviacion_Generacion_Variable_Res_060_2019_Kwh "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.desviacion_generacion_variable_res_060_2019_kwh}></input></div>
        </div>
        { formik.touched.desviacion_generacion_variable_res_060_2019_kwh&& formik.errors.desviacion_generacion_variable_res_060_2019_kwh? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.desviacion_generacion_variable_res_060_2019_kwh}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="alivio_desviaciones_res_creg_060_2019_cop" className="col-sm-7 col-form-label ">Alivio_Desviaciones_Res_Creg_060_2019_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "alivio_desviaciones_res_creg_060_2019_cop" placeholder= "Alivio_Desviaciones_Res_Creg_060_2019_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alivio_desviaciones_res_creg_060_2019_cop}></input></div>
        </div>
        { formik.touched.alivio_desviaciones_res_creg_060_2019_cop&& formik.errors.alivio_desviaciones_res_creg_060_2019_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.alivio_desviaciones_res_creg_060_2019_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_pago_ajuste_res_140_2017_cop" className="col-sm-7 col-form-label ">Valor_Pago_Ajuste_Res_140_2017_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_pago_ajuste_res_140_2017_cop" placeholder= "Valor_Pago_Ajuste_Res_140_2017_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_pago_ajuste_res_140_2017_cop}></input></div>
        </div>
        { formik.touched.valor_pago_ajuste_res_140_2017_cop&& formik.errors.valor_pago_ajuste_res_140_2017_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_pago_ajuste_res_140_2017_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_cobro_ajuste_res_140_2017_cop" className="col-sm-7 col-form-label ">Valor_Cobro_Ajuste_Res_140_2017_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_cobro_ajuste_res_140_2017_cop" placeholder= "Valor_Cobro_Ajuste_Res_140_2017_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_cobro_ajuste_res_140_2017_cop}></input></div>
        </div>
        { formik.touched.valor_cobro_ajuste_res_140_2017_cop&& formik.errors.valor_cobro_ajuste_res_140_2017_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_cobro_ajuste_res_140_2017_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_pago_excedente_res_140_2017_cop" className="col-sm-7 col-form-label ">Valor_Pago_Excedente_Res_140_2017_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_pago_excedente_res_140_2017_cop" placeholder= "Valor_Pago_Excedente_Res_140_2017_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_pago_excedente_res_140_2017_cop}></input></div>
        </div>
        { formik.touched.valor_pago_excedente_res_140_2017_cop&& formik.errors.valor_pago_excedente_res_140_2017_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_pago_excedente_res_140_2017_cop}</p>
        </div>
        ) : null  }<div className= "form-group row ">
        <label htmlFor="valor_cobro_faltante_res_140_2017_cop" className="col-sm-7 col-form-label ">Valor_Cobro_Faltante_Res_140_2017_Cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "valor_cobro_faltante_res_140_2017_cop" placeholder= "Valor_Cobro_Faltante_Res_140_2017_Cop "
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.valor_cobro_faltante_res_140_2017_cop}></input></div>
        </div>
        { formik.touched.valor_cobro_faltante_res_140_2017_cop&& formik.errors.valor_cobro_faltante_res_140_2017_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.valor_cobro_faltante_res_140_2017_cop}</p>
        </div>
        ) : null  }

        <div className= "form-group row ">
        <label htmlFor="compras_en_bolsa_ajustes_cop"className= "col-sm-7 col-form-label ">Compras_en_Bolsa_Ajustes_cop</label><div className="col-sm-5">
        <input type= "number" className= "form-control" id= "compras_en_bolsa_ajustes_cop" placeholder= "Compras_en_Bolsa_Ajustes_cop"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.compras_en_bolsa_ajustes_cop}></input></div>
        </div>
        { formik.touched.compras_en_bolsa_ajustes_cop&& formik.errors.compras_en_bolsa_ajustes_cop? (
        <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className= "font-bold ">Error</p>
        <p>{formik.errors.compras_en_bolsa_ajustes_cop}</p>
        </div>
        ) : null }
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
    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
    </Modal>
    </div>

    )
}

export default NuevoDataxmafac

