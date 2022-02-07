
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

const NUEVO_DATA_MME_GIRO= gql`
mutation nuevoData_mme_giro($input:Data_mme_giroInput ){
nuevoData_mme_giro(input:$input){
id
creador
empresa_id
fecha
fondo
resolucion
link_resolucion
giro_cop

}
}
`;
const OBTENER_DATA_MME_GIRO = gql`
query obtenerData_mme_giro{
obtenerData_mme_giro{
id
creador
empresa_id
fecha
fondo
resolucion
link_resolucion
giro_cop

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


const NuevoData_mme_giro= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");const [fecha, setFecha] = useState("");const [fondo, setFondo] = useState("");const [resolucion, setResolucion] = useState("");const [link_resolucion, setLink_Resolucion] = useState("");const [giro_cop, setGiro_Cop] = useState("");
const [nuevoData_mme_giro]=useMutation(NUEVO_DATA_MME_GIRO, {
update(cache, { data: { nuevoData_mme_giro} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_mme_giro} = cache.readQuery({ query: OBTENER_DATA_MME_GIRO});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_MME_GIRO,
data: {
obtenerData_mme_giro: [...obtenerData_mme_giro, nuevoData_mme_giro]
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
if (encabezados[j-2] === 'empresa_id' || encabezados[j-2] === 'Fecha' || encabezados[j-2] === 'Fondo' || encabezados[j-2] === 'Resolucion' || encabezados[j-2] === 'Link_Resolucion' )
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
creador:creador,empresa_id:empresa_id,fecha:fecha,fondo:fondo,resolucion:resolucion,link_resolucion:link_resolucion,giro_cop:giro_cop
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
}),
onSubmit: async valores => {
const{creador,empresa_id,fecha,fondo,resolucion,link_resolucion,giro_cop}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_mme_giro({
variables:{
input:{
creador,empresa_id,fecha,fondo,resolucion,link_resolucion,giro_cop
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
           setFecha((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Fondo").toString()))
           setFondo((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Resolucion").toString()))
           setResolucion((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("link_resolucion").toString()))
           setLink_Resolucion((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("giro_cop").toString()))
           setGiro_Cop(parseFloat(datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla Datamme_giro</Modal.Title>
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
        <label htmlFor="fecha" className="col-sm-7 col-form-label">Fecha</label><div className="col-sm-5">
        <input type="date" className="form-control" id="fecha" placeholder="Fecha"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fecha}></input></div></div>
        { formik.touched.fecha&& formik.errors.fecha? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fecha}</p>
        </div>
        ) : null  }
        <div className="form-group row">
        <label htmlFor="fondo" className="col-sm-7 col-form-label">Fondo</label><div className="col-sm-5">
        <select type="text" className="form-control" id="fondo" placeholder="Fondo"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.fondo}>
        <option value="">
    Seleccione {" "}
    </option>
    <option value="FSSRI">
    FSSRI
    </option>
    <option value="FOES">
    FOES
    </option>
      </select></div></div>
        { formik.touched.fondo&& formik.errors.fondo? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fondo}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="resolucion" className="col-sm-7 col-form-label">Resolucion</label><div className="col-sm-5">
        <input type="text" className="form-control" id="resolucion" placeholder="Resolucion"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.resolucion}></input></div></div>
        { formik.touched.resolucion&& formik.errors.resolucion? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.resolucion}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="link_resolucion" className="col-sm-7 col-form-label">Link_Resolucion</label><div className="col-sm-5">
        <input type="text" className="form-control" id="link_resolucion" placeholder="Link_Resolucion"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.link_resolucion}></input></div></div>
        { formik.touched.link_resolucion&& formik.errors.link_resolucion? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.link_resolucion}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="giro_cop" className="col-sm-7 col-form-label">Giro_Cop</label><div className="col-sm-5">
        <input type="number" className="form-control" id="giro_cop" placeholder="Giro_Cop"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.giro_cop}></input></div></div>
        { formik.touched.giro_cop&& formik.errors.giro_cop? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.giro_cop}</p>
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

export default NuevoData_mme_giro
