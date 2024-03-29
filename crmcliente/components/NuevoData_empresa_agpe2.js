import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import csv from 'csv';
import Swal from 'sweetalert2'

const NUEVO_DATA_EMPRESA_AGPE= gql`
mutation nuevoData_empresa_agpe($input:Data_empresa_agpeInput ){
nuevoData_empresa_agpe(input:$input){
id
creador
empresa_id
niu
anho
mes
dia
tipo_ene
hora_01
hora_02
hora_03
hora_04
hora_05
hora_06
hora_07
hora_08
hora_09
hora_10
hora_11
hora_12
hora_13
hora_14
hora_15
hora_16
hora_17
hora_18
hora_19
hora_20
hora_21
hora_22
hora_23
hora_24

}
}
`;
const OBTENER_DATA_EMPRESA_AGPE = gql`
query obtenerData_empresa_agpe{
obtenerData_empresa_agpe{
id
creador
empresa_id
niu
anho
mes
dia
tipo_ene
hora_01
hora_02
hora_03
hora_04
hora_05
hora_06
hora_07
hora_08
hora_09
hora_10
hora_11
hora_12
hora_13
hora_14
hora_15
hora_16
hora_17
hora_18
hora_19
hora_20
hora_21
hora_22
hora_23
hora_24

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

const NuevoDataempresa_agpe2= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState();
const [empresa_id, setEmpresa_id]= useState("")
const [nuevoData_empresa_agpe]=useMutation(NUEVO_DATA_EMPRESA_AGPE, {
update(cache, { data: { nuevoData_empresa_agpe} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_empresa_agpe} = cache.readQuery({ query: OBTENER_DATA_EMPRESA_AGPE});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_EMPRESA_AGPE,
data: {
obtenerData_empresa_agpe: [...obtenerData_empresa_agpe, nuevoData_empresa_agpe]
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
    if ( (obj[headers[j-2]] ='tipo') ) 
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
return {creador:creador,empresa_id:empresa_id,niu:parseFloat(item["niu"]),anho:parseFloat(item["anho"]),mes:parseFloat(item["mes"]),dia:parseFloat(item["dia"]),tipo_ene:(item["tipo"]),hora_01:parseFloat(item["hora_01"]),hora_02:parseFloat(item["hora_02"]),hora_03:parseFloat(item["hora_03"]),hora_04:parseFloat(item["hora_04"]),hora_05:parseFloat(item["hora_05"]),hora_06:parseFloat(item["hora_06"]),hora_07:parseFloat(item["hora_07"]),hora_08:parseFloat(item["hora_08"]),hora_09:parseFloat(item["hora_09"]),hora_10:parseFloat(item["hora_10"]),hora_11:parseFloat(item["hora_11"]),hora_12:parseFloat(item["hora_12"]),hora_13:parseFloat(item["hora_13"]),hora_14:parseFloat(item["hora_14"]),hora_15:parseFloat(item["hora_15"]),hora_16:parseFloat(item["hora_16"]),hora_17:parseFloat(item["hora_17"]),hora_18:parseFloat(item["hora_18"]),hora_19:parseFloat(item["hora_19"]),hora_20:parseFloat(item["hora_20"]),hora_21:parseFloat(item["hora_21"]),hora_22:parseFloat(item["hora_22"]),hora_23:parseFloat(item["hora_23"]),hora_24:parseFloat(item["hora_24"])}
});
console.log(arreglado)
const {results} = await Promise.all(arreglado.map(object => {
return nuevoData_empresa_agpe({ variables:{
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
<Modal.Title>Cargue Masivo a tabla Data EMPRESA AGPE</Modal.Title>
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
className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
value="Guardar"
onClick={handleSubmit}
/>
</div>
<div className="col-sm">
<input
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
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

export default NuevoDataempresa_agpe2
