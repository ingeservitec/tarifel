import { gql, useQuery, useMutation } from "@apollo/client";
import React, { PureComponent, useEffect, useState, useMemo } from "react";
import useFullPageLoader from "../hooks/useFullPageLoader";
import Paginacion from "./DataTable/Paginacion";
import Search from "./DataTable/Search";
import "bootstrap/dist/css/bootstrap.css";
import TableHeader from "./DataTable/TableHeader";
import "font-awesome/css/font-awesome.min.css";
import NuevoData_xm_stn from "./NuevoData_xm_stn";
import NuevoData_xm_stn2 from "./NuevoData_xm_stn2";
import { headersData_xm_stn } from "../headers/headersTables.js";
import AddData from "./AddData.js";
import Swal from "sweetalert2";
import {
  OBTENER_USUARIO,
  OBTENER_RES_COMPONENTES_CU_TARIFA,
  ELIMINAR_DATAXMSTN,
  OBTENER_DATAXMSTN,
  NUEVO_DATA_XM_STN,
} from "../data";

const Dataxmstn = () => {
  const { data, error, loading } = useQuery(OBTENER_DATAXMSTN);
  const {
    data: data1,
    error: error1,
    loading: loading1,
  } = useQuery(OBTENER_USUARIO);
  const {
    data: data2,
    error: error2,
    loading: loading2,
  } = useQuery(OBTENER_RES_COMPONENTES_CU_TARIFA);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [comments, setComments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showLogin2, setShowLogin2] = useState(false);
  const [id1, setId1] = useState(0);
  const headers = headersData_xm_stn;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [eliminarDataxmstn] = useMutation(ELIMINAR_DATAXMSTN, {
    update(cache) {
      const { obtenerDataxmstn } = cache.readQuery({
        query: OBTENER_DATAXMSTN,
      });
      cache.writeQuery({
        query: OBTENER_DATAXMSTN,
        data: {
          obtenerDataxmstn: obtenerDataxmstn.filter(
            (obtenerDataxmstn) => obtenerobtenerDataxmstn.id !== id1.toString()
          ),
        },
      });
    },
  });

  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    if (loading) return "Cargando....";
    const data_xm_stn = data.obtenerDataxmstn;
    var data_xm_stnm = data_xm_stn.filter(
      (data_xm_stn) => data_xm_stn.empresa_id === data1.obtenerUsuario.empresa
    );
    data_xm_stnm = data_xm_stnm.sort(function (a, b) {
      if (a.anho === b.anho) {
        return b.mes > a.mes ? 1 : -1;
      }
      return b.anho > a.anho ? 1 : -1;
    });
    setComments(data_xm_stnm);
  }, [loading, showLogin2]);

  const commentsData = useMemo(() => {
    let computedComments = comments;
    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          // comment.anho.toLowerCase().includes(search.toLowerCase()) ||
          // comment.mes.toLowerCase().includes(search.toLowerCase())
          comment.anho.toString() + "-" + comment.mes.toString() === search ||
          comment.anho.toString() === search ||
          comment.mes.toString() === search
      );
    }
    setTotalItems(computedComments.length);
    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      // console.log(computedComments)
      computedComments = computedComments.sort(
        (a, b) =>
          // reversed * a[sorting.field].localeCompare(b[sorting.field])
          parseInt(reversed * a[sorting.field]) - parseInt(b[sorting.field])
      );
    }
    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);
  const confirmarEliminarRegistro = (eliminarDataxmstnId) => {
    setId1(eliminarDataxmstnId);
    const data_xm_stn = data.obtenerDataxmstn;
    var data_xm_stn_eliminar = data_xm_stn.filter(
      (data_xm_stn) =>
        data_xm_stn.empresa_id === data1.obtenerUsuario.empresa &&
        data_xm_stn.id === eliminarDataxmstnId
    );
    const mes = data_xm_stn_eliminar[0].mes;
    const anho = data_xm_stn_eliminar[0].anho;
    var mesm = mes;
    var anhom = anho;

    const data_res_componentes_cu_tarifa =
      data2.obtenerRes_componentes_cu_tarifa;
    var data_res_componentes_cu_tarifaesp =
      data_res_componentes_cu_tarifa.filter(
        (data_res_componentes_cu_tarifa) =>
          data_res_componentes_cu_tarifa.empresa_id ===
            data1.obtenerUsuario.empresa &&
          data_res_componentes_cu_tarifa.anho === anhom &&
          data_res_componentes_cu_tarifa.mes === mesm
      );

    if (data_res_componentes_cu_tarifaesp.length === 0) {
      Swal.fire({
        title: "¿Deseas eliminar a este registro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "No, Cancelar",
      }).then(async (result) => {
        if (result.value) {
          try {
            const data1 = await eliminarDataxmstn({
              variables: {
                eliminarDataxmstnId,
              },
            });
            Swal.fire("Eliminado", data1.eliminar, "success");
          } catch (error) {
            console.log(error);
          }
        }
      });
    } else {
      Swal.fire({
        title: `Proceso no exitoso`,
        text: `No se puede eliminar este registro por que ya fue utilizado en el calculo del CU de ${mesm}-${anhom}, contacte al administrador si desea continuar `,
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Salir",
      });
    }
  };

  return (
    <div className="container p-0">
      <div className="card col-sm ">
        <div className="card-header h6">
          <dt>INSUMOSDATAXMSTN</dt>
        </div>
        <div className="card-body shadow ">
          <div className="card-body shadow">
            <div className="overflow-x-scroll">
              <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                  <div className="row"></div>
                  <div className="col-md-6">
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
                        mutation={NUEVO_DATA_XM_STN}
                        subMutation="nuevoData_xm_stn"
                        inputFields={headers}
                        cacheField="obtenerData_xm_stn"
                        tituloTabla="Agregar Datos xm stn"
                        linkEjemplo="https://storage.googleapis.com/coool-files/ModelosImportacion/Importar%20datos%20a%20tabla%20data_empresa_mes_glp.xlsx"
                      />
                    </div>
                    <Paginacion
                      total={totalItems}
                      itemsPerPage={ITEMS_PER_PAGE}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                    <div className="col-md-6 d-flex flex-row m-2">
                      <Search
                        onSearch={(value) => {
                          setSearch(value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                  <table className="table table-striped table-hover">
                    <TableHeader
                      headers={headers}
                      onSorting={(field, order) => setSorting({ field, order })}
                    />
                    <tbody>
                      {commentsData.map((comment) => (
                        <tr key={comment.id}>
                          <th scope="row">{comment.id}</th>
                          <td>
                            <button
                              className="bg-yellow-400 w-20 text-white hover:cursor-pointer hover:bg-red-900 rounded"
                              onClick={() =>
                                confirmarEliminarRegistro(comment.id)
                              }
                            >
                              Eliminar
                            </button>
                          </td>
                          <td>{comment.creador}</td>
                          <td>{comment.empresa_id}</td>
                          <td>{comment.anho}</td>
                          <td>{comment.mes}</td>
                          <td>{comment.t_cop_kwh}</td>
                          <td>{comment.t_prima_cop_kwh}</td>
                          <td>{comment.Energia_sin_kwh}</td>
                          <td>{comment.Ing_Reg_Bruto_T_cop}</td>
                          <td>{comment.Ing_Compensar_T_cop}</td>
                          <td>{comment.Ing_Reg_Neto_T_cop}</td>
                          <td>{comment.delta_t_cop_kwh}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dataxmstn;
