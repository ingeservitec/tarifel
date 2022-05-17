import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'
import XLSX from 'xlsx';

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

const NuevoDataxm_str2= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState("");const [empresa_id, setEmpresa_id] = useState("");
const [anho, setAnho] = useState("");const [mes, setMes] = useState("");
const [total_ingreso_mensual_bruto_str_cop_norte, setTotal_Ingreso_Mensual_Bruto_Str_Cop_Norte] = useState("");
const [energia_del_str_kwh_norte, setEnergia_Del_Str_Kwh_Norte] = useState("");
const [cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte, setCargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Norte] = useState("");
const [cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte, setCargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Norte] = useState("");
const [cargo_por_uso_dt4_cop_kwh_norte, setCargo_Por_Uso_Dt4_Cop_Kwh_Norte] = useState("");
const [factor_para_referir_las_medidas_de_energia_del_nt_4_norte, setFactor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Norte] = useState("");
const [valor_diferencial_despues_de_compensacion_cop_kwh_norte, setValor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Norte] = useState("");
const [total_ingreso_mensual_bruto_str_cop_sur, setTotal_Ingreso_Mensual_Bruto_Str_Cop_Sur] = useState("");
const [energia_del_str_kwh_sur, setEnergia_Del_Str_Kwh_Sur] = useState("");
const [cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur, setCargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Sur] = useState("");
const [cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur, setCargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Sur] = useState("");
const [cargo_por_uso_dt4_cop_kwh_sur, setCargo_Por_Uso_Dt4_Cop_Kwh_Sur] = useState("");
const [factor_para_referir_las_medidas_de_energia_del_nt_4_sur, setFactor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Sur] = useState("");
const [valor_diferencial_despues_de_compensacion_cop_kwh_sur, setValor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Sur] = useState("");

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
const workbook = XLSX.read(reader.result, {type: 'binary'});
const firstSheet = workbook.SheetNames[0];
const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['CargosEstimados']);
const data=excelRows
console.log(data)
//EVALUAR DONDE ESTAN LOS DATOS
if (data[0].__EMPTY==='CARGOS POR USO DEL STR NORTE') {
    setTotal_Ingreso_Mensual_Bruto_Str_Cop_Norte(data[5].__EMPTY_1)
    setEnergia_Del_Str_Kwh_Norte(data[6].__EMPTY_1)
    setCargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Norte(data[7].__EMPTY_1)
    setCargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Norte(data[8].__EMPTY_1)
    setCargo_Por_Uso_Dt4_Cop_Kwh_Norte(data[9].__EMPTY_1)
    setFactor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Norte(data[10].__EMPTY_1)
    setTotal_Ingreso_Mensual_Bruto_Str_Cop_Sur(data[5].__EMPTY_4)
    setEnergia_Del_Str_Kwh_Sur(data[6].__EMPTY_4)
    setCargo_Nt_Antes_De_Compensacion_Cd4_Cop_Kwh_Sur(data[7].__EMPTY_4)
    setCargo_Nt_Despues_De_Compensacion_Cd4_Cop_Kwh_Sur(data[8].__EMPTY_4)
    setCargo_Por_Uso_Dt4_Cop_Kwh_Sur(data[9].__EMPTY_4)
    setFactor_Para_Referir_Las_Medidas_De_Energia_Del_Nt_4_Sur(data[10].__EMPTY_4)
}
var meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

console.log(fileNames[0])
const excelRows2 = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Deltas '+meses[parseInt(fileNames[0].substr(16,2))-1]+'-'+parseInt(fileNames[0].substr(11,4))]);
const data2=excelRows2
console.log(data2)

    setValor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Norte(data2[4].__EMPTY)
    setValor_Diferencial_Despues_De_Compensacion_Cop_Kwh_Sur(data2[4].__EMPTY_1)



//HASTA ACA
};
// read file contents
acceptedFiles.forEach(file => reader.readAsBinaryString(file));
}, []);
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

// }, [datacsv])

const handleSubmit = async () => {
    Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
    props.close2() 
try {
const{data}=await nuevoData_xm_str({
variables:{
input:
{creador:creador,empresa_id:empresa_id,anho:parseInt(fileNames[0].substr(11,4)),mes:parseInt(fileNames[0].substr(16,2)),
    total_ingreso_mensual_bruto_str_cop_norte:total_ingreso_mensual_bruto_str_cop_norte,
    energia_del_str_kwh_norte:energia_del_str_kwh_norte,
    cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte:cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte,
    cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte:cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte,
    cargo_por_uso_dt4_cop_kwh_norte:cargo_por_uso_dt4_cop_kwh_norte,
    factor_para_referir_las_medidas_de_energia_del_nt_4_norte:factor_para_referir_las_medidas_de_energia_del_nt_4_norte,
    valor_diferencial_despues_de_compensacion_cop_kwh_norte:valor_diferencial_despues_de_compensacion_cop_kwh_norte,
    total_ingreso_mensual_bruto_str_cop_sur:total_ingreso_mensual_bruto_str_cop_sur,
    energia_del_str_kwh_sur:energia_del_str_kwh_sur,
    cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur:cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur,
    cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur:cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur,
    cargo_por_uso_dt4_cop_kwh_sur:cargo_por_uso_dt4_cop_kwh_sur,
    factor_para_referir_las_medidas_de_energia_del_nt_4_sur:factor_para_referir_las_medidas_de_energia_del_nt_4_sur,
    valor_diferencial_despues_de_compensacion_cop_kwh_sur:valor_diferencial_despues_de_compensacion_cop_kwh_sur}
}

});
} catch (error) {
console.log(error)
// Handle any errors as appropriate
}
}
useEffect(() => {
if(loading1) return null;
setCreador(parseInt(data1.obtenerUsuario.id));
setEmpresa_id((data1.obtenerUsuario.empresa));
console.log(data1.obtenerUsuario.empresa)
}, [loading1])

return (
<div>
<Modal show={props.show2}
aria-labelledby="contained-modal-title-vcenter"
centered
onHide={props.close2}>
<Modal.Header closeButton>
<Modal.Title>Cargue Masivo a tabla Data XM STR</Modal.Title>
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
<div className="container">
<div className="row">
<div className="col-sm">
<input
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
value="Guardar"
onClick={handleSubmit}
/>
</div>
<div className="col-sm">
<input
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
value="Cancelar"
onClick={props.close2}
/>
</div>
</div>
</div>

</Modal.Body>
<Modal.Footer>
</Modal.Footer>
</Modal>
</div>

)
}

export default NuevoDataxm_str2
