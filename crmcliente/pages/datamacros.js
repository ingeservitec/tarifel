import React, { useState, useCallback, useEffect } from "react";
import Datadane from "../components/Datadane";
import Databanrepublicatasaco from "../components/Databanrepublicatasaco";
import Databanrepublicatasaca from "../components/Databanrepublicatasaca";
import Layout from "../components/Layout";
import Datadaneipp from "../components/Datadaneipp";
import Datadaneipc from "../components/Datadaneipc.js";

const datamacros = (props) => {
  return (
    <div>
      <Layout>
        <div>
          <Datadaneipp />
          <Datadaneipc />
          {/* <Datadane/> */}
          <Databanrepublicatasaco />
          <Databanrepublicatasaca />
        </div>
      </Layout>
    </div>
  );
};

export default datamacros;
