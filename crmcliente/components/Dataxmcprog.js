import React, { useState } from 'react';
import TableAndt from './TableAndt'; // Asegúrate de tener este componente basado en el PDF
import AddData from './AddData'; // Componente para agregar datos, basado en el PDF
import {
  OBTENER_DATA_XM_CPROG,
  NUEVO_DATA_XM_CPROG,
  ACTUALIZAR_DATA_XM_CPROG,
  ELIMINAR_DATA_XM_CPROG,
} from '../data'; // Asume que has creado este archivo basado en los pasos anteriores
import { headersDataXmCprog } from '../headers/headersTables'; // Asume que este archivo contiene los headers de la tabla

const DataXmCprog = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Datos XM CPROG</h5>
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
              mutation={NUEVO_DATA_XM_CPROG}
              subMutation="nuevoDataXmCprog"
              inputFields={headersDataXmCprog}
              cacheField="obtenerDataXmCprog"
              tituloTabla="Agregar Datos XM CPROG"
              // Asume la existencia de un link de ejemplo para importación masiva
              linkEjemplo="https://example.com/import-xm-cprog.xlsx"
              manual={true} // Si quieres habilitar la carga manual
              masivo={true} // Si quieres habilitar la carga masiva
            />
          </div>
          <TableAndt
            titulo="Datos XM CPROG"
            columns={headersDataXmCprog}
            cacheField="obtenerDataXmCprog"
            mutation={ELIMINAR_DATA_XM_CPROG}
            query={OBTENER_DATA_XM_CPROG}
            // Asume que el backend maneja la eliminación por ID
            subMutation="eliminarDataXmCprog" 
          />
        </div>
      </div>
    </div>
  );
};

export default DataXmCprog;
