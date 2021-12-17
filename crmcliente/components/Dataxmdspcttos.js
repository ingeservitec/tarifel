import Layout from './Layout';
import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoDataxmdspctto from './NuevoDataxmdspctto';
import NuevoDataxmdspctto2 from './NuevoDataxmdspctto2';


const OBTENER_DATA_XM_DSPCTTO = gql`
query obtenerData_xm_dspctto {
obtenerData_xm_dspctto {
id
anho
mes
dia
creador
contrato
vendedor
comprador
tipo
tipomerc
desp_hora_1
desp_hora_2
desp_hora_3
desp_hora_4
desp_hora_5
desp_hora_6
desp_hora_7
desp_hora_8
desp_hora_9
desp_hora_10
desp_hora_11
desp_hora_12
desp_hora_13
desp_hora_14
desp_hora_15
desp_hora_16
desp_hora_17
desp_hora_18
desp_hora_19
desp_hora_20
desp_hora_21
desp_hora_22
desp_hora_23
desp_hora_24
trf_hora_1
trf_hora_2
trf_hora_3
trf_hora_4
trf_hora_5
trf_hora_6
trf_hora_7
trf_hora_8
trf_hora_9
trf_hora_10
trf_hora_11
trf_hora_12
trf_hora_13
trf_hora_14
trf_hora_15
trf_hora_16
trf_hora_17
trf_hora_18
trf_hora_19
trf_hora_20
trf_hora_21
trf_hora_22
trf_hora_23
trf_hora_24
  }
}
`;

const Dataxmdspcttos  = () => {
  const { data, error, loading} = useQuery(OBTENER_DATA_XM_DSPCTTO);
  const [comments, setComments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showLogin2, setShowLogin2] = useState(false);


  const ITEMS_PER_PAGE = 10;
  const headers = [
      { name: "Id", field: "id", sortable: true},{ name: "Año", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},{ name: "Dia", field: "dia", sortable: true},{ name: "Creador", field: "creador", sortable: true},{ name: "Contrato", field: "contrato", sortable: true},{ name: "Vendedor", field: "vendedor", sortable: true},{ name: "Comprador", field: "comprador", sortable: true},{ name: "Tipo", field: "tipo", sortable: true},{ name: "Tipomerc", field: "tipomerc", sortable: true},{ name: "Desp_Hora 01", field: "desp_hora_1", sortable: true},{ name: "Desp_Hora 02", field: "desp_hora_2", sortable: true},{ name: "Desp_Hora 03", field: "desp_hora_3", sortable: true},{ name: "Desp_Hora 04", field: "desp_hora_4", sortable: true},{ name: "Desp_Hora 05", field: "desp_hora_5", sortable: true},{ name: "Desp_Hora 06", field: "desp_hora_6", sortable: true},{ name: "Desp_Hora 07", field: "desp_hora_7", sortable: true},{ name: "Desp_Hora 08", field: "desp_hora_8", sortable: true},{ name: "Desp_Hora 09", field: "desp_hora_9", sortable: true},{ name: "Desp_Hora 10", field: "desp_hora_10", sortable: true},{ name: "Desp_Hora 11", field: "desp_hora_11", sortable: true},{ name: "Desp_Hora 12", field: "desp_hora_12", sortable: true},{ name: "Desp_Hora 13", field: "desp_hora_13", sortable: true},{ name: "Desp_Hora 14", field: "desp_hora_14", sortable: true},{ name: "Desp_Hora 15", field: "desp_hora_15", sortable: true},{ name: "Desp_Hora 16", field: "desp_hora_16", sortable: true},{ name: "Desp_Hora 17", field: "desp_hora_17", sortable: true},{ name: "Desp_Hora 18", field: "desp_hora_18", sortable: true},{ name: "Desp_Hora 19", field: "desp_hora_19", sortable: true},{ name: "Desp_Hora 20", field: "desp_hora_20", sortable: true},{ name: "Desp_Hora 21", field: "desp_hora_21", sortable: true},{ name: "Desp_Hora 22", field: "desp_hora_22", sortable: true},{ name: "Desp_Hora 23", field: "desp_hora_23", sortable: true},{ name: "Desp_Hora 24", field: "desp_hora_24", sortable: true},{ name: "Trf_Hora 01", field: "trf_hora_1", sortable: true},{ name: "Trf_Hora 02", field: "trf_hora_2", sortable: true},{ name: "Trf_Hora 03", field: "trf_hora_3", sortable: true},{ name: "Trf_Hora 04", field: "trf_hora_4", sortable: true},{ name: "Trf_Hora 05", field: "trf_hora_5", sortable: true},{ name: "Trf_Hora 06", field: "trf_hora_6", sortable: true},{ name: "Trf_Hora 07", field: "trf_hora_7", sortable: true},{ name: "Trf_Hora 08", field: "trf_hora_8", sortable: true},{ name: "Trf_Hora 09", field: "trf_hora_9", sortable: true},{ name: "Trf_Hora 10", field: "trf_hora_10", sortable: true},{ name: "Trf_Hora 11", field: "trf_hora_11", sortable: true},{ name: "Trf_Hora 12", field: "trf_hora_12", sortable: true},{ name: "Trf_Hora 13", field: "trf_hora_13", sortable: true},{ name: "Trf_Hora 14", field: "trf_hora_14", sortable: true},{ name: "Trf_Hora 15", field: "trf_hora_15", sortable: true},{ name: "Trf_Hora 16", field: "trf_hora_16", sortable: true},{ name: "Trf_Hora 17", field: "trf_hora_17", sortable: true},{ name: "Trf_Hora 18", field: "trf_hora_18", sortable: true},{ name: "Trf_Hora 19", field: "trf_hora_19", sortable: true},{ name: "Trf_Hora 20", field: "trf_hora_20", sortable: true},{ name: "Trf_Hora 21", field: "trf_hora_21", sortable: true},{ name: "Trf_Hora 22", field: "trf_hora_22", sortable: true},{ name: "Trf_Hora 23", field: "trf_hora_23", sortable: true},{ name: "Trf_Hora 24", field: "trf_hora_24", sortable: true}
  ];
   useEffect(() => {
                  if(loading) return 'Cargando....';
                  setComments(data.obtenerData_xm_dspctto);
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
<dt>INSUMOS XM DSPCTTOS</dt>
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
      <NuevoDataxmdspctto show={showLogin} close={() => setShowLogin(false)} />
      <button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
      <NuevoDataxmdspctto2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
<td>{comment.contrato}</td>
<td>{comment.vendedor}</td>
<td>{comment.comprador}</td>
<td>{comment.tipo}</td>
<td>{comment.tipomerc}</td>
<td>{comment.desp_hora_1}</td>
<td>{comment.desp_hora_2}</td>
<td>{comment.desp_hora_3}</td>
<td>{comment.desp_hora_4}</td>
<td>{comment.desp_hora_5}</td>
<td>{comment.desp_hora_6}</td>
<td>{comment.desp_hora_7}</td>
<td>{comment.desp_hora_8}</td>
<td>{comment.desp_hora_9}</td>
<td>{comment.desp_hora_10}</td>
<td>{comment.desp_hora_11}</td>
<td>{comment.desp_hora_12}</td>
<td>{comment.desp_hora_13}</td>
<td>{comment.desp_hora_14}</td>
<td>{comment.desp_hora_15}</td>
<td>{comment.desp_hora_16}</td>
<td>{comment.desp_hora_17}</td>
<td>{comment.desp_hora_18}</td>
<td>{comment.desp_hora_19}</td>
<td>{comment.desp_hora_20}</td>
<td>{comment.desp_hora_21}</td>
<td>{comment.desp_hora_22}</td>
<td>{comment.desp_hora_23}</td>
<td>{comment.desp_hora_24}</td>
<td>{comment.trf_hora_1}</td>
<td>{comment.trf_hora_2}</td>
<td>{comment.trf_hora_3}</td>
<td>{comment.trf_hora_4}</td>
<td>{comment.trf_hora_5}</td>
<td>{comment.trf_hora_6}</td>
<td>{comment.trf_hora_7}</td>
<td>{comment.trf_hora_8}</td>
<td>{comment.trf_hora_9}</td>
<td>{comment.trf_hora_10}</td>
<td>{comment.trf_hora_11}</td>
<td>{comment.trf_hora_12}</td>
<td>{comment.trf_hora_13}</td>
<td>{comment.trf_hora_14}</td>
<td>{comment.trf_hora_15}</td>
<td>{comment.trf_hora_16}</td>
<td>{comment.trf_hora_17}</td>
<td>{comment.trf_hora_18}</td>
<td>{comment.trf_hora_19}</td>
<td>{comment.trf_hora_20}</td>
<td>{comment.trf_hora_21}</td>
<td>{comment.trf_hora_22}</td>
<td>{comment.trf_hora_23}</td>
<td>{comment.trf_hora_24}</td>
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
export default Dataxmdspcttos;
