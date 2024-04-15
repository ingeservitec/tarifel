import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import { OBTENER_EMPRESA_GARANTIAS, NUEVO_EMPRESA_GARANTIA, ACTUALIZAR_EMPRESA_GARANTIA, ELIMINAR_EMPRESA_GARANTIA } from "../data";
import { headersEmpresaGarantia } from "../headers/headersTables";

const EmpresaGarantiaComponent = () => {
  const headers = headersEmpresaGarantia;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos Garantias";

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
              mutation={NUEVO_EMPRESA_GARANTIA}
              subMutation="nuevoEmpresaGarantia"
              inputFields={headers}
              cacheField="obtenerEmpresaGarantias"
              tituloTabla="Agregar Datos Garantias"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerEmpresaGarantias"
            mutation={ELIMINAR_EMPRESA_GARANTIA}
            query={OBTENER_EMPRESA_GARANTIAS}
            actionMode = "delete"
            subMutation="eliminarEmpresaGarantia" 
          />
        </div>
      </div>
    </div>
  );
};

export default EmpresaGarantiaComponent;
