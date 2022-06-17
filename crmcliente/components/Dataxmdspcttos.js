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
tipoasigna
empresa_id
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



const Dataxmdspcttos  = () => {
  const { data, error, loading} = useQuery(OBTENER_DATA_XM_DSPCTTO);
  const {  data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
  const [comments, setComments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showLogin2, setShowLogin2] = useState(false);


  const ITEMS_PER_PAGE = 10;
  const headers = [
    { name: "Id", field: "id", sortable: true},{ name: "Año", field: "anho", sortable: true},{ name: "Mes", field: "mes", sortable: true},
      { name: "Contrato", field: "contrato", sortable: true},{ name: "Vendedor", field: "vendedor", sortable: true},
      { name: "Tipomerc", field: "tipomerc", sortable: true},{ name: "Tipoasigna", field: "tipoasigna", sortable: true},
      { name: "Costo $", field: "costo_energia_contrato_mes", sortable: true},
      { name: "Energía comprada", field: "energia_contrato_mes", sortable: true}
  ];
   useEffect(() => {

if(loading) return 'Cargando....';
if(loading1) return 'Cargando....';

// setComments(data.obtenerData_xm_dspctto);

// Recorrer fila a fila 
// En cada fila multiplicar las energias por las tarifas
// Buscar si el año mes y contrato estan en el array que se esta creando
    //Si SUma el resultado a lo que este alli
    //NO Agrega año y mes contrato y ese valor
    //Va  a la siguiente fila del principal
   var costo_energia_dia_contrato = 0, energia_dia_contrato = 0, consolidado_dspcttos=[]

for (let index = 0; index < data.obtenerData_xm_dspctto.length; index++) {
    costo_energia_dia_contrato = 
    data.obtenerData_xm_dspctto[index].desp_hora_1*data.obtenerData_xm_dspctto[index].trf_hora_1+
    data.obtenerData_xm_dspctto[index].desp_hora_2*data.obtenerData_xm_dspctto[index].trf_hora_2+
    data.obtenerData_xm_dspctto[index].desp_hora_3*data.obtenerData_xm_dspctto[index].trf_hora_3+
    data.obtenerData_xm_dspctto[index].desp_hora_4*data.obtenerData_xm_dspctto[index].trf_hora_4+
    data.obtenerData_xm_dspctto[index].desp_hora_5*data.obtenerData_xm_dspctto[index].trf_hora_5+
    data.obtenerData_xm_dspctto[index].desp_hora_6*data.obtenerData_xm_dspctto[index].trf_hora_6+
    data.obtenerData_xm_dspctto[index].desp_hora_7*data.obtenerData_xm_dspctto[index].trf_hora_7+
    data.obtenerData_xm_dspctto[index].desp_hora_8*data.obtenerData_xm_dspctto[index].trf_hora_8+
    data.obtenerData_xm_dspctto[index].desp_hora_9*data.obtenerData_xm_dspctto[index].trf_hora_9+
    data.obtenerData_xm_dspctto[index].desp_hora_10*data.obtenerData_xm_dspctto[index].trf_hora_10+
    data.obtenerData_xm_dspctto[index].desp_hora_11*data.obtenerData_xm_dspctto[index].trf_hora_11+
    data.obtenerData_xm_dspctto[index].desp_hora_12*data.obtenerData_xm_dspctto[index].trf_hora_12+
    data.obtenerData_xm_dspctto[index].desp_hora_13*data.obtenerData_xm_dspctto[index].trf_hora_13+
    data.obtenerData_xm_dspctto[index].desp_hora_14*data.obtenerData_xm_dspctto[index].trf_hora_14+
    data.obtenerData_xm_dspctto[index].desp_hora_15*data.obtenerData_xm_dspctto[index].trf_hora_15+
    data.obtenerData_xm_dspctto[index].desp_hora_16*data.obtenerData_xm_dspctto[index].trf_hora_16+
    data.obtenerData_xm_dspctto[index].desp_hora_17*data.obtenerData_xm_dspctto[index].trf_hora_17+
    data.obtenerData_xm_dspctto[index].desp_hora_18*data.obtenerData_xm_dspctto[index].trf_hora_18+
    data.obtenerData_xm_dspctto[index].desp_hora_19*data.obtenerData_xm_dspctto[index].trf_hora_19+
    data.obtenerData_xm_dspctto[index].desp_hora_20*data.obtenerData_xm_dspctto[index].trf_hora_20+
    data.obtenerData_xm_dspctto[index].desp_hora_21*data.obtenerData_xm_dspctto[index].trf_hora_21+
    data.obtenerData_xm_dspctto[index].desp_hora_22*data.obtenerData_xm_dspctto[index].trf_hora_22+
    data.obtenerData_xm_dspctto[index].desp_hora_23*data.obtenerData_xm_dspctto[index].trf_hora_23+
    data.obtenerData_xm_dspctto[index].desp_hora_24*data.obtenerData_xm_dspctto[index].trf_hora_24
    energia_dia_contrato=data.obtenerData_xm_dspctto[index].desp_hora_1+data.obtenerData_xm_dspctto[index].desp_hora_2+
    data.obtenerData_xm_dspctto[index].desp_hora_3+data.obtenerData_xm_dspctto[index].desp_hora_4+
    data.obtenerData_xm_dspctto[index].desp_hora_5+data.obtenerData_xm_dspctto[index].desp_hora_6+
    data.obtenerData_xm_dspctto[index].desp_hora_7+data.obtenerData_xm_dspctto[index].desp_hora_8+
    data.obtenerData_xm_dspctto[index].desp_hora_9+data.obtenerData_xm_dspctto[index].desp_hora_10+
    data.obtenerData_xm_dspctto[index].desp_hora_11+data.obtenerData_xm_dspctto[index].desp_hora_12+
    data.obtenerData_xm_dspctto[index].desp_hora_13+data.obtenerData_xm_dspctto[index].desp_hora_14+
    data.obtenerData_xm_dspctto[index].desp_hora_15+data.obtenerData_xm_dspctto[index].desp_hora_16+
    data.obtenerData_xm_dspctto[index].desp_hora_17+data.obtenerData_xm_dspctto[index].desp_hora_18+
    data.obtenerData_xm_dspctto[index].desp_hora_19+data.obtenerData_xm_dspctto[index].desp_hora_20+
    data.obtenerData_xm_dspctto[index].desp_hora_21+data.obtenerData_xm_dspctto[index].desp_hora_22+
    data.obtenerData_xm_dspctto[index].desp_hora_23+data.obtenerData_xm_dspctto[index].desp_hora_24

    if(consolidado_dspcttos.length===0 && data.obtenerData_xm_dspctto[index].empresa_id===data1.obtenerUsuario.empresa )
    {
    consolidado_dspcttos.push({"id":1, "anho": data.obtenerData_xm_dspctto[index].anho, "mes": data.obtenerData_xm_dspctto[index].mes,"contrato": data.obtenerData_xm_dspctto[index].contrato,"costo_energia_contrato_mes": costo_energia_dia_contrato,"energia_contrato_mes": energia_dia_contrato,"vendedor": data.obtenerData_xm_dspctto[index].vendedor,"tipomerc": data.obtenerData_xm_dspctto[index].tipomerc, "empresa_id": data.obtenerData_xm_dspctto[index].empresa_id})
    }
else{
    var index1=0
    var long_consolidado_dspcttos= consolidado_dspcttos.length
    while (index1<long_consolidado_dspcttos) {
        
        if(consolidado_dspcttos[index1].anho===data.obtenerData_xm_dspctto[index].anho && consolidado_dspcttos[index1].mes===data.obtenerData_xm_dspctto[index].mes && consolidado_dspcttos[index1].contrato===data.obtenerData_xm_dspctto[index].contrato &&  data.obtenerData_xm_dspctto[index].empresa_id===data1.obtenerUsuario.empresa){
            consolidado_dspcttos[index1]={"id":index1+1,  "anho": data.obtenerData_xm_dspctto[index].anho  , "mes": data.obtenerData_xm_dspctto[index].mes,"contrato": data.obtenerData_xm_dspctto[index].contrato,"costo_energia_contrato_mes": consolidado_dspcttos[index1].costo_energia_contrato_mes+costo_energia_dia_contrato,"energia_contrato_mes": consolidado_dspcttos[index1].energia_contrato_mes+energia_dia_contrato ,"vendedor": data.obtenerData_xm_dspctto[index].vendedor,"tipomerc": data.obtenerData_xm_dspctto[index].tipomerc,"tipoasigna": data.obtenerData_xm_dspctto[index].tipoasigna }
            index1=Infinity
        }
       if(index1===long_consolidado_dspcttos-1 && data.obtenerData_xm_dspctto[index].empresa_id===data1.obtenerUsuario.empresa){
            consolidado_dspcttos.push({ "id":index1+1, "anho": data.obtenerData_xm_dspctto[index].anho, "mes": data.obtenerData_xm_dspctto[index].mes,"contrato": data.obtenerData_xm_dspctto[index].contrato,"costo_energia_contrato_mes": costo_energia_dia_contrato,"energia_contrato_mes": energia_dia_contrato ,"vendedor": data.obtenerData_xm_dspctto[index].vendedor,"tipomerc": data.obtenerData_xm_dspctto[index].tipomerc })
            index1=Infinity
        }
        index1++
    }
            
}
    
    //data[0] = { "ID": "1", "Status": "Valid" };
    // tri_validados.push([
    // if(data.obtenerData_xm_dspctto[index].anho)
    // {

    // }
   
}
console.log(consolidado_dspcttos)
setComments(consolidado_dspcttos);
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
<td>{comment.contrato}</td>
<td>{comment.vendedor}</td>
<td>{comment.tipomerc}</td>
<td>{comment.tipoasigna}</td>
<td>{comment.costo_energia_contrato_mes}</td>
<td>{comment.energia_contrato_mes}</td>

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
