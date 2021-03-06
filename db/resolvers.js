const Usuario = require ('../models/Usuario');
const Afac = require ('../models/Afac');
const Data_empresa = require ('../models/Data_empresa');
const Data_xm_afac = require ('../models/Data_xm_afac');
const Data_xm_adem = require ('../models/Data_xm_adem');
const Data_xm_dspctto = require ('../models/Data_xm_dspctto');
const Data_xm_tserv = require ('../models/Data_xm_tserv');
const Data_xm_trsm = require ('../models/Data_xm_trsm');
const Data_xm_str = require ('../models/Data_xm_str');
const Data_xm_stn = require ('../models/Data_xm_stn');
const Data_creg_cx = require ('../models/Data_creg_cx');
const Data_dane = require ('../models/Data_dane');
const Data_mme_validacion = require ('../models/Data_mme_validacion');
const Data_mme_giro = require ('../models/Data_mme_giro');
const Data_banrepublica_tco = require ('../models/Data_banrepublica_tco');
const Data_banrepublica_tcap = require ('../models/Data_banrepublica_tcap');
const Res_componentes_cu_tarifa = require ('../models/Res_componentes_cu_tarifa');
const Data_xm_guatape = require ('../models/Data_xm_guatape');
const Data_xm_cprog= require ('../models/Data_xm_cprog');
const Data_xm_ipr= require ('../models/Data_xm_ipr');	
const Data_xm_d015= require ('../models/Data_xm_d015');	
const Data_xm_dtun= require ('../models/Data_xm_dtun');
const Data_empresa_anual= require ('../models/Data_empresa_anual');

const bcryptjs = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const { afterCreate } = require('../models/Usuario');
require('dotenv').config();


const crearToken= (usuario,secreta, expiresIn)=> {
const{id,email,nombre,apellido, empresa}=usuario
return jwt.sign( { id, email, nombre, apellido, empresa }, secreta, { expiresIn } )
}

const resolvers={
    Query:{
        //Toma un token
    obtenerUsuario: async (_,{}, ctx) => {
        //Toma toda la cadena y revisa que sea valida
        // const usuarioId = await jwt.verify(token,process.env.SECRETA);
        // return usuarioId;
        return ctx.usuario;
	},
    obtenerAfac: async () => {
        try {
        const afac =await Afac.findAll()
        return afac;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerData_empresa: async () => {
        try {
        const data_empresa =await Data_empresa.findAll()
        return data_empresa;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerData_xm_afac: async () => {
        try {
        const data_xm_afac =await Data_xm_afac.findAll()
        return data_xm_afac;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerData_xm_adem: async () => {
        try {
        const data_xm_adem =await Data_xm_adem.findAll()
        return data_xm_adem;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerData_xm_dspctto: async () => {
        try {
        const data_xm_dspctto =await Data_xm_dspctto.findAll()
        return data_xm_dspctto;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerData_xm_tserv: async () => {
        try {
        const data_xm_tserv =await Data_xm_tserv.findAll()
        return data_xm_tserv;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerData_xm_trsm: async () => {
        try {
        const data_xm_trsm =await Data_xm_trsm.findAll()
        return data_xm_trsm;
        } catch (error) {
            console.log(error)
        }
    },

    obtenerData_xm_stn: async () => {
        try {
        const data_xm_stn =await Data_xm_stn.findAll()
        return data_xm_stn;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerData_creg_cx: async () => {
        try {
        const data_creg_cx =await Data_creg_cx.findAll()
        return data_creg_cx;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerData_dane: async () => {
        try {
        const data_dane =await Data_dane.findAll()
        return data_dane;
        } catch (error) {
            console.log(error)
        }
    },

    obtenerData_banrepublica_tco: async () => {
        try {
        const data_banrepublica_tco =await Data_banrepublica_tco.findAll()
        return data_banrepublica_tco;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerData_banrepublica_tcap: async () => {
        try {
        const data_banrepublica_tcap =await Data_banrepublica_tcap.findAll()
        return data_banrepublica_tcap;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerRes_componentes_cu_tarifa: async () => {
        try {
        const res_componentes_cu_tarifa =await Res_componentes_cu_tarifa.findAll()
        return res_componentes_cu_tarifa;
        } catch (error) {
            console.log(error)
        }
    },
    //Query
    obtenerData_creg_cx: async () => {
    try {
    const data_creg_cx=await Data_creg_cx.findAll()
    return data_creg_cx;
    } catch (error) {
    console.log(error)
    }
    },
    //Query
    obtenerData_banrepublica_tcap: async () => {
    try {
    const data_banrepublica_tcap=await Data_banrepublica_tcap.findAll()
    return data_banrepublica_tcap;
    } catch (error) {
    console.log(error)
    }
    },

obtenerData_banrepublica_tco: async () => {
try {
const data_banrepublica_tco=await Data_banrepublica_tco.findAll()
return data_banrepublica_tco;
} catch (error) {
console.log(error)
}
},
//Query
obtenerData_mme_validacion: async () => {
try {
const data_mme_validacion=await Data_mme_validacion.findAll()
return data_mme_validacion;
} catch (error) {
console.log(error)
}
},
//Query
obtenerData_mme_giro: async () => {
try {
const data_mme_giro=await Data_mme_giro.findAll()
return data_mme_giro;
} catch (error) {
console.log(error)
}
},
//Query
obtenerRes_componentes_cu_tarifa: async () => {
try {
const res_componentes_cu_tarifa=await Res_componentes_cu_tarifa.findAll()
return res_componentes_cu_tarifa;
} catch (error) {
console.log(error)
}
},
//Query
obtenerRes_componentes_cu_tarifa: async () => {
try {
const res_componentes_cu_tarifa=await Res_componentes_cu_tarifa.findAll()
return res_componentes_cu_tarifa;
} catch (error) {
console.log(error)
}
},
//Query
obtenerDataxmstn: async () => {
    try {
    const dataxmstn=await Data_xm_stn.findAll()
    return dataxmstn;
    } catch (error) {
    console.log(error)
    }
    },
    //Query
    //Query
    obtenerData_xm_guatape: async () => {
    try {
    const data_xm_guatape=await Data_xm_guatape.findAll()
    return data_xm_guatape;
    } catch (error) {
    console.log(error)
    }
    },
    //Query
obtenerData_xm_cprog: async () => {
try {
const data_xm_cprog=await Data_xm_cprog.findAll()
return data_xm_cprog;
} catch (error) {
console.log(error)
}
},
//Query
obtenerData_xm_ipr: async () => {
    try {
    const data_xm_ipr=await Data_xm_ipr.findAll()
    return data_xm_ipr;
    } catch (error) {
    console.log(error)
    }
    },

    //Query
obtenerData_xm_d015: async () => {
try {
const data_xm_d015=await Data_xm_d015.findAll()
return data_xm_d015;
} catch (error) {
console.log(error)
}
},
//Query
obtenerData_xm_dtun: async () => {
try {
const data_xm_dtun=await Data_xm_dtun.findAll()
return data_xm_dtun;
} catch (error) {
console.log(error)
}
},
//Query
obtenerData_empresa_anual: async () => {
try {
const data_empresa_anual=await Data_empresa_anual.findAll()
return data_empresa_anual;
} catch (error) {
console.log(error)
}
},
//Query
obtenerData_xm_str: async () => {
    try {
    const data_xm_str=await Data_xm_str.findAll()
    return data_xm_str;
    } catch (error) {
    console.log(error)
    }
    }
    


    },

    Mutation:{
        nuevoUsuario:async (_,{input})=> {
            
            const {email, password}= input;

            //Revisar si el usuario ya esta registrado
            const existeUsuario =await Usuario.findOne({where:{email:'Alejandro'}??})
            if (existeUsuario){
                throw new Error ('EL usuario ya esta registrado')
            }
            
            //Hash el password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);
            
            try {
                //Guardarlo en la BD
                const usuario=new Usuario(input);
                usuario.save();
                return usuario;
            } catch (error) {
                console.log(error)
            }
            return "Creando..."
        },
        autenticarUsuario :async (_,{input})=> {
        //Revisar si el usuario existe
        const {email, password}= input; 
        const existeUsuario =await Usuario.findOne({where:{email:email}??})
        if (!existeUsuario){
            throw new Error ('EL usuario no existe')
        }
        //Revisar si el password es correcto
        const passwordCorrecto = await bcryptjs.compare(password,existeUsuario.password)
        if (!passwordCorrecto){
            throw new Error ('El password es incorrecto')
        }
        //Crear Token
        return {
            token: crearToken(existeUsuario,process.env.SECRETA,'24h')
        }
        },
        nuevoAfac :async (_,{input})=> {

            try {
            const afac=new Afac(input);
            const resultado = await afac.save();
            return resultado
            } catch (error) {
                console.log(error)
            }
                        
            },
        nuevoDataempresa :async (_,{input})=> {

            try {
            const data_empresa=new Data_empresa(input);
            const resultado = await data_empresa.save();
            return resultado
            } catch (error) {
                console.log(error)
            }
                        
            },
            nuevoDataxmafac :async (_,{input})=> {

                try {
                const data_xm_afac=new Data_xm_afac(input);
                const resultado = await data_xm_afac.save();
                return resultado
                } catch (error) {
                    console.log(error)
                }
                            
                },
                nuevoDataxmadem :async (_,{input})=> {

                    try {
                    const data_xm_adem=new Data_xm_adem(input);
                    const resultado = await data_xm_adem.save();
                    return resultado
                    } catch (error) {
                        console.log(error)
                    }
                                
                    },
                    nuevoDataxmdspctto :async (_,{input})=> {

                        try {
                        const data_xm_dspctto=new Data_xm_dspctto(input);
                        const resultado = await data_xm_dspctto.save();
                        return resultado
                        } catch (error) {
                            console.log(error)
                        }
                                    
                        },
                        nuevoDataxmtserv :async (_,{input})=> {

                            try {
                            const data_xm_tserv=new Data_xm_tserv(input);
                            const resultado = await data_xm_tserv.save();
                            return resultado
                            } catch (error) {
                                console.log(error)
                            }
                                        
                            },
                            nuevoDataxm_trsm :async (_,{input})=> {

                                try {
                                const data_xm_trsm=new Data_xm_trsm(input);
                                const resultado = await data_xm_trsm.save();
                                return resultado
                                } catch (error) {
                                    console.log(error)
                                }
                                            
                                },
                                //Mutation

                                nuevoData_creg_cx:async (_,{input})=> {
                                
                                try {
                                const data_creg_cx=new Data_creg_cx(input);
                                const resultado = await data_creg_cx.save();
                                return resultado
                                } catch (error) {
                                console.log(error)
                                }
                                },
                                //Mutation

nuevoData_dane:async (_,{input})=> {

try {
const data_dane=new Data_dane(input);
const resultado = await data_dane.save();
return resultado
} catch (error) {
console.log(error)
}
},

//Mutation



nuevoData_banrepublica_tcap:async (_,{input})=> {

try {
const data_banrepublica_tcap=new Data_banrepublica_tcap(input);
const resultado = await data_banrepublica_tcap.save();
return resultado
} catch (error) {
console.log(error)
}
},

nuevoData_banrepublica_tco:async (_,{input})=> {

try {
const data_banrepublica_tco=new Data_banrepublica_tco(input);
const resultado = await data_banrepublica_tco.save();
return resultado
} catch (error) {
console.log(error)
}
},

//Mutation

nuevoData_mme_validacion:async (_,{input})=> {

try {
const data_mme_validacion=new Data_mme_validacion(input);
const resultado = await data_mme_validacion.save();
return resultado
} catch (error) {
console.log(error)
}
},
//Mutation

nuevoData_mme_giro:async (_,{input})=> {

try {
const data_mme_giro=new Data_mme_giro(input);
const resultado = await data_mme_giro.save();
return resultado
} catch (error) {
console.log(error)
}
},
//Mutation

nuevoRes_componentes_cu_tarifa:async (_,{input})=> {

try {
const res_componentes_cu_tarifa=new Res_componentes_cu_tarifa(input);
const resultado = await res_componentes_cu_tarifa.save();
return resultado
} catch (error) {
console.log(error)
}
},
//Mutation

nuevoRes_componentes_cu_tarifa:async (_,{input})=> {

try {
const res_componentes_cu_tarifa=new Res_componentes_cu_tarifa(input);
const resultado = await res_componentes_cu_tarifa.save();
return resultado
} catch (error) {
console.log(error)
}
},

//Mutation

nuevoDataxmstn:async (_,{input})=> {

    try {
    const dataxmstn=new Data_xm_stn(input);
    const resultado = await dataxmstn.save();
    return resultado
    } catch (error) {
    console.log(error)
    }
    },
    //Mutation
    //Mutation

    nuevoData_xm_guatape:async (_,{input})=> {
    
    try {
    const data_xm_guatape=new Data_xm_guatape(input);
    const resultado = await data_xm_guatape.save();
    return resultado
    } catch (error) {
    console.log(error)
    }
    },
    //Mutation

nuevoData_xm_cprog:async (_,{input})=> {

try {
const data_xm_cprog=new Data_xm_cprog(input);
const resultado = await data_xm_cprog.save();
return resultado
} catch (error) {
console.log(error)
}
},
//Mutation

nuevoData_xm_ipr:async (_,{input})=> {

    try {
    const data_xm_ipr=new Data_xm_ipr(input);
    const resultado = await data_xm_ipr.save();
    return resultado
    } catch (error) {
    console.log(error)
    }
    },
    //Mutation

nuevoData_xm_d015:async (_,{input})=> {

try {
const data_xm_d015=new Data_xm_d015(input);
const resultado = await data_xm_d015.save();
return resultado
} catch (error) {
console.log(error)
}
},
//Mutation

nuevoData_xm_dtun:async (_,{input})=> {

try {
const data_xm_dtun=new Data_xm_dtun(input);
const resultado = await data_xm_dtun.save();
return resultado
} catch (error) {
console.log(error)
}
},
//Mutation

nuevoData_xm_str:async (_,{input})=> {

    try {
    const data_xm_str=new Data_xm_str(input);
    const resultado = await data_xm_str.save();
    return resultado
    } catch (error) {
    console.log(error)
    }
    },
    
//Mutation

nuevoData_empresa_anual:async (_,{input})=> {

try {
const data_empresa_anual=new Data_empresa_anual(input);
const resultado = await data_empresa_anual.save();
return resultado
} catch (error) {
console.log(error)
}
},

actualizarData_mme_validacion:async (_,{id, input})=> {
    let data_mme_validacion=await Data_mme_validacion.findByPk(id)
if(!data_mme_validacion){
    throw new Error ('Registro no existe')
}
resultado = await data_mme_validacion.update(input,{
    where:{
id:id,
}})

return resultado
    },
    eliminarDataEmpresa:async (_,{id})=> {
        let data_empresa=await Data_empresa.findByPk(id)
      
    if(!data_empresa){
        throw new Error ('Registro no existe')
    }
    resultado =await data_empresa.destroy({
        where:{
    id:id,
    }})
    
    return "Pedido Eliminado"
        }
    }
}
module.exports=resolvers;

