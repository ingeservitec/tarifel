import React, { useState, useEffect, useContext } from "react";
import DataExporter from "./DataExporter.js";

function Datarxsui() {
  // State with list of all checked item
  const [checked, setChecked] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedStartPeriod, setSelectedStartPeriod] = useState(null);
  const [selectedEndPeriod, setSelectedEndPeriod] = useState(null);

  const generatePeriods = (startYear, endYear) => {
    const periods = [];

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    for (let year = startYear; year <= endYear; year++) {
      for (let month = 1; month <= 12; month++) {
        if (year === endYear && month > currentMonth) {
          break;
        }
        periods.push({ month, year });
      }
    }

    return periods;
  };

  const periods = generatePeriods(2017, new Date().getFullYear());
  // Establece el período predeterminado como el período anterior al actual
  const defaultPeriod =
    periods.length > 1
      ? `${periods[periods.length - 2].month}-${
          periods[periods.length - 2].year
        }`
      : "";
  useEffect(() => {
    setSelectedStartPeriod(defaultPeriod);
    setSelectedEndPeriod(defaultPeriod);
  }, []);
  
  let checkList


    checkList = [
      "FORMULARIO T1. Recuperación Costo Garantía",
      "FORMATO T2. Garantías Financieras",
      "FORMATO T3. Tarifas Publicadas",
      // "FORMULARIO T5. Aplicación de Opción Tarifaria",
      // "FORMATO T6. Opción Tarifaria168/2008",
      "FORMATO T7. Costo Unitario de Prestación del Servicio _CU 119 – UR",
      "FORMATO T9. Variables Costo Unitario de Prestación del Servicio CU 119 – UR",
      // Reporte Circular CREG 119 de 2017
      "Reporte Circular CREG 119 de 2017",
    ];
  
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setChecked(checkList);
    } else {
      setChecked([]);
    }
    setSelectAll(event.target.checked);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div className="bg-gray-100 p-4">
      <div className="card shadow-md rounded">
        <div className="card-body">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Seleccione los períodos:</h5>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Período inicial
                  </label>
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedStartPeriod}
                    onChange={(e) => setSelectedStartPeriod(e.target.value)}
                  >
                    <option value="">Seleccione un período</option>
                    {periods.map((period, index) => (
                      <option
                        key={index}
                        value={`${period.month}-${period.year}`}
                      >{`${period.month}-${period.year}`}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Período final
                  </label>
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedEndPeriod}
                    onChange={(e) => setSelectedEndPeriod(e.target.value)}
                  >
                    <option value="">Seleccione un período</option>
                    {periods.map((period, index) => (
                      <option
                        key={index}
                        value={`${period.month}-${period.year}`}
                      >{`${period.month}-${period.year}`}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">
                Seleccione los formatos y formularios a exportar:
              </h5>

              <div className="card-body shadow ">
                <div className="col-12 d-flex flex-row m-2">
                  <div className="col mb-3 col-12 text-left">
                    <div className="list-container h8">
                      {/* Agregar checkbox para seleccionar todos */}
                      <div className="flex items-center mb-2 bg-blue-300 text-white p-2 rounded">
                        <input
                          className="mr-2"
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                        <span>Seleccionar todos</span>
                      </div>
                      {checkList.map((item, index) => (
                        <div key={index} className="flex items-center mb-1">
                          <input
                            className="mr-2"
                            value={item}
                            type="checkbox"
                            checked={checked.includes(item)}
                            onChange={handleCheck}
                          />
                          <span className={isChecked(item)}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <DataExporter
                    checked={checked}
                    selectedStartPeriod={selectedStartPeriod}
                    selectedEndPeriod={selectedEndPeriod}
                  />
                </div>
              </div>
              <div className="col-md-12 d-flex flex-row m-2">
                {`Resumen: ${checkedItems}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Datarxsui;
