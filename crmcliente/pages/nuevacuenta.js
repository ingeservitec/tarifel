import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import logo from '../public/img/logo.png'; // Tell webpack this JS file uses this image

const NUEVA_CUENTA = gql`
    mutation nuevoUsuario($input: UsuarioInput) {
        nuevoUsuario(input: $input) {
            id
            nombre
            apellido
            email
            empresa
            sector
        }
    }
`;

const NuevaCuenta = () => {

    // State para el mensaje
    const [mensaje, guardarMensaje] = useState(null)
    // Mutation para crear nuevos usuarios
    const [ nuevoUsuario ] = useMutation(NUEVA_CUENTA);
   

    // Routing
    const router = useRouter();

    // Validación del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            empresa: '',
            sector:'SIN'
        }, 
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .required('El Nombre es Obligatorio'), 
            apellido: Yup.string()
                        .required('El Apellido es obligatorio'),
            email: Yup.string()
                        .email('El email no es válido')
                        .required('El email es obligatorio'),
            password: Yup.string()
                        .required('El password no puede ir vacio')
                        .min(6, 'El password debe ser de al menos 6 caracteres')
        }),
        onSubmit: async valores => {
            // console.log('enviando');
            console.log(valores);
            const { nombre, apellido, email, password, empresa } = valores
            

            try {
                const { data } = await nuevoUsuario({
                    variables : {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password,
                            empresa: 'EGVC',
                            sector: 'sin'
                        }
                    }
                });
                console.log(data);

                // Usuario creado correctamente
                guardarMensaje(`Se creo correctamente el Usuario: ${data.nuevoUsuario.nombre} `);

                // Redirigir usuario para iniciar sesión
                setTimeout(() => {
                    guardarMensaje(null);
                    router.push('/login')
                }, 3000);

            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }
    });


    // if(loading) return 'Cargando...';

    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return ( 

        <>
            <Layout> 
                {/* <h1 className="text-center text-2xl text-white font-light">Crear Nueva Cuenta</h1> */}
                {mensaje && mostrarMensaje() }
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <img src={logo.src} alt="Logo" className="mb-4" />

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre Usuario"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            { formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Apellido
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido Usuario"
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            { formik.touched.apellido && formik.errors.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    
                                    <p>{formik.errors.apellido}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Correo Usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña Usuario"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null  }

                            {/* <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                    Empresa
                                </label>
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="empresa" 
                                    id="empresa" 
                                    value={formik.values.empresa} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}>
                                    <option value="">
                                    Seleccione una empresa{" "}
                                    </option>
                                    <option value="ENIC">
                                    Enelar
                                    </option>
                                    <option value="EGVC">
                                    Energuaviare
                                    </option>
                                    <option value="otra">
                                    Otra
                                    </option>
                            </select>
                            </div>
                            { formik.touched.empresa && formik.errors.empresa ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    
                                    <p>{formik.errors.empresa}</p>
                                </div>
                            ) : null  } */}


                            <input
                                type="submit"
                                className="w-full mt-2 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
                                style={{"backgroundColor": "#1A9DDC"}}
                                value="Crear Cuenta"
                            />

                        </form>
                    </div>
                </div>
            </Layout>
        </>
     );
}
 
export default NuevaCuenta;