const Usuario = require("../models/Usuario");
const Afac = require("../models/Afac");
const Data_empresa = require("../models/Data_empresa");
const Data_xm_afac = require("../models/Data_xm_afac");
const Data_xm_adem = require("../models/Data_xm_adem");
const Data_xm_dspctto = require("../models/Data_xm_dspctto");
const Data_xm_tserv = require("../models/Data_xm_tserv");
const Data_xm_trsm = require("../models/Data_xm_trsm");
const Data_xm_str = require("../models/Data_xm_str");
const Data_xm_stn = require("../models/Data_xm_stn");
const Data_creg_cx = require("../models/Data_creg_cx");
const Data_dane = require("../models/Data_dane");
const Data_mme_validacion = require("../models/Data_mme_validacion");
const Data_mme_giro = require("../models/Data_mme_giro");
const Data_banrepublica_tco = require("../models/Data_banrepublica_tco");
const Data_banrepublica_tcap = require("../models/Data_banrepublica_tcap");
const Res_componentes_cu_tarifa = require("../models/Res_componentes_cu_tarifa");
const Data_xm_guatape = require("../models/Data_xm_guatape");
const Data_xm_cprog = require("../models/Data_xm_cprog");
const Data_xm_ipr = require("../models/Data_xm_ipr");
const Data_xm_d015 = require("../models/Data_xm_d015");
const Data_xm_dtun = require("../models/Data_xm_dtun");
const Data_empresa_anual = require("../models/Data_empresa_anual");
const Data_empresa_garantia = require("../models/Data_empresa_garantia");

const Data_xm_trsd = require("../models/Data_xm_trsd");
const Data_empresa_agpe = require("../models/Data_empresa_agpe");
const Dataempresamessin = require("../models/Dataempresamessin.js");
const Data_dane_ipp = require("../models/Data_dane_ipp.js");
const Data_dane_ipc = require("../models/Data_dane_ipc.js");
const DataFormato9SSPD = require("../models/DataFormato9SSPD");
const DataFormulario1SSPD = require("../models/DataFormulario1SSPD");
const DataFormato2SSPD = require("../models/DataFormato2SSPD");
const DataFormato3SSPD = require("../models/DataFormato3SSPD");

const DataFormulario5SSPD = require("../models/DataFormulario5SSPD");
const DataFormato6SSPD = require("../models/DataFormato6SSPD");

const Data_Formato_7_SSPDs = require("../models/Data_Formato_7_SSPDs");
const Data_empresa_EnergiaContratoAtipico = require("../models/Data_empresa_EnergiaContratoAtipico");

const { Op, where, col, literal } = require("sequelize");
const { Sequelize } = require("sequelize");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { afterCreate } = require("../models/Usuario");

require("dotenv").config();

const crearToken = (usuario, secreta, expiresIn) => {
  const { id, email, nombre, apellido, empresa } = usuario;
  return jwt.sign({ id, email, nombre, apellido, empresa }, secreta, {
    expiresIn,
  });
};
function roundToTwo(num) {
  return +(Math.round(num + "e+5") + "e-5");
}
const realizarConsultaPaginada = async (
  modelo,
  opciones,
  condicionesAdicionales = {},
  joinConditions = [], // Nuevo parámetro para JOINs adicionales
  sqlRaw = null
) => {
  const {
    page,
    limit,
    searchText,
    sortOrder,
    sortField,
    searchOptions,
    exportarTodos,
    exportarTodosPdf,
    filters = {},
  } = opciones;

  let useSQLRaw = false;
  let offset, limitQuery;
  if (exportarTodos) {
    offset = null;
    limitQuery = null;
  } else if (exportarTodosPdf) {
    offset = page;
    limitQuery = limit;
  } else {
    offset = (page - 1) * limit;
    limitQuery = limit;
  }

  const searchAnho = searchOptions.some(
    (option) => option.field === "anho" && option.search
  );
  const searchMes = searchOptions.some(
    (option) => option.field === "mes" && option.search
  );

  const searchTermRaw = searchText.trim();
  const searchTerm = `%${searchTermRaw}%`;

  let orConditions = [];
  let combinedSearchCondition = null;

  // Lógica para búsqueda combinada 'mes-anho'
  if (searchAnho && searchMes && searchTermRaw.match(/^\d{1,2}-\d{4}$/)) {
    combinedSearchCondition = Sequelize.where(
      Sequelize.fn(
        "concat",
        Sequelize.col(`${modelo.name}.mes`),
        "-",
        Sequelize.col(`${modelo.name}.anho`)
      ),
      { [Op.iLike]: searchTerm }
    );
  } else {
    // Lógica para búsqueda OR en otros campos
    searchOptions.forEach((option) => {
      if (option.search && option.field !== "mes" && option.field !== "anho") {
        let qualifiedField = option.field;
        if (["id", "mes", "anho"].includes(option.field)) {
          qualifiedField = `${modelo.name}.${option.field}`; // Calificar con el nombre del modelo
        }

        switch (option.type) {
          case "text":
            orConditions.push({
              [qualifiedField]: { [Op.iLike]: searchTerm },
            });
            break;
          case "number":
            orConditions.push(
              Sequelize.where(
                Sequelize.cast(Sequelize.col(qualifiedField), "text"),
                { [Op.iLike]: searchTerm }
              )
            );
            break;
          case "date":
            orConditions.push(
              Sequelize.where(
                Sequelize.cast(Sequelize.col(qualifiedField), "text"),
                { [Op.iLike]: searchTerm }
              )
            );
            break;
          // Agrega más casos si es necesario para otros tipos de datos
        }
      }
    });
  }

  // Asegurándose de que `filters` sea un arreglo
  const filtersArray = Array.isArray(filters) ? filters : [];

  const filterConditions = filtersArray.reduce((acc, filter) => {
    // Aquí asumimos que `valores` es un arreglo de valores por los que quieres filtrar
    // y `campo` es el nombre del campo por el cual filtrar.
    if (filter.valores && filter.valores.length > 0) {
      // Puedes necesitar ajustar esta lógica dependiendo de cómo quieras aplicar los filtros
      // Por ejemplo, si quieres filtrar por múltiples valores (usando `IN` en SQL)
      acc[filter.campo] = { [Sequelize.Op.in]: filter.valores };
    }
    return acc;
  }, {});

  let whereConditions = { ...condicionesAdicionales, ...filterConditions };

  // Combinar búsqueda combinada 'mes-anho' y OR
  if (combinedSearchCondition) {
    whereConditions[Op.and] = [combinedSearchCondition];
  }
  if (orConditions.length > 0) {
    if (whereConditions[Op.and]) {
      whereConditions[Op.and].push({ [Op.or]: orConditions });
    } else {
      whereConditions[Op.or] = orConditions;
    }
  }

  // Lógica para ordenamiento

  const order = [];

  // Establece un ordenamiento predeterminado por `anho` y `mes`
  // solo si no se ha especificado un campo de ordenamiento.
  if (!sortField) {
    // Asegúrate de agregar el ordenamiento predeterminado solo si las columnas existen en el modelo
    if (modelo.rawAttributes.anho && modelo.rawAttributes.mes) {
      order.push([Sequelize.literal(`"${modelo.name}"."anho"`), "DESC"]);
      order.push([Sequelize.literal(`"${modelo.name}"."mes"`), "DESC"]);
    }
  }

  if (sortField) {
    // Asumiendo que 'sortField' es el nombre del campo por el cual ordenar
    let isRelatedField = false;

    // Intenta encontrar una condición de join que incluya el campo 'sortField' en sus atributos
    joinConditions.forEach((condition) => {
      if (condition.attributes && condition.attributes.includes(sortField)) {
        isRelatedField = true;
        order.push([
          { model: condition.model, as: condition.as },
          sortField,
          sortOrder.toUpperCase() === "DESCEND" ? "DESC" : "ASC",
        ]);
      }
    });

    // Si 'sortField' no es un campo de un modelo relacionado, se asume que es del modelo principal
    if (!isRelatedField) {
      // Aquí necesitas asegurarte de que 'modelo.name' se refiere correctamente al nombre de la tabla del modelo principal
      order.push([
        Sequelize.literal(`"${modelo.name}"."${sortField}"`),
        sortOrder?.toUpperCase() === "DESCEND" ? "DESC" : "ASC",
      ]);
    }
  }

  // Verifica si algún filtro requiere SQL raw
  filtersArray.forEach((filter) => {
    const relacionado = joinConditions.some((join) => join.as === filter.campo);
    if (relacionado) {
      useSQLRaw = true;
    }
  });
  var resultado;
  if (useSQLRaw) {
    // Asegúrate de que sqlRaw incluye tanto queryDatos como queryConteo
    if (sqlRaw && sqlRaw.queryDatos && sqlRaw.queryConteo) {
      // Ejecutar la consulta SQL raw para obtener los datos
      const resultadosDatos = await ejecutarConsultaSQLRaw(
        sqlRaw.queryDatos.query,
        sqlRaw.queryDatos.parametros
      );

      // Ejecutar la consulta SQL raw para obtener el conteo
      const resultadosConteo = await ejecutarConsultaSQLRaw(
        sqlRaw.queryConteo.query,
        sqlRaw.queryConteo.parametros
      );

      // Asumiendo que la consulta de conteo devuelve un resultado con un campo "count"
      const totalRegistros = resultadosConteo[0]
        ? resultadosConteo[0].count
        : 0;

      // Ajusta el resultado para que coincida con la estructura esperada
      resultado = {
        rows: resultadosDatos,
        count: totalRegistros,
      };
    } else {
      // Manejo de error o lógica alternativa si las consultas SQL raw no están correctamente definidas
      throw new Error(
        "Las consultas SQL raw para datos y conteo no están definidas correctamente."
      );
    }
  } else {
    resultado = await modelo.findAndCountAll({
      where: whereConditions,
      include: joinConditions, // Usar las condiciones de JOIN aquí
      order: order,
      offset: offset,
      limit: limitQuery,
    });
  }
  // Realizar la consulta con Sequelize

  const {
    camposFiltrables = [], // Extraer campos filtrables de las opciones
    ...restoOpciones
  } = opciones;

  // Lógica para obtener los valores filtrables
  let valoresFiltrables = [];
  if (camposFiltrables && camposFiltrables.length > 0) {
    const valoresFiltrablesPromesas = camposFiltrables.map(async (campo) => {
      const valores = await modelo.aggregate(campo, "DISTINCT", {
        plain: false,
        where: condicionesAdicionales,
        include: joinConditions,
      });

      return {
        campo,
        valores: [
          ...new Set(
            valores.map((v) => {
              if (v.DISTINCT && typeof v.DISTINCT === "string") {
                const parts = v.DISTINCT.split(",");
                return parts.length > 1
                  ? parts[2].replace(/"/g, "").replace(")", "")
                  : parts[0].replace(/"/g, "");
              } else {
                return v.DISTINCT;
              }
            })
          ),
        ],
      };
    });
    valoresFiltrables = await Promise.all(valoresFiltrablesPromesas);
  }

  return {
    records: resultado.rows,
    totalRecords: resultado.count,
    valoresFiltrables, // Agregar los valores filtrables al objeto de retorno
  };
};

const resolvers = {
  Query: {
    //Toma un token
    obtenerUsuario: async (_, {}, ctx) => {
      //Toma toda la cadena y revisa que sea valida
      // const usuarioId = await jwt.verify(token,process.env.SECRETA);
      // return usuarioId;
      return ctx.usuario;
    },
    obtenerAfac: async () => {
      try {
        const afac = await Afac.findAll();
        return afac;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerData_empresa: async () => {
      try {
        const data_empresa = await Data_empresa.findAll();

        return data_empresa;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerData_xm_afac: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        return realizarConsultaPaginada(
          Data_xm_afac,
          options,
          condicionesEmpresa
        );
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },
    obtenerData_xm_adem: async () => {
      try {
        const data_xm_adem = await Data_xm_adem.findAll();
        return data_xm_adem;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerData_xm_dspctto: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };

        return realizarConsultaPaginada(
          Data_xm_dspctto,
          options,
          condicionesEmpresa
        );
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },
    //Query
    obtenerData_xm_trsm: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        return realizarConsultaPaginada(
          Data_xm_trsm,
          options,
          condicionesEmpresa
        );
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },
    obtenerData_xm_tserv: async () => {
      try {
        const data_xm_tserv = await Data_xm_tserv.findAll();
        return data_xm_tserv;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerData_creg_cx: async () => {
      try {
        const data_creg_cx = await Data_creg_cx.findAll();
        return data_creg_cx;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerData_dane: async () => {
      try {
        const data_dane = await Data_dane.findAll();
        return data_dane;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerData_banrepublica_tco: async () => {
      try {
        const data_banrepublica_tco = await Data_banrepublica_tco.findAll();
        return data_banrepublica_tco;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerData_banrepublica_tcap: async () => {
      try {
        const data_banrepublica_tcap = await Data_banrepublica_tcap.findAll();
        return data_banrepublica_tcap;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerRes_componentes_cu_tarifa: async () => {
      try {
        const res_componentes_cu_tarifa =
          await Res_componentes_cu_tarifa.findAll();
        return res_componentes_cu_tarifa;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_creg_cx: async () => {
      try {
        const data_creg_cx = await Data_creg_cx.findAll();
        return data_creg_cx;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_banrepublica_tcap: async () => {
      try {
        const data_banrepublica_tcap = await Data_banrepublica_tcap.findAll();
        return data_banrepublica_tcap;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerData_banrepublica_tco: async () => {
      try {
        const data_banrepublica_tco = await Data_banrepublica_tco.findAll();
        return data_banrepublica_tco;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_mme_validacion: async () => {
      try {
        const data_mme_validacion = await Data_mme_validacion.findAll();
        return data_mme_validacion;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_mme_giro: async () => {
      try {
        const data_mme_giro = await Data_mme_giro.findAll();
        return data_mme_giro;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerRes_componentes_cu_tarifa: async () => {
      try {
        const res_componentes_cu_tarifa =
          await Res_componentes_cu_tarifa.findAll();
        return res_componentes_cu_tarifa;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerRes_componentes_cu_tarifa: async () => {
      try {
        const res_componentes_cu_tarifa =
          await Res_componentes_cu_tarifa.findAll();
        return res_componentes_cu_tarifa;
      } catch (error) {
        console.log(error);
      }
    },
    //Query

    //Query
    //Query
    obtenerData_xm_guatape: async () => {
      try {
        const data_xm_guatape = await Data_xm_guatape.findAll();
        return data_xm_guatape;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_xm_cprog: async () => {
      try {
        const data_xm_cprog = await Data_xm_cprog.findAll();
        return data_xm_cprog;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_xm_ipr: async () => {
      try {
        const data_xm_ipr = await Data_xm_ipr.findAll();
        return data_xm_ipr;
      } catch (error) {
        console.log(error);
      }
    },

    //Query
    obtenerData_xm_d015: async () => {
      try {
        const data_xm_d015 = await Data_xm_d015.findAll();
        return data_xm_d015;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_xm_dtun: async () => {
      try {
        const data_xm_dtun = await Data_xm_dtun.findAll();
        return data_xm_dtun;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_empresa_anual: async () => {
      try {
        const data_empresa_anual = await Data_empresa_anual.findAll();
        return data_empresa_anual;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    //Query
    obtenerData_xm_stn: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        return realizarConsultaPaginada(
          Data_xm_stn,
          options,
          condicionesEmpresa
        );

        // var data_xm_stn = await Data_xm_stn.findAll({
        //   where: { empresa_id: ctx.usuario.empresa },
        // });

        // data_xm_stn = data_xm_stn.map((item) => ({
        //   ...item.get(), // get() es necesario para convertir el objeto Sequelize a un objeto JavaScript
        //   periodo: `${item.anho}-${item.mes}`,
        // }));

        // return data_xm_stn;
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },

    //Query
    obtenerData_xm_str: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        return realizarConsultaPaginada(
          Data_xm_str,
          options,
          condicionesEmpresa
        );
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },
    //Query
    obtenerData_empresa_garantia: async () => {
      try {
        const data_empresa_garantia = await Data_empresa_garantia.findAll();
        return data_empresa_garantia;
      } catch (error) {
        console.log(error);
      }
    },

    //Query
    obtenerData_xm_trsd: async () => {
      try {
        const data_xm_trsd = await Data_xm_trsd.findAll();
        return data_xm_trsd;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_empresa_agpe: async () => {
      try {
        const data_empresa_agpe = await Data_empresa_agpe.findAll();
        return data_empresa_agpe;
      } catch (error) {
        console.log(error);
      }
    },
    //Query
    obtenerData_empresa_agpe: async () => {
      try {
        const data_empresa_agpe = await Data_empresa_agpe.findAll();
        return data_empresa_agpe;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerDataempresamessin: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        return realizarConsultaPaginada(
          Dataempresamessin,
          options,
          condicionesEmpresa
        );
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },

    obtenerEmpresaGarantias: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // La función `realizarConsultaPaginada` sería una utilidad que implementas para manejar la paginación y el filtrado
        const resultado = await realizarConsultaPaginada(
          Data_empresa_garantia,
          options,
          condicionesEmpresa
        );
        return resultado;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },
    obtenerDataEmpresaAnual: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // La función `realizarConsultaPaginada` sería una utilidad que implementas para manejar la paginación y el filtrado
        const resultado = await realizarConsultaPaginada(
          Data_empresa_anual,
          options,
          condicionesEmpresa
        );
        return resultado;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },
    obtenerDataXmIpr: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // La función `realizarConsultaPaginada` sería una utilidad que implementas para manejar la paginación y el filtrado
        const resultado = await realizarConsultaPaginada(
          Data_xm_ipr,
          options,
          condicionesEmpresa
        );
        return resultado;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },
    obtenerDataXmD015: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // La función `realizarConsultaPaginada` sería una utilidad que implementas para manejar la paginación y el filtrado
        const resultado = await realizarConsultaPaginada(
          Data_xm_d015,
          options,
          condicionesEmpresa
        );
        return resultado;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },

    obtenerDataXmCprog: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // La función `realizarConsultaPaginada` sería una utilidad que implementas para manejar la paginación y el filtrado
        const resultado = await realizarConsultaPaginada(
          Data_xm_cprog,
          options,
          condicionesEmpresa
        );
        return resultado;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },

    obtenerResComponentesCuTarifas: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // Primero, obtenemos los resultados originales de Res_componentes_cu_tarifa
        const resultado = await realizarConsultaPaginada(
          Res_componentes_cu_tarifa,
          options,
          condicionesEmpresa
        );

        // Ahora, necesitamos agregar la información de mc desde tser
        const resultadosConMc = await Promise.all(
          resultado.records.map(async (record) => {
            let mesAnterior = record.mes - 1;
            let anhoAnterior = record.anho;
            if (mesAnterior === 0) {
              mesAnterior = 12;
              anhoAnterior = record.anho - 1;
            }

            const tserRegistro = await Data_xm_trsm.findOne({
              where: {
                anho: anhoAnterior,
                mes: mesAnterior,
                codigo: "MC",
                // Añade aquí más condiciones si son necesarias
              },
              attributes: ["codigo", "valor"], // Asumiendo que 'concepto' contiene el valor de 'mc'
            });
      

            // Añadir mc (concepto) al registro actual
            return {
              ...record.dataValues,
              mc: tserRegistro ? tserRegistro.valor : null,
            };
          })
        );

        // Actualizar el campo records del resultado con los nuevos registros que incluyen mc (concepto)
        return { ...resultado, records: resultadosConMc };
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },

    obtenerData_dane_ipp: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        return realizarConsultaPaginada(
          Data_dane_ipp,
          options,
          condicionesEmpresa
        );

        // let data_dane_ipp = await Data_dane_ipp.findAll({
        //   where: {},
        // });
        // data_dane_ipp = data_dane_ipp.map((item) => ({
        //   ...item.get(), // get() es necesario para convertir el objeto Sequelize a un objeto JavaScript
        //   periodo: `${item.anho}-${item.mes}`,
        // }));

        // return data_dane_ipp;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },
    //Query
    obtenerData_dane_ipc: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        return realizarConsultaPaginada(
          Data_dane_ipc,
          options,
          condicionesEmpresa
        );

        // let data_dane_ipc = await Data_dane_ipc.findAll({
        //   where: {},
        // });
        // data_dane_ipc = data_dane_ipc.map((item) => ({
        //   ...item.get(), // get() es necesario para convertir el objeto Sequelize a un objeto JavaScript
        //   periodo: `${item.anho}-${item.mes}`,
        // }));

        // return data_dane_ipc;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los datos de la empresa");
      }
    },
    obtenerDataXmTserv: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        return realizarConsultaPaginada(
          Data_xm_tserv,
          options,
          condicionesEmpresa
        );
      } catch (error) {
        console.log(error);
        throw new Error("No se pudieron obtener los registros");
      }
    },
    obtenerDataFormulario1SSPD: async (
      _,
      { selectedStartPeriod, selectedEndPeriod, limit, page },
      ctx
    ) => {
      try {
        const offset = (page - 1) * limit;

        const [startMonth, startYear] = selectedStartPeriod.split("-");
        const [endMonth, endYear] = selectedEndPeriod.split("-");

        const resultado = await DataFormulario1SSPD.findAndCountAll({
          where: {
            empresa_id: ctx.usuario.empresa,
            anho: {
              [Op.between]: [parseInt(startYear), parseInt(endYear)],
            },
            mes: {
              [Op.between]: [parseInt(startMonth), parseInt(endMonth)],
            },
          },
          offset: offset,
          limit: limit,
          order: [["id", "ASC"]], // Añadir esta línea para ordenar por ID de forma ascendente
        });

        const totalPages = Math.ceil(resultado.count / limit);

        return {
          registros: resultado.rows,
          totalPages: totalPages,
        };
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },
    obtenerDataFormato2SSPD: async (
      _,
      { selectedStartPeriod, selectedEndPeriod, limit, page },
      ctx
    ) => {
      try {
        const offset = (page - 1) * limit;

        const [startMonth, startYear] = selectedStartPeriod.split("-");
        const [endMonth, endYear] = selectedEndPeriod.split("-");

        const resultado = await DataFormato2SSPD.findAndCountAll({
          where: {
            empresa_id: ctx.usuario.empresa,
            anho: {
              [Op.between]: [parseInt(startYear), parseInt(endYear)],
            },
            mes: {
              [Op.between]: [parseInt(startMonth), parseInt(endMonth)],
            },
          },
          offset: offset,
          limit: limit,
          order: [["id", "ASC"]], // Añadir esta línea para ordenar por ID de forma ascendente
        });

        const totalPages = Math.ceil(resultado.count / limit);

        return {
          registros: resultado.rows,
          totalPages: totalPages,
        };
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },
    obtenerDataFormato3SSPD: async (
      _,
      { selectedStartPeriod, selectedEndPeriod, limit, page },
      ctx
    ) => {
      try {
        const offset = (page - 1) * limit;

        const [startMonth, startYear] = selectedStartPeriod.split("-");
        const [endMonth, endYear] = selectedEndPeriod.split("-");

        const resultado = await DataFormato3SSPD.findAndCountAll({
          where: {
            empresa_id: ctx.usuario.empresa,
            anho: {
              [Op.between]: [parseInt(startYear), parseInt(endYear)],
            },
            mes: {
              [Op.between]: [parseInt(startMonth), parseInt(endMonth)],
            },
          },
          offset: offset,
          limit: limit,
          order: [["id", "ASC"]], // Añadir esta línea para ordenar por ID de forma ascendente
        });

        const totalPages = Math.ceil(resultado.count / limit);

        return {
          registros: resultado.rows,
          totalPages: totalPages,
        };
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },

    obtenerDataFormulario5SSPD: async (
      _,
      { selectedStartPeriod, selectedEndPeriod, limit, page },
      ctx
    ) => {
      try {
        const offset = (page - 1) * limit;

        const [startMonth, startYear] = selectedStartPeriod.split("-");
        const [endMonth, endYear] = selectedEndPeriod.split("-");

        const resultado = await DataFormulario5SSPD.findAndCountAll({
          where: {
            empresa_id: ctx.usuario.empresa,
            anho: {
              [Op.between]: [parseInt(startYear), parseInt(endYear)],
            },
            mes: {
              [Op.between]: [parseInt(startMonth), parseInt(endMonth)],
            },
          },
          offset: offset,
          limit: limit,
          order: [["id", "ASC"]], // Añadir esta línea para ordenar por ID de forma ascendente
        });

        const totalPages = Math.ceil(resultado.count / limit);

        return {
          registros: resultado.rows,
          totalPages: totalPages,
        };
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },
    obtenerDataFormato6SSPD: async (
      _,
      { selectedStartPeriod, selectedEndPeriod, limit, page },
      ctx
    ) => {
      try {
        const offset = (page - 1) * limit;

        const [startMonth, startYear] = selectedStartPeriod.split("-");
        const [endMonth, endYear] = selectedEndPeriod.split("-");

        const resultado = await DataFormato6SSPD.findAndCountAll({
          where: {
            empresa_id: ctx.usuario.empresa,
            anho: {
              [Op.between]: [parseInt(startYear), parseInt(endYear)],
            },
            mes: {
              [Op.between]: [parseInt(startMonth), parseInt(endMonth)],
            },
          },
          offset: offset,
          limit: limit,
          order: [["id", "ASC"]], // Añadir esta línea para ordenar por ID de forma ascendente
        });

        const totalPages = Math.ceil(resultado.count / limit);

        return {
          registros: resultado.rows,
          totalPages: totalPages,
        };
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },
    obtenerDataFormato9SSPD: async (
      _,
      { selectedStartPeriod, selectedEndPeriod, limit, page },
      ctx
    ) => {
      try {
        const offset = (page - 1) * limit;

        const [startMonth, startYear] = selectedStartPeriod.split("-");
        const [endMonth, endYear] = selectedEndPeriod.split("-");

        const resultado = await DataFormato9SSPD.findAndCountAll({
          where: {
            empresa_id: ctx.usuario.empresa,
            anho: {
              [Op.between]: [parseInt(startYear), parseInt(endYear)],
            },
            mes: {
              [Op.between]: [parseInt(startMonth), parseInt(endMonth)],
            },
          },
          offset: offset,
          limit: limit,
          order: [["id", "ASC"]], // Añadir esta línea para ordenar por ID de forma ascendente
        });

        const totalPages = Math.ceil(resultado.count / limit);

        return {
          registros: resultado.rows,
          totalPages: totalPages,
        };
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },

    obtenerDataFormato7SSPDs: async (
      _,
      { selectedStartPeriod, selectedEndPeriod, limit, page },
      ctx
    ) => {
      try {
        const offset = (page - 1) * limit;

        const [startMonth, startYear] = selectedStartPeriod.split("-");
        const [endMonth, endYear] = selectedEndPeriod.split("-");
console.log('startYear', ctx.usuario.empresa);

        const resultado = await Data_Formato_7_SSPDs.findAndCountAll({
          where: {
            empresa_id: ctx.usuario.empresa,
            anho: {
              [Op.between]: [parseInt(startYear), parseInt(endYear)],
            },
            mes: {
              [Op.between]: [parseInt(startMonth), parseInt(endMonth)],
            },
          },
          offset: offset,
          limit: limit,
          order: [["id", "ASC"]], // Añadir esta línea para ordenar por ID de forma ascendente
        });

        const totalPages = Math.ceil(resultado.count / limit);

        return {
          registros: resultado.rows,
          totalPages: totalPages,
        };
      } catch (error) {
        console.log(error);
        throw new Error(`No se pudieron obtener los datos de la empresa`);
      }
    },
    obtenerDataEmpresaEnergiaContratoAtipico: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        const resultado = await realizarConsultaPaginada(
          Data_empresa_EnergiaContratoAtipico,
          options,
          condicionesEmpresa
        );
        return resultado;
      } catch (error) {
        console.error(error);
        throw new Error(`No se pudieron obtener los datos: ${error.message}`);
      }
    },
    obtenerDataMmeValidacion: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // La función `realizarConsultaPaginada` sería una utilidad que implementas para manejar la paginación y el filtrado
        if (!options.sortField) {
          options.sortField = "fecha";
          options.sortOrder = "DESCEND"; // Puede ser 'ASC' o 'DESC'
        }
        
        return await realizarConsultaPaginada(Data_mme_validacion, options, condicionesEmpresa);
      } catch (error) {
        console.error(error);
        throw new Error("No se pudieron obtener los datos de validación MME.");
      }
    },
    obtenerDataMmeGiro: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // Asumiendo que exista una función genérica para manejar paginación y filtrado
                // Establecer valores predeterminados para sortField y sortOrder
                if (!options.sortField) {
                  options.sortField = "fecha";
                  options.sortOrder = "DESCEND"; // Puede ser 'ASC' o 'DESC'
                }

                
        const resultado = await realizarConsultaPaginada(Data_mme_giro, options, condicionesEmpresa);
        
        return resultado;
      } catch (error) {
        console.error("Error al obtener datos de giros MME: ", error);
        throw new Error("Error al obtener los datos de giros MME.");
      }
    },
    obtenerDataBanrepublicaTco: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // La función `realizarConsultaPaginada` sería una utilidad que implementas para manejar la paginación y el filtrado
        const resultado = await realizarConsultaPaginada(Data_banrepublica_tco, options, condicionesEmpresa);
        return resultado;
      } catch (error) {
        console.log(error);
        throw new Error('No se pudieron obtener los datos de banrepublica tco');
      }
    },

    obtenerDataBanrepublicaTcap: async (_, { options }, ctx) => {
      try {
        const condicionesEmpresa = { empresa_id: ctx.usuario.empresa };
        // La función `realizarConsultaPaginada` sería una utilidad que implementas para manejar la paginación y el filtrado
        const resultado = await realizarConsultaPaginada(Data_banrepublica_tcap, options, condicionesEmpresa);
        return resultado;
      } catch (error) {
        console.log(error);
        throw new Error('No se pudieron obtener los datos de banrepublica tco');
      }
    }
  },

  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { email, password } = input;

      //Revisar si el usuario ya esta registrado
      const existeUsuario = await Usuario.findOne({
        where: { email: "Alejandro" },
      });
      if (existeUsuario) {
        throw new Error("EL usuario ya esta registrado");
      }

      //Hash el password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      try {
        //Guardarlo en la BD
        const usuario = new Usuario(input);
        usuario.save();
        return usuario;
      } catch (error) {
        console.log(error);
      }
      return "Creando...";
    },
    autenticarUsuario: async (_, { input }) => {
      //Revisar si el usuario existe
      const { email, password } = input;
      const existeUsuario = await Usuario.findOne({ where: { email: email } });
      if (!existeUsuario) {
        throw new Error("EL usuario no existe");
      }
      //Revisar si el password es correcto
      const passwordCorrecto = await bcryptjs.compare(
        password,
        existeUsuario.password
      );
      if (!passwordCorrecto) {
        throw new Error("El password es incorrecto");
      }
      //Crear Token
      return {
        token: crearToken(existeUsuario, process.env.SECRETA, "24h"),
      };
    },
    nuevoAfac: async (_, { input }) => {
      try {
        const afac = new Afac(input);
        const resultado = await afac.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    nuevoDataempresa: async (_, { input }) => {
      const { empresa_id, anho, mes } = input;
      var registro = await Data_empresa.findAll({
        where: { empresa_id: empresa_id, anho: anho, mes: mes },
      });
      if (registro.length > 0) {
        throw new Error(
          "Ya existe un registro para este año y mes, por favor eliminelo, si lo desea, e inserte de nuevo "
        );
      }
      const data_empresa = new Data_empresa(input);
      const resultado = await data_empresa.save();
      return resultado;
    },
    nuevoDataxmafac: async (_, { input }) => {
      const { empresa_id, anho, mes } = input;
      var registro = await Data_xm_afac.findAll({
        where: { empresa_id: empresa_id, anho: anho, mes: mes },
      });
      if (registro.length > 0) {
        throw new Error(
          "Ya existe un registro para este año y mes, por favor eliminelo, si lo desea, e inserte de nuevo "
        );
      }

      try {
        const data_xm_afac = new Data_xm_afac(input);
        const resultado = await data_xm_afac.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    nuevoDataxmadem: async (_, { input }) => {
      const { empresa_id, anho, mes, dia } = input;
      var registro = await Data_xm_adem.findAll({
        where: { empresa_id: empresa_id, anho: anho, mes: mes, dia: dia },
      });
      if (registro.length > 0) {
        throw new Error(
          "Ya existe un registro para este año y mes, por favor eliminelo, si lo desea, e inserte de nuevo "
        );
      }
      try {
        const data_xm_adem = new Data_xm_adem(input);
        const resultado = await data_xm_adem.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    nuevoData_xm_afac: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes
            const registroExistente = await Data_xm_afac.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y el mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newData_xm_dspctto = new Data_xm_afac(input[index]);
              const resultado = await newData_xm_dspctto.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: "error",
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    nuevoData_xm_dspctto: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes, dia, contrato } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes
            const registroExistente = await Data_xm_dspctto.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
                dia,
                contrato,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho}, el mes ${mes}, el día ${dia} y el contrato ${contrato}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newData_xm_dspctto = new Data_xm_dspctto(input[index]);
              const resultado = await newData_xm_dspctto.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: "error",
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    nuevoDataxmtserv: async (_, { input }) => {
      const { empresa_id, anho, mes, concepto, agente } = input;
      var registro = await Data_xm_tserv.findAll({
        where: {
          empresa_id: empresa_id,
          anho: anho,
          mes: mes,
          concepto,
          agente,
        },
      });
      if (registro.length > 0) {
        throw new Error(
          "Ya existe un registro para este año y mes y , por favor eliminelo, si lo desea, e inserte de nuevo "
        );
      }
      try {
        const data_xm_tserv = new Data_xm_tserv(input);
        const resultado = await data_xm_tserv.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    nuevoData_xm_trsm: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes, codigo } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes
            const registroExistente = await Data_xm_trsm.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
                codigo,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho}, el mes ${mes} y la variable ${codigo}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newData_xm_trsm = new Data_xm_trsm(input[index]);
              const resultado = await newData_xm_trsm.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: "error",
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    //Mutation

    nuevoData_creg_cx: async (_, { input }) => {
      try {
        const data_creg_cx = new Data_creg_cx(input);
        const resultado = await data_creg_cx.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    //Mutation

    nuevoData_dane: async (_, { input }) => {
      const { empresa_id, anho, mes } = input;
      var registro = await Data_dane.findAll({
        where: { empresa_id: empresa_id, anho: anho, mes: mes },
      });
      if (registro.length > 0) {
        throw new Error(
          "Ya existe un registro para este año y mes, por favor eliminelo, si lo desea, e inserte de nuevo "
        );
      }
      try {
        const data_dane = new Data_dane(input);
        const resultado = await data_dane.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    //Mutation

    nuevoData_banrepublica_tcap: async (_, { input }) => {
      try {
        const data_banrepublica_tcap = new Data_banrepublica_tcap(input);
        const resultado = await data_banrepublica_tcap.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    nuevoData_banrepublica_tco: async (_, { input }) => {
      try {
        const data_banrepublica_tco = new Data_banrepublica_tco(input);
        const resultado = await data_banrepublica_tco.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    //Mutation

    nuevoData_mme_validacion: async (_, { input }) => {
      try {
        const data_mme_validacion = new Data_mme_validacion(input);
        const resultado = await data_mme_validacion.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    //Mutation

    nuevoData_mme_giro: async (_, { input }) => {
      try {
        const data_mme_giro = new Data_mme_giro(input);
        const resultado = await data_mme_giro.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    //Mutation

    //Mutation

    nuevoRes_componentes_cu_tarifa: async (_, { input }) => {
      try {
        const res_componentes_cu_tarifa = new Res_componentes_cu_tarifa(input);
        const resultado = await res_componentes_cu_tarifa.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    //Mutation

    nuevoData_xm_stn: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes, CRS_Variante_Guatape } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes
            const registroExistente = await Data_xm_stn.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y el mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newData_xm_stn = new Data_xm_stn(input[index]);
              const resultado = await newData_xm_stn.save();
              if (CRS_Variante_Guatape) {
                const objetosCRS = CRS_Variante_Guatape.map(
                  ({ agente, crs_variable_guatape_cop, demanda_kwh }) => ({
                    agente,
                    crs_variable_guatape_cop,
                    demanda_kwh,
                    anho: input[index].anho,
                    mes: input[index].mes,
                    creador: input[index].creador,
                    empresa_id: input[index].empresa_id,
                    data_xm_stn_id: resultado.id,
                  })
                );

                await Data_xm_guatape.bulkCreate(objetosCRS);
              }

              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    //Mutation
    //Mutation

    nuevoData_xm_guatape: async (_, { input }) => {
      
      try {
        const data_xm_guatape = new Data_xm_guatape(input);
        const resultado = await data_xm_guatape.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    //Mutation

    nuevoData_xm_cprog: async (_, { input }, ctx) => {
      console.log(input);
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes
            const registroExistente = await Data_xm_cprog.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y el mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newData_xm_cprog = new Data_xm_cprog(input[index]);
              const resultado = await newData_xm_cprog.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    //Mutation

    nuevoData_xm_ipr: async (_, { input }) => {
      const { empresa_id, anho, mes, nivelEntrada } = input;
      var registro = await Data_xm_ipr.findAll({
        where: {
          empresa_id: empresa_id,
          anho: anho,
          mes: mes,
          nivelEntrada: nivelEntrada,
        },
      });
      if (registro.length > 0) {
        throw new Error(
          "Ya existe un registro para este año y mes, por favor eliminelo, si lo desea, e inserte de nuevo "
        );
      }
      try {
        const data_xm_ipr = new Data_xm_ipr(input);
        const resultado = await data_xm_ipr.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    //Mutation

    nuevoData_xm_d015: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes
            const registroExistente = await Data_xm_d015.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y el mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newData_xm_d015 = new Data_xm_d015(input[index]);
              const resultado = await newData_xm_d015.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    //Mutation

    nuevoData_xm_dtun: async (_, { input }) => {
      try {
        const data_xm_dtun = new Data_xm_dtun(input);
        const resultado = await data_xm_dtun.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    //Mutation

    nuevoData_xm_str: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes
            const registroExistente = await Data_xm_str.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y el mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newData_xm_str = new Data_xm_str(input[index]);
              const resultado = await newData_xm_str.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    //Mutation

    nuevoData_empresa_garantia: async (_, { input }) => {
      try {
        const data_empresa_garantia = new Data_empresa_garantia(input);
        const resultado = await data_empresa_garantia.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    //Mutation

    nuevoData_empresa_anual: async (_, { input }) => {
      try {
        const data_empresa_anual = new Data_empresa_anual(input);
        const resultado = await data_empresa_anual.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    //Mutation

    nuevoData_xm_trsd: async (_, { input }) => {
      try {
        const data_xm_trsd = new Data_xm_trsd(input);
        const resultado = await data_xm_trsd.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    //Mutation

    //Mutation

    nuevoData_empresa_agpe: async (_, { input }) => {
      try {
        const data_empresa_agpe = new Data_empresa_agpe(input);
        const resultado = await data_empresa_agpe.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    //////////UPDATES

    actualizarData_mme_validacion: async (_, { id, input }) => {
      let data_mme_validacion = await Data_mme_validacion.findByPk(id);
      if (!data_mme_validacion) {
        throw new Error("Registro no existe");
      }
      resultado = await data_mme_validacion.update(input, {
        where: {
          id: id,
        },
      });

      return resultado;
    },

    eliminarDataEmpresa: async (_, { id }) => {
      let data_empresa = await Data_empresa.findByPk(id);
      if (!data_empresa) {
        throw new Error("Registro no existe");
      }
      resultado = await data_empresa.destroy({
        where: {
          id: id,
        },
      });
      return "Pedido Eliminado";
    },
    eliminarDataxmafac: async (_, { id }) => {
      let data = await Data_xm_afac.findByPk(id);
      if (!data) {
        throw new Error("Registro no existe");
      }
      resultado = await data.destroy({
        where: {
          id: id,
        },
      });
      return "Registro Eliminado";
    },
    // Mutation Eliminar el registro
    eliminarData_xm_stn: async (_, { ids }, ctx) => {
      try {
        // Verificar si todos los ids existen
        const totalExistente = await Data_xm_stn.count({
          where: { id: ids },
        });
        if (totalExistente !== ids.length) {
          throw new Error(
            `No se encontraron todos los registros con los ids proporcionados`
          );
        }

        // Eliminar el registro
        await Data_xm_stn.destroy({ where: { id: ids } });
        return ids;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    eliminarData_xm_str: async (_, { id }) => {
      try {
        // Verificar si todos los ids existen
        const totalExistente = await Data_xm_str.count({
          where: { id: ids },
        });
        if (totalExistente !== ids.length) {
          throw new Error(
            `No se encontraron todos los registros con los ids proporcionados`
          );
        }

        // Eliminar el registro
        await Data_xm_str.destroy({ where: { id: ids } });
        return ids;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    eliminarData_xm_cprog: async (_, { id }) => {
      let data = await Data_xm_cprog.findByPk(id);
      if (!data) {
        throw new Error("Registro no existe");
      }
      resultado = await data.destroy({
        where: {
          id: id,
        },
      });
      return "Registro Eliminado";
    },
    eliminarDataempresamessin: async (_, { ids }, ctx) => {
      try {
        // Verificar si todos los ids existen
        const totalExistente = await Dataempresamessin.count({
          where: { id: ids },
        });
        if (totalExistente !== ids.length) {
          throw new Error(
            `No se encontraron todos los registros con los ids proporcionados`
          );
        }

        // Eliminar los registros
        await Dataempresamessin.destroy({ where: { id: ids } });

        return ids;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    nuevoDataempresamessin: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes
            const registroExistente = await Dataempresamessin.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y el mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newDataempresamessin = new Dataempresamessin(input[index]);
              const resultado = await newDataempresamessin.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    nuevoEmpresaGarantia: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const {
              emisor_banco,
              numero_garantia,
              fecha_inicio_vigencia,
              costo_garantia,
              valor_garantia,
            } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes

            // Si ya existe un registro, retorna un error
            if (costo_garantia / valor_garantia > 0.15) {
              throw new Error(
                `Los costos de la garantia ${numero_garantia} expedida por el banco ${emisor_banco} superan al 15% del valor asegurado, puede haber un error de digitacipón, revisa , corrije o de ser correcto contacta al administrador`
              );
            }

            const registroExistente = await Data_empresa_garantia.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                emisor_banco,
                numero_garantia,
                fecha_inicio_vigencia,
              },
            });

            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para la garantia ${numero_garantia} expedida por el banco ${emisor_banco} el día ${fecha_inicio_vigencia}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;

            try {
              const nuevaGarantia = new Data_empresa_garantia(input[index]);
              const resultado = await nuevaGarantia.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    actualizarEmpresaGarantia: async (_, { id, input }) => {
      try {
        const garantia = await Data_empresa_garantia.findByPk(id);
        if (!garantia) {
          throw new Error(`La garantía con ID ${id} no fue encontrada`);
        }
        const garantiaActualizada = await garantia.update(input);
        return garantiaActualizada;
      } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la garantía");
      }
    },

    eliminarEmpresaGarantia: async (_, { ids }) => {
      try {
        const eliminados = await Data_empresa_garantia.destroy({
          where: { id: ids },
        });
        return ids;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    nuevoDataEmpresaAnual: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes

            const registroExistente = await Data_empresa_anual.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
              },
            });

            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(`Ya existe un registro para el año ${anho}`);
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;

            try {
              const nuevaDataAnual = new Data_empresa_anual(input[index]);
              const resultado = await nuevaDataAnual.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    actualizarDataEmpresaAnual: async (_, { id, input }) => {
      try {
        const DataAnualEmpresa = await Data_empresa_anual.findByPk(id);
        if (!garantia) {
          throw new Error(`La garantía con ID ${id} no fue encontrada`);
        }
        const DataAnualEmpresaActualizada = await DataAnualEmpresa.update(
          input
        );
        return DataAnualEmpresaActualizada;
      } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la data anual de la empresa");
      }
    },

    eliminarDataEmpresaAnual: async (_, { id }) => {
      try {
        const numDestroyed = await Data_empresa_anual.destroy({
          where: { id },
        });
        if (numDestroyed) {
          return true;
        }
        throw new Error(`La Data con ID ${id} no fue encontrada`);
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    nuevoDataXmIpr: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes, nivelEntrada } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes

            const registroExistente = await Data_xm_ipr.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
                nivelEntrada,
              },
            });

            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;

            try {
              const nuevaDataIpr = new Data_xm_ipr(input[index]);
              const resultado = await nuevaDataIpr.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    actualizarDataXmIpr: async (_, { id, input }) => {
      // Aquí manejas la actualización de registros existentes
      try {
        const registroActualizado = await DataXmIpr.update(input, {
          where: { id },
        });
        return registroActualizado;
      } catch (error) {
        console.log(error);
        // Gestiona el error adecuadamente
      }
    },
    eliminarDataXmIpr: async (_, { ids }) => {
      // Aquí manejas la eliminación de registros
      try {
        const eliminados = await DataXmIpr.destroy({ where: { id: ids } });
        return ids;
      } catch (error) {
        console.log(error);
        // Gestiona el error adecuadamente
      }
    },
    nuevoDataXmD015: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes

            const registroExistente = await Data_xm_d015.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
              },
            });

            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;

            try {
              const nuevaDataIpr = new Data_xm_d015(input[index]);
              const resultado = await nuevaDataIpr.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    actualizarDataXmD015: async (_, { id, input }, ctx) => {
      try {
        const record = await DataXmD015.findByPk(id);
        if (!record) {
          throw new Error(`Registro con ID ${id} no encontrado`);
        }
        await record.update(input);
        return record;
      } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el registro de DataXmD015");
      }
    },
    eliminarDataXmD015: async (_, { ids }, ctx) => {
      try {
        const deleted = await DataXmD015.destroy({
          where: { id: ids },
        });
        if (deleted) {
          return ids;
        } else {
          throw new Error("Error al eliminar registros de DataXmD015");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar registros de DataXmD015");
      }
    },
    nuevoDataXmCprog: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes

            const registroExistente = await Data_xm_cprog.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
              },
            });

            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;

            try {
              const nuevaDataCPROG = new Data_xm_cprog(input[index]);
              const resultado = await nuevaDataCPROG.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    actualizarDataXmCprog: async (_, { id, input }, ctx) => {
      if (!ctx.usuario) throw new AuthenticationError("Debe autenticarse");
      try {
        const registro = await Data_xm_cprog.findByPk(id);
        if (!registro) throw new Error("Registro no encontrado");
        await registro.update(input);
        return registro;
      } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el registro");
      }
    },
    eliminarDataXmCprog: async (_, { ids }, ctx) => {
      if (!ctx.usuario) throw new AuthenticationError("Debe autenticarse");
      try {
        const cantidadEliminados = await Data_xm_cprog.destroy({
          where: { id: ids },
        });
        if (cantidadEliminados === 0)
          throw new Error("Error al eliminar los registros");
        return ids;
      } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar los registros");
      }
    },
    nuevoResComponentesCuTarifa: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes, mercado } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes

            const registroExistente = await Res_componentes_cu_tarifa.findOne({
              where: {
                empresa_id: ctx.usuario.empresa,
                anho,
                mes,
                mercado,
              },
            });

            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un cálculo para el año ${anho} y mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;

            try {
              if (mes === 1) {
                mesm = 12;
                anhom = anho - 1;
                mesm2 = 11;
                anhom2 = anho - 1;
              } else if (mes === 2) {
                mesm = mes - 1;
                anhom = anho;
                mesm2 = 12;
                anhom2 = anho - 1;
              } else {
                mesm = mes - 1;
                anhom = anho;
                mesm2 = mes - 2;
                anhom2 = anho;
              }

              //Obtenemos IPP e IPC del mes anterior

              data_dane_ipp = await Data_dane_ipp.findOne({
                where: {
                  mes: mesm,
                  anho: anhom,
                  tipo: "pr",
                },
              });
              if (!data_dane_ipp) {
                throw new Error(
                  "No existen insumos de DANE IPP tipo pr para el periodo anterior al mes y año seleccionado " +
                    mesm +
                    "-" +
                    anhom
                );
              }

              ippm = data_dane_ipp.dataValues.ipp_oi_oferta_interna;

              data_dane_ipc = await Data_dane_ipc.findOne({
                where: {
                  mes: mesm,
                  anho: anhom,
                },
              });
              if (!data_dane_ipc) {
                throw new Error(
                  "No existen insumos de DANE IPC para el periodo anterior al mes y año seleccionado " +
                    mesm +
                    "-" +
                    anhom
                );
              }

              ipcm = data_dane_ipc.dataValues.ipc;

              data_dane_ipc = await Data_dane_ipc.findOne({
                where: {
                  mes: mesm2,
                  anho: anhom2,
                },
              });

              const ipcm2 = data_dane_ipc.dataValues.ipc;

              var data_xm_afac = await Data_xm_afac.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  agente: "EGVC",
                  anho: anhom,
                  mes: mesm,
                },
              });

              if (!data_xm_afac) {
                throw new Error(
                  "No existen insumos de AFAC para el periodo anterior al mes y año seleccionado " +
                    mesm +
                    "-" +
                    anhom
                );
              }

              var afacm = data_xm_afac.dataValues;

              var data_xm_dspcttom = await Data_xm_dspctto.findAll({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  comprador: "EGVC", //ACTUALIZAR/
                  anho: anhom,
                  mes: mesm,
                },
              });

              if (!data_xm_dspcttom) {
                throw new Error(
                  "No existen insumos de DSPCTTOS para el periodo anterior al mes y año seleccionado " +
                    mesm +
                    "-" +
                    anhom
                );
              }
              //TRSM
              var data_xm_trsm = await Data_xm_trsm.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anhom,
                  mes: mesm,
                  codigo: "MC",
                },
              });

              if (!data_xm_trsm) {
                throw new Error(
                  "No existen insumos de TRSM para el periodo anterior al mes y año seleccionado " +
                    mesm +
                    "-" +
                    anhom
                );
              }

              //Calcular el G

              if (afacm.compras_en_bolsa_nacional_kwh === 0) {
                pb_ = 0;
              } else {
                pb_ = roundToTwo(
                  afacm.compras_energia_en_bolsa_cop /
                    afacm.compras_energia_en_bolsa_kwh
                );
              }

              input[index].pb = pb_;

              function calcularEnergiaContratos(data) {
                return data.reduce((total, obj) => {
                  for (let i = 1; i <= 24; i++) {
                    total += parseFloat(obj[`desp_hora_${i}`]);
                  }
                  return total;
                }, 0);
              }

              function calcularCostoContratos(data) {
                return data.reduce((total, obj) => {
                  for (let i = 1; i <= 24; i++) {
                    total +=
                      parseFloat(obj[`desp_hora_${i}`]) *
                      parseFloat(obj[`trf_hora_${i}`]);
                  }
                  return total;
                }, 0);
              }

              var Energia_contratos = 0;
              var Costo_contratos = 0;
              var Energia_contratos_sub = 0;
              var Costo_contratos_sub = 0;
              var dcr = afacm.demanda_real_kwh + afacm.perdida_real_kwh; //ACRUALIZAR debe venir del adem por que aca se mezclña NR y Reg
              var iprstn_ = afacm.perdida_real_kwh / dcr;
              input[index].iprstn = roundToTwo(iprstn_);

              if (data_xm_afac.compras_en_contratos_kwh > 0) {
                // Filtrar por SC, SL, CP
                var filteredData = data_xm_dspcttom.filter(
                  (obj) =>
                    obj.dataValues && ["CP"].includes(obj.dataValues.tipoasigna)
                );
                // Obtener una lista única de IDs de contrato
                const uniqueContractIds = Array.from(
                  new Set(filteredData.map((obj) => obj.contrato))
                );

                // Consultar todos los contratos existentes en Data_empresa_EnergiaContratoAtipico
                const contratosExistentes =
                  await Data_empresa_EnergiaContratoAtipico.findAll({
                    where: {
                      id_contrato: uniqueContractIds,

                      empresa_id: ctx.usuario.empresa,
                      anho: anhom,
                      mes: mesm,
                    },
                  });
            

                // Crear un Set de IDs de contratos existentes para una búsqueda rápida
                const idsContratosExistentes = new Set(
                  contratosExistentes.map((ce) => ce.id_contrato)
                );
              

                // Filtrar los datos para excluir los contratos existentes
                filteredData = filteredData.filter(
                  (obj) => !idsContratosExistentes.has(obj.contrato)
                );
                console.log("filteredData", filteredData);

                Energia_contratos = calcularEnergiaContratos(filteredData);
                Costo_contratos = calcularCostoContratos(filteredData);

              
                // Sumar los valores de energía y costo de los contratos existentes a los totales
                contratosExistentes.forEach((contrato) => {
                  Energia_contratos += parseFloat(contrato.energia_comprada);
                  Costo_contratos += parseFloat(contrato.costo);
                });

                Energia_contratos_sub = 0;
                Costo_contratos_sub = 0;

                // Filtrar por SC, SL, CP

                var filteredDataSub = data_xm_dspcttom.filter(
                  (obj) =>
                    obj.dataValues &&
                    ["SC", "SL"].includes(obj.dataValues.tipoasigna)
                );

                Energia_contratos_sub =
                  calcularEnergiaContratos(filteredDataSub);

                Costo_contratos_sub = calcularCostoContratos(filteredDataSub);

                var w = dcr / Energia_contratos;

                pc_ = roundToTwo(Costo_contratos / Energia_contratos);


             
                if (Energia_contratos / dcr > 1) {
                  pc_ = pc_ * w;
                }

                pcSub_ = roundToTwo(
                  Costo_contratos_sub / Energia_contratos_sub
                );

                if (isNaN(pcSub_)) {
                  pcSub_ = 0;
                }

                w1 =
                  Energia_contratos /
                  (Energia_contratos_sub + Energia_contratos);

                w2 =
                  Energia_contratos_sub /
                  (Energia_contratos_sub + Energia_contratos);
              } else {
                w = 0;
                w1 = 0;
                w2 = 0;
                pc_ = 0;
                pcSub_ = 0;
              }

              qagd = 0; // Caso ENerguaviare que aun no tiene AGPE info
              qc_ = roundToTwo(
                Math.min(
                  1 - qagd,
                  (Energia_contratos_sub + Energia_contratos) / dcr
                )
              );

              mc_ = data_xm_trsm.valor;

              alfa = 0.036578428408; //EGVC
              max_g_ = roundToTwo(
                (qc_ * (alfa * pc_ + (1 - alfa) * mc_) + (1 - qc_) * mc_) * 1.3
              );
              //cr_=(w1*qc_*(alfa*pc_+(1-alfa)*mc_))+(w2*qc_*pcSub_)+(cgsubasta_acu/dcr)+((1-qc_-qagd)*pb_)+gTransitorio //***Concpeto CREG
              cr_ = qc_ * (alfa * pc_ + (1 - alfa) * mc_) + (1 - qc_) * pb_; //***Concpeto CREG

              const dataempresamessin = await Dataempresamessin.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anhom,
                  mes: mesm,
                },
              });

              if (!dataempresamessin) {
                throw new Error(
                  "No existen insumos de Empresa  para el periodo anterior al mes y año de calculo " +
                    mesm +
                    "-" +
                    anhom
                );
              }
              var ventas_totales =
                dataempresamessin.ventas_usuarios_r_nt1_e +
                dataempresamessin.ventas_usuarios_r_nt1_c +
                dataempresamessin.ventas_usuarios_r_nt1_u +
                dataempresamessin.ventas_usuarios_r_nt2 +
                dataempresamessin.ventas_usuarios_r_nt3 +
                dataempresamessin.ventas_usuarios_nr_kwh;

              ad_ = 0; ////ACTUALIZAR
              aj_ = 0;
              gTransitorio = 0; //ACTUALIZAR

              // Creando la fecha de inicio y fin basado en año y mes para la comparación
              // Helper para crear fechas de inicio y fin del mes
              const obtenerInicioYFinDeMes = (ano, mes) => {
                const fechaInicioMes = new Date(ano, mes - 1, 1);
                const ultimoDiaDelMes = new Date(ano, mes, 0).getDate();
                const fechaFinMes = new Date(ano, mes - 1, ultimoDiaDelMes);

                return { fechaInicioMes, fechaFinMes };
              };

              const { fechaInicioMes, fechaFinMes } = obtenerInicioYFinDeMes(
                anhom,
                mesm
              );

              const data_empresa_garantiasm =
                await Data_empresa_garantia.findAll({
                  where: {
                    empresa_id: ctx.usuario.empresa,
                    fecha_inicio_vigencia: {
                      [Op.lte]: fechaFinMes,
                    },
                    fecha_fin_vigencia: {
                      [Op.gte]: fechaInicioMes,
                    },
                  },
                });

              var cgsubasta_acu = 0;
              var cg_acu = 0;
              var cgcu_acu = 0;
              function dateRange(startDate, endDate) {
                var start = startDate.split("-");
                var end = endDate.split("-");
                var startYear = parseInt(start[0]);
                var endYear = parseInt(end[0]);
                var dates = [];

                for (var i = startYear; i <= endYear; i++) {
                  var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
                  var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
                  for (
                    var j = startMon;
                    j <= endMonth;
                    j = j > 12 ? j % 12 || 11 : j + 1
                  ) {
                    var month = j + 1;
                    var displayMonth = month < 10 ? "0" + month : month;
                    dates.push([i, displayMonth, "01"].join("-"));
                  }
                }
                return dates;
              }
              for (
                let index = 0;
                index < data_empresa_garantiasm.length;
                index++
              ) {
                const meses_garantizados = dateRange(
                  data_empresa_garantiasm[index].fecha_inicio_vigencia,
                  data_empresa_garantiasm[index].fecha_fin_vigencia
                );

                if (
                  data_empresa_garantiasm[index].tipo_garantia ===
                  "Subasta_FERNC"
                ) {
                  cgsubasta_acu +=
                    data_empresa_garantiasm[index].costo_garantia /
                    meses_garantizados.length;
                }
                if (data_empresa_garantiasm[index].tipo_garantia === "MEM") {
                  cg_acu +=
                    data_empresa_garantiasm[index].costo_garantia /
                    meses_garantizados.length;
                }
                if (data_empresa_garantiasm[index].tipo_garantia === "STR") {
                  cgcu_acu +=
                    data_empresa_garantiasm[index].costo_garantia /
                    meses_garantizados.length;
                }
              }
              if (cgsubasta_acu / dcr > 1) {
                gc_ = roundToTwo(
                  w1 * qc_ * (alfa * pc_ + (1 - alfa) * mc_) +
                    w2 * qc_ * pcSub_ +
                    1 +
                    (1 - qc_ - qagd) * pb_ +
                    gTransitorio +
                    aj_
                );
              } else {
                gc_ = roundToTwo(
                  w1 * qc_ * (alfa * pc_ + (1 - alfa) * mc_) +
                    w2 * qc_ * pcSub_ +
                    cgsubasta_acu / dcr +
                    (1 - qc_ - qagd) * pb_ +
                    gTransitorio +
                    aj_
                );
              }
console.log(w1 * qc_ * (alfa * pc_ + (1 - alfa) * mc_) +
w2 * qc_ * pcSub_)

console.log(pb_)



              if (anho === 2024 && mes === 2) {
                gc_ = 279.05844;
              }

              cr_ = qc_ * (alfa * pc_ + (1 - alfa) * mc_) + (1 - qc_) * pb_; //***Concpeto CREG

              input[index].qc = qc_;
              input[index].mc = mc_;
              input[index].w1 = roundToTwo(w1);
              input[index].w2 = roundToTwo(w2);
              input[index].max = max_g_;
              input[index].cr = roundToTwo(cr_);
              input[index].ref = max_g_ / 1.3;
              input[index].alfa = alfa;
              input[index].pc = pc_;
              input[index].gc = gc_;
              input[index].psa = 0;
              input[index].cug = 0;
              input[index].egp = 0;
              input[index].wl = 0;
              input[index].qagd = 0;
              input[index].pcsub = pcSub_;

              input[index].ad = 0;
              input[index].i = 0;
              input[index].aj = aj_;

              var data_xm_str = await Data_xm_str.findOne({
                where: {
                  anho: anho,
                  mes: mes,
                },
              });

              if (!data_xm_str) {
                throw new Error(
                  `No existen datos de STR para periodo ${mes}-${anho}`
                );
              }

              input[index].str = data_xm_str.cargo_por_uso_dt4_cop_kwh_sur;

              var data_xm_sdl = await Data_xm_d015.findOne({
                where: {
                  anho: anho,
                  mes: mes,
                },
              });

              if (!data_xm_sdl) {
                throw new Error(
                  `No existen datos de SDL para periodo ${mes}-${anho}`
                );
              }

              input[index].dnt1 = roundToTwo(
                data_xm_sdl.cargo_por_uso_dt1_cop_kwh
              );

              input[index].dnt2 = roundToTwo(
                data_xm_sdl.cargo_por_uso_dt2_cop_kwh
              );

              input[index].dnt3 = roundToTwo(
                data_xm_sdl.cargo_por_uso_dt3_cop_kwh
              );

              input[index].cdi_100 = roundToTwo(
                data_xm_sdl.cargo_de_inversion_cdi1_cop_kwh
              );

              input[index].cdi_50 = roundToTwo(
                data_xm_sdl.cargo_de_inversion_cdi1_cop_kwh / 2
              );
              input[index].cd2 = roundToTwo(
                data_xm_sdl.cargo_nivel_de_tension_cd2_cop_kwh
              );
              input[index].cd3 = roundToTwo(
                data_xm_sdl.cargo_nivel_de_tension_cd3_cop_kwh
              );
              input[index].cd4 = roundToTwo(
                data_xm_sdl.cargo_nivel_de_tension_cd4_cop_kwh
              );
              input[index].cdm = roundToTwo(
                data_xm_sdl.cargo_por_aom_cda1_cop_kwh
              );

              input[index].dnt4 = roundToTwo(input[index].str);

              data_empresaanualm = await Data_empresa_anual.findAll({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anho - 1,
                },
                order: [["createdAt", "DESC"]],
              });

              if (!data_empresaanualm) {
                throw new Error(
                  `No existen datos de empresa anual para periodo ${anhom}`
                );
              }

              cer_ = roundToTwo(
                ((data_empresaanualm[0].contribuciones_creg *
                  data_empresaanualm[0].porc_contribucion_creg) /
                  100 +
                  (data_empresaanualm[0].contribuciones_sspd *
                    data_empresaanualm[0].porc_contribucion_sspd) /
                    100) /
                  12
              );

              if (anho === 2015) {
                input[index].x = 0;
              }
              if (anho === 2016) {
                input[index].x = 0.00725;
              }
              if (anho === 2017) {
                input[index].x = 0.00725 * 2;
              }
              if (anho === 2018) {
                input[index].x = 0.00725 * 3;
              }
              if (anho >= 2019) {
                input[index].x = 0.00725 * 4;
              }

              data_creg_cxm = await Data_creg_cx.findAll({
                where: {
                  empresa_id: ctx.usuario.empresa,
                },
                order: [["createdAt", "DESC"]],
              });

              cfm_ = roundToTwo(
                (data_creg_cxm[0].Cf * ipcm * (1 - input[index].x)) / 79.55965
              );
              // cfm_=(roundToTwo(6146.19*ipcm/79.55965))

              data_empresam = await Data_empresa.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anhom,
                  mes: mesm,
                },
              });

              rc_ = roundToTwo(
                ((data_creg_cxm[0].RCT / 100) *
                  (data_empresam.ventas_usuarios_r_nt1_e +
                    data_empresam.ventas_usuarios_r_nt1_c +
                    data_empresam.ventas_usuarios_r_nt1_u +
                    data_empresam.ventas_usuarios_r_nt2 +
                    data_empresam.ventas_usuarios_r_nt3 -
                    data_empresam.vae_kwh -
                    data_empresam.vnu_kwh -
                    data_empresam.vsne_kwh) +
                  (data_creg_cxm[0].RCAE / 100) * data_empresam.vae_kwh +
                  (data_creg_cxm[0].RCSNE / 100) * data_empresam.vsne_kwh +
                  (data_creg_cxm[0].RCNU / 100) * data_empresam.vnu_kwh) /
                  (data_empresam.ventas_usuarios_r_nt1_e +
                    data_empresam.ventas_usuarios_r_nt1_c +
                    data_empresam.ventas_usuarios_r_nt1_u +
                    data_empresam.ventas_usuarios_r_nt2 +
                    data_empresam.ventas_usuarios_r_nt3)
              );
// Buscar todas las validaciones de la empresa del usuario en contexto
              data_xm_mme_validacione = await Data_mme_validacion.findAll({
                where: {
                  empresa_id: ctx.usuario.empresa,
                },
              });
// Determinar el año más reciente entre las validaciones encontradas
              var len = data_xm_mme_validacione.length,
                maxa = -Infinity;
              while (len > 0) {
                len--;
                if (data_xm_mme_validacione[len].anho > maxa) {
                  maxa = data_xm_mme_validacione[len].anho;
                }
              }
              anho_Ul_Trim_Val_Mme = maxa;
// Determinar el trimestre más reciente del último año encontrado
              var len = data_xm_mme_validacione.length,
                maxt = -Infinity;
              while (len > 0) {
                len--;
                if (
                  data_xm_mme_validacione[len].trimestre > maxt &&
                  maxa === data_xm_mme_validacione[len].anho
                ) {
                  maxt = data_xm_mme_validacione[len].trimestre;
                }
              }

              ul_Trim_Val_Mme = maxt;



// Preparar la lista de últimos 4 trimestres validados
              var len = 4,
                tri_validados = [],
                index2 = 0,
                summ = 0,
                trimestre,
                anho_trimestre,
                fecha_inicio_trimestre,
                fecha_fin_trimestre;
              while (len > 0) {
                len--;
                index2++;
                if (maxt - len >= 1) {
                  trimestre = maxt - len;
                  anho_trimestre = maxa;
                } else {
                  if (maxt - len === -2) {
                    trimestre = 2;
                    anho_trimestre = maxa - 1;
                  }
                  if (maxt - len === -1) {
                    trimestre = 3;
                    anho_trimestre = maxa - 1;
                  }
                  if (maxt - len === 0) {
                    trimestre = 4;
                    anho_trimestre = maxa - 1;
                  }
                }


                  // Calcular las fechas de inicio y fin de los ultimos 4 trimestres

                if (trimestre === 1) {
                  fecha_inicio_trimestre = new Date(anho_trimestre, 1 - 1, 1);
                  fecha_fin_trimestre = new Date(anho_trimestre, 3 - 1, 31);
                }
                if (trimestre === 2) {
                  fecha_inicio_trimestre = new Date(anho_trimestre, 4 - 1, 1);
                  fecha_fin_trimestre = new Date(anho_trimestre, 6 - 1, 30);
                }
                if (trimestre === 3) {
                  fecha_inicio_trimestre = new Date(anho_trimestre, 7 - 1, 1);
                  fecha_fin_trimestre = new Date(anho_trimestre, 9 - 1, 30);
                }
                if (trimestre === 4) {
                  fecha_inicio_trimestre = new Date(anho_trimestre, 10 - 1, 1);
                  fecha_fin_trimestre = new Date(anho_trimestre, 12 - 1, 31);
                }



                 // Revisar si el trimestre y año corresponden a una entrada de validación
                for (
                  let index1 = 0;
                  index1 < data_xm_mme_validacione.length;
                  index1++
                ) {
                  if (
                    data_xm_mme_validacione[index1].anho === anho_trimestre &&
                    data_xm_mme_validacione[index1].trimestre === trimestre
                  ) {
                    tri_validados.push([
                      index1, //Indice
                      trimestre, //Trimestre
                      anho_trimestre, //Año
                      parseFloat(data_xm_mme_validacione[index1].subsidios) -  //Deficit de subsidios
                        data_xm_mme_validacione[index1].contribuciones,
                      parseFloat(data_xm_mme_validacione[index1].facturacion), //Facturación
                      fecha_inicio_trimestre, //Fecha inicio trimestre
                      fecha_fin_trimestre, //Fecha fin trimestre
                    ]);
                    summ =
                      summ +
                      parseFloat(data_xm_mme_validacione[index1].facturacion);
                  }
                }
              }

           
// Calcular la facturación total promedio
              facturacion_t_ = (summ / 4).toString();


// Buscar todas las transacciones de giro para la empresa del usuario en contexto
              data_mme_giro_e = await Data_mme_giro.findAll({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  fondo: "FSSRI",
                },
              });
            
// Ordenar las transacciones de giro por fecha
              var data_mme_giro_ordenado = [...data_mme_giro_e];

              data_mme_giro_ordenado.sort((a, b) =>
                a.fecha > b.fecha ? 1 : b.fecha > a.fecha ? -1 : 0
              );
              const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

// Preparar variables para calcular el saldo y el giro sobrante
              var len1 = 0,
                len2,
                len3,
                summ = 0,
                array_sub2M = [],
                array_sub1N = [],
                saldo,
                giro_sobranteb,
                ultimo_giro_incluidob,
                fecha_ultimo_giro;

//Review del Trimestre anterior a los últimos 4 validados, el cual para arranque se incluye manual en la tabla de validaciones
            
              // Si el trimestre actual es el primero, verificar el último del año anterior
              if (tri_validados[0][1] === 1) {
                giro_sobranteb = parseFloat(
                  data_xm_mme_validacione.filter(
                    (data_xm_mme_validacione) =>
                      data_xm_mme_validacione.anho ===
                        tri_validados[0][2] - 1 &&
                      data_xm_mme_validacione.trimestre === 4
                  )[0].giro_sobrante
                );
                ultimo_giro_incluidob = data_xm_mme_validacione.filter(
                  (data_xm_mme_validacione) =>
                    data_xm_mme_validacione.anho === tri_validados[0][2] - 1 &&
                    data_xm_mme_validacione.trimestre === 4
                )[0].ultimo_giro_incluido;
              } 
              // Para otros trimestres, verificar el trimestre anterior del mismo año
              
              else {
                giro_sobranteb = parseFloat(
                  data_xm_mme_validacione.filter(
                    (data_xm_mme_validacione) =>
                      data_xm_mme_validacione.anho === tri_validados[0][2] &&
                      data_xm_mme_validacione.trimestre ===
                        tri_validados[0][1] - 1
                  )[0].giro_sobrante
                );
                ultimo_giro_incluidob = data_xm_mme_validacione.filter(
                  (data_xm_mme_validacione) =>
                    data_xm_mme_validacione.anho === tri_validados[0][2] &&
                    data_xm_mme_validacione.trimestre ===
                      tri_validados[0][1] - 1
                )[0].ultimo_giro_incluido;
              }
              
              
// Si no hay datos de giro sobrante o último giro incluido, inicializar a cero
              if (giro_sobranteb === null || ultimo_giro_incluidob === null) {
                giro_sobranteb = 0;
                ultimo_giro_incluidob = 0;
              }



// Procesar giros sobrantes y calcular saldo

//Para cada Trimestre validado
              for (let index = 0; index < 4; index++) {
                saldo = tri_validados[index][3];

                len2 = ultimo_giro_incluidob;
//EValuo primero pagos anticipados para si con eso se cubrio el saldo 
                while (len2 < data_mme_giro_ordenado.length - 1 && saldo != 0) {
                  var fecha_giro = new Date(
                    parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0, 4)),
                    parseFloat(
                      data_mme_giro_ordenado[len2].fecha.substr(5, 2)
                    ) - 1,
                    parseFloat(data_mme_giro_ordenado[len2].fecha.substr(8, 2))
                  );
                  var fecha_inicial_giros = new Date(2019, 1, 1);
// Verificar fondos y fechas para aplicar giros
                  if (
                    data_mme_giro_ordenado[len2].fondo === "FSSRI" &&
                    Date.parse(fecha_giro) >= Date.parse(fecha_inicial_giros) &&
                    Date.parse(fecha_giro) <=
                      Date.parse(tri_validados[index][6])
                  ) {
                     // Ajustar saldo con giro sobrante si existe
                    if (giro_sobranteb > 0) {
                      var fecha_giro = new Date(
                        parseFloat(
                          data_mme_giro_ordenado[len2].fecha.substr(0, 4)
                        ),
                        parseFloat(
                          data_mme_giro_ordenado[len2].fecha.substr(5, 2)
                        ) - 1,
                        parseFloat(
                          data_mme_giro_ordenado[len2].fecha.substr(8, 2)
                        )
                      );

                      saldo = saldo - giro_sobranteb;
                     
                  
                      // Guardar el giro y los días en una matriz, ajustando el giro para llegar a cero si necesario
                      if (saldo > 0) {
                        array_sub2M.push([
                          index + 1,
                          giro_sobranteb,
                          Math.round(
                            Math.abs(
                              (Date.parse(tri_validados[index][6]) -
                                fecha_giro) /
                                oneDay
                            )
                          ),
                          giro_sobranteb *
                            Math.round(
                              Math.abs(
                                (tri_validados[index][6] - fecha_giro) / oneDay
                              )
                            ),
                        ]);
                        ultimo_giro_incluidob = len2;
                        giro_sobranteb = 0;
                      } else {
                        array_sub2M.push([
                          index + 1,
                          giro_sobranteb + saldo,
                          Math.round(
                            Math.abs(
                              (Date.parse(tri_validados[index][6]) -
                                fecha_giro) /
                                oneDay
                            )
                          ),
                          (giro_sobranteb + saldo) *
                            Math.round(
                              Math.abs(
                                (tri_validados[index][6] - fecha_giro) / oneDay
                              )
                            ),
                        ]);
                        giro_sobranteb = -saldo;
                        ultimo_giro_incluidob = len2;
                        saldo = 0;
                      }
                    } else {
                      saldo =
                        saldo -
                        parseFloat(data_mme_giro_ordenado[len2].giro_cop);
                   // Guardar el giro y los días en una matriz, ajustando el giro para llegar a cero si necesario

                      if (saldo > 0) {
                        array_sub2M.push([
                          index + 1,
                          parseFloat(data_mme_giro_ordenado[len2].giro_cop),
                          Math.round(
                            Math.abs(
                              (tri_validados[index][6] - fecha_giro) / oneDay
                            )
                          ),
                          parseFloat(data_mme_giro_ordenado[len2].giro_cop) *
                            Math.round(
                              Math.abs(
                                (tri_validados[index][6] - fecha_giro) / oneDay
                              )
                            ),
                        ]);

                        ultimo_giro_incluidob = len2;
                        giro_sobranteb = 0;
                        fecha_ultimo_giro = data_mme_giro_ordenado[len2].fecha;
                      } else {
                        array_sub2M.push([
                          index + 1,
                          parseFloat(data_mme_giro_ordenado[len2].giro_cop) +
                            saldo,
                          Math.round(
                            Math.abs(
                              (tri_validados[index][6] - fecha_giro) / oneDay
                            )
                          ),
                          (parseFloat(data_mme_giro_ordenado[len2].giro_cop) +
                            saldo) *
                            Math.round(
                              Math.abs(
                                (tri_validados[index][6] - fecha_giro) / oneDay
                              )
                            ),
                        ]);
                        giro_sobranteb = -saldo;
                        ultimo_giro_incluidob = len2;
                        saldo = 0;
                        fecha_ultimo_giro = data_mme_giro_ordenado[len2].fecha;
                      }
                    }
                  }
                  len2++;
                }
            
                len3 = ultimo_giro_incluidob;
// SI aun quedan saldos miro los pagos posteirores al trimestre               

                while (len3 < data_mme_giro_ordenado.length - 1 && saldo > 0) {
                  //Evaluo si, hablando de que 2T, sea el primer trimestre del año el giro sea posterior al fin del trimestre
                  var fecha_giro = new Date(
                    parseFloat(data_mme_giro_ordenado[len3].fecha.substr(0, 4)),
                    parseFloat(
                      data_mme_giro_ordenado[len3].fecha.substr(5, 2)
                    ) - 1,
                    parseFloat(data_mme_giro_ordenado[len3].fecha.substr(8, 2))
                  );

                  if (
                    data_mme_giro_ordenado[len3].fondo === "FSSRI" &&
                    Date.parse(fecha_giro) > Date.parse(tri_validados[index][6])
                  ) {
                    //Se descuenta del saldo ese giro

                    if (giro_sobranteb > 0) {
                      saldo = saldo - giro_sobranteb;
                      var fecha_giro = new Date(
                        parseFloat(
                          data_mme_giro_ordenado[len3].fecha.substr(0, 4)
                        ),
                        parseFloat(
                          data_mme_giro_ordenado[len3].fecha.substr(5, 2)
                        ) - 1,
                        parseFloat(
                          data_mme_giro_ordenado[len3].fecha.substr(8, 2)
                        )
                      );
                      //se evalua si aunqueda saldo y se garda sub1 y N
                      if (saldo > 0) {
                        array_sub1N.push([
                          index + 1,
                          giro_sobranteb,
                          Math.round(
                            Math.abs(
                              (fecha_giro -
                                Date.parse(tri_validados[index][6])) /
                                oneDay
                            )
                          ),
                          giro_sobranteb *
                            Math.round(
                              Math.abs(
                                (fecha_giro - tri_validados[index][6]) / oneDay
                              )
                            ),
                        ]);

                        ultimo_giro_incluidob = len3;
                        giro_sobranteb = 0;
                      } else {
                        array_sub1N.push([
                          index + 1,
                          giro_sobranteb + saldo,
                          Math.round(
                            Math.abs(
                              (fecha_giro -
                                Date.parse(tri_validados[index][6])) /
                                oneDay
                            )
                          ),
                          (giro_sobranteb + saldo) *
                            Math.round(
                              Math.abs(
                                (fecha_giro - tri_validados[index][6]) / oneDay
                              )
                            ),
                        ]);
                        giro_sobranteb = -saldo;
                        ultimo_giro_incluidob = len3;
                        saldo = 0;
                      }
                    } else {
                      saldo =
                        saldo -
                        parseFloat(data_mme_giro_ordenado[len3].giro_cop);
                      //se evalua si aunqueda saldo y se garda sub1 y N
                      if (saldo > 0) {
                        array_sub1N.push([
                          index + 1,
                          parseFloat(data_mme_giro_ordenado[len3].giro_cop),
                          Math.round(
                            Math.abs(
                              (fecha_giro -
                                Date.parse(tri_validados[index][6])) /
                                oneDay
                            )
                          ),
                          parseFloat(data_mme_giro_ordenado[len3].giro_cop) *
                            Math.round(
                              Math.abs(
                                (fecha_giro - tri_validados[index][6]) / oneDay
                              )
                            ),
                        ]);
                        ultimo_giro_incluidob = len3;
                        fecha_ultimo_giro = data_mme_giro_ordenado[len3].fecha;
                      } else {
                        array_sub1N.push([
                          index + 1,
                          parseFloat(data_mme_giro_ordenado[len3].giro_cop) +
                            saldo,
                          Math.round(
                            Math.abs(
                              (fecha_giro -
                                Date.parse(tri_validados[index][6])) /
                                oneDay
                            )
                          ),
                          (parseFloat(data_mme_giro_ordenado[len3].giro_cop) +
                            saldo) *
                            Math.round(
                              Math.abs(
                                (fecha_giro - tri_validados[index][6]) / oneDay
                              )
                            ),
                        ]);
                        giro_sobranteb = -saldo;
                        ultimo_giro_incluidob = len3;
                        saldo = 0;
                        fecha_ultimo_giro = data_mme_giro_ordenado[len3].fecha;
                      }
                    }
                  }
                  len3++;
                }
               
                const registro = await Data_mme_validacion.findOne({
                  where: {
                    anho: tri_validados[index][2],
                    trimestre: tri_validados[index][1],
                    empresa_id: ctx.usuario.empresa,
                  },
                });

                if (registro) {
                  const resultado = await registro.update({
                    giro_sobrante: giro_sobranteb.toString(),
                    ultimo_giro_incluido: ultimo_giro_incluidob,
                  });
                } else {
                  throw new Error("Registro no encontrado.");
                }
              }
            
       
              giro_sobrante = giro_sobranteb;
              ultimo_giro_incluido = ultimo_giro_incluidob;
           
              var len1 = 0,
                len2 = 0,
                len3 = 0,
                sub2mt = [],
                sub1mt = [],
                sub2mpt = [],
                sub1npt = [],
                sub1p,
                sub2p,
                sub1np,
                sub2mp;
              while (len1 < 4) {
                len1++;
                sub1p = 0;
                sub2p = 0;
                sub1np = 0;
                sub2mp = 0;
                while (
                  len2 <
                  array_sub2M.filter((array_sub2M) => array_sub2M[0] === len1)
                    .length
                ) {
                  sub2p =
                    array_sub2M.filter(
                      (array_sub2M) => array_sub2M[0] === len1
                    )[len2][1] + sub2p;
                  sub2mp =
                    array_sub2M.filter(
                      (array_sub2M) => array_sub2M[0] === len1
                    )[len2][3] + sub2mp;
                  len2++;
                }
                sub2p = sub2p || 0;
                sub2mp = sub2mp || 0;

                sub2mt.push(sub2p);
                sub2mpt.push(sub2mp);
                len2 = 0;
                while (
                  len3 <
                  array_sub1N.filter((array_sub1N) => array_sub1N[0] === len1)
                    .length
                ) {
                  sub1p =
                    array_sub1N.filter(
                      (array_sub1N) => array_sub1N[0] === len1
                    )[len3][1] + sub1p;
                  sub1np =
                    array_sub1N.filter(
                      (array_sub1N) => array_sub1N[0] === len1
                    )[len3][3] + sub1np;
                  len3++;
                }
                sub1p = sub1p || 0;
                sub1np = sub1np || 0;

                sub1mt.push(sub1p);
                sub1npt.push(sub1np);
                len3 = 0;
              }

              sub1_ = (sub1mt[0] + sub1mt[1] + sub1mt[2] + sub1mt[3]) / 4;
              sub2_ = (sub2mt[0] + sub2mt[1] + sub2mt[2] + sub2mt[3]) / 4;

// Inicializa variables para contar y sumar los valores efectivos para el promedio
let sumaEfectiva = 0;
let cuentaEfectiva = 0;

// Iterar sobre cada elemento de sub1mt y sub1npt
for (let i = 0; i < sub1mt.length; i++) {
  if (sub1mt[i] > 0) { // Solo considerar si sub1mt[i] es mayor que cero
    sumaEfectiva += sub1npt[i] / sub1mt[i]; // Suma de los promedios efectivos
    cuentaEfectiva++; // Contar solo los trimestres válidos
  }
}

// Calcular n_Sub1_ usando los valores efectivos
if (cuentaEfectiva === 0) {
  n_Sub1_ = 0; // Si no hay trimestres válidos, el resultado es cero
} else {
  n_Sub1_ = roundToTwo(sumaEfectiva / cuentaEfectiva / 30); // Calcular el promedio solo con los trimestres válidos
}
           

              if (sub2mt[0] + sub2mt[1] + sub2mt[2] + sub2mt[3] === 0) {
                m_Sub2_ = 0;
              } else {
                m_Sub2_ = roundToTwo(
                  (sub2mpt[0] + sub2mpt[1] + sub2mpt[2] + sub2mpt[3]) /
                    (sub2mt[0] + sub2mt[1] + sub2mt[2] + sub2mt[3]) /
                    30
                );
              }
              input[index].n_Sub1 = n_Sub1_;
              input[index].m_Sub2 = m_Sub2_;

              function subtractWeeks(numOfWeeks, date = new Date()) {
                date.setDate(date.getDate() - numOfWeeks * 7);

                return date;
              }

              var firstDate = subtractWeeks(26);

              var len1 = 0,
                date_tcap,
                sum_tasa_x_monto_cap = 0,
                sum_monto_cap = 0,
                date_tcap;

              const data_banrepublica_tcap_e =
                await Data_banrepublica_tcap.findAll({
                  where: {
                    empresa_id: ctx.usuario.empresa,
                  },
                });

              while (len1 < data_banrepublica_tcap_e.length - 1) {
                len1++;
                date_tcap = new Date(
                  parseFloat(
                    data_banrepublica_tcap_e[len1].fecha.split("-")[0]
                  ),
                  parseFloat(
                    data_banrepublica_tcap_e[len1].fecha.split("-")[1]
                  ) - 1,
                  data_banrepublica_tcap_e[len1].fecha.split("-")[2]
                ).getTime();
                if (date_tcap >= firstDate) {
                  sum_tasa_x_monto_cap =
                    data_banrepublica_tcap_e[len1]
                      .tasa_a_30_cdats_cdat_bancos_comerciales *
                      data_banrepublica_tcap_e[len1]
                        .monto_a_30_cdat_bancos_comerciales +
                    sum_tasa_x_monto_cap;
                  sum_monto_cap =
                    data_banrepublica_tcap_e[len1]
                      .monto_a_30_cdat_bancos_comerciales + sum_monto_cap;
                }
              }
              tasaot = roundToTwo(
                (1 + sum_tasa_x_monto_cap / sum_monto_cap) ** (1 / 12) - 1
              );

              //r1 y r2:
              //1. Fecha del primer dia del segundo mes del ultimo trimestre
              //2. Fecha del primer dia del ultimo giro que le pego al ultimo trmestre
              //3. Recorrer matriz, consolidar tasa por monto y monto, que sea superior e inferior a las fechas
              //4. Dividir los consolidados

              //1. Fecha del primer dia des segundo mes del ultimo trimestre
              //2. Fecha del primer dia del ultimo giro que le pego al ultimo trmestre

              var firstDate = new Date(
                tri_validados[3][5].setMonth(tri_validados[3][5].getMonth() + 1)
              ).getTime();
              var secondDate = new Date(
                parseFloat(fecha_ultimo_giro.substr(0, 4)),
                parseFloat(fecha_ultimo_giro.substr(5, 2)) - 1,
                1
              ).getTime();

              data_mme_giro_ordenado.sort((a, b) =>
                a.fecha > b.fecha ? 1 : b.fecha > a.fecha ? -1 : 0
              );

              var len1 = 0,
                date_tcap,
                sum_tasa_x_monto_cap = 0,
                sum_monto_cap = 0,
                date_tcap,
                r2_;

              while (len1 < data_banrepublica_tcap_e.length - 1) {
                len1++;
                date_tcap = new Date(
                  parseFloat(
                    data_banrepublica_tcap_e[len1].fecha.split("-")[0]
                  ),
                  parseFloat(
                    data_banrepublica_tcap_e[len1].fecha.split("-")[1]
                  ) - 1,
                  parseFloat(data_banrepublica_tcap_e[len1].fecha.split("-")[2])
                ).getTime();
                if (date_tcap >= firstDate && date_tcap < secondDate) {
                  sum_tasa_x_monto_cap =
                    data_banrepublica_tcap_e[len1]
                      .tasa_a_30_cdats_cdat_bancos_comerciales *
                      data_banrepublica_tcap_e[len1]
                        .monto_a_30_cdat_bancos_comerciales +
                    sum_tasa_x_monto_cap;
                  sum_monto_cap =
                    data_banrepublica_tcap_e[len1]
                      .monto_a_30_cdat_bancos_comerciales + sum_monto_cap;
                }
              }
              r2_ = roundToTwo(
                (1 + sum_tasa_x_monto_cap / sum_monto_cap) ** (1 / 12) - 1
              );

              var len1 = 0,
                date_tco,
                sum_tasa_x_monto_co = 0,
                sum_monto_co = 0,
                conteo = 0,
                r1_;

              const data_banrepublica_tco_e =
                await Data_banrepublica_tco.findAll({
                  where: {
                    empresa_id: ctx.usuario.empresa,
                  },
                });

       
              const getSundayFromWeekNum = (weekNum, year) => {
                const sunday = new Date(year, 0, 1 + (weekNum - 1) * 7 - 7);
                while (sunday.getDay() !== 0) {
                  sunday.setDate(sunday.getDate() - 1);
                }
                return sunday;
              };

              while (len1 < data_banrepublica_tco_e.length - 1) {
                len1++;
                date_tco = getSundayFromWeekNum(
                  parseFloat(
                    data_banrepublica_tco_e[len1].anho_semana.substr(4, 2)
                  ) + 1,
                  parseFloat(
                    data_banrepublica_tco_e[len1].anho_semana.substr(0, 4)
                  )
                );

              
                if (date_tco >= firstDate && date_tco < secondDate) {
                  sum_tasa_x_monto_co =
                    data_banrepublica_tco_e[len1]
                      .tasa__cred_com_preferencial_o_corporativo *
                      data_banrepublica_tco_e[len1]
                        .monto__cred_com_preferencial_o_corporativo +
                    sum_tasa_x_monto_co;
                  sum_monto_co =
                    data_banrepublica_tco_e[len1]
                      .monto__cred_com_preferencial_o_corporativo +
                    sum_monto_co;
                  conteo++;
                }
              }
              
              r1_ = roundToTwo(
                (1 + sum_tasa_x_monto_co / sum_monto_co / 100) ** (1 / 12) - 1
              );

   

              //Últimos cuatro trimestres validados
              //1. Ir a la tabla y coger los ultimos cuatro
              //2. Promedio = Facturacióni,j,T:
              //2.1 Si Tri es 4 vaya y busque 1 2 y 3 del mismo año
              //2.2 Si Tri es 3 vaya y busque 2 1  del mismo año y 4 del año anterior
              //3. Giros recibidos en el trimestre versus el deficit de ese trimestre desde ese primer T en analisis ->Sub 2
              //4. Giros recibidos en el trimestre versus el deficit del proximo trimestre desde ese primer T en analisis ->Sub 1
              //5. For que recorra cada uno de los giros y vaya comparando?
              //6. N esos dias de retrazo
              //7. M esos dias de anticipo

              // OK Ordenar giros de menor a mayor
              // 1 para cada trimestre iniciando con el primero Deficit - Giro =Saldo || SI >0 || SI aun esta en trimestre => Dias desde inicio de trimestre hasta ese dia de giro    SUb 2 N
              // 2 para cada dato Deficit - Giro =Saldo || SI >0 || SI esta por fuera del trimestre => Dias desde fin  de trimestre hasta ese dia de giro    SUb 1 M
              // 3 para cada dato Deficit - Giro =Saldo || SI <0 || Paso al siguiente trimestre con ese ultimo saldo de giro que quedo volviendo a 1

              var cfs_ = 0,
                cfe_ = 0,
                c_ast_,
                cvr_;

              if (sub1_ >= 0 || sub2_ >= 0) {
                cfs_ =
                  ((sub1_ * ((1 + r1_) ** (n_Sub1_ + 0.63) - 1) -
                    sub2_ * ((1 + r2_) ** m_Sub2_ - 1)) /
                    facturacion_t_) *
                  100;
                cfe_ = cfs_ + 0.042;
              }

              data_empresam2 = await Data_empresa.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anhom2,
                  mes: mesm2,
                },
              });

              cvr_ = roundToTwo(
                ((1 - 0) * cfm_ * data_empresam2.numero_usuarios_r +
                  // cgcu_acu +
                  data_empresam.pui_cop_kwh) /
                  (data_empresam2.ventas_usuarios_r_nt1_e +
                    data_empresam2.ventas_usuarios_r_nt1_c +
                    data_empresam2.ventas_usuarios_r_nt1_u +
                    data_empresam2.ventas_usuarios_r_nt2 +
                    //618470 + se elimina 18-01-24 NID
                    data_empresam2.ventas_usuarios_r_nt3)
                //Se incluye por la Res CREG 101_028_2023, 18-01-24
                // El comercializador responsable de calcular el COT publica el preliminar por tarde el día 12 calendario de cada mes.
                //Con base en los comentarios que reciba, se hace la publicación oficial el día 14 calendario de cada mes.
                //Por tarde, el día 14 calendario de cada mes el comercializador responsable reporta el COT al CAC, en el formato Excel preferiblemente, para que nosotros lo publiquemos en la WEB del CAC.
                // +data_empresam[0].cot
              );

              data_Res_componentes_cu_tarifam =
                await Res_componentes_cu_tarifa.findOne({
                  where: {
                    empresa_id: ctx.usuario.empresa,
                    anho: anhom,
                    mes: mesm,
                    mercado: mercado,
                  },
                });

              if (!data_Res_componentes_cu_tarifam) {
                throw new Error(
                  `No existen datos de Tarifas para periodo ${mesm}-${anhom}`
                );
              }

              if (data_Res_componentes_cu_tarifam.dtun_nt1_e > 0) {
                c_ast_ = roundToTwo(
                  ((data_Res_componentes_cu_tarifam.gc +
                    data_Res_componentes_cu_tarifam.tx +
                    data_Res_componentes_cu_tarifam.dtun_nt1_e +
                    data_Res_componentes_cu_tarifam.pr_nt1 +
                    data_Res_componentes_cu_tarifam.r) *
                    (cfe_ + 2.73 + rc_)) /
                    100
                );
              } else {
                c_ast_ = roundToTwo(
                  ((data_Res_componentes_cu_tarifam.gc +
                    data_Res_componentes_cu_tarifam.tx +
                    data_Res_componentes_cu_tarifam.dnt1 +
                    data_Res_componentes_cu_tarifam.pr_nt1 +
                    data_Res_componentes_cu_tarifam.r) *
                    (cfe_ + 2.73 + rc_)) /
                    100
                );
              }

              data_xm_tserv = await Data_xm_tserv.findAll({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anhom,
                  mes: mesm,
                  agente: "EGVC",
                },
              });

              if (!data_xm_tserv) {
                throw new Error(
                  `No existen datos de TSERV para periodo ${mesm}-${anhom}`
                );
              }

              const data_xm_tservmcnd = data_xm_tserv.filter(
                (data_xm_tserv) => data_xm_tserv.concepto === "CND"
              )[0].dataValues.valor;
              const data_xm_tservmsic = data_xm_tserv.filter(
                (data_xm_tserv) => data_xm_tserv.concepto === "SIC"
              )[0].dataValues.valor;
              const data_xm_tservmsiciva = data_xm_tserv.filter(
                (data_xm_tserv) => data_xm_tserv.concepto === "SIC_IVA"
              )[0].dataValues.valor;

              cv_ = roundToTwo(
                c_ast_ +
                  cvr_ +
                  (cer_ +
                    data_xm_tservmcnd +
                    data_xm_tservmsiciva +
                    data_xm_tservmsic +
                    cg_acu) /
                    (data_empresam.ventas_usuarios_r_nt1_e +
                      data_empresam.ventas_usuarios_r_nt1_c +
                      data_empresam.ventas_usuarios_r_nt1_u +
                      data_empresam.ventas_usuarios_r_nt2 +
                      data_empresam.ventas_usuarios_r_nt3 +
                      data_empresam.ventas_usuarios_nr_kwh)
              );

              cV_nt1 = roundToTwo(cv_ + data_empresam.cot);
              cV_nt2 = cv_;
              cV_nt3 = cv_;
              cV_nt4 = cv_;

              if (anho == 2024 && mes == 2) {
                cV_nt1 = 135.7651; //  setCv_nt1(roundToTwo(cv_ + data_empresam[0].cot - 51.46 + 21.17)); Ajuste
              } else if (anho == 2024 && mes == 3) {
                cV_nt1 = 187.08042; //  setCv_nt1(roundToTwo(cv_ + data_empresam[0].cot - 51.46 + 21.17)); Ajuste
              }

              //cv_=98.8861  May 2022
              //cv_=78.96043 Jun 2022

              //Calcular el T

              var data_xm_stn = await Data_xm_stn.findOne({
                where: {
                  anho: anho,
                  mes: mes,
                },
              });

              if (!data_xm_stn) {
                throw new Error(
                  `No existen datos de STN para periodo ${mes}-${anho}`
                );
              }

              input[index].delta_t = data_xm_stn.delta_t_cop_kwh;

              input[index].t_prima = data_xm_stn.t_prima_cop_kwh;

              var tx_ = roundToTwo(input[index].delta_t + input[index].t_prima);

              const data_xm_guatape = await Data_xm_guatape.findOne({
                where: {
                  anho: anho,
                  mes: mes,
                  agente: ctx.usuario.empresa,
                },
              });

              if (!data_xm_guatape) {
                throw new Error(
                  `No existen datos de costos Guatape para periodo ${mes}-${anho}`
                );
              }

              //Calcular el R
              input[index].guatape = data_xm_guatape.crs_variable_guatape_cop;
              input[index].ventas_desv = data_xm_afac.ventas_en_desviacion_cop;
              input[index].rentas_cong = 0;
              input[index].total_restricciones = 0;
              input[index].restricciones_aliviadas =
                data_xm_afac.restricciones_aliviadas_cop;

              crs_ =
                data_xm_afac.restricciones_aliviadas_cop -
                data_xm_afac.ventas_en_desviacion_cop +
                input[index].guatape;

              r_ = roundToTwo(crs_ / ventas_totales);

              input[index].crs = crs_;
              input[index].rm = r_;

              //Calcular el PR ACTUALIZAR
              iprstn_ =
                data_xm_afac.perdida_real_kwh /
                (data_xm_afac.demanda_real_kwh + data_xm_afac.perdida_real_kwh);
              input[index].Iprstn = roundToTwo(iprstn_);

              const data_xm_ipr = await Data_xm_ipr.findAll({
                where: {
                  anho: anho,
                  mes: mes,
                  agrupaORMercado: "GUVM",
                  empresa_id: ctx.usuario.empresa,
                },
              });

              if (!data_xm_ipr) {
                throw new Error(
                  `No existen datos de IPR para periodo ${mes}-${anho}`
                );
              }

              var data_xm_iprm1 = data_xm_ipr.filter(
                (obj) =>
                  obj.dataValues && [1].includes(obj.dataValues.nivelEntrada)
              )[0].dataValues.valor;

              var data_xm_iprm2 = data_xm_ipr.filter(
                (obj) =>
                  obj.dataValues && [2].includes(obj.dataValues.nivelEntrada)
              )[0].dataValues.valor;
              var data_xm_iprm3 = data_xm_ipr.filter(
                (obj) =>
                  obj.dataValues && [3].includes(obj.dataValues.nivelEntrada)
              )[0].dataValues.valor;

              var data_xm_iprm4 = data_xm_ipr.filter(
                (obj) =>
                  obj.dataValues && [4].includes(obj.dataValues.nivelEntrada)
              )[0].dataValues.valor;

              data_xm_cprogm = await Data_xm_cprog.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anho,
                  mes: mes,
                  agente: "EGVD",
                },
              });

              if (!data_xm_cprogm) {
                throw new Error(
                  `No existen datos de CPROGM para periodo ${mes}-${anho}`
                );
              }

              var pr_nt1_, pr_nt2_, pr_nt3_, pr_nt4_;

              pr_nt1_ = roundToTwo(
                (gc_ * (data_xm_iprm1 + iprstn_)) /
                  (1 - (data_xm_iprm1 + iprstn_)) +
                  (tx_ * data_xm_iprm1) / (1 - data_xm_iprm1) +
                  data_xm_cprogm.cargo_cprog_cop_kwh
              );
              pr_nt2_ = roundToTwo(
                (gc_ * (data_xm_iprm2 + iprstn_)) /
                  (1 - (data_xm_iprm2 + iprstn_)) +
                  (tx_ * data_xm_iprm2) / (1 - data_xm_iprm2) +
                  data_xm_cprogm.cargo_cprog_cop_kwh
              );
              pr_nt3_ = roundToTwo(
                (gc_ * (data_xm_iprm3 + iprstn_)) /
                  (1 - (data_xm_iprm3 + iprstn_)) +
                  (tx_ * data_xm_iprm3) / (1 - data_xm_iprm3) +
                  data_xm_cprogm.cargo_cprog_cop_kwh
              );
              pr_nt4_ = roundToTwo(
                (gc_ * (data_xm_iprm4 + iprstn_)) /
                  (1 - (data_xm_iprm4 + iprstn_)) +
                  (tx_ * data_xm_iprm4) / (1 - data_xm_iprm4) +
                  data_xm_cprogm.cargo_cprog_cop_kwh
              );

              input[index].pr_nt1 = pr_nt1_;
              input[index].pr_nt2 = pr_nt2_;
              input[index].pr_nt3 = pr_nt3_;
              input[index].pr_nt4 = pr_nt4_;

              // CAlculo CU

              cu_nt1_100_ = roundToTwo(
                gc_ + tx_ + r_ + cV_nt1 + pr_nt1_ + input[index].dnt1
              );
              cu_nt1_50_ = roundToTwo(
                gc_ +
                  tx_ +
                  r_ +
                  cV_nt1 +
                  pr_nt1_ +
                  input[index].dnt1 -
                  input[index].cdi_100 / 2
              );
              cu_nt1_0_ = roundToTwo(
                gc_ +
                  tx_ +
                  r_ +
                  cV_nt1 +
                  pr_nt1_ +
                  input[index].dnt1 -
                  input[index].cdi_100
              );
              cu_nt2_ = roundToTwo(
                gc_ + tx_ + r_ + cV_nt2 + pr_nt2_ + input[index].dnt2
              );
              cu_nt3_ = roundToTwo(
                gc_ + tx_ + r_ + cV_nt3 + pr_nt3_ + input[index].dnt3
              );
              cu_nt4_ = roundToTwo(
                gc_ + tx_ + r_ + cV_nt4 + pr_nt4_ + input[index].dnt4
              );

              input[index].cu_nt1_100_esp = cu_nt1_100_;
              input[index].cu_nt1_50_esp = cu_nt1_50_;
              input[index].cu_nt1_0_esp = cu_nt1_0_;
              input[index].cu_nt2 = cu_nt2_;
              input[index].cu_nt3 = cu_nt3_;
              input[index].cu_nt4 = cu_nt4_;

              const tarifamc1_100 =
                data_Res_componentes_cu_tarifam.nt1_100_estrato_1_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt1_100_ / data_Res_componentes_cu_tarifam.cu_nt1_100
                );
              const tarifamc2_100 =
                data_Res_componentes_cu_tarifam.nt1_100_estrato_2_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt1_100_ / data_Res_componentes_cu_tarifam.cu_nt1_100
                );
              const tarifamc1_50 =
                data_Res_componentes_cu_tarifam.nt1_50_estrato_1_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt1_50_ / data_Res_componentes_cu_tarifam.cu_nt1_50
                );
              const tarifamc2_50 =
                data_Res_componentes_cu_tarifam.nt1_50_estrato_2_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt1_50_ / data_Res_componentes_cu_tarifam.cu_nt1_50
                );
              const tarifamc1_0 =
                data_Res_componentes_cu_tarifam.nt1_0_estrato_1_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt1_0_ / data_Res_componentes_cu_tarifam.cu_nt1_0
                );
              const tarifamc2_0 =
                data_Res_componentes_cu_tarifam.nt1_0_estrato_2_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt1_0_ / data_Res_componentes_cu_tarifam.cu_nt1_0
                );
              const tarifamc1_NT2 =
                data_Res_componentes_cu_tarifam.nt2_estrato_1_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt2_ / data_Res_componentes_cu_tarifam.cu_nt2
                );
              const tarifamc1_NT3 =
                data_Res_componentes_cu_tarifam.nt3_estrato_1_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt3_ / data_Res_componentes_cu_tarifam.cu_nt3
                );
              const tarifamc1_NT4 =
                data_Res_componentes_cu_tarifam.nt4_estrato_1_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt4_ / data_Res_componentes_cu_tarifam.cu_nt4
                );
              const tarifamc2_NT2 =
                data_Res_componentes_cu_tarifam.nt2_estrato_2_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt2_ / data_Res_componentes_cu_tarifam.cu_nt2
                );
              const tarifamc2_NT3 =
                data_Res_componentes_cu_tarifam.nt3_estrato_2_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt3_ / data_Res_componentes_cu_tarifam.cu_nt3
                );
              const tarifamc2_NT4 =
                data_Res_componentes_cu_tarifam.nt4_estrato_2_men_cs *
                Math.min(
                  ipcm / ipcm2,
                  cu_nt4_ / data_Res_componentes_cu_tarifam.cu_nt4
                );

              var porc_sube1_100_,
                porc_sube2_100_,
                porc_sube1_50_,
                porc_sube2_50_,
                porc_sube1_0_,
                porc_sube2_0_,
                porc_sube1_nt2_;

              if (1 - tarifamc1_100 / cu_nt1_100_ < 0.6) {
                porc_sube1_100_ = 1 - tarifamc1_100 / cu_nt1_100_;
              } else {
                porc_sube1_100_ = 0.6;
              }

              if (1 - tarifamc2_100 / cu_nt1_100_ < 0.5) {
                porc_sube2_100_ = 1 - tarifamc2_100 / cu_nt1_100_;
              } else {
                porc_sube2_100_ = 0.5;
              }
              if (1 - tarifamc1_50 / cu_nt1_50_ < 0.6) {
                porc_sube1_50_ = 1 - tarifamc1_50 / cu_nt1_50_;
              } else {
                porc_sube1_50_ = 0.6;
              }
              if (1 - tarifamc2_50 / cu_nt1_50_ < 0.5) {
                porc_sube2_50_ = 1 - tarifamc2_50 / cu_nt1_50_;
              } else {
                porc_sube2_50_ = 0.5;
              }
              if (1 - tarifamc1_0 / cu_nt1_0_ < 0.6) {
                porc_sube1_0_ = 1 - tarifamc1_0 / cu_nt1_0_;
              } else {
                porc_sube1_0_ = 0.6;
              }
              if (1 - tarifamc2_0 / cu_nt1_0_ < 0.5) {
                porc_sube2_0_ = 1 - tarifamc2_0 / cu_nt1_0_;
              } else {
                porc_sube2_0_ = 0.5;
              }
              if (1 - tarifamc1_NT2 / cu_nt2_ < 0.6) {
                porc_sube1_nt2_ = 1 - tarifamc1_NT2 / cu_nt2_;
              } else {
                porc_sube1_nt2_ = 0.6;
              }

              if (1 - tarifamc1_NT3 / cu_nt3_ < 0.6) {
                porc_sube1_nt3_ = 1 - tarifamc1_NT3 / cu_nt3_;
              } else {
                porc_sube1_nt3_ = 0.6;
              }

              if (1 - tarifamc1_NT4 / cu_nt4_ < 0.6) {
                porc_sube1_nt4_ = 1 - tarifamc1_NT4 / cu_nt4_;
              } else {
                porc_sube1_nt4_ = 0.6;
              }
              if (1 - tarifamc2_NT2 / cu_nt2_ < 0.5) {
                porc_sube2_nt2_ = 1 - tarifamc2_NT2 / cu_nt2_;
              } else {
                porc_sube2_nt2_ = 0.5;
              }
              if (1 - tarifamc2_NT3 / cu_nt3_ < 0.5) {
                porc_sube2_nt3_ = 1 - tarifamc2_NT3 / cu_nt3_;
              } else {
                porc_sube2_nt3_ = 0.5;
              }
              if (1 - tarifamc2_NT4 / cu_nt4_ < 0.5) {
                porc_sube2_nt4_ = 1 - tarifamc2_NT4 / cu_nt4_;
              } else {
                porc_sube2_nt4_ = 0.5;
              }

              if (cgsubasta_acu > 0 || cg_acu > 0 || cgcu_acu > 0) {
                var recuperacionGarantias = "Si";
                var observaciónRecuperacionGarantias = "";
              } else {
                var recuperacionGarantias = "No";
                var observaciónRecuperacionGarantias =
                  "La empresa cubre los cargos por uso del MEM y STR a través de prepago con cuenta custodia";
              }

              var nuevoObjetoF1 = {
                recuperacion_garantias: recuperacionGarantias,
                observacion_recuperacion_garantias:
                  observaciónRecuperacionGarantias,
                mes: input[index].mes,
                anho: input[index].anho,
                creador: ctx.usuario.id,
                empresa_id: ctx.usuario.empresa,
              };

              await DataFormulario1SSPD.create(nuevoObjetoF1);

              for (
                let indexGarantias = 0;
                indexGarantias < data_empresa_garantiasm.length;
                indexGarantias++
              ) {
                let meses_garantizados = dateRange(
                  data_empresa_garantiasm[indexGarantias].fecha_inicio_vigencia,
                  data_empresa_garantiasm[indexGarantias].fecha_fin_vigencia
                );

                let tipo_garantia;
                if (
                  data_empresa_garantiasm[indexGarantias].tipo_garantia ===
                    "Subasta_FERNC" ||
                  data_empresa_garantiasm[indexGarantias].tipo_garantia ===
                    "MEM"
                ) {
                  tipo_garantia = 1;
                } else if (
                  data_empresa_garantiasm[indexGarantias].tipo_garantia ===
                  "STR"
                ) {
                  tipo_garantia = 4;
                }

                let nuevoObjetoF2 = {
                  tipo_garantia: tipo_garantia,
                  nit_beneficiario:
                    data_empresa_garantiasm[indexGarantias].nit_beneficiario,
                  dv_beneficiario:
                    data_empresa_garantiasm[indexGarantias].dv_beneficiario,
                  emisor: data_empresa_garantiasm[indexGarantias].emisor, // Asumiendo que 'emisor' es diferente de 'dv_beneficiario'
                  numero_garantia:
                    data_empresa_garantiasm[indexGarantias].numero_garantia,
                  mes_recuperacion: input[index].mes, // Asegúrate de que esto esté definido fuera del bucle
                  fecha_inicio_vigencia:
                    data_empresa_garantiasm[indexGarantias]
                      .fecha_inicio_vigencia,
                  fecha_finalizacion_vigencia:
                    data_empresa_garantiasm[indexGarantias].fecha_fin_vigencia,
                  valor_total_garantia:
                    data_empresa_garantiasm[indexGarantias].valor_garantia,
                  costo_garantia:
                    data_empresa_garantiasm[indexGarantias].costo_garantia,
                  costo_a_recuperar:
                    data_empresa_garantiasm[indexGarantias].costo_garantia /
                    (meses_garantizados.length - 1),
                  creador: ctx.usuario.id,
                  empresa_id: ctx.usuario.empresa,
                  anho: input[index].anho,
                  mes: input[index].mes,
                };

                await DataFormato2SSPD.create(nuevoObjetoF2);
              }

              data_Res_componentes_cu_tarifam1 =
                await Res_componentes_cu_tarifa.findOne({
                  where: {
                    empresa_id: ctx.usuario.empresa,
                    anho: anhom,
                    mes: mesm,
                    mercado: mercado,
                  },
                });

              // for (let indexF6 = 0; indexF6 < 5; indexF6++) {
              //   if (indexF6 === 0) {
              //     nt_prop = "1-100";
              //     sam = input[index].saldo_nt1_100_ot;
              //     cuvc = input[index].cu_nt1_100;
              //     cuv = input[index].cu_nt1_100_ot;
              //     sam1 = data_Res_componentes_cu_tarifam1.saldo_nt1_100_ot;
              //     cuvc1 = data_Res_componentes_cu_tarifam1.cu_nt1_100;
              //     cuv1 = data_Res_componentes_cu_tarifam1.cu_nt1_100_ot;
              //   }
              //   if (indexF6 === 1) {
              //     nt_prop = "1-50";
              //     sam = input[index].saldo_nt1_50_ot;
              //     cuvc = input[index].cu_nt1_50;
              //     cuv = input[index].cu_nt1_50_ot;
              //     sam1 = data_Res_componentes_cu_tarifam1.saldo_nt1_50_ot;
              //     cuvc1 = data_Res_componentes_cu_tarifam1.cu_nt1_50;
              //     cuv1 = data_Res_componentes_cu_tarifam1.cu_nt1_50_ot;
              //   }
              //   if (indexF6 === 2) {
              //     nt_prop = "1-0";
              //     sam = input[index].saldo_nt1_0_ot;
              //     cuvc = input[index].cu_nt1_0;
              //     cuv = input[index].cu_nt1_0_ot;
              //     sam1 = data_Res_componentes_cu_tarifam.saldo_nt1_0_ot;
              //     cuvc1 = data_Res_componentes_cu_tarifam.cu_nt1_0;
              //     cuv1 = data_Res_componentes_cu_tarifam.cu_nt1_0_ot;
              //   }
              //   if (indexF6 === 3) {
              //     nt_prop = "2";
              //     sam = input[index].saldo_nt2_ot;
              //     cuvc = input[index].cu_nt2;
              //     cuv = input[index].cu_nt2_ot;
              //     sam1 = data_Res_componentes_cu_tarifam.saldo_nt2_ot;
              //     cuvc1 = data_Res_componentes_cu_tarifam.cu_nt2;
              //     cuv1 = data_Res_componentes_cu_tarifam.cu_nt2_ot;
              //   }
              //   if (indexF6 === 4) {
              //     nt_prop = "3";
              //     sam = input[index].saldo_nt3_ot;
              //     cuvc = input[index].cu_nt3;
              //     cuv = input[index].cu_nt3_ot;
              //     sam1 = data_Res_componentes_cu_tarifam.saldo_nt3_ot;
              //     cuvc1 = data_Res_componentes_cu_tarifam.cu_nt3;
              //     cuv1 = data_Res_componentes_cu_tarifam.cu_nt3_ot;
              //   }

              //   var nuevoObjetoF6 = {
              //     idMercado: mercado,
              //     ntProp: nt_prop,
              //     pv: input[index].pv,
              //     sam1: sam1,
              //     vRt1: 1,
              //     cuvc: roundToTwo(cuvc),
              //     cuvm1: roundToTwo(cuvc1),
              //     cuv: roundToTwo(cuv),
              //     vRm1: 1, //Ventas en el NT
              //     rEM: 2, //Tasa de Interes
              //     sam: roundToTwo(sam),
              //     aplicoOpcionTarifaria: 0,
              //     creador: ctx.usuario.id,
              //     empresa_id: ctx.usuario.empresa,
              //     anho: input[index].anho,
              //     mes: input[index].mes,
              //   };
              //   await DataFormato6SSPD.create(nuevoObjetoF6);
              // }
              function calcularMGTrim(trim) {
                // Determinar el mes basado en el trimestre
                // trim = 1 (Ene, Feb, Mar) => mgtrim = Feb => 2
                // trim = 2 (Abr, May, Jun) => mgtrim = May => 5
                // trim = 3 (Jul, Ago, Sep) => mgtrim = Ago => 8
                // trim = 4 (Oct, Nov, Dic) => mgtrim = Nov => 11

                if (trim < 1 || trim > 4) {
                  console.error(
                    "Trim incorrecto. El valor de 'trim' debe estar entre 1 y 4."
                  );
                  return; // Salir si el trimestre no es válido
                }

                const segundoMes = (trim - 1) * 3 + 2; // Calcula el segundo mes del trimestre
                return segundoMes;
              }
              var nuevoObjetoF9 = {
                anho: anho,
                mes: mes,
                idmercado: mercado,
                ecc: parseInt(Energia_contratos),
                vecc: parseInt(Costo_contratos),
                aecc: 0,
                avecc: 0,
                amc: 0,
                cb_mr: parseInt(afacm.compras_energia_en_bolsa_kwh),
                vcb_mr: parseInt(afacm.compras_energia_en_bolsa_cop),
                acb_mr: 0,
                avcbmr: 0,
                cb_mnr: 0,
                vcb_mnr: 0,
                agpe: 0,
                gd: 0,
                gtr: 0,
                cug: cgsubasta_acu,
                clp: parseInt(Energia_contratos_sub),
                aclp: 0,
                w: w1 * 100, //Revisar concepto SSPD
                psa: pcSub_,
                egp: 0,
                adm: 0, //Inlcuir? AJ
                vrm1: ventas_totales,
                i: 0,
                aj: aj_,
                alfa: alfa,
                dcr_agpe: 0,
                admre: 0,
                aprre_g: 0,
                adr_iprstn: 0,
                apr_iprstn: 0,
                arest: 0, //tener en cuenta versiones posteriores a TXF
                cfj: data_creg_cxm[0].Cf,
                rct: data_creg_cxm[0].RCT,
                rcae: data_creg_cxm[0].RCAE,
                ifssri: 0,
                ifoes: 0,
                balancesubsidios: 1, //Deficitario
                ano: maxa,
                trim: maxt,
                mgtrim: calcularMGTrim(maxt),
                sub1: parseInt(sub1_),
                sub2: parseInt(sub2_),
                n: n_Sub1_,
                m: m_Sub2_,
                r1: roundToTwo(r1_ * 100),
                r2: roundToTwo(r2_ * 100),
                facturacion: facturacion_t_,
                actividad: 2, //cx integrado
                porc_creg_cx: data_empresaanualm[0].porc_contribucion_creg,
                porc_sspd_cx: data_empresaanualm[0].porc_contribucion_sspd,
                costo_creg_valor: parseInt(
                  data_empresaanualm[0].contribuciones_creg / 12
                ),
                costo_sspd_valor: parseInt(
                  data_empresaanualm[0].contribuciones_sspd / 12
                ),
                pui: 0,
                creador: parseInt(ctx.usuario.id),
                empresa_id: ctx.usuario.empresa,
              };

              await DataFormato9SSPD.create(nuevoObjetoF9);

              //
              //
              //
              //

              input[index].ventas_totales = ventas_totales;
              input[index].data_xm_iprm1 = data_xm_iprm1;
              input[index].data_xm_iprm2 = data_xm_iprm2;
              input[index].data_xm_iprm3 = data_xm_iprm3;
              input[index].data_xm_iprm4 = data_xm_iprm4;

              input[index].pc = pc_;
              input[index].max_g = max_g_;
              input[index].ref_g = max_g_ / 1.3;
              input[index].tx = tx_;
              input[index].r = r_;
              input[index].pr_nt1 = pr_nt1_;
              input[index].pr_nt2 = pr_nt2_;
              input[index].pr_nt3 = pr_nt3_;
              input[index].pr_nt4 = pr_nt4_;
              input[index].cer = cer_;
              input[index].cfm = cfm_;
              input[index].cfs = cfs_;
              input[index].cfe = cfe_;
              input[index].rc = rc_;
              input[index].r1 = r1_;
              input[index].r2 = r2_;
              input[index].cv = cv_;
              input[index].cvr = cvr_;
              input[index].cv_nt1 = cV_nt1;
              input[index].cv_nt2 = cV_nt2;
              input[index].cv_nt3 = cV_nt3;
              input[index].cv_nt4 = cV_nt4;
              input[index].sub1 = sub1_;
              input[index].sub2 = sub2_;
              input[index].n_sub1 = n_Sub1_;
              input[index].m_sub2 = m_Sub2_;
              input[index].ul_trim_val_mme = maxt;
              input[index].anho_ul_trim_val_mme = maxa;
              input[index].facturacion_t = facturacion_t_;
              input[index].c_ast = c_ast_;
              input[index].cu_nt1_100 = cu_nt1_100_;
              input[index].cu_nt1_50 = cu_nt1_50_;
              input[index].cu_nt1_0 = cu_nt1_0_;

              input[index].nt1_100_estrato_1_men_cs = roundToTwo(
                cu_nt1_100_ * (1 - porc_sube1_100_)
              );
              input[index].nt1_100_estrato_2_men_cs = roundToTwo(
                cu_nt1_100_ * (1 - porc_sube2_100_)
              );

              input[index].nt1_100_estrato_3_men_cs = roundToTwo(
                cu_nt1_100_ * (1 - 0.15)
              );
              input[index].nt1_100_estrato_4_men_cs = roundToTwo(cu_nt1_100_);
              input[index].nt1_100_estrato_5_men_cs = roundToTwo(
                cu_nt1_100_ * 1.2
              );
              input[index].nt1_100_estrato_6_men_cs = roundToTwo(
                cu_nt1_100_ * 1.2
              );
              input[index].nt1_100_estrato_4 = roundToTwo(cu_nt1_100_);
              input[index].nt1_100_estrato_5 = roundToTwo(cu_nt1_100_ * 1.2);
              input[index].nt1_100_estrato_6 = roundToTwo(cu_nt1_100_ * 1.2);
              input[index].nt1_100_c = roundToTwo(cu_nt1_100_ * 1.2);
              input[index].nt1_100_i_con_c = roundToTwo(cu_nt1_100_ * 1.2);
              input[index].nt1_100_i_sin_c = roundToTwo(cu_nt1_100_);
              input[index].nt1_100_p = roundToTwo(cu_nt1_100_);
              input[index].nt1_100_o = roundToTwo(cu_nt1_100_);
              input[index].nt1_50_estrato_1_men_cs = roundToTwo(
                cu_nt1_50_ * (1 - porc_sube1_50_)
              );
              input[index].nt1_50_estrato_2_men_cs = roundToTwo(
                cu_nt1_50_ * (1 - porc_sube2_50_)
              );
              input[index].nt1_50_estrato_3_men_cs = roundToTwo(
                cu_nt1_50_ * (1 - 0.15)
              );
              input[index].nt1_50_estrato_4_men_cs = roundToTwo(cu_nt1_50_);
              input[index].nt1_50_estrato_5_men_cs = roundToTwo(
                cu_nt1_50_ * 1.2
              );
              input[index].nt1_50_estrato_6_men_cs = roundToTwo(
                cu_nt1_50_ * 1.2
              );
              input[index].nt1_50_estrato_4 = roundToTwo(cu_nt1_50_ * 1);
              input[index].nt1_50_estrato_5 = roundToTwo(cu_nt1_50_ * 1.2);
              input[index].nt1_50_estrato_6 = roundToTwo(cu_nt1_50_ * 1.2);
              input[index].nt1_50_c = roundToTwo(cu_nt1_50_ * 1.2);
              input[index].nt1_50_i_con_c = roundToTwo(cu_nt1_50_ * 1.2);
              input[index].nt1_50_i_sin_c = roundToTwo(cu_nt1_50_ * 1);
              input[index].nt1_50_p = roundToTwo(cu_nt1_50_ * 1);
              input[index].nt1_50_o = roundToTwo(cu_nt1_50_ * 1);
              input[index].nt1_0_estrato_1_men_cs = roundToTwo(
                cu_nt1_0_ * (1 - porc_sube1_0_)
              );
              input[index].nt1_0_estrato_2_men_cs = roundToTwo(
                cu_nt1_0_ * (1 - porc_sube2_0_)
              );
              input[index].nt1_0_estrato_3_men_cs = roundToTwo(
                cu_nt1_0_ * (1 - 0.15)
              );
              input[index].nt1_0_estrato_4_men_cs = roundToTwo(cu_nt1_0_ * 1);
              input[index].nt1_0_estrato_5_men_cs = roundToTwo(cu_nt1_0_ * 1.2);
              input[index].nt1_0_estrato_6_men_cs = roundToTwo(cu_nt1_0_ * 1.2);
              input[index].nt1_0_estrato_4 = roundToTwo(cu_nt1_0_);
              input[index].nt1_0_estrato_5 = roundToTwo(cu_nt1_0_ * 1.2);
              input[index].nt1_0_estrato_6 = roundToTwo(cu_nt1_0_ * 1.2);

              input[index].nt1_0_c = roundToTwo(cu_nt1_0_ * 1.2);
              input[index].nt2_c = roundToTwo(cu_nt2_ * 1.2);
              input[index].nt2_estrato_1_men_cs = roundToTwo(
                cu_nt2_ * (1 - porc_sube1_nt2_)
              );
              input[index].nt3_estrato_1_men_cs = roundToTwo(
                cu_nt3_ * (1 - porc_sube1_nt3_)
              );
              input[index].nt4_estrato_1_men_cs = roundToTwo(
                cu_nt4_ * (1 - porc_sube1_nt4_)
              );
              input[index].nt2_estrato_2_men_cs = roundToTwo(
                cu_nt2_ * (1 - porc_sube2_nt2_)
              );
              input[index].nt3_estrato_2_men_cs = roundToTwo(
                cu_nt3_ * (1 - porc_sube2_nt3_)
              );
              input[index].nt4_estrato_2_men_cs = roundToTwo(
                cu_nt4_ * (1 - porc_sube2_nt4_)
              );

              input[index].nt1_100_i_con_c = roundToTwo(cu_nt1_100_ * 1.2);
              input[index].nt1_100_i_sin_c = cu_nt1_100_;

              input[index].nt1_100_p = cu_nt1_100_;

              input[index].nt1_100_o = cu_nt1_100_;

              input[index].nt1_50_i_con_c = roundToTwo(cu_nt1_50_ * 1.2);
              input[index].nt1_50_i_sin_c = cu_nt1_50_;

              input[index].nt1_50_p = cu_nt1_50_;

              input[index].nt1_50_o = cu_nt1_50_;

              input[index].nt1_0_i_con_c = roundToTwo(cu_nt1_0_ * 1.2);
              input[index].nt1_0_i_sin_c = cu_nt1_0_;

              input[index].nt1_0_p = cu_nt1_0_;

              input[index].nt1_0_o = cu_nt1_0_;

              input[index].nt2_i_con_c = roundToTwo(cu_nt2_ * 1.2);
              input[index].nt2_i_sin_c = cu_nt2_;
              input[index].nt2_o = cu_nt2_;
              input[index].nt2_ap = cu_nt2_;
              input[index].nt2_bsnmay_cs = cu_nt2_;

              input[index].cu_nt1_100_ot = cu_nt1_100_;
              input[index].cu_nt1_50_ot = cu_nt1_50_;
              input[index].cu_nt1_0_ot = cu_nt1_0_;
              input[index].cu_nt2_ot = cu_nt2_;
              input[index].cu_nt3_ot = cu_nt3_;
              input[index].cu_nt4_ot = cu_nt4_;

              input[index].pv = 0;
              input[index].saldo_nt1_100_ot = 0;
              input[index].saldo_nt1_50_ot = 0;
              input[index].saldo_nt1_0_ot = 0;
              input[index].saldo_nt2_ot = 0;
              input[index].saldo_nt3_ot = 0;
              input[index].giro_sobrante = giro_sobrante;
              input[index].ultimo_giro_incluido = ultimo_giro_incluido;
              // input[index].cg=

              input[index].cgcu = cgcu_acu;
              input[index].cg = cg_acu;

              input[index].cot = data_empresam.cot;
              input[index].sup_def = 0;
              input[index].nt2_bsnmen_cs = roundToTwo(
                cu_nt2_ * (1 - porc_sube1_nt2_)
              );
              input[index].nt2_bsnmay_cs = cu_nt2_;
              input[index].nt3_c = cu_nt3_ * 1.2;
              input[index].nt3_i_con_c = cu_nt3_ * 1.2;
              input[index].nt3_i_sin_c = cu_nt3_ * 1.2;
              input[index].nt3_o = cu_nt3_;
              input[index].nt3_ap = cu_nt3_;

              for (let indexF3 = 1; indexF3 < 10; indexF3++) {
                // Suponiendo que data_Res_componentes_cu_tarifam[0] contiene datos relevantes fuera del bucle.
                // Aquí iría la lógica para asignar valores a las variables de tarifa basadas en `indexF3` y `opcionTarifaria`.
                // Por ejemplo:

                if (indexF3 === 1) {
                  Tarifa_100 = input[index].nt1_100_estrato_1_men_cs;
                  Tarifa_50 = input[index].nt1_50_estrato_1_men_cs;
                  Tarifa_0 = input[index].nt1_0_estrato_1_men_cs;
                  Tarifa_NT2 = input[index].nt2_estrato_1_men_cs;
                  Tarifa_NT3 = input[index].nt3_estrato_1_men_cs;
                  Tarifa_NT4 = input[index].nt4_estrato_1_men_cs;
                  porcentajeSubsidiado100OR_ = porc_sube1_100_;
                  porcentajeSubsidiado50OR_ = porc_sube1_50_;
                  porcentajeSubsidiado0OR_ = porc_sube1_0_;
                }
                if (indexF3 === 2) {
                  Tarifa_100 = input[index].nt1_100_estrato_2_men_cs;
                  Tarifa_50 = input[index].nt1_50_estrato_2_men_cs;
                  Tarifa_0 = input[index].nt1_0_estrato_2_men_cs;
                  Tarifa_NT2 = input[index].nt2_estrato_2_men_cs;
                  Tarifa_NT3 = input[index].nt3_estrato_2_men_cs;
                  Tarifa_NT4 = input[index].nt4_estrato_2_men_cs;
                  porcentajeSubsidiado100OR_ = porc_sube2_100_;
                  porcentajeSubsidiado50OR_ = porc_sube2_50_;
                  porcentajeSubsidiado0OR_ = porc_sube2_0_;
                }
                if (indexF3 === 3) {
                  Tarifa_100 = input[index].nt1_100_estrato_3_men_cs;
                  Tarifa_50 = input[index].nt1_50_estrato_3_men_cs;
                  Tarifa_0 = input[index].nt1_0_estrato_3_men_cs;
                  Tarifa_NT2 = cu_nt2_ * 0.85;
                  Tarifa_NT3 = cu_nt3_ * 0.85;
                  Tarifa_NT4 = cu_nt4_ * 0.85;
                  porcentajeSubsidiado100OR_ = 0.15;
                  porcentajeSubsidiado50OR_ = 0.15;
                  porcentajeSubsidiado0OR_ = 0.15;
                }
                if (
                  indexF3 === 4 ||
                  indexF3 === 7 ||
                  indexF3 === 9 ||
                  indexF3 === 11
                ) {
                  Tarifa_100 = input[index].nt1_100_estrato_4;
                  Tarifa_50 = input[index].nt1_50_estrato_4;
                  Tarifa_0 = input[index].nt1_0_estrato_4;
                  Tarifa_NT2 = cu_nt2_;
                  Tarifa_NT3 = cu_nt3_;
                  Tarifa_NT4 = cu_nt4_;
                  porcentajeSubsidiado100OR_ = 0;
                  porcentajeSubsidiado50OR_ = 0;
                  porcentajeSubsidiado0OR_ = 0;
                }
                if (
                  indexF3 === 5 ||
                  indexF3 === 6 ||
                  indexF3 === 8 ||
                  indexF3 === 10
                ) {
                  Tarifa_100 = input[index].nt1_100_estrato_5;
                  Tarifa_50 = input[index].nt1_50_estrato_5;
                  Tarifa_0 = input[index].nt1_0_estrato_5;
                  Tarifa_NT2 = cu_nt2_ * 1.2;
                  Tarifa_NT3 = cu_nt3_ * 1.2;
                  Tarifa_NT4 = cu_nt4_ * 1.2;
                  porcentajeSubsidiado100OR_ = 0;
                  porcentajeSubsidiado50OR_ = 0;
                  porcentajeSubsidiado0OR_ = 0;
                }

                let nuevoObjetoF3 = {
                  idMercado: mercado, // Asegúrate de que mercado esté definido
                  cargoHorario: 4, // Ejemplo estático
                  inicioFranjaHoraria: "0:00", // Ejemplo estático
                  finFranjaHoraria: "23:59", // Ejemplo estático
                  estratoOSector: indexF3, // Aquí usamos indexF3 directamente o alguna lógica basada en él
                  porcentajeSubsidiado100OR: porcentajeSubsidiado100OR_,
                  porcentajeSubsidiado50OR: porcentajeSubsidiado50OR_,
                  porcentajeSubsidiado0OR: porcentajeSubsidiado0OR_,
                  tarifaNivel1100OR: Tarifa_100,
                  tarifaNivel150OR: Tarifa_50,
                  tarifaNivel10OR: Tarifa_0,
                  tarifaNivel2: Tarifa_NT2,
                  tarifaNivel3: Tarifa_NT3,
                  tarifaNivel4: Tarifa_NT4,
                  cfm: cfm_, // Ejemplo, asegúrate de que este dato está definido
                  fechaPublicacion: null, // Ejemplo nulo, ajusta según sea necesario
                  diarioPublicacion: null, // Ejemplo nulo, ajusta según sea necesario
                  tarifaOT: 2, // Asegúrate de que opcionTarifaria esté definida 1 Si / 2 No
                  creador: ctx.usuario.id,
                  empresa_id: ctx.usuario.empresa,
                  anho: input[index].anho,
                  mes: input[index].mes,
                };

                await DataFormato3SSPD.create(nuevoObjetoF3);
              }

              input[index].dnt1 = roundToTwo(
                data_xm_sdl.cargo_por_uso_dt1_cop_kwh
              );

              input[index].dnt2 = roundToTwo(
                data_xm_sdl.cargo_por_uso_dt2_cop_kwh
              );

              input[index].dnt3 = roundToTwo(
                data_xm_sdl.cargo_por_uso_dt3_cop_kwh
              );

              input[index].cdi_100 = roundToTwo(
                data_xm_sdl.cargo_de_inversion_cdi1_cop_kwh
              );

              for (let indexF7 = 1; indexF7 < 6; indexF7++) {
                if (indexF7 === 1) {
                  dNm = input[index].dnt1;
                  pRnm = pr_nt1_;
                  cVm = input[index].cv_nt1;
                  cUvm = cu_nt1_100_;
                  nt_prop = "1-100";
                }
                if (indexF7 === 2) {
                  dNm = input[index].dnt1 - input[index].cdi_100 / 2;
                  pRnm = pr_nt1_;
                  cVm = input[index].cv_nt1;
                  cUvm = cu_nt1_50_;
                  nt_prop = "1-50";
                }
                if (indexF7 === 3) {
                  dNm = input[index].dnt1 - input[index].cdi_100;
                  pRnm = pr_nt1_;
                  cVm = input[index].cv_nt1;
                  cUvm = cu_nt1_0_;
                  nt_prop = "1-0";
                }
                if (indexF7 === 4) {
                  dNm = input[index].dnt2;
                  pRnm = pr_nt2_;
                  cVm = input[index].cv_nt2;
                  cUvm = cu_nt2_;
                  nt_prop = "2";
                }
                if (indexF7 === 5) {
                  dNm = input[index].dnt3;
                  pRnm = pr_nt3_;
                  cVm = input[index].cv_nt3;
                  cUvm = cu_nt3_;
                  nt_prop = "3";
                }

                let nuevoObjetoF7 = {
                  id_mercado: mercado, // Asegúrate de que mercado esté definido
                  gm: gc_,
                  tm: tx_,
                  dnm: dNm,
                  prnm: pRnm,
                  nt_prop: nt_prop,
                  rm: r_,
                  cvm: cVm,
                  cuvm: cUvm,
                  creador: ctx.usuario.id,
                  empresa_id: ctx.usuario.empresa,
                  anho: input[index].anho,
                  mes: input[index].mes,
                };

                await Data_Formato_7_SSPDs.create(nuevoObjetoF7);
              }

              const resultadoComponentes = await new Res_componentes_cu_tarifa(
                input[index]
              ).save();

              miArray.push(resultadoComponentes);
            } catch (error) {
              console.log(error);
              throw new Error(error.message);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: `error`,
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    actualizarResComponentesCuTarifa: async (_, { id, input }, ctx) => {
      if (!ctx.usuario) throw new AuthenticationError("Debe autenticarse");
      try {
        const registro = await Res_componentes_cu_tarifa.findByPk(id);
        if (!registro) throw new Error("Registro no encontrado");
        await registro.update(input);
        return registro;
      } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el registro");
      }
    },
    eliminarResComponentesCuTarifa: async (_, { ids }, ctx) => {
      if (!ctx.usuario) throw new AuthenticationError("Debe autenticarse");
      try {
        const cantidadEliminados = await Res_componentes_cu_tarifa.destroy({
          where: { id: ids },
        });
        if (cantidadEliminados === 0)
          throw new Error("Error al eliminar los registros");
        return ids;
      } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar los registros");
      }
    },
    //Mutation Save Datos

    nuevoData_dane_ipp: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes, tipo, ipp_oi_oferta_interna } = input[index];

            if (tipo !== "pr" && tipo !== "df") {
              throw new Error(`El tipo de dato debe ser df o pr`);
            }

            if (ipp_oi_oferta_interna <= 100 && anho > 2014 && mes > 12) {
              throw new Error(
                `El valor debería ser mayor a 100, dado que la base es diciembre de 2014, puede ser que el DANE ha cambiado el mes base, contacte al administrador`
              );
            }

            // Busca si existe un registro con el mismo id de la empresa, año y mes
            const registroExistente = await Data_dane_ipp.findOne({
              where: {
                anho,
                mes,
                tipo,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y el mes ${mes}`
              );
            }

            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newData_dane_ipp = new Data_dane_ipp(input[index]);
              const resultado = await newData_dane_ipp.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: "error",
            });
          }
        }
        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    //Mutation Save Datos

    nuevoData_dane_ipc: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
        // Recorre los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            const { anho, mes, ipc } = input[index];

            if (ipc <= 100 && anho > 2014 && mes > 12) {
              throw new Error(
                `El valor debería ser mayor a 100, dado que la base es diciembre de 2014, puede ser que el DANE ha cambiado el mes base, contacte al administrador`
              );
            }

            // Busca si existe un registro con el mismo id de la empresa, año y mes

            const registroExistente = await Data_dane_ipc.findOne({
              where: {
                anho,
                mes,
              },
            });
            // Si ya existe un registro, retorna un error
            if (registroExistente) {
              throw new Error(
                `Ya existe un registro para el año ${anho} y el mes ${mes}`
              );
            }
            // Si no existe un registro, crea uno nuevo
            input[index].creador = ctx.usuario.id;
            input[index].empresa_id = ctx.usuario.empresa;
            try {
              const newData_dane_ipc = new Data_dane_ipc(input[index]);
              const resultado = await newData_dane_ipc.save();
              miArray.push(resultado);
            } catch (error) {
              console.log(error);
              throw new Error(error.mensaje);
            }
          } catch (error) {
            errores.push({
              registrosErrores: input[index],
              mensaje: error.message,
              tipo: "error",
            });
          }
        }

        return {
          datos: miArray,
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    eliminarData_dane_ipp: async (_, { ids }, ctx) => {
      try {
        // Verificar si todos los ids existen
        const totalExistente = await Data_dane_ipp.count({
          where: { id: ids },
        });
        if (totalExistente !== ids.length) {
          throw new Error(
            `No se encontraron todos los registros con los ids proporcionados`
          );
        }

        // Eliminar los registros
        await Data_dane_ipp.destroy({ where: { id: ids } });

        return ids;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    // Mutation Eliminar el registro
    eliminarData_dane_ipc: async (_, { ids }, ctx) => {
      try {
        // Verificar si todos los ids existen
        const totalExistente = await Data_dane_ipc.count({
          where: { id: ids },
        });
        if (totalExistente !== ids.length) {
          throw new Error(
            `No se encontraron todos los registros con los ids proporcionados`
          );
        }

        // Eliminar los registros
        await Data_dane_ipc.destroy({ where: { id: ids } });

        return ids;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    eliminarData_xm_afac: async (_, { ids }, ctx) => {
      try {
        // Verificar si todos los ids existen
        const totalExistente = await Data_xm_afac.count({
          where: { id: ids },
        });
        if (totalExistente !== ids.length) {
          throw new Error(
            `No se encontraron todos los registros con los ids proporcionados`
          );
        }

        // Eliminar los registros
        await Data_xm_afac.destroy({ where: { id: ids } });

        return ids;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    nuevoDataXmTserv: async (_, { input }, ctx) => {
      try {
        const errores = [];
        const datos = await Promise.all(
          input.map(async (item) => {
            try {
              item.empresa_id = ctx.usuario.empresa;
              item.creador = ctx.usuario.id;
              const nuevoRegistro = await Data_xm_tserv.create(item);
              return nuevoRegistro;
            } catch (error) {
              console.log(error);
              errores.push({
                mensaje: error.message,
                tipo: "Error al crear",
                registrosErrores: item,
              });
            }
          })
        );
        return {
          datos: datos.filter((dato) => dato !== undefined),
          errores,
        };
      } catch (error) {
        console.log(error);
        throw new Error("Error al crear los registros");
      }
    },

    actualizarDataXmTserv: async (_, { id, input }, ctx) => {
      try {
        const registro = await Data_xm_tserv.findByPk(id);
        if (!registro) throw new Error("Registro no encontrado");

        const registroActualizado = await registro.update(input);
        return registroActualizado;
      } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el registro");
      }
    },

    eliminarDataXmTserv: async (_, { ids }, ctx) => {
      try {
        await Data_xm_tserv.destroy({ where: { id: { [Op.in]: ids } } });
        return ids;
      } catch (error) {
        console.log(error);
        throw new Error("Error al eliminar los registros");
      }
    },
    eliminarData_res_componentes_cu_tarifa: async (_, { ids }, ctx) => {
      try {
        // Encontrar todos los registros que coincidan con los ids proporcionados
        const dataExistente = await Res_componentes_cu_tarifa.findAll({
          where: { id: ids },
        });

        if (!dataExistente || dataExistente.length === 0) {
          throw new Error(`No se encontró el registro`);
        }

        // Definir las tablas a verificar
        const tablas = [
          DataFormato9SSPD,
          DataFormulario1SSPD,
          DataFormato2SSPD,
          DataFormato3SSPD,
          DataFormato6SSPD,
          Data_Formato_7_SSPDs,
        ];

        for (const registro of dataExistente) {
          // Obtener anho y mes del registro existente
          const { anho, mes } = registro;

          // Verificar si es el año y mes más reciente en todas las tablas relevantes
          let esMasReciente = true;
          for (let tabla of tablas) {
            const registroMasReciente = await tabla.findOne({
              where: { empresa_id: ctx.usuario.empresa },
              order: [
                ["anho", "DESC"],
                ["mes", "DESC"],
              ],
              limit: 1,
            });

            if (
              registroMasReciente &&
              (registroMasReciente.anho > anho ||
                (registroMasReciente.anho === anho &&
                  registroMasReciente.mes > mes))
            ) {
              esMasReciente = false;
              break;
            }
          }

          if (!esMasReciente) {
            throw new Error(
              "Existen cálculos más recientes y no se puede eliminar este registro. Contacte al administrador"
            );
          }

          // Eliminar el registro si es el más reciente
          await registro.destroy();
          for (let tabla of tablas) {
            await tabla.destroy({
              where: {
                anho: anho,
                mes: mes,
                empresa_id: ctx.usuario.empresa,
              },
            });
          }
        }

        // Eliminar los registros de todas las tablas si son los más recientes

        return ids;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    nuevoDataEmpresaEnergiaContratoAtipico: async (_, { input }, ctx) => {
      const miArray = [];
      const errores = [];

      for (let datos of input) {
        datos.empresa_id = ctx.usuario.empresa;
        datos.creador = ctx.usuario.id;
        try {
          const nuevoRegistro = new Data_empresa_EnergiaContratoAtipico(datos);
          const resultado = await nuevoRegistro.save();
          miArray.push(resultado);
        } catch (error) {
          console.error(error);
          errores.push({
            registrosErrores: datos,
            mensaje: error.message,
            tipo: "error",
          });
        }
      }

      return {
        datos: miArray,
        errores,
      };
    },
    actualizarDataEmpresaEnergiaContratoAtipico: async (
      _,
      { id, input },
      ctx
    ) => {
      try {
        const registro = await Data_empresa_EnergiaContratoAtipico.findByPk(id);
        if (!registro) {
          throw new Error(`Registro no encontrado con ID ${id}`);
        }
        await registro.update(input);
        return registro;
      } catch (error) {
        console.error(error);
        throw new Error(`Error al actualizar: ${error.message}`);
      }
    },
    eliminarDataEmpresaEnergiaContratoAtipico: async (_, { ids }, ctx) => {
      try {
        const totalExistente = await Data_empresa_EnergiaContratoAtipico.count({
          where: { id: ids },
        });
        if (totalExistente !== ids.length) {
          throw new Error(
            `No se encontraron todos los registros con los IDs proporcionados`
          );
        }
        await Data_empresa_EnergiaContratoAtipico.destroy({
          where: { id: ids },
        });
        return ids;
      } catch (error) {
        console.error(error);
        throw new Error(`Error al eliminar registros: ${error.message}`);
      }
    },
    nuevoDataMmeValidacion: async (_, { input }, ctx) => {
      try {
        const datos = [];
        const errores = [];

        for (let i = 0; i < input.length; i++) {
          try {
            input[i].empresa_id = ctx.usuario.empresa; // Asegúrate de que el contexto tenga estos datos
            input[i].creador = ctx.usuario.id;
            const { anho, trimestre } = input[i];
                        // Busca si existe un registro con el mismo id de la empresa, año y mes
                        const registroExistente = await Data_mme_validacion.findOne({
                          where: {
                            anho,
                            trimestre,
                            empresa_id: ctx.usuario.empresa,
                          },
                        });
                        // Si ya existe un registro, retorna un error
                        if (registroExistente) {
                          throw new Error(
                            `Ya existe un registro para el año ${anho} y el trimestre ${trimestre}`
                          );
                        }

            const nuevoRegistro = new Data_mme_validacion(input[i]);
            const resultado = await nuevoRegistro.save();
            datos.push(resultado);
          } catch (error) {
            console.error(error);
            errores.push({
              mensaje: error.message,
              tipo: "error",
              registrosErrores: input[i]
            });
          }
        }

        return { datos, errores };
      } catch (error) {
        console.error(error);
        throw new Error("Error al guardar los datos de validación MME.");
      }
    },

    actualizarDataMmeValidacion: async (_, { id, input }, ctx) => {
      try {
        const registroActualizado = await Data_mme_validacion.findByIdAndUpdate(id, input, { new: true });
        if (!registroActualizado) {
          throw new Error(`Registro con ID ${id} no encontrado`);
        }
        return registroActualizado;
      } catch (error) {
        console.error(error);
        throw new Error(`Error al actualizar el registro con ID ${id}.`);
      }
    },


    eliminarDataMmeValidacion: async (_, { ids }, ctx) => {
      try {
        const totalExistente = await Data_mme_validacion.count({
          where: { id: ids },
        });
        if (totalExistente !== ids.length) {
          throw new Error(
            `No se encontraron todos los registros con los IDs proporcionados`
          );
        }
        await Data_mme_validacion.destroy({
          where: { id: ids },
        });
        return ids;
      } catch (error) {
        console.error(error);
        throw new Error(`Error al eliminar registros: ${error.message}`);
      }
    },

    nuevoDataMmeGiro: async (_, { input }, ctx) => {
      try {
        const datos = [];
        const errores = [];

        for (let i = 0; i < input.length; i++) {
          input[i].empresa_id = ctx.usuario.empresa;
          input[i].creador = ctx.usuario.id;
          
          try {
            const nuevoGiro = new Data_mme_giro(input[i]);
            const resultado = await nuevoGiro.save();
            datos.push(resultado);
          } catch (error) {
            console.error("Error al crear un nuevo giro: ", error);
            errores.push({
              mensaje: error.message,
              tipo: "error",
              registrosErrores: input[i]
            });
          }
        }

        return { datos, errores };
      } catch (error) {
        console.error("Error crítico al guardar datos de giro MME: ", error);
        throw new Error("Error crítico al guardar datos de giro MME.");
      }
    },



  
    
    eliminarDataMmeGiro: async (_, { ids }, ctx) => {
      try {
        const totalExistente = await Data_mme_giro.count({
          where: { id: ids },
        });
        if (totalExistente !== ids.length) {
          throw new Error(
            `No se encontraron todos los registros con los IDs proporcionados`
          );
        }
        await Data_mme_giro.destroy({
          where: { id: ids },
        });
        return ids;
      } catch (error) {
        console.error(error);
        throw new Error(`Error al eliminar registros: ${error.message}`);
      }
    },

    nuevoDataBanrepublicaTco: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
    
        // Consultar la última semana guardada en la base de datos
        const ultimaSemanaGuardada = await Data_banrepublica_tco.max('anho_semana', {
          where: { empresa_id: ctx.usuario.empresa }
        });
    
        // Recorrer los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            // Reemplazar guiones bajos por nada en anho_semana
            input[index].anho_semana = input[index].anho_semana.replace(/-/g, '');
    
            // Comparar la semana del input con la última semana guardada
            if (input[index].anho_semana > ultimaSemanaGuardada) {
              // Si no existe un registro para una semana posterior a la guardada, crea uno nuevo
              input[index].empresa_id = ctx.usuario.empresa;
              input[index].creador = ctx.usuario.id;
              try {
                const newDataBanrepublicaTco = new Data_banrepublica_tco(input[index]);
                const resultado = await newDataBanrepublicaTco.save();
                miArray.push(resultado);
              } catch (error) {
                console.log(error);
                throw new Error(error.message);
              }
            }
          } catch (error) {
            errores.push({
              registrosErrores: [input[index]],
              mensaje: error.message,
              tipo: "error"
            });
          }
        }
    
        return {
          datos: miArray,
          errores
        };
      } catch (error) {
        console.log(error);
        throw new Error('Error al procesar la solicitud: ' + error.message);
      }
    },
    
    actualizarDataBanrepublicaTco: async (_, { id, input }) => {
      try {
        // Encuentra el elemento por ID
        const elementoDataBanrepublicaTco = await Data_banrepublica_tco.findByPk(id);
        if (!elementoDataBanrepublicaTco) {
          throw new Error(`Elemento con ID ${id} no encontrado`);
        }

        // Actualiza el elemento con el input proporcionado
        await Data_banrepublica_tco.update(input, {
          where: { id: id } // La cláusula where es necesaria para especificar el registro a actualizar
        });

        // Vuelve a encontrar el elemento para obtener los datos actualizados
        const elementoDataBanrepublicaTcoActualizado = await Data_banrepublica_tco.findByPk(id);
        return elementoDataBanrepublicaTcoActualizado;
      } catch (error) {
        console.log(error);
        throw new Error('Error al actualizar el dato: ' + error.message);
      }
    },
    eliminarDataBanrepublicaTco: async (_, { ids }, ctx) => {
      try {
        // Verificar si todos los ids existen
        const totalExistente = await Data_banrepublica_tco.count({
          where: { id: ids }
        });
        if (totalExistente !== ids.length) {
          throw new Error(`No se encontraron todos los registros con los ids proporcionados`);
        }

        // Eliminar los registros
        await Data_banrepublica_tco.destroy({ where: { id: ids } });
        return ids;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    nuevoDataBanrepublicaTcap: async (_, { input }, ctx) => {
      try {
        const miArray = [];
        const errores = [];
    
        // Consultar la última semana guardada en la base de datos
        const ultimafechaGuardada = await Data_banrepublica_tcap.max('fecha', {
          where: { empresa_id: ctx.usuario.empresa }
        });
    
        // Recorrer los inputs que se quieren agregar
        for (let index = 0; index < input.length; index++) {
          try {
            // Reemplazar guiones bajos por nada en anho_semana
        // Suponiendo que la fecha viene en el formato 'DD/MM/YYYY' y está en input[index].fecha
const fechaOriginal = input[index].fecha;  // '31/08/2020'
const partes = fechaOriginal.split('/');  // ['31', '08', '2020']
const fechaFormateada = `${partes[2]}-${partes[1]}-${partes[0]}`;  // '2020-08-31'

input[index].fecha = fechaFormateada;
 // Verificar que la tasa no sea null
 if (input[index].tasa_a_30_cdats_cdat_bancos_comerciales == null) {
 throw new Error('La tasa a 30 días CDAT Bancos comerciales no puede ser nula');
 
}
            // Comparar la semana del input con la última semana guardada
            if (input[index].fecha > ultimafechaGuardada) {
              // Si no existe un registro para una semana posterior a la guardada, crea uno nuevo
              input[index].empresa_id = ctx.usuario.empresa;
              input[index].creador = ctx.usuario.id;
              try {
                const newDataBanrepublicaTco = new Data_banrepublica_tcap(input[index]);
                const resultado = await newDataBanrepublicaTco.save();
                miArray.push(resultado);
              } catch (error) {
                console.log(error);
                throw new Error(error.message);
              }
            }
          } catch (error) {
            errores.push({
              registrosErrores: [input[index]],
              mensaje: error.message,
              tipo: "error"
            });
          }
        }
    
        return {
          datos: miArray,
          errores
        };
      } catch (error) {
        console.log(error);
        throw new Error('Error al procesar la solicitud: ' + error.message);
      }
    },
    
    actualizarDataBanrepublicaTcap: async (_, { id, input }) => {
      try {
        // Encuentra el elemento por ID
        const elementoDataBanrepublicaTco = await Data_banrepublica_tcap.findByPk(id);
        if (!elementoDataBanrepublicaTco) {
          throw new Error(`Elemento con ID ${id} no encontrado`);
        }

        // Actualiza el elemento con el input proporcionado
        await Data_banrepublica_tco.update(input, {
          where: { id: id } // La cláusula where es necesaria para especificar el registro a actualizar
        });

        // Vuelve a encontrar el elemento para obtener los datos actualizados
        const elementoDataBanrepublicaTcoActualizado = await Data_banrepublica_tcap.findByPk(id);
        return elementoDataBanrepublicaTcoActualizado;
      } catch (error) {
        console.log(error);
        throw new Error('Error al actualizar el dato: ' + error.message);
      }
    },
    eliminarDataBanrepublicaTcap: async (_, { ids }, ctx) => {
      try {
        // Verificar si todos los ids existen
        const totalExistente = await Data_banrepublica_tcap.count({
          where: { id: ids }
        });
        if (totalExistente !== ids.length) {
          throw new Error(`No se encontraron todos los registros con los ids proporcionados`);
        }

        // Eliminar los registros
        await Data_banrepublica_tcap.destroy({ where: { id: ids } });
        return ids;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  
  },
};
module.exports = resolvers;
