import React, { useState, useCallback, useEffect } from "react";
import { Tabs } from "antd";
import Dataxmafac from "../components/Dataxmafac";
// import Dataxmadem from "../components/Dataxmadem";
import Dataxmdspcttos from "../components/Dataxmdspcttos";
import Dataxmtserv from "../components/Dataxmtserv";
import Dataxmtrsm from "../components/Dataxmtrsm";
// import Dataxmtrsd from "../components/Dataxmtrsd";
import Dataxmstn from "../components/Dataxmstn";
import Dataxmcprog from "../components/Dataxmcprog";
import Layout from "../components/Layout";
import Dataxmipr from "../components/Dataxmipr";
import Dataxmd015 from "../components/Dataxmd015";

import Dataxmstr from "../components/Dataxmstr";

const Dataxm = (props) => {
  const tabItems = [
    {
      key: "1",
      label: "XM AFAC",
      children: <Dataxmafac />
    },
    {
      key: "2",
      label: "XM DSPCTTO",
      children: <Dataxmdspcttos />
    },
    {
      key: "3",
      label: "XM TRSM",
      children: <Dataxmtrsm />
    },
    {
      key: "4",
      label: "XM TSERV",
      children: <Dataxmtserv />
    },
    {
      key: "5",
      label: "XM STN",
      children: <Dataxmstn />
    },
    {
      key: "6",
      label: "XM STR",
      children: <Dataxmstr />
    },
    {
      key: "7",
      label: "XM IPR",
      children: <Dataxmipr />
    },
    {
      key: "8",
      label: "XM D015",
      children: <Dataxmd015 />
    },
    {
      key: "9",
      label: "XM CPROG",
      children: <Dataxmcprog />
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
export default Dataxm;
