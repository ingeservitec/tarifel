import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Table, Spin, Empty, Statistic, Row, Col, Checkbox, Button } from "antd";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { OBTENER_RES_COMPONENTES_CU_TARIFAS } from "../data";

const ComponenteGc = () => {
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

  // Estado para controlar visibilidad de variables
  const [visibleVars, setVisibleVars] = useState({
    Gc: true,
    Pc: true,
    Mc: true,
    Pb: true,
    Alfa: true,
    W1: true,
    W2: true,
    Qc: true,
    Aj: true
  });

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

  // Último dato disponible
  const latestData = useMemo(() => {
    return sortedRecords[sortedRecords.length - 1];
  }, [sortedRecords]);

  // Sub-variables de Gc con sus descripciones
  const subVariables = [
    { key: "gc", name: "Gc - Costo Generación", description: "Resultado final del componente", color: "#E53935" },
    { key: "qc", name: "Qc - Cantidad Compra", description: "Proporción de energía comprada", color: "#1E88E5" },
    { key: "pc", name: "Pc - Precio Compra", description: "Precio promedio de compra", color: "#43A047" },
    { key: "mc", name: "Mc - Margen Comercialización", description: "Margen sobre precio de bolsa", color: "#FB8C00" },
    { key: "pb", name: "Pb - Precio Bolsa", description: "Precio de bolsa nacional", color: "#8E24AA" },
    { key: "alfa", name: "Alfa - Factor", description: "Ponderador entre Pc y Mc", color: "#00ACC1" },
    { key: "w1", name: "W1 - Ponderador 1", description: "Peso contratos regulares", color: "#5E35B1" },
    { key: "w2", name: "W2 - Ponderador 2", description: "Peso contratos subsidiados", color: "#3949AB" },
    { key: "aj", name: "Aj - Ajuste", description: "Ajuste por desviaciones", color: "#F4511E" },
    { key: "ad", name: "Ad - Ajuste Desviaciones", description: "Ajuste acumulado por desviaciones", color: "#6D4C41" },
    { key: "max_g", name: "Max G - Máximo Generación", description: "Límite máximo de generación", color: "#C0CA33" },
    { key: "ref_g", name: "Ref G - Referencia", description: "Valor de referencia", color: "#7CB342" }
  ];

  // Datos para la tabla (ordenados del más reciente al más viejo)
  const tableData = useMemo(() => {
    return last12Months.map(record => ({
      key: `${record.anho}-${record.mes}`,
      periodo: `${record.mes}/${record.anho}`,
      gc: (record.gc || 0).toFixed(4),
      qc: (record.qc || 0).toFixed(4),
      pc: (record.pc || 0).toFixed(4),
      mc: (record.mc || 0).toFixed(4),
      pb: (record.pb || 0).toFixed(4),
      alfa: (record.alfa || 0).toFixed(4),
      w1: (record.w1 || 0).toFixed(4),
      w2: (record.w2 || 0).toFixed(4),
      aj: (record.aj || 0).toFixed(4),
      ad: (record.ad || 0).toFixed(4),
      max_g: (record.max_g || 0).toFixed(4),
      ref_g: (record.ref_g || 0).toFixed(4)
    })).reverse();
  }, [last12Months]);

  // Columnas de la tabla
  const columns = [
    {
      title: "Periodo",
      dataIndex: "periodo",
      key: "periodo",
      fixed: "left",
      width: 100
    },
    ...subVariables.map(v => ({
      title: v.name,
      dataIndex: v.key,
      key: v.key,
      width: 120,
      render: (text, record) => (
        <span style={{
          fontWeight: v.key === "gc" ? "bold" : "normal",
          color: v.key === "gc" ? "#E53935" : "inherit"
        }}>
          {text}
        </span>
      )
    }))
  ];

  // Datos para gráficos
  const chartData = useMemo(() => {
    return last12Months.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      Gc: record.gc || 0,
      Qc: record.qc || 0,
      Pc: record.pc || 0,
      Mc: record.mc || 0,
      Pb: record.pb || 0,
      Alfa: record.alfa || 0,
      W1: record.w1 || 0,
      W2: record.w2 || 0,
      Aj: record.aj || 0
    }));
  }, [last12Months]);

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
      {/* KPIs del último periodo */}
      {latestData && (
        <Row gutter={16} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Gc - Costo Generación (Último)"
                value={(latestData.gc || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#E53935', fontWeight: 'bold' }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                {latestData.mes}/{latestData.anho}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Pc - Precio Compra"
                value={(latestData.pc || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#43A047' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Qc - Cantidad Compra"
                value={(latestData.qc || 0).toFixed(4)}
                valueStyle={{ color: '#1E88E5' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Gráfico de evolución de Gc y componentes principales */}
      <Card title="Evolución de Gc y Componentes Principales (Últimos 12 Meses)" style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "16px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Button size="small" onClick={() => setVisibleVars({ Gc: true, Pc: true, Mc: true, Pb: true, Alfa: true, W1: true, W2: true, Qc: true, Aj: true })}>
            Seleccionar Todo
          </Button>
          <Button size="small" onClick={() => setVisibleVars({ Gc: false, Pc: false, Mc: false, Pb: false, Alfa: false, W1: false, W2: false, Qc: false, Aj: false })}>
            Deseleccionar Todo
          </Button>
          <Checkbox checked={visibleVars.Gc} onChange={(e) => setVisibleVars({...visibleVars, Gc: e.target.checked})}>
            <span style={{ color: "#E53935", fontWeight: "bold" }}>Gc</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Pc} onChange={(e) => setVisibleVars({...visibleVars, Pc: e.target.checked})}>
            <span style={{ color: "#43A047" }}>Pc</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Mc} onChange={(e) => setVisibleVars({...visibleVars, Mc: e.target.checked})}>
            <span style={{ color: "#FB8C00" }}>Mc</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Pb} onChange={(e) => setVisibleVars({...visibleVars, Pb: e.target.checked})}>
            <span style={{ color: "#8E24AA" }}>Pb</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Qc} onChange={(e) => setVisibleVars({...visibleVars, Qc: e.target.checked})}>
            <span style={{ color: "#1E88E5" }}>Qc</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Alfa} onChange={(e) => setVisibleVars({...visibleVars, Alfa: e.target.checked})}>
            <span style={{ color: "#00ACC1" }}>Alfa</span>
          </Checkbox>
          <Checkbox checked={visibleVars.W1} onChange={(e) => setVisibleVars({...visibleVars, W1: e.target.checked})}>
            <span style={{ color: "#5E35B1" }}>W1</span>
          </Checkbox>
          <Checkbox checked={visibleVars.W2} onChange={(e) => setVisibleVars({...visibleVars, W2: e.target.checked})}>
            <span style={{ color: "#3949AB" }}>W2</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Aj} onChange={(e) => setVisibleVars({...visibleVars, Aj: e.target.checked})}>
            <span style={{ color: "#F4511E" }}>Aj</span>
          </Checkbox>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="periodo"
              angle={-45}
              textAnchor="end"
              height={80}
              style={{ fontSize: "12px" }}
            />
            <YAxis label={{ value: '$/kWh', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => value.toFixed(4)} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            {visibleVars.Gc && <Line type="monotone" dataKey="Gc" stroke="#E53935" strokeWidth={3} name="Gc - Costo Generación" />}
            {visibleVars.Pc && <Line type="monotone" dataKey="Pc" stroke="#43A047" strokeWidth={2} name="Pc - Precio Compra" />}
            {visibleVars.Mc && <Line type="monotone" dataKey="Mc" stroke="#FB8C00" strokeWidth={2} name="Mc - Margen Comerc." />}
            {visibleVars.Pb && <Line type="monotone" dataKey="Pb" stroke="#8E24AA" strokeWidth={2} name="Pb - Precio Bolsa" />}
            {visibleVars.Qc && <Line type="monotone" dataKey="Qc" stroke="#1E88E5" strokeWidth={2} name="Qc - Cantidad Compra" />}
            {visibleVars.Alfa && <Line type="monotone" dataKey="Alfa" stroke="#00ACC1" strokeWidth={2} name="Alfa" />}
            {visibleVars.W1 && <Line type="monotone" dataKey="W1" stroke="#5E35B1" strokeWidth={2} name="W1" />}
            {visibleVars.W2 && <Line type="monotone" dataKey="W2" stroke="#3949AB" strokeWidth={2} name="W2" />}
            {visibleVars.Aj && <Line type="monotone" dataKey="Aj" stroke="#F4511E" strokeWidth={2} name="Aj" />}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Tabla detallada */}
      <Card title="Detalle de Sub-Variables de Gc (Últimos 12 Meses)">
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          scroll={{ x: 1500 }}
          size="small"
        />

        <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
          <strong>Fórmula:</strong>
          <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "13px" }}>
            Gc = W1 × Qc × (Alfa × Pc + (1 - Alfa) × Mc) + W2 × Qc × PcSub + Cg/Dcr + (1 - Qc - Qagd) × Pb + Aj
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponenteGc;
