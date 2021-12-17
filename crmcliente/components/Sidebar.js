import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

const Sidebar = () => {

    // routing de next
    const router = useRouter();

    // console.log(router.pathname)

    return ( 
        <aside className="bg-gray-800 sm:w-60 xl:w-60 sm:min-h-screen p-1" >
            <div>
                <h2 className="text-white text-3xl font-black m-4">QUBIT</h2>
            </div>

            <nav className="mt-5 list-none ">
                <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block text-decoration-none">
                            Calculo CU
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/dataempresa" ? "bg-blue-800 p-2" : "p-2 "}>
                    <Link href="/dataempresa">
                        <a className="text-white block text-decoration-none">
                            Data Empresa
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/dataxm" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/dataxm">
                        <a className="text-white block text-decoration-none">
                            Data XM
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/datamme" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/datamme">
                        <a className="text-white block text-decoration-none">
                            Data MME
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/datacreg" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/datacreg">
                        <a className="text-white block text-decoration-none">
                            Data CREG
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/datadane" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/datamacros">
                        <a className="text-white block text-decoration-none">
                            Data Macros
                        </a>
                    </Link>
                </li>
            </nav>

      

        </aside>
     );
}
 
export default Sidebar;