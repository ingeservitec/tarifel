import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'
import XLSX from 'xlsx';
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

const NuevoDataxm_dtun2= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState();
const [empresa_id, setEmpresa_id]= useState("")
const [version, setVersion] = useState("")
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
    /* Parse data */
    const bstr = reader.result;
    const wb = XLSX.read(bstr, {type:'binary'});
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, {header:1});
    /* Update state */
    setDatacsv(data)

};
// read file contents
acceptedFiles.forEach(file => reader.readAsBinaryString(file));
}, []);
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

function csvJSON(csv2){
var lines=csv2
var inicio=0
var fin=0
var i=0

while (fin==0) {
i ++;
if (lines[i][0] === "Operador de Red - Mercado"){
var inicio=i
var k=inicio

}
while (fin==0 && inicio>0) {
k ++;
if (lines[k].length===0 ){
fin=k
}
}
}
var result = [];
var headers=lines[inicio]
var regex = /(\d+)/g;
for(i=inicio+1;i<fin;i++){
var obj = {};
//var currentline=lines[i].toString().split(",")
var currentline=lines[i]
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
}

result.push(obj);
}
//return result; //JavaScript object
// parseFloat()
return result; //JSON
}
// }, [datacsv])

const handleSubmit = async () => {
try {
if (loading1) return null; // Si no hay informacion
const Datacsv2=csvJSON(datacsv)
console.log(fileNames[0].includes("Preliminares"))

if (fileNames[0].includes("Preliminares")){
    setVersion("Preliminares")
}
if(fileNames[0].includes("Definitivos")){
    setVersion("Definitivos")
}

var mes=parseInt(((fileNames[0].split('_'))[1]).substr(5,2))
var anho=parseInt(((fileNames[0].split('_'))[1]).substr(0,4))
switch (true) {
    case (mes+2 < 13):
        mes=mes+2
        break;
        case (mes+2 == 13):
            mes=1
            anho=anho+1
            break;
        case (mes+2 == 14):
            mes=2
            anho=anho+1
            break;
    default:
        break;
}


var arreglado = Datacsv2.map( item => {
return {creador:creador,empresa_id:empresa_id,anho:anho,mes:mes,area:datacsv[1][0],nivel_tension:parseInt(datacsv[1][0].charAt(datacsv[1][0].length-1)),valor:(item["Cargo Único Transitorio ($/kWh)"]),operador_red:(item["Operador de Red - Mercado"]),version:version}
});
const {results} = await Promise.all(arreglado.map(object => {
return nuevoData_xm_dtun({ variables:{
input:
object
}
});
}
));
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
}, [loading1])

return (
<div>
<Modal show={props.show2}
aria-labelledby="contained-modal-title-vcenter"
centered
onHide={props.close2}>
<Modal.Header closeButton>
<Modal.Title>Cargue Masivo a tabla Data XM DTUN</Modal.Title>
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

export default NuevoDataxm_dtun2
