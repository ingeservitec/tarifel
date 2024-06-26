import { React, useState, useContext, useEffect, Children } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "font-awesome/css/font-awesome.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { convertirExcelIPC } from "../funciones/convertirExcel.js";
import { convertirExcelIPP } from "../funciones/convertirExcel";
import {convertirExcelIPPAnexos} from "../funciones/convertirExcel";
import { convertirAFAC } from "../funciones/convertirExcel";
import { convertirDSPCTTOS } from "../funciones/convertirExcel";
import { convertirTRSM } from "../funciones/convertirExcel";
import { convertirTSERV } from "../funciones/convertirExcel";
import { convertirSTN } from "../funciones/convertirExcel";
import { convertirSTR } from "../funciones/convertirExcel";
import { convertirSDL } from "../funciones/convertirExcel";
import { convertirCPROG } from "../funciones/convertirExcel";
import { convertirFACTORESIPR } from "../funciones/convertirExcel";
import { convertirBanRepTco } from "../funciones/convertirExcel";
import { convertirBanRepTcap } from "../funciones/convertirExcel";

import Dropzone from "react-dropzone";
import { UPLOAD_FILE } from "../data";
import Compressor from "compressorjs";
import EntidadContext from "../context/entidad/EntidadContext.js";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import styles
import dynamic from "next/dynamic";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
    ["undo", "redo"], // Add undo and redo in the toolbar
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const AddData = ({
  show,
  close,
  mutation,
  subMutation,
  inputFields,
  cacheField,
  tituloTabla,
  linkEjemplo,
  ComponenteVistaPrevia,
  vistaPrevia,
  queryColumnsResults,
  manual,
  masivo,
}) => {
  
  const [files, setFiles] = useState([]);
  const [option, setOption] = useState(manual === false ? "Masivo" : "Manual");
  const [imagenCliente, setImagenCliente] = useState("");
  const [folder, setFolder] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [anho, setAnho] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [dataArrayMasivo, setDataArrayMasivo] = useState(false);
  // Estado para manejar la apertura/cierre del modal
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  // Estado para guardar la información del campo seleccionado
  const [selectedField, setSelectedField] = useState({});
  const [progress, setProgress] = useState(0);
  const [contact, setContact] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [activeField, setActiveField] = useState("");
  const entidad = { sigla: "EGVC", id: "EGVC" };
  const [createAccount] = useMutation(UPLOAD_FILE);
  const getMasivoFields = () => {
    return inputFields.filter((field) => field.showInFormMasivo);
  };

  const [validationSchema, setValidationSchema] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const updateProgress = (value) => {
    setProgress(value);
  };
  // Función para manejar la apertura del modal y guardar la información del campo seleccionado
  const handleShowModal = (field) => {
    setSelectedField(field);
    setShowModal2(true);
  };

  function generarReporteExcel(registrosGuardados, registrosConError) {
    const workbook = XLSX.utils.book_new();
    const worksheet1 = XLSX.utils.json_to_sheet(registrosGuardados);
    const worksheet2 = XLSX.utils.json_to_sheet(registrosConError);
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Registros guardados");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Registros con errores");
    XLSX.writeFile(workbook, "Log_Errores.xlsx");
  }

  const [newData] = useMutation(mutation, {
    update: (cache, { data }) => {
      if (data[subMutation]) {
        const addedObjects = Array.isArray(data[subMutation].datos)
          ? data[subMutation].datos
          : [data[subMutation].datos];
        cache.modify({
          fields: {
            [cacheField]: (existingFieldData = {}) => {
              // Asegúrate de que existingObjects.records sea siempre tratado como un arreglo.
              const existingObjects = Array.isArray(existingFieldData.records)
                ? existingFieldData.records
                : [];

              // Combina los objetos existentes con los nuevos.
              let updatedObjects = [...existingObjects, ...addedObjects];

              // Ordena los objetos de mayor a menor año y mes, manejando la posibilidad de que no existan
              updatedObjects = updatedObjects.sort((a, b) => {
                const yearA = a.anho || 0; // Asume 0 si 'anho' no existe
                const yearB = b.anho || 0; // Asume 0 si 'anho' no existe
                const monthA = a.mes || 0; // Asume 0 si 'mes' no existe
                const monthB = b.mes || 0; // Asume 0 si 'mes' no existe

                const yearComparison = yearB - yearA;
                if (yearComparison !== 0) return yearComparison;
                return monthB - monthA;
              });

              // Devuelve el objeto actualizado con los nuevos registros en 'records'.
              return { ...existingFieldData, records: updatedObjects };
            },
          },
        });
      }
    },
  });

  Yup.setLocale({
    mixed: {
      required: "El campo es requerido",
    },
  });

  const formik1 = useFormik({
    initialValues: inputFields.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.field]: curr.defaultValue !== undefined ? curr.defaultValue : "",
      }),
      {}
    ),
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        Swal.fire({
          title: "Procesando...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        if (imagenCliente != "") {
          var {
            data: { singleUpload },
          } = await createAccount({
            variables: {
              file: imagenCliente,
              folder: folder,
            },
          });
          values.link = singleUpload.url;
        }

        const { id, creador, empresa_id, Eliminar, usuario_id, ...newValues } =
          values;

        const updatedValues = {};

        inputFields.map((field) => {
          if (newValues[field.field] === "") {
            updatedValues[field.field] = null;
          } else {
            updatedValues[field.field] = newValues[field.field];
          }
          if (field.type === "number") {
            updatedValues[field.field] = parseFloat(newValues[field.field]);
          }
        });
        delete updatedValues[""];

        const data = await newData({
          variables: {
            input: updatedValues,
          },
        });


        if (data.data[subMutation].errores.length > 0) {
          Swal.fire(
            "¡Atención!",
            `${data.data[subMutation].errores[0].mensaje}`,
            "warning"
          );
          generarReporteExcel(
            data.data[subMutation].datos,
            data.data[subMutation].errores
          );
        } else {
          Swal.fire({
            icon: "success",
            title: "Los datos han sido guardados!",
            showConfirmButton: true,
            timer: 2000,
          });
        }

        close();
      } catch (error) {
        console.log({ error });
        Swal.fire("Huy", "Revisa los datos cargados!" + error, "error");
      }
    },
  });

  useEffect(() => {
    const newValidationSchema = Yup.object().shape(
      inputFields
        .filter((field) => field.showInForm)
        .reduce((acc, curr) => {
          if (curr.hideWhen && curr.hideWhen(formik1.values)) {
            return acc;
          }
          if (curr.required && curr.validations) {
            return {
              ...acc,
              [curr.field]: curr.validations.required(),
            };
          } else if (curr.validations) {
            return { ...acc, [curr.field]: curr.validations };
          }
          return acc;
        }, {})
    );
    setValidationSchema(newValidationSchema);
  }, [formik1.values]);
  const formik2 = useFormik({
    initialValues: inputFields.reduce(
      (acc, curr) => ({ ...acc, [curr.field]: "" }),
      {}
    ),
    enableReinitialize: true,
    validationSchema,
    onSubmit: async () => {
      handleFileData();
    },
  });

  useEffect(() => {
    const newValidationSchema = Yup.object().shape(
      inputFields
        .filter((field) => field.showInFormMasivo)
        .reduce((acc, curr) => {
          if (curr.hideWhen && curr.hideWhen(formik2.values)) {
            return acc;
          }
          if (curr.required && curr.validations) {
            return {
              ...acc,
              [curr.field]: curr.validations.required(),
            };
          } else if (curr.validations) {
            return { ...acc, [curr.field]: curr.validations };
          }
          return acc;
        }, {})
    );
    setValidationSchema(newValidationSchema);
  }, [formik2.values]);
  const handleFileUpload = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    // accept: ".csv, .xlsx, .xls",x
    onDrop: handleFileUpload,
  });

  const createDataArray = async (
    files,
    entidad,
    subMutation,
    anho,
    inputFields
  ) => {
    let dataArray = [];
    let sheetData;
    let dataArray2 = [];
    const promises = files.map((file) => {
      const reader = new FileReader();
      const promise = new Promise((resolve) => {
        if (
          file.type === "application/vnd.ms-excel" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsText(file, "UTF-8");
        }

        reader.onload = async (e) => {
          if (
            file.type === "application/vnd.ms-excel" ||
            file.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            // archivo Excel
            const wb = XLSX.read(e.target.result, {
              type: "binary",
              codepage: 65001,
            });
            let ws = wb.Sheets[wb.SheetNames[0]];
            sheetData = XLSX.utils.sheet_to_json(ws, {
              header: 1,
              defval: "",
              raw: false,
              blankrows: true,
            });

            let day, month, regex, match;

            switch (subMutation) {
              // case "nuevoData_dane_ipp":
              //   dataArray2 = convertirExcelIPP(sheetData);
              //   break;

              case "nuevoData_dane_ipp":
            
              wb.SheetNames.forEach(function (sheetName) {
           
                
                if (sheetName === "2.1") { // Añade esta condición para verificar el nombre de la hoja
                  ws = wb.Sheets[sheetName];
                  let sheetData = XLSX.utils.sheet_to_json(ws, {
                    header: 1,
                    defval: "",
                    raw: false,
                    blankrows: true,
                  });
                
                  dataArray2 = convertirExcelIPPAnexos(sheetData);
                }
              });
            
              break;
              case "nuevoData_dane_ipc":
                dataArray2 = convertirExcelIPC(sheetData);
                break;
              case "nuevoData_xm_afac":
                let codXm;
                switch (entidad.sigla) {
                  case "EG":
                    codXm = "EGVC";
                    break;
                  default:
                    codXm = "EGVC";
                    break;
                }
                month = parseInt(
                  file.name.substring(
                    file.name.length - 6,
                    file.name.length - 4
                  )
                );
                dataArray2 = convertirAFAC(sheetData, codXm, month);

                break;
              case "nuevoData_xm_dspctto":
                month = parseInt(
                  file.name.substring(
                    file.name.length - 6,
                    file.name.length - 4
                  )
                );
                day = parseInt(
                  file.name.substring(
                    file.name.length - 8,
                    file.name.length - 6
                  )
                );

                dataArray2 = convertirDSPCTTOS(sheetData, day, month);
                break;
              case "nuevoData_xm_trsm":
                month = parseInt(
                  file.name.substring(
                    file.name.length - 6,
                    file.name.length - 4
                  )
                );
                
                dataArray2 = convertirTRSM(sheetData, month);
                break;
              case "nuevoDataXmTserv":
                switch (entidad.sigla) {
                  case "EG":
                    codXm = "EGVC";
                    break;
                  default:
                    codXm = "EGVC";
                    break;
                }
                month = parseInt(
                  file.name.substring(
                    file.name.length - 6,
                    file.name.length - 4
                  )
                );

                dataArray2 = convertirTSERV(sheetData, codXm, month);
                break;
              case "nuevoData_xm_stn":
                let regex = /\((\d{4}-\d{2})\)/; // regex para capturar (YYYY-MM)
                let match = file.name.match(regex);

                let dateParts = match[1].split("-"); // divide el resultado en partes
                var dataArray2 = [{}];

                dataArray2[0].anho = parseInt(dateParts[0]);
                dataArray2[0].mes = parseInt(dateParts[1]);

                wb.SheetNames.forEach(function (sheetName) {
                  ws = wb.Sheets[sheetName];
                  let sheetData = XLSX.utils.sheet_to_json(ws, {
                    header: 1,
                    defval: "",
                    raw: false,
                    blankrows: true,
                  });

                  convertirSTN(sheetName, sheetData, dataArray2);
                });

                break;
              case "nuevoData_xm_str":
                var dataArray2 = [{}];

                dataArray2[0].anho = parseInt(
                  file.name.match(/\((\d{4}-\d{2})\)/)[1].split("-")[0]
                );
                dataArray2[0].mes = parseInt(
                  file.name.match(/\((\d{4}-\d{2})\)/)[1].split("-")[1]
                );

                wb.SheetNames.forEach(function (sheetName) {
                  ws = wb.Sheets[sheetName];
                  let sheetData = XLSX.utils.sheet_to_json(ws, {
                    header: 1,
                    defval: "",
                    raw: false,
                    blankrows: true,
                  });

                  convertirSTR(sheetName, sheetData, dataArray2);
                });

                break;

              case "nuevoDataXmD015":
                // Expresión regular para extraer el año y el mes
                var regex2 = /_(\d{4})(\d{2})\.xlsx$/;
                const coincidencias = file.name.match(regex2);
                var dataArray2 = [{}];
                if (coincidencias) {
                  dataArray2[0].anho = parseInt(coincidencias[1], 10);
                  dataArray2[0].mes = parseInt(coincidencias[2], 10);
                } else {
                  console.log("Formato de nombre de archivo no válido");
                }

                wb.SheetNames.forEach(function (sheetName) {
                  ws = wb.Sheets[sheetName];
                  let sheetData = XLSX.utils.sheet_to_json(ws, {
                    header: 1,
                    defval: "",
                    raw: false,
                    blankrows: true,
                  });

                  convertirSDL(sheetName, sheetData, dataArray2);
                });

                break;

              case "nuevoDataXmCprog":
            
                // Expresión regular para extraer el año y el mes
                var regex2 = /_(\d{4})(\d{2})\.xlsx$/;

                var dataArray2 = [{}];

                wb.SheetNames.forEach(function (sheetName) {
                  ws = wb.Sheets[sheetName];
                  let sheetData = XLSX.utils.sheet_to_json(ws, {
                    header: 1,
                    defval: "",
                    raw: false,
                    blankrows: true,
                  });

                  convertirCPROG(sheetName, sheetData, dataArray2);
                });
                break;
                case "nuevoDataBanrepublicaTco":
                
                  dataArray2 = convertirBanRepTco(sheetData);

                  break
                  case "nuevoDataBanrepublicaTcap":
                    console.log({sheetData})
                    dataArray2 = convertirBanRepTcap(sheetData);

                    break
              default:
                dataArray2 = sheetData.slice(1).map((row) =>
                  row.reduce(
                    (acc, curr, index) => ({
                      ...acc,
                      [sheetData[0][index]]: curr,
                    }),
                    {}
                  )
                );
                break;
            }
          } else {
            // archivo plano

            const firstLine = e.target.result.split("\n")[0];

            const delimiter = firstLine.includes(",") ? "," : ";";

            const rows = e.target.result.split("\n");

            const headers = rows[0]
              .split(delimiter)
              .map((header) => header.trim());

            const lastRowIndex = rows.length - 1;
            if (!rows[lastRowIndex].trim()) {
              rows.splice(lastRowIndex, 1);
            }
            sheetData = rows.slice(1).map((row) => {
              const cols = row.split(delimiter);
              return cols.reduce((obj, col, index) => {
                obj[headers[index]] = col;
                return obj;
              }, {});
            });

            let month, day;

            switch (subMutation) {
              // case "nuevoData_dane_ipp":
              //   dataArray2 = convertirExcelIPP(sheetData);
              //   break;
              case "nuevoData_dane_ipp":
            
              wb.SheetNames.forEach(function (sheetName) {
           
                
                if (sheetName === "2.1") { // Añade esta condición para verificar el nombre de la hoja
                  ws = wb.Sheets[sheetName];
                  let sheetData = XLSX.utils.sheet_to_json(ws, {
                    header: 1,
                    defval: "",
                    raw: false,
                    blankrows: true,
                  });
                
                  dataArray2 = convertirExcelIPPAnexos(sheetData);
                }
              });
            
              break;
              case "nuevoData_dane_ipc":
                dataArray2 = convertirExcelIPC(sheetData);
                break;
              case "nuevoData_xm_afac":
                let codXm;

                switch (entidad.sigla) {
                  case "EMSERPUCAR":
                    codXm = "EGVC"; //CTUALIZAR
                    break;
                  default:
                    codXm = "EGVC";
                    break;
                }
                month = parseInt(
                  file.name.substring(
                    file.name.length - 6,
                    file.name.length - 4
                  )
                );

                dataArray2 = convertirAFAC(sheetData, codXm, month);

                break;
              case "nuevoData_xm_dspctto":
                month = parseInt(
                  file.name.substring(
                    file.name.length - 6,
                    file.name.length - 4
                  )
                );
                day = parseInt(
                  file.name.substring(
                    file.name.length - 8,
                    file.name.length - 6
                  )
                );

                dataArray2 = convertirDSPCTTOS(sheetData, day, month);
                break;
              case "nuevoData_xm_trsm":
                month = parseInt(
                  file.name.substring(
                    file.name.length - 6,
                    file.name.length - 4
                  )
                );
                
                dataArray2 = convertirTRSM(sheetData, month);
                break;


              case "nuevoDataXmTserv":
                switch (entidad.sigla) {
                  case "EGVC":
                    codXm = "EGVC";
                    break;
                  default:
                    codXm = "EGVC";
                    break;
                }
                month = parseInt(
                  file.name.substring(
                    file.name.length - 6,
                    file.name.length - 4
                  )
                );
                

                dataArray2 = convertirTSERV(sheetData, codXm, month);
                break;
              case "nuevoDataXmIpr":
                switch (entidad.sigla) {
                  case "EGVC":
                    codXm = "GUVM";
                    break;
                  default:
                    codXm = "GUVM";
                    break;
                }
                // Extraer la fecha (YYYYMMDD)
                let fecha = file.name.match(/(\d{8})/)[0];

                // Extraer el año (YYYY)
                let year = parseInt(fecha.substring(0, 4));

                // Extraer el mes (MM)
                let month = parseInt(fecha.substring(4, 6));

                // Extraer el día (DD)
                let day = parseInt(fecha.substring(6, 8));

             
                dataArray2 = convertirFACTORESIPR(
                  sheetData,
                  codXm,
                  month,
                  year
                );
                break;
                case "nuevoDataBanrepublicaTco":
                  console.log({sheetData})
                  dataArray2 = convertirBanRepTco(sheetData);

                  break
              default:
                // dataArray2 = sheetData.slice(1).map((row) =>
                //   row.reduce(
                //     (acc, curr, index) => ({
                //       ...acc,
                //       [sheetData[0][index]]: curr,
                //     }),
                //     {}
                //   )
                // );

                dataArray2 = sheetData;
                break;
            }

            // dataArray2 = sheetData;
          }

          let nestedArrayObjeto = [];
try{
  
          dataArray2 = dataArray2.filter((row) => {
            const hasNestedArray = Object.values(row).some(
              (value) => Array.isArray(value) && value.length > 0
            );
            if (hasNestedArray) {
              nestedArrayObjeto = row;
              return false; // Eliminar el objeto del array
            }
            return true; // Mantener el objeto en el array
          });
      
          dataArray2.forEach((data) => {
            const newData = {};

            inputFields.forEach((field) => {
              if (
                field.name != "Id" &&
                field.name != "Creador" &&
                field.name != "Empresa_id" &&
                field.name != "empresa id" &&
                field.name != "Usuario id"
              ) {
                const value = data[field.name];

                if (field.type === "number") {
                  newData[field.field] = value
                    ? parseFloat(value.toString().replace(/,/g, ""))
                    : null;
                } else if (field.type === "text" || field.type === "date") {
                  data[field.name];
                  newData[field.field] = value ? value.toString() : null;
                }
              }
              if (field.name === "empresa id") {
                newData[field.field] = entidad.id;
              }
            });
            dataArray.push(newData);
          });
        }
        catch{
          if (subMutation === "nuevoData_dane_ipp") {
            Swal.fire(
              "Error en el archivo",
              `El archivo cargado no coincide con el formato requerido. Recuerde que se debe cargar el archivo Anexo IPP, para poder obtener el IPP proyectado de acuerdo con los últimos conceptos CREG. Puede descargar el archivo desde <a href="https://www.dane.gov.co/files/operaciones/IPP/anex-IPP-may2024.xlsx" target="_blank">aquí</a>.`,
              "error"
            );
          } else {
            Swal.fire(
              "Error en el archivo",
              "El archivo cargado no coincide con el formato requerido. Por favor, revisa el archivo y vuelve a intentarlo.",
              "error"
            );
          }
        }

          if (Object.keys(nestedArrayObjeto).length > 0) {
            dataArray.push(nestedArrayObjeto);
          }

          resolve();
        };
      });

      return promise;
    });

    // Espera a que se completen todas las promesas

    await Promise.all(promises);

    if (anho) {
      for (let i = 0; i < dataArray.length; i++) {
        dataArray[i].anho = parseInt(anho);
      }
    }
    // Agregar propiedades de getMasivoFields
    const masivoFields = getMasivoFields();
    for (let i = 0; i < dataArray.length; i++) {
      masivoFields.forEach((field) => {
        if (formik2.values[field.field]) {
          // Si el tipo de campo es 'number', convierte el valor a número
          if (field.type === "number") {
            dataArray[i][field.field] = parseFloat(formik2.values[field.field]);
          } else {
            dataArray[i][field.field] = formik2.values[field.field];
          }
        }
      });
    }

    return dataArray;
  };

  const handleFileData = async () => {
    if (!files.length)
      return Swal.fire("Huy", "Aún no has cargado información!", "error");
    try {
      Swal.fire({
        title: "Procesando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      var dataArray = [];

      dataArray = await createDataArray(
        files,
        entidad,
        subMutation,
        anho,
        inputFields
      );

      // Ejecuta la mutación con el array de datos completo
      let results = [];
      let paquetesEnviados = 0;
      let resultsDatosErrores = [];
      let sizePaquetes = Math.ceil(dataArray.length / 10);
      let totalPaquetes = dataArray.length / sizePaquetes;

      for (let i = 0; i < dataArray.length; i += sizePaquetes) {
        let paquete = dataArray.slice(i, i + sizePaquetes);
        const data = await newData({
          variables: {
            input: paquete,
          },
        });

        paquetesEnviados++;
        if ((paquetesEnviados / totalPaquetes) * 100 <= 100) {
          updateProgress(((paquetesEnviados / totalPaquetes) * 100).toFixed(2));
        } else {
          updateProgress(100);
        }

        if (subMutation != "nuevoData_crm_facturacion") {
          results = [...results, ...data.data[subMutation].datos];

          if (data.data[subMutation].errores.length > 0) {
            resultsDatosErrores = [
              ...resultsDatosErrores,
              ...data.data[subMutation].errores.map((error) => {
                return {
                  mensaje: error.mensaje,
                  tipo: error.tipo,
                  ...error.registrosErrores,
                };
              }),
            ];
          }
        } else {
          results = [...results, ...data.data[subMutation]];
        }
      }
      if (resultsDatosErrores.length > 0) {
        Swal.fire(
          "¡Atención!",
          `Existen (${resultsDatosErrores.length}) registros con errores y (${results.length}) registros exitosos. Revisa el reporte descargado para más información.`,
          "warning"
        );
        generarReporteExcel(results, resultsDatosErrores);
      } else {
        Swal.fire(
          "Buen trabajo!",
          `(${results.length}) registros han sido guardados!`,
          "success"
        );
        generarReporteExcel(results, []);
      }

      close();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error. Por favor intenta de nuevo.",
        showConfirmButton: false,
        timer: 2000,
      });
      console.error(error);
    }
  };

  const eliminarImagen = () => {
    setPreviewUrl(null);
  };

  const handleDrop = (field, files) => {
    const [file] = files;

    // verifica si el archivo es una imagen antes de comprimirlo
    if (file.type.startsWith("image/")) {
      new Compressor(file, {
        convertSize: 50000,
        quality: 0.5,
        success: (compressedResult) => {
          setImagenCliente(compressedResult);
          setFolder(field.folder);
          setPreviewUrl(URL.createObjectURL(compressedResult));
        },
      });
    } else {
      setImagenCliente(file);
      setFolder(field.folder);
    }
  };

  const handleVistaPrevia = async () => {
    if (option === "Manual") {
      // Validar si todos los campos obligatorios están seleccionados en el formik
      if (
        Object.keys(formik1.errors).length === 0 &&
        formik1.values.Id !== ""
      ) {
        setShowPreview(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Para vista previa se deben diligenciar todos los campos obligatorios",
        });
      }
    } else {
      // Validar si se ha cargado algún archivo antes de generar vista previa
      if (files.length > 0) {
        var dataArray = await createDataArray(
          files,
          entidad,
          subMutation,
          anho,
          inputFields
        );

        // Verifica si filteredData está vacío o si todos sus elementos tienen propiedades nulas o vacías.
        const isEmptyOrNull = dataArray.every((item) => {
          return Object.values(item).every(
            (value) => value === null || value === ""
          );
        });

        if (isEmptyOrNull) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El archivo no fue correctamente importado. Revisa el ejemplo de cargue y asegurate de que los titulos en los encabezados coincidan",
          });
        } else {
          setDataArrayMasivo(dataArray);
          setShowPreview(true);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Para vista previa se deben cargar archivos primero",
        });
      }
    }
  };
  const handleVolver = () => {
    setShowPreview(false);
  };

  const handleContactChange = (
    e,
    campoListQuery,
    queryListKey,
    campoListQueryAdditional
  ) => {
    setContact(e.target.value);
    if (e.target.value === "") {
      setFilteredContacts([]);
    } else {
      const results = queryColumnsResults[queryListKey].filter((contact) =>
        (contact[campoListQuery] + " " + contact[campoListQueryAdditional])
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      if (results.length === 0) {
        setFilteredContacts(["Agregar"]);
      } else {
        setFilteredContacts(results);
      }
    }
  };

  const handleChange = (e, field) => {
    // Primero, maneja el cambio de Formik
    formik1.handleChange(e);
    if (field.campoListQuery) {
      handleContactChange(
        e,
        field.campoListQuery,
        field.queryListKey,
        field.campoListQueryAdditional
      );
    }
    // Luego, maneja el cambio del contacto
  };
  const selectContact = (contact, campoListQuery, fieldName) => {
    if (contact === "Agregar") {
      setShowModal(true);
    } else {
      // Actualiza el valor de entrada correspondiente en Formik
      formik1.setFieldValue(fieldName, contact[campoListQuery]);
      setContact(contact);
      setFilteredContacts([]);
    }
  };

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="myModal"
        onHide={close}
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar datos a tabla {tituloTabla}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-center py-4">
            <div className="inline-flex rounded-md shadow ">
              {(manual === undefined || manual === true) && (
                <button
                  className={`${
                    option === "Manual"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  } rounded-l-md flex-1 items-center justify-center px-4 py-2 text-sm font-medium focus:outline-none`}
                  onClick={() => setOption("Manual")}
                >
                  Manual
                </button>
              )}

              {(masivo === undefined || masivo === true) && (
                <button
                  className={`${
                    option === "Masivo"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  } rounded-r-md flex-1 items-center justify-center px-4 py-2 text-sm font-medium focus:outline-none rounded-none`}
                  onClick={() => setOption("Masivo")}
                >
                  Masivo
                </button>
              )}
            </div>
          </div>

          {option === "Manual" ? (
            <form onSubmit={formik1.handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                {inputFields
                  .filter((field) => {
                    // Si el campo tiene una función 'hideWhen' y esta función devuelve 'true', no mostramos el campo
                    if (
                      (field.hideWhen && field.hideWhen(formik1.values)) ||
                      (field.showIf && !field.showIf(formik1.values))
                    ) {
                      return false;
                    }
                    // Para todos los demás casos, usamos la condición original
                    return field.showInForm && field.name !== "Id";
                  })
                  .map((field) =>
                    field.clase === "select" ? (
                      <div
                        key={field.field}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                      >
                        <label
                          htmlFor={field.field}
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                          {field.name}
                        </label>
                        <div className="relative">
                          <select
                            type={field.type}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id={field.field}
                            name={field.field}
                            placeholder={field.name}
                            onChange={(e) => {
                              const value = e.target.value;
                              formik1.setFieldValue(field.field, value);
                            }}
                            onBlur={formik1.handleBlur}
                            value={formik1.values[field.field]}
                          >
                            <option value="">Seleccione una opción</option>
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <Button
                            type="button"
                            variant="link"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2"
                            onClick={() => handleShowModal(field)}
                          >
                            <i className="fa fa-info-circle mr-2 white"></i>
                          </Button>
                        </div>
                        {formik1.touched[field.field] &&
                        formik1.errors[field.field] ? (
                          <p className="text-red-500 text-xs italic">
                            {formik1.errors[field.field]}
                          </p>
                        ) : null}
                      </div>
                    ) : field.clase === "file" ? (
                      <div className=" mx-auto py-4">
                        {!previewUrl && (
                          <Dropzone
                            onDrop={(files) => handleDrop(field, files)}
                            multiple={false}
                          >
                            {({
                              getRootProps,
                              getInputProps,
                              isDragActive,
                              acceptedFiles,
                            }) => (
                              <div
                                {...getRootProps({
                                  className: `dropzone border-dashed border-2 rounded-md p-4 flex items-center justify-center ${
                                    isDragActive
                                      ? "border-blue-500 bg-blue-100"
                                      : "border-gray-300"
                                  }`,
                                })}
                              >
                                <input {...getInputProps()} />
                                {!isDragActive && (
                                  <p className="text-center text-gray-500">
                                    {acceptedFiles.length == 0
                                      ? field.msjBoton
                                      : null}
                                  </p>
                                )}
                                {/* si el archivo es una imagen, muestra la previsualización */}
                                {acceptedFiles.length > 0 &&
                                  acceptedFiles[0].type.startsWith(
                                    "image/"
                                  ) && (
                                    <img
                                      src={URL.createObjectURL(
                                        acceptedFiles[0]
                                      )}
                                      alt="preview"
                                    />
                                  )}
                                {/* si el archivo es un PDF, muestra un mensaje */}
                                {acceptedFiles.length > 0 &&
                                  acceptedFiles[0].type ===
                                    "application/pdf" && (
                                    <p>
                                      Se ha cargado un archivo PDF:{" "}
                                      {acceptedFiles[0].name}
                                    </p>
                                  )}
                              </div>
                            )}
                          </Dropzone>
                        )}
                        {previewUrl && (
                          <div className="relative">
                            <img
                              src={previewUrl}
                              alt="Vista previa"
                              className="mt-4 rounded-md shadow-md"
                            />
                            <button
                              type="button"
                              onClick={eliminarImagen}
                              className="absolute top-0 right-0 bg-red-400 text-white p-2 rounded-bl-md hover:bg-red-600 text-xs"
                            >
                              Eliminar
                            </button>
                          </div>
                        )}
                      </div>
                    ) : field.clase === "telefono" ? (
                      <div
                        key={field.field}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                      >
                        <label
                          htmlFor={field.field}
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                          {field.name}
                        </label>
                        <div className="relative">
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={formik1.values[field.field]}
                            onChange={(value) =>
                              formik1.setFieldValue(field.field, value)
                            }
                            onBlur={() => formik1.setFieldTouched(field.field)}
                            id={field.field}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          />
                          <Button
                            type="button"
                            variant="link"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2"
                            onClick={() => handleShowModal(field)}
                          >
                            <i className="fa fa-info-circle mr-2 white"></i>
                          </Button>
                        </div>
                        {formik1.touched[field.field] &&
                        formik1.errors[field.field] ? (
                          <p className="text-red-500 text-xs italic">
                            {formik1.errors[field.field]}
                          </p>
                        ) : null}
                      </div>
                    ) : field.clase === "texto" ? (
                      <div
                        key={field.field}
                        className="w-full px-3 mb-6 md:mb-0"
                      >
                        <label
                          htmlFor={field.field}
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                          {field.name}
                        </label>
                        <div className="relative">
                          {ReactQuill && (
                            <ReactQuill
                              value={formik1.values[field.field]}
                              onChange={(value) =>
                                formik1.setFieldValue(field.field, value)
                              }
                              modules={modules}
                            />
                          )}
                          <Button
                            type="button"
                            variant="link"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2"
                            onClick={() => handleShowModal(field)}
                          >
                            <i className="fa fa-info-circle mr-2 white"></i>
                          </Button>
                        </div>
                        {formik1.touched[field.field] &&
                        formik1.errors[field.field] ? (
                          <p className="text-red-500 text-xs italic">
                            {formik1.errors[field.field]}
                          </p>
                        ) : null}
                      </div>
                    ) : (
                      <div
                        key={field.field}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                      >
                        <label
                          htmlFor={field.field}
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                          {field.name}
                        </label>
                        <div className="relative">
                          <input
                            type={field.type}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id={field.field}
                            name={field.field}
                            placeholder={field.name}
                            onChange={(e) => handleChange(e, field)}
                            onBlur={formik1.handleBlur}
                            value={formik1.values[field.field]}
                            onFocus={() => setActiveField(field.field)}
                          />
                          {filteredContacts.length > 0 && (
                            <ListGroup
                              style={{
                                minWidth: `${Math.max(
                                  ...filteredContacts.map(
                                    (contact) =>
                                      contact[field.campoListQuery]?.length || 0
                                  )
                                )}ch`,
                                position: "absolute",
                                zIndex: 1000,
                                textAlign: "left", // Aquí
                              }}
                            >
                              {filteredContacts.map(
                                (contact, index) =>
                                  contact && contact[field.campoListQuery] ? (
                                    <ListGroup.Item
                                      key={index}
                                      action
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        selectContact(
                                          contact,
                                          field.saveFieldValue, // Aquí utilizas saveFieldValue
                                          field.field
                                        );
                                      }}
                                      style={{
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {`${contact[field.campoListQuery]}${
                                        contact[field.campoListQueryAdditional]
                                          ? "-" +
                                            contact[
                                              field.campoListQueryAdditional
                                            ]
                                          : ""
                                      }`}{" "}
                                      {/* Aquí muestras los dos campos */}
                                    </ListGroup.Item>
                                  ) : null // No renderizar el elemento si no se cumple la condición
                              )}
                            </ListGroup>
                          )}

                          {activeField === field.field &&
                            filteredContacts.length > 0 &&
                            filteredContacts.includes("Agregar") && (
                              <ListGroup
                                style={{
                                  minWidth: `${Math.max(
                                    ...filteredContacts.map(
                                      (contact) =>
                                        contact[field.campoListQuery]?.length ||
                                        0
                                    )
                                  )}ch`,
                                  position: "absolute",
                                  zIndex: 1000,
                                }}
                              >
                                <ListGroup.Item
                                  key="AgregarContacto"
                                  action
                                  onClick={(e) => {
                                    e.preventDefault();
                                    selectContact("Agregar");
                                  }}
                                  style={{ whiteSpace: "nowrap" }}
                                >
                                  Agregar
                                </ListGroup.Item>
                              </ListGroup>
                            )}

                          {field.modal &&
                            filteredContacts.length > 0 &&
                            filteredContacts.includes("Agregar") && (
                              <div>
                                <AddData
                                  show={showModal}
                                  close={() => setShowModal(false)}
                                  mutation={field.modal}
                                  subMutation={field.subModal}
                                  inputFields={field.headersModal}
                                  cacheField={field.modalCache}
                                  // resto de las props aquí
                                />
                              </div>
                            )}

                          <Button
                            variant="link"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2"
                            onClick={() => handleShowModal(field)}
                          >
                            <i className="fa fa-info-circle mr-2 white"></i>
                          </Button>
                        </div>
                        {formik1.touched[field.field] &&
                        formik1.errors[field.field] ? (
                          <p className="text-red-500 text-xs italic">
                            {formik1.errors[field.field]}
                          </p>
                        ) : null}
                      </div>
                    )
                  )}
                <Modal show={showModal2} onHide={() => setShowModal2(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>{selectedField.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{selectedField.description}</Modal.Body>
                </Modal>
              </div>
              <div className="flex justify-end">
                {vistaPrevia ? (
                  <div>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-1"
                      onClick={handleVistaPrevia}
                    >
                      Vista Previa
                    </button>
                    <div>
                      {showPreview && (
                        <ComponenteVistaPrevia
                          onClose={handleVolver}
                          dataArray={formik1.values}
                        />
                      )}
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-1"
                >
                  Guardar
                </button>
              </div>
            </form>
          ) : (
            <div>
              <form onSubmit={formik2.handleSubmit}>
                <div style={{ fontSize: "0.8em" }}>
                  <button>
                    <a href={linkEjemplo}>
                      Descarga un ejemplo del archivo XLSX{" "}
                    </a>
                  </button>{" "}
                  para observar el formato de importación
                </div>
                <div className="card col-sm m-2">
                  <button
                    style={{ fontSize: "12px" }}
                    className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => (setFiles([]), setProgress(0))}
                  >
                    Limpiar archivos
                  </button>
                  <div className="App" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Arrastre algun archivo aqui o haga click para cargar</p>

                    <div>
                      <p className="font-italic h6 ">Archivos cargados:</p>
                      <ul>
                        {files.map((file) => (
                          <li key={file.name}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* {subMutation == "nuevoData_xm_afac" ||
                subMutation == "nuevoData_xm_dspctto" ||
                subMutation == "nuevoData_xm_trsm" ||
                subMutation == "nuevoDataempresaenergiageneradacnmzni" ? (
                  
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    placeholder="Año"
                    onChange={(e) => setAnho(e.target.value)}
                  />
                ) : null} */}

                  {getMasivoFields().map((field) => {
                    switch (field.clase) {
                      case "date":
                        return (
                          <div key={field.field}>
                            <label
                              htmlFor={field.field}
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                              {field.name}
                            </label>
                            <input
                              type="date"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id={field.field}
                              name={field.field}
                              onChange={formik2.handleChange}
                              onBlur={formik2.handleBlur}
                              value={formik2.values[field.field]}
                            />
                            {formik2.touched[field.field] &&
                            formik2.errors[field.field] ? (
                              <p className="text-red-500 text-xs italic">
                                {formik2.errors[field.field]}
                              </p>
                            ) : null}
                          </div>
                        );
                      case "select":
                        return (
                          <div key={field.field}>
                            <label
                              htmlFor={field.field}
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                              {field.name}
                            </label>
                            <select
                              type={field.type}
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id={field.field}
                              name={field.field}
                              placeholder={field.name}
                              onChange={(e) => {
                                const value = e.target.value;
                                formik2.setFieldValue(field.field, value);
                              }}
                              onBlur={formik2.handleBlur}
                              value={formik2.values[field.field]}
                            >
                              <option value="">Seleccione una opción</option>
                              {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {formik2.touched[field.field] &&
                            formik2.errors[field.field] ? (
                              <p className="text-red-500 text-xs italic">
                                {formik2.errors[field.field]}
                              </p>
                            ) : null}
                          </div>
                        );

                      case "file":
                        return (
                          <div className=" mx-auto">
                            {!previewUrl && (
                              <Dropzone
                                onDrop={(files) => handleDrop(field, files)}
                                multiple={false}
                              >
                                {({
                                  getRootProps,
                                  getInputProps,
                                  isDragActive,
                                  acceptedFiles,
                                }) => (
                                  <div
                                    {...getRootProps({
                                      className: `dropzone border-dashed border-2 rounded-md p-4 flex items-center justify-center ${
                                        isDragActive
                                          ? "border-blue-500 bg-blue-100"
                                          : "border-gray-300"
                                      }`,
                                    })}
                                  >
                                    <input {...getInputProps()} />
                                    {!isDragActive && (
                                      <p className="text-center text-gray-500">
                                        {acceptedFiles.length == 0
                                          ? field.msjBoton
                                          : null}
                                      </p>
                                    )}
                                    {/* si el archivo es una imagen, muestra la previsualización */}
                                    {acceptedFiles.length > 0 &&
                                      acceptedFiles[0].type.startsWith(
                                        "image/"
                                      ) && (
                                        <img
                                          src={URL.createObjectURL(
                                            acceptedFiles[0]
                                          )}
                                          alt="preview"
                                        />
                                      )}
                                    {/* si el archivo es un PDF, muestra un mensaje */}
                                    {acceptedFiles.length > 0 &&
                                      acceptedFiles[0].type ===
                                        "application/pdf" && (
                                        <p>
                                          Se ha cargado un archivo PDF:{" "}
                                          {acceptedFiles[0].name}
                                        </p>
                                      )}
                                  </div>
                                )}
                              </Dropzone>
                            )}
                            {previewUrl && (
                              <div className="relative">
                                <img
                                  src={previewUrl}
                                  alt="Vista previa"
                                  className="mt-4 rounded-md shadow-md"
                                />
                                <button
                                  onClick={eliminarImagen}
                                  className="absolute top-0 right-0 bg-red-400 text-white p-2 rounded-bl-md hover:bg-red-600 text-xs"
                                >
                                  Eliminar
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      default:
                        return (
                          <div key={field.field}>
                            <label
                              htmlFor={field.field}
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                              {field.name}
                            </label>
                            <input
                              type="text"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id={field.field}
                              name={field.field}
                              placeholder={field.name}
                              onChange={formik2.handleChange}
                              onBlur={formik2.handleBlur}
                              value={formik2.values[field.field]}
                            />
                            {formik2.touched[field.field] &&
                            formik2.errors[field.field] ? (
                              <p className="text-red-500 text-xs italic">
                                {formik2.errors[field.field]}
                              </p>
                            ) : null}
                          </div>
                        );
                    }
                  })}
                  <ProgressBar
                    now={progress}
                    label={`${progress}%`}
                    style={{ marginTop: "1rem" }}
                  />
                </div>
                <div className="flex justify-end">
                  {vistaPrevia ? (
                    <div>
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-1"
                        onClick={handleVistaPrevia}
                      >
                        Vista Previa
                      </button>
                      <div>
                        {showPreview && (
                          <ComponenteVistaPrevia
                            onClose={handleVolver}
                            dataArray={dataArrayMasivo}
                          />
                        )}
                      </div>
                    </div>
                  ) : null}

                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-1"
                    type="submit"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddData;
