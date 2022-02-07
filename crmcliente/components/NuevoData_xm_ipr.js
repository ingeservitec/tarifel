
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

const NUEVO_DATA_XM_IPR= gql`
mutation nuevoData_xm_ipr($input:Data_xm_iprInput ){
nuevoData_xm_ipr(input:$input){
id
creador
empresa_id
anho
mes
strID
agrupaORMercado
fechavigencia
conceptoID
nivelEntrada
nivelSalida
valor









































































































}
}
`;
const OBTENER_DATA_XM_IPR = gql`
query obtenerData_xm_ipr{
obtenerData_xm_ipr{
id
creador
empresa_id
anho
mes
strID
agrupaORMercado
fechavigencia
conceptoID
nivelEntrada
nivelSalida
valor

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


const NuevoData_xm_ipr= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [strID, setStrid] = useState("");const [agrupaORMercado, setAgrupaormercado] = useState("");const [fechavigencia, setFechavigencia] = useState("");const [conceptoID, setConceptoid] = useState("");const [nivelEntrada, setNivelentrada] = useState("");const [nivelSalida, setNivelsalida] = useState("");const [valor, setValor] = useState("");
const [nuevoData_xm_ipr]=useMutation(NUEVO_DATA_XM_IPR, {
update(cache, { data: { nuevoData_xm_ipr} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_xm_ipr} = cache.readQuery({ query: OBTENER_DATA_XM_IPR});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_XM_IPR,
data: {
obtenerData_xm_ipr: [...obtenerData_xm_ipr, nuevoData_xm_ipr]
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
if (encabezados[j-2] === 'empresa_id' || encabezados[j-2] === 'Strid' || encabezados[j-2] === 'Agrupaormercado' || encabezados[j-2] === 'Fechavigencia' || encabezados[j-2] === 'Conceptoid' )
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
creador:creador,empresa_id:empresa_id,anho:anho,mes:mes,strID:strID,agrupaORMercado:agrupaORMercado,fechavigencia:fechavigencia,conceptoID:conceptoID,nivelEntrada:nivelEntrada,nivelSalida:nivelSalida,valor:valor
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
anho: Yup.string()
.required('El Año es obligatorio')
}),
onSubmit: async valores => {
const{creador,empresa_id,anho,mes,strID,agrupaORMercado,fechavigencia,conceptoID,nivelEntrada,nivelSalida,valor}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_xm_ipr({
variables:{
input:{
creador,empresa_id,anho,mes,strID,agrupaORMercado,fechavigencia,conceptoID,nivelEntrada,nivelSalida,valor
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
           setMes(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Strid").toString()))
           setStrid((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("agrupaORMercado").toString()))
           setAgrupaormercado((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("fechavigencia").toString()))
           setFechavigencia((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("conceptoID").toString()))
           setConceptoid((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("nivelEntrada").toString()))
           setNivelentrada(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("nivelSalida").toString()))
           setNivelsalida(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("valor").toString()))
           setValor(parseFloat(datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla Dataxm_ipr</Modal.Title>
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
        <label htmlFor="strID" className="col-sm-7 col-form-label">Strid</label><div className="col-sm-5">
        <input type="text" className="form-control" id="strID" placeholder="Strid"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.strID}></input></div></div>
        { formik.touched.strID&& formik.errors.strID? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.strID}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="agrupaORMercado" className="col-sm-7 col-form-label">Agrupaormercado</label><div className="col-sm-5">
        <input type="text" className="form-control" id="agrupaORMercado" placeholder="Agrupaormercado"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.agrupaORMercado}></input></div></div>
        { formik.touched.agrupaORMercado&& formik.errors.agrupaORMercado? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.agrupaORMercado}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="fechavigencia" className="col-sm-7 col-form-label">Fechavigencia</label><div className="col-sm-5">
        <input type="date" className="form-control" id="fechavigencia" placeholder="Fechavigencia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fechavigencia}></input></div></div>
        { formik.touched.fechavigencia&& formik.errors.fechavigencia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fechavigencia}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="conceptoID" className="col-sm-7 col-form-label">Conceptoid</label><div className="col-sm-5">
        <input type="text" className="form-control" id="conceptoID" placeholder="Conceptoid"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.conceptoID}></input></div></div>
        { formik.touched.conceptoID&& formik.errors.conceptoID? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.conceptoID}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="nivelEntrada" className="col-sm-7 col-form-label">Nivelentrada</label><div className="col-sm-5">
        <input type="number" className="form-control" id="nivelEntrada" placeholder="Nivelentrada"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nivelEntrada}></input></div></div>
        { formik.touched.nivelEntrada&& formik.errors.nivelEntrada? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.nivelEntrada}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="nivelSalida" className="col-sm-7 col-form-label">Nivelsalida</label><div className="col-sm-5">
        <input type="number" className="form-control" id="nivelSalida" placeholder="Nivelsalida"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nivelSalida}></input></div></div>
        { formik.touched.nivelSalida&& formik.errors.nivelSalida? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.nivelSalida}</p>
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

export default NuevoData_xm_ipr
