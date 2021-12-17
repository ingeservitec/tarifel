import Layout from './Layout';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link'
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoDataxmafac from './NuevoDataxmafac';
import NuevoDataxmafac2 from './NuevoDataxmafac2';


const OBTENER_DATA_XM_AFAC = gql`
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
  }
}
`;

const Dataxmafac  = () => {
  const { data, error, loading} = useQuery(OBTENER_DATA_XM_AFAC);
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
    { name: "Id", field: "id", sortable: true},{ name: "Año", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},{ name: "Agente", field: "agente", sortable: true},{ name: "Creador", field: "creador", sortable: true},{ name: "Perdida Real Kwh", field: "perdida_real_kwh", sortable: true},{ name: "Demanda Real Kwh", field: "demanda_real_kwh", sortable: true},{ name: "Generacion Real Kwh", field: "generacion_real_kwh", sortable: true},{ name: "Compras En Bolsa Kwh", field: "compras_en_bolsa_kwh", sortable: true},{ name: "Compras En Bolsa Cop", field: "compras_en_bolsa_cop", sortable: true},{ name: "Ventas En Bolsa Kwh", field: "ventas_en_bolsa_kwh", sortable: true},{ name: "Ventas En Bolsa Cop", field: "ventas_en_bolsa_cop", sortable: true},{ name: "Compras En Desviacion Kwh", field: "compras_en_desviacion_kwh", sortable: true},{ name: "Compras En Desviacion Cop", field: "compras_en_desviacion_cop", sortable: true},{ name: "Ventas En Desviacion Kwh", field: "ventas_en_desviacion_kwh", sortable: true},{ name: "Ventas En Desviacion Cop", field: "ventas_en_desviacion_cop", sortable: true},{ name: "Compras En Reconciliacion Kwh", field: "compras_en_reconciliacion_kwh", sortable: true},{ name: "Compras En Reconciliacion Cop", field: "compras_en_reconciliacion_cop", sortable: true},{ name: "Ventas En Reconciliacion Kwh", field: "ventas_en_reconciliacion_kwh", sortable: true},{ name: "Ventas En Reconciliacion Cop", field: "ventas_en_reconciliacion_cop", sortable: true},{ name: "Compras En Contratos Kwh", field: "compras_en_contratos_kwh", sortable: true},{ name: "Ventas En Contratos Kwh", field: "ventas_en_contratos_kwh", sortable: true},{ name: "Compras Energia En Bolsa Kwh", field: "compras_energia_en_bolsa_kwh", sortable: true},{ name: "Compras Energia En Bolsa Cop", field: "compras_energia_en_bolsa_cop", sortable: true},{ name: "Ventas Energia En Bolsa Kwh", field: "ventas_energia_en_bolsa_kwh", sortable: true},{ name: "Ventas Energia En Bolsa Cop", field: "ventas_energia_en_bolsa_cop", sortable: true},{ name: "Vr Cargo Por Confiabilidad Cop", field: "vr_cargo_por_confiabilidad_cop", sortable: true},{ name: "Vd Cargo Por Confiabilidad Cop", field: "vd_cargo_por_confiabilidad_cop", sortable: true},{ name: "Neto Cxc Cop", field: "neto_cxc_cop", sortable: true},{ name: "Compras Cargo Por Confiabilidad Cop", field: "compras_cargo_por_confiabilidad_cop", sortable: true},{ name: "Ventas Cargo Por Confiabilidad Cop", field: "ventas_cargo_por_confiabilidad_cop", sortable: true},{ name: "Compras En Bolsa Nacional Kwh", field: "compras_en_bolsa_nacional_kwh", sortable: true},{ name: "Compras En Bolsa Nacional Cop", field: "compras_en_bolsa_nacional_cop", sortable: true},{ name: "Ventas En Bolsa Nacional Kwh", field: "ventas_en_bolsa_nacional_kwh", sortable: true},{ name: "Ventas En Bolsa Nacional Cop", field: "ventas_en_bolsa_nacional_cop", sortable: true},{ name: "Compras En Bolsa Internacional Kwh", field: "compras_en_bolsa_internacional_kwh", sortable: true},{ name: "Compras En Bolsa Internacional Cop", field: "compras_en_bolsa_internacional_cop", sortable: true},{ name: "Ventas En Bolsa Internacional Kwh", field: "ventas_en_bolsa_internacional_kwh", sortable: true},{ name: "Ventas En Bolsa Internacional Cop", field: "ventas_en_bolsa_internacional_cop", sortable: true},{ name: "Servicios Agc Cop", field: "servicios_agc_cop", sortable: true},{ name: "Responsabilidad Comercial Agc Kwh", field: "responsabilidad_comercial_agc_kwh", sortable: true},{ name: "Responsabilidad Comercial Agc Cop", field: "responsabilidad_comercial_agc_cop", sortable: true},{ name: "Total Compras Cop", field: "total_compras_cop", sortable: true},{ name: "Total Ventas Cop", field: "total_ventas_cop", sortable: true},{ name: "Valor A Pagar Por Srpf Cop", field: "valor_a_pagar_por_srpf_cop", sortable: true},{ name: "Valor A Recibir Por Srpf Cop", field: "valor_a_recibir_por_srpf_cop", sortable: true},{ name: "Total Restricciones Cop", field: "total_restricciones_cop", sortable: true},{ name: "Rentas De Congestion Cop", field: "rentas_de_congestion_cop", sortable: true},{ name: "Restricciones Aliviadas Cop", field: "restricciones_aliviadas_cop", sortable: true},{ name: "Vebo Kwh", field: "vebo_kwh", sortable: true},{ name: "Rentas De Congestion Por Importacion Cop", field: "rentas_de_congestion_por_importacion_cop", sortable: true},{ name: "Distribucion Saldo Neto Tie En Merito Cop", field: "distribucion_saldo_neto_tie_en_merito_cop", sortable: true},{ name: "Distribucion Saldo Neto Tie Fuera De Merito Cop", field: "distribucion_saldo_neto_tie_fuera_de_merito_cop", sortable: true},{ name: "Compras Bolsa Con Saldo Neto Tie Merito Cop", field: "compras_bolsa_con_saldo_neto_tie_merito_cop", sortable: true},{ name: "Rendimientos Financieros Por Exportaciones Tie Cop", field: "rendimientos_financieros_por_exportaciones_tie_cop", sortable: true},{ name: "Alivio Por Cioef Cop", field: "alivio_por_cioef_cop", sortable: true},{ name: "Compras Ndc Cop", field: "compras_ndc_cop", sortable: true},{ name: "Ventas Desviaciones Oefh Cop", field: "ventas_desviaciones_oefh_cop", sortable: true},{ name: "Compras Desviaciones Oefh Cop", field: "compras_desviaciones_oefh_cop", sortable: true},{ name: "Devolucion Dineros Del Cargo Por Confiabilidad Cop", field: "devolucion_dineros_del_cargo_por_confiabilidad_cop", sortable: true},{ name: "Cobro Dinero Cargo Por Confiabilidad Cop", field: "cobro_dinero_cargo_por_confiabilidad_cop", sortable: true},{ name: "Compras Arranque Y Parada Cop", field: "compras_arranque_y_parada_cop", sortable: true},{ name: "Ventas Arranque Y Parada Cop", field: "ventas_arranque_y_parada_cop", sortable: true},{ name: "Ventas Por Eeve Cop", field: "ventas_por_eeve_cop", sortable: true},{ name: "Compras Por Eeve Cop", field: "compras_por_eeve_cop", sortable: true},{ name: "Restricciones Por Eeve Cop", field: "restricciones_por_eeve_cop", sortable: true},{ name: "Cobro Uso Respaldo Cop", field: "cobro_uso_respaldo_cop", sortable: true},{ name: "Alivio Restricciones Res 05 2010 Cop", field: "alivio_restricciones_res_05_2010_cop", sortable: true},{ name: "Compras En Bolsa Ties Cop", field: "compras_en_bolsa_ties_cop", sortable: true},{ name: "Ventas En Bolsa Ties Cop", field: "ventas_en_bolsa_ties_cop", sortable: true},{ name: "Magnitud En Kwh De Compras En Bolsa De Ties", field: "magnitud_en_kwh__de_compras_en_bolsa_de_ties", sortable: true},{ name: "Magnitud En Kwh De Ventas En Bolsa Ties", field: "magnitud_en_kwh_de_ventas_en_bolsa_ties", sortable: true},{ name: "Alivio Por Ejecucion De Garantia Cop", field: "alivio_por_ejecucion_de_garantia_cop", sortable: true},{ name: "Valor Total Ejecucion De Garantia Cop", field: "valor_total_ejecucion_de_garantia_cop", sortable: true},{ name: "Alivio Por Vcsrcfvd Cop", field: "alivio_por_vcsrcfvd_cop", sortable: true},{ name: "Voefv A Cargo Por La Oefv Adquirida En La Srcfv Cop", field: "voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop", sortable: true},{ name: "Vmoefv A Cargo Al Margen Del Precio Mp Srcfv Cop", field: "vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop", sortable: true},{ name: "Costo De Exportacion Cop", field: "costo_de_exportacion_cop", sortable: true},{ name: "Total Costo De Exportacion Cop", field: "total_costo_de_exportacion_cop", sortable: true},{ name: "Total De Generacion Ideal En Kwh Del Agente", field: "total_de_generacion_ideal_en_kwh_del_agente", sortable: true},{ name: "Total De Holgura De Agc En Kwh Asignados Al Agente", field: "total_de_holgura_de_agc_en_kwh_asignados_al_agente", sortable: true},{ name: "Energia Vendida Y Embalsada Asignada Kwh", field: "energia_vendida_y_embalsada_asignada_kwh", sortable: true},{ name: "Vr Demanda Res 155 2014", field: "vr_demanda_res_155_2014", sortable: true},{ name: "Alivio Asociado A La Resolucion Creg 024 2015 En Cop", field: "alivio_asociado_a_la_resolucion_creg_024_2015_en_cop", sortable: true},{ name: "Cobro Autogeneradores Res 024 2015", field: "cobro_autogeneradores_res_024_2015", sortable: true},{ name: "Valor A Favor Para Generador Res 178 2015", field: "valor_a_favor_para_generador_res_178_2015", sortable: true},{ name: "Valor A Cargo Para Comercializador Res 178 2015", field: "valor_a_cargo_para_comercializador_res_178_2015", sortable: true},{ name: "Valor A Cargo Para Generador Res 195 2015", field: "valor_a_cargo_para_generador_res_195_2015", sortable: true},{ name: "Valor A Favor Para Generador Res 195 2015", field: "valor_a_favor_para_generador_res_195_2015", sortable: true},{ name: "Valor A Favor Para Comercializador Res 195 2015", field: "valor_a_favor_para_comercializador_res_195_2015", sortable: true},{ name: "Valor A Cargo Para Comercializador Res 195 2015", field: "valor_a_cargo_para_comercializador_res_195_2015", sortable: true},{ name: "Valor A Cargo Pagos De Energia Excedentaria Cop", field: "valor_a_cargo_pagos_de_energia_excedentaria_cop", sortable: true},{ name: "Valor A Favor Por Energia Excedentaria Cop", field: "valor_a_favor_por_energia_excedentaria_cop", sortable: true},{ name: "Vc Rd Resolucion 011 De 2015", field: "vc_rd_resolucion_011_de_2015", sortable: true},{ name: "Vf Rd Resolucion 011 De 2015", field: "vf_rd_resolucion_011_de_2015", sortable: true},{ name: "Valor A Favor Delta Ajuste Rd", field: "valor_a_favor_delta_ajuste_rd", sortable: true},{ name: "Valor A Cargo Delta Ajuste Rd", field: "valor_a_cargo_delta_ajuste_rd", sortable: true},{ name: "Valor A Cargo R026 2016 Cop", field: "valor_a_cargo_r026_2016_cop", sortable: true},{ name: "Valor A Favor R026 2016 Cop", field: "valor_a_favor_r026_2016_cop", sortable: true},{ name: "Valor A Favor R029 2016 Cop", field: "valor_a_favor_r029_2016_cop", sortable: true},{ name: "Rf039 Resolucion 039 De 2016", field: "rf039_resolucion_039_de_2016", sortable: true},{ name: "Rc039 Resolucion 039 De 2016", field: "rc039_resolucion_039_de_2016", sortable: true},{ name: "Balance Final 029 De 2016", field: "balance_final_029_de_2016", sortable: true},
    { name: "Valor A Cargo Para Comercializador Res 062 2013", field: "valor_a_cargo_para_comercializador_res_062_2013", sortable: true},{ name: "Valor A Favor Para Generador Res 062 2013", field: "valor_a_favor_para_generador_res_062_2013", sortable: true},{ name: "Valor Del De Tie Res 049 2018 Kwh", field: "valor_del_de_tie_res_049_2018_kwh", sortable: true},{ name: "Valor Del De Tie Res 049 2018 Cop", field: "valor_del_de_tie_res_049_2018_cop", sortable: true},{ name: "Magnitud Desviacion Despacho Res 060 2019 Kwh", field: "magnitud_desviacion_despacho_res_060_2019_kwh", sortable: true},{ name: "Valor Desviacion Despacho Res 060 2019 Cop", field: "valor_desviacion_despacho_res_060_2019_cop", sortable: true},{ name: "Magnitud Desviacion Redespacho Res 060 2019 Kwh", field: "magnitud_desviacion_redespacho_res_060_2019_kwh", sortable: true},{ name: "Valor Desviacion Redespacho Res 060 2019 Kwh", field: "valor_desviacion_redespacho_res_060_2019_kwh", sortable: true},{ name: "Desviacion Generacion Variable Res 060 2019 Kwh", field: "desviacion_generacion_variable_res_060_2019_kwh", sortable: true},{ name: "Alivio Desviaciones Res Creg 060 2019 Cop", field: "alivio_desviaciones_res_creg_060_2019_cop", sortable: true},{ name: "Valor Pago Ajuste Res 140 2017 Cop", field: "valor_pago_ajuste_res_140_2017_cop", sortable: true},{ name: "Valor Cobro Ajuste Res 140 2017 Cop", field: "valor_cobro_ajuste_res_140_2017_cop", sortable: true},{ name: "Valor Pago Excedente Res 140 2017 Cop", field: "valor_pago_excedente_res_140_2017_cop", sortable: true},{ name: "Valor Cobro Faltante Res 140 2017 Cop", field: "valor_cobro_faltante_res_140_2017_cop", sortable: true},
  ];
   useEffect(() => {
                  if(loading) return 'Cargando....';
                  setComments(data.obtenerData_xm_afac);
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
    //    console.log(computedComments)
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



return (


<div className="container p-0">
<div className="card  col-sm ">
<div className="card-header h6">
<dt>INSUMOS XM AFAC</dt>
      </div>
      <div className="card-body shadow "> 
      <div className="card-body  shadow">
      <div className="overflow-x-scroll">
      <div className="row w-100">
      <div className="col mb-3 col-12 text-center">
      <div className="row"></div>
      <div className="col-md-6">
      <div className="text-left mr-0 mb-3">
      <button variant="primary" onClick={() => setShowLogin(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos</button>
      <NuevoDataxmafac show={showLogin} close={() => setShowLogin(false)} />
      <button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
      <NuevoDataxmafac2 show2={showLogin2} close2={() => setShowLogin2(false)} />
      </div>
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
<td>{comment.anho}</td>
<td>{comment.mes}</td>
<td>{comment.agente}</td>
<td>{comment.creador}</td>
<td>{comment.perdida_real_kwh}</td>
<td>{comment.demanda_real_kwh}</td>
<td>{comment.generacion_real_kwh}</td>
<td>{comment.compras_en_bolsa_kwh}</td>
<td>{comment.compras_en_bolsa_cop}</td>
<td>{comment.ventas_en_bolsa_kwh}</td>
<td>{comment.ventas_en_bolsa_cop}</td>
<td>{comment.compras_en_desviacion_kwh}</td>
<td>{comment.compras_en_desviacion_cop}</td>
<td>{comment.ventas_en_desviacion_kwh}</td>
<td>{comment.ventas_en_desviacion_cop}</td>
<td>{comment.compras_en_reconciliacion_kwh}</td>
<td>{comment.compras_en_reconciliacion_cop}</td>
<td>{comment.ventas_en_reconciliacion_kwh}</td>
<td>{comment.ventas_en_reconciliacion_cop}</td>
<td>{comment.compras_en_contratos_kwh}</td>
<td>{comment.ventas_en_contratos_kwh}</td>
<td>{comment.compras_energia_en_bolsa_kwh}</td>
<td>{comment.compras_energia_en_bolsa_cop}</td>
<td>{comment.ventas_energia_en_bolsa_kwh}</td>
<td>{comment.ventas_energia_en_bolsa_cop}</td>
<td>{comment.vr_cargo_por_confiabilidad_cop}</td>
<td>{comment.vd_cargo_por_confiabilidad_cop}</td>
<td>{comment.neto_cxc_cop}</td>
<td>{comment.compras_cargo_por_confiabilidad_cop}</td>
<td>{comment.ventas_cargo_por_confiabilidad_cop}</td>
<td>{comment.compras_en_bolsa_nacional_kwh}</td>
<td>{comment.compras_en_bolsa_nacional_cop}</td>
<td>{comment.ventas_en_bolsa_nacional_kwh}</td>
<td>{comment.ventas_en_bolsa_nacional_cop}</td>
<td>{comment.compras_en_bolsa_internacional_kwh}</td>
<td>{comment.compras_en_bolsa_internacional_cop}</td>
<td>{comment.ventas_en_bolsa_internacional_kwh}</td>
<td>{comment.ventas_en_bolsa_internacional_cop}</td>
<td>{comment.servicios_agc_cop}</td>
<td>{comment.responsabilidad_comercial_agc_kwh}</td>
<td>{comment.responsabilidad_comercial_agc_cop}</td>
<td>{comment.total_compras_cop}</td>
<td>{comment.total_ventas_cop}</td>
<td>{comment.valor_a_pagar_por_srpf_cop}</td>
<td>{comment.valor_a_recibir_por_srpf_cop}</td>
<td>{comment.total_restricciones_cop}</td>
<td>{comment.rentas_de_congestion_cop}</td>
<td>{comment.restricciones_aliviadas_cop}</td>
<td>{comment.vebo_kwh}</td>
<td>{comment.rentas_de_congestion_por_importacion_cop}</td>
<td>{comment.distribucion_saldo_neto_tie_en_merito_cop}</td>
<td>{comment.distribucion_saldo_neto_tie_fuera_de_merito_cop}</td>
<td>{comment.compras_bolsa_con_saldo_neto_tie_merito_cop}</td>
<td>{comment.rendimientos_financieros_por_exportaciones_tie_cop}</td>
<td>{comment.alivio_por_cioef_cop}</td>
<td>{comment.compras_ndc_cop}</td>
<td>{comment.ventas_desviaciones_oefh_cop}</td>
<td>{comment.compras_desviaciones_oefh_cop}</td>
<td>{comment.devolucion_dineros_del_cargo_por_confiabilidad_cop}</td>
<td>{comment.cobro_dinero_cargo_por_confiabilidad_cop}</td>
<td>{comment.compras_arranque_y_parada_cop}</td>
<td>{comment.ventas_arranque_y_parada_cop}</td>
<td>{comment.ventas_por_eeve_cop}</td>
<td>{comment.compras_por_eeve_cop}</td>
<td>{comment.restricciones_por_eeve_cop}</td>
<td>{comment.cobro_uso_respaldo_cop}</td>
<td>{comment.alivio_restricciones_res_05_2010_cop}</td>
<td>{comment.compras_en_bolsa_ties_cop}</td>
<td>{comment.ventas_en_bolsa_ties_cop}</td>
<td>{comment.magnitud_en_kwh__de_compras_en_bolsa_de_ties}</td>
<td>{comment.magnitud_en_kwh_de_ventas_en_bolsa_ties}</td>
<td>{comment.alivio_por_ejecucion_de_garantia_cop}</td>
<td>{comment.valor_total_ejecucion_de_garantia_cop}</td>
<td>{comment.alivio_por_vcsrcfvd_cop}</td>
<td>{comment.voefv_a_cargo_por_la_oefv_adquirida_en_la_srcfv_cop}</td>
<td>{comment.vmoefv_a_cargo_al_margen_del_precio_mp_srcfv_cop}</td>
<td>{comment.costo_de_exportacion_cop}</td>
<td>{comment.total_costo_de_exportacion_cop}</td>
<td>{comment.total_de_generacion_ideal_en_kwh_del_agente}</td>
<td>{comment.total_de_holgura_de_agc_en_kwh_asignados_al_agente}</td>
<td>{comment.energia_vendida_y_embalsada_asignada_kwh}</td>
<td>{comment.vr_demanda_res_155_2014}</td>
<td>{comment.alivio_asociado_a_la_resolucion_creg_024_2015_en_cop}</td>
<td>{comment.cobro_autogeneradores_res_024_2015}</td>
<td>{comment.valor_a_favor_para_generador_res_178_2015}</td>
<td>{comment.valor_a_cargo_para_comercializador_res_178_2015}</td>
<td>{comment.valor_a_cargo_para_generador_res_195_2015}</td>
<td>{comment.valor_a_favor_para_generador_res_195_2015}</td>
<td>{comment.valor_a_favor_para_comercializador_res_195_2015}</td>
<td>{comment.valor_a_cargo_para_comercializador_res_195_2015}</td>
<td>{comment.valor_a_cargo_pagos_de_energia_excedentaria_cop}</td>
<td>{comment.valor_a_favor_por_energia_excedentaria_cop}</td>
<td>{comment.vc_rd_resolucion_011_de_2015}</td>
<td>{comment.vf_rd_resolucion_011_de_2015}</td>
<td>{comment.valor_a_favor_delta_ajuste_rd}</td>
<td>{comment.valor_a_cargo_delta_ajuste_rd}</td>
<td>{comment.valor_a_cargo_r026_2016_cop}</td>
<td>{comment.valor_a_favor_r026_2016_cop}</td>
<td>{comment.valor_a_favor_r029_2016_cop}</td>
<td>{comment.rf039_resolucion_039_de_2016}</td>
<td>{comment.rc039_resolucion_039_de_2016}</td>
<td>{comment.balance_final_029_de_2016}</td>
<td>{comment.valor_a_cargo_para_comercializador_res_062_2013}</td>
<td>{comment.valor_a_favor_para_generador_res_062_2013}</td>
<td>{comment.valor_del_de_tie_res_049_2018_kwh}</td>
<td>{comment.valor_del_de_tie_res_049_2018_cop}</td>
<td>{comment.magnitud_desviacion_despacho_res_060_2019_kwh}</td>
<td>{comment.valor_desviacion_despacho_res_060_2019_cop}</td>
<td>{comment.magnitud_desviacion_redespacho_res_060_2019_kwh}</td>
<td>{comment.valor_desviacion_redespacho_res_060_2019_kwh}</td>
<td>{comment.desviacion_generacion_variable_res_060_2019_kwh}</td>
<td>{comment.alivio_desviaciones_res_creg_060_2019_cop}</td>
<td>{comment.valor_pago_ajuste_res_140_2017_cop}</td>
<td>{comment.valor_cobro_ajuste_res_140_2017_cop}</td>
<td>{comment.valor_pago_excedente_res_140_2017_cop}</td>
<td>{comment.valor_cobro_faltante_res_140_2017_cop}</td>
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
export default Dataxmafac;
