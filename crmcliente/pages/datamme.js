import React, { useState,useCallback,useEffect} from "react";
import Datammevalidacion from '../components/Datammevalidacion'
import Datammegiro from '../components/Datammegiro'
import Layout from '../components/Layout';

const Datamme =(props) => {
      return (
        <div>
        <Layout>
        <div>
        <Datammevalidacion/>
        <Datammegiro/>
        </div>
        </Layout>
        </div>
    )
}

export default Datamme
