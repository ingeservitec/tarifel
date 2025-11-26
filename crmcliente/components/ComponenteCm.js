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
    CAst: true,
    CvR: true,
    Cfm: true,
    Cfs: true,
    Cfe: true,
    RC: true,
    COT: true
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

  // Sub-variables de Cv (Componente de Comercialización)
  const subVariables = [
    { key: "cv", name: "Cv - Comercialización", description: "Resultado final", color: "#66BB6A" },
    { key: "c_ast", name: "C* - C Asterisco", description: "Componente variable base", color: "#E53935" },
    { key: "cvr", name: "CvR - Cv Regulado", description: "Costo variable regulado", color: "#1E88E5" },
    { key: "cfm", name: "Cfm - Comp. Fijo", description: "Componente fijo", color: "#FFA726" },
    { key: "cfs", name: "Cfs - Costo Fin. Sub", description: "Costo financiero subsidiado", color: "#AB47BC" },
    { key: "cfe", name: "Cfe - Costo Fin. Esp", description: "Costo financiero especial", color: "#26C6DA" },
    { key: "rc", name: "RC - Riesgo Cartera", description: "Riesgo de cartera", color: "#EC407A" },
    { key: "cer", name: "CER", description: "Certificado energía renovable", color: "#7E57C2" },
    { key: "cgcu", name: "CGCU - Pagos CND/LAC", description: "Pagos CND, LAC, SIC", color: "#26A69A" },
    { key: "cot", name: "COT - Opción Tarifaria", description: "Costo opción tarifaria", color: "#8D6E63" },
    { key: "r1", name: "R1 - Tasa 1", description: "Tasa de referencia 1", color: "#5E35B1" },
    { key: "r2", name: "R2 - Tasa 2", description: "Tasa de referencia 2", color: "#00ACC1" },
    { key: "sub1", name: "Sub1", description: "Subsidio componente 1", color: "#43A047" },
    { key: "sub2", name: "Sub2", description: "Subsidio componente 2", color: "#FB8C00" },
    { key: "n_sub1", name: "N Sub1", description: "Días subsidio 1", color: "#F4511E" },
    { key: "m_sub2", name: "M Sub2", description: "Días subsidio 2", color: "#6D4C41" },
    { key: "facturacion_t", name: "Facturación T", description: "Facturación trimestre", color: "#78909C" }
  ];

  const tableData = useMemo(() => {
    return last12Months.map(record => ({
      key: `${record.anho}-${record.mes}`,
      periodo: `${record.mes}/${record.anho}`,
      cv: (record.cv || 0).toFixed(4),
      c_ast: (record.c_ast || 0).toFixed(4),
      cvr: (record.cvr || 0).toFixed(4),
      cfm: (record.cfm || 0).toFixed(2),
      cfs: (record.cfs || 0).toFixed(6),
      cfe: (record.cfe || 0).toFixed(6),
      rc: (record.rc || 0).toFixed(4),
      cer: (record.cer || 0).toFixed(0),
      cgcu: (record.cgcu || 0).toFixed(0),
      cot: (record.cot || 0).toFixed(4),
      r1: (record.r1 || 0).toFixed(6),
      r2: (record.r2 || 0).toFixed(6),
      sub1: (record.sub1 || 0).toFixed(0),
      sub2: (record.sub2 || 0).toFixed(0),
      n_sub1: (record.n_sub1 || 0).toFixed(2),
      m_sub2: (record.m_sub2 || 0).toFixed(2),
      facturacion_t: (record.facturacion_t || 0).toFixed(0)
    })).reverse();
  }, [last12Months]);

  const columns = [
    {
      title: "Periodo",
      dataIndex: "periodo",
      key: "periodo",
      fixed: "left",
      width: 90
    },
    ...subVariables.map(v => ({
      title: v.name,
      dataIndex: v.key,
      key: v.key,
      width: 120,
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
      "C*": record.c_ast || 0,
      "CvR": record.cvr || 0,
      "Cfm": record.cfm || 0,
      "Cfs": record.cfs || 0,
      "Cfe": record.cfe || 0,
      "RC": record.rc || 0,
      "COT": record.cot || 0
    }));
  }, [last12Months]);

  const selectAll = () => setVisibleVars({
    Cv: true, CAst: true, CvR: true, Cfm: true, Cfs: true, Cfe: true, RC: true, COT: true
  });

  const deselectAll = () => setVisibleVars({
    Cv: false, CAst: false, CvR: false, Cfm: false, Cfs: false, Cfe: false, RC: false, COT: false
  });

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
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Cv - Comercialización (Último)"
                value={(latestData.cv || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#66BB6A', fontWeight: 'bold' }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                {latestData.mes}/{latestData.anho}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="C* - C Asterisco"
                value={(latestData.c_ast || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#E53935' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="CvR - Cv Regulado"
                value={(latestData.cvr || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#1E88E5' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Cfm - Componente Fijo"
                value={(latestData.cfm || 0).toFixed(2)}
                suffix="$/factura"
                valueStyle={{ color: '#FFA726' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {latestData && (
        <Row gutter={16} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={6}>
            <Card size="small">
              <Statistic
                title="CGCU (Pagos CND/LAC/SIC)"
                value={(latestData.cgcu || 0).toLocaleString()}
                suffix="$"
                valueStyle={{ color: '#26A69A', fontSize: '16px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card size="small">
              <Statistic
                title="CER"
                value={(latestData.cer || 0).toLocaleString()}
                suffix="$"
                valueStyle={{ color: '#7E57C2', fontSize: '16px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card size="small">
              <Statistic
                title="Sub1 (Superávit/Déficit)"
                value={(latestData.sub1 || 0).toLocaleString()}
                suffix="$"
                valueStyle={{ color: '#43A047', fontSize: '16px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card size="small">
              <Statistic
                title="Facturación T"
                value={(latestData.facturacion_t || 0).toLocaleString()}
                suffix="$"
                valueStyle={{ color: '#78909C', fontSize: '16px' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card title="Evolución de Cv y Componentes (Últimos 12 Meses)" style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "16px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <Button size="small" onClick={selectAll}>Seleccionar Todo</Button>
          <Button size="small" onClick={deselectAll}>Deseleccionar Todo</Button>
          <Checkbox checked={visibleVars.Cv} onChange={(e) => setVisibleVars({...visibleVars, Cv: e.target.checked})}>
            <span style={{ color: "#66BB6A", fontWeight: "bold" }}>Cv</span>
          </Checkbox>
          <Checkbox checked={visibleVars.CAst} onChange={(e) => setVisibleVars({...visibleVars, CAst: e.target.checked})}>
            <span style={{ color: "#E53935" }}>C*</span>
          </Checkbox>
          <Checkbox checked={visibleVars.CvR} onChange={(e) => setVisibleVars({...visibleVars, CvR: e.target.checked})}>
            <span style={{ color: "#1E88E5" }}>CvR</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Cfm} onChange={(e) => setVisibleVars({...visibleVars, Cfm: e.target.checked})}>
            <span style={{ color: "#FFA726" }}>Cfm</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Cfs} onChange={(e) => setVisibleVars({...visibleVars, Cfs: e.target.checked})}>
            <span style={{ color: "#AB47BC" }}>Cfs</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Cfe} onChange={(e) => setVisibleVars({...visibleVars, Cfe: e.target.checked})}>
            <span style={{ color: "#26C6DA" }}>Cfe</span>
          </Checkbox>
          <Checkbox checked={visibleVars.RC} onChange={(e) => setVisibleVars({...visibleVars, RC: e.target.checked})}>
            <span style={{ color: "#EC407A" }}>RC</span>
          </Checkbox>
          <Checkbox checked={visibleVars.COT} onChange={(e) => setVisibleVars({...visibleVars, COT: e.target.checked})}>
            <span style={{ color: "#8D6E63" }}>COT</span>
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
            <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(4) : value} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            {visibleVars.Cv && <Line type="monotone" dataKey="Cv" stroke="#66BB6A" strokeWidth={3} />}
            {visibleVars.CAst && <Line type="monotone" dataKey="C*" stroke="#E53935" strokeWidth={2} />}
            {visibleVars.CvR && <Line type="monotone" dataKey="CvR" stroke="#1E88E5" strokeWidth={2} />}
            {visibleVars.Cfm && <Line type="monotone" dataKey="Cfm" stroke="#FFA726" strokeWidth={2} />}
            {visibleVars.Cfs && <Line type="monotone" dataKey="Cfs" stroke="#AB47BC" strokeWidth={2} />}
            {visibleVars.Cfe && <Line type="monotone" dataKey="Cfe" stroke="#26C6DA" strokeWidth={2} />}
            {visibleVars.RC && <Line type="monotone" dataKey="RC" stroke="#EC407A" strokeWidth={2} />}
            {visibleVars.COT && <Line type="monotone" dataKey="COT" stroke="#8D6E63" strokeWidth={2} />}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Detalle de Sub-Variables de Cv (Últimos 12 Meses)">
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          scroll={{ x: 2100 }}
          size="small"
        />

        <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
          <strong>Fórmulas:</strong>
          <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "13px" }}>
            <div><strong>Cv</strong> = C* + CvR + (CER + CND + SIC + SIC_IVA + Cg) / Ventas</div>
            <div style={{ marginTop: "4px" }}><strong>C*</strong> = (Gc + Tx + D + Pr + R) × (Cfe + mo + RC)</div>
            <div style={{ marginTop: "4px" }}><strong>CvR</strong> = (Cfm × Usuarios_m-2 + PUI) / Ventas_m-2</div>
            <div style={{ marginTop: "4px" }}><strong>Cfm</strong> = (Cf × IPC × (1 - X)) / IPC0</div>
            <div style={{ marginTop: "4px" }}><strong>Cfs</strong> = (Sub1 × ((1+R1)^(N+0.63) - 1) - Sub2 × ((1+R2)^M - 1)) / Fact_T</div>
            <div style={{ marginTop: "4px" }}><strong>Cfe</strong> = Cfs + 0.00042</div>
          </div>
          <div style={{ marginTop: "12px", fontSize: "13px", color: "#666" }}>
            <strong>Fuente de datos:</strong> Data CREG, Data Empresa (ventas/usuarios m-2), Data XM (CND, SIC, LAC)
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponenteCm;
