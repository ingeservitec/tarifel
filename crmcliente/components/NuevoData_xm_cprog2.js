import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'
import XLSX from 'xlsx';

const NUEVO_DATA_XM_CPROG= gql`
mutation nuevoData_xm_cprog($input:Data_xm_cprogInput ){
nuevoData_xm_cprog(input:$input){
id
creador
empresa_id
anho
mes
agente
cargo_cprog_cop_kwh
}
}
`;
const OBTENER_DATA_XM_CPROG = gql`
query obtenerData_xm_cprog{
obtenerData_xm_cprog{
id
creador
empresa_id
anho
mes
agente
cargo_cprog_cop_kwh
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

const NuevoDataxm_cprog2= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState();
const [empresa_id, setEmpresa_id]= useState("")
const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [agente, setAgente] = useState("");const [cargo_cprog_cop_kwh, setCargo_Cprog_Cop_Kwh] = useState("")
const [nuevoData_xm_cprog]=useMutation(NUEVO_DATA_XM_CPROG, {
update(cache, { data: { nuevoData_xm_cprog} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_xm_cprog} = cache.readQuery({ query: OBTENER_DATA_XM_CPROG});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_XM_CPROG,
data: {
obtenerData_xm_cprog: [...obtenerData_xm_cprog, nuevoData_xm_cprog]
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
const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['CargoCPROG']);
const data=excelRows
console.log(data)

if (data[1].Definitivo==='Mes cargo:') {
    const fecha=(new Date(((Math.floor((data[1].__EMPTY_1 - 25568)*86400*1000)))).toLocaleDateString("en-US"))
    setMes(parseFloat(fecha.substr(0,2)))
    setAnho(parseFloat(fecha.substr(5,4)))   
};
if (data[6].__EMPTY_3==='Cargo CPROG por concepto del plan ($/kWh)') {
    setCargo_Cprog_Cop_Kwh(data[7].__EMPTY_3)
 };
 setAgente(data[7].Definitivo.substr(0,4))
}
// read file contents
acceptedFiles.forEach(file => reader.readAsBinaryString(file));
}, []);
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


const handleSubmit = async () => {
try {
    console.log(creador,empresa_id,anho, mes,agente, cargo_cprog_cop_kwh)
    const{data}=await nuevoData_xm_cprog({
        variables:{
        input:{
            creador:creador,empresa_id:empresa_id,anho:anho,mes:mes,agente:agente,cargo_cprog_cop_kwh:cargo_cprog_cop_kwh
        }
        }
        })
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close2()
// results will be an array of execution result objects (i.e. { data, error })
// Do whatever here with the results
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
<Modal.Title>Cargue Masivo a tabla Data XM CPROG</Modal.Title>
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

export default NuevoDataxm_cprog2
