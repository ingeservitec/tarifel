import React, { useEffect, useState, useMemo } from "react"; 
import 'bootstrap/dist/css/bootstrap.css';

const Search =({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    }
    return (
        <input
        type="text"
        className="form-control"
        style={{ width: "150px" }}
        placeholder="Buscar"
        value={search}
        onChange={e => onInputChange(e.target.value)}
    />
      );
}
 
export default Search ;


