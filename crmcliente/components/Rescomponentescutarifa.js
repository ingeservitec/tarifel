import { gql, useQuery } from '@apollo/client'
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import useFullPageLoader from '../hooks/useFullPageLoader';
import Paginacion from './DataTable/Paginacion';
import Search from './DataTable/Search';
import 'bootstrap/dist/css/bootstrap.css';
import TableHeader from './DataTable/TableHeader';
import 'font-awesome/css/font-awesome.min.css';


const OBTENER_RES_COMPONENTES_CU_TARIFA= gql`
query obtenerRes_componentes_cu_tarifa{
obtenerRes_componentes_cu_tarifa{
id
creador
anho
mes
qc
pc
ref_g
max_g
cr
ad
aj
pb
gc
tx
dtun_nt1_e
dtun_nt1_c
dtun_nt1_p
dtun_nt2
dtun_nt3
cdi_100
cdi_50
cdm
cd4
cd3
cd2
dnt1
dnt2
dnt3
dnt4
crs
rcal
r
iprstn
pr_nt1
pr_nt2
pr_nt3
pr_nt4
cer
cfm
rc
ul_trim_val_mme
anho_ul_trim_val_mme
sub1
sub2
n_sub1
m_sub2
facturacion_t
r1
r2
sup_def
cfs
cfe
c_ast
cvr
cv
cu_nt1_100
cu_nt1_50
cu_nt1_0
cu_nt2
cu_nt3
cu_nt4
nt1_100_estrato_1_men_cs
nt1_100_estrato_2_men_cs
nt1_100_estrato_3_men_cs
nt1_100_estrato_4_men_cs
nt1_100_estrato_5_men_cs
nt1_100_estrato_6_men_cs
nt1_100_estrato_4
nt1_100_estrato_5
nt1_100_estrato_6
nt1_100_c
nt1_100_i_con_c
nt1_100_i_sin_c
nt1_100_p
nt1_100_o
nt1_50_estrato_1_men_cs
nt1_50_estrato_2_men_cs
nt1_50_estrato_3_men_cs
nt1_50_estrato_4_men_cs
nt1_50_estrato_5_men_cs
nt1_50_estrato_6_men_cs
nt1_50_estrato_4
nt1_50_estrato_5
nt1_50_estrato_6
nt1_50_c
nt1_50_i_con_c
nt1_50_i_sin_c
nt1_50_p
nt1_50_o
nt1_0_estrato_1_men_cs
nt1_0_estrato_2_men_cs
nt1_0_estrato_3_men_cs
nt1_0_estrato_4_men_cs
nt1_0_estrato_5_men_cs
nt1_0_estrato_6_men_cs
nt1_0_estrato_4
nt1_0_estrato_5
nt1_0_estrato_6
nt1_0_c
nt1_0_i_con_c
nt1_0_i_sin_c
nt1_0_p
nt1_0_o
nt2_c
nt2_i_con_c
nt2_i_sin_c
nt2_o
nt2_ap
nt2_bsnmen_cs
nt2_bsnmay_cs
nt3_c
nt3_i_con_c
nt3_i_sin_c
nt3_o
nt3_ap
empresa_id
cu_nt1_100_ot
cu_nt1_50_ot
cu_nt1_0_ot
cu_nt2_ot
cu_nt3_ot
saldo_nt1_100_ot
saldo_nt1_50_ot
saldo_nt1_0_ot
saldo_nt2_ot
saldo_nt3_ot
pv
giro_sobrante
ultimo_giro_incluido
}
}
`;

const Res_componentes_cu_tarifa= () => {
const { data, error, loading} = useQuery(OBTENER_RES_COMPONENTES_CU_TARIFA);
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
{ name: "Id", field: "id", sortable: true},{ name: "creador", field: "creador", sortable: true},{ name: "Anho", field: "anho", sortable: true},
{ name: "Mes", field: "mes", sortable: true},{ name: "Qc", field: "qc", sortable: true},{ name: "Pc", field: "pc", sortable: true},
{ name: "Ref_G", field: "ref_g", sortable: true},{ name: "Max_G", field: "max_g", sortable: true},{ name: "Cr", field: "cr", sortable: true},
{ name: "Ad", field: "ad", sortable: true},{ name: "Aj", field: "aj", sortable: true},{ name: "Pb", field: "pb", sortable: true},
{ name: "Gc", field: "gc", sortable: true},{ name: "Tx", field: "tx", sortable: true},{ name: "Dtun_Nt1_E", field: "dtun_nt1_e", sortable: true},
{ name: "Dtun_Nt1_C", field: "dtun_nt1_c", sortable: true},{ name: "Dtun_Nt1_P", field: "dtun_nt1_p", sortable: true},{ name: "Dtun_Nt2", field: "dtun_nt2", sortable: true},
{ name: "Dtun_Nt3", field: "dtun_nt3", sortable: true},{ name: "Cdi_100", field: "cdi_100", sortable: true},{ name: "Cdi_50", field: "cdi_50", sortable: true},
{ name: "Cdm", field: "cdm", sortable: true},{ name: "Cd4", field: "cd4", sortable: true},{ name: "Cd3", field: "cd3", sortable: true},
{ name: "Cd2", field: "cd2", sortable: true},{ name: "Dnt1", field: "dnt1", sortable: true},{ name: "Dnt2", field: "dnt2", sortable: true},
{ name: "Dnt3", field: "dnt3", sortable: true},{ name: "Dnt4", field: "dnt4", sortable: true},{ name: "Crs", field: "crs", sortable: true},
{ name: "Rcal", field: "rcal", sortable: true},{ name: "R", field: "r", sortable: true},{ name: "Iprstn", field: "iprstn", sortable: true},
{ name: "Pr_Nt1", field: "pr_nt1", sortable: true},{ name: "Pr_Nt2", field: "pr_nt2", sortable: true},{ name: "Pr_Nt3", field: "pr_nt3", sortable: true},
{ name: "Pr_Nt4", field: "pr_nt4", sortable: true},{ name: "Cer", field: "cer", sortable: true},{ name: "Cfm", field: "cfm", sortable: true},
{ name: "Rc", field: "rc", sortable: true},{ name: "Ul_Trim_Val_Mme", field: "ul_trim_val_mme", sortable: true},
{ name: "Anho_Ul_Trim_Val_Mme", field: "anho_ul_trim_val_mme", sortable: true},{ name: "Sub1", field: "sub1", sortable: true},
{ name: "Sub2", field: "sub2", sortable: true},{ name: "N_Sub1", field: "n_sub1", sortable: true},{ name: "M_Sub2", field: "m_sub2", sortable: true},
{ name: "Facturacion_T", field: "facturacion_t", sortable: true},{ name: "R1", field: "r1", sortable: true},{ name: "R2", field: "r2", sortable: true},
{ name: "Sup_Def", field: "sup_def", sortable: true},{ name: "Cfs", field: "cfs", sortable: true},{ name: "Cfe", field: "cfe", sortable: true},
{ name: "C_Ast", field: "c_ast", sortable: true},{ name: "Cvr", field: "cvr", sortable: true},{ name: "Cv", field: "cv", sortable: true},
{ name: "Cu_Nt1_100", field: "cu_nt1_100", sortable: true},{ name: "Cu_Nt1_50", field: "cu_nt1_50", sortable: true},
{ name: "Cu_Nt1_0", field: "cu_nt1_0", sortable: true},{ name: "Cu_Nt2", field: "cu_nt2", sortable: true},
{ name: "Cu_Nt3", field: "cu_nt3", sortable: true},
{ name: "Cu_Nt1_100_ot", field: "cu_nt1_100_ot", sortable: true},{ name: "Cu_Nt1_50_ot", field: "cu_nt1_50_ot", sortable: true},
{ name: "Cu_Nt1_0_ot", field: "cu_nt1_0_ot", sortable: true},{ name: "Cu_Nt2_ot", field: "cu_nt2_ot", sortable: true},
{ name: "Cu_Nt3_ot", field: "cu_nt3_ot", sortable: true},
{ name: "Saldo_Nt1_100_ot", field: "saldo_nt1_100_ot", sortable: true},{ name: "Saldo_Nt1_50_ot", field: "saldo_nt1_50_ot", sortable: true},
{ name: "Saldo_Nt1_0_ot", field: "saldo_nt1_0_ot", sortable: true},{ name: "Saldo_Nt2_ot", field: "saldo_nt2_ot", sortable: true},
{ name: "Saldo_Nt3_ot", field: "saldo_nt3_ot", sortable: true},
{ name: "PV", field: "pv", sortable: true},
{ name: "Nt1_100_Estrato_1_Men_Cs", field: "nt1_100_estrato_1_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_2_Men_Cs", field: "nt1_100_estrato_2_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_3_Men_Cs", field: "nt1_100_estrato_3_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_4_Men_Cs", field: "nt1_100_estrato_4_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_5_Men_Cs", field: "nt1_100_estrato_5_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_6_Men_Cs", field: "nt1_100_estrato_6_men_cs", sortable: true},
{ name: "Nt1_100_Estrato_4", field: "nt1_100_estrato_4", sortable: true},{ name: "Nt1_100_Estrato_5", field: "nt1_100_estrato_5", sortable: true},
{ name: "Nt1_100_Estrato_6", field: "nt1_100_estrato_6", sortable: true},{ name: "Nt1_100_C", field: "nt1_100_c", sortable: true},
{ name: "Nt1_100_I_Con_C", field: "nt1_100_i_con_c", sortable: true},{ name: "Nt1_100_I_Sin_C", field: "nt1_100_i_sin_c", sortable: true},
{ name: "Nt1_100_P", field: "nt1_100_p", sortable: true},{ name: "Nt1_100_O", field: "nt1_100_o", sortable: true},
{ name: "Nt1_50_Estrato_1_Men_Cs", field: "nt1_50_estrato_1_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_2_Men_Cs", field: "nt1_50_estrato_2_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_3_Men_Cs", field: "nt1_50_estrato_3_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_4_Men_Cs", field: "nt1_50_estrato_4_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_5_Men_Cs", field: "nt1_50_estrato_5_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_6_Men_Cs", field: "nt1_50_estrato_6_men_cs", sortable: true},
{ name: "Nt1_50_Estrato_4", field: "nt1_50_estrato_4", sortable: true},
{ name: "Nt1_50_Estrato_5", field: "nt1_50_estrato_5", sortable: true},
{ name: "Nt1_50_Estrato_6", field: "nt1_50_estrato_6", sortable: true},
{ name: "Nt1_50_C", field: "nt1_50_c", sortable: true},{ name: "Nt1_50_I_Con_C", field: "nt1_50_i_con_c", sortable: true},
{ name: "Nt1_50_I_Sin_C", field: "nt1_50_i_sin_c", sortable: true},{ name: "Nt1_50_P", field: "nt1_50_p", sortable: true},
{ name: "Nt1_50_O", field: "nt1_50_o", sortable: true},{ name: "Nt1_0_Estrato_1_Men_Cs", field: "nt1_0_estrato_1_men_cs", sortable: true},
{ name: "Nt1_0_Estrato_2_Men_Cs", field: "nt1_0_estrato_2_men_cs", sortable: true},{ name: "Nt1_0_Estrato_3_Men_Cs", field: "nt1_0_estrato_3_men_cs", sortable: true},
{ name: "Nt1_0_Estrato_4_Men_Cs", field: "nt1_0_estrato_4_men_cs", sortable: true},{ name: "Nt1_0_Estrato_5_Men_Cs", field: "nt1_0_estrato_5_men_cs", sortable: true},
{ name: "Nt1_0_Estrato_6_Men_Cs", field: "nt1_0_estrato_6_men_cs", sortable: true},{ name: "Nt1_0_Estrato_4", field: "nt1_0_estrato_4", sortable: true},
{ name: "Nt1_0_Estrato_5", field: "nt1_0_estrato_5", sortable: true},{ name: "Nt1_0_Estrato_6", field: "nt1_0_estrato_6", sortable: true},
{ name: "Nt1_0_C", field: "nt1_0_c", sortable: true},{ name: "Nt1_0_I_Con_C", field: "nt1_0_i_con_c", sortable: true},
{ name: "Nt1_0_I_Sin_C", field: "nt1_0_i_sin_c", sortable: true},{ name: "Nt1_0_P", field: "nt1_0_p", sortable: true},
{ name: "Nt1_0_O", field: "nt1_0_o", sortable: true},{ name: "Nt2_C", field: "nt2_c", sortable: true},{ name: "Nt2_I_Con_C", field: "nt2_i_con_c", sortable: true},
{ name: "Nt2_I_Sin_C", field: "nt2_i_sin_c", sortable: true},{ name: "Nt2_O", field: "nt2_o", sortable: true},{ name: "Nt2_Ap", field: "nt2_ap", sortable: true},
{ name: "Nt2_Bsnmen_Cs", field: "nt2_bsnmen_cs", sortable: true},{ name: "Nt2_Bsnmay_Cs", field: "nt2_bsnmay_cs", sortable: true},
{ name: "Nt3_C", field: "nt3_c", sortable: true},{ name: "Nt3_I_Con_C", field: "nt3_i_con_c", sortable: true},{ name: "Nt3_I_Sin_C", field: "nt3_i_sin_c", sortable: true},
{ name: "Nt3_O", field: "nt3_o", sortable: true},{ name: "Nt3_Ap", field: "nt3_ap", sortable: true},{ name: "empresa_id", field: "empresa_id", sortable: true},
{ name: "giro_sobrante", field: "giro_sobrante", sortable: true},{ name: "ultimo_giro_incluido", field: "ultimo_giro_incluido", sortable: true}

];
useEffect(() => {
if(loading) return 'Cargando....';
setComments(data.obtenerRes_componentes_cu_tarifa);
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
<dt>Historico CU y Tarifas Calculadas</dt>
</div>
<div className="card-body shadow ">
<div className="card-body shadow">
<div className="overflow-x-scroll">
<div className="row w-100">
<div className="col mb-3 col-12 text-center">
<div className="row"></div>
<div className="col-md-6">
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
<td>{comment.anho}</td>
<td>{comment.mes}</td>
<td>{comment.qc}</td>
<td>{comment.pc}</td>
<td>{comment.ref_g}</td>
<td>{comment.max_g}</td>
<td>{comment.cr}</td>
<td>{comment.ad}</td>
<td>{comment.aj}</td>
<td>{comment.pb}</td>
<td>{comment.tx}</td>
<td>{comment.dtun_nt1_e}</td>
<td>{comment.dtun_nt1_c}</td>
<td>{comment.dtun_nt1_p}</td>
<td>{comment.dtun_nt2}</td>
<td>{comment.dtun_nt3}</td>
<td>{comment.cdi_100}</td>
<td>{comment.cdi_50}</td>
<td>{comment.cdm}</td>
<td>{comment.cd4}</td>
<td>{comment.cd3}</td>
<td>{comment.cd2}</td>
<td>{comment.dnt1}</td>
<td>{comment.dnt2}</td>
<td>{comment.dnt3}</td>
<td>{comment.dnt4}</td>
<td>{comment.crs}</td>
<td>{comment.rcal}</td>
<td>{comment.r}</td>
<td>{comment.iprstn}</td>
<td>{comment.pr_nt1}</td>
<td>{comment.pr_nt2}</td>
<td>{comment.pr_nt3}</td>
<td>{comment.pr_nt4}</td>
<td>{comment.cer}</td>
<td>{comment.cfm}</td>
<td>{comment.rc}</td>
<td>{comment.ul_trim_val_mme}</td>
<td>{comment.anho_ul_trim_val_mme}</td>
<td>{comment.sub1}</td>
<td>{comment.sub2}</td>
<td>{comment.n_sub1}</td>
<td>{comment.m_sub2}</td>
<td>{comment.facturacion_t}</td>
<td>{comment.r1}</td>
<td>{comment.r2}</td>
<td>{comment.sup_def}</td>
<td>{comment.cfs}</td>
<td>{comment.cfe}</td>
<td>{comment.c_ast}</td>
<td>{comment.cvr}</td>
<td>{comment.cv}</td>
<td>{comment.cu_nt1_100}</td>
<td>{comment.cu_nt1_50}</td>
<td>{comment.cu_nt1_0}</td>
<td>{comment.cu_nt2}</td>
<td>{comment.cu_nt3}</td>
<td>{comment.cu_nt4}</td>
<td>{comment.cu_nt1_100_ot}</td>
<td>{comment.cu_nt1_50_ot}</td>
<td>{comment.cu_nt1_0_ot}</td>
<td>{comment.cu_nt2_ot}</td>
<td>{comment.cu_nt3_ot}</td>
<td>{comment.pv}</td>
<td>{comment.saldo_nt1_100_ot}</td>
<td>{comment.saldo_nt1_50_ot}</td>
<td>{comment.saldo_nt1_0_ot}</td>
<td>{comment.saldo_nt2_ot}</td>
<td>{comment.saldo_nt3_ot}</td>
<td>{comment.nt1_100_estrato_1_men_cs}</td>
<td>{comment.nt1_100_estrato_2_men_cs}</td>
<td>{comment.nt1_100_estrato_3_men_cs}</td>
<td>{comment.nt1_100_estrato_4_men_cs}</td>
<td>{comment.nt1_100_estrato_5_men_cs}</td>
<td>{comment.nt1_100_estrato_6_men_cs}</td>
<td>{comment.nt1_100_estrato_4}</td>
<td>{comment.nt1_100_estrato_5}</td>
<td>{comment.nt1_100_estrato_6}</td>
<td>{comment.nt1_100_c}</td>
<td>{comment.nt1_100_i_con_c}</td>
<td>{comment.nt1_100_i_sin_c}</td>
<td>{comment.nt1_100_p}</td>
<td>{comment.nt1_100_o}</td>
<td>{comment.nt1_50_estrato_1_men_cs}</td>
<td>{comment.nt1_50_estrato_2_men_cs}</td>
<td>{comment.nt1_50_estrato_3_men_cs}</td>
<td>{comment.nt1_50_estrato_4_men_cs}</td>
<td>{comment.nt1_50_estrato_5_men_cs}</td>
<td>{comment.nt1_50_estrato_6_men_cs}</td>
<td>{comment.nt1_50_estrato_4}</td>
<td>{comment.nt1_50_estrato_5}</td>
<td>{comment.nt1_50_estrato_6}</td>
<td>{comment.nt1_50_c}</td>
<td>{comment.nt1_50_i_con_c}</td>
<td>{comment.nt1_50_i_sin_c}</td>
<td>{comment.nt1_50_p}</td>
<td>{comment.nt1_50_o}</td>
<td>{comment.nt1_0_estrato_1_men_cs}</td>
<td>{comment.nt1_0_estrato_2_men_cs}</td>
<td>{comment.nt1_0_estrato_3_men_cs}</td>
<td>{comment.nt1_0_estrato_4_men_cs}</td>
<td>{comment.nt1_0_estrato_5_men_cs}</td>
<td>{comment.nt1_0_estrato_6_men_cs}</td>
<td>{comment.nt1_0_estrato_4}</td>
<td>{comment.nt1_0_estrato_5}</td>
<td>{comment.nt1_0_estrato_6}</td>
<td>{comment.nt1_0_c}</td>
<td>{comment.nt1_0_i_con_c}</td>
<td>{comment.nt1_0_i_sin_c}</td>
<td>{comment.nt1_0_p}</td>
<td>{comment.nt1_0_o}</td>
<td>{comment.nt2_c}</td>
<td>{comment.nt2_i_con_c}</td>
<td>{comment.nt2_i_sin_c}</td>
<td>{comment.nt2_o}</td>
<td>{comment.nt2_ap}</td>
<td>{comment.nt2_bsnmen_cs}</td>
<td>{comment.nt2_bsnmay_cs}</td>
<td>{comment.nt3_c}</td>
<td>{comment.nt3_i_con_c}</td>
<td>{comment.nt3_i_sin_c}</td>
<td>{comment.nt3_o}</td>
<td>{comment.nt3_ap}</td>
<td>{comment.empresa_id}</td>
<td>{comment.giro_sobrante}</td>
<td>{comment.ultimo_giro_incluido}</td>
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
export default Res_componentes_cu_tarifa;

