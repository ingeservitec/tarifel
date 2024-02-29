import React, { useState,useCallback} from "react";
import Dropzone from "react-dropzone";
import 'bootstrap/dist/css/bootstrap.css';
import { useDropzone } from "react-dropzone";
import csv from 'csv';

const Dropfiles = () => {
    const [datacsv, setDatacsv] = useState("");


    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader();
    
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading failed");
        reader.onload = () => {
          // Parse CSV file
          csv.parse(reader.result, (err, data) => {
            console.log("Parsed CSV data: ", data);
            setDatacsv(data)
          });
        };

        // read file contents
        acceptedFiles.forEach(file => reader.readAsBinaryString(file));
      }, []);
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
      return (
        <div>
        <div className="card  col-sm m-2">
        <div className="App" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Arrastre algun archivo aqui o haga click para cargar</p>
        </div>
        
        <div>{datacsv ? datacsv[0][3]  : null }</div>
        </div>
        </div>
      )}
export default Dropfiles;