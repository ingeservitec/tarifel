import React from 'react';
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
//import imagen from '../components/image.JPG'
const Pruebapdf = () => {

          const print = () => {
        // // const doc = new jsPDF({
        // //     orientation: "landscape",
        // //     unit: "in",
        // //     format: [4, 2]
        // //   });
        // var img = new Image()
        // img.src = resolve(imagen)
        
        // var doc = new jsPDF('p', 'pt');

        // doc.addImage(img, 'JPEG', 1, 2);
        // doc.text(20, 20, 'This is the first title.')

        // doc.addFont('helvetica', 'normal')
        // doc.text(20, 60, 'This is the second title.')
        // doc.text(20, 100, 'This is the thrid title.')      
        // doc.text(20, 120, 'This is the thrid title.')  
        
        // doc.save('demo.pdf')

        // var pdf = new jsPDF();
        // var img = new Image;
        // img.onload = function() {
        //     pdf.addImage(this, 10, 10);
        //     pdf.save("test.pdf");
        // };
        // img.crossOrigin = "";  
        // img.src = imagen;
        var pdf = new jsPDF('p', 'pt');
        var img = new Image()
        img.src = imagen
        pdf.save("Publicacion Agosto 2021.pdf");
      };
      


    return ( 

<div>
      <button type="button" className="btn btn-outline-primary"onClick={print}>PDF</button>
      
    </div>
        
     );
}
 
export default Pruebapdf;

 
  