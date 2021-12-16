
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import Rescomponentescutarifas from './Rescomponentescutarifa'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NuevoCalculo_CU from './NuevoCalculo_CU';

const OBTENER_DATA_EMPRESAS = gql`
query obtenerData_empresa {
  obtenerData_empresa{
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
    costo_garantias_mem_cop
    costo_garantias_str_sdl_cop
    pui_cop_kwh
    vsne_kwh
    vnu_kwh
    vae_kwh
  }
}
`;

const NUEVO_DATA_RES_COMPONENTES_CU_TARIFA= gql`
mutation nuevoData_res_componentes_cu_tarifa($input:Data_res_componentes_cu_tarifaInput ){
nuevoData_res_componentes_cu_tarifa(input:$input){
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
nt1_50_100_estrato_1_men_cs
nt1_50_100_estrato_2_men_cs
nt1_50_100_estrato_3_men_cs
nt1_50_100_estrato_4_men_cs
nt1_50_100_estrato_5_men_cs
nt1_50_100_estrato_6_men_cs
nt1_50_100_estrato_4
nt1_50_100_estrato_5
nt1_50_100_estrato_6
nt1_50_100_c
nt1_50_100_i_con_c
nt1_50_100_i_sin_c
nt1_50_100_p
nt1_50_100_o
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
nt1_50_100_estrato_1_men_cs
nt1_50_100_estrato_2_men_cs
nt1_50_100_estrato_3_men_cs
nt1_50_100_estrato_4_men_cs
nt1_50_100_estrato_5_men_cs
nt1_50_100_estrato_6_men_cs
nt1_50_100_estrato_4
nt1_50_100_estrato_5
nt1_50_100_estrato_6
nt1_50_100_c
nt1_50_100_i_con_c
nt1_50_100_i_sin_c
nt1_50_100_p
nt1_50_100_o
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

const Index  = () => {
  const { data:data0, error:error0, loading:loading0} = useQuery(OBTENER_RES_COMPONENTES_CU_TARIFA);
  const [startDate, setStartDate] = useState(new Date());
  const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_DATA_EMPRESAS);
  const [data_empresasfs,setData_empresasfs] = useState([]);
  const { data:data2, error:error2, loading:loading2} = useQuery(OBTENER_DATA_XM_AFAC);
  const [data_xm_afacfs,setData_xm_afacfs] = useState([]);
  const { data:data3, error:error3, loading:loading3} = useQuery(OBTENER_DATA_XM_ADEM);
  const [data_xm_ademfs,setData_xm_ademfs] = useState([]);
  const [dataCU, setcomponenteDatosCU] = useState([]);
  const [SiexisteCU, setSiexisteCU] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
   var mes = startDate.getMonth()+1;
  var anho = startDate.getFullYear();
  useEffect(() => {
  if(loading0) return null;
  console.log(data0)
  const data_res_cu_tarifas=data0.obtenerRes_componentes_cu_tarifa
  const data_res_cu_tarifasm=data_res_cu_tarifas.filter(data_res_cu_tarifas => data_res_cu_tarifas.anho===anho && data_res_cu_tarifas.mes===(mes))
  if (data_res_cu_tarifasm.length>0) {
    setcomponenteDatosCU([
      { name: 'G', Periodo: data_res_cu_tarifasm[0].gc, Avg: 232.7890957},
      { name: 'T', Periodo: data_res_cu_tarifasm[0].tx, Avg: 36.32},
      { name: 'D', Periodo: data_res_cu_tarifasm[0].dtun_nt1_e , Avg:  195.85},
      { name: 'R', Periodo: data_res_cu_tarifasm[0].r, Avg: 27.35042279},
      { name: 'PR', Periodo:data_res_cu_tarifasm[0].gc,Avg: 11.62256869},
      { name: 'C', Periodo: data_res_cu_tarifasm[0].cv,Avg:   73.19},
      { name: 'CU',Periodo: data_res_cu_tarifasm[0].cu_nt1_100, Avg:   610.2621},
    ])
    setSiexisteCU(1)
  }
  else{
  console.log('NO hay datos')
  setSiexisteCU(0)
  }
  },[startDate,showLogin]);
  // useEffect(() => {
  //   if(loading1) return 'Cargando....';
  //   setData_res_componentes(data1.obtenerData_empresa);
  // },[data1]);
  useEffect(() => {
    if(loading2) return 'Cargando....';
    setData_xm_afacfs(data2.obtenerData_xm_afac);
  },[data2]);
  useEffect(() => {
    if(loading3) return 'Cargando....';
    setData_xm_ademfs(data3.data_xm_ademfs);
  },[data3]);
  useEffect(() => {
  console.log('Cambio')
  },[startDate]);


//Falta filtra por la empresa
const data_empresasfsm = data_empresasfs.filter(data_empresasfs => data_empresasfs.anho===anho && data_empresasfs.mes===(mes));
const data_xm_afacfsm = data_xm_afacfs.filter(data_xm_afacf => data_xm_afacf.anho===anho && data_xm_afacf.mes===(mes));
//const data_xm_ademfs_dr_m = data_xm_ademfs.filter(data_xm_ademf => data_xm_ademf.anho===anho && data_xm_ademf.mes===(mes) && data_xm_ademf.mes==="Demanda regulada, en kWh.");
//const data_xm_ademfs_pdr_m = data_xm_ademfs.filter(data_xm_ademf => data_xm_ademf.anho===anho && data_xm_ademf.mes===(mes) && data_xm_ademf.mes==="Pérdida asociada a la demanda regulada, en kWh.");
//const data_xm_ademfs_dnr_m = data_xm_ademfs.filter(data_xm_ademf => data_xm_ademf.anho===anho && data_xm_ademf.mes===(mes) && data_xm_ademf.mes==="Demanda no regulada, en kWh.");
//const data_xm_ademfs_pdnr_m = data_xm_ademfs.filter(data_xm_ademf => data_xm_ademf.anho===anho && data_xm_ademf.mes===(mes) && data_xm_ademf.mes==="Pérdida asociada a la demanda no regulada, en kWh.");

let numeros = [1, 2, 3, 4, 5];
let total = numeros.reduce((a, b) => a + b, 0);
      const dataTarifas = [
        {name: 'E1', Periodo: 263.463, Avg: 260.849,amt: 2400,},
        {name: 'E2', Periodo: 329.329, Avg: 326.061, amt: 2210,},
        {name: 'E3', Periodo:  533.995, Avg:  518.723, amt: 2290,},
        {name: 'E4', Periodo: 628.229, Avg: 610.262, amt: 2290,},
        {name: 'E5', Ago_2021: 753.875, Avg: 732.315, amt: 2000,},
        {name: 'E6', Ago_2021:   753.875, Avg:   732.315, amt: 2181,},
        {name: 'C',Ago_2021:   732.315,Avg:   732.315,amt: 2500,},
        {name: 'I', Ago_2021:   628.229, Avg:   610.262, amt: 2500,},
        {name: 'O', Ago_2021:   628.229, Avg:   610.2621, amt: 2500,},
        {name: 'AP', Ago_2021:   628.229, Avg:   610.2621, amt: 2500,}
      ];

return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"></h5>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"></h5>
            <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
         
      </div>
      </div>


{SiexisteCU>0 &&
    <div className="row">
  <div className="col-sm-6">
    
    <div className="card">
    
      <div className="card-body">
        <h5 className="card-title">Costo Unitario</h5>
        <p className="card-text"></p>
        <a href="#" className="btn btn-primary">Exportar</a>
        
        <BarChart
          width={500}
          height={300}
          data={dataCU}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Avg" fill="#8884d8" />
          <Bar dataKey="Periodo" fill="#82ca9d" />
        </BarChart>
    
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Tarifas</h5>
        <p className="card-text"></p>
        <a href="#" className="btn btn-primary">Exportar</a>
        <BarChart
          width={500}
          height={300}
          data={dataTarifas}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Avg" fill="#8884d8" background={{ fill: '#eee' }} />
          <Bar dataKey="Ago_2021" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  </div>
  
</div>
}

{SiexisteCU===0 &&

<div className="card">
<div className="card-body">
  <h5 className="card-title">Costo Unitario y Tarifas</h5>
  <p className="card-text"></p>
<div className="text-left mr-0 mb-3">
<button variant="primary" onClick={() => setShowLogin(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Calculo de CU y Tarifas</button>
{showLogin ? <NuevoCalculo_CU show={showLogin}  anho={anho} mes={mes} dataCargada={0} close={() => setShowLogin(false)} />:  null}
</div>
<h6>No existen resultados para este periodo, haga click aca para realizar el cálculo</h6>
</div>
</div>
}

</div>
</div>

);
}
export default Index;





