import React, { useState, useCallback, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { useDropzone } from "react-dropzone";
import csv from "csv";
import Swal from "sweetalert2";
import { OBTENER_USUARIO, OBTENER_DATA_EMPRESAS,NUEVO_DATA_EMPRESA } from "../data";



//Se crea la función y le paso las propiedades
const NuevoDataempresa = (props) => {
  const {
    data: data1,
    error: error1,
    loading: loading1,
  } = useQuery(OBTENER_USUARIO);
  //Para que se actualcie la tabla cuando retorne



  const [nuevoDataempresa] = useMutation(NUEVO_DATA_EMPRESA, {
    update(cache, { data: { nuevoDataempresa } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerData_empresa } = cache.readQuery({
        query: OBTENER_DATA_EMPRESAS,
      });

      // Reescribimos el cache ( el cache nunca se debe modificar )
      cache.writeQuery({
        query: OBTENER_DATA_EMPRESAS,
        data: {
          obtenerData_empresa: [...obtenerData_empresa, nuevoDataempresa],
        },
      });
    },
  });
  const [datacsv, setDatacsv] = useState("");
  const [fileNames, setFileNames] = useState([]);
  const [creador, setCreador] = useState("");
  const [anho, setAño] = useState("");
  const [empresa_id, setEmpresa_id] = useState("");
  const [mes, setMes] = useState("");
  const [mercado, setMercado] = useState("");
  const [numero_usuarios_r, setNúmeroUsuariosR] = useState("");
  const [numero_usuarios_nr, setNúmeroUsuariosNR] = useState("");
  const [ventas_usuarios_r_nt1_e, setVentasUsuariosRNt1E] = useState("");
  const [ventas_usuarios_r_nt1_c, setVentasUsuariosRNt1C] = useState("");
  const [ventas_usuarios_r_nt1_u, setVentasUsuariosRNt1U] = useState("");
  const [ventas_usuarios_r_nt2, setVentasUsuariosRNt2] = useState("");
  const [ventas_usuarios_r_nt3, setVentasUsuariosRNt3] = useState("");
  const [ventas_usuarios_nr_kwh, setVentasUsuariosNrKwh] = useState("");
  const [pui_cop_kwh, setPUICopKwh] = useState("");
  const [vsne_kwh, setVSNEKwh] = useState("");
  const [vnu_kwh, setVNUKwh] = useState("");
  const [vae_kwh, setVAEKwh] = useState("");
  const [g_exc1, setG_exc1] = useState("");
  const [g_exc1_21, setG_exc1_21] = useState("");
  const [g_exc2, setG_exc2] = useState("");
  const [g_exc3, setG_exc3] = useState("");
  const [ggd, setGgd] = useState("");
  const [cot, setCot] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    setFileNames(acceptedFiles.map((file) => file.name));

    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading failed");
    reader.onload = () => {
      // Parse CSV file
      csv.parse(reader.result, (err, data) => {
        console.log("Parsed CSV data: ", data);
        setDatacsv(data);
      });
    };
    // read file contents
    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const formik = useFormik({
    initialValues: {
      creador: creador,
      anho: anho,
      mes: mes,
      empresa_id: empresa_id,
      mercado: mercado,
      numero_usuarios_r: numero_usuarios_r,
      numero_usuarios_nr: numero_usuarios_nr,
      ventas_usuarios_r_nt1_e: ventas_usuarios_r_nt1_e,
      ventas_usuarios_r_nt1_c: ventas_usuarios_r_nt1_c,
      ventas_usuarios_r_nt1_u: ventas_usuarios_r_nt1_u,
      ventas_usuarios_r_nt2: ventas_usuarios_r_nt2,
      ventas_usuarios_r_nt3: ventas_usuarios_r_nt3,
      ventas_usuarios_nr_kwh: ventas_usuarios_nr_kwh,
      pui_cop_kwh: pui_cop_kwh,
      vsne_kwh: vsne_kwh,
      vnu_kwh: vnu_kwh,
      vae_kwh: vae_kwh,
      g_exc1: g_exc1,
      g_exc1_21: g_exc1_21,
      g_exc2: g_exc2,
      g_exc3: g_exc3,
      ggd: ggd,
      cot: cot,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      creador: Yup.string().required("El creador es obligatorio"),
      anho: Yup.string().required("El Año es obligatorio"),
      mes: Yup.string()
        .required("El Mes es obligatorio")

        .test(
          "date-test",
          "El año y mes no puede ser superior al periodo m-1",
          function (value) {
            const date = new Date();
            const anhoActual = date.getFullYear();
            const mesActual = date.getMonth();

            if (value) {
              const anho = parseInt(this.parent.anho);
              const mes = parseInt(value);
              console.log(value);
              console.log(this.parent.anho);

              if (
                parseInt(anho) > parseInt(anhoActual) ||
                (parseInt(anho) == parseInt(anhoActual) && parseInt(mes) > parseInt(mesActual))
              ) {
                return false;
              }
            }
            return true;
          }
        ),
    }),

    onSubmit: async (valores) => {
      const {
        creador,
        anho,
        mes,
        empresa_id,
        mercado,
        numero_usuarios_r,
        numero_usuarios_nr,
        ventas_usuarios_r_nt1_e,
        ventas_usuarios_r_nt1_c,
        ventas_usuarios_r_nt1_u,
        ventas_usuarios_r_nt2,
        ventas_usuarios_r_nt3,
        ventas_usuarios_nr_kwh,
        pui_cop_kwh,
        vsne_kwh,
        vnu_kwh,
        vae_kwh,
        g_exc1,
        g_exc1_21,
        g_exc2,
        g_exc3,
        ggd,
        cot
      } = valores;
    
      try {
       
        const { data } = await nuevoDataempresa({
          variables: {
            input: {
              creador,
              anho,
              mes,
              empresa_id,
              mercado,
              numero_usuarios_r,
              numero_usuarios_nr,
              ventas_usuarios_r_nt1_e,
              ventas_usuarios_r_nt1_c,
              ventas_usuarios_r_nt1_u,
              ventas_usuarios_r_nt2,
              ventas_usuarios_r_nt3,
              ventas_usuarios_nr_kwh,
              pui_cop_kwh,
              vsne_kwh,
              vnu_kwh,
              vae_kwh,
              g_exc1,
              g_exc1_21,
              g_exc2,
              g_exc3,
              ggd,
              cot
            },
          },
        });
        Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
        props.close();
      } catch (error) {
        Swal.fire("Huy", " " + error, "warning");
        console.log(error);
      }
    },
  });
  //Detecta cuando se cargo el archivo y pone en el cajon el valor cargado
  useEffect(() => {
    if (datacsv) {
      // console.log(datacsv[0].find(element => element === "a"))

      var Position = datacsv[0].indexOf("anho".toString());
      setAño(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("mes".toString());
      setMes(parseFloat(datacsv[1][Position]));
      //  var Position=(datacsv[0].indexOf(("empresa_id").toString()))
      //  setEmpresaId(datacsv[1][Position]);
      var Position = datacsv[0].indexOf("mercado".toString());
      setMercado(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("numero_usuarios_r".toString());
      setNúmeroUsuariosR(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("numero_usuarios_nr".toString());
      setNúmeroUsuariosNR(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("ventas_usuarios_r_nt1_e".toString());
      setVentasUsuariosRNt1E(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("ventas_usuarios_r_nt1_c".toString());
      setVentasUsuariosRNt1C(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("ventas_usuarios_r_nt1_u".toString());
      setVentasUsuariosRNt1U(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("ventas_usuarios_r_nt2".toString());
      setVentasUsuariosRNt2(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("ventas_usuarios_r_nt3".toString());
      setVentasUsuariosRNt3(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("ventas_usuarios_nr_kwh".toString());
      setVentasUsuariosNrKwh(parseFloat(datacsv[1][Position]));
      setPUICopKwh(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("vsne_kwh".toString());
      setVSNEKwh(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("vnu_kwh".toString());
      setVNUKwh(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("vae_kwh".toString());
      setG_exc1(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("g_exc1".toString());
      setG_exc1_21(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("g_exc1_21".toString());
      setG_exc2(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("g_exc2".toString());
      setG_exc3(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("g_exc3".toString());
      setGgd(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("ggd".toString());
      setCot(parseFloat(datacsv[1][Position]));
      var Position = datacsv[0].indexOf("cot".toString());
    } else {
    }
  }, [datacsv]);

  useEffect(() => {
    if (loading1) return null;
    setCreador(parseInt(data1.obtenerUsuario.id));
    setEmpresa_id(data1.obtenerUsuario.empresa);
    console.log(empresa_id);
  }, [loading1]);

  return (
    <div>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="myModal"
        onHide={props.close}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar datos a tabla Data Empresa</Modal.Title>
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
                    {fileNames.map((fileName) => (
                      <li key={fileName}>{fileName}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* <div className="form-group row">
    <label htmlFor="creador" className="col-sm-7 col-form-label">Creador</label><div className="col-sm-5">
    <input type="number" className="form-control" id="creador" placeholder= "Creador"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.creador}
    ></input></div>
    </div>
    { formik.touched.creador&& formik.errors.creador? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
    
    <p>{formik.errors.creador}</p>
    </div>
    ) : null  } */}
            <div className="form-group row">
              <label htmlFor="empresa_id" className="col-sm-7 col-form-label">
                Empresa
              </label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control"
                  id="empresa_id"
                  placeholder="Empresa Id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.empresa_id
                      ? formik.values.empresa_id.charAt(0).toUpperCase() +
                        formik.values.empresa_id.slice(1)
                      : ""
                  }
                  readOnly
                ></input>
              </div>
            </div>
            {formik.touched.empresa_id && formik.errors.empresa_id ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.empresa_id}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label htmlFor="anho" className="col-sm-7 col-form-label">
                Año
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="anho"
                  onChange={formik.handleChange}
                  placeholder="Año"
                  onBlur={formik.handleBlur}
                  value={formik.values.anho}
                ></input>
              </div>
            </div>
            {formik.touched.anho && formik.errors.anho ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.anho}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label htmlFor="mes" className="col-sm-7 col-form-label">
                Mes
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="mes"
                  placeholder="Mes"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mes}
                ></input>
              </div>
            </div>
            {formik.touched.mes && formik.errors.mes ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.mes}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label htmlFor="mercado" className="col-sm-7 col-form-label">
                Mercado
              </label>
              <div className="col-sm-5">
                <select
                  type="number"
                  className="form-control"
                  id="mercado"
                  placeholder="Mercado"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mercado}
                >
                  <option value="">Seleccione </option>
                  <option value="AIR-E">AIR-E</option>
                  <option value="ANTIOQUIA CREG 078/07">
                    ANTIOQUIA CREG 078/07
                  </option>
                  <option value="ARAUCA">ARAUCA</option>
                  <option value="BAJO PUTUMAYO">BAJO PUTUMAYO</option>
                  <option value="BOGOTA - CUNDINAMARCA CREG 199/16">
                    BOGOTA - CUNDINAMARCA CREG 199/16
                  </option>
                  <option value="BOYACA">BOYACA</option>
                  <option value="CALDAS">CALDAS</option>
                  <option value="CALI - YUMBO - PUERTO TEJADA">
                    CALI - YUMBO - PUERTO TEJADA
                  </option>
                  <option value="CAQUETA">CAQUETA</option>
                  <option value="CARIBE MAR">CARIBE MAR</option>
                  <option value="CARTAGO">CARTAGO</option>
                  <option value="CASANARE">CASANARE</option>
                  <option value="CAUCA">CAUCA</option>
                  <option value="CELSIA VALLE DEL CAUCA">
                    CELSIA VALLE DEL CAUCA
                  </option>
                  <option value="CHAIRA ">CHAIRA</option>
                  <option value="CHOCO">CHOCO</option>
                  <option value="ECUADOR">ECUADOR</option>
                  <option value="GUAVIARE">GUAVIARE</option>
                  <option value="HUILA">HUILA</option>
                  <option value="META">META</option>
                  <option value="NARIÑO">NARIÑO</option>
                  <option value="NORTE DE SANTANDER">NORTE DE SANTANDER</option>
                  <option value="PEREIRA">PEREIRA</option>
                  <option value="POPAYAN - PURACE">POPAYAN - PURACE</option>
                  <option value="PUTUMAYO">PUTUMAYO</option>
                  <option value="QUINDIO">QUINDIO</option>
                  <option value="RUITOQUE">RUITOQUE</option>
                  <option value="SANTANDER">SANTANDER</option>
                  <option value="SIBUNDOY">SIBUNDOY</option>
                  <option value="TOLIMA">TOLIMA</option>
                  <option value="TULUA">TULUA</option>
                </select>
              </div>
            </div>

            {formik.touched.mercado && formik.errors.mercado ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.mercado}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label
                htmlFor="numero_usuarios_r"
                className="col-sm-7 col-form-label"
              >
                Número Usuarios R
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="numero_usuarios_r"
                  placeholder="Número Usuarios R"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.numero_usuarios_r}
                ></input>
              </div>
            </div>
            {formik.touched.numero_usuarios_r &&
            formik.errors.numero_usuarios_r ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.numero_usuarios_r}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label
                htmlFor="numero_usuarios_nr"
                className="col-sm-7 col-form-label"
              >
                Número Usuarios NR
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="numero_usuarios_nr"
                  placeholder="Número Usuarios NR"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.numero_usuarios_nr}
                ></input>
              </div>
            </div>
            {formik.touched.numero_usuarios_nr &&
            formik.errors.numero_usuarios_nr ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.numero_usuarios_nr}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label
                htmlFor="ventas_usuarios_r_nt1_e"
                className="col-sm-7 col-form-label"
              >
                Ventas Usuarios R Nt1 E
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="ventas_usuarios_r_nt1_e"
                  placeholder="Ventas Usuarios R Nt1 E"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ventas_usuarios_r_nt1_e}
                ></input>
              </div>
            </div>
            {formik.touched.ventas_usuarios_r_nt1_e &&
            formik.errors.ventas_usuarios_r_nt1_e ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.ventas_usuarios_r_nt1_e}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label
                htmlFor="ventas_usuarios_r_nt1_c"
                className="col-sm-7 col-form-label"
              >
                Ventas Usuarios R Nt1 C
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="ventas_usuarios_r_nt1_c"
                  placeholder="Ventas Usuarios R Nt1 C"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ventas_usuarios_r_nt1_c}
                ></input>
              </div>
            </div>
            {formik.touched.ventas_usuarios_r_nt1_c &&
            formik.errors.ventas_usuarios_r_nt1_c ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.ventas_usuarios_r_nt1_c}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label
                htmlFor="ventas_usuarios_r_nt1_u"
                className="col-sm-7 col-form-label"
              >
                Ventas Usuarios R Nt1 U
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="ventas_usuarios_r_nt1_u"
                  placeholder="Ventas Usuarios R Nt1 U"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ventas_usuarios_r_nt1_u}
                ></input>
              </div>
            </div>
            {formik.touched.ventas_usuarios_r_nt1_u &&
            formik.errors.ventas_usuarios_r_nt1_u ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.ventas_usuarios_r_nt1_u}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label
                htmlFor="ventas_usuarios_r_nt2"
                className="col-sm-7 col-form-label"
              >
                Ventas Usuarios R Nt2
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="ventas_usuarios_r_nt2"
                  placeholder="Ventas Usuarios R Nt2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ventas_usuarios_r_nt2}
                ></input>
              </div>
            </div>
            {formik.touched.ventas_usuarios_r_nt2 &&
            formik.errors.ventas_usuarios_r_nt2 ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.ventas_usuarios_r_nt2}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label
                htmlFor="ventas_usuarios_r_nt3"
                className="col-sm-7 col-form-label"
              >
                Ventas Usuarios R Nt3
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="ventas_usuarios_r_nt3"
                  placeholder="Ventas Usuarios R Nt3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ventas_usuarios_r_nt3}
                ></input>
              </div>
            </div>
            {formik.touched.ventas_usuarios_r_nt3 &&
            formik.errors.ventas_usuarios_r_nt3 ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.ventas_usuarios_r_nt3}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label
                htmlFor="ventas_usuarios_nr_kwh"
                className="col-sm-7 col-form-label"
              >
                Ventas Usuarios NR Kwh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="ventas_usuarios_nr_kwh"
                  placeholder="Ventas Usuarios Nr Kwh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ventas_usuarios_nr_kwh}
                ></input>
              </div>
            </div>
            {formik.touched.ventas_usuarios_nr_kwh &&
            formik.errors.ventas_usuarios_nr_kwh ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.ventas_usuarios_nr_kwh}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label htmlFor="pui_cop_kwh" className="col-sm-7 col-form-label">
                PUI Cop Kwh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="pui_cop_kwh"
                  placeholder="PUI Cop Kwh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pui_cop_kwh}
                ></input>
              </div>
            </div>
            {formik.touched.pui_cop_kwh && formik.errors.pui_cop_kwh ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.pui_cop_kwh}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label htmlFor="vsne_kwh" className="col-sm-7 col-form-label">
                VSNE Kwh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="vsne_kwh"
                  placeholder="VSNE Kwh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.vsne_kwh}
                ></input>
              </div>
            </div>
            {formik.touched.vsne_kwh && formik.errors.vsne_kwh ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.vsne_kwh}</p>
              </div>
            ) : null}
            <div className="form-group row">
              <label htmlFor="vnu_kwh" className="col-sm-7 col-form-label">
                VNU Kwh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="vnu_kwh"
                  placeholder="VNU Kwh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.vnu_kwh}
                ></input>
              </div>
            </div>
            {formik.touched.vnu_kwh && formik.errors.vnu_kwh ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.vnu_kwh}</p>
              </div>
            ) : null}

            <div className="form-group row">
              <label htmlFor="vae_kwh" className="col-sm-7 col-form-label">
                VAE Kwh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="vae_kwh"
                  placeholder="VAE Kwh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.vae_kwh}
                ></input>
              </div>
            </div>
            {formik.touched.vae_kwh && formik.errors.vae_kwh ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.vae_kwh}</p>
              </div>
            ) : null}

            <div className="form-group row">
              <label htmlFor="g_exc1" className="col-sm-7 col-form-label">
                GExc1 Kwh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="g_exc1"
                  placeholder="GExc1 Kwh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.g_exc1}
                ></input>
              </div>
            </div>
            {formik.touched.g_exc1 && formik.errors.g_exc1 ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.g_exc1}</p>
              </div>
            ) : null}

            <div className="form-group row">
              <label htmlFor="g_exc1_21" className="col-sm-7 col-form-label">
                GExc1_21 kWh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="g_exc1_21"
                  placeholder="GExc1_21 kWh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.g_exc1_21}
                ></input>
              </div>
            </div>
            {formik.touched.g_exc1_21 && formik.errors.g_exc1_21 ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.g_exc1_21}</p>
              </div>
            ) : null}

            <div className="form-group row">
              <label htmlFor="g_exc2" className="col-sm-7 col-form-label">
                GExc2 kWh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="g_exc2"
                  placeholder="GExc2 kWh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.g_exc2}
                ></input>
              </div>
            </div>
            {formik.touched.g_exc2 && formik.errors.g_exc2 ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.g_exc2}</p>
              </div>
            ) : null}

            <div className="form-group row">
              <label htmlFor="g_exc3" className="col-sm-7 col-form-label">
                GExc3 Kwh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="g_exc3"
                  placeholder="GExc3 Kwh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.g_exc3}
                ></input>
              </div>
            </div>
            {formik.touched.g_exc3 && formik.errors.g_exc3 ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.g_exc3}</p>
              </div>
            ) : null}

            <div className="form-group row">
              <label htmlFor="ggd" className="col-sm-7 col-form-label">
                GGD Kwh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="ggd"
                  placeholder="GGD Kwh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ggd}
                ></input>
              </div>
            </div>
            {formik.touched.ggd && formik.errors.ggd ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.ggd}</p>
              </div>
            ) : null}

<div className="form-group row">
              <label htmlFor="cot" className="col-sm-7 col-form-label">
                COT NT1 cop/Kwh
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  id="cot"
                  placeholder="cot cop-Kwh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cot}
                ></input>
              </div>
            </div>
            {formik.touched.cot && formik.errors.cot ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.cot}</p>
              </div>
            ) : null}

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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default NuevoDataempresa;
