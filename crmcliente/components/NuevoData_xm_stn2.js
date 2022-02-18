import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'
import XLSX from 'xlsx';

const NUEVO_DATA_DATAXMSTN= gql`
mutation nuevoDataxmstn($input:DataxmstnInput ){
nuevoDataxmstn(input:$input){
id
creador
empresa_id
anho
mes
t_cop_kwh
t_prima_cop_kwh
Energia_sin_kwh
Ing_Reg_Bruto_T_cop
Ing_Compensar_T_cop
Ing_Reg_Neto_T_cop
delta_t_cop_kwh

}
}
`;


const NUEVO_DATA_XM_GUATAPE= gql`
mutation nuevoData_xm_guatape($input:Data_xm_guatapeInput ){
nuevoData_xm_guatape(input:$input){
id
creador
empresa_id
anho
mes
agente
demanda_kwh
crs_variable_guatape_cop
}
}
`;

const OBTENER_DATA_DATAXMSTN = gql`
query obtenerDataxmstn{
obtenerDataxmstn{
id
creador
empresa_id
anho
mes
t_cop_kwh
t_prima_cop_kwh
Energia_sin_kwh
Ing_Reg_Bruto_T_cop
Ing_Compensar_T_cop
Ing_Reg_Neto_T_cop
delta_t_cop_kwh

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




const NuevoDatadataxmstn2= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState("");const [empresa_id, setEmpresa_id] = useState("");const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [t_cop_kwh, setT_Cop_Kwh] = useState("");const [t_prima_cop_kwh, setT_Prima_Cop_Kwh] = useState("");const [Energia_sin_kwh, setEnergia_Sin_Kwh] = useState("");const [Ing_Reg_Bruto_T_cop, setIng_Reg_Bruto_T_Cop] = useState("");const [Ing_Compensar_T_cop, setIng_Compensar_T_Cop] = useState("");const [Ing_Reg_Neto_T_cop, setIng_Reg_Neto_T_Cop] = useState("");const [delta_t_cop_kwh, setDelta_T_Cop_Kwh] = useState("");
const [Agente, setAgente] = useState("");const [Demanda_kWh, setDemanda_Kwh] = useState("");const [CRS_Variable_Guatape_Cop, setCrs_Variable_Guatape_Cop] = useState("");
const [nuevoDataxmstn]=useMutation(NUEVO_DATA_DATAXMSTN, {
 
 
 
    update(cache, { data: { nuevoDataxmstn} } ) {
    // Obtener el objeto de cache que deseamos actualizar
    const { obtenerDataxmstn} = cache.readQuery({ query: OBTENER_DATA_DATAXMSTN});
    // Reescribimos el cache ( el cache nunca se debe modificar )
    cache.writeQuery({
    query: OBTENER_DATA_DATAXMSTN,
    data: {
    obtenerDataxmstn: [...obtenerDataxmstn, nuevoDataxmstn]
    }
    })
    }
    })
const [nuevoData_xm_guatape]=useMutation(NUEVO_DATA_XM_GUATAPE)
const onDrop = useCallback(acceptedFiles => {
setFileNames(acceptedFiles.map(file => file.name));
const reader = new FileReader();
reader.onabort = () => console.log("file reading was aborted");
reader.onerror = () => console.log("file reading failed");
reader.onload = () => {
// Parse CSV file

const workbook = XLSX.read(reader.result, {type: 'binary'});
    const firstSheet = workbook.SheetNames[0];
    const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Cargos Monomios']);
const data=excelRows

if (data[0].__EMPTY_2==='Ingreso Regulado Bruto que pagan los comercializadores ($) =') {
    setIng_Reg_Bruto_T_Cop(data[0].__EMPTY_3)
    setIng_Compensar_T_Cop(data[1].__EMPTY_3)
    setIng_Reg_Neto_T_Cop(data[2].__EMPTY_3)
}
if (data[7].__EMPTY_3==='TOTAL' && data[7].__EMPTY_2==='DEMANDA\nMÍNIMA') {
    setEnergia_Sin_Kwh(data[8].__EMPTY_3)
}
if (data[9].__EMPTY_3===24) {
setT_Cop_Kwh(data[10].__EMPTY_3)
setT_Prima_Cop_Kwh(data[11].__EMPTY_3)
}

const excelRows2 = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Deltas']);
const data2=excelRows2
if (data2[2].__EMPTY_3==="TOTAL") {
    setDelta_T_Cop_Kwh(data2[3].__EMPTY_3)
}

const excelRows3 = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['CRS_Variante Guatape']);
const data3=excelRows3
setDatacsv(data3)


//readXlsxFile(reader.result, { sheet: 'Cargos Monomios' }).then((data) => {
//console.log("Parsed CSV data: ", data);
//setDatacsv(data)
//});
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
    const{data}=await nuevoDataxmstn({
    variables:{
    input:{
        creador:creador,empresa_id:empresa_id,anho:parseInt(fileNames[0].substr(11,4)),mes:parseInt(fileNames[0].substr(16,2)),t_cop_kwh:t_cop_kwh,t_prima_cop_kwh:t_prima_cop_kwh,Energia_sin_kwh:Energia_sin_kwh,Ing_Reg_Bruto_T_cop:Ing_Reg_Bruto_T_cop.toString(),Ing_Compensar_T_cop:Ing_Compensar_T_cop.toString(),Ing_Reg_Neto_T_cop:Ing_Reg_Neto_T_cop.toString(),delta_t_cop_kwh:delta_t_cop_kwh
    }
    }
    })
    var arreglado = datacsv.map( item => {
        return {creador:creador,agente:(item["Participante del Mercado"]),demanda_kwh:(item["DEMANDA REAL TOTAL (kWh)"]),crs_variable_guatape_cop:(item["CRS_VARIANTE GUATAPE (COP)"]),empresa_id:empresa_id,anho:parseInt(fileNames[0].substr(11,4)),mes:parseInt(fileNames[0].substr(16,2))}
    });
    console.log(arreglado)
    const {results} = await Promise.all(arreglado.map(object => {
        return nuevoData_xm_guatape({ variables:{
        input:
        object
        }
        });
        }
        ));

    } catch (error) {
    console.log(error);
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
<Modal.Title>Cargue Masivo a tabla Data DATAXMSTN</Modal.Title>
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

export default NuevoDatadataxmstn2
