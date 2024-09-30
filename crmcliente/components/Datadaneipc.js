
import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_DANE_IPC,
  NUEVO_DATA_DANE_IPC,
  ELIMINAR_DATA_DANE_IPC,
} from "../data";
import { headersData_dane_ipc } from "../headers/headersTables";

const Datadaneipc = () => {
  const headers = headersData_dane_ipc;

  

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos dane ipc";
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">{titulo}</h5>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-init mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Agregar Datos
            </button>
            <AddData
              show={showModal}
              close={handleCloseModal}
              mutation={NUEVO_DATA_DANE_IPC}
              subMutation="nuevoData_dane_ipc"
              inputFields={headers}
              cacheField="obtenerData_dane_ipc"
              tituloTabla="Agregar Datos dane ipc"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
              manual={false}
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
           
            cacheField="obtenerData_dane_ipc"
            mutation={ELIMINAR_DATA_DANE_IPC}
            query={OBTENER_DATA_DANE_IPC}
          />
        </div>
      </div>
    </div>
  );
};

export default Datadaneipc;
