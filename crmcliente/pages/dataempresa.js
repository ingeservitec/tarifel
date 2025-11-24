import React, { useState, useCallback, useEffect } from "react";
import { Tabs } from "antd";
import Dataempresamessin from "../components/Dataempresamessin";
import Dataempresaanual from "../components/Dataempresaanual";
import DataempresaanualSin from "../components/DataempresaanualSin.js";
import Dataempresagarantias from "../components/Dataempresagarantias";
import EmpresaGarantiaComponent from "../components/EmpresaGarantiaComponent";
import Dataempresaagpe from "../components/Dataempresaagpe";
import Data_empresa_EnergiaContratoAtipico from "../components/Data_empresa_EnergiaContratoAtipico.js";
import Layout from "../components/Layout";

const Dataempresa = (props) => {
  const tabItems = [
    {
      key: "1",
      label: "Datos Mensuales",
      children: <Dataempresamessin />
    },
    {
      key: "2",
      label: "Garantías",
      children: <EmpresaGarantiaComponent />
    },
    {
      key: "3",
      label: "Datos Anuales",
      children: <DataempresaanualSin />
    },
    {
      key: "4",
      label: "AGPE",
      children: <Dataempresaagpe />
    },
    {
      key: "5",
      label: "Contratos Atípicos",
      children: <Data_empresa_EnergiaContratoAtipico />
    }
  ];

  return (
    <div>
      <Layout>
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
export default Dataempresa;
