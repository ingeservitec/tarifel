import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_CREG_CX,
  NUEVO_DATA_CREG_CX,
  ELIMINAR_DATA_CREG_CX,
} from "../data";
import { headersData_creg_cx } from "../headers/headersTables";

const Datacreg = () => {
  const headers = headersData_creg_cx;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const titulo = "INSUMOS CREG";

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
              className="btn btn-primary me-2"
              onClick={() => setShowModal(true)}
            >
              Agregar Datos
            </button>
            <AddData
              show={showModal}
              close={handleCloseModal}
              mutation={NUEVO_DATA_CREG_CX}
              subMutation="nuevoData_creg_cx"
              inputFields={headers}
              cacheField="obtenerData_creg_cx"
              tituloTabla="Agregar Datos CREG"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_creg_cx.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerData_creg_cx"
            mutation={ELIMINAR_DATA_CREG_CX}
            query={OBTENER_DATA_CREG_CX}
            subMutation="eliminarData_creg_cx"
          />
        </div>
      </div>
    </div>
  );
};

export default Datacreg;
