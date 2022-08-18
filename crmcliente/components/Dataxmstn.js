import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoData_xm_stn from './NuevoData_xm_stn';
import NuevoData_xm_stn2 from './NuevoData_xm_stn2';


const OBTENER_DATAXMSTN= gql`
query obtenerDataxmstn{
obtenerDataxmstn{
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

const Dataxmstn= () => {
const { data, error, loading} = useQuery(OBTENER_DATAXMSTN);
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
{ name: "Id", field: "id", sortable: true},{ name: "creador", field: "creador", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true},{ name: "Anho", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},{ name: "T_Cop_Kwh", field: "t_cop_kwh", sortable: true},{ name: "T_Prima_Cop_Kwh", field: "t_prima_cop_kwh", sortable: true},{ name: "Energia_Sin_Kwh", field: "Energia_sin_kwh", sortable: true},{ name: "Ing_Reg_Bruto_T_Cop", field: "Ing_Reg_Bruto_T_cop", sortable: true},{ name: "Ing_Compensar_T_Cop", field: "Ing_Compensar_T_cop", sortable: true},{ name: "Ing_Reg_Neto_T_Cop", field: "Ing_Reg_Neto_T_cop", sortable: true},{ name: "Delta_T_Cop_Kwh", field: "delta_t_cop_kwh", sortable: true}
];
useEffect(() => {
if(loading) return 'Cargando....';
const data_xm_stn=data.obtenerDataxmstn
var data_xm_stnm=data_xm_stn.filter(data_xm_stn => data_xm_stn.empresa_id===data1.obtenerUsuario.empresa)
data_xm_stnm=data_xm_stnm.sort(
  function(a, b) {
  if (a.anho === b.anho) {
  return b.mes > a.mes ? 1 : -1;                  
  }
  return b.anho > a.anho ? 1 : -1;
  });
setComments(data_xm_stnm);
},[loading,showLogin2]); 

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
<dt>INSUMOSDATAXMSTN</dt>
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
<NuevoData_xm_stn show={showLogin} close={() => setShowLogin(false)} />
<button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
<NuevoData_xm_stn2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.t_cop_kwh}</td>
<td>{comment.t_prima_cop_kwh}</td>
<td>{comment.Energia_sin_kwh}</td>
<td>{comment.Ing_Reg_Bruto_T_cop}</td>
<td>{comment.Ing_Compensar_T_cop}</td>
<td>{comment.Ing_Reg_Neto_T_cop}</td>
<td>{comment.delta_t_cop_kwh}</td>

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
export default Dataxmstn;

