
import React, { PureComponent,useEffect, useState, useMemo } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout'

import { gql, useQuery } from '@apollo/client'
import Rescomponentescutarifa from '../components/Rescomponentescutarifa'
import GraficaCUTarifas from '../components/GraficaCUTarifas'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Index  = () => {
return (
<div>
<Layout>      
<GraficaCUTarifas/>
<Rescomponentescutarifa/>
</Layout>
</div>
);
}
export default Index;





