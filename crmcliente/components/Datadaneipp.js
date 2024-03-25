import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_DANE_IPP,
  NUEVO_DATA_DANE_IPP,
  ELIMINAR_DATA_DANE_IPP,
} from "../data";
import { headersData_dane_ipp } from "../headers/headersTables";

const Datadaneipp = () => {
  const headers = headersData_dane_ipp;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = 'Datos dane ipc';
  return (
    <div className="max-h-[00px] overflow-y-auto"> {/* Establecer altura máxima y desplazamiento vertical */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Datos dane ipp</h5>
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
              mutation={NUEVO_DATA_DANE_IPP}
              subMutation="nuevoData_dane_ipp"
              inputFields={headers}
              cacheField="obtenerData_dane_ipp"
              tituloTabla="Agregar Datos dane ipp"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
              manual={false}
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerData_dane_ipp"
            mutation={ELIMINAR_DATA_DANE_IPP}
            query={OBTENER_DATA_DANE_IPP}
          />
        </div>
      </div>
    </div>
  );
};

export default Datadaneipp;
