
import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_XM_STN,
  NUEVO_DATA_XM_STN,
  ELIMINAR_DATA_XM_STN,
} from "../data";
import { headersData_xm_stn } from "../headers/headersTables";

const Dataxmstn = () => {
  const headers = headersData_xm_stn;

  

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos xm stn";
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
              mutation={NUEVO_DATA_XM_STN}
              subMutation="nuevoData_xm_stn"
              inputFields={headers}
              cacheField="obtenerData_xm_stn"
              tituloTabla="Agregar Datos xm stn"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerData_xm_stn"
            mutation={ELIMINAR_DATA_XM_STN}
            subMutation={"eliminarData_xm_stn"}
            query={OBTENER_DATA_XM_STN}
          />
        </div>
      </div>
    </div>
  );
};

export default Dataxmstn;
