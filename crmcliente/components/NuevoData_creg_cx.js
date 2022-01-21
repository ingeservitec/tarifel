
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

const NUEVO_DATA_CREG_CX= gql`
mutation nuevoData_creg_cx($input:Data_creg_cxInput ){
nuevoData_creg_cx(input:$input){
id
fecha
creador
empresa_id
resolucion
mo
RCT
RCAE
RCSNE
RCNU
Cf
PUI
}
}
`;
const OBTENER_DATA_CREG_CX = gql`
query obtenerData_creg_cx{
obtenerData_creg_cx{
id
fecha
creador
empresa_id
resolucion
mo
RCT
RCAE
RCSNE
RCNU
Cf
PUI

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


const NuevoDatacreg_cx= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [fecha, setFecha] = useState("");const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");const [resolucion, setResolucion] = useState("");const [mo, setMo] = useState("");const [RCT, setRCT] = useState("");const [RCAE, setRCAE] = useState("");const [RCSNE, setRCSNE] = useState("");const [RCNU, setRCNU] = useState("");const [Cf, setCf] = useState("");const [PUI, setPUI] = useState("");
const [nuevoData_creg_cx]=useMutation(NUEVO_DATA_CREG_CX, {
update(cache, { data: { nuevoData_creg_cx} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_creg_cx} = cache.readQuery({ query: OBTENER_DATA_CREG_CX});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_CREG_CX,
data: {
obtenerData_creg_cx: [...obtenerData_creg_cx, nuevoData_creg_cx]
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



const formik=useFormik({
initialValues: {
fecha:fecha,creador:creador,empresa_id:empresa_id,resolucion:resolucion,mo:mo,RCT:RCT,RCAE:RCAE,RCSNE:RCSNE,RCNU:RCNU,Cf:Cf,PUI:PUI
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
}),
onSubmit: async valores => {
        console.log(valores)
const{fecha,creador,empresa_id,resolucion,mo,RCT,RCAE,RCSNE,RCNU,Cf,PUI}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_creg_cx({
variables:{
input:{
fecha,creador,empresa_id,resolucion,mo,RCT,RCAE,RCSNE,RCNU,Cf,PUI
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
        setFecha((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Resolucion").toString()))
        setResolucion((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Mo").toString()))
        setMo(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RCT").toString()))
        setRCT(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RCAE").toString()))
        setRCAE(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RCSNE").toString()))
        setRCSNE(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("RCNU").toString()))
        setRCNU(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Cf").toString()))
        setCf(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("PUI").toString()))
        setPUI(parseFloat(datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla DataCREG_CX</Modal.Title>
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
        <label htmlFor="fecha"className="col-sm-7 col-form-label">Fecha</label><div className="col-sm-5">
        <input type="date" className="form-control" id="fecha" placeholder="Fecha"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fecha}></input></div>
        </div>
        { formik.touched.fecha&& formik.errors.fecha? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fecha}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="creador"className="col-sm-7 col-form-label">creador</label><div className="col-sm-5">
        <input type="number" className="form-control" id="creador" placeholder="creador"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.creador}></input></div>
        </div>
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
value={formik.values.empresa_id}></input></div>
        </div>
        { formik.touched.empresa_id&& formik.errors.empresa_id? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.empresa_id}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="resolucion"className="col-sm-7 col-form-label">Resolucion</label><div className="col-sm-5">
        <input type="text" className="form-control" id="resolucion" placeholder="Resolucion"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.resolucion}></input></div>
        </div>
        { formik.touched.resolucion&& formik.errors.resolucion? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.resolucion}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="mo"className="col-sm-7 col-form-label">Mo</label><div className="col-sm-5">
        <input type="number" className="form-control" id="mo" placeholder="Mo"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.mo}></input></div>
        </div>
        { formik.touched.mo&& formik.errors.mo? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.mo}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="RCT"className="col-sm-7 col-form-label">RCT</label><div className="col-sm-5">
        <input type="number" className="form-control" id="RCT" placeholder="RCT"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.RCT}></input></div>
        </div>
        { formik.touched.RCT&& formik.errors.RCT? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.RCT}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="RCAE"className="col-sm-7 col-form-label">RCAE</label><div className="col-sm-5">
        <input type="number" className="form-control" id="RCAE" placeholder="RCAE"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.RCAE}></input></div>
        </div>
        { formik.touched.RCAE&& formik.errors.RCAE? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.RCAE}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="RCSNE"className="col-sm-7 col-form-label">RCSNE</label><div className="col-sm-5">
        <input type="number" className="form-control" id="RCSNE" placeholder="RCSNE"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.RCSNE}></input></div>
        </div>
        { formik.touched.RCSNE&& formik.errors.RCSNE? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.RCSNE}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="RCNU"className="col-sm-7 col-form-label">RCNU</label><div className="col-sm-5">
        <input type="number" className="form-control" id="RCNU" placeholder="RCNU"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.RCNU}></input></div>
        </div>
        { formik.touched.RCNU&& formik.errors.RCNU? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.RCNU}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="Cf"className="col-sm-7 col-form-label">Cf</label><div className="col-sm-5">
        <input type="number" className="form-control" id="Cf" placeholder="Cf"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.Cf}></input></div>
        </div>
        { formik.touched.Cf&& formik.errors.Cf? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.Cf}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="PUI"className="col-sm-7 col-form-label">PUI</label><div className="col-sm-5">
        <input type="number" className="form-control" id="PUI" placeholder="PUI"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.PUI}></input></div>
        </div>
        { formik.touched.PUI&& formik.errors.PUI? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.PUI}</p>
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

export default NuevoDatacreg_cx
