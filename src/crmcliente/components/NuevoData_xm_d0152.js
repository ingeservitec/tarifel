import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'
import XLSX from 'xlsx';


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

const NuevoDataxm_d0152= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState();
const [empresa_id, setEmpresa_id]= useState("")
const [cargo_por_uso_dt1_cop_kwh, setCargo_Por_Uso_Dt1_Cop_Kwh] = useState("");const [cargo_por_uso_dt2_cop_kwh, setCargo_Por_Uso_Dt2_Cop_Kwh] = useState("");const [cargo_por_uso_dt3_cop_kwh, setCargo_Por_Uso_Dt3_Cop_Kwh] = useState("");const [cargo_de_inversion_cdi1_cop_kwh, setCargo_De_Inversion_Cdi1_Cop_Kwh] = useState("");const [cargo_por_aom_cda1_cop_kwh, setCargo_Por_Aom_Cda1_Cop_Kwh] = useState("");const [cargo_nivel_de_tension_cd2_cop_kwh, setCargo_Nivel_De_Tension_Cd2_Cop_Kwh] = useState("");const [cargo_nivel_de_tension_cd3_cop_kwh, setCargo_Nivel_De_Tension_Cd3_Cop_Kwh] = useState("");const [cargo_nivel_de_tension_cd3_2_cop_kwh, setCargo_Nivel_De_Tension_Cd3_2_Cop_Kwh] = useState("");const [cargo_nivel_de_tension_cd4_cop_kwh, setCargo_Nivel_De_Tension_Cd4_Cop_Kwh] = useState("");const [cargo_por_incentivos_dtcs_cop_kwh, setCargo_Por_Incentivos_Dtcs_Cop_Kwh] = useState("");const [fraccion_dtcs_cop_kwh, setFraccion_Dtcs_Cop_Kwh] = useState("");const [ia1, setIa1] = useState("");const [ia2, setIa2] = useState("");const [ia3, setIa3] = useState("");const [iaa1_cop, setIaa1_Cop] = useState("");const [iaa2_cop, setIaa2_Cop] = useState("");const [iaa3_cop, setIaa3_Cop] = useState("");const [irm1_cop, setIrm1_Cop] = useState("");const [irm2_cop, setIrm2_Cop] = useState("");const [irm3_cop, setIrm3_Cop] = useState("");const [fm, setFm] = useState("");const [iaaom1_cop, setIaaom1_Cop] = useState("");const [iaaom2_cop, setIaaom2_Cop] = useState("");const [iaaom3_cop, setIaaom3_Cop] = useState("");const [aomni1_cop, setAomni1_Cop] = useState("");const [aomni2_cop, setAomni2_Cop] = useState("");const [aomni3_cop, setAomni3_Cop] = useState("");const [ima_n1, setIma_N1] = useState("");const [ima_n2, setIma_N2] = useState("");const [ima_n3, setIma_N3] = useState("");const [imn_n1, setImn_N1] = useState("");const [imn_n2, setImn_N2] = useState("");const [imn_n3, setImn_N3] = useState("");const [aim_n1, setAim_N1] = useState("");const [aim_n2, setAim_N2] = useState("");const [aim_n3, setAim_N3] = useState("");const [naim_n1, setNaim_N1] = useState("");const [naim_n2, setNaim_N2] = useState("");const [naim_n3, setNaim_N3] = useState("");const [fraccion_aim_n1_inversion, setFraccion_Aim_N1_Inversion] = useState("");const [fraccion_aim_n1_aom, setFraccion_Aim_N1_Aom] = useState("");const [bra1_cop, setBra1_Cop] = useState("");const [bra2_cop, setBra2_Cop] = useState("");const [bra3_cop, setBra3_Cop] = useState("");const [brae1_cop, setBrae1_Cop] = useState("");const [brae2_cop, setBrae2_Cop] = useState("");const [brae3_cop, setBrae3_Cop] = useState("");const [braen1_cop, setBraen1_Cop] = useState("");const [braen2_cop, setBraen2_Cop] = useState("");const [braen3_cop, setBraen3_Cop] = useState("");const [rc1_cop, setRc1_Cop] = useState("");const [rc2_cop, setRc2_Cop] = useState("");const [rc3_cop, setRc3_Cop] = useState("");const [cdi_aj_1_cop2007_kwh, setCdi_Aj_1_Cop2007_Kwh] = useState("");const [cd_aj_2_cop2007_kwh, setCd_Aj_2_Cop2007_Kwh] = useState("");const [cd_aj_3_cop2007_kwh, setCd_Aj_3_Cop2007_Kwh] = useState("");const [cdm_aj_1_cop2007_kwh, setCdm_Aj_1_Cop2007_Kwh] = useState("");const [iapa1, setIapa1] = useState("");const [iapa2, setIapa2] = useState("");const [iapa3, setIapa3] = useState("");const [iapa1_tant, setIapa1_Tant] = useState("");const [iapa2_tant, setIapa2_Tant] = useState("");const [iapa3_tant, setIapa3_Tant] = useState("");const [oi1_cop, setOi1_Cop] = useState("");const [oj2_cop, setOj2_Cop] = useState("");const [oj3_cop, setOj3_Cop] = useState("");const [irespaldo1_cop, setIrespaldo1_Cop] = useState("");const [irespaldo2_cop, setIrespaldo2_Cop] = useState("");const [irespaldo3_cop, setIrespaldo3_Cop] = useState("");const [imunts1_cop, setImunts1_Cop] = useState("");const [imunts2_cop, setImunts2_Cop] = useState("");const [imunts3_cop, setImunts3_Cop] = useState("");const [ireactiva1_cop, setIreactiva1_Cop] = useState("");const [ireactiva2_cop, setIreactiva2_Cop] = useState("");const [ireactiva3_cop, setIreactiva3_Cop] = useState("");const [aombase1, setAombase1] = useState("");const [aombase2, setAombase2] = useState("");const [aombase3, setAombase3] = useState("");const [brae1_tant_cop, setBrae1_Tant_Cop] = useState("");const [brae2_tant_cop, setBrae2_Tant_Cop] = useState("");const [brae3_tant_cop, setBrae3_Tant_Cop] = useState("");const [deltabraenj_1_cop, setDeltabraenj_1_Cop] = useState(0);const [deltabraenj_2_cop, setDeltabraenj_2_Cop] = useState(0);const [deltabraenj_3_cop, setDeltabraenj_3_Cop] = useState(0);const [deltaingj_1_cop, setDeltaingj_1_Cop] = useState("");const [deltaingj_2_cop, setDeltaingj_2_Cop] = useState("");const [deltaingj_3_cop, setDeltaingj_3_Cop] = useState("");const [brt1_cop, setBrt1_Cop] = useState("");const [brt2_cop, setBrt2_Cop] = useState("");const [brt3_cop, setBrt3_Cop] = useState("");const [rcbia1_cop, setRcbia1_Cop] = useState("");const [rcbia2_cop, setRcbia2_Cop] = useState("");const [rcbia3_cop, setRcbia3_Cop] = useState("");const [rcna1_cop, setRcna1_Cop] = useState("");const [rcna2_cop, setRcna2_Cop] = useState("");const [rcna3_cop, setRcna3_Cop] = useState("");const [rcnafo1_cop, setRcnafo1_Cop] = useState("");const [rcnafo2_cop, setRcnafo2_Cop] = useState("");const [rcnafo3_cop, setRcnafo3_Cop] = useState("");const [inve1_cop, setInve1_Cop] = useState("");const [inve2_cop, setInve2_Cop] = useState("");const [inve3_cop, setInve3_Cop] = useState("");const [inva1_cop, setInva1_Cop] = useState("");const [inva2_cop, setInva2_Cop] = useState("");const [inva3_cop, setInva3_Cop] = useState("");const [inva1_tant_cop, setInva1_Tant_Cop] = useState("");const [inva2_tant_cop, setInva2_Tant_Cop] = useState("");const [inva3_tant_cop, setInva3_Tant_Cop] = useState("");const [invr1_maximo_tant_cop, setInvr1_Máximo_Tant_Cop] = useState("");const [invr2_maximo_tant_cop, setInvr2_Máximo_Tant_Cop] = useState("");const [invr3_maximo_tant_cop, setInvr3_Máximo_Tant_Cop] = useState("");const [invr1_delta_cop, setInvr1_Delta_Cop] = useState("");const [invr2_delta_cop, setInvr2_Delta_Cop] = useState("");const [invr3_delta_cop, setInvr3_Delta_Cop] = useState("");const [invr1_tant_cop, setInvr1_Tant_Cop] = useState("");const [invr2_tant_cop, setInvr2_Tant_Cop] = useState("");const [invr3_tant_cop, setInvr3_Tant_Cop] = useState("");const [pr1, setPr1] = useState("");const [pr2, setPr2] = useState("");const [pr3, setPr3] = useState("");const [pj_1, setPj_1] = useState("");const [pj_2, setPj_2] = useState("");const [pj_3, setPj_3] = useState("");const [pj_1_creg097, setPj_1_Creg097] = useState("");const [pj_2_creg097, setPj_2_Creg097] = useState("");const [pj_3_creg097, setPj_3_Creg097] = useState("");const [acumulado_eej1_kwh, setAcumulado_Eej1_Kwh] = useState("");const [acumulado_eej2_kwh, setAcumulado_Eej2_Kwh] = useState("");const [acumulado_eej3_kwh, setAcumulado_Eej3_Kwh] = useState("");const [acumulado_fej3_2_kwh, setAcumulado_Fej3_2_Kwh] = useState("");const [euj_2_creg097_kwh, setEuj_2_Creg097_Kwh] = useState("");const [fej3_2_creg097_kwh, setFej3_2_Creg097_Kwh] = useState("");const [ic_saidi_cop, setIc_Saidi_Cop] = useState("");const [ic_saifi_cop, setIc_Saifi_Cop] = useState("");const [conp_cop, setConp_Cop] = useState("");const [vcdij_tant_kwh, setVcdij_Tant_Kwh] = useState("");const [vcinj_tant_kwh, setVcinj_Tant_Kwh] = useState("");const [vacpiec1, setVacpiec1] = useState("");const [vacpiec2, setVacpiec2] = useState("");const [vacpiec3, setVacpiec3] = useState("");const [vacni1, setVacni1] = useState("");const [vacni2, setVacni2] = useState("");const [vacni3, setVacni3] = useState("");const [r_tasa_retorno_actividad_distribucion, setR_Tasa_Retorno_Actividad_Distribucion] = useState("");const [famb, setFamb] = useState("");const [css1_cop, setCss1_Cop] = useState("");const [css2_cop, setCss2_Cop] = useState("");const [css3_cop, setCss3_Cop] = useState("");const [dismining1_cop, setDismining1_Cop] = useState("");const [dismining2_cop, setDismining2_Cop] = useState("");const [dismining3_cop, setDismining3_Cop] = useState("");
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
readXlsxFile(reader.result).then((data) => {
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
var inicio=0
var i=0

for(i=inicio;i<lines.length;i++){
if (lines[i][0] ==="Cargo por uso Dt1 (COP/kWh)"){setCargo_Por_Uso_Dt1_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Cargo por uso Dt2 (COP/kWh)"){setCargo_Por_Uso_Dt2_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Cargo por uso Dt3 (COP/kWh)"){setCargo_Por_Uso_Dt3_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Cargo de inversión CDI1 (COP/kWh)"){setCargo_De_Inversion_Cdi1_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Cargo por AOM CDA1 (COP/kWh)"){setCargo_Por_Aom_Cda1_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Cargo Nivel de tensión CD2 (COP/kWh)"){setCargo_Nivel_De_Tension_Cd2_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Cargo Nivel de tensión CD3 (COP/kWh)"){setCargo_Nivel_De_Tension_Cd3_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Cargo Nivel de tension CD3-2 (COP/kWh)"){setCargo_Nivel_De_Tension_Cd3_2_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Cargo nivel de tensión CD4 (COP/kWh)"){setCargo_Nivel_De_Tension_Cd4_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Cargo por incentivos Dtcs (COP/kWh)"){setCargo_Por_Incentivos_Dtcs_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="Fracción Dtcs (COP/kWh)"){setFraccion_Dtcs_Cop_Kwh(lines[i][1])};
if (lines[i][0] ==="IA1"){setIa1(lines[i][1])};if (lines[i][0] ==="IA2"){setIa2(lines[i][1])};
if (lines[i][0] ==="IA3"){setIa3(lines[i][1])};if (lines[i][0] ==="IAA1 (COP)"){setIaa1_Cop(lines[i][1])};
if (lines[i][0] ==="IAA2 (COP)"){setIaa2_Cop(lines[i][1])};if (lines[i][0] ==="IAA3 (COP)"){setIaa3_Cop(lines[i][1])};
if (lines[i][0] ==="IRM1 (COP)"){setIrm1_Cop(lines[i][1])};if (lines[i][0] ==="IRM2 (COP)"){setIrm2_Cop(lines[i][1])};
if (lines[i][0] ==="IRM3 (COP)"){setIrm3_Cop(lines[i][1])};if (lines[i][0] ==="fM"){setFm(lines[i][1])};
if (lines[i][0] ==="IAAOM1 (COP)"){
    setIaaom1_Cop(lines[i][1])};if (lines[i][0] ==="IAAOM2  (COP)"){setIaaom2_Cop(lines[i][1])};
    if (lines[i][0] ==="IAAOM3 (COP)"){
        setIaaom3_Cop(lines[i][1])
        setIaaom1_Cop(lines[i-2][1])
        setIaaom2_Cop(lines[i-1][1])
    };
    if (lines[i][0] ==="AOMNI1 (COP)"){setAomni1_Cop(lines[i][1])};if (lines[i][0] ==="AOMNI2 (COP)"){setAomni2_Cop(lines[i][1])};
    if (lines[i][0] ==="AOMNI3 (COP)"){setAomni3_Cop(lines[i][1])};if (lines[i][0] ==="IMA N1"){setIma_N1(lines[i][1])};
    if (lines[i][0] ==="IMA N2"){setIma_N2(lines[i][1])};if (lines[i][0] ==="IMA N3"){setIma_N3(lines[i][1])};if (lines[i][0] ==="IMN N1"){setImn_N1(lines[i][1])};
    if (lines[i][0] ==="IMN N2"){setImn_N2(lines[i][1])};if (lines[i][0] ==="IMN N3"){setImn_N3(lines[i][1])};if (lines[i][0] ==="AIM N1"){setAim_N1(lines[i][1])};
    if (lines[i][0] ==="AIM N2"){setAim_N2(lines[i][1])};if (lines[i][0] ==="AIM N3"){setAim_N3(lines[i][1])};if (lines[i][0] ==="NAIM N1"){setNaim_N1(lines[i][1])};
    if (lines[i][0] ==="NAIM N2"){setNaim_N2(lines[i][1])};if (lines[i][0] ==="NAIM N3"){setNaim_N3(lines[i][1])};
    if (lines[i][0] ==="Fracción AIM N1 (Inversión)"){setFraccion_Aim_N1_Inversion(lines[i][1])};
    if (lines[i][0] ==="Fracción AIM N1 (AOM)"){setFraccion_Aim_N1_Aom(lines[i][1])};if (lines[i][0] ==="BRA1 (COP)"){setBra1_Cop(lines[i][1])};
    if (lines[i][0] ==="BRA2 (COP)"){setBra2_Cop(lines[i][1])};if (lines[i][0] ==="BRA3 (COP)"){setBra3_Cop(lines[i][1])};
    if (lines[i][0] ==="BRAE1 (COP)"){setBrae1_Cop(lines[i][1])};if (lines[i][0] ==="BRAE2 (COP)"){setBrae2_Cop(lines[i][1])};
    if (lines[i][0] ==="BRAE3 (COP)"){setBrae3_Cop(lines[i][1])};if (lines[i][0] ==="BRAEN1 (COP)"){setBraen1_Cop(lines[i][1])};
    if (lines[i][0] ==="BRAEN2 (COP)"){setBraen2_Cop(lines[i][1])};if (lines[i][0] ==="BRAEN3 (COP)"){setBraen3_Cop(lines[i][1])};
    if (lines[i][0] ==="RC1 (COP)"){setRc1_Cop(lines[i][1])};if (lines[i][0] ==="RC2 (COP)"){setRc2_Cop(lines[i][1])};
    if (lines[i][0] ==="RC3 (COP)"){setRc3_Cop(lines[i][1])};if (lines[i][0] ==="CDI_Aj,1 (COP(2007)/kWh)"){setCdi_Aj_1_Cop2007_Kwh(lines[i][1])};
    if (lines[i][0] ==="CD_Aj,2 (COP(2007)/kWh)"){setCd_Aj_2_Cop2007_Kwh(lines[i][1])};if (lines[i][0] ==="CD_Aj,3 (COP(2007)/kWh)"){setCd_Aj_3_Cop2007_Kwh(lines[i][1])};
    if (lines[i][0] ==="CDM_Aj,1 (COP(2007)/kWh)"){setCdm_Aj_1_Cop2007_Kwh(lines[i][1])};if (lines[i][0] ==="IAPA1"){setIapa1(lines[i][1])};
    if (lines[i][0] ==="IAPA2"){setIapa2(lines[i][1])};if (lines[i][0] ==="IAPA3"){setIapa3(lines[i][1])};if (lines[i][0] ==="IAPA1_t-1"){setIapa1_Tant(lines[i][1])};
    if (lines[i][0] ==="IAPA2_t-1"){setIapa2_Tant(lines[i][1])};if (lines[i][0] ==="IAPA3_t-1"){setIapa3_Tant(lines[i][1])};
    if (lines[i][0] ==="OI1 (COP)"){setOi1_Cop(lines[i][1])};if (lines[i][0] ==="Oj2 (COP)"){setOj2_Cop(lines[i][1])};
    if (lines[i][0] ==="Oj3 (COP)"){setOj3_Cop(lines[i][1])};if (lines[i][0] ==="IRespaldo1 (COP)"){setIrespaldo1_Cop(lines[i][1])};
    if (lines[i][0] ==="IRespaldo2 (COP)"){setIrespaldo2_Cop(lines[i][1])};if (lines[i][0] ==="IRespaldo3 (COP)"){setIrespaldo3_Cop(lines[i][1])};
    if (lines[i][0] ==="IMunts1 (COP)"){setImunts1_Cop(lines[i][1])};if (lines[i][0] ==="IMunts2 (COP)"){setImunts2_Cop(lines[i][1])};
    if (lines[i][0] ==="IMunts3 (COP)"){setImunts3_Cop(lines[i][1])};if (lines[i][0] ==="IReactiva1 (COP)"){setIreactiva1_Cop(lines[i][1])};
    if (lines[i][0] ==="IReactiva2 (COP)"){setIreactiva2_Cop(lines[i][1])};if (lines[i][0] ==="IReactiva3 (COP)"){setIreactiva3_Cop(lines[i][1])};
    if (lines[i][0] ==="AOMbase1"){setAombase1(lines[i][1])};if (lines[i][0] ==="AOMbase2"){setAombase2(lines[i][1])};
    if (lines[i][0] ==="AOMbase3"){setAombase3(lines[i][1])};if (lines[i][0] ==="BRAE1_t-1 (COP)"){setBrae1_Tant_Cop(lines[i][1])};
    if (lines[i][0] ==="BRAE2_t-1 (COP)"){setBrae2_Tant_Cop(lines[i][1])};if (lines[i][0] ==="BRAE3_t-1 (COP)"){setBrae3_Tant_Cop(lines[i][1])};
    if (lines[i][0] ==="∆BRAENj,1 (COP)" && lines[i][1]!=null){setDeltabraenj_1_Cop(lines[i][1])};
    if (lines[i][0] ==="∆BRAENj,2 (COP)"&& lines[i][1]!=null){setDeltabraenj_2_Cop(lines[i][1])};
    if (lines[i][0] ==="∆BRAENj,3 (COP)"&& lines[i][1]!=null){setDeltabraenj_3_Cop(lines[i][1])};
    if (lines[i][0] ==="∆INGj,1 (COP)"){setDeltaingj_1_Cop(lines[i][1])};if (lines[i][0] ==="∆INGj,2 (COP)"){setDeltaingj_2_Cop(lines[i][1])};
    if (lines[i][0] ==="∆INGj,3 (COP)"){setDeltaingj_3_Cop(lines[i][1])};if (lines[i][0] ==="BRT1 (COP)"){setBrt1_Cop(lines[i][1])};
    if (lines[i][0] ==="BRT2 (COP)"){setBrt2_Cop(lines[i][1])};if (lines[i][0] ==="BRT3 (COP)"){setBrt3_Cop(lines[i][1])};
    if (lines[i][0] ==="RCBIA1 (COP)"){setRcbia1_Cop(lines[i][1])};if (lines[i][0] ==="RCBIA2 (COP)"){setRcbia2_Cop(lines[i][1])};
    if (lines[i][0] ==="RCBIA3 (COP)"){setRcbia3_Cop(lines[i][1])};if (lines[i][0] ==="RCNA1 (COP)"){setRcna1_Cop(lines[i][1])};
    if (lines[i][0] ==="RCNA2 (COP)"){setRcna2_Cop(lines[i][1])};if (lines[i][0] ==="RCNA3 (COP)"){setRcna3_Cop(lines[i][1])};
    if (lines[i][0] ==="RCNAFO1 (COP)"){setRcnafo1_Cop(lines[i][1])};if (lines[i][0] ==="RCNAFO2 (COP)"){setRcnafo2_Cop(lines[i][1])};
    if (lines[i][0] ==="RCNAFO3 (COP)"){setRcnafo3_Cop(lines[i][1])};if (lines[i][0] ==="INVE1 (COP)"){setInve1_Cop(lines[i][1])};
    if (lines[i][0] ==="INVE2 (COP)"){setInve2_Cop(lines[i][1])};if (lines[i][0] ==="INVE3 (COP)"){setInve3_Cop(lines[i][1])};
    if (lines[i][0] ==="INVA1 (COP)"){setInva1_Cop(lines[i][1])};if (lines[i][0] ==="INVA2 (COP)"){setInva2_Cop(lines[i][1])};
    if (lines[i][0] ==="INVA3 (COP)"){setInva3_Cop(lines[i][1])};if (lines[i][0] ==="INVA1_t-1 (COP)"){setInva1_Tant_Cop(lines[i][1])};
    if (lines[i][0] ==="INVA2_t-1 (COP)"){setInva2_Tant_Cop(lines[i][1])};if (lines[i][0] ==="INVA3_t-1 (COP)"){setInva3_Tant_Cop(lines[i][1])};
    if (lines[i][0] ==="INVR1 Máximo_t-1 (COP)"){setInvr1_Máximo_Tant_Cop(lines[i][1])};
    if (lines[i][0] ==="INVR2 Máximo_t-1 (COP)"){setInvr2_Máximo_Tant_Cop(lines[i][1])};
    if (lines[i][0] ==="INVR3 Máximo_t-1 (COP)"){setInvr3_Máximo_Tant_Cop(lines[i][1])};if (lines[i][0] ==="INVR1_Delta (COP)"){setInvr1_Delta_Cop(lines[i][1])};
    if (lines[i][0] ==="INVR2_Delta (COP)"){setInvr2_Delta_Cop(lines[i][1])};if (lines[i][0] ==="INVR3_Delta (COP)"){setInvr3_Delta_Cop(lines[i][1])};
    if (lines[i][0] ==="INVR1_t-1 (COP)"){setInvr1_Tant_Cop(lines[i][1])};if (lines[i][0] ==="INVR2_t-1 (COP)"){setInvr2_Tant_Cop(lines[i][1])};if (lines[i][0] ==="INVR3_t-1 (COP)"){setInvr3_Tant_Cop(lines[i][1])};if (lines[i][0] ==="PR1"){setPr1(lines[i][1])};if (lines[i][0] ==="PR2"){setPr2(lines[i][1])};if (lines[i][0] ==="PR3"){setPr3(lines[i][1])};if (lines[i][0] ==="Pj,1"){setPj_1(lines[i][1])};if (lines[i][0] ==="Pj,2"){setPj_2(lines[i][1])};if (lines[i][0] ==="Pj,3"){setPj_3(lines[i][1])};if (lines[i][0] ==="Pj,1_CREG097"){setPj_1_Creg097(lines[i][1])};if (lines[i][0] ==="Pj,2_CREG097"){setPj_2_Creg097(lines[i][1])};if (lines[i][0] ==="Pj,3_CREG097"){setPj_3_Creg097(lines[i][1])};if (lines[i][0] ==="Acumulado Eej1 (kWh)"){setAcumulado_Eej1_Kwh(lines[i][1])};if (lines[i][0] ==="Acumulado Eej2 (kWh)"){setAcumulado_Eej2_Kwh(lines[i][1])};if (lines[i][0] ==="Acumulado Eej3 (kWh)"){setAcumulado_Eej3_Kwh(lines[i][1])};if (lines[i][0] ==="Acumulado Fej3-2 (kWh)"){setAcumulado_Fej3_2_Kwh(lines[i][1])};if (lines[i][0] ==="Euj,2_CREG097 (kWh)"){setEuj_2_Creg097_Kwh(lines[i][1])};if (lines[i][0] ==="Fej3-2_CREG097 (kWh)"){setFej3_2_Creg097_Kwh(lines[i][1])};if (lines[i][0] ==="IC_SAIDI (COP)"){setIc_Saidi_Cop(lines[i][1])};if (lines[i][0] ==="IC_SAIFI (COP)"){setIc_Saifi_Cop(lines[i][1])};if (lines[i][0] ==="CONP (COP)"){setConp_Cop(lines[i][1])};if (lines[i][0] ==="VCDIj,t-1 (kWh)"){setVcdij_Tant_Kwh(lines[i][1])};if (lines[i][0] ==="VCINj,t-1 (kWh)"){setVcinj_Tant_Kwh(lines[i][1])};if (lines[i][0] ==="VACPIEC1"){setVacpiec1(lines[i][1])};if (lines[i][0] ==="VACPIEC2"){setVacpiec2(lines[i][1])};if (lines[i][0] ==="VACPIEC3"){setVacpiec3(lines[i][1])};if (lines[i][0] ==="VACNI1"){setVacni1(lines[i][1])};if (lines[i][0] ==="VACNI2"){setVacni2(lines[i][1])};if (lines[i][0] ==="VACNI3"){setVacni3(lines[i][1])};if (lines[i][0] ==="r (tasa retorno actividad Distribución)"){setR_Tasa_Retorno_Actividad_Distribucion(lines[i][1])};if (lines[i][0] ==="fAmb"){setFamb(lines[i][1])};if (lines[i][0] ==="CSS1 (COP)"){setCss1_Cop(lines[i][1])};if (lines[i][0] ==="CSS2 (COP)"){setCss2_Cop(lines[i][1])};if (lines[i][0] ==="CSS3 (COP)"){setCss3_Cop(lines[i][1])};if (lines[i][0] ==="DisminIng1 (COP)"){setDismining1_Cop(lines[i][1])};if (lines[i][0] ==="DisminIng2 (COP)"){setDismining2_Cop(lines[i][1])};if (lines[i][0] ==="DisminIng3 (COP)"){setDismining3_Cop(lines[i][1])};
}

//return result; //JavaScript object
// parseFloat()
return result; //JSON
}
// }, [datacsv])

const handleSubmit = async () => {
try {
    csvJSON(datacsv)
    console.log(invr2_delta_cop)
    console.log(creador,empresa_id,parseFloat((fileNames[0].substr(26,4))),parseFloat((fileNames[0].substr(30,2))),cargo_por_uso_dt1_cop_kwh,cargo_por_uso_dt2_cop_kwh,cargo_por_uso_dt3_cop_kwh,cargo_de_inversion_cdi1_cop_kwh,cargo_por_aom_cda1_cop_kwh,cargo_nivel_de_tension_cd2_cop_kwh,cargo_nivel_de_tension_cd3_cop_kwh,cargo_nivel_de_tension_cd3_2_cop_kwh,cargo_nivel_de_tension_cd4_cop_kwh,cargo_por_incentivos_dtcs_cop_kwh,fraccion_dtcs_cop_kwh,ia1,ia2,ia3,iaa1_cop,iaa2_cop,iaa3_cop,irm1_cop,irm2_cop,irm3_cop,fm,iaaom1_cop,iaaom2_cop,iaaom3_cop,aomni1_cop,aomni2_cop,aomni3_cop,ima_n1,ima_n2,ima_n3,imn_n1,imn_n2,imn_n3,aim_n1,aim_n2,aim_n3,naim_n1,naim_n2,naim_n3,fraccion_aim_n1_inversion,fraccion_aim_n1_aom,bra1_cop,bra2_cop,bra3_cop,brae1_cop,brae2_cop,brae3_cop,braen1_cop,braen2_cop,braen3_cop,rc1_cop,rc2_cop,rc3_cop,cdi_aj_1_cop2007_kwh,cd_aj_2_cop2007_kwh,cd_aj_3_cop2007_kwh,cdm_aj_1_cop2007_kwh,iapa1,iapa2,iapa3,iapa1_tant,iapa2_tant,iapa3_tant,oi1_cop,oj2_cop,oj3_cop,irespaldo1_cop,irespaldo2_cop,irespaldo3_cop,imunts1_cop,imunts2_cop,imunts3_cop,ireactiva1_cop,ireactiva2_cop,ireactiva3_cop,aombase1,aombase2,aombase3,brae1_tant_cop,brae2_tant_cop,brae3_tant_cop,deltabraenj_1_cop,deltabraenj_2_cop,deltabraenj_3_cop,deltaingj_1_cop,deltaingj_2_cop,deltaingj_3_cop,brt1_cop,brt2_cop,brt3_cop,rcbia1_cop,rcbia2_cop,rcbia3_cop,rcna1_cop,rcna2_cop,rcna3_cop,rcnafo1_cop,rcnafo2_cop,rcnafo3_cop,inve1_cop,inve2_cop,inve3_cop,inva1_cop,inva2_cop,inva3_cop,inva1_tant_cop,inva2_tant_cop,inva3_tant_cop,invr1_maximo_tant_cop,invr2_maximo_tant_cop,invr3_maximo_tant_cop,invr1_delta_cop,invr2_delta_cop,invr3_delta_cop,invr1_tant_cop,invr2_tant_cop,invr3_tant_cop,pr1,pr2,pr3,pj_1,pj_2,pj_3,pj_1_creg097,pj_2_creg097,pj_3_creg097,acumulado_eej1_kwh,acumulado_eej2_kwh,acumulado_eej3_kwh,acumulado_fej3_2_kwh,euj_2_creg097_kwh,fej3_2_creg097_kwh,ic_saidi_cop)
        const{data}=await nuevoData_xm_d015({
            variables:{
            input:{
                creador:creador,empresa_id:empresa_id,anho:parseFloat((fileNames[0].substr(26,4))),mes:parseFloat((fileNames[0].substr(30,2))),cargo_por_uso_dt1_cop_kwh:cargo_por_uso_dt1_cop_kwh,cargo_por_uso_dt2_cop_kwh:cargo_por_uso_dt2_cop_kwh,cargo_por_uso_dt3_cop_kwh:cargo_por_uso_dt3_cop_kwh,cargo_de_inversion_cdi1_cop_kwh:cargo_de_inversion_cdi1_cop_kwh,cargo_por_aom_cda1_cop_kwh:cargo_por_aom_cda1_cop_kwh,cargo_nivel_de_tension_cd2_cop_kwh:cargo_nivel_de_tension_cd2_cop_kwh,cargo_nivel_de_tension_cd3_cop_kwh:cargo_nivel_de_tension_cd3_cop_kwh,cargo_nivel_de_tension_cd3_2_cop_kwh:cargo_nivel_de_tension_cd3_2_cop_kwh,cargo_nivel_de_tension_cd4_cop_kwh:cargo_nivel_de_tension_cd4_cop_kwh,cargo_por_incentivos_dtcs_cop_kwh:cargo_por_incentivos_dtcs_cop_kwh,fraccion_dtcs_cop_kwh:fraccion_dtcs_cop_kwh,ia1:ia1,ia2:ia2,ia3:ia3,iaa1_cop:iaa1_cop,iaa2_cop:iaa2_cop,iaa3_cop:iaa3_cop,irm1_cop:irm1_cop,irm2_cop:irm2_cop,irm3_cop:irm3_cop,fm:fm,iaaom1_cop:iaaom1_cop,iaaom2_cop:iaaom2_cop,iaaom3_cop:iaaom3_cop,aomni1_cop:aomni1_cop,aomni2_cop:aomni2_cop,aomni3_cop:aomni3_cop,ima_n1:ima_n1,ima_n2:ima_n2,ima_n3:ima_n3,imn_n1:imn_n1,imn_n2:imn_n2,imn_n3:imn_n3,aim_n1:aim_n1,aim_n2:aim_n2,aim_n3:aim_n3,naim_n1:naim_n1,naim_n2:naim_n2,naim_n3:naim_n3,fraccion_aim_n1_inversion:fraccion_aim_n1_inversion,fraccion_aim_n1_aom:fraccion_aim_n1_aom,bra1_cop:bra1_cop,bra2_cop:bra2_cop,bra3_cop:bra3_cop,brae1_cop:brae1_cop,brae2_cop:brae2_cop,brae3_cop:brae3_cop,braen1_cop:braen1_cop,braen2_cop:braen2_cop,braen3_cop:braen3_cop,rc1_cop:rc1_cop,rc2_cop:rc2_cop,rc3_cop:rc3_cop,cdi_aj_1_cop2007_kwh:cdi_aj_1_cop2007_kwh,cd_aj_2_cop2007_kwh:cd_aj_2_cop2007_kwh,cd_aj_3_cop2007_kwh:cd_aj_3_cop2007_kwh,cdm_aj_1_cop2007_kwh:cdm_aj_1_cop2007_kwh,iapa1:iapa1,iapa2:iapa2,iapa3:iapa3,iapa1_tant:iapa1_tant,iapa2_tant:iapa2_tant,iapa3_tant:iapa3_tant,oi1_cop:oi1_cop,oj2_cop:oj2_cop,oj3_cop:oj3_cop,irespaldo1_cop:irespaldo1_cop,irespaldo2_cop:irespaldo2_cop,irespaldo3_cop:irespaldo3_cop,imunts1_cop:imunts1_cop,imunts2_cop:imunts2_cop,imunts3_cop:imunts3_cop,ireactiva1_cop:ireactiva1_cop,ireactiva2_cop:ireactiva2_cop,ireactiva3_cop:ireactiva3_cop,aombase1:aombase1,aombase2:aombase2,aombase3:aombase3,brae1_tant_cop:brae1_tant_cop,brae2_tant_cop:brae2_tant_cop,brae3_tant_cop:brae3_tant_cop,deltabraenj_1_cop:deltabraenj_1_cop,deltabraenj_2_cop:deltabraenj_2_cop,deltabraenj_3_cop:deltabraenj_3_cop,deltaingj_1_cop:deltaingj_1_cop,deltaingj_2_cop:deltaingj_2_cop,deltaingj_3_cop:deltaingj_3_cop,brt1_cop:brt1_cop,brt2_cop:brt2_cop,brt3_cop:brt3_cop,rcbia1_cop:rcbia1_cop,rcbia2_cop:rcbia2_cop,rcbia3_cop:rcbia3_cop,rcna1_cop:rcna1_cop,rcna2_cop:rcna2_cop,rcna3_cop:rcna3_cop,rcnafo1_cop:rcnafo1_cop,rcnafo2_cop:rcnafo2_cop,rcnafo3_cop:rcnafo3_cop,inve1_cop:inve1_cop,inve2_cop:inve2_cop,inve3_cop:inve3_cop,inva1_cop:inva1_cop,inva2_cop:inva2_cop,inva3_cop:inva3_cop,inva1_tant_cop:inva1_tant_cop,inva2_tant_cop:inva2_tant_cop,inva3_tant_cop:inva3_tant_cop,invr1_maximo_tant_cop:invr1_maximo_tant_cop,invr2_maximo_tant_cop:invr2_maximo_tant_cop,invr3_maximo_tant_cop:invr3_maximo_tant_cop,invr1_delta_cop:invr1_delta_cop,invr2_delta_cop:invr2_delta_cop,invr3_delta_cop:invr3_delta_cop,invr1_tant_cop:invr1_tant_cop,invr2_tant_cop:invr2_tant_cop,invr3_tant_cop:invr3_tant_cop,pr1:pr1,pr2:pr2,pr3:pr3,pj_1:pj_1,pj_2:pj_2,pj_3:pj_3,pj_1_creg097:pj_1_creg097,pj_2_creg097:pj_2_creg097,pj_3_creg097:pj_3_creg097,acumulado_eej1_kwh:acumulado_eej1_kwh,acumulado_eej2_kwh:acumulado_eej2_kwh,acumulado_eej3_kwh:acumulado_eej3_kwh,acumulado_fej3_2_kwh:acumulado_fej3_2_kwh,euj_2_creg097_kwh:euj_2_creg097_kwh,fej3_2_creg097_kwh:fej3_2_creg097_kwh,ic_saidi_cop:ic_saidi_cop,ic_saifi_cop:ic_saifi_cop,conp_cop:conp_cop,vcdij_tant_kwh:vcdij_tant_kwh,vcinj_tant_kwh:vcinj_tant_kwh,vacpiec1:vacpiec1,vacpiec2:vacpiec2,vacpiec3:vacpiec3,vacni1:vacni1,vacni2:vacni2,vacni3:vacni3,r_tasa_retorno_actividad_distribucion:r_tasa_retorno_actividad_distribucion,famb:famb,css1_cop:css1_cop,css2_cop:css2_cop,css3_cop:css3_cop,dismining1_cop:dismining1_cop,dismining2_cop:dismining2_cop,dismining3_cop:dismining3_cop
            }
            }
            })

Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close2()
// results will be an array of execution result objects (i.e. { data, error })
// Do whatever here with the results
} catch (error) {
console.log(error)
// Handle any errors as appropriate
}
}
useEffect(() => {
if(loading1) return null;
setCreador(parseInt(data1.obtenerUsuario.id));
setEmpresa_id((data1.obtenerUsuario.empresa));
console.log(data1.obtenerUsuario.empresa)
}, [loading1])

return (
<div>
<Modal show={props.show2}
aria-labelledby="contained-modal-title-vcenter"
centered
onHide={props.close2}>
<Modal.Header closeButton>
<Modal.Title>Cargue Masivo a tabla Data XM D015</Modal.Title>
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
<div className="container">
<div className="row">
<div className="col-sm">
<input
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
value="Guardar"
onClick={handleSubmit}
/>
</div>
<div className="col-sm">
<input
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
value="Cancelar"
onClick={props.close2}
/>
</div>
</div>
</div>

</Modal.Body>
<Modal.Footer>
</Modal.Footer>
</Modal>
</div>

)
}

export default NuevoDataxm_d0152
