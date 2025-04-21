// ExportData.js
import React, { useContext, useState } from "react";
import { OBTENER_DATA_REPORTES_SUI_Formulario1SSPD } from "../data";
import { OBTENER_DATA_REPORTES_SUI_Formulario5SSPD } from "../data";
import { OBTENER_DATA_REPORTES_SUI_Formato2SSPD } from "../data";
import { OBTENER_DATA_REPORTES_SUI_Formato3SSPD } from "../data";

import { OBTENER_DATA_REPORTES_SUI_Formato6SSPD } from "../data";
import { OBTENER_DATA_REPORTES_SUI_Formato9SSPD } from "../data";
import { OBTENER_DATA_REPORTE_SSPD_CIRCULAR_CREG_119_2017 } from "../data";
import { OBTENER_DATA_FORMATO_7_SSPDS } from "../data";
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
      "FORMATO T7. Costo Unitario de Prestación del Servicio _CU 119 – UR":
      {
        lazyQuery: useLazyQuery(OBTENER_DATA_FORMATO_7_SSPDS),
        dataProperty: "obtenerDataFormato7SSPDs",
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
      "Reporte Circular CREG 119 de 2017":
      {
        lazyQuery: useLazyQuery(OBTENER_DATA_REPORTE_SSPD_CIRCULAR_CREG_119_2017),
        dataProperty: "obtenerDataReporteSSPDCIRCULARCREG1192017",
        isExcel: true, // Indicamos que este reporte devuelve Excel directamente
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
    const totalExportSteps = checked.length;
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
          try {
            const { lazyQuery, dataProperty, isExcel } = checkMappings[check];
            const mapping = checkMappings[check];

            const [loadDataFunction, { data, loading, error }] = lazyQuery;

            // Si es el reporte que devuelve Excel directamente
            if (isExcel) {
              try {
                // Para el reporte CREG 119, lo procesamos solo una vez
                if (isExcel) {
                  // Verificar si estamos en el primer mes-año del rango seleccionado
                  // Solo procesamos si estamos en el primer mes-año
                  if (year.toString() !== startYear || month.toString() !== startMonth) {
                    // Si no es el primer mes-año, saltamos este ciclo
                    continue;
                  }
                  
                  updateProgress(50); // Iniciar progreso
                  
                  // Recolectar todos los períodos solicitados
                  const allPeriods = [];
                  
                  for (let y = parseInt(startYear); y <= parseInt(endYear); y++) {
                    let startM = (y === parseInt(startYear)) ? parseInt(startMonth) : 1;
                    let endM = (y === parseInt(endYear)) ? parseInt(endMonth) : 12;
                    
                    for (let m = startM; m <= endM; m++) {
                      allPeriods.push({
                        anho: y.toString(),
                        mes: m.toString()
                      });
                    }
                  }
                  
                  console.log(`Procesando ${allPeriods.length} períodos para CREG 119`);
                  
                  // Una única llamada al backend con todos los períodos
                  const result = await loadDataFunction({
                    variables: {
                      options: {
                        filters: [
                          {
                            campo: "periodos",
                            valores: [JSON.stringify(allPeriods)]
                          }
                        ],
                        page: 1,
                        limit: 1
                      }
                    },
                  });
                  
                  // Procesar la respuesta
                  if (result.data && result.data[mapping.dataProperty]) {
                    const excelBase64 = result.data[mapping.dataProperty].excelBase64;
                    
                    if (excelBase64) {
                      // Convertir base64 a Blob
                      const binaryString = window.atob(excelBase64);
                      const len = binaryString.length;
                      const bytes = new Uint8Array(len);
                      for (let i = 0; i < len; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                      }
                      
                      const blob = new Blob([bytes], { 
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                      });
                      
                      // Nombre de archivo incluye rango de fechas completo
                      saveAs(
                        blob,
                        `${empresa}_${check}_${startMonth}-${startYear}_a_${endMonth}-${endYear}.xlsx`
                      );
                      
                      updateProgress(100); // Completar progreso
                    } else {
                      // Verificar si hay mensaje de error en la respuesta
                      if (result.data[mapping.dataProperty].message) {
                        throw new Error(result.data[mapping.dataProperty].message);
                      } else {
                        throw new Error("No se recibió el archivo Excel desde el servidor");
                      }
                    }
                  } else {
                    throw new Error("No se obtuvieron datos para la generación del Excel");
                  }
                } else {
                  // Comportamiento normal para otros reportes Excel (un archivo por período)
                  updateProgress(50); // Iniciar progreso
                  
                  const result = await loadDataFunction({
                    variables: {
                      options: {
                        filters: [
                          {
                            campo: "anho",
                            valores: [year.toString()]
                          },
                          {
                            campo: "mes",
                            valores: [month.toString()]
                          }
                        ],
                        page: 1,
                        limit: 1
                      }
                    },
                  });
                  
                  // Verificar si la respuesta contiene el Excel en base64
                  if (result.data && result.data[mapping.dataProperty]) {
                    const excelBase64 = result.data[mapping.dataProperty].excelBase64;
                    
                    if (excelBase64) {
                      // Convertir base64 a Blob
                      const binaryString = window.atob(excelBase64);
                      const len = binaryString.length;
                      const bytes = new Uint8Array(len);
                      for (let i = 0; i < len; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                      }
                      
                      const blob = new Blob([bytes], { 
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                      });
                      
                      // Descargar el archivo Excel
                      saveAs(
                        blob,
                        `${empresa}_${check}-${year.toString()}-${month.toString()}.xlsx`
                      );
                      
                      updateProgress(100); // Completar progreso
                    } else {
                      // Verificar si hay mensaje de error en la respuesta
                      if (result.data[mapping.dataProperty].message) {
                        throw new Error(result.data[mapping.dataProperty].message);
                      } else {
                        throw new Error("No se recibió el archivo Excel desde el servidor");
                      }
                    }
                  } else {
                    throw new Error("No se obtuvieron datos para la generación del Excel");
                  }
                }
              } catch (error) {
                console.error("Error al descargar Excel:", error);
                message.error({
                  content: `Error al descargar ${check}: ${error.message}`,
                  duration: 3,
                });
                noDataElements.push({
                  check,
                  year,
                  month,
                });
                continue;
              }
            }
            
            else  {
              // Procesamiento normal para reportes en CSV
              let page = 1;
              let totalPagesPorArchivo = 0;
              let allData = [];
              
              try {
                while (true) {
                  try {
                    const result = await loadDataFunction({
                      variables: {
                        page: page,
                        limit: 1000,
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
                      ];
                      
                      if (page === 1) {
                        totalPagesPorArchivo =
                          result.data[mapping.dataProperty].totalPages;
                      }

                      const progresoActualArchivo = calcularProgresoArchivo(page, totalPagesPorArchivo);
                      actualizarProgresoTotal(currentExportStep, progresoActualArchivo);

                      if (page >= totalPagesPorArchivo) {
                        break;
                      }

                      page++;
                    } else {
                      break;
                    }
                  } catch (error) {
                    console.error("Error al cargar datos:", error);
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
            }
            
            currentExportStep++;
          } catch (error) {
            noDataMessage = `No se encontró la función de carga de datos para el check "${check}".`;
            continue;
          }
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
        duration: 3,
      });
    }

    // Reiniciar la barra de progreso
    updateProgress(0);
    setIsDisabled(false);
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";
    
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
