import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;
const Header = () => {
    const router = useRouter();
    // query de apollo
    const { data, loading, error} = useQuery(OBTENER_USUARIO);
    // console.log(data)
    // console.log(loading)
    // console.log(error)
    // Proteger que no accedamos a data antes de tener resultados
    if(loading) return null;
    // Si no hay informacion
    if(!data) {
        return router.push('/login');
    }
    const { nombre, apellido } = data.obtenerUsuario;
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }
    return (
        <div className="row align-items-end mb-4">
            <div className="col  mx-2">
                <p>Hola: {nombre} {apellido}</p>
            </div>
            <div className="col-6 col-sm-4 col-md-3 col-xl-2 text-right">
                <button 
                    onClick={() => cerrarSesion() }
                    type="button"
                    className="btn btn-primary font-bold uppercase text-white"    
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
     );
}
 
export default Header;


