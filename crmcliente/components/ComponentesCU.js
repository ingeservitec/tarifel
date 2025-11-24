import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Row, Col, Select, Spin, Empty, Table, Button, Space } from "antd";
import { TableOutlined, HeatMapOutlined } from "@ant-design/icons";
import { OBTENER_RES_COMPONENTES_CU_TARIFAS } from "../data";

const { Option } = Select;

const ComponentesCU = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [viewMode, setViewMode] = useState("table"); // "table" o "heatmap"

  // Query para obtener datos
  const { data, loading, error } = useQuery(OBTENER_RES_COMPONENTES_CU_TARIFAS, {
    variables: {
      options: {
        page: 1,
        limit: 500,
        searchText: "",
        searchOptions: [],
        exportarTodos: true,
        sortOrder: "DESC",
        sortField: "anho"
      }
    },
    fetchPolicy: "cache-and-network"
  });

  const records = data?.obtenerResComponentesCuTarifas?.records || [];

  // Ordenar datos por fecha
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      if (a.anho !== b.anho) return a.anho - b.anho;
      return a.mes - b.mes;
    });
  }, [records]);

  // Últimos 12 meses
  const last12Months = useMemo(() => {
    return sortedRecords.slice(-12);
  }, [sortedRecords]);

  // Calcular porcentajes de participación de cada componente sobre el CU
  const participacionData = useMemo(() => {
    return last12Months.map(record => {
      const cu = record.cu_nt1_100 || 0;
      if (cu === 0) return null;

      return {
        periodo: `${record.mes}/${record.anho}`,
        mes: record.mes,
        anho: record.anho,
        CU: cu,
        Gc_pct: ((record.gc || 0) / cu) * 100,
        Tm_pct: ((record.tx || 0) / cu) * 100,
        Rm_pct: ((record.r || 0) / cu) * 100,
        Pr_NT1_pct: ((record.pr_nt1 || 0) / cu) * 100,
        Dm_NT1_100_pct: ((record.dnt1 || 0) / cu) * 100,
        Cm_pct: ((record.mc || 0) / cu) * 100,
        // Valores absolutos para referencia
        Gc: record.gc || 0,
        Tm: record.tx || 0,
        Rm: record.r || 0,
        Pr_NT1: record.pr_nt1 || 0,
        Dm_NT1_100: record.dnt1 || 0,
        Cm: record.mc || 0
      };
    }).filter(item => item !== null);
  }, [last12Months]);

  // Configuración de componentes para la tabla de porcentajes
  const componentesConfig = [
    { key: "Gc", name: "Gc (Generación)", color: "#1E88E5" },
    { key: "Tm", name: "Tm (Transmisión)", color: "#FFA726" },
    { key: "Rm", name: "Rm (Restricciones)", color: "#AB47BC" },
    { key: "Pr_NT1", name: "Pr NT1 (Pérdidas)", color: "#EC407A" },
    { key: "Dm_NT1_100", name: "Dm NT1 100 (Distribución)", color: "#FF7043" },
    { key: "Cm", name: "Cm (Comercialización)", color: "#66BB6A" }
  ];

  // Función para obtener color según porcentaje
  const getColorForPercentage = (pct) => {
    // Escala de colores: Azul (bajo) -> Amarillo (medio) -> Rojo (alto)
    if (pct < 10) return "#E3F2FD"; // Azul muy claro
    if (pct < 20) return "#90CAF9"; // Azul claro
    if (pct < 30) return "#42A5F5"; // Azul
    if (pct < 40) return "#FFF9C4"; // Amarillo muy claro
    if (pct < 50) return "#FFF59D"; // Amarillo claro
    if (pct < 60) return "#FFEB3B"; // Amarillo
    if (pct < 70) return "#FFD54F"; // Amarillo oscuro
    if (pct < 80) return "#FFB74D"; // Naranja claro
    if (pct < 90) return "#FF9800"; // Naranja
    return "#F44336"; // Rojo
  };

  // Columnas para tabla de porcentajes
  const participacionColumns = [
    {
      title: "Periodo",
      dataIndex: "periodo",
      key: "periodo",
      fixed: "left",
      width: 100,
      render: (text) => <strong>{text}</strong>
    },
    ...componentesConfig.map(comp => ({
      title: comp.name,
      dataIndex: `${comp.key}_pct`,
      key: `${comp.key}_pct`,
      align: "center",
      width: 120,
      render: (value) => (
        <div
          style={{
            backgroundColor: viewMode === "heatmap" ? getColorForPercentage(value) : "transparent",
            padding: "8px",
            borderRadius: "4px",
            fontWeight: viewMode === "heatmap" ? "bold" : "normal",
            color: viewMode === "heatmap" && value > 60 ? "#fff" : "#000"
          }}
        >
          {value.toFixed(2)}%
        </div>
      )
    }))
  ];

  // Años y meses disponibles
  const availableYears = useMemo(() => {
    const years = [...new Set(records.map(r => r.anho))];
    return years.sort((a, b) => b - a);
  }, [records]);

  const availableMonths = useMemo(() => {
    const monthsInYear = records
      .filter(r => r.anho === selectedYear)
      .map(r => r.mes);
    return [...new Set(monthsInYear)].sort((a, b) => a - b);
  }, [records, selectedYear]);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" tip="Cargando datos..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <Empty description={`Error al cargar los datos: ${error.message}`} />
      </Card>
    );
  }

  if (!records || records.length === 0) {
    return (
      <Card>
        <Empty description="No hay datos disponibles. Por favor, calcule primero el CU desde la página principal." />
      </Card>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Controles */}
      <Card style={{ marginBottom: "20px" }} bodyStyle={{ padding: "16px" }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={6}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              Modo de Visualización:
            </label>
            <Space>
              <Button
                type={viewMode === "table" ? "primary" : "default"}
                icon={<TableOutlined />}
                onClick={() => setViewMode("table")}
              >
                Tabla
              </Button>
              <Button
                type={viewMode === "heatmap" ? "primary" : "default"}
                icon={<HeatMapOutlined />}
                onClick={() => setViewMode("heatmap")}
              >
                Mapa de Calor
              </Button>
            </Space>
          </Col>
          <Col xs={24} md={18}>
            <div style={{ textAlign: "right", color: "#666", marginTop: "28px" }}>
              <small>
                {viewMode === "heatmap"
                  ? "Colores: Azul (menor participación) → Amarillo → Rojo (mayor participación)"
                  : "Porcentajes de participación de cada componente sobre el CU Total"}
              </small>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Tabla de Participación */}
      <Card title="Evolución del Porcentaje de Participación de Componentes sobre el CU (Últimos 12 Meses)">
        <Table
          dataSource={participacionData}
          columns={participacionColumns}
          pagination={false}
          scroll={{ x: 800 }}
          size="small"
        />

        {/* Leyenda del mapa de calor */}
        {viewMode === "heatmap" && (
          <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
            <strong>Escala de Colores:</strong>
            <div style={{ display: "flex", alignItems: "center", marginTop: "10px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "30px", height: "20px", backgroundColor: "#E3F2FD", border: "1px solid #ccc", marginRight: "8px" }}></div>
                <span>0-10%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "30px", height: "20px", backgroundColor: "#42A5F5", border: "1px solid #ccc", marginRight: "8px" }}></div>
                <span>20-30%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "30px", height: "20px", backgroundColor: "#FFF9C4", border: "1px solid #ccc", marginRight: "8px" }}></div>
                <span>30-40%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "30px", height: "20px", backgroundColor: "#FFEB3B", border: "1px solid #ccc", marginRight: "8px" }}></div>
                <span>50-60%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "30px", height: "20px", backgroundColor: "#FFB74D", border: "1px solid #ccc", marginRight: "8px" }}></div>
                <span>70-80%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "30px", height: "20px", backgroundColor: "#F44336", border: "1px solid #ccc", marginRight: "8px" }}></div>
                <span>90-100%</span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ComponentesCU;
