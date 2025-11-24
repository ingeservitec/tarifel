import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Table, Spin, Empty, Statistic, Row, Col, Checkbox, Button } from "antd";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { OBTENER_RES_COMPONENTES_CU_TARIFAS } from "../data";

const ComponenteRm = () => {
  // Estado para controlar visibilidad de variables
  const [visibleVars, setVisibleVars] = useState({
    R: true,
    RestriccionesAliviadas: true,
    VentasDesv: true,
    Guatape: true,
    CRS: true
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

  // Sub-variables de Rm
  const subVariables = [
    { key: "r", name: "R - Restricciones", description: "Resultado final", color: "#AB47BC" },
    { key: "restricciones_aliviadas", name: "Restricciones Aliviadas", description: "Costo de restricciones aliviadas", color: "#42A5F5" },
    { key: "ventas_desv", name: "Ventas Desviaciones", description: "Ingresos por ventas desviaciones", color: "#66BB6A" },
    { key: "guatape", name: "Guatapé", description: "Componente Guatapé", color: "#FFA726" },
    { key: "crs", name: "CRS", description: "Cargo por confiabilidad", color: "#26C6DA" }
  ];

  const tableData = useMemo(() => {
    return last12Months.map(record => ({
      key: `${record.anho}-${record.mes}`,
      periodo: `${record.mes}/${record.anho}`,
      r: (record.r || 0).toFixed(4),
      restricciones_aliviadas: (record.restricciones_aliviadas || 0).toFixed(4),
      ventas_desv: (record.ventas_desv || 0).toFixed(4),
      guatape: (record.guatape || 0).toFixed(4),
      crs: (record.crs || 0).toFixed(4)
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
          fontWeight: v.key === "r" ? "bold" : "normal",
          color: v.key === "r" ? v.color : "inherit"
        }}>
          {text}
        </span>
      )
    }))
  ];

  const chartData = useMemo(() => {
    return last12Months.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      "R": record.r || 0,
      "Restricciones Aliviadas": record.restricciones_aliviadas || 0,
      "Ventas Desv": record.ventas_desv || 0,
      "Guatapé": record.guatape || 0,
      "CRS": record.crs || 0
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
                title="R - Restricciones (Último)"
                value={(latestData.r || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#AB47BC', fontWeight: 'bold' }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                {latestData.mes}/{latestData.anho}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Restricciones Aliviadas"
                value={(latestData.restricciones_aliviadas || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#42A5F5' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="CRS"
                value={(latestData.crs || 0).toFixed(2)}
                suffix="$/kWh"
                valueStyle={{ color: '#26C6DA' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card title="Evolución de Rm y Componentes (Últimos 12 Meses)" style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "16px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Button size="small" onClick={() => setVisibleVars({ R: true, RestriccionesAliviadas: true, VentasDesv: true, Guatape: true, CRS: true })}>
            Seleccionar Todo
          </Button>
          <Button size="small" onClick={() => setVisibleVars({ R: false, RestriccionesAliviadas: false, VentasDesv: false, Guatape: false, CRS: false })}>
            Deseleccionar Todo
          </Button>
          <Checkbox checked={visibleVars.R} onChange={(e) => setVisibleVars({...visibleVars, R: e.target.checked})}>
            <span style={{ color: "#AB47BC", fontWeight: "bold" }}>R</span>
          </Checkbox>
          <Checkbox checked={visibleVars.RestriccionesAliviadas} onChange={(e) => setVisibleVars({...visibleVars, RestriccionesAliviadas: e.target.checked})}>
            <span style={{ color: "#42A5F5" }}>Restricciones Aliviadas</span>
          </Checkbox>
          <Checkbox checked={visibleVars.CRS} onChange={(e) => setVisibleVars({...visibleVars, CRS: e.target.checked})}>
            <span style={{ color: "#26C6DA" }}>CRS</span>
          </Checkbox>
          <Checkbox checked={visibleVars.Guatape} onChange={(e) => setVisibleVars({...visibleVars, Guatape: e.target.checked})}>
            <span style={{ color: "#FFA726" }}>Guatapé</span>
          </Checkbox>
          <Checkbox checked={visibleVars.VentasDesv} onChange={(e) => setVisibleVars({...visibleVars, VentasDesv: e.target.checked})}>
            <span style={{ color: "#66BB6A" }}>Ventas Desv</span>
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
            {visibleVars.R && <Line type="monotone" dataKey="R" stroke="#AB47BC" strokeWidth={3} />}
            {visibleVars.RestriccionesAliviadas && <Line type="monotone" dataKey="Restricciones Aliviadas" stroke="#42A5F5" strokeWidth={2} />}
            {visibleVars.CRS && <Line type="monotone" dataKey="CRS" stroke="#26C6DA" strokeWidth={2} />}
            {visibleVars.Guatape && <Line type="monotone" dataKey="Guatapé" stroke="#FFA726" strokeWidth={2} />}
            {visibleVars.VentasDesv && <Line type="monotone" dataKey="Ventas Desv" stroke="#66BB6A" strokeWidth={2} />}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Detalle de Sub-Variables de Rm (Últimos 12 Meses)">
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          scroll={{ x: 900 }}
          size="small"
        />

        <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
          <strong>Fórmula:</strong>
          <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "14px" }}>
            R = (Restricciones Aliviadas + CRS + Guatapé - Ventas Desviaciones) / Ventas
          </div>
          <div style={{ marginTop: "12px", fontSize: "13px", color: "#666" }}>
            <strong>Fuente de datos:</strong> Data XM STN y Data Empresa
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponenteRm;
