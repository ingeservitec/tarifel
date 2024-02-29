import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoData_creg_cx from './NuevoData_creg_cx';
import NuevoData_creg_cx2 from './NuevoData_creg_cx2';


const OBTENER_DATA_CREG_CX= gql`
query obtenerData_creg_cx{
obtenerData_creg_cx{
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


const Data_creg_cx= () => {
const { data, error, loading} = useQuery(OBTENER_DATA_CREG_CX);
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
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
{ name: "Id", field: "id", sortable: true},{ name: "Fecha", field: "fecha", sortable: true},{ name: "Creador", field: "creador", sortable: true},{ name: "Empresa_Id", field: "empresa_id", sortable: true},{ name: "Resolucion", field: "resolucion", sortable: true},{ name: "Mo", field: "mo", sortable: true},{ name: "RCT", field: "RCT", sortable: true},{ name: "RCAE", field: "RCAE", sortable: true},{ name: "RCSNE", field: "RCSNE", sortable: true},{ name: "RCNU", field: "RCNU", sortable: true},{ name: "Cf", field: "Cf", sortable: true},{ name: "PUI", field: "PUI", sortable: true}
];
useEffect(() => {
if(loading) return 'Cargando....';
if(loading1) return 'Cargando....';
const data_obtenerData_creg_cxesp_=data.obtenerData_creg_cx
const data_obtenerData_creg_cxesp=data_obtenerData_creg_cxesp_.filter(data_obtenerData_creg_cxesp_ => data_obtenerData_creg_cxesp_.empresa_id===data1.obtenerUsuario.empresa)   
setComments(data_obtenerData_creg_cxesp);
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
<dt>INSUMOS CREG</dt>
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
<NuevoData_creg_cx show={showLogin} close={() => setShowLogin(false)} />
<button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
<NuevoData_creg_cx2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.fecha}</td>
<td>{comment.creador}</td>
<td>{comment.empresa_id}</td>
<td>{comment.resolucion}</td>
<td>{comment.mo}</td>
<td>{comment.RCT}</td>
<td>{comment.RCAE}</td>
<td>{comment.RCSNE}</td>
<td>{comment.RCNU}</td>
<td>{comment.Cf}</td>
<td>{comment.PUI}</td>
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
export default Data_creg_cx;
