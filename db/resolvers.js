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
    obtenerData_xm_afac: async () => {
      try {
        const data_xm_afac = await Data_xm_afac.findAll();
        return data_xm_afac;
      } catch (error) {
        console.log(error);
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
    obtenerData_xm_dspctto: async () => {
      try {
        const data_xm_dspctto = await Data_xm_dspctto.findAll();
        return data_xm_dspctto;
      } catch (error) {
        console.log(error);
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
    obtenerData_xm_trsm: async () => {
      try {
        const data_xm_trsm = await Data_xm_trsm.findAll();
        return data_xm_trsm;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerData_xm_stn: async () => {
      try {
        const data_xm_stn = await Data_xm_stn.findAll();
        return data_xm_stn;
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
    obtenerDataxmstn: async () => {
      try {
        const dataxmstn = await Data_xm_stn.findAll();
        return dataxmstn;
      } catch (error) {
        console.log(error);
      }
    },
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
    obtenerData_xm_str: async () => {
      try {
        const data_xm_str = await Data_xm_str.findAll();
        return data_xm_str;
      } catch (error) {
        console.log(error);
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

    //////////////////
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
    nuevoDataxmdspctto: async (_, { input }) => {
      const { empresa_id, anho, mes, dia, contrato } = input;
      var registro = await Data_xm_dspctto.findAll({
        where: {
          empresa_id: empresa_id,
          anho: anho,
          mes: mes,
          dia: dia,
          contrato: contrato,
        },
      });
      if (registro.length > 0) {
        throw new Error(
          "Ya existe un registro para este año y mes, por favor eliminelo, si lo desea, e inserte de nuevo "
        );
      }
      try {
        const data_xm_dspctto = new Data_xm_dspctto(input);
        const resultado = await data_xm_dspctto.save();
        return resultado;
      } catch (error) {
        console.log(error);
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
    nuevoDataxm_trsm: async (_, { input }) => {
      const { empresa_id, anho, mes } = input;
      console.log(input);
      var registro = await Data_xm_trsm.findAll({
        where: { empresa_id: empresa_id, anho: anho, mes: mes },
      });
      // console.log(registro)
      // if (registro.length > 0) {
      //   throw new Error(
      //     "Ya existe un registro para este año y mes, por favor eliminelo, si lo desea, e inserte de nuevo "
      //   );
      // }
      try {
        const data_xm_trsm = new Data_xm_trsm(input);
        const resultado = await data_xm_trsm.save();
        return resultado;
      } catch (error) {
        console.log(error);
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
      console.log(input)
      try {
        const data_xm_guatape = new Data_xm_guatape(input);
        const resultado = await data_xm_guatape.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    //Mutation

    nuevoData_xm_cprog: async (_, { input },ctx) => {

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

    nuevoData_xm_d015: async (_, { input },ctx) => {


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
    eliminarDataxmstn: async (_, { id }) => {

      console.log(id)
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
  },
};
module.exports = resolvers;
