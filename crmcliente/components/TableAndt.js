import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  Table,
  Spin,
  Alert,
  Popconfirm,
  Button,
  Input,
  Pagination,
  Space,
  Modal,
  Progress,
} from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import XLSX from "xlsx";
import { useRouter } from "next/router";
import JSZip from "jszip";
import { utils } from "xlsx";
import { writeFile } from "xlsx";

const TableAndt = ({
  columns,
  query,
  cacheField,
  mutation,
  subMutation,
  detailRoute,
  actionMode = "delete", // Nueva prop para controlar el modo de acción (puede ser 'delete' o 'relate')
  taskId, // Añadir taskId como prop
  idInput, // Añadir idInput como prop
  queryPdfZip = query,
  exportarAZip = false,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortParams, setSortParams] = useState({ order: null, field: null });
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const debouncedSearchText = useDebounce(searchText, 1000); // Agregamos un debounce de 500ms

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const { data, loading, error, refetch } = useQuery(query, {
    variables: {
      options: {
        searchText: debouncedSearchText,
        page: currentPage,
        limit: pageSize,
        sortOrder: sortParams.order,
        sortField: sortParams.field,
        searchOptions: columns
          .filter((c) => c.search)
          .map((c) => ({ field: c.field, type: c.type, search: c.search })),
        exportarTodos: false,
        ...(idInput && { idInput: idInput }), // Añadir idInput a las variables si existe
      },
    },
    // skip: !idInput, // Saltar la consulta si no hay idInput
  });

  // useLazyQuery para la exportación
  const [
    getExportData,
    { called: exportCalled, loading: exportLoading, data: exportData },
  ] = useLazyQuery(query, {
    variables: {
      options: {
        searchText: debouncedSearchText,

        sortOrder: sortParams.order,
        sortField: sortParams.field,
        searchOptions: columns
          .filter((c) => c.search)
          .map((c) => ({ field: c.field, type: c.type, search: c.search })),
        exportarTodos: true,
      },
    },
  });
  const [
    obtenerDatosParaExportar,
    { loading: loadingExportacion, data: dataExportacion },
  ] = useLazyQuery(queryPdfZip);

  useEffect(() => {
    refetch({
      searchText: debouncedSearchText,
      page: currentPage,
      limit: pageSize,
      sortOrder: sortParams.order,
      sortField: sortParams.field,
    });
  }, [searchText, currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  var deleteData;
  if (mutation) {
    [deleteData] = useMutation(mutation, {
      update(cache, { data: mutationResponse }) {
        if (actionMode === "delete") {
          // Suponiendo que mutationResponse.eliminarDataempresamessin contiene los IDs de los elementos eliminados
          const deletedIds = mutationResponse[subMutation];
          
          cache.modify({
            fields: {
              [cacheField](existingFieldData = {}, { readField }) {
                // Asumiendo que existingFieldData contiene una propiedad `records` que es un arreglo
                const existingItems = existingFieldData.records || [];
                
                // Filtrar para remover los ítems borrados
                const newItems = existingItems.filter(
                  (itemRef) => !deletedIds.includes(readField("id", itemRef).toString())
                );
                
                // Devolver el objeto actualizado con los items filtrados
                return { ...existingFieldData, records: newItems };
              },
            },
          });
        } else if (actionMode === "relate") {
          // No se requiere ninguna acción para actualizar el caché por ahora
        }
        setSelectedRows([]);
      },
    });
  }
  

  const router = useRouter();

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  async function deleteSelectedRows(recordIdsToDelete) {
    const idsToDelete = recordIdsToDelete || selectedRows.map((row) => row.id);

    try {
      if (actionMode === "delete") {
        await deleteData({
          variables: {
            eliminarDataId: idsToDelete,
          },
        });
        setSelectedRows([]);
        Swal.fire("Eliminado", "Los registros han sido eliminados", "success");
      } else if (actionMode === "relate") {
        // Lógica para relacionar los registros seleccionados

        await deleteData({
          variables: {
            actividadId: taskId,
            movimientoId: idsToDelete,
          },
        });

        Swal.fire(
          "Relacionado",
          "Los registros han sido relacionados",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  }

  // Función para manejar la exportación a Excel
  const handleExportToExcel = async () => {
    try {
      setIsExporting(true); // Establecer la bandera antes de iniciar la exportación
      await getExportData();
    } catch (error) {
      console.error("Error al exportar a Excel: ", error);
      Swal.fire("Error", "No se pudo exportar a Excel", "error");
    }
  };

  const obtenerNombreArchivoConFecha = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, "0");
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // +1 porque los meses comienzan en 0
    const anio = fechaActual.getFullYear();
    const horas = fechaActual.getHours().toString().padStart(2, "0");
    const minutos = fechaActual.getMinutes().toString().padStart(2, "0");
    const segundos = fechaActual.getSeconds().toString().padStart(2, "0");

    return `Datos_Exportados_${dia}_${mes}_${anio}_${horas}_${minutos}_${segundos}.xlsx`;
  };

  useEffect(() => {
    if (exportData && !exportLoading && exportCalled && isExporting) {
      // Proceso de exportación a Excel aquí
      if (!exportData[cacheField]) {
        console.error("exportData[cacheField] is undefined");
        return;
      }
      const ws = utils.json_to_sheet(exportData[cacheField].records);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Datos");
      writeFile(wb, obtenerNombreArchivoConFecha()); // Utiliza la función aquí
      setIsExporting(false); // Restablecer la bandera después de la exportación
    }
  }, [exportData, exportLoading, exportCalled, isExporting]);

  if (loading) return <Spin tip="Cargando..." />;
  if (error)
    return <Alert message="Error en la carga de datos" type="error" showIcon />;

  const tableData = data && data[cacheField] ? data[cacheField].records : [];
  const totalElementos =
    data && data[cacheField] ? data[cacheField].totalRecords : 0; // Reemplaza con tu lógica para obtener el número total de registros

  const adaptedColumns = columns
    .filter((column) => column.showInTable)
    .map((column) => {
      let columnConfig = {
        title: column.name,
        dataIndex: column.field,
        key: column.field,
        sorter: false, // Deshabilita el ordenamiento en el frontend
      };
      if (column.sortable) {
        // Si la columna es ordenable, muestra el botón de ordenamiento
        columnConfig.sorter = true;
      }

      // Agrega el render para la columna de tipo "html"
      if (column.subtype === "html") {
        columnConfig.render = (text) => (
          <div dangerouslySetInnerHTML={{ __html: text }} />
        );
      }

      if (column.field === "Eliminar") {
        columnConfig.render = (_, record) => (
          <Popconfirm
            title="¿Deseas eliminar este registro?"
            onConfirm={() => deleteSelectedRows([record.id])}
            okText="Sí"
            cancelText="No"
          >
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={(event) => event.stopPropagation()}
            />
          </Popconfirm>
        );
      }

      return columnConfig;
    });

  const handleTableChange = (pagination, filters, sorter) => {
    setSortParams({
      order: sorter.order,
      field: sorter.field,
    });

    // Aquí es donde podrías llamar a tu consulta de GraphQL o función para obtener datos
    // Refetch con los nuevos filtros aplicados
    // Llama a la función refetch con los nuevos parámetros de ordenación
    refetch({
      searchText: debouncedSearchText,
      page: currentPage,
      limit: pageSize,
      sortOrder: sorter.order,
      sortField: sorter.field,
    });
  };

  function base64StringToBlob(base64String, contentType) {
    const sliceSize = 1024;

    const byteCharacters = atob(base64String); // Decodifica una cadena de datos que ha sido codificada usando la codificación en base-64
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }

      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }

    return new Blob(byteArrays, { type: contentType }); // Crea un objeto Blob a partir de un array de bytes
  }

  const downloadPDFsAsZip = async () => {
    setIsDownloading(true);
    setShowProgressModal(true);

    const zip = new JSZip();
    var indiceActual = 0;
    var hayMasRegistros = true;
    const totalArchivos = totalElementos;
    let archivosDescargados = 0;
    const tamanhoLote = 100; // Ajusta según tus necesidades
    while (hayMasRegistros) {
      const { data, errors } = await obtenerDatosParaExportar({
        variables: {
          options: {
            searchText: debouncedSearchText,
            page: indiceActual,
            limit: tamanhoLote,
            sortOrder: sortParams.order,
            sortField: sortParams.field,
            searchOptions: columns
              .filter((c) => c.search)
              .map((c) => ({ field: c.field, type: c.type, search: c.search })),
            exportarTodosPdf: true,
          },
        },
      });

      if (errors) {
        throw new Error(errors.map((e) => e.message).join("; "));
      }

      const registros = data.obtenerCRMFacturasPDFZIP; // Ajusta según tu estructura de datos

      registros.forEach((registro) => {
        const contenidoBlob = base64StringToBlob(
          registro.contenido,
          "application/pdf"
        );
        zip.file(registro.nombre, contenidoBlob);
      });

      archivosDescargados += registros.length;
      hayMasRegistros = registros.length === tamanhoLote;
      indiceActual += tamanhoLote;

      const progresoActual = Math.round(
        (archivosDescargados / totalArchivos) * 100
      );
      setProgress(progresoActual);
    }

    zip
      .generateAsync({ type: "blob" })
      .then((blob) => {
        saveAs(blob, "archivosPDF.zip");
        setIsDownloading(false);
        setShowProgressModal(false);
      })
      .catch((error) => {
        console.error("Error al generar el ZIP: ", error);
        Swal.fire("Error", "No se pudo generar el archivo ZIP", "error");
        setIsDownloading(false);
        setShowProgressModal(false);
      });
  };

  return (
    <div>
      <Space>
        {selectedRows.length > 0 && (
          <Button
            onClick={() => deleteSelectedRows()}
            className={`bg-${
              actionMode === "delete" ? "red" : "blue"
            }-300 hover:bg-${
              actionMode === "delete" ? "red" : "blue"
            }-500 text-white rounded  `}
          >
            <span className="inline-flex items-center justify-center">
              <DeleteOutlined />
              <span className="ml-2">
                {" "}
                {actionMode === "delete"
                  ? "Eliminar registros seleccionados"
                  : "Relacionar Gasto"}
              </span>
            </span>
          </Button>
        )}

        <Button
          onClick={handleExportToExcel}
          className="bg-blue-300 hover:bg-blue-500 text-white rounded my-1"
        >
          <span className="inline-flex items-center justify-center">
            <DownloadOutlined />
            <span className="ml-2">Exportar a Excel</span>
          </span>
        </Button>
        {exportarAZip && (
          <Button
            onClick={downloadPDFsAsZip}
            disabled={loadingExportacion || isDownloading}
          >
            {isDownloading ? "Descargando..." : "Descargar PDFs como ZIP"}
          </Button>
        )}
      </Space>
      <Input
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        refix={<SearchOutlined />}
        className="py-2 px-4 rounded my-2"
      />

      <Table
        className="py-2 my-2"
        rowKey="id"
        rowSelection={rowSelection}
        dataSource={tableData}
        columns={adaptedColumns}
        onRow={(record) => ({
          onClick: () => {
            if (detailRoute) {
              router.push(`${detailRoute}/${record.id}`);
            }
          },
          style: { cursor: "pointer" },
        })}
        pagination={false}
        onChange={handleTableChange}
      />

      <div className="flex items-center justify-between py-2">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          total={totalElementos}
          showSizeChanger
          pageSizeOptions={["5", "10", "20", "30", "50"]}
          className="rounded"
        />
        <span className="text-sm text-gray-600">
          Total de elementos: {totalElementos}
        </span>
      </div>
      <Modal
        title="Progreso de la operación"
        visible={showProgressModal}
        footer={null}
        closable={false}
      >
        <div>
          <h3>Progreso de la operación:</h3>
          <p>Descargando archivos PDF...</p>
          <Progress percent={progress} status="active" />
        </div>
      </Modal>
    </div>
  );
};

export default TableAndt;
