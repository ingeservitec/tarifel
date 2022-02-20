import React, { useState,useCallback,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import Swal from 'sweetalert2'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import TableHeader from './DataTable/TableHeader';
import logo_energuaviare from '../images/logo_energuaviare.jpg';
import pie_energuaviare from '../images/pie_energuaviare.jpg';
import b1 from '../images/1.jpg';
import * as htmlToImage from 'html-to-image';


const OBTENER_RES_COMPONENTES_CU_TARIFA= gql`
query obtenerRes_componentes_cu_tarifa{
obtenerRes_componentes_cu_tarifa{
id
creador
anho
mes
qc
pc
ref_g
max_g
cr
ad
aj
pb
gc
tx
dtun_nt1_e
dtun_nt1_c
dtun_nt1_p
dtun_nt2
dtun_nt3
cdi_100
cdi_50
cdm
cd4
cd3
cd2
dnt1
dnt2
dnt3
dnt4
crs
rcal
r
iprstn
pr_nt1
pr_nt2
pr_nt3
pr_nt4
cer
cfm
rc
ul_trim_val_mme
anho_ul_trim_val_mme
sub1
sub2
n_sub1
m_sub2
facturacion_t
r1
r2
sup_def
cfs
cfe
c_ast
cvr
cv
cu_nt1_100
cu_nt1_50
cu_nt1_0
cu_nt2
cu_nt3
cu_nt4
nt1_100_estrato_1_men_cs
nt1_100_estrato_2_men_cs
nt1_100_estrato_3_men_cs
nt1_100_estrato_4_men_cs
nt1_100_estrato_5_men_cs
nt1_100_estrato_6_men_cs
nt1_100_estrato_4
nt1_100_estrato_5
nt1_100_estrato_6
nt1_100_c
nt1_100_i_con_c
nt1_100_i_sin_c
nt1_100_p
nt1_100_o
nt1_50_estrato_1_men_cs
nt1_50_estrato_2_men_cs
nt1_50_estrato_3_men_cs
nt1_50_estrato_4_men_cs
nt1_50_estrato_5_men_cs
nt1_50_estrato_6_men_cs
nt1_50_estrato_4
nt1_50_estrato_5
nt1_50_estrato_6
nt1_50_c
nt1_50_i_con_c
nt1_50_i_sin_c
nt1_50_p
nt1_50_o
nt1_0_estrato_1_men_cs
nt1_0_estrato_2_men_cs
nt1_0_estrato_3_men_cs
nt1_0_estrato_4_men_cs
nt1_0_estrato_5_men_cs
nt1_0_estrato_6_men_cs
nt1_0_estrato_4
nt1_0_estrato_5
nt1_0_estrato_6
nt1_0_c
nt1_0_i_con_c
nt1_0_i_sin_c
nt1_0_p
nt1_0_o
nt2_c
nt2_i_con_c
nt2_i_sin_c
nt2_o
nt2_ap
nt2_bsnmen_cs
nt2_bsnmay_cs
nt3_c
nt3_i_con_c
nt3_i_sin_c
nt3_o
nt3_ap
empresa_id
cu_nt1_100_ot
cu_nt1_50_ot
cu_nt1_0_ot
cu_nt2_ot
cu_nt3_ot
cu_nt4_ot
saldo_nt1_100_ot
saldo_nt1_50_ot
saldo_nt1_0_ot
saldo_nt2_ot
saldo_nt3_ot
pv
giro_sobrante
ultimo_giro_incluido
}
}
`;




const Pruebapdf = (props) => {
  const { data:data1, error:error1, loading:loading1} = useQuery(OBTENER_RES_COMPONENTES_CU_TARIFA);
  const [anho, setAnho] = useState(props.anho);
  const [mes, setMes] = useState(props.mes)
  
  const [data_Res_componentes_cu_tarifam, setData_Res_componentes_cu_tarifam] = useState([])

  useEffect(() => {
    console.log(loading1)
    if(!loading1){    
      const data_Res_componentes_cu_tarifa=data1.obtenerRes_componentes_cu_tarifa
      console.log(data_Res_componentes_cu_tarifa)
      setData_Res_componentes_cu_tarifam(data_Res_componentes_cu_tarifa.filter(data_Res_componentes_cu_tarifa => data_Res_componentes_cu_tarifa.anho===anho && data_Res_componentes_cu_tarifa.mes===mes))

            }},[loading1])

  const print = () => {


    const input = document.getElementById('divToPrint');


    // htmlToImage.toPng(input)
    // .then(function (dataUrl) {
    //   saveAs(dataUrl, 'my-node.png');

    //   const imgData = saveAs(dataUrl, 'my-node.png', crossOrigin="anonymous");
    //   imgData.setAttribute('src', `url/timestamp=${new Date().getTime()}`);
    html2canvas(input,{ logging: true, letterRendering: 1, allowTaint: true, useCORS: true } )
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 5, 5, width-10, height-10);
        
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })


    // const divToDisplay = document.getElementById('divToPrint')
    // // html2canvas(divToDisplay).then(function(canvas) { 
    // // const divImage = canvas .toDataURL("image/png"); 
        
    //     const doc = new jsPDF();

    //     // doc.addImage(divImage, 'PNG', 0, 0); 

    //     doc.text(body,10 , 10)
        
    //     doc.save('demo.pdf')
  }
  function roundToTwo(num) {    
    return +(Math.round(num + "e+5")  + "e-5");
}

var meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

const mes_letras = meses[mes - 1];



const formik=useFormik({
initialValues: {
},
enableReinitialize: true,
validationSchema: Yup.object({
creador: Yup.string()
.required('El creador es obligatorio'),
}),
onSubmit: async valores => {
const{}=valores
Swal.fire("Buen trabajo!", "Los datos han sido guardados!", "success");
props.close()
try {
console.log(valores)
const{data}=await nuevoRes_componentes_cu_tarifa({
variables:{
input:{
        
}
}
});
} catch (error) {
console.log(valores)
console.log(error);
console.log();
}
}
})


return (
<div>

<Modal show={props.show2}
aria-labelledby="contained-modal-title-vcenter"
centered
id="myModal"
size="xl"
onHide={props.close}>
<Modal.Header closeButton>
<Modal.Title>Publicación Tarifaria</Modal.Title>
</Modal.Header>
<Modal.Body>

<div className='p-3'>

<div className='p-3'>
      <button type="button" className="btn btn-outline-primary"onClick={print}>Imprimir en PDF</button>
      <button type="button" className="btn btn-outline-primary"onClick={props.close}>Cerrar</button>
      </div>

<div id="divToPrint" className="mt4">

<div className="container ">
<div className="col-md-12">
<div className="row ">

<div className="col-md-3">
<img 
      src="https://energuaviare.com/sites/all/themes/bootstrap/images/logo.png"
      alt="new"
      
      />
</div>
<div className="col-md-9 text-center p-4">
<h3>TARIFAS A COBRAR A USUARIOS REGULADOS PERIODO DE FACTURACIÓN MES DE {mes_letras} DE {anho}</h3>
</div>
</div>
</div>
</div>

<p className="text-sm-justify p-3">Componentes del costo de prestación del servicio, en cumplimiento de la resolución CREG, 031/97, 082/02, 108/03, Decreto UPME 355/04, 001/07, 119/07,
097/08, 168/08, 058/08, 070/08,189/09, 089/10, 186/10, 157 /11, 173/11 MME 9 0290/14, 057/14, 180/14, 191/14, 206/15, 019 de 2018, 012 de 2020, 003 de
2021 y demás normas complementarias.</p>

<table class="table p-2">
  <thead>
    <tr>
     <th scope="col" class="col-md-2">COMPONENTES</th>
      <th scope="col" class="col-md-1">NT1 Propiedad Empresa</th>
      <th scope="col"class="col-md-1">NT1 Propiedad Compartida</th>
      <th scope="col"class="col-md-1">NT1 Propiedad Usuario</th>
      <th scope="col"class="col-md-1">NT2</th>
      <th scope="col"class="col-md-1">NT3</th>
      <th scope="col"class="col-md-1">NT4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Generación - Gm,i,j</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].gc):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].gc):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].gc):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].gc):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].gc):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].gc):null }</td>
    </tr>
    <tr>
      <th scope="row">Transmisión - Tm</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? data_Res_componentes_cu_tarifam[0].tx:null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? data_Res_componentes_cu_tarifam[0].tx:null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? data_Res_componentes_cu_tarifam[0].tx:null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? data_Res_componentes_cu_tarifam[0].tx:null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? data_Res_componentes_cu_tarifam[0].tx:null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? data_Res_componentes_cu_tarifam[0].tx:null }</td>
    </tr>
    <tr>
      <th scope="row">Distribución Dn,m</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt1):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt1-data_Res_componentes_cu_tarifam[0].cdi_50):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt1-data_Res_componentes_cu_tarifam[0].cdi_100):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt2):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt3):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt4):null }</td>
    </tr>
    <tr>
      <th scope="row">Comercialización</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cv):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cv):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cv):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cv):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cv):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cv):null }</td>
    </tr>
    <tr>
      <th scope="row">Perdidas - PRn,m,i,j</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].pr_nt1):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].pr_nt1):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].pr_nt1):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].pr_nt2):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].pr_nt3):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].pr_nt4):null }</td>
    </tr>
    <tr>
      <th scope="row">Restricciones - Rm,i</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].r):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].r):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].r):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].r):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].r):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].r):null }</td>
    </tr>
    <tr>
      <th scope="row">Costo Unitario (Calculado)</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt1_100):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt1_50):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt1_0):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt2):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt3):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt4):null }</td>
    </tr>
    <tr>
      <th scope="row">Costo Unitario (Opción Tarifaria)</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt1_100_ot):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt1_50_ot):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt1_0_ot):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt2_ot):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt3_ot):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].cu_nt4_ot):null }</td>
    </tr>
  </tbody>
</table>
<div>
<p>Propiedad Empresa: Cuando ENERGUAVIARE E es propietaria de la red de baja tensión (BT) y del transformador</p>
<p>Propiedad compartida: Cuando la propiedad de la red de baja tensión (BT) o del transformador es del cliente.</p>
<p>Propiedad Cliente: Cuando el CLIENTE es propietario de la red de baja tensión (BT) y del transformador es del cliente</p>
<p>CS: Consumo de subsistencia que es hasta 173 kWh/mes. (UPME)</p>
</div>
<table class="table">
  <thead>

    <tr>
      <th scope="col">ESTRATO</th>
      <th scope="col">Empresa</th>
      <th scope="col">Compartido</th>
      <th scope="col">Usuario</th>
      <th scope="col">Empresa</th>
      <th scope="col">Compartido</th>
      <th scope="col">Usuario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Estrato 1</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_1_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_1_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_1_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_4):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_4):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_4):null }</td>
    </tr>
    <tr>
      <th scope="row">Estrato 2</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_2_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_2_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_2_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_4):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_4):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_4):null }</td>
    </tr>
    <tr>
      <th scope="row">Estrato 3</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_3_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_3_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_3_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_4):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_4):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_4):null }</td>
    </tr>
    <tr>
      <th scope="row">Estrato 4</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_4_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_4_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_4_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_4):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_4):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_4):null }</td>
    </tr>
    <tr>
      <th scope="row">Estrato 5</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_5_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_5_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_5_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_5):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_5):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_5):null }</td>
    </tr>
    <tr>
      <th scope="row">Estrato 6</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_6_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_6_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_6_men_cs):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_estrato_6):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_estrato_6):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_estrato_6):null }</td>
    </tr>
    <tr>
      <th scope="row">Barrios Subnormales E1</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt2_bsnmen_cs):null }</td>
    </tr>
  </tbody>
</table>

<table class="table">
<thead>
    <tr>
      <th scope="col"></th>
      <th colspan="3" class="text-center">Comercial e industrial con contribución</th>
      <th colspan="3" class="text-center">Oficial, alumbrado público e industrial sin contribución</th>
    </tr>
  </thead>
  <thead>
    <tr>
      <th scope="col">NIVEL DE TENSION</th>
      <th scope="col">Empresa</th>
      <th scope="col">Compartido</th>
      <th scope="col">Usuario</th>
      <th scope="col">Empresa</th>
      <th scope="col">Compartido</th>
      <th scope="col">Usuario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_c):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_c):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_c):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_100_o):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_50_o):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt1_0_o):null }</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt2_c):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt2_c):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt2_c):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt2_o):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt2_o):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt2_o):null }</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt3_c):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt3_c):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt3_c):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt3_o):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt3_o):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].nt3_o):null }</td>
    </tr>
  
  </tbody>
</table>
<table class="table">
<thead>
    <tr>

      <th colspan="4" class="text-center">Costo transporte de energía reactiva en exceso</th>
    </tr>
  </thead>
  <thead>
    <tr>
      <th scope="col">NIVEL DE TENSION</th>
      <th scope="col">Empresa</th>
      <th scope="col">Compartido</th>
      <th scope="col">Usuario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt1):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt1-data_Res_componentes_cu_tarifam[0].cdi_50):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt1-data_Res_componentes_cu_tarifam[0].cdi_100):null }</td>

    </tr>
    <tr>
      <th scope="row">2</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt2):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt2):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt2):null }</td> 
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt3):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt3):null }</td>
      <td>{data_Res_componentes_cu_tarifam.length>0? roundToTwo(data_Res_componentes_cu_tarifam[0].dnt3):null }</td>
    </tr>
  
  </tbody>
</table>
<p>Conforme artículo 15 y Numeral 6.7 de la resolución CREG 097 de 2008</p>

<div>
<img 
      src='http://drive.google.com/uc?export=view&id=1rJ0jKgN-8nXUGJyKIzx66GuTdDKhyrq0'
      alt="pie"
      width="1100"
      />
</div>
</div>
</div>
</Modal.Body>
<Modal.Footer>
</Modal.Footer>
</Modal>
</div>

)
}

    
export default Pruebapdf;





