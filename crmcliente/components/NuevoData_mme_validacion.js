
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

const NUEVO_DATA_MME_VALIDACION= gql`
mutation nuevoData_mme_validacion($input:Data_mme_validacionInput ){
nuevoData_mme_validacion(input:$input){
id
creador
empresa_id
fecha
trimestre
anho
facturacion
subsidios
contribuciones
contrib_no_recaud_desp_6m
contrib_recaud_desp_de_conc
giros_recibidos
}
}
`;
const OBTENER_DATA_MME_VALIDACION = gql`
query obtenerData_mme_validacion{
obtenerData_mme_validacion{
id
creador
empresa_id
fecha
trimestre
anho
facturacion
subsidios
contribuciones
contrib_no_recaud_desp_6m
contrib_recaud_desp_de_conc
giros_recibidos
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


const NuevoData_mme_validacion= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");const [fecha, setFecha] = useState("");const [trimestre, setTrimestre] = useState("");const [anho, setAnho] = useState("");const [facturacion, setFacturacion] = useState("");const [subsidios, setSubsidios] = useState("");const [contribuciones, setContribuciones] = useState("");const [contrib_no_recaud_desp_6m, setContrib_No_Recaud_Desp_6M] = useState("");const [contrib_recaud_desp_de_conc, setContrib_Recaud_Desp_De_Conc] = useState("");const [giros_recibidos, setGiros_Recibidos] = useState("");
const [nuevoData_mme_validacion]=useMutation(NUEVO_DATA_MME_VALIDACION, {
update(cache, { data: { nuevoData_mme_validacion} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_mme_validacion} = cache.readQuery({ query: OBTENER_DATA_MME_VALIDACION});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_MME_VALIDACION,
data: {
obtenerData_mme_validacion: [...obtenerData_mme_validacion, nuevoData_mme_validacion]
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
if (encabezados[j-2] === 'empresa_id' || encabezados[j-2] === 'Fecha' )
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
creador:creador,empresa_id:empresa_id,fecha:fecha,trimestre:trimestre,anho:anho,facturacion:facturacion,subsidios:subsidios,contribuciones:contribuciones,contrib_no_recaud_desp_6m:contrib_no_recaud_desp_6m,contrib_recaud_desp_de_conc:contrib_recaud_desp_de_conc,giros_recibidos:giros_recibidos
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
anho: Yup.string()
.required('El Año es obligatorio')
}),
onSubmit: async valores => {
const{creador,empresa_id,fecha,trimestre,anho,facturacion,subsidios,contribuciones,contrib_no_recaud_desp_6m,contrib_recaud_desp_de_conc,giros_recibidos}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_mme_validacion({
variables:{
input:{
creador,empresa_id,fecha,trimestre,anho,facturacion,subsidios,contribuciones,contrib_no_recaud_desp_6m,contrib_recaud_desp_de_conc,giros_recibidos
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
setFecha((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Trimestre").toString()))
setTrimestre(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Anho").toString()))
setAnho(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Facturacion").toString()))
setFacturacion((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("subsidios").toString()))
setSubsidios(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("contribuciones").toString()))
setContribuciones(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("contrib_no_recaud_desp_6m").toString()))
setContrib_No_Recaud_Desp_6M(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("contrib_recaud_desp_de_conc").toString()))
setContrib_Recaud_Desp_De_Conc(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("giros_recibidos").toString()))
setGiros_Recibidos(parseFloat(datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla Datamme_validacion</Modal.Title>
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
<label htmlFor="trimestre"className="col-sm-7 col-form-label">Trimestre</label><div className="col-sm-3">
<input type="number" className="form-control" id="trimestre" placeholder="Trimestre"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trimestre}></input></div></div>
{ formik.touched.trimestre&& formik.errors.trimestre? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.trimestre}</p>
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
) : null  }
<div className="form-group row">
<label htmlFor="facturacion"className="col-sm-7 col-form-label">Facturacion</label><div className="col-sm-3">
<input type="text" className="form-control" id="facturacion" placeholder="Facturacion"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.facturacion}></input></div></div>
{ formik.touched.facturacion&& formik.errors.facturacion? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.facturacion}</p>
</div>
) : null  }

<div className="form-group row">
<label htmlFor="subsidios"className="col-sm-7 col-form-label">Subsidios</label><div className="col-sm-3">
<input type="number" className="form-control" id="subsidios" placeholder="Subsidios"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.subsidios}></input></div></div>
{ formik.touched.subsidios&& formik.errors.subsidios? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.subsidios}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="contribuciones"className="col-sm-7 col-form-label">Contribuciones</label><div className="col-sm-3">
<input type="number" className="form-control" id="contribuciones" placeholder="Contribuciones"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.contribuciones}></input></div></div>
{ formik.touched.contribuciones&& formik.errors.contribuciones? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.contribuciones}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="contrib_no_recaud_desp_6m"className="col-sm-7 col-form-label">Contrib_No_Recaud_Desp_6M</label><div className="col-sm-3">
<input type="number" className="form-control" id="contrib_no_recaud_desp_6m" placeholder="Contrib_No_Recaud_Desp_6M"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.contrib_no_recaud_desp_6m}></input></div></div>
{ formik.touched.contrib_no_recaud_desp_6m&& formik.errors.contrib_no_recaud_desp_6m? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.contrib_no_recaud_desp_6m}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="contrib_recaud_desp_de_conc"className="col-sm-7 col-form-label">Contrib_Recaud_Desp_De_Conc</label><div className="col-sm-3">
<input type="number" className="form-control" id="contrib_recaud_desp_de_conc" placeholder="Contrib_Recaud_Desp_De_Conc"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.contrib_recaud_desp_de_conc}></input></div></div>
{ formik.touched.contrib_recaud_desp_de_conc&& formik.errors.contrib_recaud_desp_de_conc? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.contrib_recaud_desp_de_conc}</p>
</div>
) : null  }<div className="form-group row">
<label htmlFor="giros_recibidos"className="col-sm-7 col-form-label">Giros_Recibidos</label><div className="col-sm-3">
<input type="number" className="form-control" id="giros_recibidos" placeholder="Giros_Recibidos"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.giros_recibidos}></input></div></div>
{ formik.touched.giros_recibidos&& formik.errors.giros_recibidos? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
<p className="font-bold">Error</p>
<p>{formik.errors.giros_recibidos}</p>
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

export default NuevoData_mme_validacion
