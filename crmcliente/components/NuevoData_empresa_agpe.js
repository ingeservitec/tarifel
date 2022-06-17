
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

const NUEVO_DATA_EMPRESA_AGPE= gql`
mutation nuevoData_empresa_agpe($input:Data_empresa_agpeInput ){
nuevoData_empresa_agpe(input:$input){
id
creador
empresa_id
niu
anho
mes
dia
tipo_ene
hora_01
hora_02
hora_03
hora_04
hora_05
hora_06
hora_07
hora_08
hora_09
hora_10
hora_11
hora_12
hora_13
hora_14
hora_15
hora_16
hora_17
hora_18
hora_19
hora_20
hora_21
hora_22
hora_23
hora_24





















































































}
}
`;
const OBTENER_DATA_EMPRESA_AGPE = gql`
query obtenerData_empresa_agpe{
obtenerData_empresa_agpe{
id
creador
empresa_id
niu
anho
mes
dia
tipo_ene
hora_01
hora_02
hora_03
hora_04
hora_05
hora_06
hora_07
hora_08
hora_09
hora_10
hora_11
hora_12
hora_13
hora_14
hora_15
hora_16
hora_17
hora_18
hora_19
hora_20
hora_21
hora_22
hora_23
hora_24





















































































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


const NuevoData_empresa_agpe= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");const [niu, setNiu] = useState("");const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [dia, setDia] = useState("");const [tipo_ene, setTipo_Ene] = useState("");const [hora_01, setHora_01] = useState("");const [hora_02, setHora_02] = useState("");const [hora_03, setHora_03] = useState("");const [hora_04, setHora_04] = useState("");const [hora_05, setHora_05] = useState("");const [hora_06, setHora_06] = useState("");const [hora_07, setHora_07] = useState("");const [hora_08, setHora_08] = useState("");const [hora_09, setHora_09] = useState("");const [hora_10, setHora_10] = useState("");const [hora_11, setHora_11] = useState("");const [hora_12, setHora_12] = useState("");const [hora_13, setHora_13] = useState("");const [hora_14, setHora_14] = useState("");const [hora_15, setHora_15] = useState("");const [hora_16, setHora_16] = useState("");const [hora_17, setHora_17] = useState("");const [hora_18, setHora_18] = useState("");const [hora_19, setHora_19] = useState("");const [hora_20, setHora_20] = useState("");const [hora_21, setHora_21] = useState("");const [hora_22, setHora_22] = useState("");const [hora_23, setHora_23] = useState("");const [hora_24, setHora_24] = useState("");
const [nuevoData_empresa_agpe]=useMutation(NUEVO_DATA_EMPRESA_AGPE, {
update(cache, { data: { nuevoData_empresa_agpe} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_empresa_agpe} = cache.readQuery({ query: OBTENER_DATA_EMPRESA_AGPE});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_EMPRESA_AGPE,
data: {
obtenerData_empresa_agpe: [...obtenerData_empresa_agpe, nuevoData_empresa_agpe]
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
obj[headers[j-2]] = (currentline[j-2]);
}
else{
obj[headers[j-2]] = parseFloat(currentline[j-2]);

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
creador:creador,empresa_id:empresa_id,niu:niu,anho:anho,mes:mes,dia:dia,tipo_ene:tipo_ene,hora_01:hora_01,hora_02:hora_02,hora_03:hora_03,hora_04:hora_04,hora_05:hora_05,hora_06:hora_06,hora_07:hora_07,hora_08:hora_08,hora_09:hora_09,hora_10:hora_10,hora_11:hora_11,hora_12:hora_12,hora_13:hora_13,hora_14:hora_14,hora_15:hora_15,hora_16:hora_16,hora_17:hora_17,hora_18:hora_18,hora_19:hora_19,hora_20:hora_20,hora_21:hora_21,hora_22:hora_22,hora_23:hora_23,hora_24:hora_24
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
anho: Yup.string()
.required('El Año es obligatorio')
}),
onSubmit: async valores => {
const{creador,empresa_id,niu,anho,mes,dia,tipo_ene,hora_01,hora_02,hora_03,hora_04,hora_05,hora_06,hora_07,hora_08,hora_09,hora_10,hora_11,hora_12,hora_13,hora_14,hora_15,hora_16,hora_17,hora_18,hora_19,hora_20,hora_21,hora_22,hora_23,hora_24}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_empresa_agpe({
variables:{
input:{
creador,empresa_id,niu,anho,mes,dia,tipo_ene,hora_01,hora_02,hora_03,hora_04,hora_05,hora_06,hora_07,hora_08,hora_09,hora_10,hora_11,hora_12,hora_13,hora_14,hora_15,hora_16,hora_17,hora_18,hora_19,hora_20,hora_21,hora_22,hora_23,hora_24
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
var Position=(datacsv[0].indexOf(("Niu").toString()))
           setNiu(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Anho").toString()))
           setAnho(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Mes").toString()))
           setMes(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("dia").toString()))
           setDia(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tipo_ene").toString()))
           setTipo_Ene((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_01").toString()))
           setHora_01(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_02").toString()))
           setHora_02(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_03").toString()))
           setHora_03(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_04").toString()))
           setHora_04(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_05").toString()))
           setHora_05(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_06").toString()))
           setHora_06(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_07").toString()))
           setHora_07(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_08").toString()))
           setHora_08(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_09").toString()))
           setHora_09(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_10").toString()))
           setHora_10(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_11").toString()))
           setHora_11(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_12").toString()))
           setHora_12(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_13").toString()))
           setHora_13(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_14").toString()))
           setHora_14(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_15").toString()))
           setHora_15(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_16").toString()))
           setHora_16(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_17").toString()))
           setHora_17(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_18").toString()))
           setHora_18(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_19").toString()))
           setHora_19(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_20").toString()))
           setHora_20(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_21").toString()))
           setHora_21(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_22").toString()))
           setHora_22(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_23").toString()))
           setHora_23(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("hora_24").toString()))
           setHora_24(parseFloat(datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla Dataempresa_agpe</Modal.Title>
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
        <label htmlFor="niu"className="col-sm-7 col-form-label">Niu</label><div className="col-sm-5">
        <input type="number" className="form-control" id="niu" placeholder="Niu"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.niu}></input></div></div>
        { formik.touched.niu&& formik.errors.niu? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.niu}</p>
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
        <label htmlFor="dia"className="col-sm-7 col-form-label">Dia</label><div className="col-sm-5">
        <input type="number" className="form-control" id="dia" placeholder="Dia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dia}></input></div></div>
        { formik.touched.dia&& formik.errors.dia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.dia}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tipo_ene"className="col-sm-7 col-form-label">Tipo_Ene</label><div className="col-sm-5">
        <input type="text" className="form-control" id="tipo_ene" placeholder="Tipo_Ene"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tipo_ene}></input></div></div>
        { formik.touched.tipo_ene&& formik.errors.tipo_ene? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tipo_ene}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_01"className="col-sm-7 col-form-label">Hora_01</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_01" placeholder="Hora_01"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_01}></input></div></div>
        { formik.touched.hora_01&& formik.errors.hora_01? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_01}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_02"className="col-sm-7 col-form-label">Hora_02</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_02" placeholder="Hora_02"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_02}></input></div></div>
        { formik.touched.hora_02&& formik.errors.hora_02? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_02}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_03"className="col-sm-7 col-form-label">Hora_03</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_03" placeholder="Hora_03"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_03}></input></div></div>
        { formik.touched.hora_03&& formik.errors.hora_03? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_03}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_04"className="col-sm-7 col-form-label">Hora_04</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_04" placeholder="Hora_04"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_04}></input></div></div>
        { formik.touched.hora_04&& formik.errors.hora_04? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_04}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_05"className="col-sm-7 col-form-label">Hora_05</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_05" placeholder="Hora_05"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_05}></input></div></div>
        { formik.touched.hora_05&& formik.errors.hora_05? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_05}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_06"className="col-sm-7 col-form-label">Hora_06</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_06" placeholder="Hora_06"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_06}></input></div></div>
        { formik.touched.hora_06&& formik.errors.hora_06? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_06}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_07"className="col-sm-7 col-form-label">Hora_07</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_07" placeholder="Hora_07"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_07}></input></div></div>
        { formik.touched.hora_07&& formik.errors.hora_07? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_07}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_08"className="col-sm-7 col-form-label">Hora_08</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_08" placeholder="Hora_08"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_08}></input></div></div>
        { formik.touched.hora_08&& formik.errors.hora_08? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_08}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_09"className="col-sm-7 col-form-label">Hora_09</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_09" placeholder="Hora_09"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_09}></input></div></div>
        { formik.touched.hora_09&& formik.errors.hora_09? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_09}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_10"className="col-sm-7 col-form-label">Hora_10</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_10" placeholder="Hora_10"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_10}></input></div></div>
        { formik.touched.hora_10&& formik.errors.hora_10? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_10}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_11"className="col-sm-7 col-form-label">Hora_11</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_11" placeholder="Hora_11"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_11}></input></div></div>
        { formik.touched.hora_11&& formik.errors.hora_11? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_11}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_12"className="col-sm-7 col-form-label">Hora_12</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_12" placeholder="Hora_12"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_12}></input></div></div>
        { formik.touched.hora_12&& formik.errors.hora_12? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_12}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_13"className="col-sm-7 col-form-label">Hora_13</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_13" placeholder="Hora_13"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_13}></input></div></div>
        { formik.touched.hora_13&& formik.errors.hora_13? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_13}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_14"className="col-sm-7 col-form-label">Hora_14</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_14" placeholder="Hora_14"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_14}></input></div></div>
        { formik.touched.hora_14&& formik.errors.hora_14? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_14}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_15"className="col-sm-7 col-form-label">Hora_15</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_15" placeholder="Hora_15"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_15}></input></div></div>
        { formik.touched.hora_15&& formik.errors.hora_15? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_15}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_16"className="col-sm-7 col-form-label">Hora_16</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_16" placeholder="Hora_16"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_16}></input></div></div>
        { formik.touched.hora_16&& formik.errors.hora_16? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_16}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_17"className="col-sm-7 col-form-label">Hora_17</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_17" placeholder="Hora_17"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_17}></input></div></div>
        { formik.touched.hora_17&& formik.errors.hora_17? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_17}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_18"className="col-sm-7 col-form-label">Hora_18</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_18" placeholder="Hora_18"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_18}></input></div></div>
        { formik.touched.hora_18&& formik.errors.hora_18? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_18}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_19"className="col-sm-7 col-form-label">Hora_19</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_19" placeholder="Hora_19"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_19}></input></div></div>
        { formik.touched.hora_19&& formik.errors.hora_19? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_19}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_20"className="col-sm-7 col-form-label">Hora_20</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_20" placeholder="Hora_20"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_20}></input></div></div>
        { formik.touched.hora_20&& formik.errors.hora_20? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_20}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_21"className="col-sm-7 col-form-label">Hora_21</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_21" placeholder="Hora_21"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_21}></input></div></div>
        { formik.touched.hora_21&& formik.errors.hora_21? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_21}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_22"className="col-sm-7 col-form-label">Hora_22</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_22" placeholder="Hora_22"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_22}></input></div></div>
        { formik.touched.hora_22&& formik.errors.hora_22? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_22}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_23"className="col-sm-7 col-form-label">Hora_23</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_23" placeholder="Hora_23"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_23}></input></div></div>
        { formik.touched.hora_23&& formik.errors.hora_23? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_23}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="hora_24"className="col-sm-7 col-form-label">Hora_24</label><div className="col-sm-5">
        <input type="number" className="form-control" id="hora_24" placeholder="Hora_24"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.hora_24}></input></div></div>
        { formik.touched.hora_24&& formik.errors.hora_24? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.hora_24}</p>
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

export default NuevoData_empresa_agpe
