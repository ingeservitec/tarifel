
import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import csv from 'csv';
import Swal from 'sweetalert2'

const NUEVO_DATA_XM_D015= gql`
mutation nuevoData_xm_d015($input:Data_xm_d015Input ){
nuevoData_xm_d015(input:$input){
id
creador
empresa_id
anho
mes
cargo_por_uso_dt1_cop_kwh
cargo_por_uso_dt2_cop_kwh
cargo_por_uso_dt3_cop_kwh
cargo_de_inversion_cdi1_cop_kwh
cargo_por_aom_cda1_cop_kwh
cargo_nivel_de_tension_cd2_cop_kwh
cargo_nivel_de_tension_cd3_cop_kwh
cargo_nivel_de_tension_cd3_2_cop_kwh
cargo_nivel_de_tension_cd4_cop_kwh
cargo_por_incentivos_dtcs_cop_kwh
fraccion_dtcs_cop_kwh
ia1
ia2
ia3
iaa1_cop
iaa2_cop
iaa3_cop
irm1_cop
irm2_cop
irm3_cop
fm
iaaom1_cop
iaaom2_cop
iaaom3_cop
aomni1_cop
aomni2_cop
aomni3_cop
ima_n1
ima_n2
ima_n3
imn_n1
imn_n2
imn_n3
aim_n1
aim_n2
aim_n3
naim_n1
naim_n2
naim_n3
fraccion_aim_n1_inversion
fraccion_aim_n1_aom
bra1_cop
bra2_cop
bra3_cop
brae1_cop
brae2_cop
brae3_cop
braen1_cop
braen2_cop
braen3_cop
rc1_cop
rc2_cop
rc3_cop
cdi_aj_1_cop2007_kwh
cd_aj_2_cop2007_kwh
cd_aj_3_cop2007_kwh
cdm_aj_1_cop2007_kwh
iapa1
iapa2
iapa3
iapa1_tant
iapa2_tant
iapa3_tant
oi1_cop
oj2_cop
oj3_cop
irespaldo1_cop
irespaldo2_cop
irespaldo3_cop
imunts1_cop
imunts2_cop
imunts3_cop
ireactiva1_cop
ireactiva2_cop
ireactiva3_cop
aombase1
aombase2
aombase3
brae1_tant_cop
brae2_tant_cop
brae3_tant_cop
deltabraenj_1_cop
deltabraenj_2_cop
deltabraenj_3_cop
deltaingj_1_cop
deltaingj_2_cop
deltaingj_3_cop
brt1_cop
brt2_cop
brt3_cop
rcbia1_cop
rcbia2_cop
rcbia3_cop
rcna1_cop
rcna2_cop
rcna3_cop
rcnafo1_cop
rcnafo2_cop
rcnafo3_cop
inve1_cop
inve2_cop
inve3_cop
inva1_cop
inva2_cop
inva3_cop
inva1_tant_cop
inva2_tant_cop
inva3_tant_cop
invr1_maximo_tant_cop
invr2_maximo_tant_cop
invr3_maximo_tant_cop
invr1_delta_cop
invr2_delta_cop
invr3_delta_cop
invr1_tant_cop
invr2_tant_cop
invr3_tant_cop
pr1
pr2
pr3
pj_1
pj_2
pj_3
pj_1_creg097
pj_2_creg097
pj_3_creg097
acumulado_eej1_kwh
acumulado_eej2_kwh
acumulado_eej3_kwh
acumulado_fej3_2_kwh
euj_2_creg097_kwh
fej3_2_creg097_kwh
ic_saidi_cop
ic_saifi_cop
conp_cop
vcdij_tant_kwh
vcinj_tant_kwh
vacpiec1
vacpiec2
vacpiec3
vacni1
vacni2
vacni3
r_tasa_retorno_actividad_distribucion
famb
css1_cop
css2_cop
css3_cop
dismining1_cop
dismining2_cop
dismining3_cop
}
}
`;
const OBTENER_DATA_XM_D015 = gql`
query obtenerData_xm_d015{
obtenerData_xm_d015{
id
creador
empresa_id
anho
mes
cargo_por_uso_dt1_cop_kwh
cargo_por_uso_dt2_cop_kwh
cargo_por_uso_dt3_cop_kwh
cargo_de_inversion_cdi1_cop_kwh
cargo_por_aom_cda1_cop_kwh
cargo_nivel_de_tension_cd2_cop_kwh
cargo_nivel_de_tension_cd3_cop_kwh
cargo_nivel_de_tension_cd3_2_cop_kwh
cargo_nivel_de_tension_cd4_cop_kwh
cargo_por_incentivos_dtcs_cop_kwh
fraccion_dtcs_cop_kwh
ia1
ia2
ia3
iaa1_cop
iaa2_cop
iaa3_cop
irm1_cop
irm2_cop
irm3_cop
fm
iaaom1_cop
iaaom2_cop
iaaom3_cop
aomni1_cop
aomni2_cop
aomni3_cop
ima_n1
ima_n2
ima_n3
imn_n1
imn_n2
imn_n3
aim_n1
aim_n2
aim_n3
naim_n1
naim_n2
naim_n3
fraccion_aim_n1_inversion
fraccion_aim_n1_aom
bra1_cop
bra2_cop
bra3_cop
brae1_cop
brae2_cop
brae3_cop
braen1_cop
braen2_cop
braen3_cop
rc1_cop
rc2_cop
rc3_cop
cdi_aj_1_cop2007_kwh
cd_aj_2_cop2007_kwh
cd_aj_3_cop2007_kwh
cdm_aj_1_cop2007_kwh
iapa1
iapa2
iapa3
iapa1_tant
iapa2_tant
iapa3_tant
oi1_cop
oj2_cop
oj3_cop
irespaldo1_cop
irespaldo2_cop
irespaldo3_cop
imunts1_cop
imunts2_cop
imunts3_cop
ireactiva1_cop
ireactiva2_cop
ireactiva3_cop
aombase1
aombase2
aombase3
brae1_tant_cop
brae2_tant_cop
brae3_tant_cop
deltabraenj_1_cop
deltabraenj_2_cop
deltabraenj_3_cop
deltaingj_1_cop
deltaingj_2_cop
deltaingj_3_cop
brt1_cop
brt2_cop
brt3_cop
rcbia1_cop
rcbia2_cop
rcbia3_cop
rcna1_cop
rcna2_cop
rcna3_cop
rcnafo1_cop
rcnafo2_cop
rcnafo3_cop
inve1_cop
inve2_cop
inve3_cop
inva1_cop
inva2_cop
inva3_cop
inva1_tant_cop
inva2_tant_cop
inva3_tant_cop
invr1_maximo_tant_cop
invr2_maximo_tant_cop
invr3_maximo_tant_cop
invr1_delta_cop
invr2_delta_cop
invr3_delta_cop
invr1_tant_cop
invr2_tant_cop
invr3_tant_cop
pr1
pr2
pr3
pj_1
pj_2
pj_3
pj_1_creg097
pj_2_creg097
pj_3_creg097
acumulado_eej1_kwh
acumulado_eej2_kwh
acumulado_eej3_kwh
acumulado_fej3_2_kwh
euj_2_creg097_kwh
fej3_2_creg097_kwh
ic_saidi_cop
ic_saifi_cop
conp_cop
vcdij_tant_kwh
vcinj_tant_kwh
vacpiec1
vacpiec2
vacpiec3
vacni1
vacni2
vacni3
r_tasa_retorno_actividad_distribucion
famb
css1_cop
css2_cop
css3_cop
dismining1_cop
dismining2_cop
dismining3_cop

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


const NuevoData_xm_d015= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [cargo_por_uso_dt1_cop_kwh, setCargo_Por_Uso_Dt1_Cop_Kwh] = useState("");const [cargo_por_uso_dt2_cop_kwh, setCargo_Por_Uso_Dt2_Cop_Kwh] = useState("");const [cargo_por_uso_dt3_cop_kwh, setCargo_Por_Uso_Dt3_Cop_Kwh] = useState("");const [cargo_de_inversion_cdi1_cop_kwh, setCargo_De_Inversion_Cdi1_Cop_Kwh] = useState("");const [cargo_por_aom_cda1_cop_kwh, setCargo_Por_Aom_Cda1_Cop_Kwh] = useState("");const [cargo_nivel_de_tension_cd2_cop_kwh, setCargo_Nivel_De_Tension_Cd2_Cop_Kwh] = useState("");const [cargo_nivel_de_tension_cd3_cop_kwh, setCargo_Nivel_De_Tension_Cd3_Cop_Kwh] = useState("");const [cargo_nivel_de_tension_cd3_2_cop_kwh, setCargo_Nivel_De_Tension_Cd3_2_Cop_Kwh] = useState("");const [cargo_nivel_de_tension_cd4_cop_kwh, setCargo_Nivel_De_Tension_Cd4_Cop_Kwh] = useState("");const [cargo_por_incentivos_dtcs_cop_kwh, setCargo_Por_Incentivos_Dtcs_Cop_Kwh] = useState("");const [fraccion_dtcs_cop_kwh, setFraccion_Dtcs_Cop_Kwh] = useState("");const [ia1, setIa1] = useState("");const [ia2, setIa2] = useState("");const [ia3, setIa3] = useState("");const [iaa1_cop, setIaa1_Cop] = useState("");const [iaa2_cop, setIaa2_Cop] = useState("");const [iaa3_cop, setIaa3_Cop] = useState("");const [irm1_cop, setIrm1_Cop] = useState("");const [irm2_cop, setIrm2_Cop] = useState("");const [irm3_cop, setIrm3_Cop] = useState("");const [fm, setFm] = useState("");const [iaaom1_cop, setIaaom1_Cop] = useState("");const [iaaom2_cop, setIaaom2_Cop] = useState("");const [iaaom3_cop, setIaaom3_Cop] = useState("");const [aomni1_cop, setAomni1_Cop] = useState("");const [aomni2_cop, setAomni2_Cop] = useState("");const [aomni3_cop, setAomni3_Cop] = useState("");const [ima_n1, setIma_N1] = useState("");const [ima_n2, setIma_N2] = useState("");const [ima_n3, setIma_N3] = useState("");const [imn_n1, setImn_N1] = useState("");const [imn_n2, setImn_N2] = useState("");const [imn_n3, setImn_N3] = useState("");const [aim_n1, setAim_N1] = useState("");const [aim_n2, setAim_N2] = useState("");const [aim_n3, setAim_N3] = useState("");const [naim_n1, setNaim_N1] = useState("");const [naim_n2, setNaim_N2] = useState("");const [naim_n3, setNaim_N3] = useState("");const [fraccion_aim_n1_inversion, setFraccion_Aim_N1_Inversion] = useState("");const [fraccion_aim_n1_aom, setFraccion_Aim_N1_Aom] = useState("");const [bra1_cop, setBra1_Cop] = useState("");const [bra2_cop, setBra2_Cop] = useState("");const [bra3_cop, setBra3_Cop] = useState("");const [brae1_cop, setBrae1_Cop] = useState("");const [brae2_cop, setBrae2_Cop] = useState("");const [brae3_cop, setBrae3_Cop] = useState("");const [braen1_cop, setBraen1_Cop] = useState("");const [braen2_cop, setBraen2_Cop] = useState("");const [braen3_cop, setBraen3_Cop] = useState("");const [rc1_cop, setRc1_Cop] = useState("");const [rc2_cop, setRc2_Cop] = useState("");const [rc3_cop, setRc3_Cop] = useState("");const [cdi_aj_1_cop2007_kwh, setCdi_Aj_1_Cop2007_Kwh] = useState("");const [cd_aj_2_cop2007_kwh, setCd_Aj_2_Cop2007_Kwh] = useState("");const [cd_aj_3_cop2007_kwh, setCd_Aj_3_Cop2007_Kwh] = useState("");const [cdm_aj_1_cop2007_kwh, setCdm_Aj_1_Cop2007_Kwh] = useState("");const [iapa1, setIapa1] = useState("");const [iapa2, setIapa2] = useState("");const [iapa3, setIapa3] = useState("");const [iapa1_tant, setIapa1_Tant] = useState("");const [iapa2_tant, setIapa2_Tant] = useState("");const [iapa3_tant, setIapa3_Tant] = useState("");const [oi1_cop, setOi1_Cop] = useState("");const [oj2_cop, setOj2_Cop] = useState("");const [oj3_cop, setOj3_Cop] = useState("");const [irespaldo1_cop, setIrespaldo1_Cop] = useState("");const [irespaldo2_cop, setIrespaldo2_Cop] = useState("");const [irespaldo3_cop, setIrespaldo3_Cop] = useState("");const [imunts1_cop, setImunts1_Cop] = useState("");const [imunts2_cop, setImunts2_Cop] = useState("");const [imunts3_cop, setImunts3_Cop] = useState("");const [ireactiva1_cop, setIreactiva1_Cop] = useState("");const [ireactiva2_cop, setIreactiva2_Cop] = useState("");const [ireactiva3_cop, setIreactiva3_Cop] = useState("");const [aombase1, setAombase1] = useState("");const [aombase2, setAombase2] = useState("");const [aombase3, setAombase3] = useState("");const [brae1_tant_cop, setBrae1_Tant_Cop] = useState("");const [brae2_tant_cop, setBrae2_Tant_Cop] = useState("");const [brae3_tant_cop, setBrae3_Tant_Cop] = useState("");const [deltabraenj_1_cop, setDeltabraenj_1_Cop] = useState("");const [deltabraenj_2_cop, setDeltabraenj_2_Cop] = useState("");const [deltabraenj_3_cop, setDeltabraenj_3_Cop] = useState("");const [deltaingj_1_cop, setDeltaingj_1_Cop] = useState("");const [deltaingj_2_cop, setDeltaingj_2_Cop] = useState("");const [deltaingj_3_cop, setDeltaingj_3_Cop] = useState("");const [brt1_cop, setBrt1_Cop] = useState("");const [brt2_cop, setBrt2_Cop] = useState("");const [brt3_cop, setBrt3_Cop] = useState("");const [rcbia1_cop, setRcbia1_Cop] = useState("");const [rcbia2_cop, setRcbia2_Cop] = useState("");const [rcbia3_cop, setRcbia3_Cop] = useState("");const [rcna1_cop, setRcna1_Cop] = useState("");const [rcna2_cop, setRcna2_Cop] = useState("");const [rcna3_cop, setRcna3_Cop] = useState("");const [rcnafo1_cop, setRcnafo1_Cop] = useState("");const [rcnafo2_cop, setRcnafo2_Cop] = useState("");const [rcnafo3_cop, setRcnafo3_Cop] = useState("");const [inve1_cop, setInve1_Cop] = useState("");const [inve2_cop, setInve2_Cop] = useState("");const [inve3_cop, setInve3_Cop] = useState("");const [inva1_cop, setInva1_Cop] = useState("");const [inva2_cop, setInva2_Cop] = useState("");const [inva3_cop, setInva3_Cop] = useState("");const [inva1_tant_cop, setInva1_Tant_Cop] = useState("");const [inva2_tant_cop, setInva2_Tant_Cop] = useState("");const [inva3_tant_cop, setInva3_Tant_Cop] = useState("");const [invr1_maximo_tant_cop, setInvr1_Máximo_Tant_Cop] = useState("");const [invr2_maximo_tant_cop, setInvr2_Máximo_Tant_Cop] = useState("");const [invr3_maximo_tant_cop, setInvr3_Máximo_Tant_Cop] = useState("");const [invr1_delta_cop, setInvr1_Delta_Cop] = useState("");
const [nuevoData_xm_d015]=useMutation(NUEVO_DATA_XM_D015, {
update(cache, { data: { nuevoData_xm_d015} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_xm_d015} = cache.readQuery({ query: OBTENER_DATA_XM_D015});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_XM_D015,
data: {
obtenerData_xm_d015: [...obtenerData_xm_d015, nuevoData_xm_d015]
}
})
}
})
const onDrop = useCallback(acceptedFiles => {
setFileNames(acceptedFiles.map(file => file.name));
const reader = new FileReader();
reader.onabort = () => console.log("file reading was aborted");
reader.onerror = () => console.log("file reading failed");
reader.onload = () => {
// Parse CSV file
csv.parse(reader.result, (err, data) => {
console.log("Parsed CSV data: ", data);
setDatacsv(data)
});
};
// read file contents
acceptedFiles.forEach(file => reader.readAsBinaryString(file));
}, []);
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
function csvJSON(csv2){
var lines=csv2
var result = [];
var headers=lines[0].toString().split(";");
var encabezados=lines[0].toString().split(";");
for(var i=1;i<lines.length;i++){
var obj = {};
var currentline=lines[i].toString().split(";")
for(var j=0;j<headers.length +2;j++){
if (j ==0){
obj['creador'] = (creador)
}
if (j ==1){
obj['empresa_id'] = (empresa_id)
}
if (j >1){
if (encabezados[j-2] === 'empresa_id' )
obj[headers[j-2]] = (currentline[j-2]);
else{
obj[headers[j-2]] = parseFloat(currentline[j-2]);
}
}

}
result.push(obj);
}
//return result; //JavaScript object
// parseFloat()
return result; //JSON
}



const formik=useFormik({
initialValues: {
creador:creador,empresa_id:empresa_id,anho:anho,mes:mes,cargo_por_uso_dt1_cop_kwh:cargo_por_uso_dt1_cop_kwh,cargo_por_uso_dt2_cop_kwh:cargo_por_uso_dt2_cop_kwh,cargo_por_uso_dt3_cop_kwh:cargo_por_uso_dt3_cop_kwh,cargo_de_inversion_cdi1_cop_kwh:cargo_de_inversion_cdi1_cop_kwh,cargo_por_aom_cda1_cop_kwh:cargo_por_aom_cda1_cop_kwh,cargo_nivel_de_tension_cd2_cop_kwh:cargo_nivel_de_tension_cd2_cop_kwh,cargo_nivel_de_tension_cd3_cop_kwh:cargo_nivel_de_tension_cd3_cop_kwh,cargo_nivel_de_tension_cd3_2_cop_kwh:cargo_nivel_de_tension_cd3_2_cop_kwh,cargo_nivel_de_tension_cd4_cop_kwh:cargo_nivel_de_tension_cd4_cop_kwh,cargo_por_incentivos_dtcs_cop_kwh:cargo_por_incentivos_dtcs_cop_kwh,fraccion_dtcs_cop_kwh:fraccion_dtcs_cop_kwh,ia1:ia1,ia2:ia2,ia3:ia3,iaa1_cop:iaa1_cop,iaa2_cop:iaa2_cop,iaa3_cop:iaa3_cop,irm1_cop:irm1_cop,irm2_cop:irm2_cop,irm3_cop:irm3_cop,fm:fm,iaaom1_cop:iaaom1_cop,iaaom2_cop:iaaom2_cop,iaaom3_cop:iaaom3_cop,aomni1_cop:aomni1_cop,aomni2_cop:aomni2_cop,aomni3_cop:aomni3_cop,ima_n1:ima_n1,ima_n2:ima_n2,ima_n3:ima_n3,imn_n1:imn_n1,imn_n2:imn_n2,imn_n3:imn_n3,aim_n1:aim_n1,aim_n2:aim_n2,aim_n3:aim_n3,naim_n1:naim_n1,naim_n2:naim_n2,naim_n3:naim_n3,fraccion_aim_n1_inversion:fraccion_aim_n1_inversion,fraccion_aim_n1_aom:fraccion_aim_n1_aom,bra1_cop:bra1_cop,bra2_cop:bra2_cop,bra3_cop:bra3_cop,brae1_cop:brae1_cop,brae2_cop:brae2_cop,brae3_cop:brae3_cop,braen1_cop:braen1_cop,braen2_cop:braen2_cop,braen3_cop:braen3_cop,rc1_cop:rc1_cop,rc2_cop:rc2_cop,rc3_cop:rc3_cop,cdi_aj_1_cop2007_kwh:cdi_aj_1_cop2007_kwh,cd_aj_2_cop2007_kwh:cd_aj_2_cop2007_kwh,cd_aj_3_cop2007_kwh:cd_aj_3_cop2007_kwh,cdm_aj_1_cop2007_kwh:cdm_aj_1_cop2007_kwh,iapa1:iapa1,iapa2:iapa2,iapa3:iapa3,iapa1_tant:iapa1_tant,iapa2_tant:iapa2_tant,iapa3_tant:iapa3_tant,oi1_cop:oi1_cop,oj2_cop:oj2_cop,oj3_cop:oj3_cop,irespaldo1_cop:irespaldo1_cop,irespaldo2_cop:irespaldo2_cop,irespaldo3_cop:irespaldo3_cop,imunts1_cop:imunts1_cop,imunts2_cop:imunts2_cop,imunts3_cop:imunts3_cop,ireactiva1_cop:ireactiva1_cop,ireactiva2_cop:ireactiva2_cop,ireactiva3_cop:ireactiva3_cop,aombase1:aombase1,aombase2:aombase2,aombase3:aombase3,brae1_tant_cop:brae1_tant_cop,brae2_tant_cop:brae2_tant_cop,brae3_tant_cop:brae3_tant_cop,deltabraenj_1_cop:deltabraenj_1_cop,deltabraenj_2_cop:deltabraenj_2_cop,deltabraenj_3_cop:deltabraenj_3_cop,deltaingj_1_cop:deltaingj_1_cop,deltaingj_2_cop:deltaingj_2_cop,deltaingj_3_cop:deltaingj_3_cop,brt1_cop:brt1_cop,brt2_cop:brt2_cop,brt3_cop:brt3_cop,rcbia1_cop:rcbia1_cop,rcbia2_cop:rcbia2_cop,rcbia3_cop:rcbia3_cop,rcna1_cop:rcna1_cop,rcna2_cop:rcna2_cop,rcna3_cop:rcna3_cop,rcnafo1_cop:rcnafo1_cop,rcnafo2_cop:rcnafo2_cop,rcnafo3_cop:rcnafo3_cop,inve1_cop:inve1_cop,inve2_cop:inve2_cop,inve3_cop:inve3_cop,inva1_cop:inva1_cop,inva2_cop:inva2_cop,inva3_cop:inva3_cop,inva1_tant_cop:inva1_tant_cop,inva2_tant_cop:inva2_tant_cop,inva3_tant_cop:inva3_tant_cop,invr1_maximo_tant_cop:invr1_maximo_tant_cop,invr2_maximo_tant_cop:invr2_maximo_tant_cop,invr3_maximo_tant_cop:invr3_maximo_tant_cop,invr1_delta_cop:invr1_delta_cop
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
anho: Yup.string()
.required('El Año es obligatorio')
}),
onSubmit: async valores => {
const{creador,empresa_id,anho,mes,cargo_por_uso_dt1_cop_kwh,cargo_por_uso_dt2_cop_kwh,cargo_por_uso_dt3_cop_kwh,cargo_de_inversion_cdi1_cop_kwh,cargo_por_aom_cda1_cop_kwh,cargo_nivel_de_tension_cd2_cop_kwh,cargo_nivel_de_tension_cd3_cop_kwh,cargo_nivel_de_tension_cd3_2_cop_kwh,cargo_nivel_de_tension_cd4_cop_kwh,cargo_por_incentivos_dtcs_cop_kwh,fraccion_dtcs_cop_kwh,ia1,ia2,ia3,iaa1_cop,iaa2_cop,iaa3_cop,irm1_cop,irm2_cop,irm3_cop,fm,iaaom1_cop,iaaom2_cop,iaaom3_cop,aomni1_cop,aomni2_cop,aomni3_cop,ima_n1,ima_n2,ima_n3,imn_n1,imn_n2,imn_n3,aim_n1,aim_n2,aim_n3,naim_n1,naim_n2,naim_n3,fraccion_aim_n1_inversion,fraccion_aim_n1_aom,bra1_cop,bra2_cop,bra3_cop,brae1_cop,brae2_cop,brae3_cop,braen1_cop,braen2_cop,braen3_cop,rc1_cop,rc2_cop,rc3_cop,cdi_aj_1_cop2007_kwh,cd_aj_2_cop2007_kwh,cd_aj_3_cop2007_kwh,cdm_aj_1_cop2007_kwh,iapa1,iapa2,iapa3,iapa1_tant,iapa2_tant,iapa3_tant,oi1_cop,oj2_cop,oj3_cop,irespaldo1_cop,irespaldo2_cop,irespaldo3_cop,imunts1_cop,imunts2_cop,imunts3_cop,ireactiva1_cop,ireactiva2_cop,ireactiva3_cop,aombase1,aombase2,aombase3,brae1_tant_cop,brae2_tant_cop,brae3_tant_cop,deltabraenj_1_cop,deltabraenj_2_cop,deltabraenj_3_cop,deltaingj_1_cop,deltaingj_2_cop,deltaingj_3_cop,brt1_cop,brt2_cop,brt3_cop,rcbia1_cop,rcbia2_cop,rcbia3_cop,rcna1_cop,rcna2_cop,rcna3_cop,rcnafo1_cop,rcnafo2_cop,rcnafo3_cop,inve1_cop,inve2_cop,inve3_cop,inva1_cop,inva2_cop,inva3_cop,inva1_tant_cop,inva2_tant_cop,inva3_tant_cop,invr1_maximo_tant_cop,invr2_maximo_tant_cop,invr3_maximo_tant_cop,invr1_delta_cop}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_xm_d015({
variables:{
input:{
creador,empresa_id,anho,mes,cargo_por_uso_dt1_cop_kwh,cargo_por_uso_dt2_cop_kwh,cargo_por_uso_dt3_cop_kwh,cargo_de_inversion_cdi1_cop_kwh,cargo_por_aom_cda1_cop_kwh,cargo_nivel_de_tension_cd2_cop_kwh,cargo_nivel_de_tension_cd3_cop_kwh,cargo_nivel_de_tension_cd3_2_cop_kwh,cargo_nivel_de_tension_cd4_cop_kwh,cargo_por_incentivos_dtcs_cop_kwh,fraccion_dtcs_cop_kwh,ia1,ia2,ia3,iaa1_cop,iaa2_cop,iaa3_cop,irm1_cop,irm2_cop,irm3_cop,fm,iaaom1_cop,iaaom2_cop,iaaom3_cop,aomni1_cop,aomni2_cop,aomni3_cop,ima_n1,ima_n2,ima_n3,imn_n1,imn_n2,imn_n3,aim_n1,aim_n2,aim_n3,naim_n1,naim_n2,naim_n3,fraccion_aim_n1_inversion,fraccion_aim_n1_aom,bra1_cop,bra2_cop,bra3_cop,brae1_cop,brae2_cop,brae3_cop,braen1_cop,braen2_cop,braen3_cop,rc1_cop,rc2_cop,rc3_cop,cdi_aj_1_cop2007_kwh,cd_aj_2_cop2007_kwh,cd_aj_3_cop2007_kwh,cdm_aj_1_cop2007_kwh,iapa1,iapa2,iapa3,iapa1_tant,iapa2_tant,iapa3_tant,oi1_cop,oj2_cop,oj3_cop,irespaldo1_cop,irespaldo2_cop,irespaldo3_cop,imunts1_cop,imunts2_cop,imunts3_cop,ireactiva1_cop,ireactiva2_cop,ireactiva3_cop,aombase1,aombase2,aombase3,brae1_tant_cop,brae2_tant_cop,brae3_tant_cop,deltabraenj_1_cop,deltabraenj_2_cop,deltabraenj_3_cop,deltaingj_1_cop,deltaingj_2_cop,deltaingj_3_cop,brt1_cop,brt2_cop,brt3_cop,rcbia1_cop,rcbia2_cop,rcbia3_cop,rcna1_cop,rcna2_cop,rcna3_cop,rcnafo1_cop,rcnafo2_cop,rcnafo3_cop,inve1_cop,inve2_cop,inve3_cop,inva1_cop,inva2_cop,inva3_cop,inva1_tant_cop,inva2_tant_cop,inva3_tant_cop,invr1_maximo_tant_cop,invr2_maximo_tant_cop,invr3_maximo_tant_cop,invr1_delta_cop
}
}
});
} catch (error) {
console.log(error);
}
}
})

useEffect(() => {
if (datacsv) {
var Position=(datacsv[0].indexOf(("Anho").toString()))
           setAnho(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Mes").toString()))
           setMes(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Cargo_Por_Uso_Dt1_Cop_Kwh").toString()))
           setCargo_Por_Uso_Dt1_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_por_uso_dt2_cop_kwh").toString()))
           setCargo_Por_Uso_Dt2_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_por_uso_dt3_cop_kwh").toString()))
           setCargo_Por_Uso_Dt3_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_de_inversion_cdi1_cop_kwh").toString()))
           setCargo_De_Inversion_Cdi1_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_por_aom_cda1_cop_kwh").toString()))
           setCargo_Por_Aom_Cda1_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_nivel_de_tension_cd2_cop_kwh").toString()))
           setCargo_Nivel_De_Tension_Cd2_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_nivel_de_tension_cd3_cop_kwh").toString()))
           setCargo_Nivel_De_Tension_Cd3_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_nivel_de_tension_cd3_2_cop_kwh").toString()))
           setCargo_Nivel_De_Tension_Cd3_2_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_nivel_de_tension_cd4_cop_kwh").toString()))
           setCargo_Nivel_De_Tension_Cd4_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_por_incentivos_dtcs_cop_kwh").toString()))
           setCargo_Por_Incentivos_Dtcs_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("fraccion_dtcs_cop_kwh").toString()))
           setFraccion_Dtcs_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("ia1").toString()))
           setIa1(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("ia2").toString()))
           setIa2(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("ia3").toString()))
           setIa3(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("iaa1_cop").toString()))
           setIaa1_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("iaa2_cop").toString()))
           setIaa2_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("iaa3_cop").toString()))
           setIaa3_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("irm1_cop").toString()))
           setIrm1_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("irm2_cop").toString()))
           setIrm2_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("irm3_cop").toString()))
           setIrm3_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("fm").toString()))
           setFm(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("iaaom1_cop").toString()))
           setIaaom1_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("iaaom2_cop").toString()))
           setIaaom2_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("iaaom3_cop").toString()))
           setIaaom3_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("aomni1_cop").toString()))
           setAomni1_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("aomni2_cop").toString()))
           setAomni2_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("aomni3_cop").toString()))
           setAomni3_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("ima_n1").toString()))
           setIma_N1(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("ima_n2").toString()))
           setIma_N2(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("ima_n3").toString()))
           setIma_N3(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("imn_n1").toString()))
           setImn_N1(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("imn_n2").toString()))
           setImn_N2(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("imn_n3").toString()))
           setImn_N3(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("aim_n1").toString()))
           setAim_N1(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("aim_n2").toString()))
           setAim_N2(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("aim_n3").toString()))
           setAim_N3(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("naim_n1").toString()))
           setNaim_N1(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("naim_n2").toString()))
           setNaim_N2(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("naim_n3").toString()))
           setNaim_N3(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("fraccion_aim_n1_inversion").toString()))
           setFraccion_Aim_N1_Inversion(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("fraccion_aim_n1_aom").toString()))
           setFraccion_Aim_N1_Aom(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("bra1_cop").toString()))
           setBra1_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("bra2_cop").toString()))
           setBra2_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("bra3_cop").toString()))
           setBra3_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("brae1_cop").toString()))
           setBrae1_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("brae2_cop").toString()))
           setBrae2_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("brae3_cop").toString()))
           setBrae3_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("braen1_cop").toString()))
           setBraen1_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("braen2_cop").toString()))
           setBraen2_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("braen3_cop").toString()))
           setBraen3_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("rc1_cop").toString()))
           setRc1_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("rc2_cop").toString()))
           setRc2_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("rc3_cop").toString()))
           setRc3_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cdi_aj_1_cop2007_kwh").toString()))
           setCdi_Aj_1_Cop2007_Kwh(parseFloat(datacsv[1][Position]));
} else {
}
}, [datacsv])

useEffect(() => {
if(loading1) return null;
setcreador(parseInt(data1.obtenerUsuario.id));
setempresa_id(data1.obtenerUsuario.empresa);
console.log(empresa_id)
}, [loading1])
return (
<div>
<Modal show={props.show}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
id="myModal"
onHide={props.close}>
<Modal.Header closeButton>
<Modal.Title>Adicionar datos a tabla Dataxm_d015</Modal.Title>
</Modal.Header>
<Modal.Body>
<div>
<div className="card col-sm m-2">
<div className="App" {...getRootProps()}>
<input {...getInputProps()} />
<p>Arrastre algun archivo aqui o haga click para cargar</p>
<div>
<p className="font-italic h6 ">Archivos cargados:</p>
<ul>
{fileNames.map(fileName => (
<li key={fileName}>{fileName}</li>
))}
</ul>
</div>
</div>
</div>
</div>
<form
onSubmit={formik.handleSubmit}
>
<div className="form-group row">
        <label htmlFor="creador"className="col-sm-7 col-form-label">creador</label><div className="col-sm-5">
        <input type="number" className="form-control" id="creador" placeholder="creador"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.creador}></input></div></div>
        { formik.touched.creador&& formik.errors.creador? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.creador}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="empresa_id"className="col-sm-7 col-form-label">empresa_id</label><div className="col-sm-5">
        <input type="text" className="form-control" id="empresa_id" placeholder="empresa_id"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.empresa_id ?
      formik.values.empresa_id.charAt(0).toUpperCase() + formik.values.empresa_id.slice(1):''}readOnly></input></div></div>
        { formik.touched.empresa_id&& formik.errors.empresa_id? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.empresa_id}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="anho"className="col-sm-7 col-form-label">Anho</label><div className="col-sm-5">
        <input type="number" className="form-control" id="anho" placeholder="Anho"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.anho}></input></div></div>
        { formik.touched.anho&& formik.errors.anho? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.anho}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="mes"className="col-sm-7 col-form-label">Mes</label><div className="col-sm-5">
        <input type="number" className="form-control" id="mes" placeholder="Mes"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.mes}></input></div></div>
        { formik.touched.mes&& formik.errors.mes? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.mes}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_por_uso_dt1_cop_kwh"className="col-sm-7 col-form-label">Cargo_Por_Uso_Dt1_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_por_uso_dt1_cop_kwh" placeholder="Cargo_Por_Uso_Dt1_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_por_uso_dt1_cop_kwh}></input></div></div>
        { formik.touched.cargo_por_uso_dt1_cop_kwh&& formik.errors.cargo_por_uso_dt1_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_por_uso_dt1_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_por_uso_dt2_cop_kwh"className="col-sm-7 col-form-label">Cargo_Por_Uso_Dt2_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_por_uso_dt2_cop_kwh" placeholder="Cargo_Por_Uso_Dt2_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_por_uso_dt2_cop_kwh}></input></div></div>
        { formik.touched.cargo_por_uso_dt2_cop_kwh&& formik.errors.cargo_por_uso_dt2_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_por_uso_dt2_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_por_uso_dt3_cop_kwh"className="col-sm-7 col-form-label">Cargo_Por_Uso_Dt3_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_por_uso_dt3_cop_kwh" placeholder="Cargo_Por_Uso_Dt3_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_por_uso_dt3_cop_kwh}></input></div></div>
        { formik.touched.cargo_por_uso_dt3_cop_kwh&& formik.errors.cargo_por_uso_dt3_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_por_uso_dt3_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_de_inversion_cdi1_cop_kwh"className="col-sm-7 col-form-label">Cargo_De_Inversion_Cdi1_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_de_inversion_cdi1_cop_kwh" placeholder="Cargo_De_Inversion_Cdi1_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_de_inversion_cdi1_cop_kwh}></input></div></div>
        { formik.touched.cargo_de_inversion_cdi1_cop_kwh&& formik.errors.cargo_de_inversion_cdi1_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_de_inversion_cdi1_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_por_aom_cda1_cop_kwh"className="col-sm-7 col-form-label">Cargo_Por_Aom_Cda1_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_por_aom_cda1_cop_kwh" placeholder="Cargo_Por_Aom_Cda1_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_por_aom_cda1_cop_kwh}></input></div></div>
        { formik.touched.cargo_por_aom_cda1_cop_kwh&& formik.errors.cargo_por_aom_cda1_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_por_aom_cda1_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_nivel_de_tension_cd2_cop_kwh"className="col-sm-7 col-form-label">Cargo_Nivel_De_Tension_Cd2_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_nivel_de_tension_cd2_cop_kwh" placeholder="Cargo_Nivel_De_Tension_Cd2_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_nivel_de_tension_cd2_cop_kwh}></input></div></div>
        { formik.touched.cargo_nivel_de_tension_cd2_cop_kwh&& formik.errors.cargo_nivel_de_tension_cd2_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_nivel_de_tension_cd2_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_nivel_de_tension_cd3_cop_kwh"className="col-sm-7 col-form-label">Cargo_Nivel_De_Tension_Cd3_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_nivel_de_tension_cd3_cop_kwh" placeholder="Cargo_Nivel_De_Tension_Cd3_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_nivel_de_tension_cd3_cop_kwh}></input></div></div>
        { formik.touched.cargo_nivel_de_tension_cd3_cop_kwh&& formik.errors.cargo_nivel_de_tension_cd3_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_nivel_de_tension_cd3_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_nivel_de_tension_cd3_2_cop_kwh"className="col-sm-7 col-form-label">Cargo_Nivel_De_Tension_Cd3_2_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_nivel_de_tension_cd3_2_cop_kwh" placeholder="Cargo_Nivel_De_Tension_Cd3_2_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_nivel_de_tension_cd3_2_cop_kwh}></input></div></div>
        { formik.touched.cargo_nivel_de_tension_cd3_2_cop_kwh&& formik.errors.cargo_nivel_de_tension_cd3_2_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_nivel_de_tension_cd3_2_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_nivel_de_tension_cd4_cop_kwh"className="col-sm-7 col-form-label">Cargo_Nivel_De_Tension_Cd4_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_nivel_de_tension_cd4_cop_kwh" placeholder="Cargo_Nivel_De_Tension_Cd4_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_nivel_de_tension_cd4_cop_kwh}></input></div></div>
        { formik.touched.cargo_nivel_de_tension_cd4_cop_kwh&& formik.errors.cargo_nivel_de_tension_cd4_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_nivel_de_tension_cd4_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_por_incentivos_dtcs_cop_kwh"className="col-sm-7 col-form-label">Cargo_Por_Incentivos_Dtcs_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_por_incentivos_dtcs_cop_kwh" placeholder="Cargo_Por_Incentivos_Dtcs_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_por_incentivos_dtcs_cop_kwh}></input></div></div>
        { formik.touched.cargo_por_incentivos_dtcs_cop_kwh&& formik.errors.cargo_por_incentivos_dtcs_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cargo_por_incentivos_dtcs_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="fraccion_dtcs_cop_kwh"className="col-sm-7 col-form-label">Fraccion_Dtcs_Cop_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="fraccion_dtcs_cop_kwh" placeholder="Fraccion_Dtcs_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fraccion_dtcs_cop_kwh}></input></div></div>
        { formik.touched.fraccion_dtcs_cop_kwh&& formik.errors.fraccion_dtcs_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fraccion_dtcs_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ia1"className="col-sm-7 col-form-label">Ia1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ia1" placeholder="Ia1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ia1}></input></div></div>
        { formik.touched.ia1&& formik.errors.ia1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ia1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ia2"className="col-sm-7 col-form-label">Ia2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ia2" placeholder="Ia2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ia2}></input></div></div>
        { formik.touched.ia2&& formik.errors.ia2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ia2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ia3"className="col-sm-7 col-form-label">Ia3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ia3" placeholder="Ia3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ia3}></input></div></div>
        { formik.touched.ia3&& formik.errors.ia3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ia3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iaa1_cop"className="col-sm-7 col-form-label">Iaa1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iaa1_cop" placeholder="Iaa1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iaa1_cop}></input></div></div>
        { formik.touched.iaa1_cop&& formik.errors.iaa1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iaa1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iaa2_cop"className="col-sm-7 col-form-label">Iaa2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iaa2_cop" placeholder="Iaa2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iaa2_cop}></input></div></div>
        { formik.touched.iaa2_cop&& formik.errors.iaa2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iaa2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iaa3_cop"className="col-sm-7 col-form-label">Iaa3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iaa3_cop" placeholder="Iaa3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iaa3_cop}></input></div></div>
        { formik.touched.iaa3_cop&& formik.errors.iaa3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iaa3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="irm1_cop"className="col-sm-7 col-form-label">Irm1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="irm1_cop" placeholder="Irm1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.irm1_cop}></input></div></div>
        { formik.touched.irm1_cop&& formik.errors.irm1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.irm1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="irm2_cop"className="col-sm-7 col-form-label">Irm2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="irm2_cop" placeholder="Irm2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.irm2_cop}></input></div></div>
        { formik.touched.irm2_cop&& formik.errors.irm2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.irm2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="irm3_cop"className="col-sm-7 col-form-label">Irm3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="irm3_cop" placeholder="Irm3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.irm3_cop}></input></div></div>
        { formik.touched.irm3_cop&& formik.errors.irm3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.irm3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="fm"className="col-sm-7 col-form-label">Fm</label><div className="col-sm-5">
        <input type="number" className="form-control" id="fm" placeholder="Fm"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fm}></input></div></div>
        { formik.touched.fm&& formik.errors.fm? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fm}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iaaom1_cop"className="col-sm-7 col-form-label">Iaaom1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iaaom1_cop" placeholder="Iaaom1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iaaom1_cop}></input></div></div>
        { formik.touched.iaaom1_cop&& formik.errors.iaaom1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iaaom1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iaaom2_cop"className="col-sm-7 col-form-label">Iaaom2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iaaom2_cop" placeholder="Iaaom2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iaaom2_cop}></input></div></div>
        { formik.touched.iaaom2_cop&& formik.errors.iaaom2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iaaom2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iaaom3_cop"className="col-sm-7 col-form-label">Iaaom3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iaaom3_cop" placeholder="Iaaom3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iaaom3_cop}></input></div></div>
        { formik.touched.iaaom3_cop&& formik.errors.iaaom3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iaaom3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="aomni1_cop"className="col-sm-7 col-form-label">Aomni1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aomni1_cop" placeholder="Aomni1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aomni1_cop}></input></div></div>
        { formik.touched.aomni1_cop&& formik.errors.aomni1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aomni1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="aomni2_cop"className="col-sm-7 col-form-label">Aomni2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aomni2_cop" placeholder="Aomni2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aomni2_cop}></input></div></div>
        { formik.touched.aomni2_cop&& formik.errors.aomni2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aomni2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="aomni3_cop"className="col-sm-7 col-form-label">Aomni3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aomni3_cop" placeholder="Aomni3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aomni3_cop}></input></div></div>
        { formik.touched.aomni3_cop&& formik.errors.aomni3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aomni3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ima_n1"className="col-sm-7 col-form-label">Ima_N1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ima_n1" placeholder="Ima_N1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ima_n1}></input></div></div>
        { formik.touched.ima_n1&& formik.errors.ima_n1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ima_n1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ima_n2"className="col-sm-7 col-form-label">Ima_N2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ima_n2" placeholder="Ima_N2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ima_n2}></input></div></div>
        { formik.touched.ima_n2&& formik.errors.ima_n2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ima_n2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ima_n3"className="col-sm-7 col-form-label">Ima_N3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ima_n3" placeholder="Ima_N3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ima_n3}></input></div></div>
        { formik.touched.ima_n3&& formik.errors.ima_n3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ima_n3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="imn_n1"className="col-sm-7 col-form-label">Imn_N1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="imn_n1" placeholder="Imn_N1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.imn_n1}></input></div></div>
        { formik.touched.imn_n1&& formik.errors.imn_n1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.imn_n1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="imn_n2"className="col-sm-7 col-form-label">Imn_N2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="imn_n2" placeholder="Imn_N2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.imn_n2}></input></div></div>
        { formik.touched.imn_n2&& formik.errors.imn_n2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.imn_n2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="imn_n3"className="col-sm-7 col-form-label">Imn_N3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="imn_n3" placeholder="Imn_N3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.imn_n3}></input></div></div>
        { formik.touched.imn_n3&& formik.errors.imn_n3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.imn_n3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="aim_n1"className="col-sm-7 col-form-label">Aim_N1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aim_n1" placeholder="Aim_N1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aim_n1}></input></div></div>
        { formik.touched.aim_n1&& formik.errors.aim_n1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aim_n1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="aim_n2"className="col-sm-7 col-form-label">Aim_N2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aim_n2" placeholder="Aim_N2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aim_n2}></input></div></div>
        { formik.touched.aim_n2&& formik.errors.aim_n2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aim_n2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="aim_n3"className="col-sm-7 col-form-label">Aim_N3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aim_n3" placeholder="Aim_N3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aim_n3}></input></div></div>
        { formik.touched.aim_n3&& formik.errors.aim_n3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aim_n3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="naim_n1"className="col-sm-7 col-form-label">Naim_N1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="naim_n1" placeholder="Naim_N1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.naim_n1}></input></div></div>
        { formik.touched.naim_n1&& formik.errors.naim_n1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.naim_n1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="naim_n2"className="col-sm-7 col-form-label">Naim_N2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="naim_n2" placeholder="Naim_N2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.naim_n2}></input></div></div>
        { formik.touched.naim_n2&& formik.errors.naim_n2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.naim_n2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="naim_n3"className="col-sm-7 col-form-label">Naim_N3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="naim_n3" placeholder="Naim_N3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.naim_n3}></input></div></div>
        { formik.touched.naim_n3&& formik.errors.naim_n3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.naim_n3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="fraccion_aim_n1_inversion"className="col-sm-7 col-form-label">Fraccion_Aim_N1_Inversion</label><div className="col-sm-5">
        <input type="number" className="form-control" id="fraccion_aim_n1_inversion" placeholder="Fraccion_Aim_N1_Inversion"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fraccion_aim_n1_inversion}></input></div></div>
        { formik.touched.fraccion_aim_n1_inversion&& formik.errors.fraccion_aim_n1_inversion? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fraccion_aim_n1_inversion}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="fraccion_aim_n1_aom"className="col-sm-7 col-form-label">Fraccion_Aim_N1_Aom</label><div className="col-sm-5">
        <input type="number" className="form-control" id="fraccion_aim_n1_aom" placeholder="Fraccion_Aim_N1_Aom"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fraccion_aim_n1_aom}></input></div></div>
        { formik.touched.fraccion_aim_n1_aom&& formik.errors.fraccion_aim_n1_aom? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fraccion_aim_n1_aom}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="bra1_cop"className="col-sm-7 col-form-label">Bra1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="bra1_cop" placeholder="Bra1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.bra1_cop}></input></div></div>
        { formik.touched.bra1_cop&& formik.errors.bra1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.bra1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="bra2_cop"className="col-sm-7 col-form-label">Bra2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="bra2_cop" placeholder="Bra2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.bra2_cop}></input></div></div>
        { formik.touched.bra2_cop&& formik.errors.bra2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.bra2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="bra3_cop"className="col-sm-7 col-form-label">Bra3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="bra3_cop" placeholder="Bra3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.bra3_cop}></input></div></div>
        { formik.touched.bra3_cop&& formik.errors.bra3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.bra3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brae1_cop"className="col-sm-7 col-form-label">Brae1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brae1_cop" placeholder="Brae1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brae1_cop}></input></div></div>
        { formik.touched.brae1_cop&& formik.errors.brae1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brae1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brae2_cop"className="col-sm-7 col-form-label">Brae2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brae2_cop" placeholder="Brae2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brae2_cop}></input></div></div>
        { formik.touched.brae2_cop&& formik.errors.brae2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brae2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brae3_cop"className="col-sm-7 col-form-label">Brae3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brae3_cop" placeholder="Brae3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brae3_cop}></input></div></div>
        { formik.touched.brae3_cop&& formik.errors.brae3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brae3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="braen1_cop"className="col-sm-7 col-form-label">Braen1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="braen1_cop" placeholder="Braen1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.braen1_cop}></input></div></div>
        { formik.touched.braen1_cop&& formik.errors.braen1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.braen1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="braen2_cop"className="col-sm-7 col-form-label">Braen2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="braen2_cop" placeholder="Braen2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.braen2_cop}></input></div></div>
        { formik.touched.braen2_cop&& formik.errors.braen2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.braen2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="braen3_cop"className="col-sm-7 col-form-label">Braen3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="braen3_cop" placeholder="Braen3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.braen3_cop}></input></div></div>
        { formik.touched.braen3_cop&& formik.errors.braen3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.braen3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rc1_cop"className="col-sm-7 col-form-label">Rc1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rc1_cop" placeholder="Rc1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rc1_cop}></input></div></div>
        { formik.touched.rc1_cop&& formik.errors.rc1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rc1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rc2_cop"className="col-sm-7 col-form-label">Rc2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rc2_cop" placeholder="Rc2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rc2_cop}></input></div></div>
        { formik.touched.rc2_cop&& formik.errors.rc2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rc2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rc3_cop"className="col-sm-7 col-form-label">Rc3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rc3_cop" placeholder="Rc3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rc3_cop}></input></div></div>
        { formik.touched.rc3_cop&& formik.errors.rc3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rc3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cdi_aj_1_cop2007_kwh"className="col-sm-7 col-form-label">Cdi_Aj_1_Cop2007_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cdi_aj_1_cop2007_kwh" placeholder="Cdi_Aj_1_Cop2007_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cdi_aj_1_cop2007_kwh}></input></div></div>
        { formik.touched.cdi_aj_1_cop2007_kwh&& formik.errors.cdi_aj_1_cop2007_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cdi_aj_1_cop2007_kwh}</p>
        </div>
        ) : null  }
        <div className="form-group row">
        <label htmlFor="cd_aj_2_cop2007_kwh"className="col-sm-7 col-form-label">Cd_Aj_2_Cop2007_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cd_aj_2_cop2007_kwh" placeholder="Cd_Aj_2_Cop2007_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cd_aj_2_cop2007_kwh}></input></div></div>
        { formik.touched.cd_aj_2_cop2007_kwh&& formik.errors.cd_aj_2_cop2007_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cd_aj_2_cop2007_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cd_aj_3_cop2007_kwh"className="col-sm-7 col-form-label">Cd_Aj_3_Cop2007_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cd_aj_3_cop2007_kwh" placeholder="Cd_Aj_3_Cop2007_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cd_aj_3_cop2007_kwh}></input></div></div>
        { formik.touched.cd_aj_3_cop2007_kwh&& formik.errors.cd_aj_3_cop2007_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cd_aj_3_cop2007_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cdm_aj_1_cop2007_kwh"className="col-sm-7 col-form-label">Cdm_Aj_1_Cop2007_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cdm_aj_1_cop2007_kwh" placeholder="Cdm_Aj_1_Cop2007_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cdm_aj_1_cop2007_kwh}></input></div></div>
        { formik.touched.cdm_aj_1_cop2007_kwh&& formik.errors.cdm_aj_1_cop2007_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.cdm_aj_1_cop2007_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iapa1"className="col-sm-7 col-form-label">Iapa1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iapa1" placeholder="Iapa1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iapa1}></input></div></div>
        { formik.touched.iapa1&& formik.errors.iapa1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iapa1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iapa2"className="col-sm-7 col-form-label">Iapa2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iapa2" placeholder="Iapa2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iapa2}></input></div></div>
        { formik.touched.iapa2&& formik.errors.iapa2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iapa2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iapa3"className="col-sm-7 col-form-label">Iapa3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iapa3" placeholder="Iapa3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iapa3}></input></div></div>
        { formik.touched.iapa3&& formik.errors.iapa3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iapa3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iapa1_tant"className="col-sm-7 col-form-label">Iapa1_Tant</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iapa1_tant" placeholder="Iapa1_Tant"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iapa1_tant}></input></div></div>
        { formik.touched.iapa1_tant&& formik.errors.iapa1_tant? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iapa1_tant}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iapa2_tant"className="col-sm-7 col-form-label">Iapa2_Tant</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iapa2_tant" placeholder="Iapa2_Tant"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iapa2_tant}></input></div></div>
        { formik.touched.iapa2_tant&& formik.errors.iapa2_tant? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iapa2_tant}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="iapa3_tant"className="col-sm-7 col-form-label">Iapa3_Tant</label><div className="col-sm-5">
        <input type="number" className="form-control" id="iapa3_tant" placeholder="Iapa3_Tant"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.iapa3_tant}></input></div></div>
        { formik.touched.iapa3_tant&& formik.errors.iapa3_tant? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.iapa3_tant}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="oi1_cop"className="col-sm-7 col-form-label">Oi1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="oi1_cop" placeholder="Oi1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.oi1_cop}></input></div></div>
        { formik.touched.oi1_cop&& formik.errors.oi1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.oi1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="oj2_cop"className="col-sm-7 col-form-label">Oj2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="oj2_cop" placeholder="Oj2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.oj2_cop}></input></div></div>
        { formik.touched.oj2_cop&& formik.errors.oj2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.oj2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="oj3_cop"className="col-sm-7 col-form-label">Oj3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="oj3_cop" placeholder="Oj3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.oj3_cop}></input></div></div>
        { formik.touched.oj3_cop&& formik.errors.oj3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.oj3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="irespaldo1_cop"className="col-sm-7 col-form-label">Irespaldo1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="irespaldo1_cop" placeholder="Irespaldo1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.irespaldo1_cop}></input></div></div>
        { formik.touched.irespaldo1_cop&& formik.errors.irespaldo1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.irespaldo1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="irespaldo2_cop"className="col-sm-7 col-form-label">Irespaldo2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="irespaldo2_cop" placeholder="Irespaldo2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.irespaldo2_cop}></input></div></div>
        { formik.touched.irespaldo2_cop&& formik.errors.irespaldo2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.irespaldo2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="irespaldo3_cop"className="col-sm-7 col-form-label">Irespaldo3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="irespaldo3_cop" placeholder="Irespaldo3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.irespaldo3_cop}></input></div></div>
        { formik.touched.irespaldo3_cop&& formik.errors.irespaldo3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.irespaldo3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="imunts1_cop"className="col-sm-7 col-form-label">Imunts1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="imunts1_cop" placeholder="Imunts1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.imunts1_cop}></input></div></div>
        { formik.touched.imunts1_cop&& formik.errors.imunts1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.imunts1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="imunts2_cop"className="col-sm-7 col-form-label">Imunts2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="imunts2_cop" placeholder="Imunts2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.imunts2_cop}></input></div></div>
        { formik.touched.imunts2_cop&& formik.errors.imunts2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.imunts2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="imunts3_cop"className="col-sm-7 col-form-label">Imunts3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="imunts3_cop" placeholder="Imunts3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.imunts3_cop}></input></div></div>
        { formik.touched.imunts3_cop&& formik.errors.imunts3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.imunts3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ireactiva1_cop"className="col-sm-7 col-form-label">Ireactiva1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ireactiva1_cop" placeholder="Ireactiva1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ireactiva1_cop}></input></div></div>
        { formik.touched.ireactiva1_cop&& formik.errors.ireactiva1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ireactiva1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ireactiva2_cop"className="col-sm-7 col-form-label">Ireactiva2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ireactiva2_cop" placeholder="Ireactiva2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ireactiva2_cop}></input></div></div>
        { formik.touched.ireactiva2_cop&& formik.errors.ireactiva2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ireactiva2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ireactiva3_cop"className="col-sm-7 col-form-label">Ireactiva3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ireactiva3_cop" placeholder="Ireactiva3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ireactiva3_cop}></input></div></div>
        { formik.touched.ireactiva3_cop&& formik.errors.ireactiva3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ireactiva3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="aombase1"className="col-sm-7 col-form-label">Aombase1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aombase1" placeholder="Aombase1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aombase1}></input></div></div>
        { formik.touched.aombase1&& formik.errors.aombase1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aombase1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="aombase2"className="col-sm-7 col-form-label">Aombase2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aombase2" placeholder="Aombase2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aombase2}></input></div></div>
        { formik.touched.aombase2&& formik.errors.aombase2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aombase2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="aombase3"className="col-sm-7 col-form-label">Aombase3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aombase3" placeholder="Aombase3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aombase3}></input></div></div>
        { formik.touched.aombase3&& formik.errors.aombase3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aombase3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brae1_tant_cop"className="col-sm-7 col-form-label">Brae1_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brae1_tant_cop" placeholder="Brae1_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brae1_tant_cop}></input></div></div>
        { formik.touched.brae1_tant_cop&& formik.errors.brae1_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brae1_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brae2_tant_cop"className="col-sm-7 col-form-label">Brae2_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brae2_tant_cop" placeholder="Brae2_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brae2_tant_cop}></input></div></div>
        { formik.touched.brae2_tant_cop&& formik.errors.brae2_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brae2_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brae3_tant_cop"className="col-sm-7 col-form-label">Brae3_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brae3_tant_cop" placeholder="Brae3_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brae3_tant_cop}></input></div></div>
        { formik.touched.brae3_tant_cop&& formik.errors.brae3_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brae3_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltabraenj_1_cop"className="col-sm-7 col-form-label">Deltabraenj_1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltabraenj_1_cop" placeholder="Deltabraenj_1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltabraenj_1_cop}></input></div></div>
        { formik.touched.deltabraenj_1_cop&& formik.errors.deltabraenj_1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltabraenj_1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltabraenj_2_cop"className="col-sm-7 col-form-label">Deltabraenj_2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltabraenj_2_cop" placeholder="Deltabraenj_2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltabraenj_2_cop}></input></div></div>
        { formik.touched.deltabraenj_2_cop&& formik.errors.deltabraenj_2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltabraenj_2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltabraenj_3_cop"className="col-sm-7 col-form-label">Deltabraenj_3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltabraenj_3_cop" placeholder="Deltabraenj_3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltabraenj_3_cop}></input></div></div>
        { formik.touched.deltabraenj_3_cop&& formik.errors.deltabraenj_3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltabraenj_3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltaingj_1_cop"className="col-sm-7 col-form-label">Deltaingj_1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltaingj_1_cop" placeholder="Deltaingj_1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltaingj_1_cop}></input></div></div>
        { formik.touched.deltaingj_1_cop&& formik.errors.deltaingj_1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltaingj_1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltaingj_2_cop"className="col-sm-7 col-form-label">Deltaingj_2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltaingj_2_cop" placeholder="Deltaingj_2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltaingj_2_cop}></input></div></div>
        { formik.touched.deltaingj_2_cop&& formik.errors.deltaingj_2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltaingj_2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltaingj_3_cop"className="col-sm-7 col-form-label">Deltaingj_3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltaingj_3_cop" placeholder="Deltaingj_3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltaingj_3_cop}></input></div></div>
        { formik.touched.deltaingj_3_cop&& formik.errors.deltaingj_3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltaingj_3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brt1_cop"className="col-sm-7 col-form-label">Brt1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brt1_cop" placeholder="Brt1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brt1_cop}></input></div></div>
        { formik.touched.brt1_cop&& formik.errors.brt1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brt1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brt2_cop"className="col-sm-7 col-form-label">Brt2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brt2_cop" placeholder="Brt2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brt2_cop}></input></div></div>
        { formik.touched.brt2_cop&& formik.errors.brt2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brt2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brt3_cop"className="col-sm-7 col-form-label">Brt3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brt3_cop" placeholder="Brt3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brt3_cop}></input></div></div>
        { formik.touched.brt3_cop&& formik.errors.brt3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brt3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcbia1_cop"className="col-sm-7 col-form-label">Rcbia1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcbia1_cop" placeholder="Rcbia1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcbia1_cop}></input></div></div>
        { formik.touched.rcbia1_cop&& formik.errors.rcbia1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcbia1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcbia2_cop"className="col-sm-7 col-form-label">Rcbia2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcbia2_cop" placeholder="Rcbia2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcbia2_cop}></input></div></div>
        { formik.touched.rcbia2_cop&& formik.errors.rcbia2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcbia2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcbia3_cop"className="col-sm-7 col-form-label">Rcbia3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcbia3_cop" placeholder="Rcbia3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcbia3_cop}></input></div></div>
        { formik.touched.rcbia3_cop&& formik.errors.rcbia3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcbia3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcna1_cop"className="col-sm-7 col-form-label">Rcna1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcna1_cop" placeholder="Rcna1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcna1_cop}></input></div></div>
        { formik.touched.rcna1_cop&& formik.errors.rcna1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcna1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcna2_cop"className="col-sm-7 col-form-label">Rcna2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcna2_cop" placeholder="Rcna2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcna2_cop}></input></div></div>
        { formik.touched.rcna2_cop&& formik.errors.rcna2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcna2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcna3_cop"className="col-sm-7 col-form-label">Rcna3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcna3_cop" placeholder="Rcna3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcna3_cop}></input></div></div>
        { formik.touched.rcna3_cop&& formik.errors.rcna3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcna3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcnafo1_cop"className="col-sm-7 col-form-label">Rcnafo1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcnafo1_cop" placeholder="Rcnafo1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcnafo1_cop}></input></div></div>
        { formik.touched.rcnafo1_cop&& formik.errors.rcnafo1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcnafo1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcnafo2_cop"className="col-sm-7 col-form-label">Rcnafo2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcnafo2_cop" placeholder="Rcnafo2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcnafo2_cop}></input></div></div>
        { formik.touched.rcnafo2_cop&& formik.errors.rcnafo2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcnafo2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcnafo3_cop"className="col-sm-7 col-form-label">Rcnafo3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcnafo3_cop" placeholder="Rcnafo3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcnafo3_cop}></input></div></div>
        { formik.touched.rcnafo3_cop&& formik.errors.rcnafo3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcnafo3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inve1_cop"className="col-sm-7 col-form-label">Inve1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inve1_cop" placeholder="Inve1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inve1_cop}></input></div></div>
        { formik.touched.inve1_cop&& formik.errors.inve1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inve1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inve2_cop"className="col-sm-7 col-form-label">Inve2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inve2_cop" placeholder="Inve2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inve2_cop}></input></div></div>
        { formik.touched.inve2_cop&& formik.errors.inve2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inve2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inve3_cop"className="col-sm-7 col-form-label">Inve3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inve3_cop" placeholder="Inve3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inve3_cop}></input></div></div>
        { formik.touched.inve3_cop&& formik.errors.inve3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inve3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva1_cop"className="col-sm-7 col-form-label">Inva1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva1_cop" placeholder="Inva1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva1_cop}></input></div></div>
        { formik.touched.inva1_cop&& formik.errors.inva1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva2_cop"className="col-sm-7 col-form-label">Inva2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva2_cop" placeholder="Inva2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva2_cop}></input></div></div>
        { formik.touched.inva2_cop&& formik.errors.inva2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva3_cop"className="col-sm-7 col-form-label">Inva3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva3_cop" placeholder="Inva3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva3_cop}></input></div></div>
        { formik.touched.inva3_cop&& formik.errors.inva3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva1_tant_cop"className="col-sm-7 col-form-label">Inva1_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva1_tant_cop" placeholder="Inva1_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva1_tant_cop}></input></div></div>
        { formik.touched.inva1_tant_cop&& formik.errors.inva1_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva1_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva2_tant_cop"className="col-sm-7 col-form-label">Inva2_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva2_tant_cop" placeholder="Inva2_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva2_tant_cop}></input></div></div>
        { formik.touched.inva2_tant_cop&& formik.errors.inva2_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva2_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva3_tant_cop"className="col-sm-7 col-form-label">Inva3_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva3_tant_cop" placeholder="Inva3_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva3_tant_cop}></input></div></div>
        { formik.touched.inva3_tant_cop&& formik.errors.inva3_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva3_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr1_maximo_tant_cop"className="col-sm-7 col-form-label">Invr1_Máximo_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr1_maximo_tant_cop" placeholder="Invr1_Máximo_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr1_maximo_tant_cop}></input></div></div>
        { formik.touched.invr1_maximo_tant_cop&& formik.errors.invr1_maximo_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr1_maximo_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr2_maximo_tant_cop"className="col-sm-7 col-form-label">Invr2_Máximo_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr2_maximo_tant_cop" placeholder="Invr2_Máximo_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr2_maximo_tant_cop}></input></div></div>
        { formik.touched.invr2_maximo_tant_cop&& formik.errors.invr2_maximo_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr2_maximo_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr3_maximo_tant_cop"className="col-sm-7 col-form-label">Invr3_Máximo_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr3_maximo_tant_cop" placeholder="Invr3_Máximo_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr3_maximo_tant_cop}></input></div></div>
        { formik.touched.invr3_maximo_tant_cop&& formik.errors.invr3_maximo_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr3_maximo_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr1_delta_cop"className="col-sm-7 col-form-label">Invr1_Delta_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr1_delta_cop" placeholder="Invr1_Delta_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr1_delta_cop}></input></div></div>
        { formik.touched.invr1_delta_cop&& formik.errors.invr1_delta_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr1_delta_cop}</p>
        </div>
        ) : null  }
        <div className="form-group row">
        <label htmlFor="aombase3"className="col-sm-7 col-form-label">Aombase3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="aombase3" placeholder="Aombase3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.aombase3}></input></div></div>
        { formik.touched.aombase3&& formik.errors.aombase3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.aombase3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brae1_tant_cop"className="col-sm-7 col-form-label">Brae1_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brae1_tant_cop" placeholder="Brae1_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brae1_tant_cop}></input></div></div>
        { formik.touched.brae1_tant_cop&& formik.errors.brae1_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brae1_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brae2_tant_cop"className="col-sm-7 col-form-label">Brae2_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brae2_tant_cop" placeholder="Brae2_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brae2_tant_cop}></input></div></div>
        { formik.touched.brae2_tant_cop&& formik.errors.brae2_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brae2_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brae3_tant_cop"className="col-sm-7 col-form-label">Brae3_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brae3_tant_cop" placeholder="Brae3_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brae3_tant_cop}></input></div></div>
        { formik.touched.brae3_tant_cop&& formik.errors.brae3_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brae3_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltabraenj_1_cop"className="col-sm-7 col-form-label">Deltabraenj_1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltabraenj_1_cop" placeholder="Deltabraenj_1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltabraenj_1_cop}></input></div></div>
        { formik.touched.deltabraenj_1_cop&& formik.errors.deltabraenj_1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltabraenj_1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltabraenj_2_cop"className="col-sm-7 col-form-label">Deltabraenj_2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltabraenj_2_cop" placeholder="Deltabraenj_2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltabraenj_2_cop}></input></div></div>
        { formik.touched.deltabraenj_2_cop&& formik.errors.deltabraenj_2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltabraenj_2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltabraenj_3_cop"className="col-sm-7 col-form-label">Deltabraenj_3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltabraenj_3_cop" placeholder="Deltabraenj_3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltabraenj_3_cop}></input></div></div>
        { formik.touched.deltabraenj_3_cop&& formik.errors.deltabraenj_3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltabraenj_3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltaingj_1_cop"className="col-sm-7 col-form-label">Deltaingj_1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltaingj_1_cop" placeholder="Deltaingj_1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltaingj_1_cop}></input></div></div>
        { formik.touched.deltaingj_1_cop&& formik.errors.deltaingj_1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltaingj_1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltaingj_2_cop"className="col-sm-7 col-form-label">Deltaingj_2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltaingj_2_cop" placeholder="Deltaingj_2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltaingj_2_cop}></input></div></div>
        { formik.touched.deltaingj_2_cop&& formik.errors.deltaingj_2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltaingj_2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="deltaingj_3_cop"className="col-sm-7 col-form-label">Deltaingj_3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="deltaingj_3_cop" placeholder="Deltaingj_3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.deltaingj_3_cop}></input></div></div>
        { formik.touched.deltaingj_3_cop&& formik.errors.deltaingj_3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.deltaingj_3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brt1_cop"className="col-sm-7 col-form-label">Brt1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brt1_cop" placeholder="Brt1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brt1_cop}></input></div></div>
        { formik.touched.brt1_cop&& formik.errors.brt1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brt1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brt2_cop"className="col-sm-7 col-form-label">Brt2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brt2_cop" placeholder="Brt2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brt2_cop}></input></div></div>
        { formik.touched.brt2_cop&& formik.errors.brt2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brt2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="brt3_cop"className="col-sm-7 col-form-label">Brt3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="brt3_cop" placeholder="Brt3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.brt3_cop}></input></div></div>
        { formik.touched.brt3_cop&& formik.errors.brt3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.brt3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcbia1_cop"className="col-sm-7 col-form-label">Rcbia1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcbia1_cop" placeholder="Rcbia1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcbia1_cop}></input></div></div>
        { formik.touched.rcbia1_cop&& formik.errors.rcbia1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcbia1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcbia2_cop"className="col-sm-7 col-form-label">Rcbia2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcbia2_cop" placeholder="Rcbia2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcbia2_cop}></input></div></div>
        { formik.touched.rcbia2_cop&& formik.errors.rcbia2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcbia2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcbia3_cop"className="col-sm-7 col-form-label">Rcbia3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcbia3_cop" placeholder="Rcbia3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcbia3_cop}></input></div></div>
        { formik.touched.rcbia3_cop&& formik.errors.rcbia3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcbia3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcna1_cop"className="col-sm-7 col-form-label">Rcna1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcna1_cop" placeholder="Rcna1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcna1_cop}></input></div></div>
        { formik.touched.rcna1_cop&& formik.errors.rcna1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcna1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcna2_cop"className="col-sm-7 col-form-label">Rcna2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcna2_cop" placeholder="Rcna2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcna2_cop}></input></div></div>
        { formik.touched.rcna2_cop&& formik.errors.rcna2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcna2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcna3_cop"className="col-sm-7 col-form-label">Rcna3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcna3_cop" placeholder="Rcna3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcna3_cop}></input></div></div>
        { formik.touched.rcna3_cop&& formik.errors.rcna3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcna3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcnafo1_cop"className="col-sm-7 col-form-label">Rcnafo1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcnafo1_cop" placeholder="Rcnafo1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcnafo1_cop}></input></div></div>
        { formik.touched.rcnafo1_cop&& formik.errors.rcnafo1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcnafo1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcnafo2_cop"className="col-sm-7 col-form-label">Rcnafo2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcnafo2_cop" placeholder="Rcnafo2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcnafo2_cop}></input></div></div>
        { formik.touched.rcnafo2_cop&& formik.errors.rcnafo2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcnafo2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="rcnafo3_cop"className="col-sm-7 col-form-label">Rcnafo3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="rcnafo3_cop" placeholder="Rcnafo3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.rcnafo3_cop}></input></div></div>
        { formik.touched.rcnafo3_cop&& formik.errors.rcnafo3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.rcnafo3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inve1_cop"className="col-sm-7 col-form-label">Inve1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inve1_cop" placeholder="Inve1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inve1_cop}></input></div></div>
        { formik.touched.inve1_cop&& formik.errors.inve1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inve1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inve2_cop"className="col-sm-7 col-form-label">Inve2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inve2_cop" placeholder="Inve2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inve2_cop}></input></div></div>
        { formik.touched.inve2_cop&& formik.errors.inve2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inve2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inve3_cop"className="col-sm-7 col-form-label">Inve3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inve3_cop" placeholder="Inve3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inve3_cop}></input></div></div>
        { formik.touched.inve3_cop&& formik.errors.inve3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inve3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva1_cop"className="col-sm-7 col-form-label">Inva1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva1_cop" placeholder="Inva1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva1_cop}></input></div></div>
        { formik.touched.inva1_cop&& formik.errors.inva1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva2_cop"className="col-sm-7 col-form-label">Inva2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva2_cop" placeholder="Inva2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva2_cop}></input></div></div>
        { formik.touched.inva2_cop&& formik.errors.inva2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva3_cop"className="col-sm-7 col-form-label">Inva3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva3_cop" placeholder="Inva3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva3_cop}></input></div></div>
        { formik.touched.inva3_cop&& formik.errors.inva3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva1_tant_cop"className="col-sm-7 col-form-label">Inva1_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva1_tant_cop" placeholder="Inva1_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva1_tant_cop}></input></div></div>
        { formik.touched.inva1_tant_cop&& formik.errors.inva1_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva1_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva2_tant_cop"className="col-sm-7 col-form-label">Inva2_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva2_tant_cop" placeholder="Inva2_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva2_tant_cop}></input></div></div>
        { formik.touched.inva2_tant_cop&& formik.errors.inva2_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva2_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="inva3_tant_cop"className="col-sm-7 col-form-label">Inva3_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="inva3_tant_cop" placeholder="Inva3_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.inva3_tant_cop}></input></div></div>
        { formik.touched.inva3_tant_cop&& formik.errors.inva3_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.inva3_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr1_maximo_tant_cop"className="col-sm-7 col-form-label">Invr1_Máximo_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr1_maximo_tant_cop" placeholder="Invr1_Máximo_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr1_maximo_tant_cop}></input></div></div>
        { formik.touched.invr1_maximo_tant_cop&& formik.errors.invr1_maximo_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr1_maximo_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr2_maximo_tant_cop"className="col-sm-7 col-form-label">Invr2_Máximo_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr2_maximo_tant_cop" placeholder="Invr2_Máximo_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr2_maximo_tant_cop}></input></div></div>
        { formik.touched.invr2_maximo_tant_cop&& formik.errors.invr2_maximo_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr2_maximo_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr3_maximo_tant_cop"className="col-sm-7 col-form-label">Invr3_Máximo_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr3_maximo_tant_cop" placeholder="Invr3_Máximo_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr3_maximo_tant_cop}></input></div></div>
        { formik.touched.invr3_maximo_tant_cop&& formik.errors.invr3_maximo_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr3_maximo_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr1_delta_cop"className="col-sm-7 col-form-label">Invr1_Delta_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr1_delta_cop" placeholder="Invr1_Delta_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr1_delta_cop}></input></div></div>
        { formik.touched.invr1_delta_cop&& formik.errors.invr1_delta_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr1_delta_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr2_delta_cop"className="col-sm-7 col-form-label">Invr2_Delta_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr2_delta_cop" placeholder="Invr2_Delta_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr2_delta_cop}></input></div></div>
        { formik.touched.invr2_delta_cop&& formik.errors.invr2_delta_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr2_delta_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr3_delta_cop"className="col-sm-7 col-form-label">Invr3_Delta_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr3_delta_cop" placeholder="Invr3_Delta_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr3_delta_cop}></input></div></div>
        { formik.touched.invr3_delta_cop&& formik.errors.invr3_delta_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr3_delta_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr1_tant_cop"className="col-sm-7 col-form-label">Invr1_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr1_tant_cop" placeholder="Invr1_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr1_tant_cop}></input></div></div>
        { formik.touched.invr1_tant_cop&& formik.errors.invr1_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr1_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr2_tant_cop"className="col-sm-7 col-form-label">Invr2_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr2_tant_cop" placeholder="Invr2_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr2_tant_cop}></input></div></div>
        { formik.touched.invr2_tant_cop&& formik.errors.invr2_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr2_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="invr3_tant_cop"className="col-sm-7 col-form-label">Invr3_Tant_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="invr3_tant_cop" placeholder="Invr3_Tant_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.invr3_tant_cop}></input></div></div>
        { formik.touched.invr3_tant_cop&& formik.errors.invr3_tant_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.invr3_tant_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="pr1"className="col-sm-7 col-form-label">Pr1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="pr1" placeholder="Pr1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pr1}></input></div></div>
        { formik.touched.pr1&& formik.errors.pr1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.pr1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="pr2"className="col-sm-7 col-form-label">Pr2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="pr2" placeholder="Pr2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pr2}></input></div></div>
        { formik.touched.pr2&& formik.errors.pr2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.pr2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="pr3"className="col-sm-7 col-form-label">Pr3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="pr3" placeholder="Pr3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pr3}></input></div></div>
        { formik.touched.pr3&& formik.errors.pr3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.pr3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="pj_1"className="col-sm-7 col-form-label">Pj_1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="pj_1" placeholder="Pj_1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pj_1}></input></div></div>
        { formik.touched.pj_1&& formik.errors.pj_1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.pj_1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="pj_2"className="col-sm-7 col-form-label">Pj_2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="pj_2" placeholder="Pj_2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pj_2}></input></div></div>
        { formik.touched.pj_2&& formik.errors.pj_2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.pj_2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="pj_3"className="col-sm-7 col-form-label">Pj_3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="pj_3" placeholder="Pj_3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pj_3}></input></div></div>
        { formik.touched.pj_3&& formik.errors.pj_3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.pj_3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="pj_1_creg097"className="col-sm-7 col-form-label">Pj_1_Creg097</label><div className="col-sm-5">
        <input type="number" className="form-control" id="pj_1_creg097" placeholder="Pj_1_Creg097"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pj_1_creg097}></input></div></div>
        { formik.touched.pj_1_creg097&& formik.errors.pj_1_creg097? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.pj_1_creg097}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="pj_2_creg097"className="col-sm-7 col-form-label">Pj_2_Creg097</label><div className="col-sm-5">
        <input type="number" className="form-control" id="pj_2_creg097" placeholder="Pj_2_Creg097"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pj_2_creg097}></input></div></div>
        { formik.touched.pj_2_creg097&& formik.errors.pj_2_creg097? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.pj_2_creg097}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="pj_3_creg097"className="col-sm-7 col-form-label">Pj_3_Creg097</label><div className="col-sm-5">
        <input type="number" className="form-control" id="pj_3_creg097" placeholder="Pj_3_Creg097"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.pj_3_creg097}></input></div></div>
        { formik.touched.pj_3_creg097&& formik.errors.pj_3_creg097? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.pj_3_creg097}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="acumulado_eej1_kwh"className="col-sm-7 col-form-label">Acumulado_Eej1_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="acumulado_eej1_kwh" placeholder="Acumulado_Eej1_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.acumulado_eej1_kwh}></input></div></div>
        { formik.touched.acumulado_eej1_kwh&& formik.errors.acumulado_eej1_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.acumulado_eej1_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="acumulado_eej2_kwh"className="col-sm-7 col-form-label">Acumulado_Eej2_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="acumulado_eej2_kwh" placeholder="Acumulado_Eej2_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.acumulado_eej2_kwh}></input></div></div>
        { formik.touched.acumulado_eej2_kwh&& formik.errors.acumulado_eej2_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.acumulado_eej2_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="acumulado_eej3_kwh"className="col-sm-7 col-form-label">Acumulado_Eej3_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="acumulado_eej3_kwh" placeholder="Acumulado_Eej3_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.acumulado_eej3_kwh}></input></div></div>
        { formik.touched.acumulado_eej3_kwh&& formik.errors.acumulado_eej3_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.acumulado_eej3_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="acumulado_fej3_2_kwh"className="col-sm-7 col-form-label">Acumulado_Fej3_2_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="acumulado_fej3_2_kwh" placeholder="Acumulado_Fej3_2_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.acumulado_fej3_2_kwh}></input></div></div>
        { formik.touched.acumulado_fej3_2_kwh&& formik.errors.acumulado_fej3_2_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.acumulado_fej3_2_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="euj_2_creg097_kwh"className="col-sm-7 col-form-label">Euj_2_Creg097_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="euj_2_creg097_kwh" placeholder="Euj_2_Creg097_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.euj_2_creg097_kwh}></input></div></div>
        { formik.touched.euj_2_creg097_kwh&& formik.errors.euj_2_creg097_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.euj_2_creg097_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="fej3_2_creg097_kwh"className="col-sm-7 col-form-label">Fej3_2_Creg097_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="fej3_2_creg097_kwh" placeholder="Fej3_2_Creg097_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fej3_2_creg097_kwh}></input></div></div>
        { formik.touched.fej3_2_creg097_kwh&& formik.errors.fej3_2_creg097_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fej3_2_creg097_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ic_saidi_cop"className="col-sm-7 col-form-label">Ic_Saidi_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ic_saidi_cop" placeholder="Ic_Saidi_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ic_saidi_cop}></input></div></div>
        { formik.touched.ic_saidi_cop&& formik.errors.ic_saidi_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ic_saidi_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="ic_saifi_cop"className="col-sm-7 col-form-label">Ic_Saifi_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="ic_saifi_cop" placeholder="Ic_Saifi_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.ic_saifi_cop}></input></div></div>
        { formik.touched.ic_saifi_cop&& formik.errors.ic_saifi_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.ic_saifi_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="conp_cop"className="col-sm-7 col-form-label">Conp_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="conp_cop" placeholder="Conp_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.conp_cop}></input></div></div>
        { formik.touched.conp_cop&& formik.errors.conp_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.conp_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="vcdij_tant_kwh"className="col-sm-7 col-form-label">Vcdij_Tant_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="vcdij_tant_kwh" placeholder="Vcdij_Tant_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.vcdij_tant_kwh}></input></div></div>
        { formik.touched.vcdij_tant_kwh&& formik.errors.vcdij_tant_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.vcdij_tant_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="vcinj_tant_kwh"className="col-sm-7 col-form-label">Vcinj_Tant_Kwh</label><div className="col-sm-5">
        <input type="number" className="form-control" id="vcinj_tant_kwh" placeholder="Vcinj_Tant_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.vcinj_tant_kwh}></input></div></div>
        { formik.touched.vcinj_tant_kwh&& formik.errors.vcinj_tant_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.vcinj_tant_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="vacpiec1"className="col-sm-7 col-form-label">Vacpiec1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="vacpiec1" placeholder="Vacpiec1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.vacpiec1}></input></div></div>
        { formik.touched.vacpiec1&& formik.errors.vacpiec1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.vacpiec1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="vacpiec2"className="col-sm-7 col-form-label">Vacpiec2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="vacpiec2" placeholder="Vacpiec2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.vacpiec2}></input></div></div>
        { formik.touched.vacpiec2&& formik.errors.vacpiec2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.vacpiec2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="vacpiec3"className="col-sm-7 col-form-label">Vacpiec3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="vacpiec3" placeholder="Vacpiec3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.vacpiec3}></input></div></div>
        { formik.touched.vacpiec3&& formik.errors.vacpiec3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.vacpiec3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="vacni1"className="col-sm-7 col-form-label">Vacni1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="vacni1" placeholder="Vacni1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.vacni1}></input></div></div>
        { formik.touched.vacni1&& formik.errors.vacni1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.vacni1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="vacni2"className="col-sm-7 col-form-label">Vacni2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="vacni2" placeholder="Vacni2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.vacni2}></input></div></div>
        { formik.touched.vacni2&& formik.errors.vacni2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.vacni2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="vacni3"className="col-sm-7 col-form-label">Vacni3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="vacni3" placeholder="Vacni3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.vacni3}></input></div></div>
        { formik.touched.vacni3&& formik.errors.vacni3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.vacni3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="r_tasa_retorno_actividad_distribucion"className="col-sm-7 col-form-label">R_Tasa_Retorno_Actividad_Distribucion</label><div className="col-sm-5">
        <input type="number" className="form-control" id="r_tasa_retorno_actividad_distribucion" placeholder="R_Tasa_Retorno_Actividad_Distribucion"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.r_tasa_retorno_actividad_distribucion}></input></div></div>
        { formik.touched.r_tasa_retorno_actividad_distribucion&& formik.errors.r_tasa_retorno_actividad_distribucion? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.r_tasa_retorno_actividad_distribucion}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="famb"className="col-sm-7 col-form-label">Famb</label><div className="col-sm-5">
        <input type="number" className="form-control" id="famb" placeholder="Famb"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.famb}></input></div></div>
        { formik.touched.famb&& formik.errors.famb? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.famb}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="css1_cop"className="col-sm-7 col-form-label">Css1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="css1_cop" placeholder="Css1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.css1_cop}></input></div></div>
        { formik.touched.css1_cop&& formik.errors.css1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.css1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="css2_cop"className="col-sm-7 col-form-label">Css2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="css2_cop" placeholder="Css2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.css2_cop}></input></div></div>
        { formik.touched.css2_cop&& formik.errors.css2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.css2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="css3_cop"className="col-sm-7 col-form-label">Css3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="css3_cop" placeholder="Css3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.css3_cop}></input></div></div>
        { formik.touched.css3_cop&& formik.errors.css3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.css3_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="dismining1_cop"className="col-sm-7 col-form-label">Dismining1_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="dismining1_cop" placeholder="Dismining1_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dismining1_cop}></input></div></div>
        { formik.touched.dismining1_cop&& formik.errors.dismining1_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.dismining1_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="dismining2_cop"className="col-sm-7 col-form-label">Dismining2_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="dismining2_cop" placeholder="Dismining2_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dismining2_cop}></input></div></div>
        { formik.touched.dismining2_cop&& formik.errors.dismining2_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.dismining2_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="dismining3_cop"className="col-sm-7 col-form-label">Dismining3_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="dismining3_cop" placeholder="Dismining3_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dismining3_cop}></input></div></div>
        { formik.touched.dismining3_cop&& formik.errors.dismining3_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.dismining3_cop}</p>
        </div>
        ) : null  }
        
<div className="container">
<div className="row">
<div className="col-sm">
<input
type="submit"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
value="Guardar"
/>
</div>
<div className="col-sm">
<input
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
value="Cancelar"
onClick={props.close}
/>
</div>
</div>
</div>
</form>
</Modal.Body>
<Modal.Footer>
</Modal.Footer>
</Modal>
</div>

)
}

export default NuevoData_xm_d015
