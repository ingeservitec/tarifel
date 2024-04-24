import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import { OBTENER_DATA_MME_GIRO, ELIMINAR_DATA_MME_GIRO,NUEVO_DATA_MME_GIRO } from '../data';
import { headersDataMmeGiro } from '../headers/headersTables';


const Datammegiro = () => {
  const headers = headersDataMmeGiro;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "MME GIROS";


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
              mutation={NUEVO_DATA_MME_GIRO}
              subMutation="nuevoDataMmeGiro"
              inputFields={headers}
              cacheField="obtenerDataMmeGiro"
              tituloTabla="Agregar Datos Contrato Atipico de Compra de Energía"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerDataMmeGiro"
            mutation={ELIMINAR_DATA_MME_GIRO }
            query={OBTENER_DATA_MME_GIRO}
            actionMode = "delete"
            subMutation="eliminarDataMmeGiro" 
          />
        </div>
      </div>
    </div>
  );
};

export default Datammegiro;
