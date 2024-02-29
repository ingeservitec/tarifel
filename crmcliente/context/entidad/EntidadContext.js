import { createContext, useState, useEffect } from "react";

const EntidadContext = createContext();

export const EntidadProvider = ({ children }) => {
  const [entidad, setEntidad] = useState(null);
  const [datosCargados, setDatosCargados] = useState(false); // Nuevo estado

  // Carga la entidad desde el LocalStorage al montar el componente
  useEffect(() => {
    const entidadAlmacenada = localStorage.getItem("entidad");
    if (entidadAlmacenada) {
      setEntidad(JSON.parse(entidadAlmacenada));
    }
    setDatosCargados(true); // Indica que los datos se han cargado
  }, []);

  // Almacena la entidad en el LocalStorage cada vez que cambie
  useEffect(() => {
    if (entidad) {
      localStorage.setItem("entidad", JSON.stringify(entidad));
    } else {
      localStorage.removeItem("entidad");
    }
  }, [entidad]);

  return (
    <EntidadContext.Provider value={{ entidad, setEntidad, datosCargados }}>
      {children}
    </EntidadContext.Provider>
  );
};

export default EntidadContext;
