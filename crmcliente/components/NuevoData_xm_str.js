
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

const NUEVO_DATA_XM_STR= gql`
mutation nuevoData_xm_str($input:Data_xm_strInput ){
nuevoData_xm_str(input:$input){
id
creador
empresa_id
anho
mes
total_ingreso_mensual_bruto_str_cop_norte
energia_del_str_kwh_norte
cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte
cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte
cargo_por_uso_dt4_cop_kwh_norte
factor_para_referir_las_medidas_de_energia_del_nt_4_norte
valor_diferencial_despues_de_compensacion_cop_kwh_norte
total_ingreso_mensual_bruto_str_cop_sur
energia_del_str_kwh_sur
cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur
cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur
cargo_por_uso_dt4_cop_kwh_sur
factor_para_referir_las_medidas_de_energia_del_nt_4_sur
valor_diferencial_despues_de_compensacion_cop_kwh_sur


































































































}
}
`;
const OBTENER_DATA_XM_STR = gql`
query obtenerData_xm_str{
obtenerData_xm_str{
id
creador
empresa_id
anho
mes
total_ingreso_mensual_bruto_str_cop_norte
energia_del_str_kwh_norte
cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte
cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte
cargo_por_uso_dt4_cop_kwh_norte
factor_para_referir_las_medidas_de_energia_del_nt_4_norte
valor_diferencial_despues_de_compensacion_cop_kwh_norte
total_ingreso_mensual_bruto_str_cop_sur
energia_del_str_kwh_sur
cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur
cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur
cargo_por_uso_dt4_cop_kwh_sur
factor_para_referir_las_medidas_de_energia_del_nt_4_sur
valor_diferencial_despues_de_compensacion_cop_kwh_sur


































































































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


const NuevoData_xm_str= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setcreador] = useState("");const [empresa_id, setempresa_id] = useState("");const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [total_ingreso_mensual_bruto_str_cop_norte, setTotal_Ingreso_Mensual_Bruto_Str_Cop_Norte] = useState("");const [energia_del_str_kwh_norte, setEnergia_Del_Str_Kwh_Norte] = useState("");const [cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte, setCargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Norte] = useState("");const [cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte, setCargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Norte] = useState("");const [cargo_por_uso_dt4_cop_kwh_norte, setCargo_Por_Uso_Dt4_Cop_Kwh_Norte] = useState("");const [factor_para_referir_las_medidas_de_energia_del_nt_4_norte, setFactor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Norte] = useState("");const [valor_diferencial_despues_de_compensacion_cop_kwh_norte, setValor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Norte] = useState("");const [total_ingreso_mensual_bruto_str_cop_sur, setTotal_Ingreso_Mensual_Bruto_Str_Cop_Sur] = useState("");const [energia_del_str_kwh_sur, setEnergia_Del_Str_Kwh_Sur] = useState("");const [cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur, setCargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Sur] = useState("");const [cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur, setCargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Sur] = useState("");const [cargo_por_uso_dt4_cop_kwh_sur, setCargo_Por_Uso_Dt4_Cop_Kwh_Sur] = useState("");const [factor_para_referir_las_medidas_de_energia_del_nt_4_sur, setFactor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Sur] = useState("");const [valor_diferencial_despues_de_compensacion_cop_kwh_sur, setValor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Sur] = useState("");
const [nuevoData_xm_str]=useMutation(NUEVO_DATA_XM_STR, {
update(cache, { data: { nuevoData_xm_str} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_xm_str} = cache.readQuery({ query: OBTENER_DATA_XM_STR});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_XM_STR,
data: {
obtenerData_xm_str: [...obtenerData_xm_str, nuevoData_xm_str]
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
creador:creador,empresa_id:empresa_id,anho:anho,mes:mes,total_ingreso_mensual_bruto_str_cop_norte:total_ingreso_mensual_bruto_str_cop_norte,energia_del_str_kwh_norte:energia_del_str_kwh_norte,cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte:cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte,cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte:cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte,cargo_por_uso_dt4_cop_kwh_norte:cargo_por_uso_dt4_cop_kwh_norte,factor_para_referir_las_medidas_de_energia_del_nt_4_norte:factor_para_referir_las_medidas_de_energia_del_nt_4_norte,valor_diferencial_despues_de_compensacion_cop_kwh_norte:valor_diferencial_despues_de_compensacion_cop_kwh_norte,total_ingreso_mensual_bruto_str_cop_sur:total_ingreso_mensual_bruto_str_cop_sur,energia_del_str_kwh_sur:energia_del_str_kwh_sur,cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur:cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur,cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur:cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur,cargo_por_uso_dt4_cop_kwh_sur:cargo_por_uso_dt4_cop_kwh_sur,factor_para_referir_las_medidas_de_energia_del_nt_4_sur:factor_para_referir_las_medidas_de_energia_del_nt_4_sur,valor_diferencial_despues_de_compensacion_cop_kwh_sur:valor_diferencial_despues_de_compensacion_cop_kwh_sur
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
anho: Yup.string()
.required('El Año es obligatorio')
}),
onSubmit: async valores => {
const{creador,empresa_id,anho,mes,total_ingreso_mensual_bruto_str_cop_norte,energia_del_str_kwh_norte,cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte,cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte,cargo_por_uso_dt4_cop_kwh_norte,factor_para_referir_las_medidas_de_energia_del_nt_4_norte,valor_diferencial_despues_de_compensacion_cop_kwh_norte,total_ingreso_mensual_bruto_str_cop_sur,energia_del_str_kwh_sur,cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur,cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur,cargo_por_uso_dt4_cop_kwh_sur,factor_para_referir_las_medidas_de_energia_del_nt_4_sur,valor_diferencial_despues_de_compensacion_cop_kwh_sur}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
const{data}=await nuevoData_xm_str({
variables:{
input:{
creador,empresa_id,anho,mes,total_ingreso_mensual_bruto_str_cop_norte,energia_del_str_kwh_norte,cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte,cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte,cargo_por_uso_dt4_cop_kwh_norte,factor_para_referir_las_medidas_de_energia_del_nt_4_norte,valor_diferencial_despues_de_compensacion_cop_kwh_norte,total_ingreso_mensual_bruto_str_cop_sur,energia_del_str_kwh_sur,cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur,cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur,cargo_por_uso_dt4_cop_kwh_sur,factor_para_referir_las_medidas_de_energia_del_nt_4_sur,valor_diferencial_despues_de_compensacion_cop_kwh_sur
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
           setMes(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Total_Ingreso_Mensual_Bruto_Str_Cop_Norte").toString()))
           setTotal_Ingreso_Mensual_Bruto_Str_Cop_Norte(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("energia_del_str_kwh_norte").toString()))
           setEnergia_Del_Str_Kwh_Norte(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte").toString()))
           setCargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Norte(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte").toString()))
           setCargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Norte(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_por_uso_dt4_cop_kwh_norte").toString()))
           setCargo_Por_Uso_Dt4_Cop_Kwh_Norte(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("factor_para_referir_las_medidas_de_energia_del_nt_4_norte").toString()))
           setFactor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Norte(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("valor_diferencial_despues_de_compensacion_cop_kwh_norte").toString()))
           setValor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Norte(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("total_ingreso_mensual_bruto_str_cop_sur").toString()))
           setTotal_Ingreso_Mensual_Bruto_Str_Cop_Sur(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("energia_del_str_kwh_sur").toString()))
           setEnergia_Del_Str_Kwh_Sur(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur").toString()))
           setCargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Sur(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur").toString()))
           setCargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Sur(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("cargo_por_uso_dt4_cop_kwh_sur").toString()))
           setCargo_Por_Uso_Dt4_Cop_Kwh_Sur(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("factor_para_referir_las_medidas_de_energia_del_nt_4_sur").toString()))
           setFactor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Sur(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("valor_diferencial_despues_de_compensacion_cop_kwh_sur").toString()))
           setValor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Sur(parseFloat(datacsv[1][Position]));
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
<Modal.Title>Adicionar datos a tabla Dataxm_str</Modal.Title>
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
        <label htmlFor="empresa_id" className="col-sm-7 col-form-label">empresa_id</label><div className="col-sm-5">
        <input type="number" className="form-control" id="empresa_id" placeholder="empresa_id"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.empresa_id ?
      formik.values.empresa_id.charAt(0).toUpperCase() + formik.values.empresa_id.slice(1):''}readOnly></input></div></div>
        { formik.touched.empresa_id&& formik.errors.empresa_id? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
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
        
        <p>{formik.errors.mes}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="total_ingreso_mensual_bruto_str_cop_norte" className="col-sm-7 col-form-label">Total_Ingreso_Mensual_Bruto_Str_Cop_Norte</label><div className="col-sm-5">
        <input type="number" className="form-control" id="total_ingreso_mensual_bruto_str_cop_norte" placeholder="Total_Ingreso_Mensual_Bruto_Str_Cop_Norte"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.total_ingreso_mensual_bruto_str_cop_norte}></input></div></div>
        { formik.touched.total_ingreso_mensual_bruto_str_cop_norte&& formik.errors.total_ingreso_mensual_bruto_str_cop_norte? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.total_ingreso_mensual_bruto_str_cop_norte}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="energia_del_str_kwh_norte" className="col-sm-7 col-form-label">Energia_Del_Str_Kwh_Norte</label><div className="col-sm-5">
        <input type="number" className="form-control" id="energia_del_str_kwh_norte" placeholder="Energia_Del_Str_Kwh_Norte"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.energia_del_str_kwh_norte}></input></div></div>
        { formik.touched.energia_del_str_kwh_norte&& formik.errors.energia_del_str_kwh_norte? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.energia_del_str_kwh_norte}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte" className="col-sm-7 col-form-label">Cargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Norte</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte" placeholder="Cargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Norte"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte}></input></div></div>
        { formik.touched.cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte&& formik.errors.cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte" className="col-sm-7 col-form-label">Cargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Norte</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte" placeholder="Cargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Norte"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte}></input></div></div>
        { formik.touched.cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte&& formik.errors.cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_por_uso_dt4_cop_kwh_norte" className="col-sm-7 col-form-label">Cargo_Por_Uso_Dt4_Cop_Kwh_Norte</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_por_uso_dt4_cop_kwh_norte" placeholder="Cargo_Por_Uso_Dt4_Cop_Kwh_Norte"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_por_uso_dt4_cop_kwh_norte}></input></div></div>
        { formik.touched.cargo_por_uso_dt4_cop_kwh_norte&& formik.errors.cargo_por_uso_dt4_cop_kwh_norte? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cargo_por_uso_dt4_cop_kwh_norte}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="factor_para_referir_las_medidas_de_energia_del_nt_4_norte" className="col-sm-7 col-form-label">Factor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Norte</label><div className="col-sm-5">
        <input type="number" className="form-control" id="factor_para_referir_las_medidas_de_energia_del_nt_4_norte" placeholder="Factor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Norte"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.factor_para_referir_las_medidas_de_energia_del_nt_4_norte}></input></div></div>
        { formik.touched.factor_para_referir_las_medidas_de_energia_del_nt_4_norte&& formik.errors.factor_para_referir_las_medidas_de_energia_del_nt_4_norte? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.factor_para_referir_las_medidas_de_energia_del_nt_4_norte}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="valor_diferencial_despues_de_compensacion_cop_kwh_norte" className="col-sm-7 col-form-label">Valor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Norte</label><div className="col-sm-5">
        <input type="number" className="form-control" id="valor_diferencial_despues_de_compensacion_cop_kwh_norte" placeholder="Valor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Norte"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.valor_diferencial_despues_de_compensacion_cop_kwh_norte}></input></div></div>
        { formik.touched.valor_diferencial_despues_de_compensacion_cop_kwh_norte&& formik.errors.valor_diferencial_despues_de_compensacion_cop_kwh_norte? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.valor_diferencial_despues_de_compensacion_cop_kwh_norte}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="total_ingreso_mensual_bruto_str_cop_sur" className="col-sm-7 col-form-label">Total_Ingreso_Mensual_Bruto_Str_Cop_Sur</label><div className="col-sm-5">
        <input type="number" className="form-control" id="total_ingreso_mensual_bruto_str_cop_sur" placeholder="Total_Ingreso_Mensual_Bruto_Str_Cop_Sur"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.total_ingreso_mensual_bruto_str_cop_sur}></input></div></div>
        { formik.touched.total_ingreso_mensual_bruto_str_cop_sur&& formik.errors.total_ingreso_mensual_bruto_str_cop_sur? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.total_ingreso_mensual_bruto_str_cop_sur}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="energia_del_str_kwh_sur" className="col-sm-7 col-form-label">Energia_Del_Str_Kwh_Sur</label><div className="col-sm-5">
        <input type="number" className="form-control" id="energia_del_str_kwh_sur" placeholder="Energia_Del_Str_Kwh_Sur"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.energia_del_str_kwh_sur}></input></div></div>
        { formik.touched.energia_del_str_kwh_sur&& formik.errors.energia_del_str_kwh_sur? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.energia_del_str_kwh_sur}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur" className="col-sm-7 col-form-label">Cargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Sur</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur" placeholder="Cargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Sur"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur}></input></div></div>
        { formik.touched.cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur&& formik.errors.cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur" className="col-sm-7 col-form-label">Cargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Sur</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur" placeholder="Cargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Sur"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur}></input></div></div>
        { formik.touched.cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur&& formik.errors.cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cargo_por_uso_dt4_cop_kwh_sur" className="col-sm-7 col-form-label">Cargo_Por_Uso_Dt4_Cop_Kwh_Sur</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cargo_por_uso_dt4_cop_kwh_sur" placeholder="Cargo_Por_Uso_Dt4_Cop_Kwh_Sur"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cargo_por_uso_dt4_cop_kwh_sur}></input></div></div>
        { formik.touched.cargo_por_uso_dt4_cop_kwh_sur&& formik.errors.cargo_por_uso_dt4_cop_kwh_sur? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cargo_por_uso_dt4_cop_kwh_sur}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="factor_para_referir_las_medidas_de_energia_del_nt_4_sur" className="col-sm-7 col-form-label">Factor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Sur</label><div className="col-sm-5">
        <input type="number" className="form-control" id="factor_para_referir_las_medidas_de_energia_del_nt_4_sur" placeholder="Factor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Sur"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.factor_para_referir_las_medidas_de_energia_del_nt_4_sur}></input></div></div>
        { formik.touched.factor_para_referir_las_medidas_de_energia_del_nt_4_sur&& formik.errors.factor_para_referir_las_medidas_de_energia_del_nt_4_sur? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.factor_para_referir_las_medidas_de_energia_del_nt_4_sur}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="valor_diferencial_despues_de_compensacion_cop_kwh_sur" className="col-sm-7 col-form-label">Valor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Sur</label><div className="col-sm-5">
        <input type="number" className="form-control" id="valor_diferencial_despues_de_compensacion_cop_kwh_sur" placeholder="Valor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Sur"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.valor_diferencial_despues_de_compensacion_cop_kwh_sur}></input></div></div>
        { formik.touched.valor_diferencial_despues_de_compensacion_cop_kwh_sur&& formik.errors.valor_diferencial_despues_de_compensacion_cop_kwh_sur? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.valor_diferencial_despues_de_compensacion_cop_kwh_sur}</p>
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

export default NuevoData_xm_str
