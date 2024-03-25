import React, { useState, useCallback, useEffect } from "react";
import Dataempresamessin from "../components/Dataempresamessin";
import Dataempresaanual from "../components/Dataempresaanual";
import DataempresaanualSin from "../components/DataempresaanualSin.js";
import Dataempresagarantias from "../components/Dataempresagarantias";
import EmpresaGarantiaComponent from "../components/EmpresaGarantiaComponent";
import Dataempresaagpe from "../components/Dataempresaagpe";
import Layout from "../components/Layout";

const Dataxm = (props) => {
  return (
    <div>
      <Layout>
        <div>
          <Dataempresamessin />
          {/* <Dataempresagarantias /> */}
          <EmpresaGarantiaComponent/>
          {/* <Dataempresaanual /> */}
          <DataempresaanualSin />
          {/* <Dataempresaagpe /> */}
        </div>
      </Layout>
    </div>
  );
};
export default Dataxm;
