import React, { useEffect, useState, useMemo } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableHeader =({ headers, onSorting }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");
     const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };
    return (
        <thead >
        <tr id="miTablaPersonalizada">
            {headers.map(({ name, field, sortable }) => (
                <th
                    key={name}
                    onClick={() =>
                        sortable ? onSortingChange(field) : null
                    }
                >
                    {name}

                    {sortingField && sortingField === field && (
                    <i className={sortingOrder === "asc" ? "fa fa-arrow-down ml-2" : "fa fa-arrow-up ml-2"}></i>    
                    )}
           

                </th>
            ))}
        </tr>
    </thead>
);
}
 
export default TableHeader ;
