import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATAEMPRESAMESSIN,
  NUEVO_DATAEMPRESAMESSIN,
  ELIMINAR_DATAEMPRESAMESSIN,
} from "../data";
import { headersDataempresamessin } from "../headers/headersTables";

const Dataempresamessin = () => {
  const headers = headersDataempresamessin;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos Empresa Mensuales";

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
              mutation={NUEVO_DATAEMPRESAMESSIN}
              subMutation="nuevoDataempresamessin"
              inputFields={headers}
              cacheField="obtenerDataempresamessin"
              tituloTabla="Agregar Datos Empresa SIN"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerDataempresamessin"
            mutation={ELIMINAR_DATAEMPRESAMESSIN}
            query={OBTENER_DATAEMPRESAMESSIN}
            subMutation={"eliminarDataempresamessin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dataempresamessin;
