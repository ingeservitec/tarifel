import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_XM_TRSM,
  NUEVO_DATA_XM_TRSM,
  ELIMINAR_DATA_XM_TRSM,
} from "../data";
import { headersData_xm_trsm } from "../headers/headersTables";

const Dataxmtrsm = () => {
  const headers = headersData_xm_trsm;


  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos xm trsm";


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
              mutation={NUEVO_DATA_XM_TRSM}
              subMutation="nuevoData_xm_trsm"
              inputFields={headers}
              cacheField="obtenerData_xm_trsm"
              tituloTabla="Agregar Datos xm trsm"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
            />
          </div>

          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerData_xm_trsm"
            mutation={ELIMINAR_DATA_XM_TRSM}
            subMutation="eliminarData_xm_trsm"
            query={OBTENER_DATA_XM_TRSM}
          />
        </div>
      </div>
    </div>
  );
};

export default Dataxmtrsm;
