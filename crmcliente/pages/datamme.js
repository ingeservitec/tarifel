import React, { useState,useCallback,useEffect} from "react";
import { Tabs } from "antd";
import Datammevalidacion from '../components/Datammevalidacion'
import Datammegiro from '../components/Datammegiro'
import Layout from '../components/Layout';

const Datamme =(props) => {
  const tabItems = [
    {
      key: "1",
      label: "MME Validación",
      children: <Datammevalidacion />
    },
    {
      key: "2",
      label: "MME Giro",
      children: <Datammegiro />
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
}

export default Datamme
