import Layout from './Layout';
import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoDataxmtrsm from './NuevoDataxmtrsm';
import NuevoDataxm_trsm2 from './NuevoDataxmtrsm2';


const OBTENER_DATA_XM_TRSM = gql`
query obtenerData_xm_trsm {
obtenerData_xm_trsm {
id
anho
mes
creador
empresa_id
fecha
codigo
descripcion
valor
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

const Dataxmtrsm  = () => {
  const { data, error, loading} = useQuery(OBTENER_DATA_XM_TRSM);
  const {  data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
  const [comments, setComments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showLogin2, setShowLogin2] = useState(false);


  const ITEMS_PER_PAGE = 3;
  const headers = [
      { name: "Id", field: "id", sortable: true},{ name: "Creador", field: "creador", sortable: true},{ name: "Fecha", field: "fecha", sortable: true},{ name: "Codigo", field: "codigo", sortable: true},{ name: "Valor", field: "valor", sortable: true}
  ];
   useEffect(() => {
                  if(loading) return 'Cargando....';
                 
                  const data_xm_trsm=data.obtenerData_xm_trsm
                  var data_xm_trsmm=data_xm_trsm.filter(data_xm_trsm => data_xm_trsm.empresa_id===data1.obtenerUsuario.empresa && data_xm_trsm.codigo==='MC')

                  data_xm_trsmm=data_xm_trsmm.sort(
                    function(a, b) {
                    if (a.anho === b.anho) {
                    return b.mes > a.mes ? 1 : -1;                  
                    }
                    return b.anho > a.anho ? 1 : -1;
                    });
                  setComments(data_xm_trsmm);
                },[loading,showLogin,showLogin2]);       const commentsData = useMemo(() => {
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
    //    console.log(computedComments)
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
<div className="card  col-sm ">
<div className="card-header h6">
<dt>INSUMOS XM TRSM</dt>
      </div>
      <div className="card-body shadow "> 
      <div className="card-body  shadow">
      <div className="overflow-x-scroll">
      <div className="row w-100">
      <div className="col mb-3 col-12 text-center">
      <div className="row"></div>
      <div className="col-md-6">
      <div className="text-left mr-0 mb-3">
      <button variant="primary" onClick={() => setShowLogin(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos</button>
      <NuevoDataxmtrsm show={showLogin} close={() => setShowLogin(false)} />
      <button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
      <NuevoDataxm_trsm2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.fecha}</td>
<td>{comment.codigo}</td>
<td>{comment.valor}</td>
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
export default Dataxmtrsm;
