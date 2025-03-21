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
    (data) => data.agrupaORMercado === agente
  );
  return resultArray.map((data) => ({
    ...data,
    Mes: month,
    Anho: year,
  }));
}

export function convertirSTN(sheetName, excelArray, dataArray2) {

  console.log({ excelArray });
  console.log({ sheetName });
  console.log({ dataArray2 });

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
  
  // Encontrar índice de la fila con encabezados de las columnas
  const headerRowIndex = excelArray.findIndex(row => 
    row.includes("Año semana")
  );
  
  if (headerRowIndex === -1) {
    console.error("No se pudo encontrar la fila de encabezados.");
    return [];
  }
  
  // Los datos comienzan justo después de la fila de encabezados
  const dataStartIndex = headerRowIndex + 1;
  
  // Procesamos los datos hasta encontrar una fila vacía o inválida
  const transformedData = [];
  
  for (let i = dataStartIndex; i < excelArray.length; i++) {
    const row = excelArray[i];
    
    // Verificar si es una fila de datos válida (debe tener año-semana)
    if (!row[0] || row[0].trim() === '') {
      continue; // Saltamos filas vacías
    }
    
    // Crear un objeto con la estructura que necesita la base de datos
    const dataObject = {
      anho_semana: row[0], // "2025-08"
      tasa__cred_com_preferencial_o_corporativo: parseFloat(row[4] || 0),
      monto__cred_com_preferencial_o_corporativo: parseFloat((row[5] || "0").replace(/[,$]/g, "")),

    };
    
    transformedData.push(dataObject);
  }
  
  console.log(`Conversión completada. Se procesaron ${transformedData.length} registros.`);
  return transformedData;
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
    if (header === "Tasa (%)") {
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
      indices[montoKey] = i + 1;
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
