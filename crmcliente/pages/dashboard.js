import React from "react";
import { Tabs } from "antd";
import Layout from "../components/Layout";
import ResumenEjecutivoCU from "../components/ResumenEjecutivoCU";
import ComponentesCU from "../components/ComponentesCU";
import VariablesOperativas from "../components/VariablesOperativas";
import ComponenteGc from "../components/ComponenteGc";
import ComponenteTm from "../components/ComponenteTm";
import ComponenteDm from "../components/ComponenteDm";
import ComponenteCm from "../components/ComponenteCm";
import ComponenteRm from "../components/ComponenteRm";
import ComponentePr from "../components/ComponentePr";

const Dashboard = () => {
  const tabItems = [
    {
      key: "1",
      label: "Resumen Ejecutivo",
      children: <ResumenEjecutivoCU />
    },
    {
      key: "2",
      label: "Componentes CU",
      children: <ComponentesCU />
    },
    {
      key: "3",
      label: "Variables Operativas",
      children: <VariablesOperativas />
    },
    {
      key: "4",
      label: "Gc - Generación",
      children: <ComponenteGc />
    },
    {
      key: "5",
      label: "Tm - Transmisión",
      children: <ComponenteTm />
    },
    {
      key: "6",
      label: "Dm - Distribución",
      children: <ComponenteDm />
    },
    {
      key: "7",
      label: "Cm - Comercialización",
      children: <ComponenteCm />
    },
    {
      key: "8",
      label: "Rm - Restricciones",
      children: <ComponenteRm />
    },
    {
      key: "9",
      label: "Pr - Pérdidas",
      children: <ComponentePr />
    }
  ];

  return (
    <div>
      <Layout>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard de Análisis</h1>
          <p className="text-gray-600 mt-2">
            Análisis integral de componentes, tarifas y variables operativas del CU
          </p>
        </div>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          items={tabItems}
        />
      </Layout>
    </div>
  );
};

export default Dashboard;
