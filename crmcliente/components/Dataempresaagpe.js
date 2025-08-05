/*
Actualización: 2024 - Refactorización del componente para usar patrón moderno
- Cambio de implementación manual de tabla a uso de TableAndt y AddData
- Integración con headers y queries estandarizadas
- Eliminación de código duplicado y mejora de mantenibilidad
*/

import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_EMPRESA_AGPE,
  NUEVO_DATA_EMPRESA_AGPE,
  ELIMINAR_DATA_EMPRESA_AGPE,
} from "../data";
import { headersDataEmpresaAgpe } from "../headers/headersTables";

const Dataempresaagpe = () => {
  const headers = headersDataEmpresaAgpe;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const titulo = "INSUMOSDATA EMPRESA AGPE";

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
              mutation={NUEVO_DATA_EMPRESA_AGPE}
              subMutation="nuevoData_empresa_agpe"
              inputFields={headers}
              cacheField="obtenerData_empresa_agpe"
              tituloTabla="Agregar Datos Empresa AGPE"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_agpe.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerData_empresa_agpe"
            mutation={ELIMINAR_DATA_EMPRESA_AGPE}
            query={OBTENER_DATA_EMPRESA_AGPE}
            subMutation="eliminarData_empresa_agpe"
          />
        </div>
      </div>
    </div>
  );
};

export default Dataempresaagpe;