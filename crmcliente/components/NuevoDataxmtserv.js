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

const NUEVO_DATA_XMTSERV = gql`
mutation nuevoDataxmtserv ($input:DataxmtservInput ){
nuevoDataxmtserv(input:$input){
        id
        anho
        mes
        creador
        empresa_id
        fecha
        agente
        beneficiario
        concepto
        tipopago
        valor
        magnitud
}
}
`;
const OBTENER_DATA_XM_TSERV = gql`
query obtenerData_xm_tserv {
obtenerData_xm_tserv {
id
anho
mes
creador
empresa_id
fecha
agente
beneficiario
concepto
tipopago
valor
magnitud
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
const NuevoDataxmtserv =(props) => {
// para que insertado el dato se refresque la tabla y muestre el nuevo dato

  const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_USUARIO);    
  const [nuevoDataxmtserv]=useMutation(NUEVO_DATA_XMTSERV, {
        update(cache, { data: { nuevoDataxmtserv } } ) {
            // Obtener el objeto de cache que deseamos actualizar
            const { obtenerData_xm_tserv} = cache.readQuery({ query: OBTENER_DATA_XM_TSERV  });
            // Reescribimos el cache ( el cache nunca se debe modificar )
            cache.writeQuery({
                query: OBTENER_DATA_XM_TSERV,
                data: {
                        obtenerData_xm_tserv : [...obtenerData_xm_tserv, nuevoDataxmtserv ]
                }
            })
        }
    })


  //Datacsv es el csv que se carga para diligenciamiento automatico
    const [datacsv, setDatacsv] = useState("");
    const [fileNames, setFileNames] = useState([]);
    //AGregar estados de cada campo de la tabla
    const [anho, setAnho] = useState("");const [mes, setMes] = useState("");const [creador, setCreador] = useState("");const [empresa_id, setEmpresa_id] = useState("");const [fecha, setFecha] = useState("");const [agente, setAgente] = useState("");const [beneficiario, setBeneficiario] = useState("");const [concepto, setConcepto] = useState("");const [tipopago, setTipopago] = useState("");const [valor, setValor] = useState("");const [magnitud, setMagnitud] = useState("")
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
                anho:anho,mes:mes,creador:creador,empresa_id:empresa_id,fecha:fecha,agente:agente,beneficiario:beneficiario,concepto:concepto,tipopago:tipopago,valor:valor,magnitud:magnitud
        }, 
        enableReinitialize: true,
        validationSchema: Yup.object({
        creador: Yup.string()
        .required('El creador es obligatorio'),
        anho: Yup.string()
        .required('El Año es obligatorio')
        }), 
        onSubmit: async valores => {
        const{anho,mes,creador,empresa_id,fecha,agente,beneficiario,concepto,tipopago,valor,magnitud}=valores
        Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
        props.close()
        try {
        const{data}=await nuevoDataxmtserv({
        variables:{
          input:{
                anho,mes,creador,empresa_id,fecha,agente,beneficiario,concepto,tipopago,valor,magnitud
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
           setMes(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Creador").toString()))
           setCreador(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("Empresa_id").toString()))
           setEmpresa_Id(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("FECHA").toString()))
           setFecha(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("AGENTE").toString()))
           setAgente(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("BENEFICIARIO").toString()))
           setBeneficiario(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("CONCEPTO").toString()))
           setConcepto(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("TIPOPAGO").toString()))
           setTipopago(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("VALOR").toString()))
           setValor(parseFloat(datacsv[1][Position]));var Position=(datacsv[0].indexOf(("MAGNITUD").toString()))
           setMagnitud(parseFloat(datacsv[1][Position]))
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
    aria-labelledby="contained-modal-title-vcenter"
    centered
    id="myModal"
    onHide={props.close}>
    <Modal.Header closeButton>
    <Modal.Title>Adicionar datos a tabla Data TSERV</Modal.Title>
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
        ) : null  }
        <div className="form-group row">
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
        ) : null  }
        {/* <div className="form-group row">
        <label htmlFor="creador"className="col-sm-7 col-form-label">Creador</label><div className="col-sm-3">
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
        ) : null  } */}
        {/* <div className="form-group row">
        <label htmlFor="empresa_id"className="col-sm-7 col-form-label">Empresa_Id</label><div className="col-sm-3">
        <input type="text" className="form-control" id="empresa_id" placeholder="Empresa_Id"
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
        <label htmlFor="agente"className="col-sm-7 col-form-label">Agente</label><div className="col-sm-3">
        <input type="text" className="form-control" id="agente" placeholder="Agente"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.agente}></input></div>
        </div>
        { formik.touched.agente&& formik.errors.agente? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.agente}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="beneficiario"className="col-sm-7 col-form-label">Beneficiario</label><div className="col-sm-3">
        <input type="text" className="form-control" id="beneficiario" placeholder="Beneficiario"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.beneficiario}></input></div>
        </div>
        { formik.touched.beneficiario&& formik.errors.beneficiario? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.beneficiario}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="concepto"className="col-sm-7 col-form-label">Concepto</label><div className="col-sm-3">
        <input type="text" className="form-control" id="concepto" placeholder="Concepto"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.concepto}></input></div>
        </div>
        { formik.touched.concepto&& formik.errors.concepto? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.concepto}</p>
        </div>
        ) : null  }<div className="form-group row">
        <label htmlFor="tipopago"className="col-sm-7 col-form-label">Tipopago</label><div className="col-sm-3">
        <input type="text" className="form-control" id="tipopago" placeholder="Tipopago"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.tipopago}></input></div>
        </div>
        { formik.touched.tipopago&& formik.errors.tipopago? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.tipopago}</p>
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
        ) : null  }<div className="form-group row">
        <label htmlFor="magnitud"className="col-sm-7 col-form-label">Magnitud</label><div className="col-sm-3">
        <input type="number" className="form-control" id="magnitud" placeholder="Magnitud"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.magnitud}></input></div>
        </div>
        { formik.touched.magnitud&& formik.errors.magnitud? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{formik.errors.magnitud}</p>
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

export default NuevoDataxmtserv

