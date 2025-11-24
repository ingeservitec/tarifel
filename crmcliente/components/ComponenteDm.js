import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Table, Spin, Empty, Statistic, Row, Col, Checkbox, Button } from "antd";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { OBTENER_RES_COMPONENTES_CU_TARIFAS } from "../data";

const ComponenteDm = () => {
  // Estado para controlar visibilidad de variables
  const [visibleVars, setVisibleVars] = useState({
    DmTotal: true,
    DNT1: true,
    DNT2: true,
    DNT3: true,
    DNT4: true,
    CDI100: true
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

  // Sub-variables de Dm
  const subVariables = [
    { key: "dnt1", name: "D NT1 - Distribución NT1", description: "Resultado final", color: "#FF7043" },
    { key: "dnt2", name: "D NT2", description: "Costo distribución nivel 2", color: "#66BB6A" },
    { key: "dnt3", name: "D NT3", description: "Costo distribución nivel 3", color: "#AB47BC" },
    { key: "dnt4", name: "D NT4", description: "Costo distribución nivel 4", color: "#FFA726" },
    { key: "cdi_100", name: "CDI 100%", description: "Incentivo distribución 100%", color: "#26C6DA" },
    { key: "cdi_50", name: "CDI 50%", description: "Incentivo distribución 50%", color: "#EC407A" },
    { key: "cd2", name: "CD2", description: "Componente distribución NT2", color: "#7E57C2" },
    { key: "cd3", name: "CD3", description: "Componente distribución NT3", color: "#26A69A" },
    { key: "cd4", name: "CD4", description: "Componente distribución NT4", color: "#8D6E63" }
  ];

  const tableData = useMemo(() => {
    return last12Months.map(record => ({
      key: `${record.anho}-${record.mes}`,
      periodo: `${record.mes}/${record.anho}`,
      dnt1: (record.dnt1 || 0).toFixed(4),
      dnt2: (record.dnt2 || 0).toFixed(4),
      dnt3: (record.dnt3 || 0).toFixed(4),
      dnt4: (record.dnt4 || 0).toFixed(4),
      cdi_100: (record.cdi_100 || 0).toFixed(4),
      cdi_50: (record.cdi_50 || 0).toFixed(4),
      cd2: (record.cd2 || 0).toFixed(4),
      cd3: (record.cd3 || 0).toFixed(4),
      cd4: (record.cd4 || 0).toFixed(4)
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
      width: 120,
      render: (text) => (
        <span style={{
          fontWeight: v.key === "dnt1" ? "bold" : "normal",
          color: v.key === "dnt1" ? v.color : "inherit"
        }}>
          {text}
        </span>
      )
    }))
  ];

  const chartData = useMemo(() => {
    return last12Months.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      "D NT1": record.dnt1 || 0,
      "D NT2": record.dnt2 || 0,
      "D NT3": record.dnt3 || 0,
      "D NT4": record.dnt4 || 0,
      "CDI 100%": record.cdi_100 || 0
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
                title="D NT1 - Distribución (Último)"
                value={(latestData.dnt1 || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#FF7043', fontWeight: 'bold' }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                {latestData.mes}/{latestData.anho}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="D NT2"
                value={(latestData.dnt2 || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#66BB6A' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="CDI 100%"
                value={(latestData.cdi_100 || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#26C6DA' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card title="Evolución de Dm y Componentes (Últimos 12 Meses)" style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "16px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Button size="small" onClick={() => setVisibleVars({ DmTotal: true, DNT1: true, DNT2: true, DNT3: true, DNT4: true, CDI100: true })}>
            Seleccionar Todo
          </Button>
          <Button size="small" onClick={() => setVisibleVars({ DmTotal: false, DNT1: false, DNT2: false, DNT3: false, DNT4: false, CDI100: false })}>
            Deseleccionar Todo
          </Button>
          <Checkbox checked={visibleVars.DNT1} onChange={(e) => setVisibleVars({...visibleVars, DNT1: e.target.checked})}>
            <span style={{ color: "#FF7043", fontWeight: "bold" }}>D NT1</span>
          </Checkbox>
          <Checkbox checked={visibleVars.DNT2} onChange={(e) => setVisibleVars({...visibleVars, DNT2: e.target.checked})}>
            <span style={{ color: "#66BB6A" }}>D NT2</span>
          </Checkbox>
          <Checkbox checked={visibleVars.DNT3} onChange={(e) => setVisibleVars({...visibleVars, DNT3: e.target.checked})}>
            <span style={{ color: "#AB47BC" }}>D NT3</span>
          </Checkbox>
          <Checkbox checked={visibleVars.DNT4} onChange={(e) => setVisibleVars({...visibleVars, DNT4: e.target.checked})}>
            <span style={{ color: "#FFA726" }}>D NT4</span>
          </Checkbox>
          <Checkbox checked={visibleVars.CDI100} onChange={(e) => setVisibleVars({...visibleVars, CDI100: e.target.checked})}>
            <span style={{ color: "#26C6DA" }}>CDI 100%</span>
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
            {visibleVars.DNT1 && <Line type="monotone" dataKey="D NT1" stroke="#FF7043" strokeWidth={3} />}
            {visibleVars.DNT2 && <Line type="monotone" dataKey="D NT2" stroke="#66BB6A" strokeWidth={2} />}
            {visibleVars.DNT3 && <Line type="monotone" dataKey="D NT3" stroke="#AB47BC" strokeWidth={2} />}
            {visibleVars.DNT4 && <Line type="monotone" dataKey="D NT4" stroke="#FFA726" strokeWidth={2} />}
            {visibleVars.CDI100 && <Line type="monotone" dataKey="CDI 100%" stroke="#26C6DA" strokeWidth={2} />}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Detalle de Sub-Variables de Dm (Últimos 12 Meses)">
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          scroll={{ x: 1300 }}
          size="small"
        />

        <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
          <strong>Fórmula:</strong>
          <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "14px" }}>
            Dm NT1 = D NT1
          </div>
          <div style={{ marginTop: "12px", fontSize: "13px", color: "#666" }}>
            <strong>Fuente de datos:</strong> Data CREG y Data Empresa
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponenteDm;
