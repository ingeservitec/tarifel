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

const OBTENER_DATA_XM_AFAC = gql`
query obtenerData_xm_afac {
  obtenerData_xm_afac {

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

const NuevoDataxmafac2 =(props) => {
  const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
    const [datacsv, setDatacsv] = useState("");
    const [fileNames, setFileNames] = useState([]);
    const [creador, setCreador] = useState();
    const [empresa_id, setEmpresa_id]= useState("")
    const [anho, setAnho]= useState()
    const [compras_en_bolsa_ajustes_cop, setCompras_en_bolsa_ajustes_cop]= useState()
    const [mes, setMes]= useState()
    const [loading, setLoading]= useState(false)
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


    const onDrop = useCallback(acceptedFiles => {
      setFileNames(acceptedFiles.map(file => file.name));
     
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
      
        var lines=csv2
        
        var result = [];
      
        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step 
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        var headers=lines[0].toString().split(";");
        
        for(var i=1;i<lines.length;i++){
            var obj = {};
            var indexp=0;
            var currentline=lines[i].toString().split(";")
            for(var j=0;j<headers.length +3;j++){
              if (j ==0){
                obj['creador'] = (creador) 
              }
              if (j ==1){
                obj['empresa_id'] = (empresa_id) 
              }
              if (j ==2){
                obj['compras_en_bolsa_ajustes_cop'] = 0 
                for (let index = 0; index < headers.length; index++) {
                  if((currentline[index])===empresa_id){
                    obj['compras_en_bolsa_ajustes_cop'] = (compras_en_bolsa_ajustes_cop) 
                    console.log('ENTRO')
                  }
                  
                }
              }              
              if (j >2){
                if (obj[headers[j-3]] ='AGENTE')
                obj[headers[j-3]] = (currentline[j-3]);
                else{
                  obj[headers[j-3]] = parseFloat(currentline[j-3]);
               }    
             }

                    
            }
            result.push(obj);
        }
        //return result; //JavaScript object
        // parseFloat()
        return result; //JSON
      }
    //   useEffect(() => {   
    //     console.log(Datacsv2)
    // }, [datacsv])

        
      const handleSubmit = async () => { 
     
      try {
        setLoading(true)
        if (loading1) return null; // Si no hay informacion
        const Datacsv2=csvJSON(datacsv)  
        console.log(fileNames[0].substr(4,2))
        
        var arreglado = Datacsv2.map( item => { 
          return {empresa_id:(item["empresa_id"]),anho:parseFloat(anho),mes:parseFloat(mes),agente:(item["AGENTE"]),creador:parseFloat(item["creador"]),perdida_real_kwh:parseFloat(item["PERDIDA REAL (kWh)"]),demanda_real_kwh:parseFloat(item["DEMANDA REAL (kWh)"]),generacion_real_kwh:parseFloat(item["GENERACION REAL (kWh)"]),compras_en_bolsa_kwh:parseFloat(item["COMPRAS EN BOLSA (KWH)"]),compras_en_bolsa_cop:parseFloat(item["COMPRAS EN BOLSA ($)"]),ventas_en_bolsa_kwh:parseFloat(item["VENTAS EN BOLSA (KWH)"]),ventas_en_bolsa_cop:parseFloat(item["VENTAS EN BOLSA ($)"]),compras_en_desviacion_kwh:parseFloat(item["COMPRAS EN DESVIACION (KWH)"]),compras_en_desviacion_cop:parseFloat(item["COMPRAS EN DESVIACION ($)"]),ventas_en_desviacion_kwh:parseFloat(item["VENTAS EN DESVIACION (KWH)"]),ventas_en_desviacion_cop:parseFloat(item["VENTAS EN DESVIACION ($)"]),compras_en_reconciliacion_kwh:parseFloat(item["COMPRAS EN RECONCILIACION (KWH)"]),compras_en_reconciliacion_cop:parseFloat(item["COMPRAS EN RECONCILIACION ($)"]),ventas_en_reconciliacion_kwh:parseFloat(item["VENTAS EN RECONCILIACION (KWH)"]),ventas_en_reconciliacion_cop:parseFloat(item["VENTAS EN RECONCILIACION ($)"]),compras_en_contratos_kwh:parseFloat(item["COMPRAS EN CONTRATOS (kWh)"]),ventas_en_contratos_kwh:parseFloat(item["VENTAS EN CONTRATOS (kWh)"]),compras_energia_en_bolsa_kwh:parseFloat(item["COMPRAS ENERGIA EN BOLSA (KWH)"]),compras_energia_en_bolsa_cop:parseFloat(item["COMPRAS ENERGIA EN BOLSA ($)"]),ventas_energia_en_bolsa_kwh:parseFloat(item["VENTAS ENERGIA EN BOLSA (KWH)"]),ventas_energia_en_bolsa_cop:parseFloat(item["VENTAS ENERGIA EN BOLSA ($)"]),vr_cargo_por_confiabilidad_cop:parseFloat(item["VR CARGO POR CONFIABILIDAD ($)"]),vd_cargo_por_confiabilidad_cop:parseFloat(item["VD CARGO POR CONFIABILIDAD ($)"]),neto_cxc_cop:parseFloat(item["NETO CXC ($)"]),compras_cargo_por_confiabilidad_cop:parseFloat(item["COMPRAS CARGO POR CONFIABILIDAD ($)"]),ventas_cargo_por_confiabilidad_cop:parseFloat(item["VENTAS CARGO POR CONFIABILIDAD ($)"]),compras_en_bolsa_nacional_kwh:parseFloat(item["COMPRAS EN BOLSA NACIONAL (KWH)"]),compras_en_bolsa_nacional_cop:parseFloat(item["COMPRAS EN BOLSA NACIONAL ($)"]),ventas_en_bolsa_nacional_kwh:parseFloat(item["VENTAS EN BOLSA NACIONAL (KWH)"]),ventas_en_bolsa_nacional_cop:parseFloat(item["VENTAS EN BOLSA NACIONAL ($)"]),compras_en_bolsa_internacional_kwh:parseFloat(item["COMPRAS EN BOLSA INTERNACIONAL (KWH)"]),compras_en_bolsa_internacional_cop:parseFloat(item["COMPRAS EN BOLSA INTERNACIONAL ($)"]),ventas_en_bolsa_internacional_kwh:parseFloat(item["VENTAS EN BOLSA INTERNACIONAL (KWH)"]),ventas_en_bolsa_internacional_cop:parseFloat(item["VENTAS EN BOLSA INTERNACIONAL ($)"]),servicios_agc_cop:parseFloat(item["SERVICIOS AGC ($)"]),responsabilidad_comercial_agc_kwh:parseFloat(item["RESPONSABILIDAD COMERCIAL AGC (KWH)"]),responsabilidad_comercial_agc_cop:parseFloat(item["RESPONSABILIDAD COMERCIAL AGC ($)"]),total_compras_cop:parseFloat(item["TOTAL COMPRAS ($)"]),total_ventas_cop:parseFloat(item["TOTAL VENTAS ($)"]),valor_a_pagar_por_srpf_cop:parseFloat(item["VALOR A PAGAR POR SRPF ($)"]),valor_a_recibir_por_srpf_cop:parseFloat(item["VALOR A RECIBIR POR SRPF ($)"]),total_restricciones_cop:parseFloat(item["TOTAL RESTRICCIONES ($)"]),rentas_de_congestion_cop:parseFloat(item["RENTAS DE CONGESTION ($)"]),restricciones_aliviadas_cop:parseFloat(item["RESTRICCIONES ALIVIADAS ($)"]),vebo_kwh:parseFloat(item["VEBO (KWH)"]),rentas_de_congestion_por_importacion_cop:parseFloat(item["RENTAS DE CONGESTIÓN POR IMPORTACIÓN ($)"]),distribucion_saldo_neto_tie_en_merito_cop:parseFloat(item["DISTRIBUCIÓN SALDO NETO TIE EN MÉRITO ($)"]),distribucion_saldo_neto_tie_fuera_de_merito_cop:parseFloat(item["DISTRIBUCIÓN SALDO NETO TIE FUERA DE MÉRITO ($)"]),compras_bolsa_con_saldo_neto_tie_merito_cop:parseFloat(item["COMPRAS BOLSA CON SALDO NETO TIE MÉRITO ($)"]),rendimientos_financieros_por_exportaciones_tie_cop:parseFloat(item["RENDIMIENTOS FINANCIEROS POR EXPORTACIONES TIE($)"]),alivio_por_cioef_cop:parseFloat(item["ALIVIO POR CIOEF ($)"]),compras_ndc_cop:parseFloat(item["COMPRAS NDC ($)"]),ventas_desviaciones_oefh_cop:parseFloat(item["VENTAS DESVIACIONES OEFH ($)"]),compras_desviaciones_oefh_cop:parseFloat(item["COMPRAS DESVIACIONES OEFH ($)"]),devolucion_dineros_del_cargo_por_confiabilidad_cop:parseFloat(item["DEVOLUCION DINEROS DEL CARGO POR CONFIABILIDAD ($)"]),cobro_dinero_cargo_por_confiabilidad_cop:parseFloat(item["COBRO DINERO CARGO POR CONFIABILIDAD ($)"]),compras_arranque_y_parada_cop:parseFloat(item["COMPRAS ARRANQUE Y PARADA ($)"]),ventas_arranque_y_parada_cop:parseFloat(item["VENTAS ARRANQUE Y PARADA ($)"]),ventas_por_eeve_cop:parseFloat(item["Ventas por EEVE ($)"]),compras_por_eeve_cop:parseFloat(item["Compras por EEVE ($)"]),restricciones_por_eeve_cop:parseFloat(item["Restricciones por EEVE ($)"]),cobro_uso_respaldo_cop:parseFloat(item["Cobro uso respaldo($)"]),alivio_restricciones_res_05_2010_cop:parseFloat(item["Alivio restricciones RES 05/2010 ($)"]),compras_en_bolsa_ties_cop:parseFloat(item["COMPRAS EN BOLSA TIES($)"]),ventas_en_bolsa_ties_cop:parseFloat(item[" VENTAS EN BOLSA TIES ($)"]),magnitud_en_kwh__de_compras_en_bolsa_de_ties:parseFloat(item[" MAGNITUD EN Kwh  DE COMPRAS EN BOLSA DE TIES"]),magnitud_en_kwh_de_ventas_en_bolsa_ties:parseFloat(item[" MAGNITUD EN kwh DE VENTAS EN BOLSA TIES"]),alivio_por_ejecucion_de_garantia_cop:parseFloat(item["ALIVIO POR EJECUCION DE GARANTIA ($)"]),valor_total_ejecucion_de_garantia_cop:parseFloat(item["VALOR TOTAL EJECUCION DE GARANTIA ($)"]),alivio_por_vcsrcfvd_cop:parseFloat(item["Alivio por VCSRCFVD($)"]),voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop:parseFloat(item["VOEFV a cargo por la OEFV adquirida en la SRCFV($)"]),vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop:parseFloat(item["VMOEFV a cargo al Margen del Precio MP SRCFV ($):"]),costo_de_exportacion_cop:parseFloat(item["Costo de Exportación ($)"]),total_costo_de_exportacion_cop:parseFloat(item["Total Costo de Exportación ($)"]),total_de_generacion_ideal_en_kwh_del_agente:parseFloat(item["Total de Generación Ideal en kWh del Agente"]),total_de_holgura_de_agc_en_kwh_asignados_al_agente:parseFloat(item["Total de Holgura de AGC en kWh asignados al Agente"]),energia_vendida_y_embalsada_asignada_kwh:parseFloat(item["Energía vendida y embalsada Asignada kWh"]),vr_demanda_res_155_2014:parseFloat(item["VR Demanda Res 155/2014"]),alivio_asociado_a_la_resolucion_creg_024_2015_en_cop:parseFloat(item["Alivio Asociado a la Resolución CREG 024/2015 en $"]),cobro_autogeneradores_res_024_2015:parseFloat(item["Cobro Autogeneradores Res 024/2015"]),valor_a_favor_para_generador_res_178_2015:parseFloat(item["Valor a favor para generador. Res 178/2015"]),valor_a_cargo_para_comercializador_res_178_2015:parseFloat(item["Valor a cargo para comercializador. Res 178/2015"]),valor_a_cargo_para_generador_res_195_2015:parseFloat(item["Valor a cargo para generador. Res 195/2015"]),valor_a_favor_para_generador_res_195_2015:parseFloat(item["Valor a favor para generador. Res 195/2015"]),valor_a_favor_para_comercializador_res_195_2015:parseFloat(item["Valor a favor para comercializador. Res 195/2015"]),valor_a_cargo_para_comercializador_res_195_2015:parseFloat(item["Valor a cargo para comercializador. Res 195/2015"]),valor_a_cargo_pagos_de_energia_excedentaria_cop:parseFloat(item["VALOR A CARGO PAGOS DE ENERGIA EXCEDENTARIA ($)"]),valor_a_favor_por_energia_excedentaria_cop:parseFloat(item["VALOR A FAVOR POR ENERGIA EXCEDENTARIA ($)"]),vc_rd_resolucion_011_de_2015:parseFloat(item["VC_RD resolución 011 de 2015"]),vf_rd_resolucion_011_de_2015:parseFloat(item["VF_RD resolución 011 de 2015"]),valor_a_favor_delta_ajuste_rd:parseFloat(item["Valor a Favor delta ajuste RD"]),valor_a_cargo_delta_ajuste_rd:parseFloat(item["Valor a Cargo delta ajuste RD"]),valor_a_cargo_r026_2016_cop:parseFloat(item["VALOR A CARGO R026-2016 ($)."]),valor_a_favor_r026_2016_cop:parseFloat(item["VALOR A FAVOR R026-2016 ($)."]),valor_a_favor_r029_2016_cop:parseFloat(item["VALOR A FAVOR R029-2016 ($)."]),rf039_resolucion_039_de_2016:parseFloat(item["RF039 resolución 039 de 2016"]),rc039_resolucion_039_de_2016:parseFloat(item["RC039 resolución 039 de 2016"]),balance_final_029_de_2016:parseFloat(item["Balance Final 029 de 2016"]),valor_a_cargo_para_comercializador_res_062_2013:parseFloat(item["Valor a cargo para comercializador. RES. 062 2013"]),valor_a_favor_para_generador_res_062_2013:parseFloat(item["Valor a favor para generador. RES. 062 2013"]),valor_del_de_tie_res_049_2018_kwh:parseFloat(item["Valor del DE TIE. RES. 049 2018 (kWh)"]),valor_del_de_tie_res_049_2018_cop:parseFloat(item["Valor del DE TIE. RES. 049 2018 ($)"]),magnitud_desviacion_despacho_res_060_2019_kwh:parseFloat(item["Magnitud desviación despacho. RES. 060 2019 (kWh)"]),valor_desviacion_despacho_res_060_2019_cop:parseFloat(item["Valor Desviación Despacho. RES. 060 2019 ($)"]),magnitud_desviacion_redespacho_res_060_2019_kwh:parseFloat(item["Magnitud desviación Redespacho. RES. 060 2019(kWh)"]),valor_desviacion_redespacho_res_060_2019_kwh:parseFloat(item["Valor Desviación ReDespacho. RES. 060 2019 (kWh)"]),desviacion_generacion_variable_res_060_2019_kwh:parseFloat(item["Desviación Generación Variable. RES. 060 2019(kWh)"]),alivio_desviaciones_res_creg_060_2019_cop:parseFloat(item["Alivio desviaciones Res. CREG 060/2019 ($)"]),valor_pago_ajuste_res_140_2017_cop:parseFloat(item["VALOR PAGO AJUSTE RES. 140 2017 ($)"]),valor_cobro_ajuste_res_140_2017_cop:parseFloat(item["VALOR COBRO AJUSTE RES. 140 2017 ($)"]),valor_pago_excedente_res_140_2017_cop:parseFloat(item["VALOR PAGO EXCEDENTE RES. 140 2017 ($)"]),valor_cobro_faltante_res_140_2017_cop:parseFloat(item["VALOR COBRO FALTANTE RES. 140 2017 ($)"]),
          compras_en_bolsa_ajustes_cop:parseFloat(item["compras_en_bolsa_ajustes_cop"])}; 
        });
        console.log(arreglado)
        const arreglado2=arreglado.filter(arreglado => arreglado.agente===empresa_id)   
        console.log(arreglado2)
        const {results} = await Promise.all(arreglado2.map(object => {  
        return nuevoDataxmafac({ variables:{
          input:
            object
      }
    });
        }
        ));
        Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
    props.close2()
    setLoading(false)
        // results will be an array of execution result objects (i.e. { data, error })
       // Do whatever here with the results
      } catch (error) {
        console.log(error)
  
        // Handle any errors as appropriate
      }
    }
    useEffect(() => {
      if(loading1) return null;
      setCreador(parseInt(data1.obtenerUsuario.id));
      setEmpresa_id((data1.obtenerUsuario.empresa));      
      }, [loading1])

    return (
    <div>
    <Modal show={props.show2}
    
 
    aria-labelledby="contained-modal-title-vcenter"
    centered
   
    onHide={props.close2}>
    <Modal.Header closeButton>
    <Modal.Title>Cargue Masivo a tabla Data AFAC</Modal.Title>
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
    <input type="number" placeholder="Año" onChange={e => setAnho(e.target.value)} />
    <input type="number" placeholder="Mes" onChange={e => setMes(e.target.value)} />
    <input type="number" placeholder="compras_en_bolsa_ajustes_cop" onChange={e => setCompras_en_bolsa_ajustes_cop(e.target.value)} />
        </div>
        </div>

    <div className="container">
    <div className="row">
    <div className="col-sm">
    <button
    type="button"
    className=
    {loading? "bg-gray-400 w-full mt-5 p-2 text-white uppercase":"bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"} 

    value="Guardar"
    disabled={loading}
    onClick={handleSubmit}
    >
      {loading && <i className="fa fa-refresh fa-spin"></i>}
      {loading && <span>  Loading</span>}
      {!loading && <span>GUARDAR</span>}
    </button>
    </div>
    <div className="col-sm">
    <input
    type="button"
    className=
    {loading? "bg-gray-400 w-full mt-5 p-2 text-white uppercase":"bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"} 
    value="Cancelar"
    disabled={loading}
    onClick={props.close2}
    />
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

export default NuevoDataxmafac2

