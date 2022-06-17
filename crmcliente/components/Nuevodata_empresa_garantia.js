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

const NUEVO_DATA_EMPRESA_GARANTIA= gql`
mutation nuevoData_empresa_garantia($input:Data_empresa_garantiaInput ){
nuevoData_empresa_garantia(input:$input){
id
creador
empresa_id
tipo_garantia
nit_beneficiario
dv_beneficiario
emisor_banco
numero_garantia
fecha_inicio_vigencia
fecha_fin_vigencia
valor_garantia
costo_garantia
}
}
`;
const OBTENER_DATA_EMPRESA_GARANTIA = gql`
query obtenerData_empresa_garantia{
obtenerData_empresa_garantia{
id
creador
empresa_id
tipo_garantia
nit_beneficiario
dv_beneficiario
emisor_banco
numero_garantia
fecha_inicio_vigencia
fecha_fin_vigencia
valor_garantia
costo_garantia
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

const NuevoData_empresa_garantia= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");
const [tipo_garantia, setTipo_Garantia] = useState("");const [nit_beneficiario, setNit_Beneficiario] = useState("");
const [dv_beneficiario, setDv_Beneficiario] = useState("");const [emisor_banco, setEmisor_Banco] = useState("");
const [numero_garantia, setNumero_Garantia] = useState("");const [fecha_inicio_vigencia, setFecha_Inicio_Vigencia] = useState("");
const [fecha_fin_vigencia, setFecha_Fin_Vigencia] = useState("");const [valor_garantia, setValor_Garantia] = useState("");
const [costo_garantia, setCosto_Garantia] = useState("");

const [nuevoData_empresa_garantia]=useMutation(NUEVO_DATA_EMPRESA_GARANTIA, {
update(cache, { data: { nuevoData_empresa_garantia} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_empresa_garantia} = cache.readQuery({ query: OBTENER_DATA_EMPRESA_GARANTIA});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_EMPRESA_GARANTIA,
data: {
obtenerData_empresa_garantia: [...obtenerData_empresa_garantia, nuevoData_empresa_garantia]
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
console.log('ACA431')
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
creador:creador,empresa_id:empresa_id,tipo_garantia:tipo_garantia,nit_beneficiario:nit_beneficiario,dv_beneficiario:dv_beneficiario,
emisor_banco:emisor_banco,numero_garantia:numero_garantia,fecha_inicio_vigencia:fecha_inicio_vigencia,fecha_fin_vigencia:fecha_fin_vigencia,
valor_garantia:valor_garantia,costo_garantia:costo_garantia
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
}),
onSubmit: async valores => {
console.log('ACA43')
const{creador,empresa_id,tipo_garantia,nit_beneficiario,dv_beneficiario,emisor_banco,numero_garantia,fecha_inicio_vigencia,fecha_fin_vigencia,valor_garantia,costo_garantia}=valores
console.log('ACA44')
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
        console.log('ACA45')
const{data}=await nuevoData_empresa_garantia({
variables:{
input:{
creador,empresa_id,tipo_garantia,nit_beneficiario,dv_beneficiario,emisor_banco,numero_garantia,fecha_inicio_vigencia,fecha_fin_vigencia,valor_garantia,costo_garantia
}
}
});
} catch (error) {
        console.log('ACA46')
console.log(error);
}
}
})

useEffect(() => {
if (datacsv) {
var Position=(datacsv[0].indexOf(("Tipo_Garantia").toString()))
           setTipo_Garantia(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Nit_Beneficiario").toString()))
           setNit_Beneficiario(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Dv_Beneficiario").toString()))
           setDv_Beneficiario(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("emisor_banco").toString()))
           setEmisor_Banco(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("numero_garantia").toString()))
           setNumero_Garantia(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("fecha_inicio_vigencia").toString()))
           setFecha_Inicio_Vigencia(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("fecha_fin_vigencia").toString()))
           setFecha_Fin_Vigencia(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("valor_garantia").toString()))
           setValor_Garantia(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("costo_garantia").toString()))
           setCosto_Garantia(parseFloat(datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla Dataempresa_garantia</Modal.Title>
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
        <label htmlFor="tipo_garantia" className="col-sm-7 col-form-label">Tipo_Garantia</label><div className="col-sm-5">
        <select type="text" className="form-control" id="tipo_garantia" placeholder="Tipo_Garantia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tipo_garantia}>
    <option value="">
    Seleccione {" "}
    </option>
    <option value="STR">
    STR
    </option>
    <option value="MEM">
    MEM
    </option>
    <option value="Subasta_FERNC">
    Subasta FERNC
    </option>

      </select></div></div>
        { formik.touched.tipo_garantia&& formik.errors.tipo_garantia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tipo_garantia}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="nit_beneficiario" className="col-sm-7 col-form-label">Nit_Beneficiario</label><div className="col-sm-5">
        <input type="number" className="form-control" id="nit_beneficiario" placeholder="Nit_Beneficiario"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.nit_beneficiario}></input></div></div>
        { formik.touched.nit_beneficiario&& formik.errors.nit_beneficiario? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.nit_beneficiario}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="dv_beneficiario" className="col-sm-7 col-form-label">Dv_Beneficiario</label><div className="col-sm-5">
        <input type="number" className="form-control" id="dv_beneficiario" placeholder="Dv_Beneficiario"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dv_beneficiario}></input></div></div>
        { formik.touched.dv_beneficiario&& formik.errors.dv_beneficiario? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.dv_beneficiario}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="emisor_banco" className="col-sm-7 col-form-label">Emisor_Banco</label><div className="col-sm-5">
        <input type="text" className="form-control" id="emisor_banco" placeholder="Emisor_Banco"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.emisor_banco}></input></div></div>
        { formik.touched.emisor_banco&& formik.errors.emisor_banco? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.emisor_banco}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="numero_garantia" className="col-sm-7 col-form-label">Numero_Garantia</label><div className="col-sm-5">
        <input type="text" className="form-control" id="numero_garantia" placeholder="Numero_Garantia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.numero_garantia}></input></div></div>
        { formik.touched.numero_garantia&& formik.errors.numero_garantia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.numero_garantia}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="fecha_inicio_vigencia" className="col-sm-7 col-form-label">Fecha_Inicio_Vigencia</label><div className="col-sm-5">
        <input type="date" className="form-control" id="fecha_inicio_vigencia" placeholder="Fecha_Inicio_Vigencia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fecha_inicio_vigencia}></input></div></div>
        { formik.touched.fecha_inicio_vigencia&& formik.errors.fecha_inicio_vigencia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fecha_inicio_vigencia}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="fecha_fin_vigencia" className="col-sm-7 col-form-label">Fecha_Fin_Vigencia</label><div className="col-sm-5">
        <input type="date" className="form-control" id="fecha_fin_vigencia" placeholder="Fecha_Fin_Vigencia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fecha_fin_vigencia}></input></div></div>
        { formik.touched.fecha_fin_vigencia&& formik.errors.fecha_fin_vigencia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fecha_fin_vigencia}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="valor_garantia" className="col-sm-7 col-form-label">Valor_Garantia</label><div className="col-sm-5">
        <input type="text" className="form-control" id="valor_garantia" placeholder="Valor_Garantia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.valor_garantia}></input></div></div>
        { formik.touched.valor_garantia&& formik.errors.valor_garantia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.valor_garantia}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="costo_garantia" className="col-sm-7 col-form-label">Costo_Garantia</label><div className="col-sm-5">
        <input type="number" className="form-control" id="costo_garantia" placeholder="Costo_Garantia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.costo_garantia}></input></div></div>
        { formik.touched.costo_garantia&& formik.errors.costo_garantia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.costo_garantia}</p>
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

export default NuevoData_empresa_garantia
