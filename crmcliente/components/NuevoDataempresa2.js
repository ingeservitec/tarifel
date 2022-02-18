import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Dropfiles from './Dropfiles';
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { gql, useMutation,useQuery} from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { useDropzone } from "react-dropzone";
import csv from 'csv';
import Swal from 'sweetalert2' 
const NUEVO_DATA_EMPRESA = gql`
mutation nuevoDataempresa($input:DataempresaInput){
  nuevoDataempresa(input:$input){
    creador
    anho
    empresa_id
    mes
    mercado
    numero_usuarios_r
    numero_usuarios_nr
    ventas_usuarios_r_nt1_e
    ventas_usuarios_r_nt1_c
    ventas_usuarios_r_nt1_u
    ventas_usuarios_r_nt2
    ventas_usuarios_r_nt3
    ventas_usuarios_nr_kwh
    costo_garantias_mem_cop
    costo_garantias_str_sdl_cop
    pui_cop_kwh
    vsne_kwh
    vnu_kwh
    vae_kwh
  }
}
`;

const OBTENER_DATA_EMPRESAS = gql`
query obtenerData_empresa {
  obtenerData_empresa{
    
    anho
    mes
    empresa_id
    mercado
    numero_usuarios_r
    numero_usuarios_nr
    ventas_usuarios_r_nt1_e
    ventas_usuarios_r_nt1_c
    ventas_usuarios_r_nt1_u
    ventas_usuarios_r_nt2
    ventas_usuarios_r_nt3
    ventas_usuarios_nr_kwh
    costo_garantias_mem_cop
    costo_garantias_str_sdl_cop
    pui_cop_kwh
    vsne_kwh
    vnu_kwh
    vae_kwh
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



const NuevoDataempresa2 =(props) => {

  //Obtengo los datos del usuario Logueado
  const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);
  //Variable donde voy a guardar el usuario que esta creando los datos que es el mismo logueado
  const [creador, setCreador] = useState();
  const [empresa_id, setEmpresa_id]= useState("")
  //CUando retorno actualizo los datos que estoy mostrando con el dato que acabe de crear
  const [nuevoDataempresa]=useMutation(NUEVO_DATA_EMPRESA, {
    update(cache, { data: { nuevoDataempresa } } ) {
        // Obtener el objeto de cache que deseamos actualizar
        const { obtenerData_empresa} = cache.readQuery({ query: OBTENER_DATA_EMPRESAS  });

        // Reescribimos el cache ( el cache nunca se debe modificar )
        cache.writeQuery({
            query: OBTENER_DATA_EMPRESAS,
            data: {
              obtenerData_empresa : [...obtenerData_empresa, nuevoDataempresa ]
            }
        })
    }
})
// Variable donde guardo el archivo creado
    const [datacsv, setDatacsv] = useState("");
    const [fileNames, setFileNames] = useState([]);
// Posibilidad de arrastrar el archivo
    const onDrop = useCallback(acceptedFiles => {
      setFileNames(acceptedFiles.map(file => file.name));
//Leyendo el archivo que selecciono o arrastro     
    const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading failed");
      reader.onload = () => {
        // Parse CSV file
        csv.parse(reader.result, (err, data) => {
         // console.log("Parsed CSV data: ", data);
          setDatacsv(data)
        });
      };
        // read file contents
      acceptedFiles.forEach(file => reader.readAsBinaryString(file));
      }, []);
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
      //Leo el archivo linea a linea llamo esta función que es cuando doy click y ejecuto el handelSubmit, csv2 es lo que le paso
      function csvJSON(csv2){
        var lines=csv2
        var result = [];
        var headers=lines[0]
        //For por todas las lineas
        for(var i=1;i<lines.length;i++){
            var obj = {};
            var currentline=lines[i];
           for(var j=0;j<(headers.length+2);j++){
              if (j ==0){
              obj['creador'] = (creador) 
            }
            if (j ==1){
              obj['empresa_id'] = (empresa_id) 
            }
            if (j >1){
                obj[headers[j-2]] = parseFloat(currentline[j-2]);
             }
            }
            result.push(obj);
        }
 
        return result; //JSON
      }

      const handleSubmit = async () => { 
     
      try {
        if (loading1) return null; // Si no hay informacion
        
        const Datacsv2=csvJSON(datacsv)  
        console.log (Datacsv2)
        const {results} = await Promise.all(Datacsv2.map(object => {
        return nuevoDataempresa({ variables:{
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
      } catch (e) {
        console.log(e)
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
    <Modal.Title>Cargue Masivo a tabla Data Empresa</Modal.Title>
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

export default NuevoDataempresa2

