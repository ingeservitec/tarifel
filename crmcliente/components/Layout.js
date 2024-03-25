import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
const Layout = ({ children }) => {
  const router = useRouter();
  
  const [variablePadre, setVariablePadre] = useState(true);

  const actualizarVariableDesdeHijo = (nuevoValor) => {
    setVariablePadre(nuevoValor);
  };
  return (
    <>
      <Head>
        <title>TARIFEL</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      {router.pathname === "/login" || router.pathname === "/nuevacuenta" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center ">
          {children}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen">
          <Sidebar actualizarVariable={actualizarVariableDesdeHijo} className="md:w-1/4 lg:w-1/5 xl:w-1/6 hidden md:block"/>
          <main className="flex-grow  h-screen overflow-x-auto">
          <Header/>
            <div className=" mx-auto">{children}</div>
          </main>
        </div>
      )}
    </>
  );
};
export default Layout;
