import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
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

const NuevoDataxm_ipr2= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState();
const [empresa_id, setEmpresa_id]= useState("")
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
// NOTE: If your columns contain commas in their values, you'll need
// to deal with those before doing the next step
// (you might convert them to &&& or something, then covert them back later)
// jsfiddle showing the issue https://jsfiddle.net/
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
if (encabezados[j-2] === 'empresa_id' || encabezados[j-2] === 'strID' || encabezados[j-2] === 'agrupaORMercado' || encabezados[j-2] === 'fechavigencia' || encabezados[j-2] === 'conceptoID' )
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
// useEffect(() => {
// console.log(Datacsv2)
// }, [datacsv])

const handleSubmit = async () => {
try {
if (loading1) return null; // Si no hay informacion
const Datacsv2=csvJSON(datacsv)
console.log(fileNames[0].substr(4,2))
var arreglado = Datacsv2.map( item => {
return {creador:creador,empresa_id:empresa_id,anho:parseFloat(item["fechavigencia"].substr(6,4)),mes:parseFloat(item["fechavigencia"].substr(3,2)),strID:(item["strID"]),agrupaORMercado:(item["agrupaORMercado"]),fechavigencia:(item["fechavigencia"]),conceptoID:(item["conceptoID"]),nivelEntrada:parseFloat(item["nivelEntrada"]),nivelSalida:parseFloat(item["nivelSalida"]),valor:parseFloat(item["valor"])}
});

var name_sistema_or
var name_or
switch (data1.obtenerUsuario.empresa) {
        case 'ENIC':
        name_sistema_or='ARAM'
        name_or='ENID'
                break;
        case 'EGVC':
        name_sistema_or='GUVM'
        name_or='EGVD'
                break;

        default:
                break;
}

const arreglado2=arreglado.filter(arreglado => arreglado.agrupaORMercado===name_sistema_or)   

const {results} = await Promise.all(arreglado2.map(object => {
return nuevoData_xm_ipr({ variables:{
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
console.log(data1.obtenerUsuario.empresa)
}, [loading1])

return (
<div>
<Modal show={props.show2}
aria-labelledby="contained-modal-title-vcenter"
centered
onHide={props.close2}>
<Modal.Header closeButton>
<Modal.Title>Cargue Masivo a tabla Data XM IPR</Modal.Title>
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

export default NuevoDataxm_ipr2
