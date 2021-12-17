import React, { useState,useCallback,useEffect} from "react";
import Datadane from '../components/Datadane'
import Databanrepublicatasaco from '../components/Databanrepublicatasaco'
import Databanrepublicatasaca from '../components/Databanrepublicatasaca'
import Layout from '../components/Layout';


const datamacros =(props) => {
  
    return (
        <div>
        <Layout>
        <div>
        <Datadane/>
        <Databanrepublicatasaco/>
        <Databanrepublicatasaca/>
        </div>
        </Layout>
        </div>

    )
}

export default datamacros
