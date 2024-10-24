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
  ene: 1, jan: 1,
  feb: 2, feb: 2,
  mar: 3, mar: 3,
  abr: 4, apr: 4,
  may: 5, may: 5,
  jun: 6, jun: 6,
  jul: 7, jul: 7,
  ago: 8, aug: 8,
  sep: 9, sep: 9,
  oct: 10, oct: 10,
  nov: 11, nov: 11,
  dic: 12, dec: 12
};

function mesANumeroTresWords(mes){
  const primerPalabra = mes.split(' ')[0].toUpperCase();
  const mesSinEspacios = primerPalabra.toUpperCase().replace(/\s/g, "");
  const equivalencias = {
    "ENE": 1,
    "FEB": 2,
    "MAR": 3,
    "ABR": 4,
    "MAY": 5,
    "JUN": 6,
    "JUL": 7,
    "AGO": 8,
    "SEP": 9,
    "OCT": 10,
    "NOV": 11,
    "DIC": 12,
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
  const totalRowIndex = excelArray.findIndex(row => row.includes("NIVEL"));
  const valuesRowIndex = excelArray.findIndex(row => row.includes("TOTAL"));

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
    if (typeof cellValue === 'string' && cellValue.includes("(pr")) {
      // Extraer año y mes del título de la columna
      const yearAndMonthMatch = cellValue.match(/([A-Za-z]+)-(\d+) \(pr/);

      if (yearAndMonthMatch) {
        const mes = yearAndMonthMatch[1];
        let anho = yearAndMonthMatch[2];
        // Asegúrate de que el año tenga 4 dígitos
        anho = anho.length === 2 ? '20' + anho : anho;

  
        var obj = {};
        obj["Año"] =anho
        obj["Mes"] = mesANumeroTresWords(mes), // Suponiendo que tienes una función `mesANumero` que convierte el nombre del mes a número;
        obj["Tipo"] = "pr";
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
  console.log('first')
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
console.log('year')
  var resultArray = excelArray.filter((data) => data.agrupaORMercado === agente);
  return resultArray.map((data) => ({
    ...data,
    Mes: month,
    Anho: year
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
        console.log('first2');
        excelArray.forEach((row) => {
          // Código para el caso "Deltas Jun-2023"
          let lastValueIndex = row.lastIndexOf("") - 2;
          if (lastValueIndex < 0) {
            lastValueIndex = row.length - 1;
          }
          console.log(row);
          // Eliminar todos los espacios en blanco del texto
          const normalizedText = row[0].replace(/\s+/g, '');
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
            resultObject.cargo_nivel_de_tension_cd4_cop_kwh =
              cellValue;

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
              if (rowIndex + 1 < excelArray.length) { // Verifica que no se exceda el límite del array
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

  resultObject.Agente ='EGVD'
  return resultObject;
}

export function convertirBanRepTco(excelArray) {
    // Encontrar índice de la fila con encabezados de las columnas
    const headerRowIndex = excelArray.findIndex(row => row[0] === 'Año(aaaa)-Semana(ss)');

    // Encontrar índice de la fila con nombres de categorías financieras
    const subHeaderRowIndex = excelArray.findIndex(row => row.includes('Crédito de consumo'));

    if (headerRowIndex === -1 || subHeaderRowIndex === -1) {
        console.error('No se pudieron encontrar las filas de encabezados.');
        return [];
    }
    const dataStartIndex = headerRowIndex + 1;  // Los datos comienzan justo después de la fila de encabezados

    let lastValidIndex = dataStartIndex;
    for (let i = dataStartIndex; i < excelArray.length; i++) {
        if (excelArray[i][0] && (excelArray[i][0].startsWith('19') || excelArray[i][0].startsWith('20'))) { // Asumiendo que los años comienzan con '20'
            lastValidIndex = i;
        } else {
            break;  // Deja de leer más filas si encuentra una fila sin un año válido
        }
    }

    const headers = excelArray[headerRowIndex];
    const subHeaders = excelArray[subHeaderRowIndex];
    const indices = {
      anho_semana: headers.indexOf('Año(aaaa)-Semana(ss)'),
  };
  
  headers.forEach((header, index) => {
    if (header === 'Tasa %') {
        let subCategory = subHeaders[index];
        // Reemplazar espacios en subCategory por guiones bajos
        subCategory = subCategory.replace(/ /g, '_');

        // Asignar el índice de la tasa y automáticamente asignar el monto de la columna siguiente
        indices[`tasa_${subCategory}`] = index;
        indices[`monto_${subCategory}`] = index + 1;  // Asume que el 'Monto' siempre está inmediatamente después de la 'Tasa %'
    }
});


  // Procesar filas de datos que comienzan justo después de los headers y subheaders
  const dataRows = excelArray.slice(headerRowIndex + 1);

  var transformedData = [];
  // Ejemplo de cómo se podrían utilizar estos índices para mapear los datos
// Ejemplo de cómo se podrían utilizar estos índices para mapear los datos
for (let i = dataStartIndex; i <= lastValidIndex; i++) {
  const row = excelArray[i];
  transformedData.push({
      anho_semana: row[0],
      tasa_cred_com_credito_consumo: parseFloat(row[1]),
      monto_cred_com_credito_consumo: parseFloat(row[2].replace(/[$,]/g, '')),
      tasa_cred_com_odinario: parseFloat(row[3]),
      monto_cred_com_odinario: parseFloat(row[4].replace(/[$,]/g, '')),
      tasa__cred_com_preferencial_o_corporativo: parseFloat(row[5]),
      monto__cred_com_preferencial_o_corporativo: parseFloat(row[6].replace(/[$,]/g, '')),
      tasa__cred_com_tesoreria: parseFloat(row[7]),
      monto__cred_com_tesoreria: parseFloat(row[8].replace(/[$,]/g, '')),
      tasa_colocacion_banco_republica: parseFloat(row[9]),
      monto_colocacion_banco_republica: parseFloat(row[10].replace(/[$,]/g, '')),
      tasa_colocacion_sin_tesoreria: parseFloat(row[11]),
      monto_colocacion_sin_tesoreria: parseFloat(row[12].replace(/[$,]/g, '')),
      tasa_colocacion_total: parseFloat(row[13]),
      monto_colocacion_total: parseFloat(row[14].replace(/[$,]/g, ''))
  });
}

    
    return transformedData;
}

export function convertirBanRepTcap(excelArray) {
  // Encontrar índice de la fila con encabezados de las columnas
  const headerRowIndex = excelArray.findIndex(row => row[0] === 'Fecha(dd/mm/aaaa)');

  // Encontrar índice de la fila con nombres de categorías financieras
  const subHeaderRowIndex = excelArray.findIndex(row => row.includes('A 30 días'));

  if (headerRowIndex === -1 || subHeaderRowIndex === -1) {
      console.error('No se pudieron encontrar las filas de encabezados.');
      return [];
  }
  const dataStartIndex = headerRowIndex + 1;  // Los datos comienzan justo después de la fila de encabezados

  let lastValidIndex = dataStartIndex;
  for (let i = dataStartIndex; i < excelArray.length; i++) {
      if (excelArray[i][0] && (excelArray[i][0].startsWith('0') || excelArray[i][0].startsWith('1')|| excelArray[i][0].startsWith('2')|| excelArray[i][0].startsWith('3'))) { // Asumiendo que los años comienzan con '20'
          lastValidIndex = i;
      } else {
          break;  // Deja de leer más filas si encuentra una fila sin un año válido
      }
  }

  const headers = excelArray[headerRowIndex];
  const subHeaders = excelArray[subHeaderRowIndex];
  const indices = {
    fecha: headers.indexOf('Fecha(dd/mm/aaaa)'),
};

headers.forEach((header, index) => {
  if (header === 'Tasa %') {
      let subCategory = subHeaders[index];
      // Reemplazar espacios en subCategory por guiones bajos
      subCategory = subCategory.replace(/ /g, '_');

      // Asignar el índice de la tasa y automáticamente asignar el monto de la columna siguiente
      indices[`tasa_${subCategory}`] = index;
      indices[`monto_${subCategory}`] = index + 1;  // Asume que el 'Monto' siempre está inmediatamente después de la 'Tasa %'
  }
});



var transformedData = [];

// Ejemplo de cómo se podrían utilizar estos índices para mapear los datos
// Ejemplo de cómo se podrían utilizar estos índices para mapear los datos
for (let i = dataStartIndex; i <= lastValidIndex; i++) {
const row = excelArray[i];
transformedData.push({
    fecha: row[0],
    tasa_a_30_cdt_bancos_comerciales: parseFloat(row[1]),
    monto_a_30_cdt_bancos_comerciales: parseFloat(row[2].replace(/[$,]/g, '')),
    tasa_entre_31_y_44_cdt_bancos_comerciales: parseFloat(row[3]),
    monto_entre_31_y_44_cdt_bancos_comerciales: parseFloat(row[4].replace(/[$,]/g, '')),
    tasa_a_45_cdt_bancos_comerciales: parseFloat(row[5]),
    monto_a_45_cdt_bancos_comerciales: parseFloat(row[6].replace(/[$,]/g, '')),
    tasa_entre_46_y_59_cdt_bancos_comerciales: parseFloat(row[7]),
    monto_entre_46_y_59_cdt_bancos_comerciales: parseFloat(row[8].replace(/[$,]/g, '')),
    tasa_a_60_cdt_bancos_comerciales: parseFloat(row[9]),
    monto_a_60_cdt_bancos_comerciales: parseFloat(row[10].replace(/[$,]/g, '')),
    tasa_entre_61_y_89_cdt_bancos_comerciales: parseFloat(row[11]),
    monto_entre_61_y_89_cdt_bancos_comerciales: parseFloat(row[12].replace(/[$,]/g, '')),
    tasa_a_90_cdt_bancos_comerciales: parseFloat(row[13]),
    monto_a_90_cdt_bancos_comerciales: parseFloat(row[14].replace(/[$,]/g, '')),
    tasa_entre_91_y_119_cdt_bancos_comerciales: parseFloat(row[15]),
    monto_entre_91_y_119_cdt_bancos_comerciales: parseFloat(row[16].replace(/[$,]/g, '')),
    tasa_a_120_cdt_bancos_comerciales: parseFloat(row[17]),
    monto_a_120_cdt_bancos_comerciales: parseFloat(row[18].replace(/[$,]/g, '')),
    tasa_entre_121_y_179_cdt_bancos_comerciales: parseFloat(row[19]),
    monto_entre_121_y_179_cdt_bancos_comerciales: parseFloat(row[20].replace(/[$,]/g, '')),
    tasa_a_180_cdt_bancos_comerciales: parseFloat(row[21]),
    monto_a_180_cdt_bancos_comerciales: parseFloat(row[22].replace(/[$,]/g, '')),
    tasa_entre_181_y_359_cdt_bancos_comerciales: parseFloat(row[23]),
    monto_entre_181_y_359_cdt_bancos_comerciales: parseFloat(row[24].replace(/[$,]/g, '')),
    tasa_a_360_cdt_bancos_comerciales: parseFloat(row[25]),
    monto_a_360_cdt_bancos_comerciales: parseFloat(row[26].replace(/[$,]/g, '')),
    tasa_superiores_a_360_cdt_bancos_comerciales: parseFloat(row[27]),
    monto_superiores_a_360_cdt_bancos_comerciales: parseFloat(row[28].replace(/[$,]/g, '')),
    tasa_cap_cdt_red_de_oficinas_cdt_bancos_comerciales: parseFloat(row[29]),
    monto_cap_cdt_red_de_oficinas_cdt_bancos_comerciales: parseFloat(row[30].replace(/[$,]/g, '')),
    tasa_cap_cdt_por_tesoreria_cdt_bancos_comerciales: parseFloat(row[31]),
    monto_cap_cdt_por_tesoreria_cdt_bancos_comerciales: parseFloat(row[32].replace(/[$,]/g, '')),
    tasa_entre_2_y_14_cdats_cdat_bancos_comerciales: parseFloat(row[33]),
    monto_entre_2_y_14_cdats_cdat_bancos_comerciales: parseFloat(row[34].replace(/[$,]/g, '')),
    tasa_entre_15_y_29_cdats_cdat_bancos_comerciales: parseFloat(row[35]),
    monto_entre_15_y_29_cdat_bancos_comerciales: parseFloat(row[36].replace(/[$,]/g, '')),
   tasa_a_30_cdats_cdat_bancos_comerciales: parseFloat(row[37]),
    monto_a_30_cdat_bancos_comerciales: parseFloat(row[38].replace(/[$,]/g, '')),
    tasa_entre_31_y_90_cdats_cdat_bancos_comerciales: parseFloat(row[39]),
    monto_entre_31_y_90_cdat_bancos_comerciales: parseFloat(row[40].replace(/[$,]/g, '')),
    tasa_entre_91_y_180_cdats_cdat_bancos_comerciales: parseFloat(row[41]),
    monto_entre_91_y_180_cdat_bancos_comerciales: parseFloat(row[42].replace(/[$,]/g, '')),
    tasa_de_181_en_adelante_cdats_cdat_bancos_comerciales: parseFloat(row[43]),
    monto_de_181_en_adelante_cdats_cdat_bancos_comerciales: parseFloat(row[44].replace(/[$,]/g, '')),
    tasa_cap_cdat_oficinas_cdat_bancos_comerciales: parseFloat(row[45]),
    monto_cap_cdat_oficinas_cdat_bancos_comerciales: parseFloat(row[46].replace(/[$,]/g, ''))
});
}

  
  return transformedData;
}
