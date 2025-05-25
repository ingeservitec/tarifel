import React, { useState, useCallback, useEffect } from "react";
import Datadane from "../components/Datadane";
import Databanrepublicatasaco from "../components/Databanrepublicatasaco";
import Databanrepublicatasaca from "../components/Databanrepublicatasaca";
import Databanrepublicatco31365 from "../components/Databanrepublicatco31365";
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
          <Databanrepublicatco31365 />
        </div>
      </Layout>
    </div>
  );
};

export default datamacros;
