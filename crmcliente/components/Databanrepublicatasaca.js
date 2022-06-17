import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';
import NuevoData_banrepublica_tcap from './NuevoData_banrepublica_tcap';
import NuevoData_banrepublica_tcap2 from './NuevoData_banrepublica_tcap2';


const OBTENER_DATA_BANREPUBLICA_TCAP= gql`
query obtenerData_banrepublica_tcap{
obtenerData_banrepublica_tcap{
id
creador
fecha
empresa_id
tasa_a_30_cdt_bancos_comerciales
monto_a_30_cdt_bancos_comerciales
tasa_entre_31_y_44_cdt_bancos_comerciales
monto_entre_31_y_44_cdt_bancos_comerciales
tasa_a_45_cdt_bancos_comerciales
monto_a_45_cdt_bancos_comerciales
tasa_entre_46_y_59_cdt_bancos_comerciales
monto_entre_46_y_59_cdt_bancos_comerciales
tasa_a_60_cdt_bancos_comerciales
monto_a_60_cdt_bancos_comerciales
tasa_entre_61_y_89_cdt_bancos_comerciales
monto_entre_61_y_89_cdt_bancos_comerciales
tasa_a_90_cdt_bancos_comerciales
monto_a_90_cdt_bancos_comerciales
tasa_entre_91_y_119_cdt_bancos_comerciales
monto_entre_91_y_119_cdt_bancos_comerciales
tasa_a_120_cdt_bancos_comerciales
monto_a_120_cdt_bancos_comerciales
tasa_entre_121_y_179_cdt_bancos_comerciales
monto_entre_121_y_179_cdt_bancos_comerciales
tasa_a_180_cdt_bancos_comerciales
monto_a_180_cdt_bancos_comerciales
tasa_entre_181_y_359_cdt_bancos_comerciales
monto_entre_181_y_359_cdt_bancos_comerciales
tasa_a_360_cdt_bancos_comerciales
monto_a_360_cdt_bancos_comerciales
tasa_superiores_a_360_cdt_bancos_comerciales
monto_superiores_a_360_cdt_bancos_comerciales
tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales
monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales
tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales
monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales
tasa_entre_2_y_14_cdats_cdat_bancos_comerciales
monto_entre_2_y_14_cdats_cdat_bancos_comerciales
tasa_entre_15_y_29_cdats_cdat_bancos_comerciales
monto_entre_15_y_29_cdat_bancos_comerciales
tasa_a_30_cdats_cdat_bancos_comerciales
monto_a_30_cdat_bancos_comerciales
tasa_entre_31_y_90_cdats_cdat_bancos_comerciales
monto_entre_31_y_90_cdat_bancos_comerciales
tasa_entre_91_y_180_cdats_cdat_bancos_comerciales
monto_entre_91_y_180_cdat_bancos_comerciales
tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales
monto_de_181_en_adelante_cdats_cdat_bancos_comerciales
tasa_cap_cdat_oficinas_cdat_bancos_comerciales
monto_cap_cdat_oficinas_cdat_bancos_comerciales

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

const Data_banrepublica_tcap= () => {
const { data, error, loading} = useQuery(OBTENER_DATA_BANREPUBLICA_TCAP);
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
{ name: "Id", field: "id", sortable: true},
{ name: "creador", field: "creador", sortable: true},
{ name: "Fecha", field: "fecha", sortable: true},
{ name: "empresa_id", field: "empresa_id", sortable: true},
{ name: "Tasa_A_30_Cdt_Bancos_Comerciales", field: "tasa_a_30_cdt_bancos_comerciales", sortable: true},
{ name: "Monto_A_30_Cdt_Bancos_Comerciales", field: "monto_a_30_cdt_bancos_comerciales", sortable: true},
{ name: "Tasa_Entre_31_Y_44_Cdt_Bancos_Comerciales", field: "tasa_entre_31_y_44_cdt_bancos_comerciales", sortable: true},
{ name: "Monto_Entre_31_Y_44_Cdt_Bancos_Comerciales", field: "monto_entre_31_y_44_cdt_bancos_comerciales", sortable: true},
{ name: "Tasa_A_45_Cdt_Bancos_Comerciales", field: "tasa_a_45_cdt_bancos_comerciales", sortable: true},
{ name: "Monto_A_45_Cdt_Bancos_Comerciales", field: "monto_a_45_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_Entre_46_Y_59_Cdt_Bancos_Comerciales", field: "tasa_entre_46_y_59_cdt_bancos_comerciales", sortable: true},{ name: "Monto_Entre_46_Y_59_Cdt_Bancos_Comerciales", field: "monto_entre_46_y_59_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_A_60_Cdt_Bancos_Comerciales", field: "tasa_a_60_cdt_bancos_comerciales", sortable: true},{ name: "Monto_A_60_Cdt_Bancos_Comerciales", field: "monto_a_60_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_Entre_61_Y_89_Cdt_Bancos_Comerciales", field: "tasa_entre_61_y_89_cdt_bancos_comerciales", sortable: true},{ name: "Monto_Entre_61_Y_89_Cdt_Bancos_Comerciales", field: "monto_entre_61_y_89_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_A_90_Cdt_Bancos_Comerciales", field: "tasa_a_90_cdt_bancos_comerciales", sortable: true},{ name: "Monto_A_90_Cdt_Bancos_Comerciales", field: "monto_a_90_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_Entre_91_Y_119_Cdt_Bancos_Comerciales", field: "tasa_entre_91_y_119_cdt_bancos_comerciales", sortable: true},{ name: "Monto_Entre_91_Y_119_Cdt_Bancos_Comerciales", field: "monto_entre_91_y_119_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_A_120_Cdt_Bancos_Comerciales", field: "tasa_a_120_cdt_bancos_comerciales", sortable: true},{ name: "Monto_A_120_Cdt_Bancos_Comerciales", field: "monto_a_120_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_Entre_121_Y_179_Cdt_Bancos_Comerciales", field: "tasa_entre_121_y_179_cdt_bancos_comerciales", sortable: true},{ name: "Monto_Entre_121_Y_179_Cdt_Bancos_Comerciales", field: "monto_entre_121_y_179_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_A_180_Cdt_Bancos_Comerciales", field: "tasa_a_180_cdt_bancos_comerciales", sortable: true},{ name: "Monto_A_180_Cdt_Bancos_Comerciales", field: "monto_a_180_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_Entre_181_Y_359_Cdt_Bancos_Comerciales", field: "tasa_entre_181_y_359_cdt_bancos_comerciales", sortable: true},{ name: "Monto_Entre_181_Y_359_Cdt_Bancos_Comerciales", field: "monto_entre_181_y_359_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_A_360_Cdt_Bancos_Comerciales", field: "tasa_a_360_cdt_bancos_comerciales", sortable: true},{ name: "Monto_A_360_Cdt_Bancos_Comerciales", field: "monto_a_360_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_Superiores_A_360_Cdt_Bancos_Comerciales", field: "tasa_superiores_a_360_cdt_bancos_comerciales", sortable: true},{ name: "Monto_Superiores_A_360_Cdt_Bancos_Comerciales", field: "monto_superiores_a_360_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_Cap_Cdt_Red_De_Oficinas_Cdt_Bancos_Comerciales", field: "tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales", sortable: true},{ name: "Monto_Cap_Cdt_Red_De_Oficinas__Cdt_Bancos_Comerciales", field: "monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales", sortable: true},{ name: "Tasa_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales", field: "tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales", sortable: true},{ name: "Monto_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales", field: "monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales", sortable: true},{ name: "Tasa_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales", field: "tasa_entre_2_y_14_cdats_cdat_bancos_comerciales", sortable: true},{ name: "Monto_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales", field: "monto_entre_2_y_14_cdats_cdat_bancos_comerciales", sortable: true},{ name: "Tasa_Entre_15_Y_29_Cdats_Cdat_Bancos_Comerciales", field: "tasa_entre_15_y_29_cdats_cdat_bancos_comerciales", sortable: true},{ name: "Monto_Entre_15_Y_29_Cdat_Bancos_Comerciales", field: "monto_entre_15_y_29_cdat_bancos_comerciales", sortable: true},{ name: "Tasa_A_30_Cdats_Cdat_Bancos_Comerciales", field: "tasa_a_30_cdats_cdat_bancos_comerciales", sortable: true},{ name: "Monto_A_30_Cdat_Bancos_Comerciales", field: "monto_a_30_cdat_bancos_comerciales", sortable: true},{ name: "Tasa_Entre_31_Y_90_Cdats_Cdat_Bancos_Comerciales", field: "tasa_entre_31_y_90_cdats_cdat_bancos_comerciales", sortable: true},{ name: "Monto_Entre_31_Y_90_Cdat_Bancos_Comerciales", field: "monto_entre_31_y_90_cdat_bancos_comerciales", sortable: true},{ name: "Tasa_Entre_91_Y_180_Cdats_Cdat_Bancos_Comerciales", field: "tasa_entre_91_y_180_cdats_cdat_bancos_comerciales", sortable: true},{ name: "Monto_Entre_91_Y_180_Cdat_Bancos_Comerciales", field: "monto_entre_91_y_180_cdat_bancos_comerciales", sortable: true},{ name: "Tasa_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales", field: "tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales", sortable: true},{ name: "Monto_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales", field: "monto_de_181_en_adelante_cdats_cdat_bancos_comerciales", sortable: true},{ name: "Tasa_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales", field: "tasa_cap_cdat_oficinas_cdat_bancos_comerciales", sortable: true},{ name: "Monto_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales", field: "monto_cap_cdat_oficinas_cdat_bancos_comerciales", sortable: true}
];


useEffect(() => {
    if(loading) return 'Cargando....';
    const data_banrepublica_tcap=data.obtenerData_banrepublica_tcap
    var data_banrepublica_tcapm=data_banrepublica_tcap.filter(data_banrepublica_tcap => data_banrepublica_tcap.empresa_id===data1.obtenerUsuario.empresa)
    
    var max=0, i=0, id_max=0, myDate, value
    
    for (i = 0; i < data_banrepublica_tcapm.length; i++) {
        myDate = data_banrepublica_tcapm[i].fecha.split("-");
        value = Math.round(((new Date( myDate[0], myDate[1] - 1, myDate[2])).getTime()+(25567 + 1))/(86400 * 1000));
        
        if (value > max) {
            max = value;
            id_max =i
        }
    }

    if(id_max>0){
    setComments(data_banrepublica_tcapm[id_max]);
}
else{
    setComments(data_banrepublica_tcapm);
}



    },[loading]);


return (


<div className="container p-0">
<div className="card col-sm ">
<div className="card-header h6">
<dt>INSUMOSDATA BANREPUBLICA TCAP</dt>
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
<NuevoData_banrepublica_tcap show={showLogin} close={() => setShowLogin(false)} />
<button variant="primary" onClick={() => setShowLogin2(true)}><i className="fa fa-plus mr-2 white"></i>Agregar Datos Masivos</button>
<NuevoData_banrepublica_tcap2 show2={showLogin2} close2={() => setShowLogin2(false)} />
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

<tr key={comments.id}>
<th scope="row" >
{comments.id}
</th>
<td>{comments.creador}</td>
<td>{comments.fecha}</td>
<td>{comments.empresa_id}</td>
<td>{comments.tasa_a_30_cdt_bancos_comerciales}</td>
<td>{comments.monto_a_30_cdt_bancos_comerciales}</td>
<td>{comments.tasa_entre_31_y_44_cdt_bancos_comerciales}</td>
<td>{comments.monto_entre_31_y_44_cdt_bancos_comerciales}</td>
<td>{comments.tasa_a_45_cdt_bancos_comerciales}</td>
<td>{comments.monto_a_45_cdt_bancos_comerciales}</td>
<td>{comments.tasa_entre_46_y_59_cdt_bancos_comerciales}</td>
<td>{comments.monto_entre_46_y_59_cdt_bancos_comerciales}</td>
<td>{comments.tasa_a_60_cdt_bancos_comerciales}</td>
<td>{comments.monto_a_60_cdt_bancos_comerciales}</td>
<td>{comments.tasa_entre_61_y_89_cdt_bancos_comerciales}</td>
<td>{comments.monto_entre_61_y_89_cdt_bancos_comerciales}</td>
<td>{comments.tasa_a_90_cdt_bancos_comerciales}</td>
<td>{comments.monto_a_90_cdt_bancos_comerciales}</td>
<td>{comments.tasa_entre_91_y_119_cdt_bancos_comerciales}</td>
<td>{comments.monto_entre_91_y_119_cdt_bancos_comerciales}</td>
<td>{comments.tasa_a_120_cdt_bancos_comerciales}</td>
<td>{comments.monto_a_120_cdt_bancos_comerciales}</td>
<td>{comments.tasa_entre_121_y_179_cdt_bancos_comerciales}</td>
<td>{comments.monto_entre_121_y_179_cdt_bancos_comerciales}</td>
<td>{comments.tasa_a_180_cdt_bancos_comerciales}</td>
<td>{comments.monto_a_180_cdt_bancos_comerciales}</td>
<td>{comments.tasa_entre_181_y_359_cdt_bancos_comerciales}</td>
<td>{comments.monto_entre_181_y_359_cdt_bancos_comerciales}</td>
<td>{comments.tasa_a_360_cdt_bancos_comerciales}</td>
<td>{comments.monto_a_360_cdt_bancos_comerciales}</td>
<td>{comments.tasa_superiores_a_360_cdt_bancos_comerciales}</td>
<td>{comments.monto_superiores_a_360_cdt_bancos_comerciales}</td>
<td>{comments.tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales}</td>
<td>{comments.monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales}</td>
<td>{comments.tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales}</td>
<td>{comments.monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales}</td>
<td>{comments.tasa_entre_2_y_14_cdats_cdat_bancos_comerciales}</td>
<td>{comments.monto_entre_2_y_14_cdats_cdat_bancos_comerciales}</td>
<td>{comments.tasa_entre_15_y_29_cdats_cdat_bancos_comerciales}</td>
<td>{comments.monto_entre_15_y_29_cdat_bancos_comerciales}</td>
<td>{comments.tasa_a_30_cdats_cdat_bancos_comerciales}</td>
<td>{comments.monto_a_30_cdat_bancos_comerciales}</td>
<td>{comments.tasa_entre_31_y_90_cdats_cdat_bancos_comerciales}</td>
<td>{comments.monto_entre_31_y_90_cdat_bancos_comerciales}</td>
<td>{comments.tasa_entre_91_y_180_cdats_cdat_bancos_comerciales}</td>
<td>{comments.monto_entre_91_y_180_cdat_bancos_comerciales}</td>
<td>{comments.tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales}</td>
<td>{comments.monto_de_181_en_adelante_cdats_cdat_bancos_comerciales}</td>
<td>{comments.tasa_cap_cdat_oficinas_cdat_bancos_comerciales}</td>
<td>{comments.monto_cap_cdat_oficinas_cdat_bancos_comerciales}</td>

</tr>

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
export default Data_banrepublica_tcap;

