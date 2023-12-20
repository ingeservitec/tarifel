function mesANumero(mes) {
  const primerPalabra = mes.split(' ')[0].toUpperCase();
  const mesSinEspacios = primerPalabra.toUpperCase().replace(/\s/g, "");
  const equivalencias = {
    ENERO: 1,
    FEBRERO: 2,
    MARZO: 3,
    ABRIL: 4,
    MAYO: 5,
    JUNIO: 6,
    JULIO: 7,
    AGOSTO: 8,
    SEPTIEMBRE: 9,
    OCTUBRE: 10,
    NOVIEMBRE: 11,
    DICIEMBRE: 12,
  };

  return equivalencias[mesSinEspacios];
}

export function convertirExcelIPC(excelArray) {
  const headerRow = excelArray.findIndex((row) => row.includes("Mes"));
  const yearIndexes = excelArray[headerRow]
    .map((cell, index) => [index, cell])
    .filter(([_, cell]) => !isNaN(cell.replace(",", ".")));

  const dataRows = excelArray.slice(headerRow + 1);
  var resultArray = [];
  var mes;
  var i = 0;
  for (const row of dataRows) {
    for (const [cellIndex, cellValue] of row.entries()) {
      if (cellIndex === 0) {
        mes = mesANumero(cellValue);
      } else if (cellValue) {
        var obj = {};
        obj["Año"] = yearIndexes[cellIndex - 1][1];
        obj["Mes"] = mes;
        obj["IPC"] = cellValue;
        resultArray.push(obj);
      }
    }
  }
  return resultArray;
}

export function convertirExcelIPP(excelArray) {
  console.log(excelArray)

  // Encontrar la fila que contiene las etiquetas de columna
  const headerRow = excelArray.findIndex((row) =>
    row.includes("Producción Nacional")
  );

  const columnLabelsRow = excelArray[headerRow - 1];
  const columnLabelsSubRow = excelArray[headerRow];

  // Crear un objeto que contendrá las etiquetas de columna como claves

  let lastYear;
  const resultArray = [];
  let obj;
  for (let rowIndex = headerRow + 1; rowIndex < excelArray.length; rowIndex++) {
    const row = excelArray[rowIndex];
    if (row[1] != "") {
      if (row[0] != "") {
        lastYear = row[0];

        if (row[1].includes("pr")) {
          obj = {
            Año: row[0],
            Mes: mesANumero(row[1].split("pr")[0]),
            Tipo: "pr",
          };
        } else {
          obj = {
            Año: row[0],
            Mes: mesANumero(row[1]),
            Tipo: "df",
          };
        }
      } else {
        if (row[1].includes("pr")) {
          obj = {
            Año: lastYear,
            Mes: mesANumero(row[1].split("(")[0]),
            Tipo: "pr",
          };
        } else {
          obj = {
            Año: lastYear,
            Mes: mesANumero(row[1]),
            Tipo: "df",
          };
        }
      }
      let lastLabel;
      let key;
      let key_;

      for (let colIndex = 2; colIndex < columnLabelsRow.length; colIndex++) {
        if (columnLabelsSubRow[colIndex] === "") {
          break;
        }

        const label = columnLabelsRow[colIndex];
        if (label != "") {
          lastLabel = label;
          key_ = label + "_" + columnLabelsSubRow[colIndex];
        } else {
          key_ = lastLabel + "_" + columnLabelsSubRow[colIndex];
        }

        switch (key_) {
          case "Oferta Interna 1 3_Agricultura, ganadería y pesca":
            key = "ipp_oi_agricultura_ganaderia_pesca";
            break;
          case "Oferta Interna 1 3_Industria":
            key = "ipp_oi_industria";
            break;
          case "Oferta Interna 1 3_Minería":
            key = "ipp_oi_mineria";
            break;
          case "Oferta Interna 1 3_Oferta Interna":
            key = "ipp_oi_oferta_interna";
            break;
          case "Procedencias1_Exportados":
            key = "ipp_pd_exportados";
            break;
          case "Procedencias1_Importados":
            key = "ipp_pd_importados";
            break;
          case "Procedencias1_Producidos para Consumo Interno":
            key = "ipp_pd_productos_consumo_interno";
            break;
          case "Producción Nacional1 2 _Agricultura, ganadería y pesca":
            key = "ipp_pn_agricultura_ganaderia_pesca";
            break;
          case "Producción Nacional1 2 _Industria":
            key = "ipp_pn_industria";
            break;
          case "Producción Nacional1 2 _Minería":
            key = "ipp_pn_mineria";
            break;
          case "Producción Nacional1 2 _Producción Nacional":
            key = "ipp_pn_produccion_nacional";
            break;
          default:
            break;
        }
        obj[key] = row[colIndex];
      }
      resultArray.push(obj);
    }
  }

  return resultArray;
}

export function convertirAFAC(excelArray, agente, month) {
  var resultArray = excelArray.filter((data) => data.AGENTE === agente);
  return resultArray.map((data) => ({
    ...data,
    Mes: month,
  }));
}

export function convertirDSPCTTOS(excelArray, month, day) {
  var resultArray = excelArray;
  return resultArray.map((data) => ({
    ...data,
    Mes: month,
    Dia: day,
  }));
}

export function convertirTRSM(excelArray, month) {
  var resultArray = excelArray;
  return resultArray.map((data) => ({
    ...data,
    Mes: month,
  }));
}

export function convertirSTN(sheetName, excelArray, dataArray2) {
  let resultObject = dataArray2[0];

  switch (sheetName) {
    case "IngresoTransmisoresNacionales":
      excelArray.forEach((row) => {
        let lastValueIndex = row.lastIndexOf("") - 2; // Encuentra el último valor no vacío en la fila
        if (lastValueIndex < 0) {
          lastValueIndex = row.length - 1; // Si todos los valores son no vacíos, selecciona el último valor
        }
        switch (row[0]) {
          case "Ingreso Regulado Bruto para estimados (COP)":
            resultObject.Ing_Reg_Bruto_T_cop = parseFloat(
              row[lastValueIndex].replace(/,/g, "")
            );
            break;
          case "Ingreso a Compensar para estimados  (COP)":
            resultObject.Ing_Compensar_T_cop = parseFloat(
              row[lastValueIndex].replace(/,/g, "")
            );
            break;
          case "Ingreso Regulado Neto para estimados  (COP)":
            resultObject.Ing_Reg_Neto_T_cop = parseFloat(
              row[lastValueIndex].replace(/,/g, "")
            );
            break;
          default:
            break;
        }
      });

      break;

    case "Cargos Monomios":
      excelArray.forEach((row) => {
        let lastValueIndex = row.lastIndexOf("") - 2; // Encuentra el último valor no vacío en la fila
        if (lastValueIndex < 0) {
          lastValueIndex = row.length - 1; // Si todos los valores son no vacíos, selecciona el último valor
        }
        switch (row[0]) {
          case "ENERGÍA DEL SIN (kWh)":
            resultObject.Energia_sin_kwh = row[lastValueIndex].replace(
              /,/g,
              ""
            );
            break;
          case "VALOR DEL CARGO - T  (COP/kWh)":
            resultObject.t_cop_kwh = parseFloat(
              row[lastValueIndex].replace(/,/g, "")
            );
            break;
          case "VALOR DEL CARGO - T '  (COP/kWh)":
            resultObject.t_prima_cop_kwh = parseFloat(
              row[lastValueIndex].replace(/,/g, "")
            );
            break;
          default:
            break;
        }
      });

      break;

    case "Deltas":
      excelArray.forEach((row) => {
        let lastValueIndex = row.lastIndexOf("") - 2; // Encuentra el último valor no vacío en la fila
        if (lastValueIndex < 0) {
          lastValueIndex = row.length - 1; // Si todos los valores son no vacíos, selecciona el último valor
        }
        switch (row[0]) {
          case "VALOR DIFERENCIAL TOTAL DEL CARGO DESPUÉS DE COMPENSACIÓN - T '  (COP/kWh)":
            resultObject.delta_t_cop_kwh = parseFloat(
              row[lastValueIndex].replace(/,/g, "")
            );
            break;

          default:
            break;
        }
      });

      break;

    case "CRS_Variante Guatape":
      let resultSet = [];
      excelArray.forEach((row) => {
        if (
          row[0] !== "TOTAL" &&
          row[0] !== "Participante del Mercado" &&
          row[0] !== ""
        ) {
          let obj = {
            agente: row[0],
            demanda_kwh: parseFloat(row[1].replace(/,/g, "")),
            crs_variable_guatape_cop: parseFloat(row[2].replace(/,/g, "")),
          };
          resultSet.push(obj);
        }
      });
      resultObject.CRS_Variante_Guatape = resultSet; // añade el array de objetos al objeto 'resultObject'

      break;

    default:
      break;
  }
}

export function convertirSTR(sheetName, excelArray, dataArray2) {
  
  let resultObject = dataArray2[0];

  switch (true) {
    
    case sheetName.includes("CargosEstimados"):

  console.log({excelArray})
      excelArray.forEach((row) => {
        let found = false; // Bandera para indicar si ya se encontró un caso en la fila

        for (let i = 0; i < row.length - 1; i++) {
          if (found) break; // Si ya se encontró un caso, salta al siguiente elemento del forEach
          const cellText = row[i].trim(); // Elimina espacios en blanco al principio y al final

          switch (cellText) {
            case "TOTAL INGRESO MENSUAL BRUTO STR -  (COP)":
              resultObject.total_ingreso_mensual_bruto_str_cop_norte = parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.total_ingreso_mensual_bruto_str_cop_sur = parseFloat(row[i + 4].replace(/,/g, ""));
              found = true;
              break;
            case "ENERGÍA DEL STR (kWh)":
              resultObject.energia_del_str_kwh_norte = parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.energia_del_str_kwh_sur = parseFloat(row[i + 4].replace(/,/g, ""));
              found = true;
              break;
            case "CARGO NIVEL DE TENSIÓN ANTES DE COMPENSACIÓN CD4 (COP/kWh )":
              resultObject.cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte = parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur = parseFloat(row[i + 4].replace(/,/g, ""));
              found = true;
              break;
            case "CARGO NIVEL DE TENSIÓN DESPUÉS DE COMPENSACIÓN CD4 (COP/kWh )":
              resultObject.cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte = parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur = parseFloat(row[i + 4].replace(/,/g, ""));
              found = true;
              break;
            case "Cargo por uso Dt4 (COP/kWh )":
              resultObject.cargo_por_uso_dt4_cop_kwh_norte = parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.cargo_por_uso_dt4_cop_kwh_sur = parseFloat(row[i + 4].replace(/,/g, ""));
              found = true;
              break;
            case "Factor para referir las medidas de energía del nivel de tensión 4":
              resultObject.factor_para_referir_las_medidas_de_energia_del_nt_4_norte = parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.factor_para_referir_las_medidas_de_energia_del_nt_4_sur = parseFloat(row[i + 4].replace(/,/g, ""));
              found = true;
              break;
        
            default:
              break;
          }
        }
      });
      

      break;
    default:
      if (sheetName.includes("Deltas")) {
       console.log('first2')
        excelArray.forEach((row) => {
          // Código para el caso "Deltas Jun-2023"
          let lastValueIndex = row.lastIndexOf("") - 2;
          if (lastValueIndex < 0) {
            lastValueIndex = row.length - 1;
          }
          console.log(row)
          switch (row[0]) {
            case "VALOR DIFERENCIAL DESPUÉS DE COMPENSACIÓN(COP / kWh)":
              resultObject.valor_diferencial_despues_de_compensacion_cop_kwh_norte =
                parseFloat(row[1].replace(/,/g, ""));
              resultObject.valor_diferencial_despues_de_compensacion_cop_kwh_sur =
                parseFloat(row[2].replace(/,/g, ""));
              break;
            default:
              break;
          }
        });
      }
      break;
  }
}
