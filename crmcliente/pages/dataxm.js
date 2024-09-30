import React, { useState, useCallback, useEffect } from "react";
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
  return (
    <div>
      <Layout>
        <div>
          <Dataxmafac />
          <Dataxmdspcttos />
          <Dataxmtrsm />
          <Dataxmtserv />
          <Dataxmstn />
          <Dataxmstr />
          <Dataxmipr />
          <Dataxmd015 />
          <Dataxmcprog />

          {/*
        <Dataxmadem/>
       
   
        <Dataxmtrsd/>
        
        
        
        <Dataxmdtun/> */}
        </div>
      </Layout>
    </div>
  );
};
export default Dataxm;
