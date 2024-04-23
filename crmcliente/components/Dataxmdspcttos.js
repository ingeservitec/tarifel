import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_XM_DSPCTTO,
  NUEVO_DATA_XM_DSPCTTO,
  ELIMINAR_DATA_XM_DSPCTTO,
} from "../data";
import { headersData_xm_dspctto } from "../headers/headersTables";

const Dataxmdspctto = () => {
  const headers = headersData_xm_dspctto;
  const { data, error, loading } = useQuery(OBTENER_DATA_XM_DSPCTTO);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos xm dspctto";
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
              mutation={NUEVO_DATA_XM_DSPCTTO}
              subMutation="nuevoData_xm_dspctto"
              inputFields={headers}
              cacheField="obtenerData_xm_dspctto"
              tituloTabla="Agregar Datos xm dspctto"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
              manual={true}
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            data={data?.obtenerData_xm_dspctto}
            loading={loading}
            cacheField="obtenerData_xm_dspctto"
            mutation={ELIMINAR_DATA_XM_DSPCTTO}
            query={OBTENER_DATA_XM_DSPCTTO}
          />
        </div>
      </div>
    </div>
  );
};

export default Dataxmdspctto;
