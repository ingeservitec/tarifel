
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

const NUEVO_DATA_BANREPUBLICA_TCO= gql`
mutation nuevoData_banrepublica_tco($input:Data_banrepublica_tcoInput ){
nuevoData_banrepublica_tco(input:$input){
id
creador
anho_semana
tasa_cred_com_credito_consumo
monto_cred_com_credito_consumo
tasa_cred_com_odinario
monto_cred_com_odinario
tasa__cred_com_preferencial_o_corporativo
monto__cred_com_preferencial_o_corporativo
tasa__cred_com_tesoreria
monto__cred_com_tesoreria
tasa_colocacion_banco_republica
monto_colocacion_banco_republica
tasa_colocacion_sin_tesoreria
monto_colocacion_sin_tesoreria
tasa_colocacion_total
monto_colocacion_total
empresa_id

}
}
`;
const OBTENER_DATA_BANREPUBLICA_TCO = gql`
query obtenerData_banrepublica_tco{
obtenerData_banrepublica_tco{
id
creador
anho_semana
tasa_cred_com_credito_consumo
monto_cred_com_credito_consumo
tasa_cred_com_odinario
monto_cred_com_odinario
tasa__cred_com_preferencial_o_corporativo
monto__cred_com_preferencial_o_corporativo
tasa__cred_com_tesoreria
monto__cred_com_tesoreria
tasa_colocacion_banco_republica
monto_colocacion_banco_republica
tasa_colocacion_sin_tesoreria
monto_colocacion_sin_tesoreria
tasa_colocacion_total
monto_colocacion_total
empresa_id

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


const NuevoData_banrepublica_tco= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [anho_semana, setAnho_Semana] = useState("");const [tasa_cred_com_credito_consumo, setTasa_Cred_Com_Credito_Consumo] = useState("");const [monto_cred_com_credito_consumo, setMonto_Cred_Com_Credito_Consumo] = useState("");const [tasa_cred_com_odinario, setTasa_Cred_Com_Odinario] = useState("");const [monto_cred_com_odinario, setMonto_Cred_Com_Odinario] = useState("");const [tasa__cred_com_preferencial_o_corporativo, setTasa__Cred_Com_Preferencial_O_Corporativo] = useState("");const [monto__cred_com_preferencial_o_corporativo, setMonto__Cred_Com_Preferencial_O_Corporativo] = useState("");const [tasa__cred_com_tesoreria, setTasa__Cred_Com_Tesoreria] = useState("");const [monto__cred_com_tesoreria, setMonto__Cred_Com_Tesoreria] = useState("");const [tasa_colocacion_banco_republica, setTasa_Colocacion_Banco_Republica] = useState("");const [monto_colocacion_banco_republica, setMonto_Colocacion_Banco_Republica] = useState("");const [tasa_colocacion_sin_tesoreria, setTasa_Colocacion_Sin_Tesoreria] = useState("");const [monto_colocacion_sin_tesoreria, setMonto_Colocacion_Sin_Tesoreria] = useState("");const [tasa_colocacion_total, setTasa_Colocacion_Total] = useState("");const [monto_colocacion_total, setMonto_Colocacion_Total] = useState("");const [empresa_id, setempresa_id] = useState("");
const [nuevoData_banrepublica_tco]=useMutation(NUEVO_DATA_BANREPUBLICA_TCO, {
update(cache, { data: { nuevoData_banrepublica_tco} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_banrepublica_tco} = cache.readQuery({ query: OBTENER_DATA_BANREPUBLICA_TCO});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_BANREPUBLICA_TCO,
data: {
obtenerData_banrepublica_tco: [...obtenerData_banrepublica_tco, nuevoData_banrepublica_tco]
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
if (encabezados[j-2] === 'Anho_Semana' )
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
creador:creador,anho_semana:anho_semana,tasa_cred_com_credito_consumo:tasa_cred_com_credito_consumo,monto_cred_com_credito_consumo:monto_cred_com_credito_consumo,tasa_cred_com_odinario:tasa_cred_com_odinario,monto_cred_com_odinario:monto_cred_com_odinario,tasa__cred_com_preferencial_o_corporativo:tasa__cred_com_preferencial_o_corporativo,monto__cred_com_preferencial_o_corporativo:monto__cred_com_preferencial_o_corporativo,tasa__cred_com_tesoreria:tasa__cred_com_tesoreria,monto__cred_com_tesoreria:monto__cred_com_tesoreria,tasa_colocacion_banco_republica:tasa_colocacion_banco_republica,monto_colocacion_banco_republica:monto_colocacion_banco_republica,tasa_colocacion_sin_tesoreria:tasa_colocacion_sin_tesoreria,monto_colocacion_sin_tesoreria:monto_colocacion_sin_tesoreria,tasa_colocacion_total:tasa_colocacion_total,monto_colocacion_total:monto_colocacion_total,empresa_id:empresa_id
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
}),
onSubmit: async valores => {
const{creador,anho_semana,tasa_cred_com_credito_consumo,monto_cred_com_credito_consumo,tasa_cred_com_odinario,monto_cred_com_odinario,tasa__cred_com_preferencial_o_corporativo,monto__cred_com_preferencial_o_corporativo,tasa__cred_com_tesoreria,monto__cred_com_tesoreria,tasa_colocacion_banco_republica,monto_colocacion_banco_republica,tasa_colocacion_sin_tesoreria,monto_colocacion_sin_tesoreria,tasa_colocacion_total,monto_colocacion_total,empresa_id}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_banrepublica_tco({
variables:{
input:{
creador,anho_semana,tasa_cred_com_credito_consumo,monto_cred_com_credito_consumo,tasa_cred_com_odinario,monto_cred_com_odinario,tasa__cred_com_preferencial_o_corporativo,monto__cred_com_preferencial_o_corporativo,tasa__cred_com_tesoreria,monto__cred_com_tesoreria,tasa_colocacion_banco_republica,monto_colocacion_banco_republica,tasa_colocacion_sin_tesoreria,monto_colocacion_sin_tesoreria,tasa_colocacion_total,monto_colocacion_total,empresa_id
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
var Position=(datacsv[0].indexOf(("Anho_Semana").toString()))
           setAnho_Semana((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Tasa_Cred_Com_Credito_Consumo").toString()))
           setTasa_Cred_Com_Credito_Consumo(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Monto_Cred_Com_Credito_Consumo").toString()))
           setMonto_Cred_Com_Credito_Consumo(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Tasa_Cred_Com_Odinario").toString()))
           setTasa_Cred_Com_Odinario(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_cred_com_odinario").toString()))
           setMonto_Cred_Com_Odinario(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa__cred_com_preferencial_o_corporativo").toString()))
           setTasa__Cred_Com_Preferencial_O_Corporativo(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto__cred_com_preferencial_o_corporativo").toString()))
           setMonto__Cred_Com_Preferencial_O_Corporativo(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa__cred_com_tesoreria").toString()))
           setTasa__Cred_Com_Tesoreria(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto__cred_com_tesoreria").toString()))
           setMonto__Cred_Com_Tesoreria(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_colocacion_banco_republica").toString()))
           setTasa_Colocacion_Banco_Republica(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_colocacion_banco_republica").toString()))
           setMonto_Colocacion_Banco_Republica(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_colocacion_sin_tesoreria").toString()))
           setTasa_Colocacion_Sin_Tesoreria(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_colocacion_sin_tesoreria").toString()))
           setMonto_Colocacion_Sin_Tesoreria(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("tasa_colocacion_total").toString()))
           setTasa_Colocacion_Total(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("monto_colocacion_total").toString()))
           setMonto_Colocacion_Total(parseFloat(datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla Databanrepublica_tco</Modal.Title>
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
        
        <p>{formik.errors.creador}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="anho_semana" className="col-sm-7 col-form-label">Anho_Semana</label><div className="col-sm-5">
        <input type="text" className="form-control" id="anho_semana" placeholder="Anho_Semana"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.anho_semana}></input></div></div>
        { formik.touched.anho_semana&& formik.errors.anho_semana? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.anho_semana}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_cred_com_credito_consumo" className="col-sm-7 col-form-label">Tasa_Cred_Com_Credito_Consumo</label><div className="col-sm-5">
        <input type="number" className="form-control" id="tasa_cred_com_credito_consumo" placeholder="Tasa_Cred_Com_Credito_Consumo"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_cred_com_credito_consumo}></input></div></div>
        { formik.touched.tasa_cred_com_credito_consumo&& formik.errors.tasa_cred_com_credito_consumo? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.tasa_cred_com_credito_consumo}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_cred_com_credito_consumo" className="col-sm-7 col-form-label">Monto_Cred_Com_Credito_Consumo</label><div className="col-sm-5">
        <input type="number" className="form-control" id="monto_cred_com_credito_consumo" placeholder="Monto_Cred_Com_Credito_Consumo"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_cred_com_credito_consumo}></input></div></div>
        { formik.touched.monto_cred_com_credito_consumo&& formik.errors.monto_cred_com_credito_consumo? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.monto_cred_com_credito_consumo}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_cred_com_odinario" className="col-sm-7 col-form-label">Tasa_Cred_Com_Odinario</label><div className="col-sm-5">
        <input type="number" className="form-control" id="tasa_cred_com_odinario" placeholder="Tasa_Cred_Com_Odinario"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_cred_com_odinario}></input></div></div>
        { formik.touched.tasa_cred_com_odinario&& formik.errors.tasa_cred_com_odinario? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.tasa_cred_com_odinario}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_cred_com_odinario" className="col-sm-7 col-form-label">Monto_Cred_Com_Odinario</label><div className="col-sm-5">
        <input type="number" className="form-control" id="monto_cred_com_odinario" placeholder="Monto_Cred_Com_Odinario"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_cred_com_odinario}></input></div></div>
        { formik.touched.monto_cred_com_odinario&& formik.errors.monto_cred_com_odinario? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.monto_cred_com_odinario}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa__cred_com_preferencial_o_corporativo" className="col-sm-7 col-form-label">Tasa__Cred_Com_Preferencial_O_Corporativo</label><div className="col-sm-5">
        <input type="number" className="form-control" id="tasa__cred_com_preferencial_o_corporativo" placeholder="Tasa__Cred_Com_Preferencial_O_Corporativo"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa__cred_com_preferencial_o_corporativo}></input></div></div>
        { formik.touched.tasa__cred_com_preferencial_o_corporativo&& formik.errors.tasa__cred_com_preferencial_o_corporativo? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.tasa__cred_com_preferencial_o_corporativo}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto__cred_com_preferencial_o_corporativo" className="col-sm-7 col-form-label">Monto__Cred_Com_Preferencial_O_Corporativo</label><div className="col-sm-5">
        <input type="number" className="form-control" id="monto__cred_com_preferencial_o_corporativo" placeholder="Monto__Cred_Com_Preferencial_O_Corporativo"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto__cred_com_preferencial_o_corporativo}></input></div></div>
        { formik.touched.monto__cred_com_preferencial_o_corporativo&& formik.errors.monto__cred_com_preferencial_o_corporativo? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.monto__cred_com_preferencial_o_corporativo}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa__cred_com_tesoreria" className="col-sm-7 col-form-label">Tasa__Cred_Com_Tesoreria</label><div className="col-sm-5">
        <input type="number" className="form-control" id="tasa__cred_com_tesoreria" placeholder="Tasa__Cred_Com_Tesoreria"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa__cred_com_tesoreria}></input></div></div>
        { formik.touched.tasa__cred_com_tesoreria&& formik.errors.tasa__cred_com_tesoreria? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.tasa__cred_com_tesoreria}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto__cred_com_tesoreria" className="col-sm-7 col-form-label">Monto__Cred_Com_Tesoreria</label><div className="col-sm-5">
        <input type="number" className="form-control" id="monto__cred_com_tesoreria" placeholder="Monto__Cred_Com_Tesoreria"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto__cred_com_tesoreria}></input></div></div>
        { formik.touched.monto__cred_com_tesoreria&& formik.errors.monto__cred_com_tesoreria? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.monto__cred_com_tesoreria}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_colocacion_banco_republica" className="col-sm-7 col-form-label">Tasa_Colocacion_Banco_Republica</label><div className="col-sm-5">
        <input type="number" className="form-control" id="tasa_colocacion_banco_republica" placeholder="Tasa_Colocacion_Banco_Republica"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_colocacion_banco_republica}></input></div></div>
        { formik.touched.tasa_colocacion_banco_republica&& formik.errors.tasa_colocacion_banco_republica? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.tasa_colocacion_banco_republica}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_colocacion_banco_republica" className="col-sm-7 col-form-label">Monto_Colocacion_Banco_Republica</label><div className="col-sm-5">
        <input type="number" className="form-control" id="monto_colocacion_banco_republica" placeholder="Monto_Colocacion_Banco_Republica"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_colocacion_banco_republica}></input></div></div>
        { formik.touched.monto_colocacion_banco_republica&& formik.errors.monto_colocacion_banco_republica? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.monto_colocacion_banco_republica}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_colocacion_sin_tesoreria" className="col-sm-7 col-form-label">Tasa_Colocacion_Sin_Tesoreria</label><div className="col-sm-5">
        <input type="number" className="form-control" id="tasa_colocacion_sin_tesoreria" placeholder="Tasa_Colocacion_Sin_Tesoreria"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_colocacion_sin_tesoreria}></input></div></div>
        { formik.touched.tasa_colocacion_sin_tesoreria&& formik.errors.tasa_colocacion_sin_tesoreria? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.tasa_colocacion_sin_tesoreria}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_colocacion_sin_tesoreria" className="col-sm-7 col-form-label">Monto_Colocacion_Sin_Tesoreria</label><div className="col-sm-5">
        <input type="number" className="form-control" id="monto_colocacion_sin_tesoreria" placeholder="Monto_Colocacion_Sin_Tesoreria"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_colocacion_sin_tesoreria}></input></div></div>
        { formik.touched.monto_colocacion_sin_tesoreria&& formik.errors.monto_colocacion_sin_tesoreria? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.monto_colocacion_sin_tesoreria}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tasa_colocacion_total" className="col-sm-7 col-form-label">Tasa_Colocacion_Total</label><div className="col-sm-5">
        <input type="number" className="form-control" id="tasa_colocacion_total" placeholder="Tasa_Colocacion_Total"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tasa_colocacion_total}></input></div></div>
        { formik.touched.tasa_colocacion_total&& formik.errors.tasa_colocacion_total? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.tasa_colocacion_total}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="monto_colocacion_total" className="col-sm-7 col-form-label">Monto_Colocacion_Total</label><div className="col-sm-5">
        <input type="number" className="form-control" id="monto_colocacion_total" placeholder="Monto_Colocacion_Total"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.monto_colocacion_total}></input></div></div>
        { formik.touched.monto_colocacion_total&& formik.errors.monto_colocacion_total? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.monto_colocacion_total}</p>
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
        
        <p>{formik.errors.empresa_id}</p>
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

export default NuevoData_banrepublica_tco
