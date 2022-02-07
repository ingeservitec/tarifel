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
//Se crea la función y le paso las propiedades
const NuevoDataxmdspctto =(props) => {
// para que insertado el dato se refresque la tabla y muestre el nuevo dato
const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);    
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
  //Datacsv es el csv que se carga para diligenciamiento automatico
    const [datacsv, setDatacsv] = useState("");
    const [fileNames, setFileNames] = useState([]);
    //AGregar estados de cada campo de la tabla
    const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [dia, setDia] = useState("");const [creador, setCreador] = useState("");
    const [empresa_id, setEmpresa_id] = useState("");const [contrato, setContrato] = useState("");
    const [vendedor, setVendedor] = useState("");const [comprador, setComprador] = useState("");
    const [tipo, setTipo] = useState("");const [tipomerc, setTipomerc] = useState("");
    const [desp_hora_1, setDesp_Hora_1] = useState("");const [desp_hora_2, setDesp_Hora_2] = useState("");
    const [desp_hora_3, setDesp_Hora_3] = useState("");const [desp_hora_4, setDesp_Hora_4] = useState("");const [desp_hora_5, setDesp_Hora_5] = useState("");const [desp_hora_6, setDesp_Hora_6] = useState("");const [desp_hora_7, setDesp_Hora_7] = useState("");const [desp_hora_8, setDesp_Hora_8] = useState("");const [desp_hora_9, setDesp_Hora_9] = useState("");const [desp_hora_10, setDesp_Hora_10] = useState("");const [desp_hora_11, setDesp_Hora_11] = useState("");const [desp_hora_12, setDesp_Hora_12] = useState("");const [desp_hora_13, setDesp_Hora_13] = useState("");const [desp_hora_14, setDesp_Hora_14] = useState("");const [desp_hora_15, setDesp_Hora_15] = useState("");const [desp_hora_16, setDesp_Hora_16] = useState("");const [desp_hora_17, setDesp_Hora_17] = useState("");const [desp_hora_18, setDesp_Hora_18] = useState("");const [desp_hora_19, setDesp_Hora_19] = useState("");const [desp_hora_20, setDesp_Hora_20] = useState("");const [desp_hora_21, setDesp_Hora_21] = useState("");const [desp_hora_22, setDesp_Hora_22] = useState("");const [desp_hora_23, setDesp_Hora_23] = useState("");const [desp_hora_24, setDesp_Hora_24] = useState("");const [trf_hora_1, setTrf_Hora_1] = useState("");const [trf_hora_2, setTrf_Hora_2] = useState("");const [trf_hora_3, setTrf_Hora_3] = useState("");const [trf_hora_4, setTrf_Hora_4] = useState("");const [trf_hora_5, setTrf_Hora_5] = useState("");const [trf_hora_6, setTrf_Hora_6] = useState("");const [trf_hora_7, setTrf_Hora_7] = useState("");const [trf_hora_8, setTrf_Hora_8] = useState("");const [trf_hora_9, setTrf_Hora_9] = useState("");const [trf_hora_10, setTrf_Hora_10] = useState("");const [trf_hora_11, setTrf_Hora_11] = useState("");const [trf_hora_12, setTrf_Hora_12] = useState("");const [trf_hora_13, setTrf_Hora_13] = useState("");const [trf_hora_14, setTrf_Hora_14] = useState("");const [trf_hora_15, setTrf_Hora_15] = useState("");const [trf_hora_16, setTrf_Hora_16] = useState("");const [trf_hora_17, setTrf_Hora_17] = useState("");const [trf_hora_18, setTrf_Hora_18] = useState("");const [trf_hora_19, setTrf_Hora_19] = useState("");const [trf_hora_20, setTrf_Hora_20] = useState("");const [trf_hora_21, setTrf_Hora_21] = useState("");const [trf_hora_22, setTrf_Hora_22] = useState("");const [trf_hora_23, setTrf_Hora_23] = useState("");const [trf_hora_24, setTrf_Hora_24] = useState("");
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
                anho:anho,mes:mes,dia:dia,creador:creador,empresa_id:empresa_id,contrato:contrato,vendedor:vendedor,comprador:comprador,tipo:tipo,tipomerc:tipomerc,desp_hora_1:desp_hora_1,desp_hora_2:desp_hora_2,desp_hora_3:desp_hora_3,desp_hora_4:desp_hora_4,desp_hora_5:desp_hora_5,desp_hora_6:desp_hora_6,desp_hora_7:desp_hora_7,desp_hora_8:desp_hora_8,desp_hora_9:desp_hora_9,desp_hora_10:desp_hora_10,desp_hora_11:desp_hora_11,desp_hora_12:desp_hora_12,desp_hora_13:desp_hora_13,desp_hora_14:desp_hora_14,desp_hora_15:desp_hora_15,desp_hora_16:desp_hora_16,desp_hora_17:desp_hora_17,desp_hora_18:desp_hora_18,desp_hora_19:desp_hora_19,desp_hora_20:desp_hora_20,desp_hora_21:desp_hora_21,desp_hora_22:desp_hora_22,desp_hora_23:desp_hora_23,desp_hora_24:desp_hora_24,trf_hora_1:trf_hora_1,trf_hora_2:trf_hora_2,trf_hora_3:trf_hora_3,trf_hora_4:trf_hora_4,trf_hora_5:trf_hora_5,trf_hora_6:trf_hora_6,trf_hora_7:trf_hora_7,trf_hora_8:trf_hora_8,trf_hora_9:trf_hora_9,trf_hora_10:trf_hora_10,trf_hora_11:trf_hora_11,trf_hora_12:trf_hora_12,trf_hora_13:trf_hora_13,trf_hora_14:trf_hora_14,trf_hora_15:trf_hora_15,trf_hora_16:trf_hora_16,trf_hora_17:trf_hora_17,trf_hora_18:trf_hora_18,trf_hora_19:trf_hora_19,trf_hora_20:trf_hora_20,trf_hora_21:trf_hora_21,trf_hora_22:trf_hora_22,trf_hora_23:trf_hora_23,trf_hora_24:trf_hora_24
        }, 
        enableReinitialize: true,
        validationSchema: Yup.object({
        creador: Yup.string()
        .required('El creador es obligatorio'),
        anho: Yup.string()
        .required('El Año es obligatorio')
        }), 
        onSubmit: async valores => {
        const{anho,mes,dia,creador,empresa_id,contrato,vendedor,comprador,tipo,tipomerc,desp_hora_1,desp_hora_2,desp_hora_3,desp_hora_4,desp_hora_5,desp_hora_6,desp_hora_7,desp_hora_8,desp_hora_9,desp_hora_10,desp_hora_11,desp_hora_12,desp_hora_13,desp_hora_14,desp_hora_15,desp_hora_16,desp_hora_17,desp_hora_18,desp_hora_19,desp_hora_20,desp_hora_21,desp_hora_22,desp_hora_23,desp_hora_24,trf_hora_1,trf_hora_2,trf_hora_3,trf_hora_4,trf_hora_5,trf_hora_6,trf_hora_7,trf_hora_8,trf_hora_9,trf_hora_10,trf_hora_11,trf_hora_12,trf_hora_13,trf_hora_14,trf_hora_15,trf_hora_16,trf_hora_17,trf_hora_18,trf_hora_19,trf_hora_20,trf_hora_21,trf_hora_22,trf_hora_23,trf_hora_24}=valores
        Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
        props.close()
        try {
        const{data}=await nuevoDataxmdspctto({
        variables:{
          input:{
                anho,mes,dia,creador,empresa_id,contrato,vendedor,comprador,tipo,tipomerc,desp_hora_1,desp_hora_2,desp_hora_3,desp_hora_4,desp_hora_5,desp_hora_6,desp_hora_7,desp_hora_8,desp_hora_9,desp_hora_10,desp_hora_11,desp_hora_12,desp_hora_13,desp_hora_14,desp_hora_15,desp_hora_16,desp_hora_17,desp_hora_18,desp_hora_19,desp_hora_20,desp_hora_21,desp_hora_22,desp_hora_23,desp_hora_24,trf_hora_1,trf_hora_2,trf_hora_3,trf_hora_4,trf_hora_5,trf_hora_6,trf_hora_7,trf_hora_8,trf_hora_9,trf_hora_10,trf_hora_11,trf_hora_12,trf_hora_13,trf_hora_14,trf_hora_15,trf_hora_16,trf_hora_17,trf_hora_18,trf_hora_19,trf_hora_20,trf_hora_21,trf_hora_22,trf_hora_23,trf_hora_24
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
                setAnho(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Mes").toString()))
                setMes(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Dia").toString()))
                setDia(parseFloat(datacsv[1][Position]));
                // var Position=(datacsv[0].indexOf(("Creador").toString()))
                // setCreador(parseFloat(datacsv[1][Position]));
                // var Position=(datacsv[0].indexOf(("Empresa_id").toString()))
                // setEmpresa_Id((datacsv[1][Position]));
                var Position=(datacsv[0].indexOf(("CONTRATO").toString()))
                setContrato(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VENDEDOR").toString()))
                setVendedor((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("COMPRADOR").toString()))
                setComprador((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TIPO").toString()))
                setTipo((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TIPOMERC").toString()))
                setTipomerc((datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 01").toString()))
                setDesp_Hora_1(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 02").toString()))
                setDesp_Hora_2(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 03").toString()))
                setDesp_Hora_3(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 04").toString()))
                setDesp_Hora_4(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 05").toString()))
                setDesp_Hora_5(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 06").toString()))
                setDesp_Hora_6(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 07").toString()))
                setDesp_Hora_7(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 08").toString()))
                setDesp_Hora_8(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 09").toString()))
                setDesp_Hora_9(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 10").toString()))
                setDesp_Hora_10(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 11").toString()))
                setDesp_Hora_11(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 12").toString()))
                setDesp_Hora_12(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 13").toString()))
                setDesp_Hora_13(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 14").toString()))
                setDesp_Hora_14(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 15").toString()))
                setDesp_Hora_15(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 16").toString()))
                setDesp_Hora_16(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 17").toString()))
                setDesp_Hora_17(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 18").toString()))
                setDesp_Hora_18(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 19").toString()))
                setDesp_Hora_19(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 20").toString()))
                setDesp_Hora_20(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 21").toString()))
                setDesp_Hora_21(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 22").toString()))
                setDesp_Hora_22(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 23").toString()))
                setDesp_Hora_23(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("DESP_HORA 24").toString()))
                setDesp_Hora_24(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 01").toString()))
                setTrf_Hora_1(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 02").toString()))
                setTrf_Hora_2(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 03").toString()))
                setTrf_Hora_3(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 04").toString()))
                setTrf_Hora_4(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 05").toString()))
                setTrf_Hora_5(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 06").toString()))
                setTrf_Hora_6(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 07").toString()))
                setTrf_Hora_7(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 08").toString()))
                setTrf_Hora_8(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 09").toString()))
                setTrf_Hora_9(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 10").toString()))
                setTrf_Hora_10(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 11").toString()))
                setTrf_Hora_11(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 12").toString()))
                setTrf_Hora_12(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 13").toString()))
                setTrf_Hora_13(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 14").toString()))
                setTrf_Hora_14(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 15").toString()))
                setTrf_Hora_15(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 16").toString()))
                setTrf_Hora_16(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 17").toString()))
                setTrf_Hora_17(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 18").toString()))
                setTrf_Hora_18(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 19").toString()))
                setTrf_Hora_19(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 20").toString()))
                setTrf_Hora_20(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 21").toString()))
                setTrf_Hora_21(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 22").toString()))
                setTrf_Hora_22(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 23").toString()))
                setTrf_Hora_23(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TRF_HORA 24").toString()))
                setTrf_Hora_24(parseFloat(datacsv[1][Position]));
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
    <Modal.Title>Adicionar datos a tabla Data DSPCTTOS</Modal.Title>
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
        <label htmlFor="anho" className="col-sm-7 col-form-label">Anho</label><div className="col-sm-5">
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
        <label htmlFor="mes" className="col-sm-7 col-form-label">Mes</label><div className="col-sm-5">
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
        <label htmlFor="dia" className="col-sm-7 col-form-label">Dia</label><div className="col-sm-5">
        <input type="number" className="form-control" id="dia" placeholder="Dia"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.dia}></input></div>
        </div>
        { formik.touched.dia&& formik.errors.dia? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.dia}</p>
        </div>
        ) : null  }
        {/* <div className="form-group row">
        <label htmlFor="creador" className="col-sm-7 col-form-label">Creador</label><div className="col-sm-5">
        <input type="number" className="form-control" id="creador" placeholder="Creador"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.creador}></input></div>
        </div>
        { formik.touched.creador&& formik.errors.creador? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.creador}</p>
        </div>
        ) : null  }
        <div className="form-group row">
        <label htmlFor="empresa_id" className="col-sm-7 col-form-label">Empresa_Id</label><div className="col-sm-5">
        <input type="number" className="form-control" id="empresa_id" placeholder="Empresa_Id"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.empresa_id}></input></div>
        </div>
        { formik.touched.empresa_id&& formik.errors.empresa_id? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.empresa_id}</p>
        </div>
        ) : null  } */}
        <div className="form-group row">
        <label htmlFor="contrato" className="col-sm-7 col-form-label">Contrato</label><div className="col-sm-5">
        <input type="number" className="form-control" id="contrato" placeholder="Contrato"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.contrato}></input></div>
        </div>
        { formik.touched.contrato&& formik.errors.contrato? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.contrato}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="vendedor" className="col-sm-7 col-form-label">Vendedor</label><div className="col-sm-5">
        <input type="text" className="form-control" id="vendedor" placeholder="Vendedor"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.vendedor}></input></div>
        </div>
        { formik.touched.vendedor&& formik.errors.vendedor? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.vendedor}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="comprador" className="col-sm-7 col-form-label">Comprador</label><div className="col-sm-5">
        <input type="text" className="form-control" id="comprador" placeholder="Comprador"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.comprador}></input></div>
        </div>
        { formik.touched.comprador&& formik.errors.comprador? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.comprador}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tipo" className="col-sm-7 col-form-label">Tipo</label><div className="col-sm-5">
        <input type="text" className="form-control" id="tipo" placeholder="Tipo"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tipo}></input></div>
        </div>
        { formik.touched.tipo&& formik.errors.tipo? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tipo}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tipomerc" className="col-sm-7 col-form-label">Tipomerc</label><div className="col-sm-5">
        <input type="text" className="form-control" id="tipomerc" placeholder="Tipomerc"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tipomerc}></input></div>
        </div>
        { formik.touched.tipomerc&& formik.errors.tipomerc? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tipomerc}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_1" className="col-sm-7 col-form-label">Desp_Hora_1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_1" placeholder="Desp_Hora_1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_1}></input></div>
        </div>
        { formik.touched.desp_hora_1&& formik.errors.desp_hora_1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_2" className="col-sm-7 col-form-label">Desp_Hora_2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_2" placeholder="Desp_Hora_2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_2}></input></div>
        </div>
        { formik.touched.desp_hora_2&& formik.errors.desp_hora_2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_3" className="col-sm-7 col-form-label">Desp_Hora_3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_3" placeholder="Desp_Hora_3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_3}></input></div>
        </div>
        { formik.touched.desp_hora_3&& formik.errors.desp_hora_3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_4" className="col-sm-7 col-form-label">Desp_Hora_4</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_4" placeholder="Desp_Hora_4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_4}></input></div>
        </div>
        { formik.touched.desp_hora_4&& formik.errors.desp_hora_4? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_4}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_5" className="col-sm-7 col-form-label">Desp_Hora_5</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_5" placeholder="Desp_Hora_5"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_5}></input></div>
        </div>
        { formik.touched.desp_hora_5&& formik.errors.desp_hora_5? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_5}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_6" className="col-sm-7 col-form-label">Desp_Hora_6</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_6" placeholder="Desp_Hora_6"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_6}></input></div>
        </div>
        { formik.touched.desp_hora_6&& formik.errors.desp_hora_6? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_6}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_7" className="col-sm-7 col-form-label">Desp_Hora_7</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_7" placeholder="Desp_Hora_7"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_7}></input></div>
        </div>
        { formik.touched.desp_hora_7&& formik.errors.desp_hora_7? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_7}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_8" className="col-sm-7 col-form-label">Desp_Hora_8</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_8" placeholder="Desp_Hora_8"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_8}></input></div>
        </div>
        { formik.touched.desp_hora_8&& formik.errors.desp_hora_8? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_8}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_9" className="col-sm-7 col-form-label">Desp_Hora_9</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_9" placeholder="Desp_Hora_9"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_9}></input></div>
        </div>
        { formik.touched.desp_hora_9&& formik.errors.desp_hora_9? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_9}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_10" className="col-sm-7 col-form-label">Desp_Hora_10</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_10" placeholder="Desp_Hora_10"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_10}></input></div>
        </div>
        { formik.touched.desp_hora_10&& formik.errors.desp_hora_10? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_10}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_11" className="col-sm-7 col-form-label">Desp_Hora_11</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_11" placeholder="Desp_Hora_11"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_11}></input></div>
        </div>
        { formik.touched.desp_hora_11&& formik.errors.desp_hora_11? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_11}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_12" className="col-sm-7 col-form-label">Desp_Hora_12</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_12" placeholder="Desp_Hora_12"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_12}></input></div>
        </div>
        { formik.touched.desp_hora_12&& formik.errors.desp_hora_12? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_12}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_13" className="col-sm-7 col-form-label">Desp_Hora_13</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_13" placeholder="Desp_Hora_13"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_13}></input></div>
        </div>
        { formik.touched.desp_hora_13&& formik.errors.desp_hora_13? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_13}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_14" className="col-sm-7 col-form-label">Desp_Hora_14</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_14" placeholder="Desp_Hora_14"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_14}></input></div>
        </div>
        { formik.touched.desp_hora_14&& formik.errors.desp_hora_14? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_14}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_15" className="col-sm-7 col-form-label">Desp_Hora_15</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_15" placeholder="Desp_Hora_15"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_15}></input></div>
        </div>
        { formik.touched.desp_hora_15&& formik.errors.desp_hora_15? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_15}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_16" className="col-sm-7 col-form-label">Desp_Hora_16</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_16" placeholder="Desp_Hora_16"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_16}></input></div>
        </div>
        { formik.touched.desp_hora_16&& formik.errors.desp_hora_16? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_16}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_17" className="col-sm-7 col-form-label">Desp_Hora_17</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_17" placeholder="Desp_Hora_17"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_17}></input></div>
        </div>
        { formik.touched.desp_hora_17&& formik.errors.desp_hora_17? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_17}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_18" className="col-sm-7 col-form-label">Desp_Hora_18</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_18" placeholder="Desp_Hora_18"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_18}></input></div>
        </div>
        { formik.touched.desp_hora_18&& formik.errors.desp_hora_18? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_18}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_19" className="col-sm-7 col-form-label">Desp_Hora_19</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_19" placeholder="Desp_Hora_19"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_19}></input></div>
        </div>
        { formik.touched.desp_hora_19&& formik.errors.desp_hora_19? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_19}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_20" className="col-sm-7 col-form-label">Desp_Hora_20</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_20" placeholder="Desp_Hora_20"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_20}></input></div>
        </div>
        { formik.touched.desp_hora_20&& formik.errors.desp_hora_20? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_20}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_21" className="col-sm-7 col-form-label">Desp_Hora_21</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_21" placeholder="Desp_Hora_21"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_21}></input></div>
        </div>
        { formik.touched.desp_hora_21&& formik.errors.desp_hora_21? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_21}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_22" className="col-sm-7 col-form-label">Desp_Hora_22</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_22" placeholder="Desp_Hora_22"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_22}></input></div>
        </div>
        { formik.touched.desp_hora_22&& formik.errors.desp_hora_22? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_22}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_23" className="col-sm-7 col-form-label">Desp_Hora_23</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_23" placeholder="Desp_Hora_23"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_23}></input></div>
        </div>
        { formik.touched.desp_hora_23&& formik.errors.desp_hora_23? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_23}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="desp_hora_24" className="col-sm-7 col-form-label">Desp_Hora_24</label><div className="col-sm-5">
        <input type="number" className="form-control" id="desp_hora_24" placeholder="Desp_Hora_24"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.desp_hora_24}></input></div>
        </div>
        { formik.touched.desp_hora_24&& formik.errors.desp_hora_24? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.desp_hora_24}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_1" className="col-sm-7 col-form-label">Trf_Hora_1</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_1" placeholder="Trf_Hora_1"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_1}></input></div>
        </div>
        { formik.touched.trf_hora_1&& formik.errors.trf_hora_1? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_1}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_2" className="col-sm-7 col-form-label">Trf_Hora_2</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_2" placeholder="Trf_Hora_2"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_2}></input></div>
        </div>
        { formik.touched.trf_hora_2&& formik.errors.trf_hora_2? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_2}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_3" className="col-sm-7 col-form-label">Trf_Hora_3</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_3" placeholder="Trf_Hora_3"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_3}></input></div>
        </div>
        { formik.touched.trf_hora_3&& formik.errors.trf_hora_3? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_3}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_4" className="col-sm-7 col-form-label">Trf_Hora_4</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_4" placeholder="Trf_Hora_4"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_4}></input></div>
        </div>
        { formik.touched.trf_hora_4&& formik.errors.trf_hora_4? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_4}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_5" className="col-sm-7 col-form-label">Trf_Hora_5</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_5" placeholder="Trf_Hora_5"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_5}></input></div>
        </div>
        { formik.touched.trf_hora_5&& formik.errors.trf_hora_5? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_5}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_6" className="col-sm-7 col-form-label">Trf_Hora_6</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_6" placeholder="Trf_Hora_6"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_6}></input></div>
        </div>
        { formik.touched.trf_hora_6&& formik.errors.trf_hora_6? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_6}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_7" className="col-sm-7 col-form-label">Trf_Hora_7</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_7" placeholder="Trf_Hora_7"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_7}></input></div>
        </div>
        { formik.touched.trf_hora_7&& formik.errors.trf_hora_7? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_7}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_8" className="col-sm-7 col-form-label">Trf_Hora_8</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_8" placeholder="Trf_Hora_8"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_8}></input></div>
        </div>
        { formik.touched.trf_hora_8&& formik.errors.trf_hora_8? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_8}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_9" className="col-sm-7 col-form-label">Trf_Hora_9</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_9" placeholder="Trf_Hora_9"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_9}></input></div>
        </div>
        { formik.touched.trf_hora_9&& formik.errors.trf_hora_9? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_9}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_10" className="col-sm-7 col-form-label">Trf_Hora_10</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_10" placeholder="Trf_Hora_10"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_10}></input></div>
        </div>
        { formik.touched.trf_hora_10&& formik.errors.trf_hora_10? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_10}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_11" className="col-sm-7 col-form-label">Trf_Hora_11</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_11" placeholder="Trf_Hora_11"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_11}></input></div>
        </div>
        { formik.touched.trf_hora_11&& formik.errors.trf_hora_11? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_11}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_12" className="col-sm-7 col-form-label">Trf_Hora_12</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_12" placeholder="Trf_Hora_12"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_12}></input></div>
        </div>
        { formik.touched.trf_hora_12&& formik.errors.trf_hora_12? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_12}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_13" className="col-sm-7 col-form-label">Trf_Hora_13</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_13" placeholder="Trf_Hora_13"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_13}></input></div>
        </div>
        { formik.touched.trf_hora_13&& formik.errors.trf_hora_13? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_13}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_14" className="col-sm-7 col-form-label">Trf_Hora_14</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_14" placeholder="Trf_Hora_14"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_14}></input></div>
        </div>
        { formik.touched.trf_hora_14&& formik.errors.trf_hora_14? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_14}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_15" className="col-sm-7 col-form-label">Trf_Hora_15</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_15" placeholder="Trf_Hora_15"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_15}></input></div>
        </div>
        { formik.touched.trf_hora_15&& formik.errors.trf_hora_15? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_15}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_16" className="col-sm-7 col-form-label">Trf_Hora_16</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_16" placeholder="Trf_Hora_16"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_16}></input></div>
        </div>
        { formik.touched.trf_hora_16&& formik.errors.trf_hora_16? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_16}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_17" className="col-sm-7 col-form-label">Trf_Hora_17</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_17" placeholder="Trf_Hora_17"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_17}></input></div>
        </div>
        { formik.touched.trf_hora_17&& formik.errors.trf_hora_17? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_17}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_18" className="col-sm-7 col-form-label">Trf_Hora_18</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_18" placeholder="Trf_Hora_18"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_18}></input></div>
        </div>
        { formik.touched.trf_hora_18&& formik.errors.trf_hora_18? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_18}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_19" className="col-sm-7 col-form-label">Trf_Hora_19</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_19" placeholder="Trf_Hora_19"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_19}></input></div>
        </div>
        { formik.touched.trf_hora_19&& formik.errors.trf_hora_19? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_19}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_20" className="col-sm-7 col-form-label">Trf_Hora_20</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_20" placeholder="Trf_Hora_20"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_20}></input></div>
        </div>
        { formik.touched.trf_hora_20&& formik.errors.trf_hora_20? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_20}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_21" className="col-sm-7 col-form-label">Trf_Hora_21</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_21" placeholder="Trf_Hora_21"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_21}></input></div>
        </div>
        { formik.touched.trf_hora_21&& formik.errors.trf_hora_21? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_21}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_22" className="col-sm-7 col-form-label">Trf_Hora_22</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_22" placeholder="Trf_Hora_22"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_22}></input></div>
        </div>
        { formik.touched.trf_hora_22&& formik.errors.trf_hora_22? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_22}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_23" className="col-sm-7 col-form-label">Trf_Hora_23</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_23" placeholder="Trf_Hora_23"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_23}></input></div>
        </div>
        { formik.touched.trf_hora_23&& formik.errors.trf_hora_23? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_23}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="trf_hora_24" className="col-sm-7 col-form-label">Trf_Hora_24</label><div className="col-sm-5">
        <input type="number" className="form-control" id="trf_hora_24" placeholder="Trf_Hora_24"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.trf_hora_24}></input></div>
        </div>
        { formik.touched.trf_hora_24&& formik.errors.trf_hora_24? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.trf_hora_24}</p>
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

export default NuevoDataxmdspctto

