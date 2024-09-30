import React, { useState } from "react";
import TableAndt from "./TableAndt"; // Asegúrate de que el camino sea correcto
import AddData from "./AddData"; // Asegúrate de que el camino sea correcto
import {
  OBTENER_DATA_XM_IPR,
  NUEVO_DATA_XM_IPR,
  ACTUALIZAR_DATA_XM_IPR,
  ELIMINAR_DATA_XM_IPR
} from "../data"; // Ajusta los nombres según tus archivos
import { headersDataXmIpr } from "../headers/headersTables"; // Asegúrate de que el camino sea correcto

const DataXmIpr = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const titulo = "Datos XM IPR";

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
              mutation={NUEVO_DATA_XM_IPR}
              subMutation="nuevoDataXmIpr"
              inputFields={headersDataXmIpr}
              cacheField="obtenerDataXmIpr"
              tituloTabla={titulo}
              // Considera agregar la URL del linkEjemplo si aplica a este componente
              manual={false}
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headersDataXmIpr}
            query={OBTENER_DATA_XM_IPR}
            mutation={ELIMINAR_DATA_XM_IPR}
            cacheField="obtenerDataXmIpr"
          />
        </div>
      </div>
    </div>
  );
};

export default DataXmIpr;
