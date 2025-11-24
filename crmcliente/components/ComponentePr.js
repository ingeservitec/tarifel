import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Table, Spin, Empty, Statistic, Row, Col, Checkbox, Button } from "antd";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { OBTENER_RES_COMPONENTES_CU_TARIFAS } from "../data";

const ComponentePr = () => {
  // Estado para controlar visibilidad de variables
  const [visibleVars, setVisibleVars] = useState({
    PrNT1: true,
    IPRSTN: true,
    IPRM1: true,
    CargoCprog: true
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

  // Sub-variables de Pr
  const subVariables = [
    { key: "pr_nt1", name: "Pr NT1 - Pérdidas Total", description: "Resultado final NT1", color: "#EC407A" },
    { key: "iprstn", name: "IPR STN", description: "Índice pérdidas STN", color: "#42A5F5" },
    { key: "data_xm_iprm1", name: "IPR M1", description: "Índice pérdidas mercado 1", color: "#66BB6A" },
    { key: "data_xm_iprm2", name: "IPR M2", description: "Índice pérdidas mercado 2", color: "#FFA726" },
    { key: "data_xm_iprm3", name: "IPR M3", description: "Índice pérdidas mercado 3", color: "#AB47BC" },
    { key: "data_xm_iprm4", name: "IPR M4", description: "Índice pérdidas mercado 4", color: "#26C6DA" },
    { key: "cargo_cprog", name: "Cargo Cprog", description: "Cargo por pérdidas progresivas", color: "#7E57C2" },
    { key: "pr_nt2", name: "Pr NT2", description: "Pérdidas nivel 2", color: "#26A69A" },
    { key: "pr_nt3", name: "Pr NT3", description: "Pérdidas nivel 3", color: "#8D6E63" },
    { key: "pr_nt4", name: "Pr NT4", description: "Pérdidas nivel 4", color: "#5E35B1" }
  ];

  const tableData = useMemo(() => {
    return last12Months.map(record => ({
      key: `${record.anho}-${record.mes}`,
      periodo: `${record.mes}/${record.anho}`,
      pr_nt1: (record.pr_nt1 || 0).toFixed(4),
      iprstn: (record.iprstn || 0).toFixed(4),
      data_xm_iprm1: (record.data_xm_iprm1 || 0).toFixed(4),
      data_xm_iprm2: (record.data_xm_iprm2 || 0).toFixed(4),
      data_xm_iprm3: (record.data_xm_iprm3 || 0).toFixed(4),
      data_xm_iprm4: (record.data_xm_iprm4 || 0).toFixed(4),
      cargo_cprog: (record.cargo_cprog || 0).toFixed(4),
      pr_nt2: (record.pr_nt2 || 0).toFixed(4),
      pr_nt3: (record.pr_nt3 || 0).toFixed(4),
      pr_nt4: (record.pr_nt4 || 0).toFixed(4)
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
          fontWeight: v.key === "pr_nt1" ? "bold" : "normal",
          color: v.key === "pr_nt1" ? v.color : "inherit"
        }}>
          {text}
        </span>
      )
    }))
  ];

  const chartData = useMemo(() => {
    return last12Months.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      "Pr NT1": record.pr_nt1 || 0,
      "IPR STN": record.iprstn || 0,
      "IPR M1": record.data_xm_iprm1 || 0,
      "IPR M2": record.data_xm_iprm2 || 0,
      "IPR M3": record.data_xm_iprm3 || 0,
      "IPR M4": record.data_xm_iprm4 || 0,
      "Cargo Cprog": record.cargo_cprog || 0
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
                title="Pr NT1 - Pérdidas (Último)"
                value={(latestData.pr_nt1 || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#EC407A', fontWeight: 'bold' }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                {latestData.mes}/{latestData.anho}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="IPR STN"
                value={(latestData.iprstn || 0).toFixed(4)}
                valueStyle={{ color: '#42A5F5' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Cargo Cprog"
                value={(latestData.cargo_cprog || 0).toFixed(4)}
                suffix="$/kWh"
                valueStyle={{ color: '#7E57C2' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card title="Evolución de Pr y Componentes (Últimos 12 Meses)" style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "16px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Button size="small" onClick={() => setVisibleVars({ PrNT1: true, IPRSTN: true, IPRM1: true, CargoCprog: true })}>
            Seleccionar Todo
          </Button>
          <Button size="small" onClick={() => setVisibleVars({ PrNT1: false, IPRSTN: false, IPRM1: false, CargoCprog: false })}>
            Deseleccionar Todo
          </Button>
          <Checkbox checked={visibleVars.PrNT1} onChange={(e) => setVisibleVars({...visibleVars, PrNT1: e.target.checked})}>
            <span style={{ color: "#EC407A", fontWeight: "bold" }}>Pr NT1</span>
          </Checkbox>
          <Checkbox checked={visibleVars.IPRSTN} onChange={(e) => setVisibleVars({...visibleVars, IPRSTN: e.target.checked})}>
            <span style={{ color: "#42A5F5" }}>IPR STN</span>
          </Checkbox>
          <Checkbox checked={visibleVars.IPRM1} onChange={(e) => setVisibleVars({...visibleVars, IPRM1: e.target.checked})}>
            <span style={{ color: "#66BB6A" }}>IPR M1</span>
          </Checkbox>
          <Checkbox checked={visibleVars.CargoCprog} onChange={(e) => setVisibleVars({...visibleVars, CargoCprog: e.target.checked})}>
            <span style={{ color: "#7E57C2" }}>Cargo Cprog</span>
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
            {visibleVars.PrNT1 && <Line type="monotone" dataKey="Pr NT1" stroke="#EC407A" strokeWidth={3} />}
            {visibleVars.IPRSTN && <Line type="monotone" dataKey="IPR STN" stroke="#42A5F5" strokeWidth={2} />}
            {visibleVars.IPRM1 && <Line type="monotone" dataKey="IPR M1" stroke="#66BB6A" strokeWidth={2} />}
            {visibleVars.CargoCprog && <Line type="monotone" dataKey="Cargo Cprog" stroke="#7E57C2" strokeWidth={2} />}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Detalle de Sub-Variables de Pr (Últimos 12 Meses)">
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          scroll={{ x: 1400 }}
          size="small"
        />

        <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
          <strong>Fórmula:</strong>
          <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "14px" }}>
            Pr NT1 = (IPR STN + IPR M1) × (Gc + Tm + Rm) + Cargo Cprog
          </div>
          <div style={{ marginTop: "12px", fontSize: "13px", color: "#666" }}>
            <strong>Fuente de datos:</strong> Data XM IPR (Índices de Pérdidas Reconocidas)
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponentePr;
