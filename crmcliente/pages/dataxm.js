import React, { useState,useCallback,useEffect} from "react";
import Dataxmafac from '../components/Dataxmafac'
import Dataxmadem from '../components/Dataxmadem'
import Dataxmdspcttos from '../components/Dataxmdspcttos'
import Dataxmtserv from '../components/Dataxmtserv'
import Dataxmtrsm from '../components/Dataxmtrsm'
import Dataxmstn from '../components/Dataxmstn'
import Dataxmcprog from '../components/Dataxmcprog'
import Layout from '../components/Layout';
import Dataxmipr from '../components/Dataxmipr';
import Dataxmd015 from '../components/Dataxmd015';
import Dataxmdtun from '../components/Dataxmdtun';
const Dataxm =(props) => {
    return (
        <div>
        <Layout>
        <div>
        <Dataxmafac/>
        <Dataxmadem/>
        <Dataxmdspcttos/>
        <Dataxmtserv/>
        <Dataxmtrsm/>
        <Dataxmstn/>
        <Dataxmcprog/>
        <Dataxmipr/>
        <Dataxmd015/>
        <Dataxmdtun/>
        </div>
        </Layout>
        </div>
    )
}
export default Dataxm
