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


const Dataxmadem  = () => {
    const { data, error, loading} = useQuery(OBTENER_DATA_XM_ADEM);
    const {  data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
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
      { name: "Id", field: "id", sortable: true},{ name: "Año", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},{ name: "Demanda_regulada", field: "Demanda_regulada", sortable: true},{ name: "Perdida_regulada", field: "Perdida_regulada", sortable: true}
      ];
   useEffect(() => {
        if(loading) return 'Cargando....';
        if(loading1) return 'Cargando....';
        const data_xm_adem=data.obtenerData_xm_adem
        const data_xm_adem_ag=data_xm_adem.filter(data_xm_adem => data_xm_adem.agente===data1.obtenerUsuario.empresa)
        
        var Demanda_no_regulada=0, Demanda_regulada=0,Perdida_no_regulada=0,Perdida_regulada=0,consolidado_adem=[]
        for (let index = 0; index < data_xm_adem_ag.length; index++) {
           
        if (data_xm_adem_ag[index].cod_contenido=="DMRE") {
        
                Demanda_regulada = 
                data_xm_adem_ag[index].cont_hora_1+
                data_xm_adem_ag[index].cont_hora_2+
                data_xm_adem_ag[index].cont_hora_3+
                data_xm_adem_ag[index].cont_hora_4+
                data_xm_adem_ag[index].cont_hora_5+
                data_xm_adem_ag[index].cont_hora_6+
                data_xm_adem_ag[index].cont_hora_7+
                data_xm_adem_ag[index].cont_hora_8+
                data_xm_adem_ag[index].cont_hora_9+
                data_xm_adem_ag[index].cont_hora_10+
                data_xm_adem_ag[index].cont_hora_11+
                data_xm_adem_ag[index].cont_hora_12+
                data_xm_adem_ag[index].cont_hora_13+
                data_xm_adem_ag[index].cont_hora_14+
                data_xm_adem_ag[index].cont_hora_15+
                data_xm_adem_ag[index].cont_hora_16+
                data_xm_adem_ag[index].cont_hora_17+
                data_xm_adem_ag[index].cont_hora_18+
                data_xm_adem_ag[index].cont_hora_19+
                data_xm_adem_ag[index].cont_hora_20+
                data_xm_adem_ag[index].cont_hora_21+
                data_xm_adem_ag[index].cont_hora_22+
                data_xm_adem_ag[index].cont_hora_23+
                data_xm_adem_ag[index].cont_hora_24
        }
                if (data_xm_adem_ag[index].cod_contenido=="PRRE") {
        
                Perdida_regulada = 
                data_xm_adem_ag[index].cont_hora_1+
                data_xm_adem_ag[index].cont_hora_2+
                data_xm_adem_ag[index].cont_hora_3+
                data_xm_adem_ag[index].cont_hora_4+
                data_xm_adem_ag[index].cont_hora_5+
                data_xm_adem_ag[index].cont_hora_6+
                data_xm_adem_ag[index].cont_hora_7+
                data_xm_adem_ag[index].cont_hora_8+
                data_xm_adem_ag[index].cont_hora_9+
                data_xm_adem_ag[index].cont_hora_10+
                data_xm_adem_ag[index].cont_hora_11+
                data_xm_adem_ag[index].cont_hora_12+
                data_xm_adem_ag[index].cont_hora_13+
                data_xm_adem_ag[index].cont_hora_14+
                data_xm_adem_ag[index].cont_hora_15+
                data_xm_adem_ag[index].cont_hora_16+
                data_xm_adem_ag[index].cont_hora_17+
                data_xm_adem_ag[index].cont_hora_18+
                data_xm_adem_ag[index].cont_hora_19+
                data_xm_adem_ag[index].cont_hora_20+
                data_xm_adem_ag[index].cont_hora_21+
                data_xm_adem_ag[index].cont_hora_22+
                data_xm_adem_ag[index].cont_hora_23+
                data_xm_adem_ag[index].cont_hora_24
                }
             

                if (data_xm_adem_ag[index].cod_contenido=="DMNR") {
        
                Demanda_no_regulada = 
                data_xm_adem_ag[index].cont_hora_1+
                data_xm_adem_ag[index].cont_hora_2+
                data_xm_adem_ag[index].cont_hora_3+
                data_xm_adem_ag[index].cont_hora_4+
                data_xm_adem_ag[index].cont_hora_5+
                data_xm_adem_ag[index].cont_hora_6+
                data_xm_adem_ag[index].cont_hora_7+
                data_xm_adem_ag[index].cont_hora_8+
                data_xm_adem_ag[index].cont_hora_9+
                data_xm_adem_ag[index].cont_hora_10+
                data_xm_adem_ag[index].cont_hora_11+
                data_xm_adem_ag[index].cont_hora_12+
                data_xm_adem_ag[index].cont_hora_13+
                data_xm_adem_ag[index].cont_hora_14+
                data_xm_adem_ag[index].cont_hora_15+
                data_xm_adem_ag[index].cont_hora_16+
                data_xm_adem_ag[index].cont_hora_17+
                data_xm_adem_ag[index].cont_hora_18+
                data_xm_adem_ag[index].cont_hora_19+
                data_xm_adem_ag[index].cont_hora_20+
                data_xm_adem_ag[index].cont_hora_21+
                data_xm_adem_ag[index].cont_hora_22+
                data_xm_adem_ag[index].cont_hora_23+
                data_xm_adem_ag[index].cont_hora_24
                }
                if (data_xm_adem_ag[index].cod_contenido=="PRNR") {
        
                Perdida_no_regulada = 
                data_xm_adem_ag[index].cont_hora_1+
                data_xm_adem_ag[index].cont_hora_2+
                data_xm_adem_ag[index].cont_hora_3+
                data_xm_adem_ag[index].cont_hora_4+
                data_xm_adem_ag[index].cont_hora_5+
                data_xm_adem_ag[index].cont_hora_6+
                data_xm_adem_ag[index].cont_hora_7+
                data_xm_adem_ag[index].cont_hora_8+
                data_xm_adem_ag[index].cont_hora_9+
                data_xm_adem_ag[index].cont_hora_10+
                data_xm_adem_ag[index].cont_hora_11+
                data_xm_adem_ag[index].cont_hora_12+
                data_xm_adem_ag[index].cont_hora_13+
                data_xm_adem_ag[index].cont_hora_14+
                data_xm_adem_ag[index].cont_hora_15+
                data_xm_adem_ag[index].cont_hora_16+
                data_xm_adem_ag[index].cont_hora_17+
                data_xm_adem_ag[index].cont_hora_18+
                data_xm_adem_ag[index].cont_hora_19+
                data_xm_adem_ag[index].cont_hora_20+
                data_xm_adem_ag[index].cont_hora_21+
                data_xm_adem_ag[index].cont_hora_22+
                data_xm_adem_ag[index].cont_hora_23+
                data_xm_adem_ag[index].cont_hora_24
        }

        if(consolidado_adem.length===0)
        {
        consolidado_adem.push({"id":1, "anho": data_xm_adem_ag[index].anho, "mes": data_xm_adem_ag[index].mes, "Demanda_regulada": Demanda_regulada,"Perdida_regulada": Perdida_regulada,"Demanda_no_regulada": Demanda_no_regulada,"Perdida_no_regulada": Perdida_no_regulada})

    }
    else{
        
        var index1=0
        var long_consolidado_adem= consolidado_adem.length
        while (index1<long_consolidado_adem) {

        if(consolidado_adem[index1].anho===data_xm_adem_ag[index].anho && consolidado_adem[index1].mes===data_xm_adem_ag[index].mes &&  data_xm_adem_ag[index].agente===data1.obtenerUsuario.empresa){

                consolidado_adem[index1]={"id":index1,  "anho": data_xm_adem_ag[index].anho  , "mes": data_xm_adem_ag[index].mes,"Demanda_regulada": consolidado_adem[index1].Demanda_regulada+Demanda_regulada,"Perdida_regulada": consolidado_adem[index1].Perdida_regulada+Perdida_regulada,"Demanda_no_regulada":consolidado_adem[index1].Demanda_no_regulada+ Demanda_no_regulada,"Perdida_no_regulada": consolidado_adem[index1].Perdida_no_regulada+ Perdida_no_regulada}
                index1=Infinity
            }
           if(index1===long_consolidado_adem-1 && data_xm_adem_ag[index].agente===data1.obtenerUsuario.empresa){
                consolidado_adem.push({ "id":index1+1, "anho": data_xm_adem_ag[index].anho, "mes": data_xm_adem_ag[index].mes,"Demanda_regulada": Demanda_regulada,"Perdida_regulada": Perdida_regulada,"Demanda_no_regulada": Demanda_no_regulada,"Perdida_no_regulada": Perdida_no_regulada})
                index1=Infinity
            }
            index1++
        }           
    }

     }


     consolidado_adem=consolidado_adem.sort(
        function(a, b) {          
           if (a.anho === b.anho) {
              // Price is only important when cities are the same
              return b.mes > a.mes ? 1 : -1;
           }
           return b.anho > a.anho ? 1 : -1;
        });


     setComments(consolidado_adem);
     },[loading, loading1]);




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
<td>{comment.Demanda_regulada}</td>
<td>{comment.Perdida_regulada}</td>


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
