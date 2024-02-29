import React, { useState,useCallback,useEffect} from "react";
import Dataempresames from '../components/Dataempresames'
import Dataempresaanual from '../components/Dataempresaanual'
import Dataempresagarantias from '../components/Dataempresagarantias'
import Dataempresaagpe from '../components/Dataempresaagpe'
import Layout from '../components/Layout';

const Dataxm =(props) => {
    return (
        <div>
        <Layout>
        <div>
        <Dataempresames/>
        <Dataempresagarantias/>
        <Dataempresaanual/>
        <Dataempresaagpe/>
        </div>
        </Layout>
        </div>
    )
}
export default Dataxm