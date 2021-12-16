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

const NUEVO_DATA_XMTRSM = gql`
mutation nuevoDataxmtrsm ($input:DataxmtrsmInput ){
nuevoDataxmtrsm(input:$input){
id
anho
mes
creador
empresa_id
fecha
codigo
descripcion
valor
  }
}
`;

const OBTENER_DATA_XM_TRSM = gql`
query obtenerData_xm_trsm {
obtenerData_xm_trsm {
  anho
  mes
  creador
  empresa_id
  fecha
  codigo
  descripcion
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
//Se crea la función y le paso las propiedades
const NuevoDataxmtrsm =(props) => {
// para que insertado el dato se refresque la tabla y muestre el nuevo dato
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);    
const [nuevoDataxmtrsm]=useMutation(NUEVO_DATA_XMTRSM, {
      update(cache, { data: { nuevoDataxmtrsm } } ) {
          // Obtener el objeto de cache que deseamos actualizar
          const { obtenerData_xm_trsm} = cache.readQuery({ query: OBTENER_DATA_XM_TRSM  });
          // Reescribimos el cache ( el cache nunca se debe modificar )
          cache.writeQuery({
              query: OBTENER_DATA_XM_TRSM,
              data: {
                obtenerData_xm_trsm : [...obtenerData_xm_trsm, nuevoDataxmtrsm ]
              }
          })
      }
  })
  //Datacsv es el csv que se carga para diligenciamiento automatico
    const [datacsv, setDatacsv] = useState("");
    const [fileNames, setFileNames] = useState([]);
    //AGregar estados de cada campo de la tabla
    const [empresa_id, setEmpresa_id] = useState(""); const [anho, setAnho] = useState("");const [mes, setMes] = useState("");
    const [creador, setCreador] = useState("");const [fecha, setFecha] = useState("");const [codigo, setCodigo] = useState("");const [descripcion, setDescripcion] = useState("");const [valor, setValor] = useState("");
    //habilita para arrastrar archivo
    const onDrop = useCallback(acceptedFiles => {
    setFileNames(acceptedFiles.map(file => file.name));
    //Leer archivo
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
        console.log(csv2)
        var lines=csv2
        console.log(lines)
        var result = [];
        var headers=lines[0].toString().split(";");
        for(var i=1;i<lines.length;i++){
            var obj = {};
            var currentline=lines[i].toString().split(";")
            for(var j=0;j<headers.length;j++){
              if (obj[headers[j]] === 'FECHA' || obj[headers[j]]==='CODIGO'|| obj[headers[j]] ==='DESCRIPCION')
                obj[headers[j]] = (currentline[j]);
                else{
                  obj[headers[j]] = parseFloat(currentline[j]);
               }    
            }
            result.push(obj);
        }
        //return result; //JavaScript object
        // parseFloat()
        return result; //JSON
      }


      //CUando envio el formulario captura lo que este en campos
      const formik=useFormik({
        initialValues: {
        anho:anho,mes:mes,creador:creador,empresa_id:empresa_id,fecha:fecha,codigo:codigo,descripcion:descripcion,valor:valor
        }, 
        enableReinitialize: true,
        validationSchema: Yup.object({
        creador: Yup.string()
        .required('El creador es obligatorio'),
        anho: Yup.string()
        .required('El Año es obligatorio')
        }), 
        onSubmit: async valores => {
        
        
        const{anho,mes,creador,empresa_id,fecha,codigo,descripcion,valor}=valores
        Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
        props.close()
        try {
        const{data}=await nuevoDataxmtrsm({
        variables:{
          input:{
            anho,mes,creador,empresa_id,fecha,codigo,descripcion,valor
          }
        }
        });
        
        } catch (error) {
        console.log(error);
        }
        }
        })
    //Detecta cuando se cargo el archivo y pone en el cajon el valor cargado
    useEffect(() => {
          if (datacsv) {
            var Position=(datacsv[0].indexOf(("AÑO").toString()))
            setAnho(parseFloat(datacsv[1][Position]));
            var Position=(datacsv[0].indexOf(("MES").toString()))
            setMes(parseFloat(datacsv[1][Position]))
            // var Position=(datacsv[0].indexOf(("Creador").toString()))
            // setCreador(parseFloat(datacsv[1][Position]));
            var Position=(datacsv[0].indexOf(("FECHA").toString()))
           setFecha((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("CODIGO").toString()))
           setCodigo((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESCRIPCION").toString()))
           setDescripcion((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR").toString()))
           setValor(parseFloat(datacsv[1][Position]));
        } else {
        }  
    }, [datacsv])

    useEffect(() => {
        if(loading1) return null;
        setCreador(parseInt(data1.obtenerUsuario.id));
        setEmpresa_id(data1.obtenerUsuario.empresa);
        }, [loading1])
   
    return (
    <div>
    <Modal show={props.show}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    id="myModal"
    onHide={props.close}>
    <Modal.Header closeButton>
    <Modal.Title>Adicionar datos a tabla Data TRSM</Modal.Title>
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
    <form
    onSubmit={formik.handleSubmit}
    >
      <div className="form-group row">
    <label htmlFor="empresa_id"className="col-sm-7 col-form-label">Empresa</label><div className="col-sm-3">
    <input type="text" className="form-control" id="empresa_id" placeholder="Empresa Id"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.empresa_id ?
      formik.values.empresa_id.charAt(0).toUpperCase() + formik.values.empresa_id.slice(1):''}
      
    readOnly></input></div>
    </div>
    { formik.touched.empresa_id&& formik.errors.empresa_id? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
    <p className="font-bold">Error</p>
    <p>{formik.errors.empresa_id}</p>
    </div>
    ) : null  }
        <div className="form-group row">
        <label htmlFor="anho"className="col-sm-7 col-form-label">Anho</label><div className="col-sm-3">
        <input type="number" className="form-control" id="anho" placeholder="Anho"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.anho}></input></div>
        </div>
        { formik.touched.anho&& formik.errors.anho? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.anho}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="mes"className="col-sm-7 col-form-label">Mes</label><div className="col-sm-3">
        <input type="number" className="form-control" id="mes" placeholder="Mes"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.mes}></input></div>
        </div>
        { formik.touched.mes&& formik.errors.mes? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.mes}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="fecha"className="col-sm-7 col-form-label">Fecha</label><div className="col-sm-3">
        <input type="date" className="form-control" id="fecha" placeholder="Fecha"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.fecha}></input></div>
        </div>
        { formik.touched.fecha&& formik.errors.fecha? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.fecha}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="codigo"className="col-sm-7 col-form-label">Codigo</label><div className="col-sm-3">
        <input type="text" className="form-control" id="codigo" placeholder="Codigo"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.codigo}></input></div>
        </div>
        { formik.touched.codigo&& formik.errors.codigo? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.codigo}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="descripcion"className="col-sm-7 col-form-label">Descripcion</label><div className="col-sm-3">
        <input type="text" className="form-control" id="descripcion" placeholder="Descripcion"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.descripcion}></input></div>
        </div>
        { formik.touched.descripcion&& formik.errors.descripcion? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.descripcion}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="valor"className="col-sm-7 col-form-label">Valor</label><div className="col-sm-3">
        <input type="number" className="form-control" id="valor" placeholder="Valor"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.valor}></input></div>
        </div>
        { formik.touched.valor&& formik.errors.valor? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.valor}</p>
        </div>
        ) : null  }
        <div className="container">
        <div className="row">
        <div className="col-sm">
        <input
        type="submit"
        className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
        value="Guardar"
        />
        </div>
        <div className="col-sm">
        <input
        type="button"
        className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
        value="Cancelar"
        onClick={props.close}
    />
    </div>
    </div>
    </div>
    </form>
    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
    </Modal>
    </div>

    )
}

export default NuevoDataxmtrsm

