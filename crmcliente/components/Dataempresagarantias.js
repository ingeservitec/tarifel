import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import Nuevodata_empresa_garantia from './Nuevodata_empresa_garantia';
import Nuevodata_empresa_garantia2 from './Nuevodata_empresa_garantia2';


const OBTENER_DATA_EMPRESA_GARANTIA= gql`
query obtenerData_empresa_garantia{
obtenerData_empresa_garantia{
id
creador
empresa_id
tipo_garantia
nit_beneficiario
dv_beneficiario
emisor_banco
numero_garantia
fecha_inicio_vigencia
fecha_fin_vigencia
valor_garantia
costo_garantia

}
}
`;

const data_empresa_garantia= () => {
const { data, error, loading} = useQuery(OBTENER_DATA_EMPRESA_GARANTIA);
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
{ name: "Id", field: "id", sortable: true},{ name: "creador", field: "creador", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true},{ name: "Tipo_Garantia", field: "tipo_garantia", sortable: true},{ name: "Nit_Beneficiario", field: "nit_beneficiario", sortable: true},{ name: "Dv_Beneficiario", field: "dv_beneficiario", sortable: true},{ name: "Emisor_Banco", field: "emisor_banco", sortable: true},{ name: "Numero_Garantia", field: "numero_garantia", sortable: true},{ name: "Fecha_Inicio_Vigencia", field: "fecha_inicio_vigencia", sortable: true},{ name: "Fecha_Fin_Vigencia", field: "fecha_fin_vigencia", sortable: true},{ name: "Valor_Garantia", field: "valor_garantia", sortable: true},{ name: "Costo_Garantia", field: "costo_garantia", sortable: true}
];
useEffect(() => {
if(loading) return 'Cargando....';
setComments(data.obtenerData_empresa_garantia);
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
<dt>INSUMOSDATA EMPRESA GARANTIA</dt>
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
<Nuevodata_empresa_garantia show={showLogin} close={() => setShowLogin(false)} />
<button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
<Nuevodata_empresa_garantia2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.tipo_garantia}</td>
<td>{comment.nit_beneficiario}</td>
<td>{comment.dv_beneficiario}</td>
<td>{comment.emisor_banco}</td>
<td>{comment.numero_garantia}</td>
<td>{comment.fecha_inicio_vigencia}</td>
<td>{comment.fecha_fin_vigencia}</td>
<td>{comment.valor_garantia}</td>
<td>{comment.costo_garantia}</td>

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
export default data_empresa_garantia;

