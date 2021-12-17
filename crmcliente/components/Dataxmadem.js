
import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoDataxmadem from './NuevoDataxmadem';
import NuevoDataxmadem2 from './NuevoDataxmadem2';


const OBTENER_DATA_XM_ADEM = gql`
query obtenerData_xm_adem {
obtenerData_xm_adem {
id
anho
mes
dia
creador
cod_contenido
agente
contenido
cont_hora_1
cont_hora_2
cont_hora_3
cont_hora_4
cont_hora_5
cont_hora_6
cont_hora_7
cont_hora_8
cont_hora_9
cont_hora_10
cont_hora_11
cont_hora_12
cont_hora_13
cont_hora_14
cont_hora_15
cont_hora_16
cont_hora_17
cont_hora_18
cont_hora_19
cont_hora_20
cont_hora_21
cont_hora_22
cont_hora_23
cont_hora_24 
  }
}
`;

const Dataxmadem  = () => {
  const { data, error, loading} = useQuery(OBTENER_DATA_XM_ADEM);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [showLogin, setShowLogin] = useState(false);
    const [showLogin2, setShowLogin2] = useState(false);


    const ITEMS_PER_PAGE = 10;
    const headers = [
      { name: "Id", field: "id", sortable: true},{ name: "Año", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},{ name: "Dia", field: "dia", sortable: true},{ name: "Creador", field: "creador", sortable: true},{ name: "Codigo", field: "cod_contenido", sortable: true},{ name: "Agente", field: "agente", sortable: true},{ name: "Contenido", field: "contenido", sortable: true},{ name: "Hora 01", field: "cont_hora_1", sortable: true},{ name: "Hora 02", field: "cont_hora_2", sortable: true},{ name: "Hora 03", field: "cont_hora_3", sortable: true},{ name: "Hora 04", field: "cont_hora_4", sortable: true},{ name: "Hora 05", field: "cont_hora_5", sortable: true},{ name: "Hora 06", field: "cont_hora_6", sortable: true},{ name: "Hora 07", field: "cont_hora_7", sortable: true},{ name: "Hora 08", field: "cont_hora_8", sortable: true},{ name: "Hora 09", field: "cont_hora_9", sortable: true},{ name: "Hora 10", field: "cont_hora_10", sortable: true},{ name: "Hora 11", field: "cont_hora_11", sortable: true},{ name: "Hora 12", field: "cont_hora_12", sortable: true},{ name: "Hora 13", field: "cont_hora_13", sortable: true},{ name: "Hora 14", field: "cont_hora_14", sortable: true},{ name: "Hora 15", field: "cont_hora_15", sortable: true},{ name: "Hora 16", field: "cont_hora_16", sortable: true},{ name: "Hora 17", field: "cont_hora_17", sortable: true},{ name: "Hora 18", field: "cont_hora_18", sortable: true},{ name: "Hora 19", field: "cont_hora_19", sortable: true},{ name: "Hora 20", field: "cont_hora_20", sortable: true},{ name: "Hora 21", field: "cont_hora_21", sortable: true},{ name: "Hora 22", field: "cont_hora_22", sortable: true},{ name: "Hora 23", field: "cont_hora_23", sortable: true},{ name: "Hora 24", field: "cont_hora_24", sortable: true}
  ];
   useEffect(() => {
                  if(loading) return 'Cargando....';
                  setComments(data.obtenerData_xm_adem);
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
<dt>INSUMOS XM ADEM</dt>
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
      <NuevoDataxmadem show={showLogin} close={() => setShowLogin(false)} />
      <button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
      <NuevoDataxmadem2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.anho}</td>
<td>{comment.mes}</td>
<td>{comment.dia}</td>
<td>{comment.creador}</td>
<td>{comment.cod_contenido}</td>
<td>{comment.agente}</td>
<td>{comment.contenido}</td>
<td>{comment.cont_hora_1}</td>
<td>{comment.cont_hora_2}</td>
<td>{comment.cont_hora_3}</td>
<td>{comment.cont_hora_4}</td>
<td>{comment.cont_hora_5}</td>
<td>{comment.cont_hora_6}</td>
<td>{comment.cont_hora_7}</td>
<td>{comment.cont_hora_8}</td>
<td>{comment.cont_hora_9}</td>
<td>{comment.cont_hora_10}</td>
<td>{comment.cont_hora_11}</td>
<td>{comment.cont_hora_12}</td>
<td>{comment.cont_hora_13}</td>
<td>{comment.cont_hora_14}</td>
<td>{comment.cont_hora_15}</td>
<td>{comment.cont_hora_16}</td>
<td>{comment.cont_hora_17}</td>
<td>{comment.cont_hora_18}</td>
<td>{comment.cont_hora_19}</td>
<td>{comment.cont_hora_20}</td>
<td>{comment.cont_hora_21}</td>
<td>{comment.cont_hora_22}</td>
<td>{comment.cont_hora_23}</td>
<td>{comment.cont_hora_24}</td>
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
export default Dataxmadem;
