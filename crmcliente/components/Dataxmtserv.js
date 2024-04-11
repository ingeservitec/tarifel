
import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_XM_TSERV,
  NUEVO_DATA_XM_TSERV,
  ELIMINAR_DATA_XM_TSERV,
} from "../data";
import { headersDataXmTserv } from "../headers/headersTables";

const Dataxmtserv = () => {
  const headers = headersDataXmTserv;


  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos xm tserv";


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
              mutation={NUEVO_DATA_XM_TSERV}
              subMutation="nuevoDataXmTserv"
              inputFields={headers}
              cacheField="obtenerData_xm_tserv"
              tituloTabla="Agregar Datos xm tserv"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
            />
          </div>

          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerDataXmTserv"
            mutation={ELIMINAR_DATA_XM_TSERV}
            subMutation="eliminarData_xm_tserv"
            query={OBTENER_DATA_XM_TSERV}
          />
        </div>
      </div>
    </div>
  );
};

export default Dataxmtserv;
