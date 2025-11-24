import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Table, Spin, Empty, Statistic, Row, Col, Checkbox, Button } from "antd";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { OBTENER_RES_COMPONENTES_CU_TARIFAS } from "../data";

const ComponenteCm = () => {
  // Estado para controlar visibilidad de variables
  const [visibleVars, setVisibleVars] = useState({
    Cv: true,
    COT: true,
    CvNT1: true,
    CvNT2: true,
    CvNT3: true,
    CvNT4: true
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

  // Sub-variables de Cm
  const subVariables = [
    { key: "cv", name: "Cv - Costo Comercialización", description: "Resultado final", color: "#66BB6A" },
    { key: "cot", name: "COT - Costo Opción Tarifaria", description: "Costo de opción tarifaria", color: "#FFA726" },
    { key: "cV_nt1", name: "Cv NT1", description: "Costo ventas nivel 1", color: "#AB47BC" },
    { key: "cV_nt2", name: "Cv NT2", description: "Costo ventas nivel 2", color: "#26C6DA" },
    { key: "cV_nt3", name: "Cv NT3", description: "Costo ventas nivel 3", color: "#EC407A" },
    { key: "cV_nt4", name: "Cv NT4", description: "Costo ventas nivel 4", color: "#7E57C2" }
  ];

  const tableData = useMemo(() => {
    return last12Months.map(record => ({
      key: `${record.anho}-${record.mes}`,
      periodo: `${record.mes}/${record.anho}`,
      cv: (record.cv || 0).toFixed(4),
      cot: (record.cot || 0).toFixed(4),
      cV_nt1: (record.cV_nt1 || 0).toFixed(4),
      cV_nt2: (record.cV_nt2 || 0).toFixed(4),
      cV_nt3: (record.cV_nt3 || 0).toFixed(4),
      cV_nt4: (record.cV_nt4 || 0).toFixed(4)
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
      width: 130,
      render: (text) => (
        <span style={{
          fontWeight: v.key === "cv" ? "bold" : "normal",
          color: v.key === "cv" ? v.color : "inherit"
        }}>
          {text}
        </span>
      )
    }))
  ];

  const chartData = useMemo(() => {
    return last12Months.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      "Cv": record.cv || 0,
      "COT": record.cot || 0,
      "Cv NT1": record.cV_nt1 || 0,
      "Cv NT2": record.cV_nt2 || 0,
      "Cv NT3": record.cV_nt3 || 0,
      "Cv NT4": record.cV_nt4 || 0
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
                title="Cv - Costo Comercialización (Último)"
                value={(latestData.cv || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#66BB6A', fontWeight: 'bold' }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                {latestData.mes}/{latestData.anho}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="COT - Costo Opción Tarifaria"
                value={(latestData.cot || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#FFA726' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Cv NT1"
                value={(latestData.cV_nt1 || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#AB47BC' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card title="Evolución de Cm y Componentes (Últimos 12 Meses)" style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "16px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Button size="small" onClick={() => setVisibleVars({ Cv: true, COT: true, CvNT1: true, CvNT2: true, CvNT3: true, CvNT4: true })}>
            Seleccionar Todo
          </Button>
          <Button size="small" onClick={() => setVisibleVars({ Cv: false, COT: false, CvNT1: false, CvNT2: false, CvNT3: false, CvNT4: false })}>
            Deseleccionar Todo
          </Button>
          <Checkbox checked={visibleVars.Cv} onChange={(e) => setVisibleVars({...visibleVars, Cv: e.target.checked})}>
            <span style={{ color: "#66BB6A", fontWeight: "bold" }}>Cv</span>
          </Checkbox>
          <Checkbox checked={visibleVars.COT} onChange={(e) => setVisibleVars({...visibleVars, COT: e.target.checked})}>
            <span style={{ color: "#FFA726" }}>COT</span>
          </Checkbox>
          <Checkbox checked={visibleVars.CvNT1} onChange={(e) => setVisibleVars({...visibleVars, CvNT1: e.target.checked})}>
            <span style={{ color: "#AB47BC" }}>Cv NT1</span>
          </Checkbox>
          <Checkbox checked={visibleVars.CvNT2} onChange={(e) => setVisibleVars({...visibleVars, CvNT2: e.target.checked})}>
            <span style={{ color: "#26C6DA" }}>Cv NT2</span>
          </Checkbox>
          <Checkbox checked={visibleVars.CvNT3} onChange={(e) => setVisibleVars({...visibleVars, CvNT3: e.target.checked})}>
            <span style={{ color: "#EC407A" }}>Cv NT3</span>
          </Checkbox>
          <Checkbox checked={visibleVars.CvNT4} onChange={(e) => setVisibleVars({...visibleVars, CvNT4: e.target.checked})}>
            <span style={{ color: "#7E57C2" }}>Cv NT4</span>
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
            {visibleVars.Cv && <Line type="monotone" dataKey="Cv" stroke="#66BB6A" strokeWidth={3} />}
            {visibleVars.COT && <Line type="monotone" dataKey="COT" stroke="#FFA726" strokeWidth={2} />}
            {visibleVars.CvNT1 && <Line type="monotone" dataKey="Cv NT1" stroke="#AB47BC" strokeWidth={2} />}
            {visibleVars.CvNT2 && <Line type="monotone" dataKey="Cv NT2" stroke="#26C6DA" strokeWidth={2} />}
            {visibleVars.CvNT3 && <Line type="monotone" dataKey="Cv NT3" stroke="#EC407A" strokeWidth={2} />}
            {visibleVars.CvNT4 && <Line type="monotone" dataKey="Cv NT4" stroke="#7E57C2" strokeWidth={2} />}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Detalle de Sub-Variables de Cm (Últimos 12 Meses)">
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          scroll={{ x: 1000 }}
          size="small"
        />

        <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
          <strong>Fórmula:</strong>
          <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "14px" }}>
            Cm = Cv + COT
          </div>
          <div style={{ marginTop: "12px", fontSize: "13px", color: "#666" }}>
            <strong>Fuente de datos:</strong> Data CREG
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponenteCm;
