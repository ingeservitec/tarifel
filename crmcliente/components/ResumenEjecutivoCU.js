import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Card, Row, Col, Select, Spin, Empty, Checkbox, Space, Button } from "antd";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ComposedChart
} from "recharts";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { OBTENER_RES_COMPONENTES_CU_TARIFAS } from "../data";

const { Option } = Select;

const ResumenEjecutivoCU = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [chartType, setChartType] = useState("line"); // line, bar, area

  // Estados para controlar visibilidad de series
  const [visibleSeries, setVisibleSeries] = useState({
    CU: true,
    Gc: true,
    Tm: true,
    Rm: true,
    Pr_NT1: true,
    Dm_NT1_100: true,
    Cm: true
  });

  // Query para obtener datos históricos (últimos 18 meses para comparaciones)
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

  // Procesar datos
  const records = data?.obtenerResComponentesCuTarifas?.records || [];

  // Ordenar datos por fecha (más antiguos primero para gráficos)
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      if (a.anho !== b.anho) return a.anho - b.anho;
      return a.mes - b.mes;
    });
  }, [records]);

  // Obtener últimos 12 meses para gráficos de tendencia
  const last12Months = useMemo(() => {
    return sortedRecords.slice(-12);
  }, [sortedRecords]);


  // Datos para gráfico de evolución de componentes
  const componentesEvolucion = useMemo(() => {
    return last12Months.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      mes: record.mes,
      anho: record.anho,
      CU: record.cu_nt1_100 || 0,
      Gc: record.gc || 0,
      Tm: record.tx || 0,
      Rm: record.r || 0,
      Pr_NT1: record.pr_nt1 || 0,
      Dm_NT1_100: record.dnt1 || 0,
      Cm: record.mc || 0
    }));
  }, [last12Months]);

  // Configuración de series con colores mejorados
  const seriesConfig = [
    { key: "CU", name: "CU Total", color: "#E53935", strokeWidth: 3 },           // Rojo brillante
    { key: "Gc", name: "Gc (Generación)", color: "#1E88E5", strokeWidth: 2 },    // Azul brillante
    { key: "Tm", name: "Tm (Transmisión)", color: "#FFA726", strokeWidth: 2 },   // Naranja brillante
    { key: "Rm", name: "Rm (Restricciones)", color: "#AB47BC", strokeWidth: 2 }, // Morado brillante
    { key: "Pr_NT1", name: "Pr NT1 (Pérdidas)", color: "#EC407A", strokeWidth: 2 }, // Rosa fuerte
    { key: "Dm_NT1_100", name: "Dm NT1 100 (Distribución)", color: "#FF7043", strokeWidth: 2 }, // Coral
    { key: "Cm", name: "Cm (Comercialización)", color: "#66BB6A", strokeWidth: 2 } // Verde brillante
  ];

  // Función para cambiar visibilidad de una serie
  const toggleSeries = (key) => {
    setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Función para seleccionar todo
  const selectAll = () => {
    const allVisible = {};
    Object.keys(visibleSeries).forEach(key => {
      allVisible[key] = true;
    });
    setVisibleSeries(allVisible);
  };

  // Función para deseleccionar todo
  const deselectAll = () => {
    const allHidden = {};
    Object.keys(visibleSeries).forEach(key => {
      allHidden[key] = false;
    });
    setVisibleSeries(allHidden);
  };

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
        <Empty
          description={
            <span>
              Error al cargar los datos: {error.message}
            </span>
          }
        />
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

  // Renderizar el gráfico según el tipo seleccionado
  const renderChart = () => {
    const ChartComponent = chartType === "line" ? LineChart : chartType === "bar" ? BarChart : AreaChart;
    const DataComponent = chartType === "line" ? Line : chartType === "bar" ? Bar : Area;

    return (
      <ResponsiveContainer width="100%" height={450}>
        <ChartComponent data={componentesEvolucion}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="periodo"
            angle={-45}
            textAnchor="end"
            height={80}
            style={{ fontSize: "12px" }}
          />
          <YAxis
            label={{ value: '$/kWh', angle: -90, position: 'insideLeft' }}
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            formatter={(value) => value.toFixed(2)}
            contentStyle={{ fontSize: "12px" }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />

          {seriesConfig.map(series => (
            visibleSeries[series.key] && (
              <DataComponent
                key={series.key}
                type="monotone"
                dataKey={series.key}
                stroke={series.color}
                fill={chartType === "area" ? series.color : undefined}
                fillOpacity={chartType === "area" ? 0.6 : undefined}
                strokeWidth={series.strokeWidth}
                name={series.name}
              />
            )
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Controles superiores */}
      <Card style={{ marginBottom: "20px" }} bodyStyle={{ padding: "16px" }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={6} lg={4}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Año:</label>
            <Select
              value={selectedYear}
              onChange={setSelectedYear}
              style={{ width: "100%" }}
            >
              {availableYears.map(year => (
                <Option key={year} value={year}>{year}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={6} lg={5}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Mes:</label>
            <Select
              value={selectedMonth}
              onChange={setSelectedMonth}
              style={{ width: "100%" }}
            >
              {availableMonths.map(month => (
                <Option key={month} value={month}>{monthNames[month - 1]}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={6} lg={5}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Tipo de Gráfico:</label>
            <Select
              value={chartType}
              onChange={setChartType}
              style={{ width: "100%" }}
            >
              <Option value="line">Líneas</Option>
              <Option value="bar">Barras</Option>
              <Option value="area">Área</Option>
            </Select>
          </Col>
          <Col xs={24} md={6} lg={10}>
            <div style={{ textAlign: "right", color: "#666", marginTop: "28px" }}>
              <small>Periodo: {monthNames[selectedMonth - 1]} {selectedYear}</small>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Controles de visibilidad de series */}
      <Card
        title="Componentes Visibles"
        style={{ marginBottom: "20px" }}
        bodyStyle={{ padding: "16px" }}
        extra={
          <Space>
            <Button
              size="small"
              icon={<CheckOutlined />}
              onClick={selectAll}
            >
              Seleccionar Todo
            </Button>
            <Button
              size="small"
              icon={<CloseOutlined />}
              onClick={deselectAll}
            >
              Deseleccionar Todo
            </Button>
          </Space>
        }
      >
        <Space wrap size="middle">
          {seriesConfig.map(series => (
            <Checkbox
              key={series.key}
              checked={visibleSeries[series.key]}
              onChange={() => toggleSeries(series.key)}
            >
              <span style={{
                color: series.color,
                fontWeight: series.key === "CU" ? "bold" : "normal"
              }}>
                {series.name}
              </span>
            </Checkbox>
          ))}
        </Space>
      </Card>

      {/* Gráfico Principal */}
      <Card title="Evolución de Componentes del CU (Últimos 12 Meses)">
        {renderChart()}
      </Card>
    </div>
  );
};

export default ResumenEjecutivoCU;
