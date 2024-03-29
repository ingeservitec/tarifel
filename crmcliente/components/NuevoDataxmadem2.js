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

// Mutation para introducir datos
const NUEVO_DATA_XMADEM = gql`
mutation nuevoDataxmadem ($input:DataxmademInput ){
nuevoDataxmadem(input:$input){
  id
  anho
  mes
  dia
  creador
  empresa_id
  cod_contenido
  agente
  contenido
  cont_hora_1
  cont_hora_2
  cont_hora_3
  cont_hora_4
  cont_hora_5
  cont_hora_6
  cont_hora_7
  cont_hora_8
  cont_hora_9
  cont_hora_10
  cont_hora_11
  cont_hora_12
  cont_hora_13
  cont_hora_14
  cont_hora_15
  cont_hora_16
  cont_hora_17
  cont_hora_18
  cont_hora_19
  cont_hora_20
  cont_hora_21
  cont_hora_22
  cont_hora_23
  cont_hora_24
}
}
`;

//Se obtiene lo que exista en al tabla
const OBTENER_DATA_XM_ADEM = gql`
query obtenerData_xm_adem {
obtenerData_xm_adem {
id
anho
mes
dia
creador
cod_contenido
agente
contenido
cont_hora_1
cont_hora_2
cont_hora_3
cont_hora_4
cont_hora_5
cont_hora_6
cont_hora_7
cont_hora_8
cont_hora_9
cont_hora_10
cont_hora_11
cont_hora_12
cont_hora_13
cont_hora_14
cont_hora_15
cont_hora_16
cont_hora_17
cont_hora_18
cont_hora_19
cont_hora_20
cont_hora_21
cont_hora_22
cont_hora_23
cont_hora_24 
  }
}
`;
// Obtener quien esta logueado
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

const NuevoDataxmadem2 =(props) => {
  const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
    const [datacsv, setDatacsv] = useState("");
    const [fileNames, setFileNames] = useState([]);
    const [creador, setCreador] = useState();
    const [loading, setLoading]= useState(false);
    const [empresa_id, setEmpresa_id]= useState("")
    const [anho, setAnho]= useState()
    const [mes, setMes]= useState()
    const [nuevoDataxmadem]=useMutation(NUEVO_DATA_XMADEM)

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
        setMes(parseFloat(((lines[k][0]).substring(8)).substring(0,2)))
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
                
                obj['DIA'] = parseFloat(((lines[k][0]).substring(6)).substring(0,2))
              }
              if (j ==3){
                
                obj['MES'] = parseFloat(((lines[k][0]).substring(4)).substring(0,2))
              }
              //PENDIENTE DE PROBAR SI FUNCIONA ANTES ESTABA 2
              if (j >3){
                if ( (obj[headers[j-4]] ='CODIGO') || (obj[headers[j-4]] ='AGENTE') || (obj[headers[j-4]] ='CONTENIDO'))
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
        var arreglado = Datacsv2.map( item => { 
          return {anho:parseFloat(anho),mes:parseFloat(item["MES"]),dia:parseFloat(item["DIA"]),creador:creador,
          empresa_id:empresa_id,cod_contenido:item["CODIGO"],agente:item["AGENTE"],
          contenido:(item["CONTENIDO"]),cont_hora_1:parseFloat(item["HORA 01"]),cont_hora_2:parseFloat(item["HORA 02"]),
          cont_hora_3:parseFloat(item["HORA 03"]),cont_hora_4:parseFloat(item["HORA 04"]),cont_hora_5:parseFloat(item["HORA 05"]),
          cont_hora_6:parseFloat(item["HORA 06"]),cont_hora_7:parseFloat(item["HORA 07"]),cont_hora_8:parseFloat(item["HORA 08"]),
          cont_hora_9:parseFloat(item["HORA 09"]),cont_hora_10:parseFloat(item["HORA 10"]),cont_hora_11:parseFloat(item["HORA 11"]),
          cont_hora_12:parseFloat(item["HORA 12"]),cont_hora_13:parseFloat(item["HORA 13"]),cont_hora_14:parseFloat(item["HORA 14"]),
          cont_hora_15:parseFloat(item["HORA 15"]),cont_hora_16:parseFloat(item["HORA 16"]),cont_hora_17:parseFloat(item["HORA 17"]),
          cont_hora_18:parseFloat(item["HORA 18"]),cont_hora_19:parseFloat(item["HORA 19"]),cont_hora_20:parseFloat(item["HORA 20"]),
          cont_hora_21:parseFloat(item["HORA 21"]),cont_hora_22:parseFloat(item["HORA 22"]),cont_hora_23:parseFloat(item["HORA 23"]),
          cont_hora_24:parseFloat(item["HORA 24"])}; 
        });
        console.log(arreglado)
        const arreglado2=arreglado.filter(arreglado => arreglado.agente===empresa_id)   
        console.log(arreglado2)
        const {results} = await Promise.all(arreglado2.map(object => {  
        return nuevoDataxmadem({ variables:{
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
    <Modal.Title>Cargue Masivo a tabla Data ADEM</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div>
        <div className="card  col-sm m-2">
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
    <input type="number" placeholder="Mes" onChange={e => setMes(e.target.value)} />      
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

export default NuevoDataxmadem2

