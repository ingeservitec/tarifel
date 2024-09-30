import React, { useState } from "react";
import TableAndt from "./TableAndt"; // Asegúrate de que el path sea correcto
import AddData from "./AddData"; // Asegúrate de que el path sea correcto
import {
  OBTENER_DATA_XM_D015,
  NUEVO_DATA_XM_D015,
  ELIMINAR_DATA_XM_D015,
} from "../data"; // Asegúrate de ajustar el path de importación
import { headersDataXmD015 } from "../headers/headersTables"; // Asegúrate de ajustar el path de importación

const DataXmD015Component = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const titulo = "Data XM D015";

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
              mutation={NUEVO_DATA_XM_D015}
              subMutation="nuevoDataXmD015"
              inputFields={headersDataXmD015} // Ajusta según sea necesario
              cacheField="obtenerDataXmD015"
              tituloTabla={titulo}
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headersDataXmD015}
            cacheField="obtenerDataXmD015"
            mutation={ELIMINAR_DATA_XM_D015}
            query={OBTENER_DATA_XM_D015}
          />
        </div>
      </div>
    </div>
  );
};

export default DataXmD015Component;
