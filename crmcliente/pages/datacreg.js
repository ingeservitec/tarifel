import React, { useState, useCallback, useEffect } from "react";
import { Tabs } from "antd";
import Datacreg from "../components/Datacreg";
import Layout from "../components/Layout";

const Datacreg_Page = (props) => {
  const tabItems = [
    {
      key: "1",
      label: "CREG Insumos",
      children: <Datacreg />
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

export default Datacreg_Page;
