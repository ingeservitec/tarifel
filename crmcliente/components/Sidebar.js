import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import logo from '../public/img/logo.png'; // Tell webpack this JS file uses this image

const Sidebar = () => {

    // routing de next
    const router = useRouter();

    // Estados para controlar el sidebar
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFixed, setIsFixed] = useState(true); // Por defecto está fijo y abierto
    const [isHovered, setIsHovered] = useState(false);

    // Cargar estado desde localStorage
    useEffect(() => {
        const savedCollapsed = localStorage.getItem('sidebarCollapsed');
        const savedFixed = localStorage.getItem('sidebarFixed');
        if (savedCollapsed !== null) setIsCollapsed(JSON.parse(savedCollapsed));
        if (savedFixed !== null) setIsFixed(JSON.parse(savedFixed));
    }, []);

    // Guardar estado en localStorage
    const toggleSidebar = () => {
        const newCollapsed = !isCollapsed;
        const newFixed = !newCollapsed; // Si se colapsa, no está fijo; si se expande, está fijo
        setIsCollapsed(newCollapsed);
        setIsFixed(newFixed);
        localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsed));
        localStorage.setItem('sidebarFixed', JSON.stringify(newFixed));
    };

    const handleMouseEnter = () => {
        if (!isFixed && isCollapsed) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isFixed) {
            setIsHovered(false);
        }
    };

    // Determinar si el sidebar debe mostrarse expandido
    const isExpanded = isFixed ? !isCollapsed : isHovered;

    // console.log(router.pathname)

    return (
        <aside
            className={`bg-gray-800 sm:min-h-screen p-1 transition-all duration-300 ${
                isExpanded ? 'sm:w-60 xl:w-60' : 'sm:w-16 xl:w-16'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
        >
            {/* Botón de toggle */}
            <div className="flex justify-end p-2">
                <button
                    onClick={toggleSidebar}
                    className="text-white hover:text-blue-400 transition-colors p-1"
                    title={isCollapsed ? "Expandir menú" : "Contraer menú"}
                >
                    <i className={`fa ${isCollapsed ? 'fa-bars' : 'fa-times'} text-xl`}></i>
                </button>
            </div>

            {/* Logo y título */}
            <div className="overflow-hidden">
                {isExpanded ? (
                    <>
                        <h2 className="text-white text-center text-3xl font-black my-4">TARIFEL</h2>
                        <img src={logo.src} alt="Logo" className="img-fluid p-3 mb-2" />
                    </>
                ) : (
                    <div className="flex justify-center my-4">
                        <i className="fa fa-bolt text-white text-3xl"></i>
                    </div>
                )}
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <a className={`text-white flex items-center text-decoration-none ${!isExpanded ? 'justify-center' : ''}`} title="Calculo CU">
                            <i className={`fa fa-calculator text-lg ${isExpanded ? 'mr-3' : ''}`}></i>
                            {isExpanded && <span>Calculo CU</span>}
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/dataempresa" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/dataempresa">
                        <a className={`text-white flex items-center text-decoration-none ${!isExpanded ? 'justify-center' : ''}`} title="Data Empresa">
                            <i className={`fa fa-building text-lg ${isExpanded ? 'mr-3' : ''}`}></i>
                            {isExpanded && <span>Data Empresa</span>}
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/dataxm" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/dataxm">
                        <a className={`text-white flex items-center text-decoration-none ${!isExpanded ? 'justify-center' : ''}`} title="Data XM">
                            <i className={`fa fa-exchange text-lg ${isExpanded ? 'mr-3' : ''}`}></i>
                            {isExpanded && <span>Data XM</span>}
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/datamme" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/datamme">
                        <a className={`text-white flex items-center text-decoration-none ${!isExpanded ? 'justify-center' : ''}`} title="Data MME">
                            <i className={`fa fa-industry text-lg ${isExpanded ? 'mr-3' : ''}`}></i>
                            {isExpanded && <span>Data MME</span>}
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/datacreg" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/datacreg">
                        <a className={`text-white flex items-center text-decoration-none ${!isExpanded ? 'justify-center' : ''}`} title="Data CREG">
                            <i className={`fa fa-gavel text-lg ${isExpanded ? 'mr-3' : ''}`}></i>
                            {isExpanded && <span>Data CREG</span>}
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/datamacros" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/datamacros">
                        <a className={`text-white flex items-center text-decoration-none ${!isExpanded ? 'justify-center' : ''}`} title="Data Macros">
                            <i className={`fa fa-line-chart text-lg ${isExpanded ? 'mr-3' : ''}`}></i>
                            {isExpanded && <span>Data Macros</span>}
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/reportessspd" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/reportessspd">
                        <a className={`text-white flex items-center text-decoration-none ${!isExpanded ? 'justify-center' : ''}`} title="Reportes Normativos">
                            <i className={`fa fa-file-text text-lg ${isExpanded ? 'mr-3' : ''}`}></i>
                            {isExpanded && <span>Reportes Normativos</span>}
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/dashboard" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/dashboard">
                        <a className={`text-white flex items-center text-decoration-none ${!isExpanded ? 'justify-center' : ''}`} title="Dashboard">
                            <i className={`fa fa-dashboard text-lg ${isExpanded ? 'mr-3' : ''}`}></i>
                            {isExpanded && <span>Dashboard</span>}
                        </a>
                    </Link>
                </li>
            </nav>

      

        </aside>
     );
}
 
export default Sidebar;