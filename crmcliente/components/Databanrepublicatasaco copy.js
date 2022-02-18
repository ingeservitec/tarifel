import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoData_banrepublica_tco from './NuevoData_banrepublica_tco';
import NuevoData_banrepublica_tco2 from './NuevoData_banrepublica_tco2';


const OBTENER_DATA_BANREPUBLICA_TCO= gql`
query obtenerData_banrepublica_tco{
obtenerData_banrepublica_tco{
id
creador
anho_semana
tasa_cred_com_credito_consumo
monto_cred_com_credito_consumo
tasa_cred_com_odinario
monto_cred_com_odinario
tasa__cred_com_preferencial_o_corporativo
monto__cred_com_preferencial_o_corporativo
tasa__cred_com_tesoreria
monto__cred_com_tesoreria
tasa_colocacion_banco_republica
monto_colocacion_banco_republica
tasa_colocacion_sin_tesoreria
monto_colocacion_sin_tesoreria
tasa_colocacion_total
monto_colocacion_total
empresa_id

}
}
`;

const Data_banrepublica_tco= () => {
const { data, error, loading} = useQuery(OBTENER_DATA_BANREPUBLICA_TCO);
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
    { name: "Id", field: "id", sortable: true},{ name: "creador", field: "creador", sortable: true},{ name: "Anho_Semana", field: "anho_semana", sortable: true},{ name: "Credito_De_Consumo_Tasa", field: "tasa_cred_com_credito_consumo", sortable: true},{ name: "Credito_De_Consumo_Monto", field: "monto_cred_com_credito_consumo", sortable: true},{ name: "Ordinario_Tasa", field: "tasa_cred_com_odinario", sortable: true},{ name: "Ordinario_Monto", field: "monto_cred_com_odinario", sortable: true},{ name: "Preferencial_O_Corporativo_Tasa", field: "tasa__cred_com_preferencial_o_corporativo", sortable: true},{ name: "Preferencial_O_Corporativo_Monto", field: "monto__cred_com_preferencial_o_corporativo", sortable: true},{ name: "Tesoreria_Tasa", field: "tasa__cred_com_tesoreria", sortable: true},{ name: "Tesoreria_Monto", field: "monto__cred_com_tesoreria", sortable: true},{ name: "Banco_De_La_Republica_Tasa", field: "tasa_colocacion_banco_republica", sortable: true},{ name: "Banco_De_La_Republica_Monto", field: "monto_colocacion_banco_republica", sortable: true},{ name: "Sin_Tesoreria_Tasa", field: "tasa_colocacion_sin_tesoreria", sortable: true},{ name: "Sin_Tesoreria_Monto", field: "monto_colocacion_sin_tesoreria", sortable: true},{ name: "Total_Tasa", field: "tasa_colocacion_total", sortable: true},{ name: "Total_Monto", field: "monto_colocacion_total", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true}
];
useEffect(() => {
if(loading) return 'Cargando....';
setComments(data.obtenerData_banrepublica_tco);
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
<dt>INSUMOSDATA BANREPUBLICA TCO</dt>
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
<NuevoData_banrepublica_tco show={showLogin} close={() => setShowLogin(false)} />
<button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
<NuevoData_banrepublica_tco2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.anho_semana}</td>
<td>{comment.tasa_cred_com_credito_consumo}</td>
<td>{comment.monto_cred_com_credito_consumo}</td>
<td>{comment.tasa_cred_com_odinario}</td>
<td>{comment.monto_cred_com_odinario}</td>
<td>{comment.tasa__cred_com_preferencial_o_corporativo}</td>
<td>{comment.monto__cred_com_preferencial_o_corporativo}</td>
<td>{comment.tasa__cred_com_tesoreria}</td>
<td>{comment.monto__cred_com_tesoreria}</td>
<td>{comment.tasa_colocacion_banco_republica}</td>
<td>{comment.monto_colocacion_banco_republica}</td>
<td>{comment.tasa_colocacion_sin_tesoreria}</td>
<td>{comment.monto_colocacion_sin_tesoreria}</td>
<td>{comment.tasa_colocacion_total}</td>
<td>{comment.monto_colocacion_total}</td>
<td>{comment.empresa_id}</td>

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
export default Data_banrepublica_tco;

