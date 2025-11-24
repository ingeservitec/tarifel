import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Row, Col, Select, Spin, Empty, Table, Statistic } from "antd";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  ShoppingCartOutlined, ThunderboltOutlined,
  DollarCircleOutlined, LineChartOutlined
} from "@ant-design/icons";
import { OBTENER_RES_COMPONENTES_CU_TARIFAS, OBTENER_DATA_XM_AFAC } from "../data";

const { Option } = Select;

const VariablesOperativas = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Query para componentes CU (Pc, Mc, Pb)
  const { data: dataCU, loading: loadingCU, error: errorCU } = useQuery(
    OBTENER_RES_COMPONENTES_CU_TARIFAS,
    {
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
    }
  );

  // Query para datos operativos (compras, ventas, demanda)
  const { data: dataXM, loading: loadingXM, error: errorXM } = useQuery(
    OBTENER_DATA_XM_AFAC,
    {
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
    }
  );

  const recordsCU = dataCU?.obtenerResComponentesCuTarifas?.records || [];
  const recordsXM = dataXM?.obtenerData_xm_afac?.records || [];

  console.log("Loading CU:", loadingCU);
  console.log("Loading XM:", loadingXM);
  console.log("Error CU:", errorCU);
  console.log("Error XM:", errorXM);
  console.log("Records CU:", recordsCU.length);
  console.log("Records XM:", recordsXM.length);

  // Ordenar datos por fecha
  const sortedRecordsCU = useMemo(() => {
    return [...recordsCU].sort((a, b) => {
      if (a.anho !== b.anho) return a.anho - b.anho;
      return a.mes - b.mes;
    });
  }, [recordsCU]);

  const sortedRecordsXM = useMemo(() => {
    return [...recordsXM].sort((a, b) => {
      if (a.anho !== b.anho) return a.anho - b.anho;
      return a.mes - b.mes;
    });
  }, [recordsXM]);

  // Últimos 12 meses
  const last12MonthsCU = useMemo(() => {
    return sortedRecordsCU.slice(-12);
  }, [sortedRecordsCU]);

  const last12MonthsXM = useMemo(() => {
    return sortedRecordsXM.slice(-12);
  }, [sortedRecordsXM]);

  // Datos del mes seleccionado
  const selectedMonthDataCU = useMemo(() => {
    return recordsCU.find(r => r.anho === selectedYear && r.mes === selectedMonth);
  }, [recordsCU, selectedYear, selectedMonth]);

  const selectedMonthDataXM = useMemo(() => {
    return recordsXM.find(r => r.anho === selectedYear && r.mes === selectedMonth);
  }, [recordsXM, selectedYear, selectedMonth]);

  // KPIs principales
  const kpis = useMemo(() => {
    if (!selectedMonthDataCU || !selectedMonthDataXM) return null;

    const comprasBolsaKWh = selectedMonthDataXM.compras_en_bolsa_kwh || 0;
    const comprasContratosKWh = selectedMonthDataXM.compras_en_contratos_kwh || 0;
    const totalComprasKWh = comprasBolsaKWh + comprasContratosKWh;

    const comprasBolsaCOP = selectedMonthDataXM.compras_en_bolsa_cop || 0;
    const ventasBolsaKWh = selectedMonthDataXM.ventas_en_bolsa_kwh || 0;
    const demandaRealKWh = selectedMonthDataXM.demanda_real_kwh || 0;
    const perdidaRealKWh = selectedMonthDataXM.perdida_real_kwh || 0;

    return {
      pc: selectedMonthDataCU.pc || 0,
      mc: selectedMonthDataCU.mc || 0,
      pb: selectedMonthDataCU.pb || 0,
      comprasBolsaKWh,
      comprasContratosKWh,
      totalComprasKWh,
      comprasBolsaCOP,
      ventasBolsaKWh,
      demandaRealKWh,
      perdidaRealKWh,
      demandaComercial: demandaRealKWh + perdidaRealKWh,
      porcentajeBolsa: totalComprasKWh > 0 ? (comprasBolsaKWh / totalComprasKWh) * 100 : 0,
      porcentajeContratos: totalComprasKWh > 0 ? (comprasContratosKWh / totalComprasKWh) * 100 : 0
    };
  }, [selectedMonthDataCU, selectedMonthDataXM]);

  // Evolución de precios
  const evolucionPrecios = useMemo(() => {
    return last12MonthsCU.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      Pc: record.pc || 0,
      Mc: record.mc || 0,
      Pb: record.pb || 0
    }));
  }, [last12MonthsCU]);

  // Evolución de compras (bolsa vs contratos)
  const evolucionCompras = useMemo(() => {
    return last12MonthsXM.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      "Bolsa (MWh)": (record.compras_en_bolsa_kwh || 0) / 1000,
      "Contratos (MWh)": (record.compras_en_contratos_kwh || 0) / 1000,
      "Total (MWh)": ((record.compras_en_bolsa_kwh || 0) + (record.compras_en_contratos_kwh || 0)) / 1000
    }));
  }, [last12MonthsXM]);

  // Datos para gráfico de torta (compras bolsa vs contratos)
  const pieDataCompras = useMemo(() => {
    if (!kpis) return [];
    return [
      { name: "Bolsa", value: kpis.comprasBolsaKWh / 1000, fill: "#8884d8" },
      { name: "Contratos", value: kpis.comprasContratosKWh / 1000, fill: "#82ca9d" }
    ].filter(item => item.value > 0);
  }, [kpis]);

  // Evolución de demanda y pérdidas
  const evolucionDemanda = useMemo(() => {
    return last12MonthsXM.map(record => ({
      periodo: `${record.mes}/${record.anho}`,
      "Demanda Real (MWh)": (record.demanda_real_kwh || 0) / 1000,
      "Pérdida Real (MWh)": (record.perdida_real_kwh || 0) / 1000,
      "Demanda Comercial (MWh)": ((record.demanda_real_kwh || 0) + (record.perdida_real_kwh || 0)) / 1000
    }));
  }, [last12MonthsXM]);

  // Años y meses disponibles
  const availableYears = useMemo(() => {
    const years = [...new Set(recordsCU.map(r => r.anho))];
    return years.sort((a, b) => b - a);
  }, [recordsCU]);

  const availableMonths = useMemo(() => {
    const monthsInYear = recordsCU
      .filter(r => r.anho === selectedYear)
      .map(r => r.mes);
    return [...new Set(monthsInYear)].sort((a, b) => a - b);
  }, [recordsCU, selectedYear]);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Formateo de números
  const formatNumber = (num, decimals = 2) => {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  if (loadingCU) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" tip="Cargando datos de CU..." />
      </div>
    );
  }

  if (errorCU) {
    return (
      <Card>
        <Empty description={`Error al cargar datos de CU: ${errorCU?.message}`} />
      </Card>
    );
  }

  if (!recordsCU || recordsCU.length === 0) {
    return (
      <Card>
        <Empty description="No hay datos de CU disponibles. Por favor, calcule primero el CU desde la página principal." />
      </Card>
    );
  }

  // Mostrar advertencia si no hay datos XM pero continuar con los datos CU disponibles
  const hasXMData = !loadingXM && !errorXM && recordsXM && recordsXM.length > 0;

  return (
    <div style={{ padding: "20px" }}>
      {/* Advertencia si no hay datos XM */}
      {!hasXMData && (
        <Card style={{ marginBottom: "20px", backgroundColor: "#fff7e6", borderColor: "#ffa940" }}>
          <div style={{ color: "#d46b08" }}>
            <strong>⚠️ Advertencia:</strong> {loadingXM ? "Cargando datos operativos de XM..." : "No hay datos operativos de XM AFAC disponibles. Solo se mostrarán los precios del CU (Pc, Mc, Pb)."}
          </div>
        </Card>
      )}

      {/* Filtros */}
      <Card style={{ marginBottom: "20px" }} bodyStyle={{ padding: "16px" }}>
        <Row gutter={16} align="middle">
          <Col span={4}>
            <label style={{ fontWeight: "bold", marginRight: "10px" }}>Año:</label>
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
          <Col span={6}>
            <label style={{ fontWeight: "bold", marginRight: "10px" }}>Mes:</label>
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
          <Col span={14}>
            <div style={{ textAlign: "right", color: "#666" }}>
              <small>Variables Operativas - {monthNames[selectedMonth - 1]} {selectedYear}</small>
            </div>
          </Col>
        </Row>
      </Card>

      {/* KPIs de Precios */}
      {kpis && (
        <Row gutter={16} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Precio de Compra (Pc)"
                value={kpis.pc.toFixed(2)}
                suffix="$/kWh"
                prefix={<DollarCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Margen Comercialización (Mc)"
                value={kpis.mc.toFixed(2)}
                suffix="$/kWh"
                prefix={<LineChartOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Precio Bolsa (Pb)"
                value={kpis.pb.toFixed(2)}
                suffix="$/kWh"
                prefix={<ThunderboltOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* KPIs de Compras y Demanda */}
      {kpis && (
        <Row gutter={16} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Compras en Bolsa"
                value={formatNumber(kpis.comprasBolsaKWh / 1000, 0)}
                suffix="MWh"
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: '#8884d8', fontSize: '20px' }}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                {kpis.porcentajeBolsa.toFixed(1)}% del total
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Compras en Contratos"
                value={formatNumber(kpis.comprasContratosKWh / 1000, 0)}
                suffix="MWh"
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: '#82ca9d', fontSize: '20px' }}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                {kpis.porcentajeContratos.toFixed(1)}% del total
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Demanda Real"
                value={formatNumber(kpis.demandaRealKWh / 1000, 0)}
                suffix="MWh"
                valueStyle={{ color: '#13c2c2', fontSize: '20px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Demanda Comercial + Pérdida"
                value={formatNumber(kpis.demandaComercial / 1000, 0)}
                suffix="MWh"
                valueStyle={{ color: '#722ed1', fontSize: '20px' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Gráfico de Evolución de Precios */}
      <Card title="Evolución de Precios (Últimos 12 Meses)" style={{ marginBottom: "20px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={evolucionPrecios}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="periodo"
              angle={-45}
              textAnchor="end"
              height={80}
              style={{ fontSize: "12px" }}
            />
            <YAxis label={{ value: '$/kWh', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => value.toFixed(2)} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line type="monotone" dataKey="Pc" stroke="#1890ff" strokeWidth={2} name="Pc (Compra)" />
            <Line type="monotone" dataKey="Pb" stroke="#faad14" strokeWidth={2} name="Pb (Bolsa)" />
            <Line type="monotone" dataKey="Mc" stroke="#52c41a" strokeWidth={2} name="Mc (Comercialización)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Gráficos de Compras */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col xs={24} lg={16}>
          <Card title="Evolución de Compras: Bolsa vs Contratos (Últimos 12 Meses)">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={evolucionCompras}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="periodo"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  style={{ fontSize: "12px" }}
                />
                <YAxis label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => formatNumber(value, 0)} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Area
                  type="monotone"
                  dataKey="Bolsa (MWh)"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Contratos (MWh)"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={`Distribución de Compras - ${monthNames[selectedMonth - 1]}`}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieDataCompras}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value.toFixed(0)} MWh`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieDataCompras.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${formatNumber(value, 0)} MWh`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Gráfico de Demanda y Pérdidas */}
      <Card title="Evolución de Demanda y Pérdidas (Últimos 12 Meses)">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={evolucionDemanda}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="periodo"
              angle={-45}
              textAnchor="end"
              height={80}
              style={{ fontSize: "12px" }}
            />
            <YAxis label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => formatNumber(value, 0)} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Area
              type="monotone"
              dataKey="Demanda Real (MWh)"
              stackId="1"
              stroke="#13c2c2"
              fill="#13c2c2"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="Pérdida Real (MWh)"
              stackId="1"
              stroke="#eb2f96"
              fill="#eb2f96"
              fillOpacity={0.6}
            />
            <Line
              type="monotone"
              dataKey="Demanda Comercial (MWh)"
              stroke="#722ed1"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default VariablesOperativas;
