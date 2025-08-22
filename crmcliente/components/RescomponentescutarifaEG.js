import React, { useState } from 'react';
import TableAndt from './TableAndt'; // Asegúrate de tener este componente basado en el PDF
import AddData from './AddData'; // Componente para agregar datos, basado en el PDF
import {
  OBTENER_RES_COMPONENTES_CU_TARIFAS ,
  NUEVO_RES_COMPONENTES_CU_TARIFAS ,
  ACTUALIZAR_RES_COMPONENTES_CU_TARIFA ,
  ELIMINAR_DATA_RES_COMPONENTES_CU_TARIFA,
} from '../data'; // Asume que has creado este archivo basado en los pasos anteriores
import { headersResComponentesCuTarifa } from '../headers/headersTables'; // Asume que este archivo contiene los headers de la tabla

const DataXmCprog = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Datos CU y Tarifas</h5>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-init mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Agregar Calculo de CU y Tarifas
            </button>
            <AddData
              show={showModal}
              close={handleCloseModal}
              mutation={NUEVO_RES_COMPONENTES_CU_TARIFAS}
              subMutation="nuevoResComponentesCuTarifa"
              inputFields={headersResComponentesCuTarifa}
              cacheField="obtenerResComponentesCuTarifas"
              tituloTabla="CU y Tarifas"
              // Asume la existencia de un link de ejemplo para importación masiva
              linkEjemplo="https://example.com/import-xm-cprog.xlsx"
              manual={true} // Si quieres habilitar la carga manual
              masivo={true} // Si quieres habilitar la carga masiva
            />
          </div>
          <div className="overflow-x-auto">
            <TableAndt
              titulo="Datos CU y Tarifas"
              columns={headersResComponentesCuTarifa}
              cacheField="obtenerResComponentesCuTarifas"
              mutation={ELIMINAR_DATA_RES_COMPONENTES_CU_TARIFA }
              query={OBTENER_RES_COMPONENTES_CU_TARIFAS }
              actionMode = "delete"
              subMutation="eliminarData_res_componentes_cu_tarifa" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataXmCprog;
