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
const Data_reportes_sui_sin_zni_tr_t9 = require("../models/Data_reportes_sui_sin_zni_tr_t9");
const DataFormulario1SSPD = require("../models/DataFormulario1SSPD");
const DataFormato2SSPD = require("../models/DataFormato2SSPD");

const { Op, where, col, literal } = require("sequelize");
const { Sequelize } = require("sequelize");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { afterCreate } = require("../models/Usuario");
const DataFormato3SSPD = require("../models/DataFormato3SSPD.js");
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
        // La función `realizarConsultaPaginada` sería una utilidad que implementas para manejar la paginación y el filtrado
        const resultado = await realizarConsultaPaginada(
          Res_componentes_cu_tarifa,
          options,
          condicionesEmpresa
        );
        return resultado;
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
      console.log(input);
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
    eliminarData_xm_stn: async (_, { id }) => {
      let data = await Data_xm_stn.findByPk(id);
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
    eliminarData_xm_str: async (_, { id }) => {
      let data = await Data_xm_str.findByPk(id);
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
            const { emisor_banco, numero_garantia, fecha_inicio_vigencia } =
              input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes

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

    eliminarEmpresaGarantia: async (_, { id }) => {
      try {
        const numDestroyed = await Data_empresa_garantia.destroy({
          where: { id },
        });
        if (numDestroyed) {
          return true;
        }
        throw new Error(`La garantía con ID ${id} no fue encontrada`);
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
            const { anho, mes } = input[index];
            // Busca si existe un registro con el mismo id de la empresa, año y mes

            const registroExistente = await Data_xm_ipr.findOne({
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
                },
              });
              if (!data_dane_ipp) {
                throw new Error(
                  "No existen insumos de DANE IPP para el periodo anterior al mes y año seleccionado " +
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

              if (
                data_xm_dspcttom.length === 0 &&
                data_xm_afac.compras_en_contratos_kwh > 0
              ) {
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
                var filteredData = data_xm_dspcttom.filter((obj) =>
                  ["CP"].includes(obj.tipo_asigna)
                );

                Energia_contratos = calcularEnergiaContratos(filteredData);
                Costo_contratos = calcularCostoContratos(filteredData);

                Energia_contratos_sub = 0;
                Costo_contratos_sub = 0;

                // Filtrar por SC, SL, CP
                var filteredDataSub = data_xm_dspcttom.filter((obj) =>
                  ["SC", "SL"].includes(obj.tipo_asigna)
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
              cgsubasta_acu = 0;
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

              input[index].qc = qc_;
              input[index].mc = mc_;
              input[index].w1 = w1;
              input[index].w2 = w2;
              input[index].max = max_g_;
              input[index].cr = cr_;
              input[index].ref = max_g_ / 1.3;
              input[index].alfa = alfa;
              input[index].pc = pc_;
              input[index].gc = gc_;
              input[index].psa = 0;
              input[index].cug = 0;
              input[index].egp = 0;
              input[index].wl = 0;
              input[index].qagd = 0;

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

              input[index].dm_nt4 = roundToTwo(input[index].str);

              data_empresaanualm = await Data_empresa_anual.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anhom,
                },
              });

              if (!data_empresaanualm) {
                throw new Error(
                  `No existen datos de empresa anual para periodo ${anho}`
                );
              }

              input[index].cer = roundToTwo(
                ((data_empresaanualm.contribuciones_creg *
                  data_empresaanualm.porc_contribucion_creg) /
                  100 +
                  (data_empresaanualm.contribuciones_sspd *
                    data_empresaanualm.porc_contribucion_sspd) /
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

              input[index].cfm = roundToTwo(
                (data_creg_cxm[0].Cf * ipcm * (1 - x)) / 79.55965
              );
              // cfm_=(roundToTwo(6146.19*ipcm/79.55965))

              data_empresam = await Data_empresa.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anhom,
                  mes: mesm,
                },
              });

              input[index].rc = roundToTwo(
                (data_creg_cxm[0].RCT *
                  (data_empresam.ventas_usuarios_r_nt1_e +
                    data_empresam.ventas_usuarios_r_nt1_c +
                    data_empresam.ventas_usuarios_r_nt1_u +
                    data_empresam.ventas_usuarios_r_nt2 +
                    data_empresam.ventas_usuarios_r_nt3 -
                    data_empresam.vae_kwh -
                    data_empresam.vnu_kwh -
                    data_empresam.vsne_kwh) +
                  data_creg_cxm[0].RCAE * data_empresam.vae_kwh +
                  data_creg_cxm[0].RCSNE * data_empresam.vsne_kwh +
                  data_creg_cxm[0].RCNU * data_empresam.vnu_kwh) /
                  (data_empresam.ventas_usuarios_r_nt1_e +
                    data_empresam.ventas_usuarios_r_nt1_c +
                    data_empresam.ventas_usuarios_r_nt1_u +
                    data_empresam.ventas_usuarios_r_nt2 +
                    data_empresam.ventas_usuarios_r_nt3)
              );

              data_xm_mme_validacione = await Data_mme_validacion.findAll({
                where: {
                  empresa_id: ctx.usuario.empresa,
                },
              });

              var len = data_xm_mme_validacione.length,
                maxa = -Infinity;
              while (len > 0) {
                len--;
                if (data_xm_mme_validacione[len].anho > maxa) {
                  maxa = data_xm_mme_validacione[len].anho;
                }
              }
              anho_Ul_Trim_Val_Mme = maxa;

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
                      index,
                      trimestre,
                      anho_trimestre,
                      parseFloat(data_xm_mme_validacione[index1].subsidios) -
                        data_xm_mme_validacione[index1].contribuciones,
                      parseFloat(data_xm_mme_validacione[index1].facturacion),
                      fecha_inicio_trimestre,
                      fecha_fin_trimestre,
                    ]);
                    summ =
                      summ +
                      parseFloat(data_xm_mme_validacione[index1].facturacion);
                  }
                }
              }

              input[index].facturacion_t = (summ / 4).toString();

              var data_mme_giro_ordenado = [...data_mme_giro_e];

              data_mme_giro_ordenado.sort((a, b) =>
                a.fecha > b.fecha ? 1 : b.fecha > a.fecha ? -1 : 0
              );
              const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

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

              //Review Trimestre anterior el cual para arranque se incluye manual
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
              } else {
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

              if (giro_sobranteb === null || ultimo_giro_incluidob === null) {
                giro_sobranteb = 0;
                ultimo_giro_incluidob = 0;
              }

              for (let index = 0; index < 4; index++) {
                saldo = tri_validados[index][3];

                len2 = ultimo_giro_incluidob;

                while (len2 < data_mme_giro_ordenado.length - 1 && saldo != 0) {
                  var fecha_giro = new Date(
                    parseFloat(data_mme_giro_ordenado[len2].fecha.substr(0, 4)),
                    parseFloat(
                      data_mme_giro_ordenado[len2].fecha.substr(5, 2)
                    ) - 1,
                    parseFloat(data_mme_giro_ordenado[len2].fecha.substr(8, 2))
                  );
                  var fecha_inicial_giros = new Date(2019, 1, 1);

                  if (
                    data_mme_giro_ordenado[len2].fondo === "FSSRI" &&
                    Date.parse(fecha_giro) >= Date.parse(fecha_inicial_giros) &&
                    Date.parse(fecha_giro) <=
                      Date.parse(tri_validados[index][6])
                  ) {
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

                      //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero
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
                      //Guardo el giro y lso dias en una matriz, si se pasa cojo solo la parte de giro para llegar a cero

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

                actualizarData_mme_validaciogirosob(
                  data_xm_mme_validacione.filter(
                    (data_xm_mme_validacione) =>
                      data_xm_mme_validacione.anho ===
                        tri_validados[index][2] &&
                      data_xm_mme_validacione.trimestre ===
                        tri_validados[index][1] &&
                      data_xm_mme_validacione.empresa_id ===
                        data2.obtenerUsuario.empresa
                  )[0].id,
                  giro_sobranteb.toString(),
                  ultimo_giro_incluidob
                );
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

              input[index].sub1 =
                (sub1mt[0] + sub1mt[1] + sub1mt[2] + sub1mt[3]) / 4;
              input[index].sub2 =
                (sub2mt[0] + sub2mt[1] + sub2mt[2] + sub2mt[3]) / 4;

              if (sub1mt[0] + sub1mt[1] + sub1mt[2] + sub1mt[3] === 0) {
                n_Sub1_ = 0;
              } else {
                n_Sub1_ = roundToTwo(
                  (sub1npt[0] / sub1mt[0] +
                    sub1npt[1] / sub1mt[1] +
                    sub1npt[2] / sub1mt[2] +
                    sub1npt[3] / sub1mt[3]) /
                    4 /
                    30
                );
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
              input[index].sub1.n_Sub1 = n_Sub1_;
              input[index].sub1.m_Sub2 = m_Sub2_;

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
              input[index].r2 = roundToTwo(
                (1 + sum_tasa_x_monto_cap / sum_monto_cap) ** (1 / 12) - 1
              );

              var len1 = 0,
                date_tco,
                sum_tasa_x_monto_co = 0,
                sum_monto_co = 0,
                conteo = 0,
                r1_;
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

              input[index].r1 = roundToTwo(
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
                cfs_ = roundToTwo(
                  ((sub1_ * ((1 + r1_) ** (n_Sub1_ + 0.63) - 1) -
                    sub2_ * ((1 + r2_) ** m_Sub2_ - 1)) /
                    facturacion_t_) *
                    100
                );
                cfe_ = cfs_ + 0.042;
              }
              input[index].N_Sub1 = n_Sub1_;
              input[index].M_Sub2 = m_Sub2_;
              input[index].Cfs = cfs_;
              input[index].Cfe = roundToTwo(cfe_);

              input[index].cvr = roundToTwo(
                ((1 - 0) * cfm_ * data_empresam2[0].numero_usuarios_r +
                  cgcu +
                  data_empresam[0].pui_cop_kwh) /
                  (data_empresam2[0].ventas_usuarios_r_nt1_e +
                    data_empresam2[0].ventas_usuarios_r_nt1_c +
                    data_empresam2[0].ventas_usuarios_r_nt1_u +
                    data_empresam2[0].ventas_usuarios_r_nt2 +
                    //618470 + se elimina 18-01-24 NID
                    data_empresam2[0].ventas_usuarios_r_nt3)
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

              input[index].c_Ast = c_ast_;

              input[index].cv = roundToTwo(
                c_ast_ +
                  cvr_ +
                  (cer_ +
                    data_xm_tservmcnd +
                    data_xm_tservmsiciva +
                    data_xm_tservmsic +
                    cg_acu) /
                    (data_empresam[0].ventas_usuarios_r_nt1_e +
                      data_empresam[0].ventas_usuarios_r_nt1_c +
                      data_empresam[0].ventas_usuarios_r_nt1_u +
                      data_empresam[0].ventas_usuarios_r_nt2 +
                      data_empresam[0].ventas_usuarios_r_nt3 +
                      data_empresam[0].ventas_usuarios_nr_kwh)
              );
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

              var tx_ = roundTo4(input[index].delta_t + input[index].t_prima);

              input[index].tm = tx_;

              const data_xm_guatape = await Data_xm_guatape.findOne({
                where: {
                  anho: anho,
                  mes: mes,
                  agente: data_entidades.codigo_asic_cx,
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
                data_xm_afacm[0].perdida_real_kwh /
                (data_xm_afacm[0].demanda_real_kwh +
                  data_xm_afacm[0].perdida_real_kwh);
              setIprstn(roundToTwo(iprstn_));

              const data_xm_iprm1 = data_xm_ipr.filter(
                (data_xm_ipr) =>
                  data_xm_ipr.anho === anho &&
                  data_xm_ipr.mes === mes &&
                  data_xm_ipr.agrupaORMercado === name_sistema_or &&
                  data_xm_ipr.nivelEntrada === 1 &&
                  data_xm_ipr.empresa_id === data2.obtenerUsuario.empresa
              );
              const data_xm_iprm2 = data_xm_ipr.filter(
                (data_xm_ipr) =>
                  data_xm_ipr.anho === anho &&
                  data_xm_ipr.mes === mes &&
                  data_xm_ipr.agrupaORMercado === name_sistema_or &&
                  data_xm_ipr.nivelEntrada === 2 &&
                  data_xm_ipr.empresa_id === data2.obtenerUsuario.empresa
              );
              const data_xm_iprm3 = data_xm_ipr.filter(
                (data_xm_ipr) =>
                  data_xm_ipr.anho === anho &&
                  data_xm_ipr.mes === mes &&
                  data_xm_ipr.agrupaORMercado === name_sistema_or &&
                  data_xm_ipr.nivelEntrada === 3 &&
                  data_xm_ipr.empresa_id === data2.obtenerUsuario.empresa
              );
              const data_xm_iprm4 = data_xm_ipr.filter(
                (data_xm_ipr) =>
                  data_xm_ipr.anho === anho &&
                  data_xm_ipr.mes === mes &&
                  data_xm_ipr.agrupaORMercado === name_sistema_or &&
                  data_xm_ipr.nivelEntrada === 4 &&
                  data_xm_ipr.empresa_id === data2.obtenerUsuario.empresa
              );

              const data_xm_cprogm = data_xm_cprog.filter(
                (data_xm_cprog) =>
                  data_xm_cprog.anho === anho &&
                  data_xm_cprog.mes === mes &&
                  data_xm_cprog.agente === name_or &&
                  data_xm_cprog.empresa_id === data2.obtenerUsuario.empresa
              );
              data_xm_iprm1 = await Data_xm_ipr.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anho,
                  mes: mes,
                  agrupaORMercado: "EGVD",
                  nivelEntrada: 2,
                },
              });

              data_xm_iprm2 = await Data_xm_ipr.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anho,
                  mes: mes,
                  agrupaORMercado: "EGVD",
                  nivelEntrada: 2,
                },
              });

              data_xm_iprm3 = await Data_xm_ipr.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anho,
                  mes: mes,
                  agrupaORMercado: "EGVD",
                  nivelEntrada: 3,
                },
              });

              data_xm_iprm4 = await Data_xm_ipr.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anho,
                  mes: mes,
                  agrupaORMercado: "EGVD",
                  nivelEntrada: 4,
                },
              });

              data_xm_cprogm = await Data_xm_cprog.findOne({
                where: {
                  empresa_id: ctx.usuario.empresa,
                  anho: anho,
                  mes: mes,
                  agente: "EGVD",
                },
              });

              if (!data_xm_iprm1) {
                throw new Error(
                  `No existen datos de IPRM1 para periodo ${mes}-${anho}`
                );
              }
              if (!data_xm_iprm2) {
                throw new Error(
                  `No existen datos de IPRM2 para periodo ${mes}-${anho}`
                );
              }
              if (!data_xm_iprm3) {
                throw new Error(
                  `No existen datos de IPRM3 para periodo ${mes}-${anho}`
                );
              }
              if (!data_xm_iprm4) {
                throw new Error(
                  `No existen datos de IPRM4 para periodo ${mes}-${anho}`
                );
              }
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
                gc_ + tx_ + r_ + cV + pr_nt1_ + input[index].dm_nt1_100_esp
              );
              cu_nt1_50_ = roundToTwo(
                gc_ + tx_ + r_ + cV + pr_nt1_ + input[index].dm_nt1_50_esp
              );
              cu_nt1_0_ = roundToTwo(
                gc_ + tx_ + r_ + cV + pr_nt1_ + input[index].dm_nt1_0_esp
              );
              cu_nt2_ = roundToTwo(
                gc_ + tx_ + r_ + cV + pr_nt2_ + input[index].dm_nt2
              );
              cu_nt3_ = roundToTwo(
                gc_ + tx_ + r_ + cV + pr_nt3_ + input[index].dm_nt3
              );
              cu_nt4_ = roundToTwo(
                gc_ + tx_ + r_ + cV + pr_nt4_ + input[index].dm_nt4
              );

              input[index].cu_nt1_100_esp = cu_nt1_100_;
              input[index].cu_nt1_50_esp = cu_nt1_50_;
              input[index].cu_nt1_0_esp = cu_nt1_0_;
              input[index].cu_nt2 = cu_nt2_;
              input[index].cu_nt3 = cu_nt3_;
              input[index].cu_nt4 = cu_nt4_;

              let data_crm_res_componentes_cu_tarifasin =
                await Data_crm_res_componentes_cu_tarifasin.findAll({
                  where: {
                    empresa_id: ctx.usuario.empresa,
                    anho: anhom,
                    mes: mesm,
                  },
                });

              data_crm_res_componentes_cu_tarifasin.tm_e1_nt1_100_esp;

              const tarifamc1_100 =
                (data_crm_res_componentes_cu_tarifasin.tm_e1_nt1_100_esp *
                  ipcm) /
                ipcm2;
              const tarifamc2_100 =
                (data_crm_res_componentes_cu_tarifasin.tm_e2_nt1_100_esp *
                  ipcm) /
                ipcm2;
              const tarifamc1_50 =
                (data_crm_res_componentes_cu_tarifasin.tm_e1_nt1_50_esp *
                  ipcm) /
                ipcm2;
              const tarifamc2_50 =
                (data_crm_res_componentes_cu_tarifasin.tm_e2_nt1_50_esp *
                  ipcm) /
                ipcm2;
              const tarifamc1_0 =
                (data_crm_res_componentes_cu_tarifasin.tm_e1_nt1_0_esp * ipcm) /
                ipcm2;
              const tarifamc2_0 =
                (data_crm_res_componentes_cu_tarifasin.tm_e2_nt1_0_esp * ipcm) /
                ipcm2;
              const tarifamc1_NT2 =
                (data_crm_res_componentes_cu_tarifasin.tm_e1_nt2 * ipcm) /
                ipcm2;

              var porc_subE1_100_,
                porc_subE2_100_,
                porc_subE1_50_,
                porc_subE2_50_,
                porc_subE1_0_,
                porc_subE2_0_,
                porc_subE1_NT2_;

              if (1 - tarifamc1_100 / cu_nt1_100_ < 0.6) {
                porc_subE1_100_ = 1 - tarifamc1_100 / cu_nt1_100_;
              } else {
                porc_subE1_100_ = 0.6;
              }
              if (1 - tarifamc2_100 / cu_nt1_100_ < 0.5) {
                porc_subE2_100_ = 1 - tarifamc2_100 / cu_nt1_100_;
              } else {
                porc_subE2_100_ = 0.5;
              }
              if (1 - tarifamc1_50 / cu_nt1_50_ < 0.6) {
                porc_subE1_50_ = 1 - tarifamc1_50 / cu_nt1_50_;
              } else {
                porc_subE1_50_ = 0.6;
              }
              if (1 - tarifamc2_50 / cu_nt1_50_ < 0.5) {
                porc_subE2_50_ = 1 - tarifamc2_50 / cu_nt1_50_;
              } else {
                porc_subE2_50_ = 0.5;
              }
              if (1 - tarifamc1_0 / cu_nt1_0_ < 0.6) {
                porc_subE1_0_ = 1 - tarifamc1_0 / cu_nt1_0_;
              } else {
                porc_subE1_0_ = 0.6;
              }
              if (1 - tarifamc2_0 / cu_nt1_0_ < 0.5) {
                porc_subE2_0_ = 1 - tarifamc2_0 / cu_nt1_0_;
              } else {
                porc_subE2_0_ = 0.5;
              }
              if (1 - tarifamc1_NT2 / cu_nt2_ < 0.6) {
                porc_subE1_NT2_ = 1 - tarifamc1_NT2 / cu_nt2_;
              } else {
                porc_subE1_NT2_ = 0.6;
              }

              input[index].tm_e1_nt1_0_esp = roundToTwo(
                cu_nt1_0_ * (1 - porc_subE1_0_)
              );
              input[index].tm_e1_nt1_50_esp = roundToTwo(
                cu_nt1_50_ * (1 - porc_subE1_50_)
              );
              input[index].tm_e1_nt1_100_esp = roundToTwo(
                cu_nt1_100_ * (1 - porc_subE1_100_)
              );
              input[index].tm_e1_nt2 = roundToTwo(
                cu_nt2_ * (1 - porc_subE1_NT2_)
              );
              input[index].tm_e1_nt3 = roundToTwo(cu_nt3_ * (1 - 0.15));
              input[index].tm_e1_nt4 = roundToTwo(cu_nt4_);
              input[index].tm_e2_nt1_0_esp = roundToTwo(
                cu_nt1_0_ * (1 - porc_subE2_0_)
              );
              input[index].tm_e2_nt1_50_esp = roundToTwo(
                cu_nt1_50_ * (1 - porc_subE2_50_)
              );
              input[index].tm_e2_nt1_100_esp = roundToTwo(
                cu_nt1_100_ * (1 - porc_subE2_100_)
              );

              input[index].tm_e3_nt1_100_esp = roundToTwo(
                cu_nt1_100_ * (1 - 0.15)
              );
              input[index].tm_e3_nt1_50_esp = roundToTwo(
                cu_nt1_50_ * (1 - 0.15)
              );
              input[index].tm_e3_nt1_0_esp = roundToTwo(cu_nt1_0_ * (1 - 0.15));

              input[index].tm_econt_nt1_100_esp = roundToTwo(cu_nt1_100_ * 1.2);
              input[index].tm_econt_nt1_50_esp = roundToTwo(cu_nt1_50_ * 1.2);
              input[index].tm_econt_nt1_0_esp = roundToTwo(cu_nt1_0_ * 1.2);
              input[index].tm_econt_nt2 = roundToTwo(cu_nt2_ * 1.2);
              input[index].tm_econt_nt3 = roundToTwo(cu_nt3_ * 1.2);

              if (input[index].cg > 0 || input[index].cgcu > 0) {
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
                };

                await DataFormato2SSPD.create(nuevoObjetoF2);
              }

              for (let indexF3 = 1; indexF3 <= 10; indexF3++) {
                // Suponiendo que data_Res_componentes_cu_tarifam[0] contiene datos relevantes fuera del bucle.
                let tarifa_100,
                  tarifa_50,
                  tarifa_0,
                  tarifa_NT2,
                  tarifa_NT3,
                  tarifa_NT4;
                // Aquí iría la lógica para asignar valores a las variables de tarifa basadas en `indexF3` y `opcionTarifaria`.
                // Por ejemplo:
                if (opcionTarifaria == 1) {
                  console.log("Viendo NT4");
                  console.log(data_Res_componentes_cu_tarifam);
                  if (index === 1) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam
                        .nt1_100_estrato_1_men_cs;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam
                        .nt1_50_estrato_1_men_cs;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_1_men_cs;
                    Tarifa_NT2 =
                      data_Res_componentes_cu_tarifam.nt2_estrato_1_men_cs;
                    Tarifa_NT3 =
                      data_Res_componentes_cu_tarifam.nt3_estrato_1_men_cs;
                    Tarifa_NT4 =
                      data_Res_componentes_cu_tarifam.nt4_estrato_1_men_cs;
                  }
                  if (index === 2) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam
                        .nt1_100_estrato_2_men_cs;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam
                        .nt1_50_estrato_2_men_cs;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_2_men_cs;
                    Tarifa_NT2 =
                      data_Res_componentes_cu_tarifam.nt2_estrato_2_men_cs;
                    Tarifa_NT3 =
                      data_Res_componentes_cu_tarifam.nt3_estrato_2_men_cs;
                    Tarifa_NT4 =
                      data_Res_componentes_cu_tarifam.nt4_estrato_2_men_cs;
                  }
                  if (index === 3) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam
                        .nt1_100_estrato_3_men_cs;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam
                        .nt1_50_estrato_3_men_cs;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_3_men_cs;
                    Tarifa_NT2 =
                      data_Res_componentes_cu_tarifam.cu_nt2_ot * 0.85;
                    Tarifa_NT3 =
                      data_Res_componentes_cu_tarifam.cu_nt3_ot * 0.85;
                    Tarifa_NT4 =
                      data_Res_componentes_cu_tarifam.cu_nt4_ot * 0.85;
                  }
                  if (index === 4 || index === 7 || index === 9) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam.nt1_100_estrato_4;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam.nt1_50_estrato_4;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_4;
                    Tarifa_NT2 = data_Res_componentes_cu_tarifam.cu_nt2_ot;
                    Tarifa_NT3 = data_Res_componentes_cu_tarifam.cu_nt3_ot;
                    Tarifa_NT4 = data_Res_componentes_cu_tarifam.cu_nt4_ot;
                  }
                  if (
                    index === 5 ||
                    index === 6 ||
                    index === 8 ||
                    index === 10
                  ) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam.nt1_100_estrato_5;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam.nt1_50_estrato_5;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_5;
                    Tarifa_NT2 =
                      data_Res_componentes_cu_tarifam.cu_nt2_ot * 1.2;
                    Tarifa_NT3 =
                      data_Res_componentes_cu_tarifam.cu_nt3_ot * 1.2;
                    Tarifa_NT4 =
                      data_Res_componentes_cu_tarifam.cu_nt4_ot * 1.2;
                  }
                } else {
                  if (index === 1) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam
                        .nt1_100_estrato_1_men_cs;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam
                        .nt1_50_estrato_1_men_cs;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_1_men_cs;
                    Tarifa_NT2 =
                      data_Res_componentes_cu_tarifam.nt2_estrato_1_men_cs;
                    Tarifa_NT3 =
                      data_Res_componentes_cu_tarifam.nt3_estrato_1_men_cs;
                    Tarifa_NT4 =
                      data_Res_componentes_cu_tarifam.nt4_estrato_1_men_cs;
                  }
                  if (index === 2) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam
                        .nt1_100_estrato_2_men_cs;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam
                        .nt1_50_estrato_2_men_cs;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_2_men_cs;
                    Tarifa_NT2 =
                      data_Res_componentes_cu_tarifam.nt2_estrato_2_men_cs;
                    Tarifa_NT3 =
                      data_Res_componentes_cu_tarifam.nt3_estrato_2_men_cs;
                    Tarifa_NT4 =
                      data_Res_componentes_cu_tarifam.nt4_estrato_2_men_cs;
                  }
                  if (index === 3) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam
                        .nt1_100_estrato_3_men_cs;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam
                        .nt1_50_estrato_3_men_cs;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_3_men_cs;
                    Tarifa_NT2 =
                      data_Res_componentes_cu_tarifam.nt2_o * 0.85;
                    Tarifa_NT3 =
                      data_Res_componentes_cu_tarifam.nt3_o * 0.85;
                    Tarifa_NT4 =
                      data_Res_componentes_cu_tarifam.cu_nt4 * 0.85;
                  }
                  if (index === 4 || index === 7 || index === 9) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam.nt1_100_estrato_4;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam.nt1_50_estrato_4;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_4;
                    Tarifa_NT2 = data_Res_componentes_cu_tarifam.nt2_o;
                    Tarifa_NT3 = data_Res_componentes_cu_tarifam.nt3_o;
                  }
                  if (
                    index === 5 ||
                    index === 6 ||
                    index === 8 ||
                    index === 10
                  ) {
                    Tarifa_100 =
                      data_Res_componentes_cu_tarifam.nt1_100_estrato_5;
                    Tarifa_50 =
                      data_Res_componentes_cu_tarifam.nt1_50_estrato_5;
                    Tarifa_0 =
                      data_Res_componentes_cu_tarifam.nt1_0_estrato_5;
                    Tarifa_NT2 = data_Res_componentes_cu_tarifam.nt2_c;
                    Tarifa_NT3 = data_Res_componentes_cu_tarifam.nt3_c;
                  }
                }

                let nuevoObjetoF3 = {
                  idMercado: mercado, // Asegúrate de que mercado esté definido
                  cargoHorario: 4, // Ejemplo estático
                  inicioFranjaHoraria: "0:00", // Ejemplo estático
                  finFranjaHoraria: "23:59", // Ejemplo estático
                  estratoOSector: indexF3, // Aquí usamos indexF3 directamente o alguna lógica basada en él
                  porcentajeSubsidiado100OR: roundToTwo(
                    (1 -
                      tarifa_100 /
                        data_Res_componentes_cu_tarifam.cu_nt1_100_ot) *
                      100
                  ),
                  porcentajeSubsidiado50OR: roundToTwo(
                    (1 -
                      tarifa_50 /
                        data_Res_componentes_cu_tarifam.cu_nt1_50_ot) *
                      100
                  ),
                  porcentajeSubsidiado0OR: roundToTwo(
                    (1 -
                      tarifa_0 /
                        data_Res_componentes_cu_tarifam.cu_nt1_0_ot) *
                      100
                  ),
                  tarifaNivel1100OR: roundToFive(tarifa_100),
                  tarifaNivel150OR: roundToFive(tarifa_50),
                  tarifaNivel10OR: roundToFive(tarifa_0),
                  tarifaNivel2: roundToFive(tarifa_NT2),
                  tarifaNivel3: roundToFive(tarifa_NT3),
                  tarifaNivel4: roundToFive(tarifa_NT4),
                  cfm: data_Res_componentes_cu_tarifam.cfm.toFixed(4), // Ejemplo, asegúrate de que este dato está definido
                  fechaPublicacion: null, // Ejemplo nulo, ajusta según sea necesario
                  diarioPublicacion: null, // Ejemplo nulo, ajusta según sea necesario
                  tarifaOT: opcionTarifaria, // Asegúrate de que opcionTarifaria esté definida
                };

                await DataFormato3SSPD.create(nuevoObjetoF3);
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

              for (let indexF6 = 0; indexF6 < 5; indexF6++) {
                if (indexF6 === 0) {
                  nt_prop = "1-100";
                  sam = input[index].saldo_nt1_100_ot;
                  cuvc = input[index].cu_nt1_100;
                  cuv = input[index].cu_nt1_100_ot;
                  sam1 = data_Res_componentes_cu_tarifam1.saldo_nt1_100_ot;
                  cuvc1 = data_Res_componentes_cu_tarifam1.cu_nt1_100;
                  cuv1 = data_Res_componentes_cu_tarifam1.cu_nt1_100_ot;
                }
                if (indexF6 === 1) {
                  nt_prop = "1-50";
                  sam = input[index].saldo_nt1_50_ot;
                  cuvc = input[index].cu_nt1_50;
                  cuv = input[index].cu_nt1_50_ot;
                  sam1 = data_Res_componentes_cu_tarifam1.saldo_nt1_50_ot;
                  cuvc1 = data_Res_componentes_cu_tarifam1.cu_nt1_50;
                  cuv1 = data_Res_componentes_cu_tarifam1.cu_nt1_50_ot;
                }
                if (indexF6 === 2) {
                  nt_prop = "1-0";
                  sam = input[index].saldo_nt1_0_ot;
                  cuvc = input[index].cu_nt1_0;
                  cuv = input[index].cu_nt1_0_ot;
                  sam1 = data_Res_componentes_cu_tarifam.saldo_nt1_0_ot;
                  cuvc1 = data_Res_componentes_cu_tarifam.cu_nt1_0;
                  cuv1 = data_Res_componentes_cu_tarifam.cu_nt1_0_ot;
                }
                if (indexF6 === 3) {
                  nt_prop = "2";
                  sam = input[index].saldo_nt2_ot;
                  cuvc = input[index].cu_nt2;
                  cuv = input[index].cu_nt2_ot;
                  sam1 = data_Res_componentes_cu_tarifam.saldo_nt2_ot;
                  cuvc1 = data_Res_componentes_cu_tarifam.cu_nt2;
                  cuv1 = data_Res_componentes_cu_tarifam.cu_nt2_ot;
                }
                if (indexF6 === 4) {
                  nt_prop = "3";
                  sam = input[index].saldo_nt3_ot;
                  cuvc = input[index].cu_nt3;
                  cuv = input[index].cu_nt3_ot;
                  sam1 = data_Res_componentes_cu_tarifam.saldo_nt3_ot;
                  cuvc1 = data_Res_componentes_cu_tarifam.cu_nt3;
                  cuv1 = data_Res_componentes_cu_tarifam.cu_nt3_ot;
                }

                var nuevoObjetoF6 = {
                  idMercado: mercado,
                  ntProp: nt_prop,
                  pv: input[index].pv,
                  sam1: sam1,
                  vRt1: 1,
                  cuvc: roundToFive(cuvc),
                  cuvm1: roundToFive(cuvc1),
                  cuv: roundToFive(cuv),
                  vRm1: 1, //Ventas en el NT
                  rEM: 2, //Tasa de Interes
                  sam: sam.toFixed(0),
                  aplicoOpcionTarifaria: opcionTarifaria,
                };
                await DataFom.create(nuevoObjetoF6);
              }

              var nuevoObjetoF9 = {
                mercado: mercado_,
                ecc: roundTo4(data_xm_afac.compras_en_contratos_kwh),
                vecc: roundTo4(Costo_contratos),
                aecc: 0,
                avecc: 0,
                amc: 0,
                cb_mr: roundTo4(afacm.compras_energia_en_bolsa_kwh), //se ajusta 09/01/2023 antes era 1
                vcb_mr: roundTo4(afacm.compras_energia_en_bolsa_cop), //se ajusta 09/01/2023 antes era 1
                acb_mr: 0,
                avcb_mr: 0,
                cb_mnr: 0,
                vcb_mnr: 0,
                agpe: 0,
                gd: 0,
                gtr: 0,
                cug: 0,
                clp: 0,
                aclp: 0,
                w: w,
                psa: 0,
                egp: 0,
                adm: roundto4(input[index].adm),
                i: 0,
                aj: input[index].aj,
                alfa: alfa,
                dcr_aegp: 0,
                admre_g: 0,
                aprre_g: 0,
                adr_iprstn: 0,
                apr_iprstn: 0,
                arest: 0,
                cf_j: input[index].cf,
                rct: input[index].rct,
                rcae: input[index].rcae,
                ifssri: 0,
                ifoes: 0,
                balancesubsidios: 1,
                ano: input[index].anho_ul_trim_val_mme,
                trim: input[index].ul_trim_val_mme,
                mgtrim: 2,
                sub1: input[index].sub1,
                sub2: input[index].sub2,
                n: input[index].n_sub1,
                m: input[index].m_sub2,
                r1: input[index].r1,
                r2: input[index].r2,
                facturacion: input[index].facturacion_t,
                actividad: "ci",
                porccreg: data_empresaanualm.porc_contribucion_creg,
                porcsspd: data_empresaanualm.porc_contribucion_sspd,
                cregdolares:
                  data_empresaanualm.contribuciones_creg *
                  data_empresaanualm.porc_contribucion_creg,
                sspddolares:
                  data_empresaanualm.contribuciones_sspd *
                  data_empresaanualm.porc_contribucion_sspd,
                pui: 0,
              };

              nuevoObjeto.creador = parseInt(ctx.usuario.id);
              nuevoObjeto.empresa_id = parseInt(ctx.usuario.empresa);
              nuevoObjeto.anho = anho; // Asegúrate de que la variable 'anho' esté definida previamente
              nuevoObjeto.mes = mes; // Asegúrate de que la variable 'mes' esté definida previamente
              nuevoObjeto.mercado = mercado; // Asegúrate de que la variable 'mes' esté definida previamente
              await Data_reportes_sui_sin_zni_tr_t9.create(nuevoObjetoF9);
       
              const newData_crm_res_componentes_cu_tarifasin =
                new Data_crm_res_componentes_cu_tarifasin(input[index]);
              const resultado =
                await newData_crm_res_componentes_cu_tarifasin.save();
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
            const { anho, mes, tipo, ipp_pn_produccion_nacional } =
              input[index];

            if (tipo !== "pr" && tipo !== "df") {
              throw new Error(`El tipo de dato debe ser df o pr`);
            }

            if (ipp_pn_produccion_nacional <= 100 && anho > 2014 && mes > 12) {
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
  },
};
module.exports = resolvers;
