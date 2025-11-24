import React, { useState, useMemo } from "react";
import { Modal, Tabs, Table, Button, Tag, Space } from "antd";
import {
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import moment from "moment";

const { TabPane } = Tabs;

const LogsModal = ({
  visible,
  onClose,
  registrosExitosos,
  registrosErrores,
  moduloNombre,
}) => {
  const [activeTab, setActiveTab] = useState("1");

  // Generar columnas dinámicamente basándose en los datos
  const generateColumns = (data, includeError = false) => {
    if (!data || data.length === 0) return [];

    const columns = [];

    // Primera columna: #Fila
    columns.push({
      title: "#Fila",
      dataIndex: "_numeroFila",
      key: "_numeroFila",
      width: 80,
      fixed: "left",
      sorter: (a, b) => (a._numeroFila || 0) - (b._numeroFila || 0),
    });

    // Si incluye errores, agregar columnas de mensaje y tipo al inicio
    if (includeError) {
      columns.push({
        title: "Tipo",
        dataIndex: "tipo",
        key: "tipo",
        width: 100,
        fixed: "left",
        render: (tipo) => (
          <Tag color={tipo === "error" ? "red" : "orange"}>
            {tipo?.toUpperCase()}
          </Tag>
        ),
      });

      columns.push({
        title: "Mensaje Error",
        dataIndex: "mensaje",
        key: "mensaje",
        width: 300,
        fixed: "left",
        ellipsis: true,
      });
    }

    // Obtener todas las claves únicas de los registros
    const allKeys = new Set();
    data.forEach((record) => {
      Object.keys(record).forEach((key) => {
        // Excluir campos internos o ya procesados
        if (
          key !== "mensaje" &&
          key !== "tipo" &&
          key !== "_numeroFila" &&
          key !== "__typename"
        ) {
          allKeys.add(key);
        }
      });
    });

    // Crear columnas para cada clave
    Array.from(allKeys).forEach((key) => {
      columns.push({
        title: key,
        dataIndex: key,
        key: key,
        width: 150,
        ellipsis: true,
        render: (value) => {
          if (value === null || value === undefined) return "-";
          if (typeof value === "object") return JSON.stringify(value);
          return String(value);
        },
      });
    });

    return columns;
  };

  const columnasExitosos = useMemo(
    () => generateColumns(registrosExitosos, false),
    [registrosExitosos]
  );

  const columnasErrores = useMemo(
    () => generateColumns(registrosErrores, true),
    [registrosErrores]
  );

  // Función para descargar Excel
  const handleDescargarExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Preparar datos para Excel (mantener todas las columnas incluyendo #Fila)
    const datosExitosos = registrosExitosos.map((registro) => {
      const nuevoRegistro = { "#Fila": registro._numeroFila };
      Object.keys(registro).forEach((key) => {
        if (key !== "_numeroFila" && key !== "__typename") {
          nuevoRegistro[key] = registro[key];
        }
      });
      return nuevoRegistro;
    });

    const datosErrores = registrosErrores.map((registro) => {
      const nuevoRegistro = {
        "#Fila": registro._numeroFila,
        Tipo: registro.tipo,
        "Mensaje Error": registro.mensaje,
      };
      Object.keys(registro).forEach((key) => {
        if (
          key !== "_numeroFila" &&
          key !== "tipo" &&
          key !== "mensaje" &&
          key !== "__typename"
        ) {
          nuevoRegistro[key] = registro[key];
        }
      });
      return nuevoRegistro;
    });

    // Crear hojas
    const worksheet1 = XLSX.utils.json_to_sheet(datosExitosos);
    const worksheet2 = XLSX.utils.json_to_sheet(datosErrores);

    XLSX.utils.book_append_sheet(workbook, worksheet1, "Registros Exitosos");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Registros con Errores");

    // Generar nombre del archivo con formato: Módulo_Log_Fecha_Hora.xlsx
    const fechaFormateada = moment().format("YYYY-MM-DD");
    const horaFormateada = moment().format("HH-mm-ss");
    const nombreArchivo = `${moduloNombre}_Log_${fechaFormateada}_${horaFormateada}.xlsx`;

    XLSX.writeFile(workbook, nombreArchivo);
  };

  const totalRegistros = registrosExitosos.length + registrosErrores.length;
  const porcentajeExito =
    totalRegistros > 0
      ? ((registrosExitosos.length / totalRegistros) * 100).toFixed(2)
      : 0;

  return (
    <Modal
      title={
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>
          Resultado de Carga Masiva - {moduloNombre}
        </div>
      }
      open={visible}
      onCancel={onClose}
      width="90%"
      style={{ top: 20 }}
      footer={[
        <Button
          key="download"
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDescargarExcel}
          style={{ marginRight: 8 }}
        >
          Descargar Excel
        </Button>,
        <Button key="close" onClick={onClose}>
          Cerrar
        </Button>,
      ]}
    >
      {/* Estadísticas */}
      <div
        style={{
          marginBottom: 16,
          padding: "12px 16px",
          background: "#f5f5f5",
          borderRadius: 4,
        }}
      >
        <Space size="large">
          <span>
            <strong>Total Procesados:</strong> {totalRegistros}
          </span>
          <span>
            <CheckCircleOutlined style={{ color: "#52c41a" }} />{" "}
            <strong>Exitosos:</strong> {registrosExitosos.length}
          </span>
          <span>
            <CloseCircleOutlined style={{ color: "#ff4d4f" }} />{" "}
            <strong>Errores:</strong> {registrosErrores.length}
          </span>
          <span>
            <strong>Porcentaje de Éxito:</strong> {porcentajeExito}%
          </span>
        </Space>
      </div>

      {/* Tabs con tablas */}
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span>
              <CheckCircleOutlined />
              Registros Exitosos ({registrosExitosos.length})
            </span>
          }
          key="1"
        >
          <Table
            columns={columnasExitosos}
            dataSource={registrosExitosos}
            rowKey={(record, index) => `exitoso-${index}`}
            scroll={{ x: "max-content", y: 400 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100", "500"],
              showTotal: (total) => `Total ${total} registros`,
            }}
            size="small"
            bordered
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <CloseCircleOutlined />
              Registros con Errores ({registrosErrores.length})
            </span>
          }
          key="2"
        >
          <Table
            columns={columnasErrores}
            dataSource={registrosErrores}
            rowKey={(record, index) => `error-${index}`}
            scroll={{ x: "max-content", y: 400 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100", "500"],
              showTotal: (total) => `Total ${total} registros`,
            }}
            size="small"
            bordered
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default LogsModal;
