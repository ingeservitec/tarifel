function mesANumero(mes) {
  const primerPalabra = mes.split(" ")[0].toUpperCase();
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
const monthMapping = {
  ene: 1,
  jan: 1,
  feb: 2,
  feb: 2,
  mar: 3,
  mar: 3,
  abr: 4,
  apr: 4,
  may: 5,
  may: 5,
  jun: 6,
  jun: 6,
  jul: 7,
  jul: 7,
  ago: 8,
  aug: 8,
  sep: 9,
  sep: 9,
  oct: 10,
  oct: 10,
  nov: 11,
  nov: 11,
  dic: 12,
  dec: 12,
};

function mesANumeroTresWords(mes) {
  const primerPalabra = mes.split(" ")[0].toUpperCase();
  const mesSinEspacios = primerPalabra.toUpperCase().replace(/\s/g, "");
  const equivalencias = {
    ENE: 1,
    FEB: 2,
    MAR: 3,
    ABR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AGO: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DIC: 12,
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

export function convertirExcelIPPAnexos(excelArray) {
  // Encontrar la fila que contiene la palabra "TOTAL"
  const totalRowIndex = excelArray.findIndex((row) => row.includes("NIVEL"));
  const valuesRowIndex = excelArray.findIndex((row) => row.includes("TOTAL"));

  // Verificar que encontramos una fila "TOTAL"
  if (totalRowIndex === -1) {
    throw new Error('No se encontró la fila "NIVEL" en los datos del Excel.');
  }

  const totalRow = excelArray[totalRowIndex];
  const valueRow = excelArray[valuesRowIndex];
  // Crear un objeto que contendrá los datos de la fila "TOTAL"
  const resultArray = [];

  // Extraer el año y el mes de las columnas que contengan "(pr*)"
  for (let colIndex = 0; colIndex < totalRow.length; colIndex++) {
    const cellValue = totalRow[colIndex];

    // Verificar si la columna actual contiene "(pr*)"
    if (typeof cellValue === "string" && cellValue.includes("(pr")) {
      // Extraer año y mes del título de la columna
      const yearAndMonthMatch = cellValue.match(/([A-Za-z]+)-(\d+) \(pr/);

      if (yearAndMonthMatch) {
        const mes = yearAndMonthMatch[1];
        let anho = yearAndMonthMatch[2];
        // Asegúrate de que el año tenga 4 dígitos
        anho = anho.length === 2 ? "20" + anho : anho;

        var obj = {};
        obj["Año"] = anho;
        (obj["Mes"] = mesANumeroTresWords(mes)), // Suponiendo que tienes una función `mesANumero` que convierte el nombre del mes a número;
          (obj["Tipo"] = "pr");
        obj["ipp_oi_oferta_interna"] = valueRow[colIndex];
        resultArray.push(obj);

        // Agregar el objeto al array de resultados
      }
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
  console.log("first");
  var resultArray = excelArray;
  return resultArray.map((data) => ({
    ...data,
    Mes: month,
  }));
}

export function convertirTSERV(excelArray, agente, month) {
  var resultArray = excelArray.filter((data) => data.AGENTE === agente);
  return resultArray.map((data) => ({
    ...data,
    Mes: month,
  }));
}

export function convertirFACTORESIPR(excelArray, agente, month, year) {
  console.log("year");
  var resultArray = excelArray.filter(
    (data) => data.agrupaORMercado === agente && data.conceptoID === "FactorReferirSTN"
  );
  return resultArray.map((data) => ({
    ...data,
    Mes: month,
    Anho: year,
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
// ... existing code ...
console.log(row[0]);
// Normalizar el texto para comparación más robusta
const normalizedText = row[0] ? row[0].replace(/\s+/g, ' ').trim() : '';
console.log('Texto normalizado:', normalizedText);

switch (normalizedText) {
  case "Ingreso Regulado Bruto para estimados (COP)":
    resultObject.Ing_Reg_Bruto_T_cop = parseFloat(
      row[lastValueIndex].replace(/,/g, "")
    );
    break;
  case "Ingreso a Compensar para estimados (COP)":
    console.log('Entrando en caso Ingreso a Compensar:', row[0]);
    resultObject.Ing_Compensar_T_cop = parseFloat(
      row[lastValueIndex].replace(/,/g, "")
    );
    break;
  case "Ingreso Regulado Neto para estimados (COP)":
    console.log(row[0]);
    resultObject.Ing_Reg_Neto_T_cop = parseFloat(
      row[lastValueIndex].replace(/,/g, "")
    );
    break;
  default:
    break;
}
// ... existing code ...
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
      console.log({ excelArray });
      excelArray.forEach((row) => {
        let found = false; // Bandera para indicar si ya se encontró un caso en la fila

        for (let i = 0; i < row.length - 1; i++) {
          if (found) break; // Si ya se encontró un caso, salta al siguiente elemento del forEach
          const cellText = row[i].trim(); // Elimina espacios en blanco al principio y al final

          switch (cellText) {
            case "TOTAL INGRESO MENSUAL BRUTO STR -  (COP)":
              resultObject.total_ingreso_mensual_bruto_str_cop_norte =
                parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.total_ingreso_mensual_bruto_str_cop_sur = parseFloat(
                row[i + 4].replace(/,/g, "")
              );
              found = true;
              break;
            case "ENERGÍA DEL STR (kWh)":
              resultObject.energia_del_str_kwh_norte = parseFloat(
                row[i + 1].replace(/,/g, "")
              );
              resultObject.energia_del_str_kwh_sur = parseFloat(
                row[i + 4].replace(/,/g, "")
              );
              found = true;
              break;
            case "CARGO NIVEL DE TENSIÓN ANTES DE COMPENSACIÓN CD4 (COP/kWh )":
              resultObject.cargo_nt_antes_de_compensacion_cd4_cop_kwh_norte =
                parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.cargo_nt_antes_de_compensacion_cd4_cop_kwh_sur =
                parseFloat(row[i + 4].replace(/,/g, ""));
              found = true;
              break;
            case "CARGO NIVEL DE TENSIÓN DESPUÉS DE COMPENSACIÓN CD4 (COP/kWh )":
              resultObject.cargo_nt_despues_de_compensacion_cd4_cop_kwh_norte =
                parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.cargo_nt_despues_de_compensacion_cd4_cop_kwh_sur =
                parseFloat(row[i + 4].replace(/,/g, ""));
              found = true;
              break;
            case "Cargo por uso Dt4 (COP/kWh )":
              resultObject.cargo_por_uso_dt4_cop_kwh_norte = parseFloat(
                row[i + 1].replace(/,/g, "")
              );
              resultObject.cargo_por_uso_dt4_cop_kwh_sur = parseFloat(
                row[i + 4].replace(/,/g, "")
              );
              found = true;
              break;
            case "Factor para referir las medidas de energía del nivel de tensión 4":
              resultObject.factor_para_referir_las_medidas_de_energia_del_nt_4_norte =
                parseFloat(row[i + 1].replace(/,/g, ""));
              resultObject.factor_para_referir_las_medidas_de_energia_del_nt_4_sur =
                parseFloat(row[i + 4].replace(/,/g, ""));
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
        console.log("first2");
        excelArray.forEach((row) => {
          // Código para el caso "Deltas Jun-2023"
          let lastValueIndex = row.lastIndexOf("") - 2;
          if (lastValueIndex < 0) {
            lastValueIndex = row.length - 1;
          }
          console.log(row);
          // Eliminar todos los espacios en blanco del texto
          const normalizedText = row[0].replace(/\s+/g, "");
          switch (normalizedText) {
            case "VALORDIFERENCIALDESPUÉSDECOMPENSACIÓN(COP/kWh)":
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

export function convertirSDL(sheetName, excelArray, dataArray2) {
  let resultObject = dataArray2[0];

  switch (true) {
    case sheetName.includes("Cargos_SDL"):
      excelArray.forEach((row) => {
        let found = false; // Bandera para indicar si ya se encontró un caso en la fila

        const cellText = row[0].trim(); // Elimina espacios en blanco al principio y al final
        const cellValue =
          row[1] == null || isNaN(row[1])
            ? 0
            : parseFloat(row[1].trim().replace(/,/g, ""));

        switch (cellText) {
          case "Cargo por uso Dt1 (COP/kWh)":
            resultObject.cargo_por_uso_dt1_cop_kwh = cellValue;

            break;
          case "Cargo por uso Dt2 (COP/kWh)":
            resultObject.cargo_por_uso_dt2_cop_kwh = cellValue;

            break;
          case "Cargo por uso Dt3 (COP/kWh)":
            resultObject.cargo_por_uso_dt3_cop_kwh = cellValue;

            break;
          case "Cargo de inversión CDI1 (COP/kWh)":
            resultObject.cargo_de_inversion_cdi1_cop_kwh = cellValue;

            break;
          case "Cargo por AOM CDA1 (COP/kWh)":
            resultObject.cargo_por_aom_cda1_cop_kwh = cellValue;

            break;
          case "Cargo Nivel de tensión CD2 (COP/kWh)":
            resultObject.cargo_nivel_de_tension_cd2_cop_kwh = cellValue;

            break;
          case "Cargo Nivel de tensión CD3 (COP/kWh)":
            resultObject.cargo_nivel_de_tension_cd3_cop_kwh = cellValue;

            break;
          case "Cargo Nivel de tension CD3-2 (COP/kWh)":
            resultObject.cargo_nivel_de_tension_cd3_2_cop_kwh = cellValue;

            break;
          case "Cargo nivel de tensión CD4 con DeltaCD4 (COP/kWh)":
            resultObject.cargo_nivel_de_tension_cd4_cop_kwh = cellValue;

            break;
          case "Cargo por incentivos Dtcs (COP/kWh)":
            resultObject.cargo_por_incentivos_dtcs_cop_kwh = cellValue;

            break;
          // Continuación de la función convertirSDL
          case "Fracción Dtcs (COP/kWh)":
            resultObject.fraccion_dtcs_cop_kwh = cellValue;

            break;
          case "IA1":
            resultObject.ia1 = cellValue;

            break;
          case "IA2":
            resultObject.ia2 = cellValue;

            break;
          case "IA3":
            resultObject.ia3 = cellValue;

            break;
          case "IAA1 (COP)":
            resultObject.iaa1_cop = cellValue;

            break;
          case "IAA2 (COP)":
            resultObject.iaa2_cop = cellValue;

            break;
          case "IAA3 (COP)":
            resultObject.iaa3_cop = cellValue;

            break;
          case "IRM1 (COP)":
            resultObject.irm1_cop = cellValue;

            break;
          case "IRM2 (COP)":
            resultObject.irm2_cop = cellValue;

            break;
          case "IRM3 (COP)":
            resultObject.irm3_cop = cellValue;

            break;
          case "fM":
            resultObject.fm = cellValue;

            break;
          case "IAAOM1  (COP)":
            resultObject.iaaom1_cop = cellValue;

            break;
          case "IAAOM2  (COP)":
            resultObject.iaaom2_cop = cellValue;

            break;
          case "IAAOM3 (COP)":
            resultObject.iaaom3_cop = cellValue;

            break;
          case "AOMNI1 (COP)":
            resultObject.aomni1_cop = cellValue;

            break;
          case "AOMNI2 (COP)":
            resultObject.aomni2_cop = cellValue;

            break;
          case "AOMNI3 (COP)":
            resultObject.aomni3_cop = cellValue;

            break;
          case "IMA N1":
            resultObject.ima_n1 = cellValue;

            break;
          case "IMA N2":
            resultObject.ima_n2 = cellValue;

            break;
          case "IMA N3":
            resultObject.ima_n3 = cellValue;

            break;
          case "IMN N1":
            resultObject.imn_n1 = cellValue;

            break;
          case "IMN N2":
            resultObject.imn_n2 = cellValue;

            break;
          case "IMN N3":
            resultObject.imn_n3 = cellValue;

            break;
          case "AIM N1":
            resultObject.aim_n1 = cellValue;

            break;
          case "AIM N2":
            resultObject.aim_n2 = cellValue;

            break;
          case "AIM N3":
            resultObject.aim_n3 = cellValue;

            break;
          case "NAIM N1":
            resultObject.naim_n1 = cellValue;

            break;
          case "NAIM N2":
            resultObject.naim_n2 = cellValue;

            break;
          case "NAIM N3":
            resultObject.naim_n3 = cellValue;

            break;
          case "Fracción AIM N1 (Inversión)":
            resultObject.fraccion_aim_n1_inversion = cellValue;

            break;
          case "Fracción AIM N1 (AOM)":
            resultObject.fraccion_aim_n1_aom = cellValue;

            break;
          case "BRA1 (COP)":
            resultObject.bra1_cop = cellValue;
            break;
          case "BRA2 (COP)":
            resultObject.bra2_cop = cellValue;

            break;
          case "BRA3 (COP)":
            resultObject.bra3_cop = cellValue;

            break;
          case "BRAE1 (COP)":
            resultObject.brae1_cop = cellValue;

            break;
          case "BRAE2 (COP)":
            resultObject.brae2_cop = cellValue;

            break;
          case "BRAE3 (COP)":
            resultObject.brae3_cop = cellValue;

            break;
          case "BRAEN1 (COP)":
            resultObject.braen1_cop = cellValue;

            break;
          case "BRAEN2 (COP)":
            resultObject.braen2_cop = cellValue;

            break;
          case "BRAEN3 (COP)":
            resultObject.braen3_cop = cellValue;

            break;
          case "RC1 (COP)":
            resultObject.rc1_cop = cellValue;

            break;
          case "RC2 (COP)":
            resultObject.rc2_cop = cellValue;

            break;
          case "RC3 (COP)":
            resultObject.rc3_cop = cellValue;

            break;
          case "CDI_Aj,1 (COP(2007)/kWh)":
            resultObject.cdi_aj_1_cop2007_kwh = cellValue;

            break;
          case "CD_Aj,2 (COP(2007)/kWh)":
            resultObject.cd_aj_2_cop2007_kwh = cellValue;

            break;
          case "CD_Aj,3 (COP(2007)/kWh)":
            resultObject.cd_aj_3_cop2007_kwh = cellValue;

            break;
          case "CDM_Aj,1 (COP(2007)/kWh)":
            resultObject.cdm_aj_1_cop2007_kwh = cellValue;

            break;
          case "IAPA1":
            resultObject.iapa1 = cellValue;

            break;
          case "IAPA2":
            resultObject.iapa2 = cellValue;

            break;
          case "IAPA3":
            resultObject.iapa3 = cellValue;

            break;
          case "IAPA1_t-1":
            resultObject.iapa1_tant = cellValue;

            break;
          case "IAPA2_t-1":
            resultObject.iapa2_tant = cellValue;

            break;
          case "IAPA3_t-1":
            resultObject.iapa3_tant = cellValue;

            break;

          case "IAPA1_t-1":
            resultObject.iapa1_tant = cellValue;

            break;
          case "IAPA2_t-1":
            resultObject.iapa2_tant = cellValue;

            break;
          case "IAPA3_t-1":
            resultObject.iapa3_tant = cellValue;

            break;
          case "OI1 (COP)":
            resultObject.oi1_cop = cellValue;

            break;
          case "Oj2 (COP)":
            resultObject.oj2_cop = cellValue;

            break;
          case "Oj3 (COP)":
            resultObject.oj3_cop = cellValue;

            break;
          case "IRespaldo1 (COP)":
            resultObject.irespaldo1_cop = cellValue;

            break;
          case "IRespaldo2 (COP)":
            resultObject.irespaldo2_cop = cellValue;

            break;
          case "IRespaldo3 (COP)":
            resultObject.irespaldo3_cop = cellValue;

            break;
          case "IMunts1 (COP)":
            resultObject.imunts1_cop = cellValue;

            break;
          case "IMunts2 (COP)":
            resultObject.imunts2_cop = cellValue;

            break;
          case "IMunts3 (COP)":
            resultObject.imunts3_cop = cellValue;

            break;
          case "IReactiva1 (COP)":
            resultObject.ireactiva1_cop = cellValue;

            break;
          case "IReactiva2 (COP)":
            resultObject.ireactiva2_cop = cellValue;

            break;
          case "IReactiva3 (COP)":
            resultObject.ireactiva3_cop = cellValue;

            break;
          case "AOMbase1":
            resultObject.aombase1 = cellValue;

            break;
          case "AOMbase2":
            resultObject.aombase2 = cellValue;

            break;
          case "AOMbase3":
            resultObject.aombase3 = cellValue;

            break;
          case "BRAE1_t-1 (COP)":
            resultObject.brae1_tant_cop = cellValue;

            break;
          case "BRAE2_t-1 (COP)":
            resultObject.brae2_tant_cop = cellValue;

            break;
          case "BRAE3_t-1 (COP)":
            resultObject.brae3_tant_cop = cellValue;

            break;
          case "∆BRAENj,1 (COP)":
            console.log(cellValue);
            console.log(row[1]);
            resultObject.deltabraenj_1_cop = cellValue;

            break;
          case "∆BRAENj,2 (COP)":
            resultObject.deltabraenj_2_cop = cellValue;

            break;
          case "∆BRAENj,3 (COP)":
            resultObject.deltabraenj_3_cop = cellValue;

            break;
          case "∆INGj,1 (COP)":
            resultObject.deltaingj_1_cop = cellValue;

            break;
          case "∆INGj,2 (COP)":
            resultObject.deltaingj_2_cop = cellValue;

            break;
          case "∆INGj,3 (COP)":
            resultObject.deltaingj_3_cop = cellValue;

            break;
          case "BRT1 (COP)":
            resultObject.brt1_cop = cellValue;

            break;
          case "BRT2 (COP)":
            resultObject.brt2_cop = cellValue;

            break;
          case "BRT3 (COP)":
            resultObject.brt3_cop = cellValue;

            break;
          case "RCBIA1 (COP)":
            resultObject.rcbia1_cop = cellValue;

            break;
          case "RCBIA2 (COP)":
            resultObject.rcbia2_cop = cellValue;

            break;
          case "RCBIA3 (COP)":
            resultObject.rcbia3_cop = cellValue;

            break;
          case "RCNA1 (COP)":
            resultObject.rcna1_cop = cellValue;

            break;
          case "RCNA2 (COP)":
            resultObject.rcna2_cop = cellValue;

            break;
          case "RCNA3 (COP)":
            resultObject.rcna3_cop = cellValue;

            break;
          case "RCNAFO1 (COP)":
            resultObject.rcnafo1_cop = cellValue;

            break;
          case "RCNAFO2 (COP)":
            resultObject.rcnafo2_cop = cellValue;

            break;
          case "RCNAFO3 (COP)":
            resultObject.rcnafo3_cop = cellValue;

            break;
          case "INVE1 (COP)":
            resultObject.inve1_cop = cellValue;

            break;
          case "INVE2 (COP)":
            resultObject.inve2_cop = cellValue;

            break;
          case "INVE3 (COP)":
            resultObject.inve3_cop = cellValue;

            break;
          case "INVA1 (COP)":
            resultObject.inva1_cop = cellValue;

            break;
          case "INVA2 (COP)":
            resultObject.inva2_cop = cellValue;

            break;
          case "INVA3 (COP)":
            resultObject.inva3_cop = cellValue;

            break;
          case "INVA1_t-1 (COP)":
            resultObject.inva1_tant_cop = cellValue;

            break;
          case "INVA2_t-1 (COP)":
            resultObject.inva2_tant_cop = cellValue;

            break;
          case "INVA3_t-1 (COP)":
            resultObject.inva3_tant_cop = cellValue;

            break;
          case "INVR1 Máximo_t-1 (COP)":
            resultObject.invr1_máximo_tant_cop = cellValue;

            break;
          case "INVR2 Máximo_t-1 (COP)":
            resultObject.invr2_máximo_tant_cop = cellValue;

            break;
          case "INVR3 Máximo_t-1 (COP)":
            resultObject.invr3_máximo_tant_cop = cellValue;

            break;
          case "INVR1_Delta (COP)":
            resultObject.invr1_delta_cop = cellValue;

            break;
          case "INVR2_Delta (COP)":
            resultObject.invr2_delta_cop = cellValue;

            break;
          case "INVR3_Delta (COP)":
            resultObject.invr3_delta_cop = cellValue;

            break;
          case "INVR1_t-1 (COP)":
            resultObject.invr1_tant_cop = cellValue;

            break;
          case "INVR2_t-1 (COP)":
            resultObject.invr2_tant_cop = cellValue;

            break;
          case "INVR3_t-1 (COP)":
            resultObject.invr3_tant_cop = cellValue;

            break;
          case "PR1":
            resultObject.pr1 = cellValue;

            break;
          case "PR2":
            resultObject.pr2 = cellValue;

            break;
          case "PR3":
            resultObject.pr3 = cellValue;

            break;
          case "Pj,1":
            resultObject.pj_1 = cellValue;

            break;
          case "Pj,2":
            resultObject.pj_2 = cellValue;

            break;
          case "Pj,3":
            resultObject.pj_3 = cellValue;

            break;
          case "Pj,1_CREG097":
            resultObject.pj_1_creg097 = cellValue;

            break;
          case "Pj,2_CREG097":
            resultObject.pj_2_creg097 = cellValue;

            break;
          case "Pj,3_CREG097":
            resultObject.pj_3_creg097 = cellValue;

            break;
          case "Acumulado Eej1 (kWh)":
            resultObject.acumulado_eej1_kwh = cellValue;

            break;
          case "Acumulado Eej2 (kWh)":
            resultObject.acumulado_eej2_kwh = cellValue;

            break;
          case "Acumulado Eej3 (kWh)":
            resultObject.acumulado_eej3_kwh = cellValue;

            break;
          case "Acumulado Fej3-2 (kWh)":
            resultObject.acumulado_fej3_2_kwh = cellValue;

            break;
          case "Euj,2_CREG097 (kWh)":
            resultObject.euj_2_creg097_kwh = cellValue;

            break;
          case "Fej3-2_CREG097 (kWh)":
            resultObject.fej3_2_creg097_kwh = cellValue;

            break;
          case "IC_SAIDI (COP)":
            resultObject.ic_saidi_cop = cellValue;

            break;
          case "IC_SAIFI (COP)":
            resultObject.ic_saifi_cop = cellValue;

            break;
          case "CONP (COP)":
            resultObject.conp_cop = cellValue;

            break;
          case "VCDIj,t-1 (kWh)":
            resultObject.vcdij_tant_kwh = cellValue;

            break;
          case "VCINj,t-1 (kWh)":
            resultObject.vcinj_tant_kwh = cellValue;

            break;
          case "VACPIEC1":
            resultObject.vacpiec1 = cellValue;

            break;
          case "VACPIEC2":
            resultObject.vacpiec2 = cellValue;

            break;
          case "VACPIEC3":
            resultObject.vacpiec3 = cellValue;

            break;
          case "VACNI1":
            resultObject.vacni1 = cellValue;

            break;
          case "VACNI2":
            resultObject.vacni2 = cellValue;

            break;
          case "VACNI3":
            resultObject.vacni3 = cellValue;

            break;
          case "r (tasa retorno actividad Distribución)":
            resultObject.r_tasa_retorno_actividad_distribucion = cellValue;

            break;
          case "fAmb":
            resultObject.famb = cellValue;

            break;
          case "CSS1 (COP)":
            resultObject.css1_cop = cellValue;

            break;
          case "CSS2 (COP)":
            resultObject.css2_cop = cellValue;

            break;
          case "CSS3 (COP)":
            resultObject.css3_cop = cellValue;

            break;
          case "DisminIng1 (COP)":
            resultObject.dismining1_cop = cellValue;

            break;
          case "DisminIng2 (COP)":
            resultObject.dismining2_cop = cellValue;

            break;
          case "DisminIng3 (COP)":
            resultObject.dismining3_cop = cellValue;

            break;
          default:
            break;
        }
      });

      break;

    default:
      break;
  }

  return resultObject;
}

export function convertirCPROG(sheetName, excelArray, dataArray2) {
  let resultObject = dataArray2[0];

  switch (true) {
    case sheetName.includes("CargoCPROG"):
      for (let rowIndex = 0; rowIndex < excelArray.length; rowIndex++) {
        let row = excelArray[rowIndex];
        let found = false; // Bandera para indicar si ya se encontró un caso en la fila

        for (let i = 0; i < row.length - 1; i++) {
          if (found) break; // Si ya se encontró un caso, salta al siguiente elemento del bucle for
          const cellText = row[i].trim(); // Elimina espacios en blanco al principio y al final

          switch (cellText) {
            case "Cargo CPROG por concepto del plan ($/kWh)":
              if (rowIndex + 1 < excelArray.length) {
                // Verifica que no se exceda el límite del array
                const nextRow = excelArray[rowIndex + 1];
                resultObject.Cargo_Cprog_Cop_Kwh = parseFloat(
                  nextRow[i].replace(/,/g, "")
                );
              }
              found = true;
              break;

            case "Mes cargo:":
              const dateString = row[i + 1]; // Suponiendo que esto es "Feb-2024"
              const parts = dateString.split("-");

              const month = parts[0];
              const year = parts[1];

              resultObject.Año = parseInt(year);

              resultObject.Mes = monthMapping[month.toLowerCase()];

              break;

            default:
              break;
          }
        }
        if (found) break; // Termina el bucle externo si se encontró el caso
      }

      break;

    default:
      break;
  }

  resultObject.Agente = "EGVD";
  return resultObject;
}

export function convertirBanRepTco(excelArray) {
  console.log("Iniciando conversión de Excel de tasas de crédito. Filas recibidas:", excelArray.length);
  console.log({excelArray})
  
  try {
    // Validación 1: Verificar que el archivo contiene datos de tasas de crédito comercial
    // Buscar en todo el contenido del archivo, no solo en los encabezados
    const hasCommercialCreditData = excelArray.some(row => 
      row.some(cell => 
        typeof cell === 'string' && 
        (cell.toLowerCase().includes('créditos comerciales') || 
         cell.toLowerCase().includes('creditos comerciales') ||
         cell.toLowerCase().includes('preferencial') ||
         cell.toLowerCase().includes('corporativo') ||
         cell.toLowerCase().includes('comercial'))
      )
    );
    
    if (!hasCommercialCreditData) {
      const errorMsg = {
        type: 'error',
        title: '❌ Archivo Incorrecto',
        description: 'El archivo seleccionado no contiene datos de tasas de crédito comercial.',
        details: [
          '📋 Archivo esperado: Tasas de interés de créditos comerciales del Banco de la República',
          '🔍 Términos requeridos: "créditos comerciales", "preferencial", "corporativo" o "comercial"',
          '💡 Solución: Verifique que está cargando el archivo correcto desde el sitio web del Banco de la República',
          '',
          '📊 Contenido encontrado en el archivo:',
          ...excelArray.slice(0, 5).map((row, index) => `   Fila ${index + 1}: ${row.slice(0, 3).join(' | ')}`)
        ]
      };
      console.error("VALIDACIÓN FALLIDA:", errorMsg);
      return { success: false, error: errorMsg, data: [] };
    }
    
    console.log("✅ Validación 1 EXITOSA: El archivo contiene datos de crédito comercial");
    
    // Encontrar índice de la fila con encabezados de las columnas
    const headerRowIndex = excelArray.findIndex(row => 
      row.includes("Año semana") || 
      row.some(cell => typeof cell === 'string' && cell.toLowerCase().includes('año'))
    );
    
    if (headerRowIndex === -1) {
      const errorMsg = {
        type: 'error',
        title: '❌ Estructura Incorrecta',
        description: 'No se encontró la columna "Año semana" o similar en el archivo.',
        details: [
          '📋 Estructura esperada: El archivo debe contener una columna de fechas (Año semana, Año, etc.)',
          `🔍 Primeras filas encontradas:`,
          ...excelArray.slice(0, 5).map((row, index) => `   Fila ${index + 1}: ${row.join(' | ')}`),
          '',
          '💡 Solución: Verifique que el archivo tiene la estructura correcta del Banco de la República'
        ]
      };
      console.error("VALIDACIÓN FALLIDA:", errorMsg);
      return { success: false, error: errorMsg, data: [] };
    }
    
    // Validación 2: Verificar que existe la columna de tasas y montos para crédito comercial
    const headerRow = excelArray[headerRowIndex];
    console.log("📊 Encabezados encontrados:", headerRow);
    
    // Buscar las columnas específicas que necesitamos - ser más flexible
    let tasaColumnIndex = headerRow.findIndex(cell => 
      typeof cell === 'string' && 
      cell.toLowerCase().includes('tasa') && 
      (cell.toLowerCase().includes('preferencial') || 
       cell.toLowerCase().includes('corporativo') ||
       cell.toLowerCase().includes('comercial'))
    );
    
    let montoColumnIndex = headerRow.findIndex(cell => 
      typeof cell === 'string' && 
      cell.toLowerCase().includes('monto') && 
      (cell.toLowerCase().includes('preferencial') || 
       cell.toLowerCase().includes('corporativo') ||
       cell.toLowerCase().includes('comercial'))
    );
    
    // Si no encontramos las columnas específicas, buscar por posición o patrón más general
    if (tasaColumnIndex === -1) {
      // Buscar columnas que contengan "tasa" o "%" 
      tasaColumnIndex = headerRow.findIndex(cell => 
        typeof cell === 'string' && 
        (cell.toLowerCase().includes('tasa') || cell.includes('%'))
      );
    }
    
    if (montoColumnIndex === -1) {
      // Buscar columnas que contengan "monto" o "cop"
      montoColumnIndex = headerRow.findIndex(cell => 
        typeof cell === 'string' && 
        (cell.toLowerCase().includes('monto') || cell.toLowerCase().includes('cop'))
      );
    }
    
    // Si aún no encontramos, usar posiciones por defecto basadas en la estructura típica
    if (tasaColumnIndex === -1 && headerRow.length > 4) {
      tasaColumnIndex = 4; // Posición típica de la tasa
      console.warn("⚠️ Usando posición por defecto para columna de tasa: índice 4");
    }
    
    if (montoColumnIndex === -1 && headerRow.length > 5) {
      montoColumnIndex = 5; // Posición típica del monto
      console.warn("⚠️ Usando posición por defecto para columna de monto: índice 5");
    }
    
    if (tasaColumnIndex === -1) {
      const errorMsg = {
        type: 'error',
        title: '❌ Columna Faltante',
        description: 'No se encontró la columna de tasa para crédito comercial.',
        details: [
          '📋 Columna esperada: Una columna que contenga "tasa", "%" o en posición 5',
          `🔍 Columnas disponibles: ${headerRow.map((col, idx) => `${idx}: ${col}`).join(', ')}`,
          '💡 Solución: Verifique que el archivo contiene las columnas correctas de tasas de crédito comercial'
        ]
      };
      console.error("VALIDACIÓN FALLIDA:", errorMsg);
      return { success: false, error: errorMsg, data: [] };
    }
    
    if (montoColumnIndex === -1) {
      const errorMsg = {
        type: 'error',
        title: '❌ Columna Faltante',
        description: 'No se encontró la columna de monto para crédito comercial.',
        details: [
          '📋 Columna esperada: Una columna que contenga "monto", "COP" o en posición 6',
          `🔍 Columnas disponibles: ${headerRow.map((col, idx) => `${idx}: ${col}`).join(', ')}`,
          '💡 Solución: Verifique que el archivo contiene las columnas correctas de montos de crédito comercial'
        ]
      };
      console.error("VALIDACIÓN FALLIDA:", errorMsg);
      return { success: false, error: errorMsg, data: [] };
    }
    
    console.log(`✅ Validación 2 EXITOSA: Columnas encontradas - Tasa: índice ${tasaColumnIndex} (${headerRow[tasaColumnIndex]}), Monto: índice ${montoColumnIndex} (${headerRow[montoColumnIndex]})`);
    
    // Los datos comienzan justo después de la fila de encabezados
    const dataStartIndex = headerRowIndex + 1;
    
    // Procesamos los datos hasta encontrar una fila vacía o inválida
    const transformedData = [];
    let validRowsCount = 0;
    let invalidRowsCount = 0;
    const invalidRows = [];
    
    for (let i = dataStartIndex; i < excelArray.length; i++) {
      console.log({i})
      const row = excelArray[i];
      
      // Verificar si es una fila de datos válida (debe tener año-semana)
      if (!row[0] || row[0].trim() === '') {
        continue; // Saltamos filas vacías
      }
      
      // Validación 3: Verificar formato de año-semana (ser más flexible)
      const anhoSemana = row[0].toString().trim();
      const anhoSemanaPattern = /^\d{4}-\d{1,2}$/; // Formato: YYYY-MM o YYYY-M (sin espacios)
      
      if (!anhoSemanaPattern.test(anhoSemana)) {
        invalidRowsCount++;
        invalidRows.push({
          fila: i + 1,
          valor: anhoSemana,
          error: "Formato de año-semana inválido"
        });
        console.warn(`⚠️ Fila ${i + 1}: Formato de año-semana inválido: "${anhoSemana}". Se omite esta fila.`);
        continue;
      }
      
      // Validación 4: Verificar que los valores numéricos sean válidos
      const tasaValue = row[tasaColumnIndex];
      const montoValue = row[montoColumnIndex];
      
      const tasa = parseFloat(tasaValue || 0);
      const monto = parseFloat((montoValue || "0").toString().replace(/[,$]/g, ""));
      
      if (isNaN(tasa) && isNaN(monto)) {
        invalidRowsCount++;
        invalidRows.push({
          fila: i + 1,
          valor: `Tasa: ${tasaValue}, Monto: ${montoValue}`,
          error: "Valores numéricos inválidos"
        });
        console.warn(`⚠️ Fila ${i + 1}: Tanto la tasa como el monto son inválidos. Se omite esta fila.`);
        continue;
      }
      
      // Crear un objeto con la estructura que necesita la base de datos
      const dataObject = {
        anho_semana: anhoSemana,
        tasa__cred_com_preferencial_o_corporativo: isNaN(tasa) ? 0 : tasa,
        monto__cred_com_preferencial_o_corporativo: isNaN(monto) ? 0 : monto,
      };
      
      transformedData.push(dataObject);
      validRowsCount++;
    }
    
    // Validación 5: Verificar que se procesaron datos
    if (transformedData.length === 0) {
      const errorMsg = {
        type: 'error',
        title: '❌ Sin Datos Válidos',
        description: 'No se encontraron datos válidos para procesar.',
        details: [
          `📊 Estadísticas:`,
          `   • Filas totales procesadas: ${excelArray.length - dataStartIndex}`,
          `   • Filas válidas: ${validRowsCount}`,
          `   • Filas inválidas: ${invalidRowsCount}`,
          '',
          '🔍 Errores encontrados:',
          ...invalidRows.map(row => `   • Fila ${row.fila}: ${row.error} (${row.valor})`),
          '',
          '💡 Solución: Revise el formato de los datos y asegúrese de que:',
          '   • Las fechas estén en formato YYYY-MM',
          '   • Los valores numéricos sean válidos',
          '   • El archivo no esté corrupto'
        ]
      };
      console.error("VALIDACIÓN FALLIDA:", errorMsg);
      return { success: false, error: errorMsg, data: [] };
    }
    
    // Mostrar resumen de procesamiento
    const successMsg = {
      type: 'success',
      title: '✅ Conversión Exitosa!',
      description: `Se procesaron ${validRowsCount} registros correctamente.`,
      details: [
        `📊 Resumen del procesamiento:`,
        `   • Filas válidas procesadas: ${validRowsCount}`,
        `   • Filas inválidas omitidas: ${invalidRowsCount}`,
        `   • Total de registros generados: ${transformedData.length}`,
        `   • Eficiencia: ${((validRowsCount / (validRowsCount + invalidRowsCount)) * 100).toFixed(1)}%`,
        '',
        `📋 Columnas utilizadas:`,
        `   • Fecha: Columna 0 (${headerRow[0]})`,
        `   • Tasa: Columna ${tasaColumnIndex} (${headerRow[tasaColumnIndex]})`,
        `   • Monto: Columna ${montoColumnIndex} (${headerRow[montoColumnIndex]})`
      ]
    };
    
    console.log(successMsg);
    
    if (invalidRowsCount > 0) {
      console.warn(`⚠️ ADVERTENCIA: Se omitieron ${invalidRowsCount} filas con errores:`);
      invalidRows.forEach(row => {
        console.warn(`   • Fila ${row.fila}: ${row.error} (${row.valor})`);
      });
    }
    
    // Mostrar una muestra de los primeros registros para verificación
    console.log("📋 MUESTRA DE REGISTROS PROCESADOS (primeros 3):");
    transformedData.slice(0, 3).forEach((record, index) => {
      console.log(`   ${index + 1}. ${JSON.stringify(record)}`);
    });
    
    return { 
      success: true, 
      data: transformedData, 
      message: successMsg,
      warnings: invalidRowsCount > 0 ? {
        type: 'warning',
        title: '⚠️ Advertencias',
        description: `Se omitieron ${invalidRowsCount} filas con errores.`,
        details: invalidRows.map(row => `Fila ${row.fila}: ${row.error} (${row.valor})`)
      } : null
    };
    
  } catch (error) {
    // Mejorar el mensaje de error para que sea más informativo
    const enhancedError = {
      type: 'error',
      title: '🚨 Error Crítico',
      description: 'Ha ocurrido un error inesperado durante la conversión.',
      details: [
        `💥 Error: ${error.message}`,
        '',
        '📞 Soporte: Si el problema persiste, contacte al administrador del sistema.',
        `🕐 Timestamp: ${new Date().toLocaleString()}`
      ]
    };
    
    console.error("❌ ERROR CRÍTICO:", enhancedError);
    return { success: false, error: enhancedError, data: [] };
  }
}

export function convertirBanRepTcap(excelArray) {
  // 1. Inicio de la transformación
  console.log(
    "Iniciando conversión de Excel. Filas totales:",
    excelArray.length
  );

  // 2. Buscar la fila de sub-encabezados (que incluya "A 30 días" en alguna celda)
  const subHeaderRowIndex = excelArray.findIndex((row) =>
    row.some(
      (cell) => typeof cell === "string" && cell.includes("A 30 días")
    )
  );
  console.log(
    `Sub-encabezado que incluye "A 30 días" encontrado en el índice ${subHeaderRowIndex}:`,
    excelArray[subHeaderRowIndex]
  );

  // 3. Determinar la fila de encabezados
  let headerRowIndex = excelArray.findIndex(
    (row) => row[0] === "Fecha (dd/mm/aaaa) "
  );
  console.log("Encabezado encontrado en el índice:", headerRowIndex);
  if (headerRowIndex === -1) {
    headerRowIndex = excelArray.findIndex(
      (row) =>
        row &&
        row.some(
          (cell) =>
            typeof cell === "string" && cell.toLowerCase().includes("fecha")
        )
    );
    if (headerRowIndex !== -1) {
      console.log(
        `Encabezado encontrado de forma flexible en el índice ${headerRowIndex}:`,
        excelArray[headerRowIndex]
      );
    }
  }
  if (headerRowIndex === -1) {
    if (subHeaderRowIndex > 0) {
      headerRowIndex = subHeaderRowIndex - 1;
      console.log(
        `Encabezado "Fecha(dd/mm/aaaa)" no encontrado. Se usa la fila anterior al subencabezado. Nuevo índice: ${headerRowIndex}`
      );
      console.log("Encabezado:", excelArray[headerRowIndex]);
    } else {
      console.error("No se pudo determinar la fila de encabezado.");
      return [];
    }
  } else {
    console.log(
      `Encabezado encontrado en el índice ${headerRowIndex}:`,
      excelArray[headerRowIndex]
    );
  }

  // 4. Determinar inicio y fin de datos
  const dataStartIndex = headerRowIndex + 1;
  console.log("Los datos comienzan en el índice:", dataStartIndex);

  let lastValidIndex = dataStartIndex;
  for (let i = dataStartIndex; i < excelArray.length; i++) {
    const rowValue = excelArray[i][0];
    if (
      rowValue &&
      (rowValue.startsWith("0") ||
       rowValue.startsWith("1") ||
       rowValue.startsWith("2") ||
       rowValue.startsWith("3"))
    ) {
      lastValidIndex = i;
    } else {
      console.log(
        `Se encontró fila no válida en el índice ${i}. Deteniendo lectura de datos.`
      );
      break;
    }
  }
  console.log("Último índice de fila válida:", lastValidIndex);

  // 5. Construir el objeto de índices dinámico
  const headers = excelArray[headerRowIndex];
  const subHeaders = excelArray[subHeaderRowIndex];
  console.log("Encabezados:", headers);
  console.log("Sub-encabezados:", subHeaders);

  const indices = {};
  // Suponemos que la columna de fecha es la primera (índice 0)
  indices.fecha = 0;

  headers.forEach((header, i) => {
    // Buscar columnas de tasa de forma flexible (permite variaciones como "Tasa efectiva anual (%)")
    if (header && header.toLowerCase().includes("tasa") && header.toLowerCase().includes("%")) {
      const subHeader = subHeaders[i] || "";
      // Extraer la parte primaria (hasta la palabra "días")
      let primaryPart = subHeader.split("días")[0].trim();
      const keyBase = primaryPart.toLowerCase().replace(/\s+/g, "_");

      let tasaKey = "";
      let montoKey = "";
      if (subHeader.toLowerCase().includes("cdat")) {
        tasaKey = `tasa_${keyBase}_cdats_cdat_bancos_comerciales`;
        montoKey = `monto_${keyBase}_cdat_bancos_comerciales`;
      } else {
        tasaKey = `tasa_${keyBase}_cdt_bancos_comerciales`;
        montoKey = `monto_${keyBase}_cdt_bancos_comerciales`;
      }
      indices[tasaKey] = i;

      // Buscar la columna de monto - debe estar en i+1 y contener "monto"
      const nextHeader = headers[i + 1];
      if (nextHeader && nextHeader.toLowerCase().includes("monto")) {
        indices[montoKey] = i + 1;
      } else {
        console.warn(
          `Advertencia: No se encontró columna de monto después de la columna ${i} (${header}). Se esperaba encontrar un encabezado con "Monto".`
        );
        // Asignar de todas formas el índice i+1 como fallback
        indices[montoKey] = i + 1;
      }

      console.log(
        `Procesando columna ${i}: subHeader="${subHeader}" -> Generados keys "${tasaKey}" y "${montoKey}"`
      );
    }
  });
  console.log("Índices dinámicos calculados:", indices);

  // 6. Transformar los datos
  const transformedData = [];

  for (let i = dataStartIndex; i <= lastValidIndex; i++) {
    const row = excelArray[i];
    const transformedRow = {};
    // Asignar la fecha (supuesto: índice definido en indices.fecha)
    transformedRow.fecha = row[indices.fecha];

    for (const key in indices) {
      if (key === "fecha") continue;
      const colIndex = indices[key];
      if (colIndex >= row.length) continue; // Omitir si no existe la columna
      if (key.startsWith("monto_")) {
        transformedRow[key] = parseFloat(
          (row[colIndex] || "").replace(/[$,]/g, "")
        );
      } else {
        transformedRow[key] = parseFloat(row[colIndex]);
      }
    }

/*     // Validar que la tasa a 30 días CDAT no sea nula
    if (isNaN(transformedRow["tasa_a_30_cdats_cdat_bancos_comerciales"])) {
      console.error(
        "La tasa a 30 días CDAT Bancos comerciales no puede ser nula en la fila ",
        i
      );
      throw new Error(
        "La tasa a 30 días CDAT Bancos comerciales no puede ser nula"
      );
    } */

    console.log(`Fila ${i} transformada:`, transformedRow);
    transformedData.push(transformedRow);
  }

  // 7. Finalización: Imprimir cantidad de filas transformadas y retornar datos
  console.log(
    "Conversión terminada. Número total de filas transformadas:",
    transformedData.length
  );
  return transformedData;
}

export function convertirBanRepTco31365(excelArray) {
  try {
    console.log("Iniciando conversión de Excel de tasas de crédito 31-365 días. Filas recibidas:", excelArray.length);
    console.log({ excelArray });

    // Validación 1: Verificar que hay datos
    if (!excelArray || excelArray.length === 0) {
      const errorMsg = {
        type: 'error',
        title: '❌ Archivo Vacío',
        description: 'El archivo Excel no contiene datos para procesar.',
        details: [
          '📋 Archivo recibido: Vacío o sin contenido',
          '💡 Solución: Verifique que el archivo contiene datos válidos'
        ]
      };
      console.error("VALIDACIÓN FALLIDA:", errorMsg);
      return { success: false, error: errorMsg, data: [] };
    }

    // Buscar la fila que contiene "Créditos Comerciales (Ordinario)" y "Ordinario entre 31 y 365 días"
    let targetRowIndex = -1;
    let dataRow = null;
    
    for (let i = 0; i < excelArray.length; i++) {
      const row = excelArray[i];
      if (Array.isArray(row)) {
        const rowText = row.join(' ').toLowerCase();
        if (rowText.includes('créditos comerciales') && 
            rowText.includes('ordinario') &&
            (rowText.includes('ordinario entre 31 y 365 días') || 
             rowText.includes('ordinario entre 31 y 365 dias'))) {
          targetRowIndex = i;
          dataRow = row;
          break;
        }
      }
    }

    if (targetRowIndex === -1 || !dataRow) {
      const errorMsg = {
        type: 'error',
        title: '❌ Fila de Datos No Encontrada',
        description: 'No se encontró la fila con datos de "Créditos Comerciales (Ordinario) - Ordinario entre 31 y 365 días".',
        details: [
          '🔍 Búsqueda realizada: "Créditos Comerciales" + "Ordinario" + "31 y 365 días"',
          `📊 Filas analizadas: ${excelArray.length}`,
          '💡 Solución: Verifique que el archivo contiene la fila correcta'
        ]
      };
      console.error("VALIDACIÓN FALLIDA:", errorMsg);
      return { success: false, error: errorMsg, data: [] };
    }

    console.log(`✅ Validación 1 EXITOSA: El archivo contiene datos de crédito comercial ordinario 31-365 días`);

    // Buscar la fila de encabezados (debe estar antes de la fila de datos)
    let headerRow = null;
    let headerRowIndex = -1;
    
    for (let i = targetRowIndex - 1; i >= 0; i--) {
      const row = excelArray[i];
      if (Array.isArray(row) && row.length > 5) {
        const hasYearWeek = row.some(cell => 
          typeof cell === 'string' && /año.*semana/i.test(cell)
        );
        if (hasYearWeek) {
          headerRow = row;
          headerRowIndex = i;
          break;
        }
      }
    }

    if (!headerRow) {
      const errorMsg = {
        type: 'error',
        title: '❌ Encabezados No Encontrados',
        description: 'No se encontraron los encabezados de las columnas.',
        details: [
          '🔍 Búsqueda realizada: Fila con "Año" y "semana"',
          `📊 Filas analizadas: ${targetRowIndex}`,
          '💡 Solución: Verifique que el archivo contiene los encabezados correctos'
        ]
      };
      console.error("VALIDACIÓN FALLIDA:", errorMsg);
      return { success: false, error: errorMsg, data: [] };
    }

    console.log(`✅ Fila encontrada en índice ${targetRowIndex}:`, dataRow);
    console.log(`📊 Encabezados encontrados:`, headerRow);

    // Procesar múltiples registros - cada columna de fecha representa un registro diferente
    const transformedData = [];
    let validRowsCount = 0;
    let invalidRowsCount = 0;
    const invalidRows = [];

    // Buscar las columnas de tasa y monto para 31-365 días
    // Según los logs, los datos están en las últimas columnas (índices 15 y 16)
    let tasaColumnIndex = -1;
    let montoColumnIndex = -1;

    // Buscar las columnas que corresponden a 31-365 días
    // Típicamente están al final del archivo
    for (let i = headerRow.length - 2; i >= 5; i -= 2) {
      // Verificar si hay datos válidos en estas posiciones
      const tasaValue = dataRow[i];
      const montoValue = dataRow[i + 1];
      
      if (tasaValue && montoValue) {
        const tasaNum = parseFloat(typeof tasaValue === 'string' ? tasaValue.replace(/[,$]/g, '') : tasaValue);
        const montoNum = parseFloat(typeof montoValue === 'string' ? montoValue.replace(/[,$]/g, '') : montoValue);
        
        if (!isNaN(tasaNum) && !isNaN(montoNum) && tasaNum > 0 && montoNum > 0) {
          tasaColumnIndex = i;
          montoColumnIndex = i + 1;
          break;
        }
      }
    }

    if (tasaColumnIndex === -1 || montoColumnIndex === -1) {
      // Usar las últimas dos columnas como fallback
      tasaColumnIndex = dataRow.length - 2;
      montoColumnIndex = dataRow.length - 1;
    }

    console.log(`✅ Columnas encontradas - Tasa: índice ${tasaColumnIndex}, Monto: índice ${montoColumnIndex}`);

    // Ahora buscar todas las filas que contengan datos de bancos comerciales
    // Buscar filas que contengan "Créditos Comerciales" pero no necesariamente "31 y 365 días"
    for (let i = 0; i < excelArray.length; i++) {
      const row = excelArray[i];
      if (!Array.isArray(row) || row.length < 5) continue;

      const rowText = row.join(' ').toLowerCase();
      
      // Buscar filas que contengan "créditos comerciales" y datos de bancos específicos
      if (rowText.includes('créditos comerciales')) {
        
        // Extraer año-semana del primer campo y limpiar espacios
        const anhoSemanaValue = row[0];
        if (!anhoSemanaValue || typeof anhoSemanaValue !== 'string') {
          invalidRowsCount++;
          invalidRows.push({
            fila: i + 1,
            banco: row[3] || 'Desconocido',
            valor: `Año-semana: ${anhoSemanaValue}`,
            error: "Año-semana inválido"
          });
          continue;
        }

        // Limpiar espacios del año-semana para que quede formato "2025-18"
        const anhoSemanaLimpio = anhoSemanaValue.trim().replace(/\s+/g, '');

        // Validar formato de año-semana (sin espacios)
        const anhoSemanaPattern = /^\d{4}-\d{1,2}$/;
        if (!anhoSemanaPattern.test(anhoSemanaLimpio)) {
          invalidRowsCount++;
          invalidRows.push({
            fila: i + 1,
            banco: row[3] || 'Desconocido',
            valor: `Año-semana: ${anhoSemanaValue} -> ${anhoSemanaLimpio}`,
            error: "Formato de año-semana inválido (esperado: YYYY-SS)"
          });
          console.warn(`⚠️ Fila ${i + 1}: Formato de año-semana inválido: "${anhoSemanaValue}" -> "${anhoSemanaLimpio}". Esperado: YYYY-SS`);
          continue;
        }

        // Extraer valores de tasa y monto
        const tasaValue = row[tasaColumnIndex];
        const montoValue = row[montoColumnIndex];
        
        const tasa = parseFloat(typeof tasaValue === 'string' ? tasaValue.replace(/[,$]/g, '') : tasaValue);
        const monto = parseFloat(typeof montoValue === 'string' ? montoValue.replace(/[,$]/g, '') : montoValue);
        
        if (isNaN(tasa) && isNaN(monto)) {
          invalidRowsCount++;
          invalidRows.push({
            fila: i + 1,
            banco: row[3] || 'Desconocido', // Columna que típicamente contiene el nombre del banco
            valor: `Tasa: ${tasaValue}, Monto: ${montoValue}`,
            error: "Valores numéricos inválidos"
          });
          console.warn(`⚠️ Fila ${i + 1}: Valores inválidos para banco. Se omite.`);
          continue;
        }

        // Crear el objeto de datos con año-semana sin espacios
        const dataObject = {
          anho_semana: anhoSemanaLimpio, // Usar el valor limpio sin espacios
          tasa_cred_com_odinario_31_365: isNaN(tasa) ? 0 : tasa,
          monto_cred_com_odinario_31_365: isNaN(monto) ? 0 : monto,
        };

        transformedData.push(dataObject);
        validRowsCount++;
        
        console.log(`✅ Procesado: ${anhoSemanaLimpio} - Banco: ${row[3] || 'N/A'} - Tasa: ${dataObject.tasa_cred_com_odinario_31_365}%, Monto: ${dataObject.monto_cred_com_odinario_31_365.toLocaleString()}`);
      }
    }

    if (transformedData.length === 0) {
      const errorMsg = {
        type: 'error',
        title: '❌ Sin Datos de Bancos Comerciales',
        description: 'No se encontraron datos válidos de bancos comerciales para 31-365 días.',
        details: [
          `📊 Estadísticas:`,
          `   • Filas procesadas: ${excelArray.length}`,
          `   • Registros válidos: ${validRowsCount}`,
          `   • Registros inválidos: ${invalidRowsCount}`,
          '',
          '🔍 Fila de referencia utilizada:',
          `   • Índice: ${targetRowIndex}`,
          `   • Contenido: ${dataRow.slice(0, 5).join(' | ')}...`,
          '',
          '💡 Solución: Verifique que el archivo contiene datos de bancos comerciales',
          dataRow,
          headerRow
        ]
      };
      console.error("VALIDACIÓN FALLIDA:", errorMsg);
      return { success: false, error: errorMsg, data: [] };
    }

    // Mostrar resumen de procesamiento
    const successMsg = {
      type: 'success',
      title: '✅ Conversión Exitosa!',
      description: `Se procesaron ${validRowsCount} registros de bancos comerciales para crédito ordinario 31-365 días.`,
      details: [
        `📊 Resumen del procesamiento:`,
        `   • Registros válidos procesados: ${validRowsCount}`,
        `   • Registros inválidos omitidos: ${invalidRowsCount}`,
        `   • Total de registros generados: ${transformedData.length}`,
        `   • Eficiencia: ${validRowsCount > 0 ? ((validRowsCount / (validRowsCount + invalidRowsCount)) * 100).toFixed(1) : 0}%`,
        '',
       
      ]
    };

    console.log(successMsg);

    if (invalidRowsCount > 0) {
      console.warn(`⚠️ ADVERTENCIA: Se omitieron ${invalidRowsCount} registros con errores:`);
      invalidRows.forEach(row => {
        console.warn(`   • Fila ${row.fila} (${row.banco}): ${row.error} (${row.valor})`);
      });
    }

    // Mostrar una muestra de los registros procesados
    console.log("📋 MUESTRA DE REGISTROS PROCESADOS:");
    transformedData.slice(0, 3).forEach((record, index) => {
      console.log(`   ${index + 1}. ${JSON.stringify(record)}`);
    });

    return { 
      success: true, 
      data: transformedData, 
      message: successMsg,
      warnings: invalidRowsCount > 0 ? {
        type: 'warning',
        title: '⚠️ Advertencias',
        description: `Se omitieron ${invalidRowsCount} registros con errores.`,
        details: invalidRows.map(row => `Fila ${row.fila} (${row.banco}): ${row.error} (${row.valor})`)
      } : null
    };
    
  } catch (error) {
    const enhancedError = {
      type: 'error',
      title: '🚨 Error Crítico',
      description: 'Ha ocurrido un error inesperado durante la conversión.',
      details: [
        `💥 Error: ${error.message}`,
        '',
        '📞 Soporte: Si el problema persiste, contacte al administrador del sistema.',
        `🕐 Timestamp: ${new Date().toLocaleString()}`
      ]
    };
    
    console.error("❌ ERROR CRÍTICO:", enhancedError);
    return { success: false, error: enhancedError, data: [] };
  }
}
