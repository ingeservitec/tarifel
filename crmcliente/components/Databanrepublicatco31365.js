// Componente para gestionar datos de Banco de la República - TCO 31-365 días
// Creado para manejar específicamente tasa_cred_com_odinario_31_365 y monto_cred_com_odinario_31_365
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import TableAndt from "../components/TableAndt";
import AddData from "../components/AddData";
import {
  OBTENER_DATA_BANREPUBLICA_TCO,
  NUEVO_DATA_BANREPUBLICA_TCO_31_365,
  ELIMINAR_DATA_BANREPUBLICA_TCO,
} from "../data";

// Headers específicos para los campos 31-365 días
const headersTco31365 = [
  { name: "Id", field: "id", sortable: false },
  {
    name: "Eliminar",
    field: "eliminar",
    search: false,
    sortable: true,
    location: "center",
    showInTable: true,
  },
  { 
    name: "anho_semana",
    field: "anho_semana",
    sortable: true,
    required: true,
    location: "center",
    showInForm: true,
    showInTable: true,
    clase: "input",
    type: "text",
    description: "Año y semana del registro"
  },
  {
    name: "tasa_cred_com_odinario_31_365",
    field: "tasa_cred_com_odinario_31_365",
    sortable: true,
    required: true,
    location: "center",
    showInForm: true,
    showInTable: true,
    clase: "input",
    type: "number",
    description: "Tasa de crédito comercial ordinario 31-365 días"
  },
  {
    name: "monto_cred_com_odinario_31_365",
    field: "monto_cred_com_odinario_31_365",
    sortable: true,
    required: true,
    location: "center",
    showInForm: true,
    showInTable: true,
    clase: "input",
    type: "number",
    description: "Monto del crédito comercial ordinario 31-365 días"
  },
  {
    name: "empresa_id",
    field: "empresa_id",
    sortable: true,
    required: true,
    location: "center",
    showInForm: false,
    showInTable: false,
    clase: "input",
    type: "text",
    description: "Identificador de la empresa asociada"
  }
];

const DataBanrepublicaTco31365Page = () => {
  const headers = headersTco31365;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const titulo = "Datos del Banco de la República - TCO 31-365 días";

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
              mutation={NUEVO_DATA_BANREPUBLICA_TCO_31_365}
              subMutation="nuevoDataBanrepublicaTco31365"
              inputFields={headers}
              cacheField="obtenerDataBanrepublicaTco"
              tituloTabla="Agregar Datos Crédito Comercial Ordinario 31-365 días"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_banrepublica_tco_31_365.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerDataBanrepublicaTco"
            mutation={ELIMINAR_DATA_BANREPUBLICA_TCO}
            query={OBTENER_DATA_BANREPUBLICA_TCO}
            actionMode="delete"
            subMutation="eliminarDataBanrepublicaTco"
          />
        </div>
      </div>
    </div>
  );
};

export default DataBanrepublicaTco31365Page; 