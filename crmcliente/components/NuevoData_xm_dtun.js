
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

const NUEVO_DATA_XM_DTUN= gql`
mutation nuevoData_xm_dtun($input:Data_xm_dtunInput ){
nuevoData_xm_dtun(input:$input){
id
creador
empresa_id
anho
mes
area
nivel_tension
valor
operador_red
version
}
}
`;
const OBTENER_DATA_XM_DTUN = gql`
query obtenerData_xm_dtun{
obtenerData_xm_dtun{
id
creador
empresa_id
anho
mes
area
nivel_tension
valor
operador_red
version
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


const NuevoData_xm_dtun= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");const [version, setVersion] = useState("");const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [area, setArea] = useState("");const [nivel_tension, setNivel_Tension] = useState("");const [valor, setValor] = useState("");const [operador_red, setOperador_Red] = useState("");
const [nuevoData_xm_dtun]=useMutation(NUEVO_DATA_XM_DTUN, {
update(cache, { data: { nuevoData_xm_dtun} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_xm_dtun} = cache.readQuery({ query: OBTENER_DATA_XM_DTUN});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_XM_DTUN,
data: {
obtenerData_xm_dtun: [...obtenerData_xm_dtun, nuevoData_xm_dtun]
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
if (encabezados[j-2] === 'empresa_id' || encabezados[j-2] === 'Area' || encabezados[j-2] === 'Operador_Red' || encabezados[j-2] === 'Version' )
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
creador:creador,empresa_id:empresa_id,anho:anho,mes:mes,area:area,nivel_tension:nivel_tension,valor:valor,operador_red:operador_red,version:version
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
anho: Yup.string()
.required('El Año es obligatorio')
}),
onSubmit: async valores => {
const{creador,empresa_id,anho,mes,area,nivel_tension,valor,operador_red,version}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_xm_dtun({
variables:{
input:{
creador,empresa_id,anho,mes,area,nivel_tension,valor,operador_red,version
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
           setMes(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Area").toString()))
           setArea((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("nivel_tension").toString()))
           setNivel_Tension(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("valor").toString()))
           setValor(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("operador_red").toString()))
           setOperador_Red((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("version").toString()))
           setVersion((datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla Dataxm_dtun</Modal.Title>
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
        <label htmlFor="creador" className="col-sm-7 col-form-label">creador</label><div className="col-sm-5">
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
        <label htmlFor="empresa_id" className="col-sm-7 col-form-label">empresa_id</label><div className="col-sm-5">
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
        <label htmlFor="anho" className="col-sm-7 col-form-label">Anho</label><div className="col-sm-5">
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
        <label htmlFor="mes" className="col-sm-7 col-form-label">Mes</label><div className="col-sm-5">
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
        <label htmlFor="area" className="col-sm-7 col-form-label">Area</label><div className="col-sm-5">
        <input type="text" className="form-control" id="area" placeholder="Area"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.area}></input></div></div>
        { formik.touched.area&& formik.errors.area? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.area}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="nivel_tension" className="col-sm-7 col-form-label">Nivel_Tension</label><div className="col-sm-5">
        <input type="number" className="form-control" id="nivel_tension" placeholder="Nivel_Tension"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nivel_tension}></input></div></div>
        { formik.touched.nivel_tension&& formik.errors.nivel_tension? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.nivel_tension}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="valor" className="col-sm-7 col-form-label">Valor</label><div className="col-sm-5">
        <input type="number" className="form-control" id="valor" placeholder="Valor"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.valor}></input></div></div>
        { formik.touched.valor&& formik.errors.valor? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.valor}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="operador_red" className="col-sm-7 col-form-label">Operador_Red</label><div className="col-sm-5">
        <input type="text" className="form-control" id="operador_red" placeholder="Operador_Red"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.operador_red}></input></div></div>
        { formik.touched.operador_red&& formik.errors.operador_red? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.operador_red}</p>
        </div>
        ) : null  }
        <div className="form-group row">
        <label htmlFor="version" className="col-sm-7 col-form-label">Versión</label><div className="col-sm-5">
        <input type="text" className="form-control" id="version" placeholder="Version"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.version}></input></div></div>
        { formik.touched.version&& formik.errors.version? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.version}</p>
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

export default NuevoData_xm_dtun
