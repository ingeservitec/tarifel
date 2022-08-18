import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoData_xm_d015 from './NuevoData_xm_d015';
import NuevoData_xm_d0152 from './NuevoData_xm_d0152';


const OBTENER_DATA_XM_D015= gql`
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

const Data_xm_d015= () => {
const { data, error, loading} = useQuery(OBTENER_DATA_XM_D015);
const {  data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
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
{ name: "Id", field: "id", sortable: true},{ name: "creador", field: "creador", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true},{ name: "Anho", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},{ name: "Cargo_Por_Uso_Dt1_Cop_Kwh", field: "cargo_por_uso_dt1_cop_kwh", sortable: true},{ name: "Cargo_Por_Uso_Dt2_Cop_Kwh", field: "cargo_por_uso_dt2_cop_kwh", sortable: true},{ name: "Cargo_Por_Uso_Dt3_Cop_Kwh", field: "cargo_por_uso_dt3_cop_kwh", sortable: true},{ name: "Cargo_De_Inversion_Cdi1_Cop_Kwh", field: "cargo_de_inversion_cdi1_cop_kwh", sortable: true},{ name: "Cargo_Por_Aom_Cda1_Cop_Kwh", field: "cargo_por_aom_cda1_cop_kwh", sortable: true},{ name: "Cargo_Nivel_De_Tension_Cd2_Cop_Kwh", field: "cargo_nivel_de_tension_cd2_cop_kwh", sortable: true},{ name: "Cargo_Nivel_De_Tension_Cd3_Cop_Kwh", field: "cargo_nivel_de_tension_cd3_cop_kwh", sortable: true},{ name: "Cargo_Nivel_De_Tension_Cd3_2_Cop_Kwh", field: "cargo_nivel_de_tension_cd3_2_cop_kwh", sortable: true},{ name: "Cargo_Nivel_De_Tension_Cd4_Cop_Kwh", field: "cargo_nivel_de_tension_cd4_cop_kwh", sortable: true},{ name: "Cargo_Por_Incentivos_Dtcs_Cop_Kwh", field: "cargo_por_incentivos_dtcs_cop_kwh", sortable: true},{ name: "Fraccion_Dtcs_Cop_Kwh", field: "fraccion_dtcs_cop_kwh", sortable: true},{ name: "Ia1", field: "ia1", sortable: true},{ name: "Ia2", field: "ia2", sortable: true},{ name: "Ia3", field: "ia3", sortable: true},{ name: "Iaa1_Cop", field: "iaa1_cop", sortable: true},{ name: "Iaa2_Cop", field: "iaa2_cop", sortable: true},{ name: "Iaa3_Cop", field: "iaa3_cop", sortable: true},{ name: "Irm1_Cop", field: "irm1_cop", sortable: true},{ name: "Irm2_Cop", field: "irm2_cop", sortable: true},{ name: "Irm3_Cop", field: "irm3_cop", sortable: true},{ name: "Fm", field: "fm", sortable: true},{ name: "Iaaom1_Cop", field: "iaaom1_cop", sortable: true},{ name: "Iaaom2_Cop", field: "iaaom2_cop", sortable: true},{ name: "Iaaom3_Cop", field: "iaaom3_cop", sortable: true},{ name: "Aomni1_Cop", field: "aomni1_cop", sortable: true},{ name: "Aomni2_Cop", field: "aomni2_cop", sortable: true},{ name: "Aomni3_Cop", field: "aomni3_cop", sortable: true},{ name: "Ima_N1", field: "ima_n1", sortable: true},{ name: "Ima_N2", field: "ima_n2", sortable: true},{ name: "Ima_N3", field: "ima_n3", sortable: true},{ name: "Imn_N1", field: "imn_n1", sortable: true},{ name: "Imn_N2", field: "imn_n2", sortable: true},{ name: "Imn_N3", field: "imn_n3", sortable: true},{ name: "Aim_N1", field: "aim_n1", sortable: true},{ name: "Aim_N2", field: "aim_n2", sortable: true},{ name: "Aim_N3", field: "aim_n3", sortable: true},{ name: "Naim_N1", field: "naim_n1", sortable: true},{ name: "Naim_N2", field: "naim_n2", sortable: true},{ name: "Naim_N3", field: "naim_n3", sortable: true},{ name: "Fraccion_Aim_N1_Inversion", field: "fraccion_aim_n1_inversion", sortable: true},{ name: "Fraccion_Aim_N1_Aom", field: "fraccion_aim_n1_aom", sortable: true},{ name: "Bra1_Cop", field: "bra1_cop", sortable: true},{ name: "Bra2_Cop", field: "bra2_cop", sortable: true},{ name: "Bra3_Cop", field: "bra3_cop", sortable: true},{ name: "Brae1_Cop", field: "brae1_cop", sortable: true},{ name: "Brae2_Cop", field: "brae2_cop", sortable: true},{ name: "Brae3_Cop", field: "brae3_cop", sortable: true},{ name: "Braen1_Cop", field: "braen1_cop", sortable: true},{ name: "Braen2_Cop", field: "braen2_cop", sortable: true},{ name: "Braen3_Cop", field: "braen3_cop", sortable: true},{ name: "Rc1_Cop", field: "rc1_cop", sortable: true},{ name: "Rc2_Cop", field: "rc2_cop", sortable: true},{ name: "Rc3_Cop", field: "rc3_cop", sortable: true},{ name: "Cdi_Aj_1_Cop2007_Kwh", field: "cdi_aj_1_cop2007_kwh", sortable: true},{ name: "Cd_Aj_2_Cop2007_Kwh", field: "cd_aj_2_cop2007_kwh", sortable: true},{ name: "Cd_Aj_3_Cop2007_Kwh", field: "cd_aj_3_cop2007_kwh", sortable: true},{ name: "Cdm_Aj_1_Cop2007_Kwh", field: "cdm_aj_1_cop2007_kwh", sortable: true},{ name: "Iapa1", field: "iapa1", sortable: true},{ name: "Iapa2", field: "iapa2", sortable: true},{ name: "Iapa3", field: "iapa3", sortable: true},{ name: "Iapa1_Tant", field: "iapa1_tant", sortable: true},{ name: "Iapa2_Tant", field: "iapa2_tant", sortable: true},{ name: "Iapa3_Tant", field: "iapa3_tant", sortable: true},{ name: "Oi1_Cop", field: "oi1_cop", sortable: true},{ name: "Oj2_Cop", field: "oj2_cop", sortable: true},{ name: "Oj3_Cop", field: "oj3_cop", sortable: true},{ name: "Irespaldo1_Cop", field: "irespaldo1_cop", sortable: true},{ name: "Irespaldo2_Cop", field: "irespaldo2_cop", sortable: true},{ name: "Irespaldo3_Cop", field: "irespaldo3_cop", sortable: true},{ name: "Imunts1_Cop", field: "imunts1_cop", sortable: true},{ name: "Imunts2_Cop", field: "imunts2_cop", sortable: true},{ name: "Imunts3_Cop", field: "imunts3_cop", sortable: true},{ name: "Ireactiva1_Cop", field: "ireactiva1_cop", sortable: true},{ name: "Ireactiva2_Cop", field: "ireactiva2_cop", sortable: true},{ name: "Ireactiva3_Cop", field: "ireactiva3_cop", sortable: true},{ name: "Aombase1", field: "aombase1", sortable: true},{ name: "Aombase2", field: "aombase2", sortable: true},{ name: "Aombase3", field: "aombase3", sortable: true},{ name: "Brae1_Tant_Cop", field: "brae1_tant_cop", sortable: true},{ name: "Brae2_Tant_Cop", field: "brae2_tant_cop", sortable: true},{ name: "Brae3_Tant_Cop", field: "brae3_tant_cop", sortable: true},{ name: "Deltabraenj_1_Cop", field: "deltabraenj_1_cop", sortable: true},{ name: "Deltabraenj_2_Cop", field: "deltabraenj_2_cop", sortable: true},{ name: "Deltabraenj_3_Cop", field: "deltabraenj_3_cop", sortable: true},{ name: "Deltaingj_1_Cop", field: "deltaingj_1_cop", sortable: true},{ name: "Deltaingj_2_Cop", field: "deltaingj_2_cop", sortable: true},{ name: "Deltaingj_3_Cop", field: "deltaingj_3_cop", sortable: true},{ name: "Brt1_Cop", field: "brt1_cop", sortable: true},{ name: "Brt2_Cop", field: "brt2_cop", sortable: true},{ name: "Brt3_Cop", field: "brt3_cop", sortable: true},{ name: "Rcbia1_Cop", field: "rcbia1_cop", sortable: true},{ name: "Rcbia2_Cop", field: "rcbia2_cop", sortable: true},{ name: "Rcbia3_Cop", field: "rcbia3_cop", sortable: true},{ name: "Rcna1_Cop", field: "rcna1_cop", sortable: true},{ name: "Rcna2_Cop", field: "rcna2_cop", sortable: true},{ name: "Rcna3_Cop", field: "rcna3_cop", sortable: true},{ name: "Rcnafo1_Cop", field: "rcnafo1_cop", sortable: true},{ name: "Rcnafo2_Cop", field: "rcnafo2_cop", sortable: true},{ name: "Rcnafo3_Cop", field: "rcnafo3_cop", sortable: true},{ name: "Inve1_Cop", field: "inve1_cop", sortable: true},{ name: "Inve2_Cop", field: "inve2_cop", sortable: true},{ name: "Inve3_Cop", field: "inve3_cop", sortable: true},{ name: "Inva1_Cop", field: "inva1_cop", sortable: true},{ name: "Inva2_Cop", field: "inva2_cop", sortable: true},{ name: "Inva3_Cop", field: "inva3_cop", sortable: true},{ name: "Inva1_Tant_Cop", field: "inva1_tant_cop", sortable: true},{ name: "Inva2_Tant_Cop", field: "inva2_tant_cop", sortable: true},{ name: "Inva3_Tant_Cop", field: "inva3_tant_cop", sortable: true},{ name: "Invr1_Máximo_Tant_Cop", field: "invr1_maximo_tant_cop", sortable: true},{ name: "Invr2_Máximo_Tant_Cop", field: "invr2_maximo_tant_cop", sortable: true},{ name: "Invr3_Máximo_Tant_Cop", field: "invr3_maximo_tant_cop", sortable: true},{ name: "Invr1_Delta_Cop", field: "invr1_delta_cop", sortable: true},{ name: "Invr2_Delta_Cop", field: "invr2_delta_cop", sortable: true},{ name: "Invr3_Delta_Cop", field: "invr3_delta_cop", sortable: true},{ name: "Invr1_Tant_Cop", field: "invr1_tant_cop", sortable: true},{ name: "Invr2_Tant_Cop", field: "invr2_tant_cop", sortable: true},{ name: "Invr3_Tant_Cop", field: "invr3_tant_cop", sortable: true},{ name: "Pr1", field: "pr1", sortable: true},{ name: "Pr2", field: "pr2", sortable: true},{ name: "Pr3", field: "pr3", sortable: true},{ name: "Pj_1", field: "pj_1", sortable: true},{ name: "Pj_2", field: "pj_2", sortable: true},{ name: "Pj_3", field: "pj_3", sortable: true},{ name: "Pj_1_Creg097", field: "pj_1_creg097", sortable: true},{ name: "Pj_2_Creg097", field: "pj_2_creg097", sortable: true},{ name: "Pj_3_Creg097", field: "pj_3_creg097", sortable: true},{ name: "Acumulado_Eej1_Kwh", field: "acumulado_eej1_kwh", sortable: true},{ name: "Acumulado_Eej2_Kwh", field: "acumulado_eej2_kwh", sortable: true},{ name: "Acumulado_Eej3_Kwh", field: "acumulado_eej3_kwh", sortable: true},{ name: "Acumulado_Fej3_2_Kwh", field: "acumulado_fej3_2_kwh", sortable: true},{ name: "Euj_2_Creg097_Kwh", field: "euj_2_creg097_kwh", sortable: true},{ name: "Fej3_2_Creg097_Kwh", field: "fej3_2_creg097_kwh", sortable: true},{ name: "Ic_Saidi_Cop", field: "ic_saidi_cop", sortable: true},{ name: "Ic_Saifi_Cop", field: "ic_saifi_cop", sortable: true},{ name: "Conp_Cop", field: "conp_cop", sortable: true},{ name: "Vcdij_Tant_Kwh", field: "vcdij_tant_kwh", sortable: true},{ name: "Vcinj_Tant_Kwh", field: "vcinj_tant_kwh", sortable: true},{ name: "Vacpiec1", field: "vacpiec1", sortable: true},{ name: "Vacpiec2", field: "vacpiec2", sortable: true},{ name: "Vacpiec3", field: "vacpiec3", sortable: true},{ name: "Vacni1", field: "vacni1", sortable: true},{ name: "Vacni2", field: "vacni2", sortable: true},{ name: "Vacni3", field: "vacni3", sortable: true},{ name: "R_Tasa_Retorno_Actividad_Distribucion", field: "r_tasa_retorno_actividad_distribucion", sortable: true},{ name: "Famb", field: "famb", sortable: true},{ name: "Css1_Cop", field: "css1_cop", sortable: true},{ name: "Css2_Cop", field: "css2_cop", sortable: true},{ name: "Css3_Cop", field: "css3_cop", sortable: true},{ name: "Dismining1_Cop", field: "dismining1_cop", sortable: true},{ name: "Dismining2_Cop", field: "dismining2_cop", sortable: true},{ name: "Dismining3_Cop", field: "dismining3_cop", sortable: true}
];

useEffect(() => {
    if(loading) return 'Cargando....';
   
    const data_xm_d015=data.obtenerData_xm_d015
    var data_xm_d015m=data_xm_d015.filter(data_xm_d015 => data_xm_d015.empresa_id===data1.obtenerUsuario.empresa )

    data_xm_d015m=data_xm_d015m.sort(
      function(a, b) {
      if (a.anho === b.anho) {
      return b.mes > a.mes ? 1 : -1;                  
      }
      return b.anho > a.anho ? 1 : -1;
      });
    setComments(data_xm_d015m);
  },[loading,showLogin,showLogin2]); 


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



return (


<div className="container p-0">
<div className="card col-sm ">
<div className="card-header h6">
<dt>INSUMOS DATA XM Dx 015</dt>
</div>
<div className="card-body shadow ">
<div className="card-body shadow">
<div className="overflow-x-scroll">
<div className="row w-100">
<div className="col mb-3 col-12 text-center">
<div className="row"></div>
<div className="col-md-6">
<div className="text-left mr-0 mb-3">
<button variant="primary" onClick={() => setShowLogin(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos</button>
<NuevoData_xm_d015 show={showLogin} close={() => setShowLogin(false)} />
<button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
<NuevoData_xm_d0152 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.creador}</td>
<td>{comment.empresa_id}</td>
<td>{comment.anho}</td>
<td>{comment.mes}</td>
<td>{comment.cargo_por_uso_dt1_cop_kwh}</td>
<td>{comment.cargo_por_uso_dt2_cop_kwh}</td>
<td>{comment.cargo_por_uso_dt3_cop_kwh}</td>
<td>{comment.cargo_de_inversion_cdi1_cop_kwh}</td>
<td>{comment.cargo_por_aom_cda1_cop_kwh}</td>
<td>{comment.cargo_nivel_de_tension_cd2_cop_kwh}</td>
<td>{comment.cargo_nivel_de_tension_cd3_cop_kwh}</td>
<td>{comment.cargo_nivel_de_tension_cd4_cop_kwh}</td>
<td>{comment.cargo_por_incentivos_dtcs_cop_kwh}</td>
<td>{comment.fraccion_dtcs_cop_kwh}</td>
<td>{comment.ia1}</td>
<td>{comment.ia2}</td>
<td>{comment.ia3}</td>
<td>{comment.iaa1_cop}</td>
<td>{comment.iaa2_cop}</td>
<td>{comment.iaa3_cop}</td>
<td>{comment.irm1_cop}</td>
<td>{comment.irm2_cop}</td>
<td>{comment.irm3_cop}</td>
<td>{comment.fm}</td>
<td>{comment.iaaom1_cop}</td>
<td>{comment.iaaom2_cop}</td>
<td>{comment.iaaom3_cop}</td>
<td>{comment.aomni1_cop}</td>
<td>{comment.aomni2_cop}</td>
<td>{comment.aomni3_cop}</td>
<td>{comment.ima_n1}</td>
<td>{comment.ima_n2}</td>
<td>{comment.ima_n3}</td>
<td>{comment.imn_n1}</td>
<td>{comment.imn_n2}</td>
<td>{comment.imn_n3}</td>
<td>{comment.aim_n1}</td>
<td>{comment.aim_n2}</td>
<td>{comment.aim_n3}</td>
<td>{comment.naim_n1}</td>
<td>{comment.naim_n2}</td>
<td>{comment.naim_n3}</td>
<td>{comment.fraccion_aim_n1_inversion}</td>
<td>{comment.fraccion_aim_n1_aom}</td>
<td>{comment.bra1_cop}</td>
<td>{comment.bra2_cop}</td>
<td>{comment.bra3_cop}</td>
<td>{comment.brae1_cop}</td>
<td>{comment.brae2_cop}</td>
<td>{comment.brae3_cop}</td>
<td>{comment.braen1_cop}</td>
<td>{comment.braen2_cop}</td>
<td>{comment.braen3_cop}</td>
<td>{comment.rc1_cop}</td>
<td>{comment.rc2_cop}</td>
<td>{comment.rc3_cop}</td>
<td>{comment.cdi_aj_1_cop2007_kwh}</td>
<td>{comment.cd_aj_2_cop2007_kwh}</td>
<td>{comment.cd_aj_3_cop2007_kwh}</td>
<td>{comment.cdm_aj_1_cop2007_kwh}</td>
<td>{comment.iapa1}</td>
<td>{comment.iapa2}</td>
<td>{comment.iapa3}</td>
<td>{comment.iapa1_tant}</td>
<td>{comment.iapa2_tant}</td>
<td>{comment.iapa3_tant}</td>
<td>{comment.oi1_cop}</td>
<td>{comment.oj2_cop}</td>
<td>{comment.oj3_cop}</td>
<td>{comment.irespaldo1_cop}</td>
<td>{comment.irespaldo2_cop}</td>
<td>{comment.irespaldo3_cop}</td>
<td>{comment.imunts1_cop}</td>
<td>{comment.imunts2_cop}</td>
<td>{comment.imunts3_cop}</td>
<td>{comment.ireactiva1_cop}</td>
<td>{comment.ireactiva2_cop}</td>
<td>{comment.ireactiva3_cop}</td>
<td>{comment.aombase1}</td>
<td>{comment.aombase2}</td>
<td>{comment.aombase3}</td>
<td>{comment.brae1_tant_cop}</td>
<td>{comment.brae2_tant_cop}</td>
<td>{comment.brae3_tant_cop}</td>
<td>{comment.deltabraenj_1_cop}</td>
<td>{comment.deltabraenj_2_cop}</td>
<td>{comment.deltabraenj_3_cop}</td>
<td>{comment.deltaingj_1_cop}</td>
<td>{comment.deltaingj_2_cop}</td>
<td>{comment.deltaingj_3_cop}</td>
<td>{comment.brt1_cop}</td>
<td>{comment.brt2_cop}</td>
<td>{comment.brt3_cop}</td>
<td>{comment.rcbia1_cop}</td>
<td>{comment.rcbia2_cop}</td>
<td>{comment.rcbia3_cop}</td>
<td>{comment.rcna1_cop}</td>
<td>{comment.rcna2_cop}</td>
<td>{comment.rcna3_cop}</td>
<td>{comment.rcnafo1_cop}</td>
<td>{comment.rcnafo2_cop}</td>
<td>{comment.rcnafo3_cop}</td>
<td>{comment.inve1_cop}</td>
<td>{comment.inve2_cop}</td>
<td>{comment.inve3_cop}</td>
<td>{comment.inva1_cop}</td>
<td>{comment.inva2_cop}</td>
<td>{comment.inva3_cop}</td>
<td>{comment.inva1_tant_cop}</td>
<td>{comment.inva2_tant_cop}</td>
<td>{comment.inva3_tant_cop}</td>
<td>{comment.invr1_maximo_tant_cop}</td>
<td>{comment.invr2_maximo_tant_cop}</td>
<td>{comment.invr3_maximo_tant_cop}</td>
<td>{comment.invr1_delta_cop}</td>
<td>{comment.invr2_delta_cop}</td>
<td>{comment.invr3_delta_cop}</td>
<td>{comment.invr1_tant_cop}</td>
<td>{comment.invr2_tant_cop}</td>
<td>{comment.invr3_tant_cop}</td>
<td>{comment.pr1}</td>
<td>{comment.pr2}</td>
<td>{comment.pr3}</td>
<td>{comment.pj_1}</td>
<td>{comment.pj_2}</td>
<td>{comment.pj_3}</td>
<td>{comment.pj_1_creg097}</td>
<td>{comment.pj_2_creg097}</td>
<td>{comment.pj_3_creg097}</td>
<td>{comment.acumulado_eej1_kwh}</td>
<td>{comment.acumulado_eej2_kwh}</td>
<td>{comment.acumulado_eej3_kwh}</td>
<td>{comment.acumulado_fej3_2_kwh}</td>
<td>{comment.euj_2_creg097_kwh}</td>
<td>{comment.fej3_2_creg097_kwh}</td>
<td>{comment.ic_saidi_cop}</td>
<td>{comment.ic_saifi_cop}</td>
<td>{comment.conp_cop}</td>
<td>{comment.vcdij_tant_kwh}</td>
<td>{comment.vcinj_tant_kwh}</td>
<td>{comment.vacpiec1}</td>
<td>{comment.vacpiec2}</td>
<td>{comment.vacpiec3}</td>
<td>{comment.vacni1}</td>
<td>{comment.vacni2}</td>
<td>{comment.vacni3}</td>
<td>{comment.r_tasa_retorno_actividad_distribucion}</td>
<td>{comment.famb}</td>
<td>{comment.css1_cop}</td>
<td>{comment.css2_cop}</td>
<td>{comment.css3_cop}</td>
<td>{comment.dismining1_cop}</td>
<td>{comment.dismining2_cop}</td>
<td>{comment.dismining3_cop}</td>

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
export default Data_xm_d015;

