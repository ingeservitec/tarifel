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
const NuevoDataxmadem =(props) => {
// para que insertado el dato se refresque la tabla y muestre el nuevo dato
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);    
const [nuevoDataxmadem]=useMutation(NUEVO_DATA_XMADEM, {
      update(cache, { data: { nuevoDataxmadem } } ) {
          // Obtener el objeto de cache que deseamos actualizar
          const { obtenerData_xm_adem} = cache.readQuery({ query: OBTENER_DATA_XM_ADEM  });
          // Reescribimos el cache ( el cache nunca se debe modificar )
          cache.writeQuery({
              query: OBTENER_DATA_XM_ADEM,
              data: {
                obtenerData_xm_adem : [...obtenerData_xm_adem, nuevoDataxmadem ]
              }
          })
      }
  })
  //Datacsv es el csv que se carga para diligenciamiento automatico
    const [datacsv, setDatacsv] = useState("");
    const [fileNames, setFileNames] = useState([]);
    //AGregar estados de cada campo de la tabla
    
    const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [dia, setDia] = useState("");const [creador, setCreador] = useState("");
    const [empresa_id, setEmpresa_id] = useState("");const [cod_contenido, setCod_Contenido] = useState("");const [agente, setAgente] = useState("");
    const [contenido, setContenido] = useState("");const [cont_hora_1, setCont_Hora_1] = useState("");const [cont_hora_2, setCont_Hora_2] = useState("");
    const [cont_hora_3, setCont_Hora_3] = useState("");const [cont_hora_4, setCont_Hora_4] = useState("");const [cont_hora_5, setCont_Hora_5] = useState("");
    const [cont_hora_6, setCont_Hora_6] = useState("");const [cont_hora_7, setCont_Hora_7] = useState("");const [cont_hora_8, setCont_Hora_8] = useState("");
    const [cont_hora_9, setCont_Hora_9] = useState("");const [cont_hora_10, setCont_Hora_10] = useState("");const [cont_hora_11, setCont_Hora_11] = useState("");
    const [cont_hora_12, setCont_Hora_12] = useState("");const [cont_hora_13, setCont_Hora_13] = useState("");const [cont_hora_14, setCont_Hora_14] = useState("");
    const [cont_hora_15, setCont_Hora_15] = useState("");const [cont_hora_16, setCont_Hora_16] = useState("");const [cont_hora_17, setCont_Hora_17] = useState("");
    const [cont_hora_18, setCont_Hora_18] = useState("");const [cont_hora_19, setCont_Hora_19] = useState("");const [cont_hora_20, setCont_Hora_20] = useState("");
    const [cont_hora_21, setCont_Hora_21] = useState("");const [cont_hora_22, setCont_Hora_22] = useState("");const [cont_hora_23, setCont_Hora_23] = useState("");
    const [cont_hora_24, setCont_Hora_24] = useState("");
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

 


      //CUando envio el formulario captura lo que este en campos
      const formik=useFormik({
        initialValues: {
          anho:anho,mes:mes,dia:dia,creador:creador,empresa_id:empresa_id,cod_contenido:cod_contenido,agente:agente,contenido:contenido,cont_hora_1:cont_hora_1,cont_hora_2:cont_hora_2,cont_hora_3:cont_hora_3,cont_hora_4:cont_hora_4,cont_hora_5:cont_hora_5,cont_hora_6:cont_hora_6,cont_hora_7:cont_hora_7,cont_hora_8:cont_hora_8,cont_hora_9:cont_hora_9,cont_hora_10:cont_hora_10,cont_hora_11:cont_hora_11,cont_hora_12:cont_hora_12,cont_hora_13:cont_hora_13,cont_hora_14:cont_hora_14,cont_hora_15:cont_hora_15,cont_hora_16:cont_hora_16,cont_hora_17:cont_hora_17,cont_hora_18:cont_hora_18,cont_hora_19:cont_hora_19,cont_hora_20:cont_hora_20,cont_hora_21:cont_hora_21,cont_hora_22:cont_hora_22,cont_hora_23:cont_hora_23,cont_hora_24:cont_hora_24
        }, 
        enableReinitialize: true,
        validationSchema: Yup.object({
        creador: Yup.string()
        .required('El creador es obligatorio'),
        anho: Yup.string()
        .required('El Año es obligatorio')
        }), 
        onSubmit: async valores => {
        console.log(anho)
        const{anho,mes,dia,creador,empresa_id,cod_contenido,agente,contenido,cont_hora_1,cont_hora_2,cont_hora_3,cont_hora_4,cont_hora_5,cont_hora_6,cont_hora_7,cont_hora_8,cont_hora_9,cont_hora_10,cont_hora_11,cont_hora_12,cont_hora_13,cont_hora_14,cont_hora_15,cont_hora_16,cont_hora_17,cont_hora_18,cont_hora_19,cont_hora_20,cont_hora_21,cont_hora_22,cont_hora_23,cont_hora_24}=valores
        Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
        props.close()
        try {
        const{data}=await nuevoDataxmadem({
        variables:{
          input:{
            anho,mes,dia,creador,empresa_id,cod_contenido,agente,contenido,cont_hora_1,cont_hora_2,cont_hora_3,cont_hora_4,cont_hora_5,cont_hora_6,cont_hora_7,cont_hora_8,cont_hora_9,cont_hora_10,cont_hora_11,cont_hora_12,cont_hora_13,cont_hora_14,cont_hora_15,cont_hora_16,cont_hora_17,cont_hora_18,cont_hora_19,cont_hora_20,cont_hora_21,cont_hora_22,cont_hora_23,cont_hora_24
          }
        }
        });
        console.log(data);
        } catch (error) {
        console.log(error);
        }
        }
        })
    //Detecta cuando se cargo el archivo y pone en el cajon el valor cargado
    useEffect(() => {
          if (datacsv) {
                var Position=(datacsv[0].indexOf(("Año").toString()))
                setAnho(parseFloat(datacsv[1][Position]));
                var Position=(datacsv[0].indexOf(("Mes").toString()))
                setMes(parseFloat(datacsv[1][Position]));
                var Position=(datacsv[0].indexOf(("DIA").toString()))
                setDia(parseFloat(datacsv[1][Position]));
                // var Position=(datacsv[0].indexOf(("Creador").toString()))
                // setCreador(parseFloat(datacsv[1][Position]));
                // var Position=(datacsv[0].indexOf(("empresa_id").toString()))
                // setEmpresa_Id(parseFloat(datacsv[1][Position]));
                var Position=(datacsv[0].indexOf(("CODIGO").toString()))
                setCod_Contenido((datacsv[1][Position]));
                var Position=(datacsv[0].indexOf(("AGENTE").toString()))
                setAgente((datacsv[1][Position]));
                var Position=(datacsv[0].indexOf(("CONTENIDO").toString()))
                setContenido((datacsv[1][Position]));
                var Position=(datacsv[0].indexOf(("HORA 01").toString()))
                setCont_Hora_1(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 02").toString()))
                setCont_Hora_2(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 03").toString()))
                setCont_Hora_3(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 04").toString()))
                setCont_Hora_4(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 05").toString()))
                setCont_Hora_5(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 06").toString()))
                setCont_Hora_6(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 07").toString()))
                setCont_Hora_7(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 08").toString()))
                setCont_Hora_8(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 09").toString()))
                setCont_Hora_9(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 10").toString()))
                setCont_Hora_10(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 11").toString()))
                setCont_Hora_11(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 12").toString()))
                setCont_Hora_12(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 13").toString()))
                setCont_Hora_13(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 14").toString()))
                setCont_Hora_14(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 15").toString()))
                setCont_Hora_15(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 16").toString()))
                setCont_Hora_16(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 17").toString()))
                setCont_Hora_17(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 18").toString()))
                setCont_Hora_18(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 19").toString()))
                setCont_Hora_19(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 20").toString()))
                setCont_Hora_20(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 21").toString()))
                setCont_Hora_21(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 22").toString()))
                setCont_Hora_22(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 23").toString()))
                setCont_Hora_23(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("HORA 24").toString()))
                setCont_Hora_24(parseFloat(datacsv[1][Position]));
        } else {
        }  
    }, [datacsv])

    useEffect(() => {
        if(loading1) return null;
        setCreador(parseInt(data1.obtenerUsuario.id));
        setEmpresa_id(data1.obtenerUsuario.empresa);
        console.log(empresa_id)
        }, [loading1])
   
    return (
    <div>
    <Modal show={props.show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    id="myModal"
    onHide={props.close}>
    <Modal.Header closeButton>
    <Modal.Title>Adicionar datos a tabla Data ADEM</Modal.Title>
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
     
        {/* <div className="form-group row">
        <label htmlFor="creador" className="col-sm-7 col-form-label">Creador</label><div className="col-sm-5">
        <input type="number" className="form-control" id="creador" placeholder="Creador"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.creador}></input></div>
        </div>
        { formik.touched.creador&& formik.errors.creador? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.creador}</p>
        </div>
        ) : null  } */}
 <div className="form-group row">
    <label htmlFor="empresa_id" className="col-sm-7 col-form-label">Empresa</label><div className="col-sm-5">
    <input type="text" className="form-control" id="empresa_id" placeholder="Empresa Id"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.empresa_id ?
      formik.values.empresa_id.charAt(0).toUpperCase() + formik.values.empresa_id.slice(1):''}
      
    readOnly></input></div>
    </div>
    { formik.touched.empresa_id&& formik.errors.empresa_id? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
    
    <p>{formik.errors.empresa_id}</p>
    </div>
    ) : null  }
        <div className="form-group row">
        <label htmlFor="anho" className="col-sm-7 col-form-label">Anho</label><div className="col-sm-5">
        <input type="number" className="form-control" id="anho" placeholder="Anho"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.anho}></input></div>
        </div>
        { formik.touched.anho&& formik.errors.anho? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.anho}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="mes" className="col-sm-7 col-form-label">Mes</label><div className="col-sm-5">
        <input type="number" className="form-control" id="mes" placeholder="Mes"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.mes}></input></div>
        </div>
        { formik.touched.mes&& formik.errors.mes? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.mes}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="dia" className="col-sm-7 col-form-label">Dia</label><div className="col-sm-5">
        <input type="number" className="form-control" id="dia" placeholder="Dia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dia}></input></div>
        </div>
        { formik.touched.dia&& formik.errors.dia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.dia}</p>
        </div>
        ) : null  }

        <div className="form-group row">
        <label htmlFor="cod_contenido" className="col-sm-7 col-form-label">Cod_Contenido</label><div className="col-sm-5">
        <input type="text" className="form-control" id="cod_contenido" placeholder="Cod_Contenido"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cod_contenido}></input></div>
        </div>
        { formik.touched.cod_contenido&& formik.errors.cod_contenido? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cod_contenido}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="agente" className="col-sm-7 col-form-label">Agente</label><div className="col-sm-5">
        <input type="text" className="form-control" id="agente" placeholder="Agente"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.agente}></input></div>
        </div>
        { formik.touched.agente&& formik.errors.agente? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.agente}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="contenido" className="col-sm-7 col-form-label">Contenido</label><div className="col-sm-5">
        <input type="text" className="form-control" id="contenido" placeholder="Contenido"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.contenido}></input></div>
        </div>
        { formik.touched.contenido&& formik.errors.contenido? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.contenido}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_1" className="col-sm-7 col-form-label">Cont_Hora_1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_1" placeholder="Cont_Hora_1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_1}></input></div>
        </div>
        { formik.touched.cont_hora_1&& formik.errors.cont_hora_1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_2" className="col-sm-7 col-form-label">Cont_Hora_2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_2" placeholder="Cont_Hora_2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_2}></input></div>
        </div>
        { formik.touched.cont_hora_2&& formik.errors.cont_hora_2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_3" className="col-sm-7 col-form-label">Cont_Hora_3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_3" placeholder="Cont_Hora_3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_3}></input></div>
        </div>
        { formik.touched.cont_hora_3&& formik.errors.cont_hora_3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_4" className="col-sm-7 col-form-label">Cont_Hora_4</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_4" placeholder="Cont_Hora_4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_4}></input></div>
        </div>
        { formik.touched.cont_hora_4&& formik.errors.cont_hora_4? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_4}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_5" className="col-sm-7 col-form-label">Cont_Hora_5</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_5" placeholder="Cont_Hora_5"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_5}></input></div>
        </div>
        { formik.touched.cont_hora_5&& formik.errors.cont_hora_5? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_5}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_6" className="col-sm-7 col-form-label">Cont_Hora_6</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_6" placeholder="Cont_Hora_6"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_6}></input></div>
        </div>
        { formik.touched.cont_hora_6&& formik.errors.cont_hora_6? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_6}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_7" className="col-sm-7 col-form-label">Cont_Hora_7</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_7" placeholder="Cont_Hora_7"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_7}></input></div>
        </div>
        { formik.touched.cont_hora_7&& formik.errors.cont_hora_7? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_7}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_8" className="col-sm-7 col-form-label">Cont_Hora_8</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_8" placeholder="Cont_Hora_8"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_8}></input></div>
        </div>
        { formik.touched.cont_hora_8&& formik.errors.cont_hora_8? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_8}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_9" className="col-sm-7 col-form-label">Cont_Hora_9</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_9" placeholder="Cont_Hora_9"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_9}></input></div>
        </div>
        { formik.touched.cont_hora_9&& formik.errors.cont_hora_9? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_9}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_10" className="col-sm-7 col-form-label">Cont_Hora_10</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_10" placeholder="Cont_Hora_10"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_10}></input></div>
        </div>
        { formik.touched.cont_hora_10&& formik.errors.cont_hora_10? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_10}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_11" className="col-sm-7 col-form-label">Cont_Hora_11</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_11" placeholder="Cont_Hora_11"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_11}></input></div>
        </div>
        { formik.touched.cont_hora_11&& formik.errors.cont_hora_11? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_11}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_12" className="col-sm-7 col-form-label">Cont_Hora_12</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_12" placeholder="Cont_Hora_12"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_12}></input></div>
        </div>
        { formik.touched.cont_hora_12&& formik.errors.cont_hora_12? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_12}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_13" className="col-sm-7 col-form-label">Cont_Hora_13</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_13" placeholder="Cont_Hora_13"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_13}></input></div>
        </div>
        { formik.touched.cont_hora_13&& formik.errors.cont_hora_13? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_13}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_14" className="col-sm-7 col-form-label">Cont_Hora_14</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_14" placeholder="Cont_Hora_14"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_14}></input></div>
        </div>
        { formik.touched.cont_hora_14&& formik.errors.cont_hora_14? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_14}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_15" className="col-sm-7 col-form-label">Cont_Hora_15</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_15" placeholder="Cont_Hora_15"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_15}></input></div>
        </div>
        { formik.touched.cont_hora_15&& formik.errors.cont_hora_15? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_15}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_16" className="col-sm-7 col-form-label">Cont_Hora_16</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_16" placeholder="Cont_Hora_16"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_16}></input></div>
        </div>
        { formik.touched.cont_hora_16&& formik.errors.cont_hora_16? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_16}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_17" className="col-sm-7 col-form-label">Cont_Hora_17</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_17" placeholder="Cont_Hora_17"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_17}></input></div>
        </div>
        { formik.touched.cont_hora_17&& formik.errors.cont_hora_17? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_17}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_18" className="col-sm-7 col-form-label">Cont_Hora_18</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_18" placeholder="Cont_Hora_18"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_18}></input></div>
        </div>
        { formik.touched.cont_hora_18&& formik.errors.cont_hora_18? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_18}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_19" className="col-sm-7 col-form-label">Cont_Hora_19</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_19" placeholder="Cont_Hora_19"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_19}></input></div>
        </div>
        { formik.touched.cont_hora_19&& formik.errors.cont_hora_19? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_19}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_20" className="col-sm-7 col-form-label">Cont_Hora_20</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_20" placeholder="Cont_Hora_20"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_20}></input></div>
        </div>
        { formik.touched.cont_hora_20&& formik.errors.cont_hora_20? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_20}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_21" className="col-sm-7 col-form-label">Cont_Hora_21</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_21" placeholder="Cont_Hora_21"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_21}></input></div>
        </div>
        { formik.touched.cont_hora_21&& formik.errors.cont_hora_21? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_21}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_22" className="col-sm-7 col-form-label">Cont_Hora_22</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_22" placeholder="Cont_Hora_22"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_22}></input></div>
        </div>
        { formik.touched.cont_hora_22&& formik.errors.cont_hora_22? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_22}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_23" className="col-sm-7 col-form-label">Cont_Hora_23</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_23" placeholder="Cont_Hora_23"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_23}></input></div>
        </div>
        { formik.touched.cont_hora_23&& formik.errors.cont_hora_23? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_23}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="cont_hora_24" className="col-sm-7 col-form-label">Cont_Hora_24</label><div className="col-sm-5">
        <input type="number" className="form-control" id="cont_hora_24" placeholder="Cont_Hora_24"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.cont_hora_24}></input></div>
        </div>
        { formik.touched.cont_hora_24&& formik.errors.cont_hora_24? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        
        <p>{formik.errors.cont_hora_24}</p>
        </div>
        ) : null  }
        <div className="container">
        <div className="row">
        <div className="col-sm">
        <input
        type="submit"
        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
        value="Guardar"
        />
        </div>
        <div className="col-sm">
        <input
        type="button"
        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
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

export default NuevoDataxmadem

