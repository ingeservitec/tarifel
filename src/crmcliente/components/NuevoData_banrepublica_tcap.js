
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

const NUEVO_DATA_BANREPUBLICA_TCAP= gql`
mutation nuevoData_banrepublica_tcap($input:Data_banrepublica_tcapInput ){
nuevoData_banrepublica_tcap(input:$input){
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
const OBTENER_DATA_BANREPUBLICA_TCAP = gql`
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


const NuevoData_banrepublica_tcap= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [fecha, setFecha] = useState("");const [empresa_id, setempresa_id] = useState("");const [tasa_a_30_cdt_bancos_comerciales, setTasa_A_30_Cdt_Bancos_Comerciales] = useState("");const [monto_a_30_cdt_bancos_comerciales, setMonto_A_30_Cdt_Bancos_Comerciales] = useState("");const [tasa_entre_31_y_44_cdt_bancos_comerciales, setTasa_Entre_31_Y_44_Cdt_Bancos_Comerciales] = useState("");const [monto_entre_31_y_44_cdt_bancos_comerciales, setMonto_Entre_31_Y_44_Cdt_Bancos_Comerciales] = useState("");const [tasa_a_45_cdt_bancos_comerciales, setTasa_A_45_Cdt_Bancos_Comerciales] = useState("");const [monto_a_45_cdt_bancos_comerciales, setMonto_A_45_Cdt_Bancos_Comerciales] = useState("");const [tasa_entre_46_y_59_cdt_bancos_comerciales, setTasa_Entre_46_Y_59_Cdt_Bancos_Comerciales] = useState("");const [monto_entre_46_y_59_cdt_bancos_comerciales, setMonto_Entre_46_Y_59_Cdt_Bancos_Comerciales] = useState("");const [tasa_a_60_cdt_bancos_comerciales, setTasa_A_60_Cdt_Bancos_Comerciales] = useState("");const [monto_a_60_cdt_bancos_comerciales, setMonto_A_60_Cdt_Bancos_Comerciales] = useState("");const [tasa_entre_61_y_89_cdt_bancos_comerciales, setTasa_Entre_61_Y_89_Cdt_Bancos_Comerciales] = useState("");const [monto_entre_61_y_89_cdt_bancos_comerciales, setMonto_Entre_61_Y_89_Cdt_Bancos_Comerciales] = useState("");const [tasa_a_90_cdt_bancos_comerciales, setTasa_A_90_Cdt_Bancos_Comerciales] = useState("");const [monto_a_90_cdt_bancos_comerciales, setMonto_A_90_Cdt_Bancos_Comerciales] = useState("");const [tasa_entre_91_y_119_cdt_bancos_comerciales, setTasa_Entre_91_Y_119_Cdt_Bancos_Comerciales] = useState("");const [monto_entre_91_y_119_cdt_bancos_comerciales, setMonto_Entre_91_Y_119_Cdt_Bancos_Comerciales] = useState("");const [tasa_a_120_cdt_bancos_comerciales, setTasa_A_120_Cdt_Bancos_Comerciales] = useState("");const [monto_a_120_cdt_bancos_comerciales, setMonto_A_120_Cdt_Bancos_Comerciales] = useState("");const [tasa_entre_121_y_179_cdt_bancos_comerciales, setTasa_Entre_121_Y_179_Cdt_Bancos_Comerciales] = useState("");const [monto_entre_121_y_179_cdt_bancos_comerciales, setMonto_Entre_121_Y_179_Cdt_Bancos_Comerciales] = useState("");const [tasa_a_180_cdt_bancos_comerciales, setTasa_A_180_Cdt_Bancos_Comerciales] = useState("");const [monto_a_180_cdt_bancos_comerciales, setMonto_A_180_Cdt_Bancos_Comerciales] = useState("");const [tasa_entre_181_y_359_cdt_bancos_comerciales, setTasa_Entre_181_Y_359_Cdt_Bancos_Comerciales] = useState("");const [monto_entre_181_y_359_cdt_bancos_comerciales, setMonto_Entre_181_Y_359_Cdt_Bancos_Comerciales] = useState("");const [tasa_a_360_cdt_bancos_comerciales, setTasa_A_360_Cdt_Bancos_Comerciales] = useState("");const [monto_a_360_cdt_bancos_comerciales, setMonto_A_360_Cdt_Bancos_Comerciales] = useState("");const [tasa_superiores_a_360_cdt_bancos_comerciales, setTasa_Superiores_A_360_Cdt_Bancos_Comerciales] = useState("");const [monto_superiores_a_360_cdt_bancos_comerciales, setMonto_Superiores_A_360_Cdt_Bancos_Comerciales] = useState("");const [tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales, setTasa_Cap_Cdt_Red_De_Oficinas_Cdt_Bancos_Comerciales] = useState("");const [monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales, setMonto_Cap_Cdt_Red_De_Oficinas__Cdt_Bancos_Comerciales] = useState("");const [tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales, setTasa_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales] = useState("");const [monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales, setMonto_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales] = useState("");const [tasa_entre_2_y_14_cdats_cdat_bancos_comerciales, setTasa_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales] = useState("");const [monto_entre_2_y_14_cdats_cdat_bancos_comerciales, setMonto_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales] = useState("");const [tasa_entre_15_y_29_cdats_cdat_bancos_comerciales, setTasa_Entre_15_Y_29_Cdats_Cdat_Bancos_Comerciales] = useState("");const [monto_entre_15_y_29_cdat_bancos_comerciales, setMonto_Entre_15_Y_29_Cdat_Bancos_Comerciales] = useState("");const [tasa_a_30_cdats_cdat_bancos_comerciales, setTasa_A_30_Cdats_Cdat_Bancos_Comerciales] = useState("");const [monto_a_30_cdat_bancos_comerciales, setMonto_A_30_Cdat_Bancos_Comerciales] = useState("");const [tasa_entre_31_y_90_cdats_cdat_bancos_comerciales, setTasa_Entre_31_Y_90_Cdats_Cdat_Bancos_Comerciales] = useState("");const [monto_entre_31_y_90_cdat_bancos_comerciales, setMonto_Entre_31_Y_90_Cdat_Bancos_Comerciales] = useState("");const [tasa_entre_91_y_180_cdats_cdat_bancos_comerciales, setTasa_Entre_91_Y_180_Cdats_Cdat_Bancos_Comerciales] = useState("");const [monto_entre_91_y_180_cdat_bancos_comerciales, setMonto_Entre_91_Y_180_Cdat_Bancos_Comerciales] = useState("");const [tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales, setTasa_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales] = useState("");const [monto_de_181_en_adelante_cdats_cdat_bancos_comerciales, setMonto_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales] = useState("");const [tasa_cap_cdat_oficinas_cdat_bancos_comerciales, setTasa_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales] = useState("");const [monto_cap_cdat_oficinas_cdat_bancos_comerciales, setMonto_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales] = useState("");
const [nuevoData_banrepublica_tcap]=useMutation(NUEVO_DATA_BANREPUBLICA_TCAP, {
update(cache, { data: { nuevoData_banrepublica_tcap} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_banrepublica_tcap} = cache.readQuery({ query: OBTENER_DATA_BANREPUBLICA_TCAP});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_BANREPUBLICA_TCAP,
data: {
obtenerData_banrepublica_tcap: [...obtenerData_banrepublica_tcap, nuevoData_banrepublica_tcap]
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
if (encabezados[j-2] === 'Fecha' || encabezados[j-2] === 'empresa_id' )
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
creador:creador,fecha:fecha,empresa_id:empresa_id,tasa_a_30_cdt_bancos_comerciales:tasa_a_30_cdt_bancos_comerciales,monto_a_30_cdt_bancos_comerciales:monto_a_30_cdt_bancos_comerciales,tasa_entre_31_y_44_cdt_bancos_comerciales:tasa_entre_31_y_44_cdt_bancos_comerciales,monto_entre_31_y_44_cdt_bancos_comerciales:monto_entre_31_y_44_cdt_bancos_comerciales,tasa_a_45_cdt_bancos_comerciales:tasa_a_45_cdt_bancos_comerciales,monto_a_45_cdt_bancos_comerciales:monto_a_45_cdt_bancos_comerciales,tasa_entre_46_y_59_cdt_bancos_comerciales:tasa_entre_46_y_59_cdt_bancos_comerciales,monto_entre_46_y_59_cdt_bancos_comerciales:monto_entre_46_y_59_cdt_bancos_comerciales,tasa_a_60_cdt_bancos_comerciales:tasa_a_60_cdt_bancos_comerciales,monto_a_60_cdt_bancos_comerciales:monto_a_60_cdt_bancos_comerciales,tasa_entre_61_y_89_cdt_bancos_comerciales:tasa_entre_61_y_89_cdt_bancos_comerciales,monto_entre_61_y_89_cdt_bancos_comerciales:monto_entre_61_y_89_cdt_bancos_comerciales,tasa_a_90_cdt_bancos_comerciales:tasa_a_90_cdt_bancos_comerciales,monto_a_90_cdt_bancos_comerciales:monto_a_90_cdt_bancos_comerciales,tasa_entre_91_y_119_cdt_bancos_comerciales:tasa_entre_91_y_119_cdt_bancos_comerciales,monto_entre_91_y_119_cdt_bancos_comerciales:monto_entre_91_y_119_cdt_bancos_comerciales,tasa_a_120_cdt_bancos_comerciales:tasa_a_120_cdt_bancos_comerciales,monto_a_120_cdt_bancos_comerciales:monto_a_120_cdt_bancos_comerciales,tasa_entre_121_y_179_cdt_bancos_comerciales:tasa_entre_121_y_179_cdt_bancos_comerciales,monto_entre_121_y_179_cdt_bancos_comerciales:monto_entre_121_y_179_cdt_bancos_comerciales,tasa_a_180_cdt_bancos_comerciales:tasa_a_180_cdt_bancos_comerciales,monto_a_180_cdt_bancos_comerciales:monto_a_180_cdt_bancos_comerciales,tasa_entre_181_y_359_cdt_bancos_comerciales:tasa_entre_181_y_359_cdt_bancos_comerciales,monto_entre_181_y_359_cdt_bancos_comerciales:monto_entre_181_y_359_cdt_bancos_comerciales,tasa_a_360_cdt_bancos_comerciales:tasa_a_360_cdt_bancos_comerciales,monto_a_360_cdt_bancos_comerciales:monto_a_360_cdt_bancos_comerciales,tasa_superiores_a_360_cdt_bancos_comerciales:tasa_superiores_a_360_cdt_bancos_comerciales,monto_superiores_a_360_cdt_bancos_comerciales:monto_superiores_a_360_cdt_bancos_comerciales,tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales:tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales,monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales:monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales,tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales:tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales,monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales:monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales,tasa_entre_2_y_14_cdats_cdat_bancos_comerciales:tasa_entre_2_y_14_cdats_cdat_bancos_comerciales,monto_entre_2_y_14_cdats_cdat_bancos_comerciales:monto_entre_2_y_14_cdats_cdat_bancos_comerciales,tasa_entre_15_y_29_cdats_cdat_bancos_comerciales:tasa_entre_15_y_29_cdats_cdat_bancos_comerciales,monto_entre_15_y_29_cdat_bancos_comerciales:monto_entre_15_y_29_cdat_bancos_comerciales,tasa_a_30_cdats_cdat_bancos_comerciales:tasa_a_30_cdats_cdat_bancos_comerciales,monto_a_30_cdat_bancos_comerciales:monto_a_30_cdat_bancos_comerciales,tasa_entre_31_y_90_cdats_cdat_bancos_comerciales:tasa_entre_31_y_90_cdats_cdat_bancos_comerciales,monto_entre_31_y_90_cdat_bancos_comerciales:monto_entre_31_y_90_cdat_bancos_comerciales,tasa_entre_91_y_180_cdats_cdat_bancos_comerciales:tasa_entre_91_y_180_cdats_cdat_bancos_comerciales,monto_entre_91_y_180_cdat_bancos_comerciales:monto_entre_91_y_180_cdat_bancos_comerciales,tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales:tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales,monto_de_181_en_adelante_cdats_cdat_bancos_comerciales:monto_de_181_en_adelante_cdats_cdat_bancos_comerciales,tasa_cap_cdat_oficinas_cdat_bancos_comerciales:tasa_cap_cdat_oficinas_cdat_bancos_comerciales,monto_cap_cdat_oficinas_cdat_bancos_comerciales:monto_cap_cdat_oficinas_cdat_bancos_comerciales
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
}),
onSubmit: async valores => {
const{creador,fecha,empresa_id,tasa_a_30_cdt_bancos_comerciales,monto_a_30_cdt_bancos_comerciales,tasa_entre_31_y_44_cdt_bancos_comerciales,monto_entre_31_y_44_cdt_bancos_comerciales,tasa_a_45_cdt_bancos_comerciales,monto_a_45_cdt_bancos_comerciales,tasa_entre_46_y_59_cdt_bancos_comerciales,monto_entre_46_y_59_cdt_bancos_comerciales,tasa_a_60_cdt_bancos_comerciales,monto_a_60_cdt_bancos_comerciales,tasa_entre_61_y_89_cdt_bancos_comerciales,monto_entre_61_y_89_cdt_bancos_comerciales,tasa_a_90_cdt_bancos_comerciales,monto_a_90_cdt_bancos_comerciales,tasa_entre_91_y_119_cdt_bancos_comerciales,monto_entre_91_y_119_cdt_bancos_comerciales,tasa_a_120_cdt_bancos_comerciales,monto_a_120_cdt_bancos_comerciales,tasa_entre_121_y_179_cdt_bancos_comerciales,monto_entre_121_y_179_cdt_bancos_comerciales,tasa_a_180_cdt_bancos_comerciales,monto_a_180_cdt_bancos_comerciales,tasa_entre_181_y_359_cdt_bancos_comerciales,monto_entre_181_y_359_cdt_bancos_comerciales,tasa_a_360_cdt_bancos_comerciales,monto_a_360_cdt_bancos_comerciales,tasa_superiores_a_360_cdt_bancos_comerciales,monto_superiores_a_360_cdt_bancos_comerciales,tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales,monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales,tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales,monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales,tasa_entre_2_y_14_cdats_cdat_bancos_comerciales,monto_entre_2_y_14_cdats_cdat_bancos_comerciales,tasa_entre_15_y_29_cdats_cdat_bancos_comerciales,monto_entre_15_y_29_cdat_bancos_comerciales,tasa_a_30_cdats_cdat_bancos_comerciales,monto_a_30_cdat_bancos_comerciales,tasa_entre_31_y_90_cdats_cdat_bancos_comerciales,monto_entre_31_y_90_cdat_bancos_comerciales,tasa_entre_91_y_180_cdats_cdat_bancos_comerciales,monto_entre_91_y_180_cdat_bancos_comerciales,tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales,monto_de_181_en_adelante_cdats_cdat_bancos_comerciales,tasa_cap_cdat_oficinas_cdat_bancos_comerciales,monto_cap_cdat_oficinas_cdat_bancos_comerciales}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_banrepublica_tcap({
variables:{
input:{
creador,fecha,empresa_id,tasa_a_30_cdt_bancos_comerciales,monto_a_30_cdt_bancos_comerciales,tasa_entre_31_y_44_cdt_bancos_comerciales,monto_entre_31_y_44_cdt_bancos_comerciales,tasa_a_45_cdt_bancos_comerciales,monto_a_45_cdt_bancos_comerciales,tasa_entre_46_y_59_cdt_bancos_comerciales,monto_entre_46_y_59_cdt_bancos_comerciales,tasa_a_60_cdt_bancos_comerciales,monto_a_60_cdt_bancos_comerciales,tasa_entre_61_y_89_cdt_bancos_comerciales,monto_entre_61_y_89_cdt_bancos_comerciales,tasa_a_90_cdt_bancos_comerciales,monto_a_90_cdt_bancos_comerciales,tasa_entre_91_y_119_cdt_bancos_comerciales,monto_entre_91_y_119_cdt_bancos_comerciales,tasa_a_120_cdt_bancos_comerciales,monto_a_120_cdt_bancos_comerciales,tasa_entre_121_y_179_cdt_bancos_comerciales,monto_entre_121_y_179_cdt_bancos_comerciales,tasa_a_180_cdt_bancos_comerciales,monto_a_180_cdt_bancos_comerciales,tasa_entre_181_y_359_cdt_bancos_comerciales,monto_entre_181_y_359_cdt_bancos_comerciales,tasa_a_360_cdt_bancos_comerciales,monto_a_360_cdt_bancos_comerciales,tasa_superiores_a_360_cdt_bancos_comerciales,monto_superiores_a_360_cdt_bancos_comerciales,tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales,monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales,tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales,monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales,tasa_entre_2_y_14_cdats_cdat_bancos_comerciales,monto_entre_2_y_14_cdats_cdat_bancos_comerciales,tasa_entre_15_y_29_cdats_cdat_bancos_comerciales,monto_entre_15_y_29_cdat_bancos_comerciales,tasa_a_30_cdats_cdat_bancos_comerciales,monto_a_30_cdat_bancos_comerciales,tasa_entre_31_y_90_cdats_cdat_bancos_comerciales,monto_entre_31_y_90_cdat_bancos_comerciales,tasa_entre_91_y_180_cdats_cdat_bancos_comerciales,monto_entre_91_y_180_cdat_bancos_comerciales,tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales,monto_de_181_en_adelante_cdats_cdat_bancos_comerciales,tasa_cap_cdat_oficinas_cdat_bancos_comerciales,monto_cap_cdat_oficinas_cdat_bancos_comerciales
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
var Position=(datacsv[0].indexOf(("Fecha").toString()))
           setFecha((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Tasa_A_30_Cdt_Bancos_Comerciales").toString()))
           setTasa_A_30_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Monto_A_30_Cdt_Bancos_Comerciales").toString()))
           setMonto_A_30_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_31_y_44_cdt_bancos_comerciales").toString()))
           setTasa_Entre_31_Y_44_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_31_y_44_cdt_bancos_comerciales").toString()))
           setMonto_Entre_31_Y_44_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_a_45_cdt_bancos_comerciales").toString()))
           setTasa_A_45_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_a_45_cdt_bancos_comerciales").toString()))
           setMonto_A_45_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_46_y_59_cdt_bancos_comerciales").toString()))
           setTasa_Entre_46_Y_59_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_46_y_59_cdt_bancos_comerciales").toString()))
           setMonto_Entre_46_Y_59_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_a_60_cdt_bancos_comerciales").toString()))
           setTasa_A_60_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_a_60_cdt_bancos_comerciales").toString()))
           setMonto_A_60_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_61_y_89_cdt_bancos_comerciales").toString()))
           setTasa_Entre_61_Y_89_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_61_y_89_cdt_bancos_comerciales").toString()))
           setMonto_Entre_61_Y_89_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_a_90_cdt_bancos_comerciales").toString()))
           setTasa_A_90_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_a_90_cdt_bancos_comerciales").toString()))
           setMonto_A_90_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_91_y_119_cdt_bancos_comerciales").toString()))
           setTasa_Entre_91_Y_119_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_91_y_119_cdt_bancos_comerciales").toString()))
           setMonto_Entre_91_Y_119_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_a_120_cdt_bancos_comerciales").toString()))
           setTasa_A_120_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_a_120_cdt_bancos_comerciales").toString()))
           setMonto_A_120_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_121_y_179_cdt_bancos_comerciales").toString()))
           setTasa_Entre_121_Y_179_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_121_y_179_cdt_bancos_comerciales").toString()))
           setMonto_Entre_121_Y_179_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_a_180_cdt_bancos_comerciales").toString()))
           setTasa_A_180_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_a_180_cdt_bancos_comerciales").toString()))
           setMonto_A_180_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_181_y_359_cdt_bancos_comerciales").toString()))
           setTasa_Entre_181_Y_359_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_181_y_359_cdt_bancos_comerciales").toString()))
           setMonto_Entre_181_Y_359_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_a_360_cdt_bancos_comerciales").toString()))
           setTasa_A_360_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_a_360_cdt_bancos_comerciales").toString()))
           setMonto_A_360_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_superiores_a_360_cdt_bancos_comerciales").toString()))
           setTasa_Superiores_A_360_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_superiores_a_360_cdt_bancos_comerciales").toString()))
           setMonto_Superiores_A_360_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales").toString()))
           setTasa_Cap_Cdt_Red_De_Oficinas_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales").toString()))
           setMonto_Cap_Cdt_Red_De_Oficinas__Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales").toString()))
           setTasa_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales").toString()))
           setMonto_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_2_y_14_cdats_cdat_bancos_comerciales").toString()))
           setTasa_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_2_y_14_cdats_cdat_bancos_comerciales").toString()))
           setMonto_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_15_y_29_cdats_cdat_bancos_comerciales").toString()))
           setTasa_Entre_15_Y_29_Cdats_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_15_y_29_cdat_bancos_comerciales").toString()))
           setMonto_Entre_15_Y_29_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_a_30_cdats_cdat_bancos_comerciales").toString()))
           setTasa_A_30_Cdats_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_a_30_cdat_bancos_comerciales").toString()))
           setMonto_A_30_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_31_y_90_cdats_cdat_bancos_comerciales").toString()))
           setTasa_Entre_31_Y_90_Cdats_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_31_y_90_cdat_bancos_comerciales").toString()))
           setMonto_Entre_31_Y_90_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_entre_91_y_180_cdats_cdat_bancos_comerciales").toString()))
           setTasa_Entre_91_Y_180_Cdats_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_entre_91_y_180_cdat_bancos_comerciales").toString()))
           setMonto_Entre_91_Y_180_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales").toString()))
           setTasa_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_de_181_en_adelante_cdats_cdat_bancos_comerciales").toString()))
           setMonto_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_cap_cdat_oficinas_cdat_bancos_comerciales").toString()))
           setTasa_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_cap_cdat_oficinas_cdat_bancos_comerciales").toString()))
           setMonto_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales(parseFloat(datacsv[1][Position]));
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
aria-labelledby="contained-modal-title-vcenter"
centered
id="myModal"
onHide={props.close}>
<Modal.Header closeButton>
<Modal.Title>Adicionar datos a tabla Databanrepublica_tcap</Modal.Title>
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
        <label htmlFor="creador"className="col-sm-7 col-form-label">creador</label><div className="col-sm-3">
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
        <label htmlFor="fecha"className="col-sm-7 col-form-label">Fecha</label><div className="col-sm-3">
        <input type="date" className="form-control" id="fecha" placeholder="Fecha"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fecha}></input></div></div>
        { formik.touched.fecha&& formik.errors.fecha? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fecha}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="empresa_id"className="col-sm-7 col-form-label">empresa_id</label><div className="col-sm-3">
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
        <label htmlFor="tasa_a_30_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_A_30_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_a_30_cdt_bancos_comerciales" placeholder="Tasa_A_30_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_a_30_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_a_30_cdt_bancos_comerciales&& formik.errors.tasa_a_30_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_a_30_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_a_30_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_A_30_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_a_30_cdt_bancos_comerciales" placeholder="Monto_A_30_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_a_30_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_a_30_cdt_bancos_comerciales&& formik.errors.monto_a_30_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_a_30_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_31_y_44_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_31_Y_44_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_31_y_44_cdt_bancos_comerciales" placeholder="Tasa_Entre_31_Y_44_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_31_y_44_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_31_y_44_cdt_bancos_comerciales&& formik.errors.tasa_entre_31_y_44_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_31_y_44_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_31_y_44_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_31_Y_44_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_31_y_44_cdt_bancos_comerciales" placeholder="Monto_Entre_31_Y_44_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_31_y_44_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_31_y_44_cdt_bancos_comerciales&& formik.errors.monto_entre_31_y_44_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_31_y_44_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_a_45_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_A_45_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_a_45_cdt_bancos_comerciales" placeholder="Tasa_A_45_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_a_45_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_a_45_cdt_bancos_comerciales&& formik.errors.tasa_a_45_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_a_45_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_a_45_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_A_45_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_a_45_cdt_bancos_comerciales" placeholder="Monto_A_45_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_a_45_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_a_45_cdt_bancos_comerciales&& formik.errors.monto_a_45_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_a_45_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_46_y_59_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_46_Y_59_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_46_y_59_cdt_bancos_comerciales" placeholder="Tasa_Entre_46_Y_59_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_46_y_59_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_46_y_59_cdt_bancos_comerciales&& formik.errors.tasa_entre_46_y_59_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_46_y_59_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_46_y_59_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_46_Y_59_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_46_y_59_cdt_bancos_comerciales" placeholder="Monto_Entre_46_Y_59_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_46_y_59_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_46_y_59_cdt_bancos_comerciales&& formik.errors.monto_entre_46_y_59_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_46_y_59_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_a_60_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_A_60_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_a_60_cdt_bancos_comerciales" placeholder="Tasa_A_60_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_a_60_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_a_60_cdt_bancos_comerciales&& formik.errors.tasa_a_60_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_a_60_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_a_60_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_A_60_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_a_60_cdt_bancos_comerciales" placeholder="Monto_A_60_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_a_60_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_a_60_cdt_bancos_comerciales&& formik.errors.monto_a_60_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_a_60_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_61_y_89_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_61_Y_89_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_61_y_89_cdt_bancos_comerciales" placeholder="Tasa_Entre_61_Y_89_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_61_y_89_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_61_y_89_cdt_bancos_comerciales&& formik.errors.tasa_entre_61_y_89_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_61_y_89_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_61_y_89_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_61_Y_89_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_61_y_89_cdt_bancos_comerciales" placeholder="Monto_Entre_61_Y_89_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_61_y_89_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_61_y_89_cdt_bancos_comerciales&& formik.errors.monto_entre_61_y_89_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_61_y_89_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_a_90_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_A_90_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_a_90_cdt_bancos_comerciales" placeholder="Tasa_A_90_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_a_90_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_a_90_cdt_bancos_comerciales&& formik.errors.tasa_a_90_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_a_90_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_a_90_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_A_90_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_a_90_cdt_bancos_comerciales" placeholder="Monto_A_90_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_a_90_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_a_90_cdt_bancos_comerciales&& formik.errors.monto_a_90_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_a_90_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_91_y_119_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_91_Y_119_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_91_y_119_cdt_bancos_comerciales" placeholder="Tasa_Entre_91_Y_119_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_91_y_119_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_91_y_119_cdt_bancos_comerciales&& formik.errors.tasa_entre_91_y_119_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_91_y_119_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_91_y_119_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_91_Y_119_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_91_y_119_cdt_bancos_comerciales" placeholder="Monto_Entre_91_Y_119_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_91_y_119_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_91_y_119_cdt_bancos_comerciales&& formik.errors.monto_entre_91_y_119_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_91_y_119_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_a_120_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_A_120_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_a_120_cdt_bancos_comerciales" placeholder="Tasa_A_120_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_a_120_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_a_120_cdt_bancos_comerciales&& formik.errors.tasa_a_120_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_a_120_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_a_120_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_A_120_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_a_120_cdt_bancos_comerciales" placeholder="Monto_A_120_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_a_120_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_a_120_cdt_bancos_comerciales&& formik.errors.monto_a_120_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_a_120_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_121_y_179_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_121_Y_179_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_121_y_179_cdt_bancos_comerciales" placeholder="Tasa_Entre_121_Y_179_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_121_y_179_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_121_y_179_cdt_bancos_comerciales&& formik.errors.tasa_entre_121_y_179_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_121_y_179_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_121_y_179_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_121_Y_179_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_121_y_179_cdt_bancos_comerciales" placeholder="Monto_Entre_121_Y_179_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_121_y_179_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_121_y_179_cdt_bancos_comerciales&& formik.errors.monto_entre_121_y_179_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_121_y_179_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_a_180_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_A_180_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_a_180_cdt_bancos_comerciales" placeholder="Tasa_A_180_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_a_180_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_a_180_cdt_bancos_comerciales&& formik.errors.tasa_a_180_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_a_180_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_a_180_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_A_180_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_a_180_cdt_bancos_comerciales" placeholder="Monto_A_180_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_a_180_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_a_180_cdt_bancos_comerciales&& formik.errors.monto_a_180_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_a_180_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_181_y_359_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_181_Y_359_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_181_y_359_cdt_bancos_comerciales" placeholder="Tasa_Entre_181_Y_359_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_181_y_359_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_181_y_359_cdt_bancos_comerciales&& formik.errors.tasa_entre_181_y_359_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_181_y_359_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_181_y_359_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_181_Y_359_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_181_y_359_cdt_bancos_comerciales" placeholder="Monto_Entre_181_Y_359_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_181_y_359_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_181_y_359_cdt_bancos_comerciales&& formik.errors.monto_entre_181_y_359_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_181_y_359_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_a_360_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_A_360_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_a_360_cdt_bancos_comerciales" placeholder="Tasa_A_360_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_a_360_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_a_360_cdt_bancos_comerciales&& formik.errors.tasa_a_360_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_a_360_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_a_360_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_A_360_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_a_360_cdt_bancos_comerciales" placeholder="Monto_A_360_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_a_360_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_a_360_cdt_bancos_comerciales&& formik.errors.monto_a_360_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_a_360_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_superiores_a_360_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Superiores_A_360_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_superiores_a_360_cdt_bancos_comerciales" placeholder="Tasa_Superiores_A_360_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_superiores_a_360_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_superiores_a_360_cdt_bancos_comerciales&& formik.errors.tasa_superiores_a_360_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_superiores_a_360_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_superiores_a_360_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Superiores_A_360_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_superiores_a_360_cdt_bancos_comerciales" placeholder="Monto_Superiores_A_360_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_superiores_a_360_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_superiores_a_360_cdt_bancos_comerciales&& formik.errors.monto_superiores_a_360_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_superiores_a_360_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Cap_Cdt_Red_De_Oficinas_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales" placeholder="Tasa_Cap_Cdt_Red_De_Oficinas_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales&& formik.errors.tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Cap_Cdt_Red_De_Oficinas__Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales" placeholder="Monto_Cap_Cdt_Red_De_Oficinas__Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales&& formik.errors.monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales" placeholder="Tasa_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales&& formik.errors.tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales" placeholder="Monto_Cap_Cdt_Por_Tesoreria_Cdt_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales}></input></div></div>
        { formik.touched.monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales&& formik.errors.monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_2_y_14_cdats_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_2_y_14_cdats_cdat_bancos_comerciales" placeholder="Tasa_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_2_y_14_cdats_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_2_y_14_cdats_cdat_bancos_comerciales&& formik.errors.tasa_entre_2_y_14_cdats_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_2_y_14_cdats_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_2_y_14_cdats_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_2_y_14_cdats_cdat_bancos_comerciales" placeholder="Monto_Entre_2_Y_14_Cdats_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_2_y_14_cdats_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_2_y_14_cdats_cdat_bancos_comerciales&& formik.errors.monto_entre_2_y_14_cdats_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_2_y_14_cdats_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_15_y_29_cdats_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_15_Y_29_Cdats_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_15_y_29_cdats_cdat_bancos_comerciales" placeholder="Tasa_Entre_15_Y_29_Cdats_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_15_y_29_cdats_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_15_y_29_cdats_cdat_bancos_comerciales&& formik.errors.tasa_entre_15_y_29_cdats_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_15_y_29_cdats_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_15_y_29_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_15_Y_29_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_15_y_29_cdat_bancos_comerciales" placeholder="Monto_Entre_15_Y_29_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_15_y_29_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_15_y_29_cdat_bancos_comerciales&& formik.errors.monto_entre_15_y_29_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_15_y_29_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_a_30_cdats_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_A_30_Cdats_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_a_30_cdats_cdat_bancos_comerciales" placeholder="Tasa_A_30_Cdats_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_a_30_cdats_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_a_30_cdats_cdat_bancos_comerciales&& formik.errors.tasa_a_30_cdats_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_a_30_cdats_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_a_30_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Monto_A_30_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_a_30_cdat_bancos_comerciales" placeholder="Monto_A_30_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_a_30_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.monto_a_30_cdat_bancos_comerciales&& formik.errors.monto_a_30_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_a_30_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_31_y_90_cdats_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_31_Y_90_Cdats_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_31_y_90_cdats_cdat_bancos_comerciales" placeholder="Tasa_Entre_31_Y_90_Cdats_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_31_y_90_cdats_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_31_y_90_cdats_cdat_bancos_comerciales&& formik.errors.tasa_entre_31_y_90_cdats_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_31_y_90_cdats_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_31_y_90_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_31_Y_90_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_31_y_90_cdat_bancos_comerciales" placeholder="Monto_Entre_31_Y_90_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_31_y_90_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_31_y_90_cdat_bancos_comerciales&& formik.errors.monto_entre_31_y_90_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_31_y_90_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_entre_91_y_180_cdats_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Entre_91_Y_180_Cdats_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_entre_91_y_180_cdats_cdat_bancos_comerciales" placeholder="Tasa_Entre_91_Y_180_Cdats_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_entre_91_y_180_cdats_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_entre_91_y_180_cdats_cdat_bancos_comerciales&& formik.errors.tasa_entre_91_y_180_cdats_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_entre_91_y_180_cdats_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_entre_91_y_180_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Entre_91_Y_180_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_entre_91_y_180_cdat_bancos_comerciales" placeholder="Monto_Entre_91_Y_180_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_entre_91_y_180_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.monto_entre_91_y_180_cdat_bancos_comerciales&& formik.errors.monto_entre_91_y_180_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_entre_91_y_180_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales" placeholder="Tasa_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales&& formik.errors.tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_de_181_en_adelante_cdats_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Monto_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_de_181_en_adelante_cdats_cdat_bancos_comerciales" placeholder="Monto_De_181_En_Adelante_Cdats_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_de_181_en_adelante_cdats_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.monto_de_181_en_adelante_cdats_cdat_bancos_comerciales&& formik.errors.monto_de_181_en_adelante_cdats_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_de_181_en_adelante_cdats_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_cap_cdat_oficinas_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Tasa_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="tasa_cap_cdat_oficinas_cdat_bancos_comerciales" placeholder="Tasa_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_cap_cdat_oficinas_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.tasa_cap_cdat_oficinas_cdat_bancos_comerciales&& formik.errors.tasa_cap_cdat_oficinas_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tasa_cap_cdat_oficinas_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_cap_cdat_oficinas_cdat_bancos_comerciales"className="col-sm-7 col-form-label">Monto_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales</label><div className="col-sm-3">
        <input type="number" className="form-control" id="monto_cap_cdat_oficinas_cdat_bancos_comerciales" placeholder="Monto_Cap_Cdat_Oficinas_Cdat_Bancos_Comerciales"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_cap_cdat_oficinas_cdat_bancos_comerciales}></input></div></div>
        { formik.touched.monto_cap_cdat_oficinas_cdat_bancos_comerciales&& formik.errors.monto_cap_cdat_oficinas_cdat_bancos_comerciales? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.monto_cap_cdat_oficinas_cdat_bancos_comerciales}</p>
        </div>
        ) : null  }
<div className="container">
<div className="row">
<div className="col-sm">
<input
type="submit"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
value="Guardar"
/>
</div>
<div className="col-sm">
<input
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
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

export default NuevoData_banrepublica_tcap
