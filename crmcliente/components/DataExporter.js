// ExportData.js
import React, { useContext, useState } from "react";
import { OBTENER_DATA_REPORTES_SUI_Formulario1SSPD } from "../data";
import { OBTENER_DATA_REPORTES_SUI_Formulario5SSPD } from "../data";
import { OBTENER_DATA_REPORTES_SUI_Formato2SSPD } from "../data";
import { OBTENER_DATA_REPORTES_SUI_Formato3SSPD } from "../data";

import { OBTENER_DATA_REPORTES_SUI_Formato6SSPD } from "../data";
import { OBTENER_DATA_REPORTES_SUI_Formato9SSPD } from "../data";
import { Button, message, Progress } from "antd";

// import { OBT
import { useLazyQuery } from "@apollo/client";
import { saveAs } from "file-saver";


const DataExporter = ({ checked, selectedStartPeriod, selectedEndPeriod }) => {
  const [progress, setProgress] = useState(0);

  const updateProgress = (value) => {
    setProgress(value);
  };
const empresa='EGVC'
  
  const [isDisabled, setIsDisabled] = useState(false);


  let checkMappings

    checkMappings = {
      "FORMATO T9. Variables Costo Unitario de Prestación del Servicio CU 119 – UR":
      {
        lazyQuery: useLazyQuery(OBTENER_DATA_REPORTES_SUI_Formato9SSPD),
        dataProperty: "obtenerDataFormato9SSPD",
      },
      "FORMATO T2. Garantías Financieras":  
      {
        lazyQuery: useLazyQuery(OBTENER_DATA_REPORTES_SUI_Formato2SSPD),
        dataProperty: "obtenerDataFormato2SSPD",
      },
      "FORMATO T3. Tarifas Publicadas":
      {
        lazyQuery: useLazyQuery(OBTENER_DATA_REPORTES_SUI_Formato3SSPD),
        dataProperty: "obtenerDataFormato3SSPD",
      },
     
      // "FORMULARIO T5. Aplicación de Opción Tarifaria":
      // {
      //   lazyQuery: useLazyQuery(OBTENER_DATA_REPORTES_SUI_Formulario5SSPD),
      //   dataProperty: "obtenerDataFormulario5SSPD",
      // },
      // "FORMATO T6. Opción Tarifaria168/2008":
      // {
      //   lazyQuery: useLazyQuery(OBTENER_DATA_REPORTES_SUI_Formato6SSPD),
      //   dataProperty: "obtenerDataFormato6SSPD",
      // },
      "FORMULARIO T1. Recuperación Costo Garantía":
      {
        lazyQuery: useLazyQuery(OBTENER_DATA_REPORTES_SUI_Formulario1SSPD),
        dataProperty: "obtenerDataFormulario1SSPD",
      },


    }


   


  const progresoPorArchivo = 100 / checked.length; // Esto divide 100% por el número de archivos
  const calcularProgresoArchivo = (currentPage, totalPagesPorArchivo) => {
    return currentPage / totalPagesPorArchivo * progresoPorArchivo;
  };
  const actualizarProgresoTotal = (currentExportStep, progresoActualArchivo) => {
  const progresoTotal = currentExportStep * progresoPorArchivo + progresoActualArchivo;
  updateProgress(progresoTotal);
};

  

  const handleExport = async () => {
    setIsDisabled(true);
    setProgress(0);
    if (checked.length === 0) {
      message.warning("Selecciona al menos un elemento antes de exportar.");
      setIsDisabled(false);
      return;
    }
    const totalExportSteps =
      checked.length; /* Cantidad de iteraciones en el bucle principal */
    let currentExportStep = 0;
    let noDataElements = [];
    const [startMonth, startYear] = selectedStartPeriod.split("-");
    const [endMonth, endYear] = selectedEndPeriod.split("-");

    let noDataMessage = "";
var filtradosPorNius
    for (let year = startYear; year <= endYear; year++) {
      let currentStartMonth = year === startYear ? startMonth : 1;
      let currentEndMonth = year === endYear ? endMonth : 12;

      for (let month = currentStartMonth; month <= currentEndMonth; month++) {
        const startDate = month.toString() + "-" + year.toString();

        for (const check of checked) {
          let page = 1;
          let totalPagesPorArchivo = 0; // Inicializa el total de páginas por archivo
          let allData = [];
          try {
            const { lazyQuery, dataProperty } = checkMappings[check];
            const mapping = checkMappings[check];

            const [loadDataFunction, { data, loading, error }] = lazyQuery;

            try {
              while (true) {
               
                try {
                  const result = await loadDataFunction({
                    variables: {
                      page: page,
                      limit: 1000, // Ajusta según tus necesidades
                      selectedStartPeriod: startDate,
                      selectedEndPeriod: startDate,
                    },
                  });
              
                  if (
                    result.data &&
                    result.data[mapping.dataProperty].registros
                  ) {


                    allData = [
                      ...allData,
                      ...result.data[mapping.dataProperty].registros,
                    ]; // Asegúrate de ajustar el nombre del query
                    if (page === 1) {
                      totalPagesPorArchivo =
                        result.data[mapping.dataProperty].totalPages;
                    }

                    const progresoActualArchivo = calcularProgresoArchivo(page, totalPagesPorArchivo);
                    actualizarProgresoTotal(currentExportStep, progresoActualArchivo);

                    

                    // Si la longitud de los datos es menor que el límite, has llegado al final
                    // Actualiza el progreso
                    // updateProgress(calcularProgreso(page, totalPagesPorArchivo, totalExportSteps, currentExportStep));
                    if (page >= totalPagesPorArchivo) {
                      break;
                    }

                    page++; // Incrementa la página para la próxima iteración
                  } else {
                    // Manejo si no hay más datos o si hay un error
                    break;
                  }
                } catch (error) {
                  console.error("Error al cargar datos:", error);
                  // Manejo de errores, posiblemente romper el bucle o mostrar un mensaje
                  break;
                }
              }



              const csvData = convertToCSV(allData);
              const blob = new Blob([csvData], {
                type: "text/csv;charset=utf-8",
              });

              saveAs(
                blob,
                `${empresa}_${check}-${year.toString()}-${month.toString()}.csv`
              );
            } catch (error) {
              console.error("Error al cargar datos:", error);
              noDataElements.push({
                check,
                year,
                month,
              });
              continue;
            }
            currentExportStep++;
          } catch {
            noDataMessage = `No se encontró la función de carga de datos para el check "${check}".`;
            continue;
          }
          currentExportStep++;
        }
      }
    }

    if (noDataMessage) {
      alert(noDataMessage);
    }

    // Mostrar mensaje de alerta para elementos sin datos
    if (noDataElements.length > 0) {
      const errorMessage = `No se encontraron datos para los siguientes elementos:\n${noDataElements
        .map(
          ({ check, year, month }) => `- ${check} (Año: ${year}, Mes: ${month})`
        )
        .join("\n")}`;
      message.error({
        content: errorMessage,
        duration: 3, // Hace que el mensaje no se desaparezca automáticamente
      });
    }

    // Reiniciar la barra de progreso
    updateProgress(0);
    setIsDisabled(false);
  };

  const convertToCSV = (data) => {
    const excludedColumns = [
      "__typename",
      "id",
      "creador",
      "empresa_id",
      "anho",
      "mes",
    ];

    const filteredKeys = Object.keys(data[0]).filter(
      (key) => !excludedColumns.includes(key)
    );

    const header = filteredKeys.join(",") + "\n";
    const rows = data.map((row) => {
      const values = filteredKeys.map((key) => row[key]);
      return values.join(",") + "\n";
    });
    return header + rows.join("");
  };

  return (
    <>
      <Button type="primary" onClick={handleExport} disabled={isDisabled}>
        <i className="fa fa-eye mr-2 white"></i>Exportar
      </Button>
      <Progress
        style={{ marginTop: "10px" }}
        percent={progress}
        status="active"
      />
    </>
  );
};

export default DataExporter;
