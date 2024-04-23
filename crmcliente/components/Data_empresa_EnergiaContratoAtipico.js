import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import { OBTENER_DATA_EMPRESA_ENERGIA_CONTRATO_ATIPICO, ELIMINAR_DATA_EMPRESA_ENERGIA_CONTRATO_ATIPICO,NUEVO_DATA_EMPRESA_ENERGIA_CONTRATO_ATIPICO } from '../data';
import { headersDataEmpresaEnergiaContratoAtipico } from '../headers/headersTables';


const DataempresaanualSin = () => {
  const headers = headersDataEmpresaEnergiaContratoAtipico;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos Contrato Atipico de Compra de Energía";


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
              mutation={NUEVO_DATA_EMPRESA_ENERGIA_CONTRATO_ATIPICO}
              subMutation="nuevoDataEmpresaEnergiaContratoAtipico"
              inputFields={headers}
              cacheField="obtenerDataEmpresaEnergiaContratoAtipico"
              tituloTabla="Agregar Datos Contrato Atipico de Compra de Energía"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerDataEmpresaEnergiaContratoAtipico"
            mutation={ELIMINAR_DATA_EMPRESA_ENERGIA_CONTRATO_ATIPICO }
            query={OBTENER_DATA_EMPRESA_ENERGIA_CONTRATO_ATIPICO }
            actionMode = "delete"
            subMutation="eliminarDataEmpresaEnergiaContratoAtipico" 
          />
        </div>
      </div>
    </div>
  );
};

export default DataempresaanualSin;
