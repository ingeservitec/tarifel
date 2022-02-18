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
const NUEVO_DATA_XMDSPCTTO = gql`
mutation nuevoDataxmdspctto ($input:DataxmdspcttosInput ){
nuevoDataxmdspctto(input:$input){
id
anho
mes
dia
creador
empresa_id
contrato
vendedor
comprador
tipo
tipomerc
desp_hora_1
desp_hora_2
desp_hora_3
desp_hora_4
desp_hora_5
desp_hora_6
desp_hora_7
desp_hora_8
desp_hora_9
desp_hora_10
desp_hora_11
desp_hora_12
desp_hora_13
desp_hora_14
desp_hora_15
desp_hora_16
desp_hora_17
desp_hora_18
desp_hora_19
desp_hora_20
desp_hora_21
desp_hora_22
desp_hora_23
desp_hora_24
trf_hora_1
trf_hora_2
trf_hora_3
trf_hora_4
trf_hora_5
trf_hora_6
trf_hora_7
trf_hora_8
trf_hora_9
trf_hora_10
trf_hora_11
trf_hora_12
trf_hora_13
trf_hora_14
trf_hora_15
trf_hora_16
trf_hora_17
trf_hora_18
trf_hora_19
trf_hora_20
trf_hora_21
trf_hora_22
trf_hora_23
trf_hora_24
}
}
`;
const OBTENER_DATA_XM_DSPCTTO = gql`
query obtenerData_xm_dspctto {
obtenerData_xm_dspctto {
id
anho
mes
dia
creador
contrato
vendedor
comprador
tipo
tipomerc
desp_hora_1
desp_hora_2
desp_hora_3
desp_hora_4
desp_hora_5
desp_hora_6
desp_hora_7
desp_hora_8
desp_hora_9
desp_hora_10
desp_hora_11
desp_hora_12
desp_hora_13
desp_hora_14
desp_hora_15
desp_hora_16
desp_hora_17
desp_hora_18
desp_hora_19
desp_hora_20
desp_hora_21
desp_hora_22
desp_hora_23
desp_hora_24
trf_hora_1
trf_hora_2
trf_hora_3
trf_hora_4
trf_hora_5
trf_hora_6
trf_hora_7
trf_hora_8
trf_hora_9
trf_hora_10
trf_hora_11
trf_hora_12
trf_hora_13
trf_hora_14
trf_hora_15
trf_hora_16
trf_hora_17
trf_hora_18
trf_hora_19
trf_hora_20
trf_hora_21
trf_hora_22
trf_hora_23
trf_hora_24
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
const NuevoDataxmdspctto2 =(props) => {
  const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
    const [datacsv, setDatacsv] = useState("");
    const [fileNames, setFileNames] = useState([]);
    const [creador, setCreador] = useState();
    const [empresa_id, setEmpresa_id]= useState("")
    const [anho, setAnho]= useState()
    const [mes, setMes]= useState()
    const [nuevoDataxmdspctto]=useMutation(NUEVO_DATA_XMDSPCTTO, {
      update(cache, { data: { nuevoDataxmdspctto } } ) {
          // Obtener el objeto de cache que deseamos actualizar
          const { obtenerData_xm_dspctto} = cache.readQuery({ query: OBTENER_DATA_XM_DSPCTTO  });
          // Reescribimos el cache ( el cache nunca se debe modificar )
          cache.writeQuery({
              query: OBTENER_DATA_XM_DSPCTTO,
              data: {
                obtenerData_xm_dspctto : [...obtenerData_xm_dspctto, nuevoDataxmdspctto ]
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
        csv.parse(reader.result, {delimiter: ';'}, (err, data) => {
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
        // var headers=lines[0].toString().split(";");
        var headers=lines[0];
        for(var i=1;i<lines.length;i++){
            var obj = {};
            // var currentline=lines[i].toString().split(";")
            var currentline=lines[i]
            for(var j=0;j<headers.length +2;j++){
              if (j ==0){
                obj['creador'] = (creador) 
              }
              if (j ==1){
                obj['empresa_id'] = (empresa_id) 
              }
              if (j >1){
                if ((obj[headers[j-2]] ='VENDEDOR') || (obj[headers[j-2]] ='COMPRADOR') || (obj[headers[j-2]] ='TIPO') || (obj[headers[j-2]] ='TIPOMERC'))
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
    //   useEffect(() => {   
    //     console.log(Datacsv2)
    // }, [datacsv])

        
      const handleSubmit = async () => { 
     
      try {
        if (loading1) return null; // Si no hay informacion
        const Datacsv2=csvJSON(datacsv)  
        //console.log(fileNames[0].substr(4,2))
        var arreglado = Datacsv2.map( item => { 
          return {anho:parseFloat(anho),mes:parseFloat(mes),dia:parseFloat(((item["DIA"]))),creador:creador,
            empresa_id:empresa_id,contrato:(parseFloat(item["CONTRATO"])),vendedor:((item["VENDEDOR"])),comprador:((item["COMPRADOR"])),tipo:((item["TIPO"])),tipomerc:((item["TIPOMERC"])),desp_hora_1:(parseFloat(item["DESP_HORA 01"])),desp_hora_2:(parseFloat(item["DESP_HORA 02"])),desp_hora_3:(parseFloat(item["DESP_HORA 03"])),desp_hora_4:(parseFloat(item["DESP_HORA 04"])),desp_hora_5:(parseFloat(item["DESP_HORA 05"])),desp_hora_6:(parseFloat(item["DESP_HORA 06"])),desp_hora_7:(parseFloat(item["DESP_HORA 07"])),desp_hora_8:(parseFloat(item["DESP_HORA 08"])),desp_hora_9:(parseFloat(item["DESP_HORA 09"])),desp_hora_10:(parseFloat(item["DESP_HORA 10"])),desp_hora_11:(parseFloat(item["DESP_HORA 11"])),desp_hora_12:(parseFloat(item["DESP_HORA 12"])),desp_hora_13:(parseFloat(item["DESP_HORA 13"])),desp_hora_14:(parseFloat(item["DESP_HORA 14"])),desp_hora_15:(parseFloat(item["DESP_HORA 15"])),desp_hora_16:(parseFloat(item["DESP_HORA 16"])),desp_hora_17:(parseFloat(item["DESP_HORA 17"])),desp_hora_18:(parseFloat(item["DESP_HORA 18"])),desp_hora_19:(parseFloat(item["DESP_HORA 19"])),desp_hora_20:(parseFloat(item["DESP_HORA 20"])),desp_hora_21:(parseFloat(item["DESP_HORA 21"])),desp_hora_22:(parseFloat(item["DESP_HORA 22"])),desp_hora_23:(parseFloat(item["DESP_HORA 23"])),desp_hora_24:(parseFloat(item["DESP_HORA 24"])),trf_hora_1:(parseFloat(item["TRF_HORA 01"])),trf_hora_2:(parseFloat(item["TRF_HORA 02"])),trf_hora_3:(parseFloat(item["TRF_HORA 03"])),trf_hora_4:(parseFloat(item["TRF_HORA 04"])),trf_hora_5:(parseFloat(item["TRF_HORA 05"])),trf_hora_6:(parseFloat(item["TRF_HORA 06"])),trf_hora_7:(parseFloat(item["TRF_HORA 07"])),trf_hora_8:(parseFloat(item["TRF_HORA 08"])),trf_hora_9:(parseFloat(item["TRF_HORA 09"])),trf_hora_10:(parseFloat(item["TRF_HORA 10"])),trf_hora_11:(parseFloat(item["TRF_HORA 11"])),trf_hora_12:(parseFloat(item["TRF_HORA 12"])),trf_hora_13:(parseFloat(item["TRF_HORA 13"])),trf_hora_14:(parseFloat(item["TRF_HORA 14"])),trf_hora_15:(parseFloat(item["TRF_HORA 15"])),trf_hora_16:(parseFloat(item["TRF_HORA 16"])),trf_hora_17:(parseFloat(item["TRF_HORA 17"])),trf_hora_18:(parseFloat(item["TRF_HORA 18"])),trf_hora_19:(parseFloat(item["TRF_HORA 19"])),trf_hora_20:(parseFloat(item["TRF_HORA 20"])),trf_hora_21:(parseFloat(item["TRF_HORA 21"])),trf_hora_22:(parseFloat(item["TRF_HORA 22"])),trf_hora_23:(parseFloat(item["TRF_HORA 23"])),trf_hora_24:(parseFloat(item["TRF_HORA 24"]))}; 
        });
        console.log(arreglado)
        const {results} = await Promise.all(arreglado.map(object => {  
        return nuevoDataxmdspctto({ variables:{
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
    <Modal.Title>Cargue Masivo a tabla Data DSPCTTOS</Modal.Title>
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

export default NuevoDataxmdspctto2

