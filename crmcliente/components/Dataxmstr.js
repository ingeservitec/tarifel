
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoData_xm_str from './NuevoData_xm_str';
import NuevoData_xm_str2 from './NuevoData_xm_str2';
import { gql, useQuery, useMutation} from '@apollo/client'
import Swal from 'sweetalert2'
import {OBTENER_USUARIO, OBTENER_RES_COMPONENTES_CU_TARIFA,ELIMINAR_DATA_XM_STR,OBTENER_DATA_XM_STR} from "../data";

const Data_xm_str= () => {
const { data, error, loading} = useQuery(OBTENER_DATA_XM_STR);
const {  data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const { data:data2, error:error2, loading:loading2} = useQuery(OBTENER_RES_COMPONENTES_CU_TARIFA);
const [loader, showLoader, hideLoader] = useFullPageLoader();
const [comments, setComments] = useState([]);
const [totalItems, setTotalItems] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [search, setSearch] = useState("");
const [sorting, setSorting] = useState({ field: "", order: "" });
const [showLogin, setShowLogin] = useState(false);
const [showLogin2, setShowLogin2] = useState(false);
const [id1, setId1] = useState(0);
const [ eliminarData_xm_str] = useMutation(ELIMINAR_DATA_XM_STR, {
update(cache) {
const { obtenerData_xm_str} = cache.readQuery({
query:OBTENER_DATA_XM_STR
});
cache.writeQuery({
query: OBTENER_DATA_XM_STR,
data: {
obtenerData_xm_str: obtenerData_xm_str.filter( obtenerData_xm_str=> obtenerData_xm_str.id !== id1.toString() )
}
})
}
})

const ITEMS_PER_PAGE = 3;
const headers = [
{ name: "Id", field: "id", sortable: true},
{ name: "Eliminar", field: "eliminar", sortable: true },
{ name: "creador", field: "creador", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true},{ name: "Anho", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},{ name: "Total_Ingreso_Mensual_Bruto_Str_Cop_Norte", field: "total_ingreso_mensual_bruto_str_cop_norte", sortable: true},{ name: "Energia_Del_Str_Kwh_Norte", field: "energia_del_str_kwh_norte", sortable: true},{ name: "Cargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Norte", field: "cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte", sortable: true},{ name: "Cargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Norte", field: "cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte", sortable: true},{ name: "Cargo_Por_Uso_Dt4_Cop_Kwh_Norte", field: "cargo_por_uso_dt4_cop_kwh_norte", sortable: true},{ name: "Factor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Norte", field: "factor_para_referir_las_medidas_de_energia_del_nt_4_norte", sortable: true},{ name: "Valor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Norte", field: "valor_diferencial_despues_de_compensacion_cop_kwh_norte", sortable: true},{ name: "Total_Ingreso_Mensual_Bruto_Str_Cop_Sur", field: "total_ingreso_mensual_bruto_str_cop_sur", sortable: true},{ name: "Energia_Del_Str_Kwh_Sur", field: "energia_del_str_kwh_sur", sortable: true},{ name: "Cargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Sur", field: "cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur", sortable: true},{ name: "Cargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Sur", field: "cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur", sortable: true},{ name: "Cargo_Por_Uso_Dt4_Cop_Kwh_Sur", field: "cargo_por_uso_dt4_cop_kwh_sur", sortable: true},{ name: "Factor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Sur", field: "factor_para_referir_las_medidas_de_energia_del_nt_4_sur", sortable: true},{ name: "Valor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Sur", field: "valor_diferencial_despues_de_compensacion_cop_kwh_sur", sortable: true}
];

useEffect(() => {
    if(loading) return 'Cargando....';
   
    const data_xm_str=data.obtenerData_xm_str
    var data_xm_strm=data_xm_str.filter(data_xm_str => data_xm_str.empresa_id===data1.obtenerUsuario.empresa)

    data_xm_strm=data_xm_strm.sort(
      function(a, b) {
      if (a.anho === b.anho) {
      return b.mes > a.mes ? 1 : -1;                  
      }
      return b.anho > a.anho ? 1 : -1;
      });
    setComments(data_xm_strm);
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

const confirmarEliminarRegistro=(eliminarData_xm_strId)=>{
  setId1(eliminarData_xm_strId)
  const data_xm_str=data.obtenerData_xm_str
  var data_xm_str_eliminar=data_xm_str.filter(data_xm_str => data_xm_str.empresa_id===data1.obtenerUsuario.empresa && data_xm_str.id===eliminarData_xm_strId)
  const mes=data_xm_str_eliminar[0].mes
  const anho=data_xm_str_eliminar[0].anho
  var mesm=mes
  var anhom=anho
  const data_res_componentes_cu_tarifa=data2.obtenerRes_componentes_cu_tarifa
  var data_res_componentes_cu_tarifaesp=data_res_componentes_cu_tarifa.filter(data_res_componentes_cu_tarifa => data_res_componentes_cu_tarifa.empresa_id===data1.obtenerUsuario.empresa && data_res_componentes_cu_tarifa.anho===anhom &&data_res_componentes_cu_tarifa.mes===mesm)
  if (data_res_componentes_cu_tarifaesp.length===0){
  Swal.fire({
  title: '¿Deseas eliminar a este registro?',
  text: "Esta acción no se puede deshacer",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Eliminar',
  cancelButtonText: 'No, Cancelar'
  }).then( async (result) => {
  if (result.value) {
  try {
  const data1 = await eliminarData_xm_str({
  variables: {
  eliminarData_xm_strId
  }
  });
  Swal.fire(
  'Eliminado',
  data1.eliminar,
  'success'
  );
  } catch (error) {
  console.log(error)
  }
  }
  })
  }
  else{
  Swal.fire({
  title: `Proceso no exitoso`,
  text: `No se puede eliminar este registro por que ya fue utilizado en el calculo del CU de ${mesm}-${anhom}, contacte al administrador si desea continuar `,
  icon: 'warning',
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Salir'
  })
  }
  }

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
<td ><button
className="bg-yellow-400 w-20 text-white hover:cursor-pointer hover:bg-red-900 rounded"
onClick={()=>confirmarEliminarRegistro(comment.id)}
>Eliminar</button></td>
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

