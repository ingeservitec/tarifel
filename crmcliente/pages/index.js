import React, { PureComponent, useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Rescomponentescutarifa from "../components/Rescomponentescutarifa";
import GraficaCUTarifas from "../components/GraficaCUTarifas";
import RescomponentescutarifaEG from "../components/RescomponentescutarifaEG.js";

import "react-datepicker/dist/react-datepicker.css";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`;

const Index = () => {
  const router = useRouter();

  // Consulta de Apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  // console.log(data)
  // console.log(loading)
  // console.log(error)

  if (loading) return null;


  if (data.obtenerUsuario === null) {
    window.location.href = "login";
  }

  return (
    <div>
      <Layout>
        <GraficaCUTarifas />
        {/* <Rescomponentescutarifa /> */}
        <RescomponentescutarifaEG />
      </Layout>
    </div>
  );
};
export default Index;

// console.log(data.obtenerUsuario)
// const vistaProtegida = () => {
//   router.push('/login');
// }
// return (
// <>
// {data.obtenerUsuario? (
// <div>
// <Layout>
// <GraficaCUTarifas/>
// <Rescomponentescutarifa/>
// </Layout>
// </div>
// ):vistaProtegida()
// }
// </>
// );
// }
// export default Index;
