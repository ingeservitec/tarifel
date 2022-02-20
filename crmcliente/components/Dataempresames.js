


import Layout from '../components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router';
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link'
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from '../components/DataTable/Paginacion';
import Search from '../components/DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from '../components/DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoDataempresa from '../components/NuevoDataempresa';
import NuevoDataempresa2 from '../components/NuevoDataempresa2';
import Swal from 'sweetalert2'

const OBTENER_DATA_EMPRESAS = gql`
query obtenerData_empresa {
  obtenerData_empresa{
    id
    anho
    mes
    mercado
    numero_usuarios_r
    numero_usuarios_nr
    ventas_usuarios_r_nt1_e
    ventas_usuarios_r_nt1_c
    ventas_usuarios_r_nt1_u
    ventas_usuarios_r_nt2
    ventas_usuarios_r_nt3
    ventas_usuarios_nr_kwh
    costo_garantias_mem_cop
    costo_garantias_str_sdl_cop
    pui_cop_kwh
    vsne_kwh
    vnu_kwh
    vae_kwh
  }
}
`;


const ELIMINAR_DATA_EMPRESAS = gql`
mutation eliminarDataEmpresa ($eliminarDataEmpresaId: ID!) {
    eliminarDataEmpresa(id: $eliminarDataEmpresaId)
}
`;


const Dataempresa  = () => {

   const { data, error, loading} = useQuery(OBTENER_DATA_EMPRESAS);
   const [id1, setId1] = useState(0);
  
   const [ eliminarDataEmpresa] = useMutation(ELIMINAR_DATA_EMPRESAS, {
    update(cache) {
        const { obtenerData_empresa} = cache.readQuery({
            query: OBTENER_DATA_EMPRESAS
        });


        cache.writeQuery({
            query: OBTENER_DATA_EMPRESAS,
            data: {
                obtenerData_empresa: obtenerData_empresa.filter( obtenerData_empresa => obtenerData_empresa.id !== id1.toString() )
            }
        })
    }
})



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
        { name: "Id", field: "id", sortable: false },
        { name: "Eliminar", field: "eliminar", sortable: true },
        { name: "Año", field: "anho", sortable: true },
        { name: "Mes", field: "mes", sortable: true },
        { name: "Mercado", field: "mercado", sortable: true },
        { name: "Número Usuarios R", field: "numero_usuarios_r", sortable: false },
        { name: "Número Usuarios NR", field: "numero_usuarios_nr", sortable: false },
        { name: "Ventas Usuarios R NT1 E", field: "ventas_usuarios_r_nt1_e", sortable: false },
        { name: "Ventas Usuarios R NT1 C", field: "ventas_usuarios_r_nt1_c", sortable: false },
        { name: "Ventas Usuarios R NT1 U", field: "ventas_usuarios_r_nt1_u", sortable: false },
        { name: "Ventas Usuarios R NT2", field: "ventas_usuarios_r_nt2", sortable: false },
        { name: "Ventas Usuarios R NT3", field: "ventas_usuarios_r_nt3", sortable: false },
        { name: "Ventas Usuarios NR Kwh", field: "ventas_usuarios_nr_kwh", sortable: false },
        { name: "Costo Garantias MEM Cop", field: "costo_garantias_mem_cop", sortable: false },
        { name: "Costo Garantias STR SDL Cop", field: "costo_garantias_str_sdl_cop", sortable: false },
        { name: "PUI Cop Kwh", field: "pui_cop_kwh", sortable: false },
        { name: "VSNE Kwh", field: "vsne_kwh", sortable: false },
        { name: "VNU Kwh", field: "vnu_kwh", sortable: false },
        { name: "VAE Kwh", field: "vae_kwh", sortable: false }
    ];
   


    useEffect(() => {
                  if(loading) return 'Cargando....';
                  setComments(data.obtenerData_empresa);
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

const confirmarEliminarRegistro=(eliminarDataEmpresaId)=>{
    setId1(eliminarDataEmpresaId)
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
                console.log(eliminarDataEmpresaId)
                const data1 = await eliminarDataEmpresa({
                    variables: {
                        eliminarDataEmpresaId
                    }
                });

                Swal.fire(
                    'Eliminado',
                    data1.eliminarDataEmpresa,
                    'success'
                   
                );
               
                
            } catch (error) {
                console.log(error)
            }
            
        }
      })
}

// const handleChanges2 = (event) => {
//     console.log('Aca');
//     console.log(event);
//   };

return (
    <div>


<div className="container p-0">
<div className="card  col-sm ">
<div className="card-header h6">
<dt>INSUMOS EMPRESA MENSUAL</dt>
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
      <NuevoDataempresa show={showLogin} close={() => setShowLogin(false)} />
      <button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
      <NuevoDataempresa2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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
                <table className="table table-striped ">
                    <TableHeader 
                    headers ={headers}
                    onSorting={(field, order) =>
                    setSorting({ field, order })
                    }/>
                    <tbody >
                      
                    {commentsData.map(comment => (
                        <tr key={comment.id}>
                            <th scope="row" >
                            {comment.id}
                            </th>
                                <td ><button 
                                className="bg-yellow-400 w-20  text-white hover:cursor-pointer hover:bg-red-900 rounded"
                                onClick={()=>confirmarEliminarRegistro(comment.id)}
                                >Eliminar</button></td>
                                {/* <td className="pt-3-half" contentEditable="true"onInput={(e) => handleChanges2(e.currentTarget.textContent)}>{comment.anho}</td> */}
                                <td>{comment.anho}</td>
                                <td>{comment.mes}</td>
                                <td>{comment.mercado}</td>
                                <td>{comment.numero_usuarios_r}</td>
                                <td>{comment.numero_usuarios_nr}</td>
                                <td>{comment.ventas_usuarios_r_nt1_e}</td>
                                <td>{comment.ventas_usuarios_r_nt1_c}</td>
                                <td>{comment.ventas_usuarios_r_nt1_u}</td>
                                <td>{comment.ventas_usuarios_r_nt2}</td>
                                <td>{comment.ventas_usuarios_r_nt3}</td>
                                <td>{comment.ventas_usuarios_nr_kwh}</td>
                                <td>{comment.costo_garantias_mem_cop}</td>
                                <td>{comment.costo_garantias_str_sdl_cop}</td>
                                <td>{comment.pui_cop_kwh}</td>
                                <td>{comment.vsne_kwh}</td>
                                <td>{comment.vnu_kwh}</td>
                                <td>{comment.vae_kwh}</td>
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

  </div>
  
);
}
export default Dataempresa;
