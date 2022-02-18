import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoData_xm_str from './NuevoData_xm_str';
import NuevoData_xm_str2 from './NuevoData_xm_str2';


const OBTENER_DATA_XM_STR= gql`
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

const Data_xm_str= () => {
const { data, error, loading} = useQuery(OBTENER_DATA_XM_STR);
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
{ name: "Id", field: "id", sortable: true},{ name: "creador", field: "creador", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true},{ name: "Anho", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},{ name: "Total_Ingreso_Mensual_Bruto_Str_Cop_Norte", field: "total_ingreso_mensual_bruto_str_cop_norte", sortable: true},{ name: "Energia_Del_Str_Kwh_Norte", field: "energia_del_str_kwh_norte", sortable: true},{ name: "Cargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Norte", field: "cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte", sortable: true},{ name: "Cargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Norte", field: "cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte", sortable: true},{ name: "Cargo_Por_Uso_Dt4_Cop_Kwh_Norte", field: "cargo_por_uso_dt4_cop_kwh_norte", sortable: true},{ name: "Factor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Norte", field: "factor_para_referir_las_medidas_de_energia_del_nt_4_norte", sortable: true},{ name: "Valor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Norte", field: "valor_diferencial_despues_de_compensacion_cop_kwh_norte", sortable: true},{ name: "Total_Ingreso_Mensual_Bruto_Str_Cop_Sur", field: "total_ingreso_mensual_bruto_str_cop_sur", sortable: true},{ name: "Energia_Del_Str_Kwh_Sur", field: "energia_del_str_kwh_sur", sortable: true},{ name: "Cargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Sur", field: "cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur", sortable: true},{ name: "Cargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Sur", field: "cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur", sortable: true},{ name: "Cargo_Por_Uso_Dt4_Cop_Kwh_Sur", field: "cargo_por_uso_dt4_cop_kwh_sur", sortable: true},{ name: "Factor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Sur", field: "factor_para_referir_las_medidas_de_energia_del_nt_4_sur", sortable: true},{ name: "Valor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Sur", field: "valor_diferencial_despues_de_compensacion_cop_kwh_sur", sortable: true}
];
useEffect(() => {
if(loading) return 'Cargando....';
setComments(data.obtenerData_xm_str);
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



return (


<div className="container p-0">
<div className="card col-sm ">
<div className="card-header h6">
<dt>INSUMOSDATA XM STR</dt>
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
<NuevoData_xm_str show={showLogin} close={() => setShowLogin(false)} />
<button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
<NuevoData_xm_str2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.total_ingreso_mensual_bruto_str_cop_norte}</td>
<td>{comment.energia_del_str_kwh_norte}</td>
<td>{comment.cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte}</td>
<td>{comment.cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte}</td>
<td>{comment.cargo_por_uso_dt4_cop_kwh_norte}</td>
<td>{comment.factor_para_referir_las_medidas_de_energia_del_nt_4_norte}</td>
<td>{comment.valor_diferencial_despues_de_compensacion_cop_kwh_norte}</td>
<td>{comment.energia_del_str_kwh_sur}</td>
<td>{comment.cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur}</td>
<td>{comment.cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur}</td>
<td>{comment.cargo_por_uso_dt4_cop_kwh_sur}</td>
<td>{comment.factor_para_referir_las_medidas_de_energia_del_nt_4_sur}</td>
<td>{comment.valor_diferencial_despues_de_compensacion_cop_kwh_sur}</td>

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
export default Data_xm_str;

