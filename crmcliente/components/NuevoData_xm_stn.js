
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

const NUEVO_DATA_DATAXMSTN= gql`
mutation nuevoDataxmstn($input:DataxmstnInput ){
nuevoDataxmstn(input:$input){
id
creador
empresa_id
anho
mes
t_cop_kwh
t_prima_cop_kwh
Energia_sin_kwh
Ing_Reg_Bruto_T_cop
Ing_Compensar_T_cop
Ing_Reg_Neto_T_cop
delta_t_cop_kwh

}
}
`;
const OBTENER_DATA_DATAXMSTN = gql`
query obtenerDataxmstn{
obtenerDataxmstn{
id
creador
empresa_id
anho
mes
t_cop_kwh
t_prima_cop_kwh
Energia_sin_kwh
Ing_Reg_Bruto_T_cop
Ing_Compensar_T_cop
Ing_Reg_Neto_T_cop
delta_t_cop_kwh

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


const NuevoData_dataxmstn= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [t_cop_kwh, setT_Cop_Kwh] = useState("");const [t_prima_cop_kwh, setT_Prima_Cop_Kwh] = useState("");const [Energia_sin_kwh, setEnergia_Sin_Kwh] = useState("");const [Ing_Reg_Bruto_T_cop, setIng_Reg_Bruto_T_Cop] = useState("");const [Ing_Compensar_T_cop, setIng_Compensar_T_Cop] = useState("");const [Ing_Reg_Neto_T_cop, setIng_Reg_Neto_T_Cop] = useState("");const [delta_t_cop_kwh, setDelta_T_Cop_Kwh] = useState("");
const [nuevoDataxmstn]=useMutation(NUEVO_DATA_DATAXMSTN, {
update(cache, { data: { nuevoDataxmstn} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerDataxmstn} = cache.readQuery({ query: OBTENER_DATA_DATAXMSTN});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_DATAXMSTN,
data: {
obtenerDataxmstn: [...obtenerDataxmstn, nuevoDataxmstn]
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
creador:creador,empresa_id:empresa_id,anho:anho,mes:mes,t_cop_kwh:t_cop_kwh,t_prima_cop_kwh:t_prima_cop_kwh,Energia_sin_kwh:Energia_sin_kwh,Ing_Reg_Bruto_T_cop:Ing_Reg_Bruto_T_cop,Ing_Compensar_T_cop:Ing_Compensar_T_cop,Ing_Reg_Neto_T_cop:Ing_Reg_Neto_T_cop,delta_t_cop_kwh:delta_t_cop_kwh
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
}),
onSubmit: async valores => {
const{creador,empresa_id,anho,mes,t_cop_kwh,t_prima_cop_kwh,Energia_sin_kwh,Ing_Reg_Bruto_T_cop,Ing_Compensar_T_cop,Ing_Reg_Neto_T_cop,delta_t_cop_kwh}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
        console.log(creador,empresa_id,anho,mes,t_cop_kwh,t_prima_cop_kwh,Energia_sin_kwh,Ing_Reg_Bruto_T_cop,Ing_Compensar_T_cop,Ing_Reg_Neto_T_cop,delta_t_cop_kwh)
const{data}=await nuevoDataxmstn({
variables:{
input:{
creador,empresa_id,anho,mes,t_cop_kwh,t_prima_cop_kwh,Energia_sin_kwh,Ing_Reg_Bruto_T_cop,Ing_Compensar_T_cop,Ing_Reg_Neto_T_cop,delta_t_cop_kwh
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
           setMes(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("T_Cop_Kwh").toString()))
           setT_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("t_prima_cop_kwh").toString()))
           setT_Prima_Cop_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Energia_sin_kwh").toString()))
           setEnergia_Sin_Kwh(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Ing_Reg_Bruto_T_cop").toString()))
           setIng_Reg_Bruto_T_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Ing_Compensar_T_cop").toString()))
           setIng_Compensar_T_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Ing_Reg_Neto_T_cop").toString()))
           setIng_Reg_Neto_T_Cop(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("delta_t_cop_kwh").toString()))
           setDelta_T_Cop_Kwh(parseFloat(datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla DataDataxmstn</Modal.Title>
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
        <label htmlFor="anho"className="col-sm-7 col-form-label">Anho</label><div className="col-sm-3">
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
        <label htmlFor="mes"className="col-sm-7 col-form-label">Mes</label><div className="col-sm-3">
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
        <label htmlFor="t_cop_kwh"className="col-sm-7 col-form-label">T_Cop_Kwh</label><div className="col-sm-3">
        <input type="number" className="form-control" id="t_cop_kwh" placeholder="T_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.t_cop_kwh}></input></div></div>
        { formik.touched.t_cop_kwh&& formik.errors.t_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.t_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="t_prima_cop_kwh"className="col-sm-7 col-form-label">T_Prima_Cop_Kwh</label><div className="col-sm-3">
        <input type="number" className="form-control" id="t_prima_cop_kwh" placeholder="T_Prima_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.t_prima_cop_kwh}></input></div></div>
        { formik.touched.t_prima_cop_kwh&& formik.errors.t_prima_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.t_prima_cop_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="Energia_sin_kwh"className="col-sm-7 col-form-label">Energia_Sin_Kwh</label><div className="col-sm-3">
        <input type="number" className="form-control" id="Energia_sin_kwh" placeholder="Energia_Sin_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.Energia_sin_kwh}></input></div></div>
        { formik.touched.Energia_sin_kwh&& formik.errors.Energia_sin_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.Energia_sin_kwh}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="Ing_Reg_Bruto_T_cop"className="col-sm-7 col-form-label">Ing_Reg_Bruto_T_Cop</label><div className="col-sm-3">
        <input type="number" className="form-control" id="Ing_Reg_Bruto_T_cop" placeholder="Ing_Reg_Bruto_T_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.Ing_Reg_Bruto_T_cop}></input></div></div>
        { formik.touched.Ing_Reg_Bruto_T_cop&& formik.errors.Ing_Reg_Bruto_T_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.Ing_Reg_Bruto_T_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="Ing_Compensar_T_cop"className="col-sm-7 col-form-label">Ing_Compensar_T_Cop</label><div className="col-sm-3">
        <input type="number" className="form-control" id="Ing_Compensar_T_cop" placeholder="Ing_Compensar_T_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.Ing_Compensar_T_cop}></input></div></div>
        { formik.touched.Ing_Compensar_T_cop&& formik.errors.Ing_Compensar_T_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.Ing_Compensar_T_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="Ing_Reg_Neto_T_cop"className="col-sm-7 col-form-label">Ing_Reg_Neto_T_Cop</label><div className="col-sm-3">
        <input type="number" className="form-control" id="Ing_Reg_Neto_T_cop" placeholder="Ing_Reg_Neto_T_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.Ing_Reg_Neto_T_cop}></input></div></div>
        { formik.touched.Ing_Reg_Neto_T_cop&& formik.errors.Ing_Reg_Neto_T_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.Ing_Reg_Neto_T_cop}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="delta_t_cop_kwh"className="col-sm-7 col-form-label">Delta_T_Cop_Kwh</label><div className="col-sm-3">
        <input type="number" className="form-control" id="delta_t_cop_kwh" placeholder="Delta_T_Cop_Kwh"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.delta_t_cop_kwh}></input></div></div>
        { formik.touched.delta_t_cop_kwh&& formik.errors.delta_t_cop_kwh? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.delta_t_cop_kwh}</p>
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

export default NuevoData_dataxmstn
