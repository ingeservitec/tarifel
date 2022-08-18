import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import readXlsxFile from 'read-excel-file'
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

const NuevoDatabanrepublica_tco2= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const { data:data2, error:error2, loading:loading2} = useQuery(OBTENER_DATA_BANREPUBLICA_TCO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState();const [loading, setLoading]= useState(false);
const [empresa_id, setEmpresa_id]= useState("")
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
readXlsxFile(reader.result).then((data) => {
setDatacsv(data)
});
};
// read file contents
acceptedFiles.forEach(file => reader.readAsBinaryString(file));
}, []);
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
function csvJSON(csv2){

var lines=csv2
var inicio=0
var i=0
var fin=0
while (fin==0) {
i ++;
if (lines[i][0] > 200000 ){
var inicio=i
var k=inicio
}
while (fin==0 && inicio>0) {
k ++;
if (lines[k][0] === null ){
fin=k
}
}
}
var result = [];
var headers=lines[inicio-1]
var regex = /(\d+)/g;
headers[0]="Anho_Semana"
for(var j=0;j<headers.length;j++){
if (j>0) {
if (headers[j].includes('Tasa')) {
headers[j]= (lines[inicio-2][j].concat('_', headers[j]).replace(/ /g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g,"")).replace('_%',"")
}
if (headers[j].includes('Monto')) {
headers[j] = (headers[j-1].replace('Tasa', 'Monto')).replace('_%',"")
}
}
}
for(i=inicio;i<fin;i++){
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
console.log(result)
return result; //JSON
}
// }, [datacsv])

const handleSubmit = async () => { setLoading(true)
try {
if (loading1) return null; // Si no hay informacion
const Datacsv2=csvJSON(datacsv)
console.log('Aca1')
console.log(Datacsv2)
console.log('Aca2')

var arreglado = Datacsv2.map( item => {
    return {creador:creador,anho_semana:(item["Anho_Semana"]).toString(),tasa_cred_com_credito_consumo:(item["Credito_de_consumo_Tasa"]),monto_cred_com_credito_consumo:(item["Credito_de_consumo_Monto"]),tasa_cred_com_odinario:(item["Ordinario_Tasa"]),monto_cred_com_odinario:(item["Ordinario_Monto"]),tasa__cred_com_preferencial_o_corporativo:(item["Preferencial_o_corporativo_Tasa"]),monto__cred_com_preferencial_o_corporativo:(item["Preferencial_o_corporativo_Monto"]),tasa__cred_com_tesoreria:(item["Tesoreria_Tasa"]),monto__cred_com_tesoreria:(item["Tesoreria_Monto"]),tasa_colocacion_banco_republica:(item["Banco_de_la_Republica_Tasa"]),monto_colocacion_banco_republica:(item["Banco_de_la_Republica_Monto"]),tasa_colocacion_sin_tesoreria:(item["Sin_Tesoreria_Tasa"]),monto_colocacion_sin_tesoreria:(item["Sin_Tesoreria_Monto"]),tasa_colocacion_total:(item["Total_Tasa"]),monto_colocacion_total:(item["Total_Monto"]),empresa_id:empresa_id}
});
console.log(arreglado)

const data_banrepublica_tco=data2.obtenerData_banrepublica_tco
var data_banrepublica_tcom=data_banrepublica_tco.filter(data_banrepublica_tco => data_banrepublica_tco.empresa_id===data1.obtenerUsuario.empresa)
var max=0, i=0, id_max=0

for (i = 0; i < data_banrepublica_tcom.length; i++) {
    var value = parseFloat(data_banrepublica_tcom[i].anho_semana);
    if (value > max) {
        max = value;
        id_max =i
    }

}
console.log('aca1')
var arreglado2=arreglado.filter(arreglado => arreglado.anho_semana>data_banrepublica_tcom[id_max].anho_semana)
console.log('aca2')
console.log(arreglado2)
const {results} = await Promise.all(arreglado2.map(object => {
return nuevoData_banrepublica_tco({ variables:{
input:
object
}
});
}
));
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");setLoading(false)
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
<Modal.Title>Cargue Masivo a tabla Data BANREPUBLICA TCO</Modal.Title>
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
<button
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
value="Guardar"  disabled={loading}
onClick={handleSubmit}
>
{loading && <i className="fa fa-refresh fa-spin"></i>}
      {loading && <span>  Loading</span>}
      {!loading && <span>GUARDAR</span>}
      </button>
</div>
<div className="col-sm">
<input
type="button"
className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
value="Cancelar"
    disabled={loading}
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
export default NuevoDatabanrepublica_tco2
