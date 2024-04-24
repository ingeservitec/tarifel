import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TableAndt from '../components/TableAndt';
import AddData from '../components/AddData';
import {
  OBTENER_DATA_BANREPUBLICA_TCO,
  NUEVO_DATA_BANREPUBLICA_TCO,
  ELIMINAR_DATA_BANREPUBLICA_TCO
} from '../data';
import { headersDataBanrepublicaTco }  from '../headers/headersTables';

const DataBanrepublicaTcoPage = () => {

    const headers = headersDataBanrepublicaTco;

    const [showModal, setShowModal] = useState(false);
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
   

    const titulo = "Datos del Banco de la República - TCO";


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
                mutation={NUEVO_DATA_BANREPUBLICA_TCO}
                subMutation="nuevoDataBanrepublicaTco"
                inputFields={headers}
                cacheField="obtenerDataBanrepublicaTco"
                tituloTabla="Agregar Datos Contrato Atipico de Compra de Energía"
                linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
              />
            </div>
            <TableAndt
              titulo={titulo}
              columns={headers}
              cacheField="obtenerDataBanrepublicaTco"
              mutation={ELIMINAR_DATA_BANREPUBLICA_TCO }
              query={OBTENER_DATA_BANREPUBLICA_TCO }
              actionMode = "delete"
              subMutation="eliminarDataBanrepublicaTco" 
            />
          </div>
        </div>
      </div>
    );
};

export default DataBanrepublicaTcoPage;
