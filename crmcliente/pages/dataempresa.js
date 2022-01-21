import React, { useState,useCallback,useEffect} from "react";
import Dataempresames from '../components/Dataempresames'
import Dataempresaanual from '../components/Dataempresaanual'

import Layout from '../components/Layout';

const Dataxm =(props) => {
    return (
        <div>
        <Layout>
        <div>
        <Dataempresames/>
        <Dataempresaanual/>
        </div>
        </Layout>
        </div>
    )
}
export default Dataxm