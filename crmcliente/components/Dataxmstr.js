
import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_XM_STR,
  NUEVO_DATA_XM_STR,
  ELIMINAR_DATA_XM_STR,
} from "../data";
import { headersData_xm_str } from "../headers/headersTables";

const Dataxmstr = () => {
  const headers = headersData_xm_str;

  

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos xm str";
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
              mutation={NUEVO_DATA_XM_STR}
              subMutation="nuevoData_xm_str"
              inputFields={headers}
              cacheField="obtenerData_xm_str"
              tituloTabla="Agregar Datos xm str"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}

            cacheField="obtenerData_xm_str"
            mutation={ELIMINAR_DATA_XM_STR}
            query={OBTENER_DATA_XM_STR}
          />
        </div>
      </div>
    </div>
  );
};

export default Dataxmstr;
