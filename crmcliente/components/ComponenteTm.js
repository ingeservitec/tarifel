import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Table, Spin, Empty, Statistic, Row, Col, Checkbox, Button } from "antd";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { OBTENER_RES_COMPONENTES_CU_TARIFAS } from "../data";

const ComponenteTm = () => {
  // Estado para controlar visibilidad de variables
  const [visibleVars, setVisibleVars] = useState({
    TmTotal: true,
    DeltaT: true,
    TPrima: true
  });

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

  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      if (a.anho !== b.anho) return a.anho - b.anho;
      return a.mes - b.mes;
    });
  }, [records]);

  const last12Months = useMemo(() => {
    return sortedRecords.slice(-12);
  }, [sortedRecords]);

  const latestData = useMemo(() => {
    return sortedRecords[sortedRecords.length - 1];
  }, [sortedRecords]);

  // Sub-variables de Tm
  const subVariables = [
    { key: "tx", name: "Tm (Tx) - Transmisión Total", description: "Resultado final", color: "#FFA726" },
    { key: "delta_t", name: "Delta T", description: "Componente variable de transmisión", color: "#42A5F5" },
    { key: "t_prima", name: "T Prima", description: "Componente fijo de transmisión", color: "#66BB6A" }
  ];

  const tableData = useMemo(() => {
    return last12Months.map(record => ({
      key: `${record.anho}-${record.mes}`,
      periodo: `${record.mes}/${record.anho}`,
      tx: (record.tx || 0).toFixed(4),
      delta_t: (record.delta_t || 0).toFixed(4),
      t_prima: (record.t_prima || 0).toFixed(4)
    })).reverse();
  }, [last12Months]);

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
      width: 150,
      render: (text) => (
        <span style={{
          fontWeight: v.key === "tx" ? "bold" : "normal",
          color: v.key === "tx" ? v.color : "inherit"
        }}>
          {text}
        </span>
      )
    }))
  ];

  const chartData = useMemo(() => {
    return last12Months.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      "Tm Total": record.tx || 0,
      "Delta T": record.delta_t || 0,
      "T Prima": record.t_prima || 0
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
        <Empty description="No hay datos disponibles." />
      </Card>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {latestData && (
        <Row gutter={16} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Tm - Transmisión Total (Último)"
                value={(latestData.tx || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#FFA726', fontWeight: 'bold' }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                {latestData.mes}/{latestData.anho}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Delta T"
                value={(latestData.delta_t || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#42A5F5' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="T Prima"
                value={(latestData.t_prima || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#66BB6A' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card title="Evolución de Tm y Componentes (Últimos 12 Meses)" style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "16px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Button size="small" onClick={() => setVisibleVars({ TmTotal: true, DeltaT: true, TPrima: true })}>
            Seleccionar Todo
          </Button>
          <Button size="small" onClick={() => setVisibleVars({ TmTotal: false, DeltaT: false, TPrima: false })}>
            Deseleccionar Todo
          </Button>
          <Checkbox checked={visibleVars.TmTotal} onChange={(e) => setVisibleVars({...visibleVars, TmTotal: e.target.checked})}>
            <span style={{ color: "#FFA726", fontWeight: "bold" }}>Tm Total</span>
          </Checkbox>
          <Checkbox checked={visibleVars.DeltaT} onChange={(e) => setVisibleVars({...visibleVars, DeltaT: e.target.checked})}>
            <span style={{ color: "#42A5F5" }}>Delta T</span>
          </Checkbox>
          <Checkbox checked={visibleVars.TPrima} onChange={(e) => setVisibleVars({...visibleVars, TPrima: e.target.checked})}>
            <span style={{ color: "#66BB6A" }}>T Prima</span>
          </Checkbox>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
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
            {visibleVars.DeltaT && <Bar dataKey="Delta T" fill="#42A5F5" stackId="a" />}
            {visibleVars.TPrima && <Bar dataKey="T Prima" fill="#66BB6A" stackId="a" />}
            {visibleVars.TmTotal && <Line type="monotone" dataKey="Tm Total" stroke="#FFA726" strokeWidth={3} />}
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Detalle de Sub-Variables de Tm (Últimos 12 Meses)">
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          scroll={{ x: 500 }}
          size="small"
        />

        <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
          <strong>Fórmula:</strong>
          <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "14px" }}>
            Tm (Tx) = Delta T + T Prima
          </div>
          <div style={{ marginTop: "12px", fontSize: "13px", color: "#666" }}>
            <strong>Fuente de datos:</strong> Data XM STN (Sistema de Transmisión Nacional)
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponenteTm;
