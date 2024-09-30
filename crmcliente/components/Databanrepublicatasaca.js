import React, { useState } from 'react';

import TableAndt from '../components/TableAndt';
import AddData from '../components/AddData';
import {
  OBTENER_DATA_BANREPUBLICA_TCAP,
  NUEVO_DATA_BANREPUBLICA_TCAP,
  ELIMINAR_DATA_BANREPUBLICA_TCAP
} from '../data';
import { headersDataBanrepublicaTcap }  from '../headers/headersTables';

const DataBanrepublicaTcoPage = () => {

    const headers = headersDataBanrepublicaTcap;

    const [showModal, setShowModal] = useState(false);
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
   

    const titulo = "Datos del Banco de la República - TCAP";


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
                mutation={NUEVO_DATA_BANREPUBLICA_TCAP}
                subMutation="nuevoDataBanrepublicaTcap"
                inputFields={headers}
                cacheField="obtenerDataBanrepublicaTcap"
                tituloTabla="Agregar Datos Contrato Atipico de Compra de Energía"
                linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
              />
            </div>
            <TableAndt
              titulo={titulo}
              columns={headers}
              cacheField="obtenerDataBanrepublicaTcap"
              mutation={ELIMINAR_DATA_BANREPUBLICA_TCAP }
              query={OBTENER_DATA_BANREPUBLICA_TCAP }
              actionMode = "delete"
              subMutation="eliminarDataBanrepublicaTcap" 
            />
          </div>
        </div>
      </div>
    );
};

export default DataBanrepublicaTcoPage;
