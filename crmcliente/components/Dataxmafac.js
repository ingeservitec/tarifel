import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_XM_AFAC,
  NUEVO_DATA_XM_AFAC,
  ELIMINAR_DATA_XM_AFAC,
} from "../data";
import { headersData_xm_afac } from "../headers/headersTables";

const Dataxmafac = () => {
  const headers = headersData_xm_afac;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const titulo = "Datos xm afac";

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
              mutation={NUEVO_DATA_XM_AFAC}
              subMutation="nuevoData_xm_afac"
              inputFields={headers}
              cacheField="obtenerData_xm_afac"
              tituloTabla="Agregar Datos xm afac"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
              manual={false}
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerData_xm_afac"
            mutation={ELIMINAR_DATA_XM_AFAC}
            subMutation="eliminarData_xm_afac"
            query={OBTENER_DATA_XM_AFAC}
          />
        </div>
      </div>
    </div>
  );
};

export default Dataxmafac;
