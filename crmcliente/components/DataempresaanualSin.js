import React, { useState } from "react";
import TableAndt from "./TableAndt";
import AddData from "./AddData";
import {
  OBTENER_DATA_EMPRESA_ANUAL ,
  NUEVO_DATA_EMPRESA_ANUAL,
  ELIMINAR_DATA_EMPRESA_ANUAL ,
} from "../data";
import { headersDataEmpresaAnual } from "../headers/headersTables";

const DataempresaanualSin = () => {
  const headers = headersDataEmpresaAnual;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const titulo = "Datos Anuales de la Empresa";


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
              mutation={NUEVO_DATA_EMPRESA_ANUAL}
              subMutation="nuevoDataEmpresaAnual"
              inputFields={headers}
              cacheField="obtenerDataEmpresaAnual"
              tituloTabla="Agregar Datos Empresa Anual"
              linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
            />
          </div>
          <TableAndt
            titulo={titulo}
            columns={headers}
            cacheField="obtenerDataEmpresaAnual"
            mutation={ELIMINAR_DATA_EMPRESA_ANUAL }
            query={OBTENER_DATA_EMPRESA_ANUAL }
          />
        </div>
      </div>
    </div>
  );
};

export default DataempresaanualSin;
