import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoData_mme_validacion from './NuevoData_mme_validacion';
import NuevoData_mme_validacion2 from './NuevoData_mme_validacion2';

const OBTENER_DATA_MME_VALIDACION= gql`
query obtenerData_mme_validacion{
obtenerData_mme_validacion{
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

const Data_mme_validacion= () => {
const { data, error, loading} = useQuery(OBTENER_DATA_MME_VALIDACION);
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
{ name: "Id", field: "id", sortable: true},{ name: "creador", field: "creador", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true},{ name: "Fecha", field: "fecha", sortable: true},{ name: "Trimestre", field: "trimestre", sortable: true},{ name: "Anho", field: "anho", sortable: true},{ name: "Facturacion", field: "facturacion", sortable: true},{ name: "Subsidios", field: "subsidios", sortable: true},{ name: "Contribuciones", field: "contribuciones", sortable: true},{ name: "Contrib_No_Recaud_Desp_6M", field: "contrib_no_recaud_desp_6m", sortable: true},{ name: "Contrib_Recaud_Desp_De_Conc", field: "contrib_recaud_desp_de_conc", sortable: true},{ name: "Giros_Recibidos", field: "giros_recibidos", sortable: true}
];
useEffect(() => {
if(loading) return 'Cargando....';
if(loading1) return 'Cargando....';
const data_obtenerData_mme_validacionesp_=data.obtenerData_mme_validacion
const data_obtenerData_mme_validacionesp=data_obtenerData_mme_validacionesp_.filter(data_obtenerData_mme_validacionesp_ => data_obtenerData_mme_validacionesp_.empresa_id===data1.obtenerUsuario.empresa)   
setComments(data_obtenerData_mme_validacionesp);
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
<dt>INSUMOSDATA MME VALIDACION</dt>
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
<NuevoData_mme_validacion show={showLogin} close={() => setShowLogin(false)} />
<button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
<NuevoData_mme_validacion2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.fecha}</td>
<td>{comment.trimestre}</td>
<td>{comment.anho}</td>
<td>{comment.facturacion}</td>
<td>{comment.subsidios}</td>
<td>{comment.contribuciones}</td>
<td>{comment.contrib_no_recaud_desp_6m}</td>
<td>{comment.contrib_recaud_desp_de_conc}</td>
<td>{comment.giros_recibidos}</td>

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
export default Data_mme_validacion;

