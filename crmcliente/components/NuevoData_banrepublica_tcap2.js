import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'

const NUEVO_DATA_BANREPUBLICA_TCAP= gql`
mutation nuevoData_banrepublica_tcap($input:Data_banrepublica_tcapInput ){
nuevoData_banrepublica_tcap(input:$input){
id
creador
fecha
empresa_id
tasa_a_30_cdt_bancos_comerciales
monto_a_30_cdt_bancos_comerciales
tasa_entre_31_y_44_cdt_bancos_comerciales
monto_entre_31_y_44_cdt_bancos_comerciales
tasa_a_45_cdt_bancos_comerciales
monto_a_45_cdt_bancos_comerciales
tasa_entre_46_y_59_cdt_bancos_comerciales
monto_entre_46_y_59_cdt_bancos_comerciales
tasa_a_60_cdt_bancos_comerciales
monto_a_60_cdt_bancos_comerciales
tasa_entre_61_y_89_cdt_bancos_comerciales
monto_entre_61_y_89_cdt_bancos_comerciales
tasa_a_90_cdt_bancos_comerciales
monto_a_90_cdt_bancos_comerciales
tasa_entre_91_y_119_cdt_bancos_comerciales
monto_entre_91_y_119_cdt_bancos_comerciales
tasa_a_120_cdt_bancos_comerciales
monto_a_120_cdt_bancos_comerciales
tasa_entre_121_y_179_cdt_bancos_comerciales
monto_entre_121_y_179_cdt_bancos_comerciales
tasa_a_180_cdt_bancos_comerciales
monto_a_180_cdt_bancos_comerciales
tasa_entre_181_y_359_cdt_bancos_comerciales
monto_entre_181_y_359_cdt_bancos_comerciales
tasa_a_360_cdt_bancos_comerciales
monto_a_360_cdt_bancos_comerciales
tasa_superiores_a_360_cdt_bancos_comerciales
monto_superiores_a_360_cdt_bancos_comerciales
tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales
monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales
tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales
monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales
tasa_entre_2_y_14_cdats_cdat_bancos_comerciales
monto_entre_2_y_14_cdats_cdat_bancos_comerciales
tasa_entre_15_y_29_cdats_cdat_bancos_comerciales
monto_entre_15_y_29_cdat_bancos_comerciales
tasa_a_30_cdats_cdat_bancos_comerciales
monto_a_30_cdat_bancos_comerciales
tasa_entre_31_y_90_cdats_cdat_bancos_comerciales
monto_entre_31_y_90_cdat_bancos_comerciales
tasa_entre_91_y_180_cdats_cdat_bancos_comerciales
monto_entre_91_y_180_cdat_bancos_comerciales
tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales
monto_de_181_en_adelante_cdats_cdat_bancos_comerciales
tasa_cap_cdat_oficinas_cdat_bancos_comerciales
monto_cap_cdat_oficinas_cdat_bancos_comerciales

}
}
`;
const OBTENER_DATA_BANREPUBLICA_TCAP = gql`
query obtenerData_banrepublica_tcap{
obtenerData_banrepublica_tcap{
id
creador
fecha
empresa_id
tasa_a_30_cdt_bancos_comerciales
monto_a_30_cdt_bancos_comerciales
tasa_entre_31_y_44_cdt_bancos_comerciales
monto_entre_31_y_44_cdt_bancos_comerciales
tasa_a_45_cdt_bancos_comerciales
monto_a_45_cdt_bancos_comerciales
tasa_entre_46_y_59_cdt_bancos_comerciales
monto_entre_46_y_59_cdt_bancos_comerciales
tasa_a_60_cdt_bancos_comerciales
monto_a_60_cdt_bancos_comerciales
tasa_entre_61_y_89_cdt_bancos_comerciales
monto_entre_61_y_89_cdt_bancos_comerciales
tasa_a_90_cdt_bancos_comerciales
monto_a_90_cdt_bancos_comerciales
tasa_entre_91_y_119_cdt_bancos_comerciales
monto_entre_91_y_119_cdt_bancos_comerciales
tasa_a_120_cdt_bancos_comerciales
monto_a_120_cdt_bancos_comerciales
tasa_entre_121_y_179_cdt_bancos_comerciales
monto_entre_121_y_179_cdt_bancos_comerciales
tasa_a_180_cdt_bancos_comerciales
monto_a_180_cdt_bancos_comerciales
tasa_entre_181_y_359_cdt_bancos_comerciales
monto_entre_181_y_359_cdt_bancos_comerciales
tasa_a_360_cdt_bancos_comerciales
monto_a_360_cdt_bancos_comerciales
tasa_superiores_a_360_cdt_bancos_comerciales
monto_superiores_a_360_cdt_bancos_comerciales
tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales
monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales
tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales
monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales
tasa_entre_2_y_14_cdats_cdat_bancos_comerciales
monto_entre_2_y_14_cdats_cdat_bancos_comerciales
tasa_entre_15_y_29_cdats_cdat_bancos_comerciales
monto_entre_15_y_29_cdat_bancos_comerciales
tasa_a_30_cdats_cdat_bancos_comerciales
monto_a_30_cdat_bancos_comerciales
tasa_entre_31_y_90_cdats_cdat_bancos_comerciales
monto_entre_31_y_90_cdat_bancos_comerciales
tasa_entre_91_y_180_cdats_cdat_bancos_comerciales
monto_entre_91_y_180_cdat_bancos_comerciales
tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales
monto_de_181_en_adelante_cdats_cdat_bancos_comerciales
tasa_cap_cdat_oficinas_cdat_bancos_comerciales
monto_cap_cdat_oficinas_cdat_bancos_comerciales

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

const NuevoDatabanrepublica_tcap2= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState();
const [empresa_id, setEmpresa_id]= useState("")
const [nuevoData_banrepublica_tcap]=useMutation(NUEVO_DATA_BANREPUBLICA_TCAP, {
update(cache, { data: { nuevoData_banrepublica_tcap} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_banrepublica_tcap} = cache.readQuery({ query: OBTENER_DATA_BANREPUBLICA_TCAP});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_BANREPUBLICA_TCAP,
data: {
obtenerData_banrepublica_tcap: [...obtenerData_banrepublica_tcap, nuevoData_banrepublica_tcap]
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
var inicio=0
var i=0
var fin=0
while (fin==0) {
i ++;
if (lines[i][0] > 40000 ){
inicio=i
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
headers[0]="Fecha"
for(var j=0;j<headers.length;j++){
if (j>0) {
    
if (headers[j].includes('Tasa') && lines[inicio-3][j]!=null)   {
headers[j] = headers[j].replace('Tasa', 'Tasa_').concat(lines[inicio-2][j], '_',lines[inicio-3][j],'_',lines[inicio-4][1])
}
if (headers[j].includes('Tasa') && lines[inicio-3][j]===null)   {
    if (j<33){
        headers[j] = headers[j].replace('Tasa', 'Tasa_').concat(lines[inicio-2][j], '_',lines[inicio-3][1],'_',lines[inicio-4][1])
    }
    else {
        headers[j] = headers[j].replace('Tasa', 'Tasa_').concat(lines[inicio-2][j], '_',lines[inicio-3][33],'_',lines[inicio-4][1])
    }
    }
    
if (headers[j].includes('Monto')) {
headers[j] = headers[j-1].replace('Tasa_', 'Monto_')
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
    if(currentline[j-2]===null){
        obj[headers[j-2]] = 0;
    }
    else{
        obj[headers[j-2]] = (currentline[j-2]);
    }
}
}

result.push(obj);
}
//return result; //JavaScript object
// parseFloat()
console.log(headers)
console.log(result)
return result; //JSON
}
// }, [datacsv])

const handleSubmit = async () => {
try {
if (loading1) return null; // Si no hay informacion
const Datacsv2=csvJSON(datacsv)
console.log(Datacsv2)
//se deja 25568 para que cuadre
var arreglado = Datacsv2.map( item => {
return {creador:creador,fecha: new Date((Math.round((((item["Fecha"]) - 25569)*86400*1000)))).toISOString().split('T')[0] ,empresa_id:empresa_id,tasa_a_30_cdt_bancos_comerciales:(item["Tasa_A 30 días_CDT_Bancos comerciales"]),monto_a_30_cdt_bancos_comerciales:(item["Monto_A 30 días_CDT_Bancos comerciales"]),tasa_entre_31_y_44_cdt_bancos_comerciales:(item["Tasa_Entre 31 y 44 días_CDT_Bancos comerciales"]),monto_entre_31_y_44_cdt_bancos_comerciales:(item["Monto_Entre 31 y 44 días_CDT_Bancos comerciales"]),tasa_a_45_cdt_bancos_comerciales:(item["Tasa_A 45 días_CDT_Bancos comerciales"]),monto_a_45_cdt_bancos_comerciales:(item["Monto_A 45 días_CDT_Bancos comerciales"]),tasa_entre_46_y_59_cdt_bancos_comerciales:(item["Tasa_Entre 46 y 59 días_CDT_Bancos comerciales"]),monto_entre_46_y_59_cdt_bancos_comerciales:(item["Monto_Entre 46 y 59 días_CDT_Bancos comerciales"]),tasa_a_60_cdt_bancos_comerciales:(item["Tasa_A 60 días_CDT_Bancos comerciales"]),monto_a_60_cdt_bancos_comerciales:(item["Monto_A 60 días_CDT_Bancos comerciales"]),tasa_entre_61_y_89_cdt_bancos_comerciales:(item["Tasa_Entre 61 y 89 días_CDT_Bancos comerciales"]),monto_entre_61_y_89_cdt_bancos_comerciales:(item["Monto_Entre 61 y 89 días_CDT_Bancos comerciales"]),tasa_a_90_cdt_bancos_comerciales:(item["Tasa_A 90 días_CDT_Bancos comerciales"]),monto_a_90_cdt_bancos_comerciales:(item["Monto_A 90 días_CDT_Bancos comerciales"]),tasa_entre_91_y_119_cdt_bancos_comerciales:(item["Tasa_Entre 91 y 119 días_CDT_Bancos comerciales"]),monto_entre_91_y_119_cdt_bancos_comerciales:(item["Monto_Entre 91 y 119 días_CDT_Bancos comerciales"]),tasa_a_120_cdt_bancos_comerciales:(item["Tasa_A 120 días_CDT_Bancos comerciales"]),monto_a_120_cdt_bancos_comerciales:(item["Monto_A 120 días_CDT_Bancos comerciales"]),tasa_entre_121_y_179_cdt_bancos_comerciales:(item["Tasa_Entre 121 y 179 días_CDT_Bancos comerciales"]),monto_entre_121_y_179_cdt_bancos_comerciales:(item["Monto_Entre 121 y 179 días_CDT_Bancos comerciales"]),tasa_a_180_cdt_bancos_comerciales:(item["Tasa_A 180 días_CDT_Bancos comerciales"]),monto_a_180_cdt_bancos_comerciales:(item["Monto_A 180 días_CDT_Bancos comerciales"]),tasa_entre_181_y_359_cdt_bancos_comerciales:(item["Tasa_Entre 181 y 359 días_CDT_Bancos comerciales"]),monto_entre_181_y_359_cdt_bancos_comerciales:(item["Monto_Entre 181 y 359 días_CDT_Bancos comerciales"]),tasa_a_360_cdt_bancos_comerciales:(item["Tasa_A 360 días_CDT_Bancos comerciales"]),monto_a_360_cdt_bancos_comerciales:(item["Monto_A 360 días_CDT_Bancos comerciales"]),tasa_superiores_a_360_cdt_bancos_comerciales:(item["Tasa_Superiores a 360 días_CDT_Bancos comerciales"]),monto_superiores_a_360_cdt_bancos_comerciales:(item["Monto_Superiores a 360 días_CDT_Bancos comerciales"]),tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales:(item["Tasa_Captaciones a través de CDT por red de oficinas_CDT_Bancos comerciales"]),monto_cap_cdt_red_de_oficinas__cdt_bancos_comerciales:(item["Monto_Captaciones a través de CDT por red de oficinas_CDT_Bancos comerciales"]),tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales:(item["Tasa_Captaciones a través de CDT por tesorería_CDT_Bancos comerciales"]),monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales:(item["Monto_Captaciones a través de CDT por tesorería_CDT_Bancos comerciales"]),tasa_entre_2_y_14_cdats_cdat_bancos_comerciales:(item["Tasa_Entre 2 y 14 días (CDATs)_CDAT_Bancos comerciales"]),monto_entre_2_y_14_cdats_cdat_bancos_comerciales:(item["Monto_Entre 2 y 14 días (CDATs)_CDAT_Bancos comerciales"]),tasa_entre_15_y_29_cdats_cdat_bancos_comerciales:(item["Tasa_Entre 15 y 29 días (CDATs)_CDAT_Bancos comerciales"]),monto_entre_15_y_29_cdat_bancos_comerciales:(item["Monto_Entre 15 y 29 días (CDATs)_CDAT_Bancos comerciales"]),tasa_a_30_cdats_cdat_bancos_comerciales:(item["Tasa_A 30 días (CDATs)_CDAT_Bancos comerciales"]),monto_a_30_cdat_bancos_comerciales:(item["Monto_A 30 días (CDATs)_CDAT_Bancos comerciales"]),tasa_entre_31_y_90_cdats_cdat_bancos_comerciales:(item["Tasa_Entre 31 y 90 días (CDATs)_CDAT_Bancos comerciales"]),monto_entre_31_y_90_cdat_bancos_comerciales:(item["Monto_Entre 31 y 90 días (CDATs)_CDAT_Bancos comerciales"]),tasa_entre_91_y_180_cdats_cdat_bancos_comerciales:(item["Tasa_Entre 91 y 180 días (CDATs)_CDAT_Bancos comerciales"]),monto_entre_91_y_180_cdat_bancos_comerciales:(item["Monto_Entre 91 y 180 días (CDATs)_CDAT_Bancos comerciales"]),tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales:(item["Tasa_De 181 días en adelante (CDATs)_CDAT_Bancos comerciales"]),monto_de_181_en_adelante_cdats_cdat_bancos_comerciales:(item["Monto_De 181 días en adelante (CDATs)_CDAT_Bancos comerciales"]),tasa_cap_cdat_oficinas_cdat_bancos_comerciales:(item["Tasa_Captaciones a través de CDAT por red de oficinas_CDAT_Bancos comerciales"]),monto_cap_cdat_oficinas_cdat_bancos_comerciales:(item["Monto_Captaciones a través de CDAT por red de oficinas_CDAT_Bancos comerciales"])}
});
console.log(arreglado)
const {results} = await Promise.all(arreglado.map(object => {
return nuevoData_banrepublica_tcap({ variables:{
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
<Modal.Title>Cargue Masivo a tabla Data BANREPUBLICA TCAP</Modal.Title>
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

export default NuevoDatabanrepublica_tcap2
