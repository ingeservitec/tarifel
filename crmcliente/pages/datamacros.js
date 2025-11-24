import React, { useState, useCallback, useEffect } from "react";
import { Tabs } from "antd";
import Datadane from "../components/Datadane";
import Databanrepublicatasaco from "../components/Databanrepublicatasaco";
import Databanrepublicatasaca from "../components/Databanrepublicatasaca";
import Databanrepublicatco31365 from "../components/Databanrepublicatco31365";
import Layout from "../components/Layout";
import Datadaneipp from "../components/Datadaneipp";
import Datadaneipc from "../components/Datadaneipc.js";

const Datamacros = (props) => {
  const tabItems = [
    {
      key: "1",
      label: "DANE IPP",
      children: <Datadaneipp />
    },
    {
      key: "2",
      label: "DANE IPC",
      children: <Datadaneipc />
    },
    {
      key: "3",
      label: "Banco República TASACO",
      children: <Databanrepublicatasaco />
    },
    {
      key: "4",
      label: "Banco República TASACA",
      children: <Databanrepublicatasaca />
    },
    {
      key: "5",
      label: "Banco República TCO",
      children: <Databanrepublicatco31365 />
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

export default Datamacros;
