import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import csv from 'csv';
import Swal from 'sweetalert2'

const NUEVO_DATA_XM_TRSD= gql`
mutation nuevoData_xm_trsd($input:Data_xm_trsdInput ){
nuevoData_xm_trsd(input:$input){
id
creador
empresa_id
anho
mes
dia
codigo
contenido
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
const OBTENER_DATA_XM_TRSD = gql`
query obtenerData_xm_trsd{
obtenerData_xm_trsd{
id
creador
empresa_id
anho
mes
dia
codigo
contenido
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

const NuevoDataxm_trsd2= (props) => {
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
const [datacsv, setDatacsv] = useState("");
const [fileNames, setFileNames] = useState([]);
const [creador, setCreador] = useState();const [loading, setLoading]= useState(false);
const [empresa_id, setEmpresa_id]= useState("")
const [anho, setAnho]= useState()
const [nuevoData_xm_trsd]=useMutation(NUEVO_DATA_XM_TRSD, {
update(cache, { data: { nuevoData_xm_trsd} } ) {
// Obtener el objeto de cache que deseamos actualizar
const { obtenerData_xm_trsd} = cache.readQuery({ query: OBTENER_DATA_XM_TRSD});
// Reescribimos el cache ( el cache nunca se debe modificar )
cache.writeQuery({
query: OBTENER_DATA_XM_TRSD,
data: {
obtenerData_xm_trsd: [...obtenerData_xm_trsd, nuevoData_xm_trsd]
}
})
}
})
const onDrop = useCallback(acceptedFiles => {
    setFileNames(acceptedFiles.map(file => file.name));
    var data1=[]
    for (let index = 0; index < (acceptedFiles.map(file => file)).length; index++) {
      
        const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading failed");
    reader.onload = () => {
      // Parse CSV file
      csv.parse(reader.result, {delimiter: ';'}, (err, data) => {
        data1.push([acceptedFiles.map(file => file)[index].name,data])
        console.log("Parsed CSV data: ", data1);
      });
    };
      // read file contents
    reader.readAsBinaryString(acceptedFiles.map(file => file)[index]);
    }  
    setDatacsv(data1)
  }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    

    function csvJSON(csv2){
        var lines=csv2
        var result = [];
        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step 
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        // var headers=lines[0].toString().split(";");
        
        for(var k=0;k<lines.length;k++){
        
        console.log
        var headers=lines[k][1][0];
        for(var i=1;i<lines[k][1].length;i++){
            var obj = {};
            // var currentline=lines[i].toString().split(";")
            var currentline=lines[k][1][i]
            for(var j=0;j<headers.length +4;j++){
              if (j ==0){
                obj['creador'] = (creador) 
              }
              if (j ==1){
                obj['empresa_id'] = (empresa_id) 
              }
              if (j ==2){
                
                obj['dia'] = parseFloat(((lines[k][0]).substring(6)).substring(0,2))
               
              }
              if (j ==3){
                
                obj['mes'] = parseFloat(((lines[k][0]).substring(4)).substring(0,2))
              }
              if (j >3){
                if ( (obj[headers[j-4]] ='CODIGO') || (obj[headers[j-4]] ='CONTENIDO'))
                obj[headers[j-4]] = (currentline[j-4]);
                else{
                  obj[headers[j-4]] = parseFloat(currentline[j-4]);
               }    
             }      
            }
            result.push(obj);
        }
      }
        //return result; //JavaScript object
        // parseFloat()
        return result; //JSON
      }
    //   useEffect(() => {   
    //     console.log(Datacsv2)
    // }, [datacsv])

const handleSubmit = async () => { setLoading(true)
try {
if (loading1) return null; // Si no hay informacion
const Datacsv2=csvJSON(datacsv)
console.log(fileNames[0].substr(4,2))
var arreglado = Datacsv2.map( item => {
return {creador:creador,empresa_id:empresa_id,anho:parseFloat(anho),mes:(item["mes"]),dia:(item["dia"]),codigo:(item["CODIGO"]),contenido:(item["CONTENIDO"]),hora_01:parseFloat(item["HORA 01"]),hora_02:parseFloat(item["HORA 02"]),hora_03:parseFloat(item["HORA 03"]),hora_04:parseFloat(item["HORA 04"]),hora_05:parseFloat(item["HORA 05"]),hora_06:parseFloat(item["HORA 06"]),hora_07:parseFloat(item["HORA 07"]),hora_08:parseFloat(item["HORA 08"]),hora_09:parseFloat(item["HORA 09"]),hora_10:parseFloat(item["HORA 10"]),hora_11:parseFloat(item["HORA 11"]),hora_12:parseFloat(item["HORA 12"]),hora_13:parseFloat(item["HORA 13"]),hora_14:parseFloat(item["HORA 14"]),hora_15:parseFloat(item["HORA 15"]),hora_16:parseFloat(item["HORA 16"]),hora_17:parseFloat(item["HORA 17"]),hora_18:parseFloat(item["HORA 18"]),hora_19:parseFloat(item["HORA 19"]),hora_20:parseFloat(item["HORA 20"]),hora_21:parseFloat(item["HORA 21"]),hora_22:parseFloat(item["HORA 22"]),hora_23:parseFloat(item["HORA 23"]),hora_24:parseFloat(item["HORA 24"])}
});
console.log(arreglado)
const {results} = await Promise.all(arreglado.map(object => {
return nuevoData_xm_trsd({ variables:{
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
<Modal.Title>Cargue Masivo a tabla Data XM TRSD</Modal.Title>
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
<input type="number" placeholder="Año" onChange={e => setAnho(e.target.value)} />
</div>
</div>
<div className="container">
<div className="row">
<div className="col-sm">
<button
type="button"
className=    {loading? "bg-gray-400 w-full mt-5 p-2 text-white uppercase":"bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"} 
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
className=    {loading? "bg-gray-400 w-full mt-5 p-2 text-white uppercase":"bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"} 
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

export default NuevoDataxm_trsd2
