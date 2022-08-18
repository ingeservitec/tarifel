import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoData_xm_trsd from './NuevoData_xm_trsd';
import NuevoData_xm_trsd2 from './NuevoData_xm_trsd2';


const OBTENER_DATA_XM_TRSD= gql`
query obtenerData_xm_trsd{
obtenerData_xm_trsd{
id
creador
empresa_id
anho
mes
codigo
contenido
hora_01
hora_02
hora_03
hora_04
hora_05
hora_06
hora_07
hora_08
hora_09
hora_10
hora_11
hora_12
hora_13
hora_14
hora_15
hora_16
hora_17
hora_18
hora_19
hora_20
hora_21
hora_22
hora_23
hora_24

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

const Data_xm_trsd= () => {
const { data, error, loading} = useQuery(OBTENER_DATA_XM_TRSD);
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
{ name: "Id", field: "id", sortable: true},{ name: "creador", field: "creador", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true},{ name: "Anho", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},{ name: "Codigo", field: "codigo", sortable: true},{ name: "Contenido", field: "contenido", sortable: true},{ name: "Hora_01", field: "hora_01", sortable: true},{ name: "Hora_02", field: "hora_02", sortable: true},{ name: "Hora_03", field: "hora_03", sortable: true},{ name: "Hora_04", field: "hora_04", sortable: true},{ name: "Hora_05", field: "hora_05", sortable: true},{ name: "Hora_06", field: "hora_06", sortable: true},{ name: "Hora_07", field: "hora_07", sortable: true},{ name: "Hora_08", field: "hora_08", sortable: true},{ name: "Hora_09", field: "hora_09", sortable: true},{ name: "Hora_10", field: "hora_10", sortable: true},{ name: "Hora_11", field: "hora_11", sortable: true},{ name: "Hora_12", field: "hora_12", sortable: true},{ name: "Hora_13", field: "hora_13", sortable: true},{ name: "Hora_14", field: "hora_14", sortable: true},{ name: "Hora_15", field: "hora_15", sortable: true},{ name: "Hora_16", field: "hora_16", sortable: true},{ name: "Hora_17", field: "hora_17", sortable: true},{ name: "Hora_18", field: "hora_18", sortable: true},{ name: "Hora_19", field: "hora_19", sortable: true},{ name: "Hora_20", field: "hora_20", sortable: true},{ name: "Hora_21", field: "hora_21", sortable: true},{ name: "Hora_22", field: "hora_22", sortable: true},{ name: "Hora_23", field: "hora_23", sortable: true},{ name: "Hora_24", field: "hora_24", sortable: true}
];
useEffect(() => {
if(loading) return 'Cargando....';
if(loading1) return 'Cargando....';
const data_xm_trsd=data.obtenerData_xm_trsd


const data_xm_trsd_ag=data_xm_trsd.filter(data_xm_trsd => data_xm_trsd.empresa_id===data1.obtenerUsuario.empresa && data_xm_trsd.contenido==='Precio de Bolsa Nacional, en $/kWh.')


const data_xm_trsd_ag_m = [...data_xm_trsd_ag.reduce((r, o) => {
  const key = o.anho + '-' + o.mes;
  
  const item = r.get(key) || Object.assign({}, o, {
    hora_01:0,
    hora_02:0,
    hora_03:0,
    hora_04:0,
    hora_05:0,
    hora_06:0,
    hora_07:0,
    hora_08:0,
    hora_09:0,
    hora_10:0,
    hora_11:0,
    hora_12:0,
    hora_13:0,
    hora_14:0,
    hora_15:0,
    hora_16:0,
    hora_17:0,
    hora_18:0,
    hora_19:0,
    hora_20:0,
    hora_21:0,
    hora_22:0,
    hora_23:0,
    hora_24:0
  });
  item.hora_01+=o.hora_01
  item.hora_02+=o.hora_02
  item.hora_03+=o.hora_03
  item.hora_04+=o.hora_04
  item.hora_05+=o.hora_05
  item.hora_06+=o.hora_06
  item.hora_07+=o.hora_07
  item.hora_08+=o.hora_08
  item.hora_09+=o.hora_09
  item.hora_10+=o.hora_10
  item.hora_11+=o.hora_11
  item.hora_12+=o.hora_12
  item.hora_13+=o.hora_13
  item.hora_14+=o.hora_14
  item.hora_15+=o.hora_15
  item.hora_16+=o.hora_16
  item.hora_17+=o.hora_17
  item.hora_18+=o.hora_18
  item.hora_19+=o.hora_19
  item.hora_20+=o.hora_20
  item.hora_21+=o.hora_21
  item.hora_22+=o.hora_22
  item.hora_23+=o.hora_23
  item.hora_24+=o.hora_24
  return r.set(key, item);
}, new Map).values()];


setComments(data_xm_trsd_ag_m);


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
<dt>INSUMOSDATA XM TRSD</dt>
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
<NuevoData_xm_trsd show={showLogin} close={() => setShowLogin(false)} />
<button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
<NuevoData_xm_trsd2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.codigo}</td>
<td>{comment.contenido}</td>
<td>{comment.hora_01}</td>
<td>{comment.hora_02}</td>
<td>{comment.hora_03}</td>
<td>{comment.hora_04}</td>
<td>{comment.hora_05}</td>
<td>{comment.hora_07}</td>
<td>{comment.hora_08}</td>
<td>{comment.hora_09}</td>
<td>{comment.hora_10}</td>
<td>{comment.hora_11}</td>
<td>{comment.hora_12}</td>
<td>{comment.hora_13}</td>
<td>{comment.hora_14}</td>
<td>{comment.hora_15}</td>
<td>{comment.hora_16}</td>
<td>{comment.hora_17}</td>
<td>{comment.hora_18}</td>
<td>{comment.hora_19}</td>
<td>{comment.hora_20}</td>
<td>{comment.hora_21}</td>
<td>{comment.hora_22}</td>
<td>{comment.hora_23}</td>
<td>{comment.hora_24}</td>

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
export default Data_xm_trsd;

