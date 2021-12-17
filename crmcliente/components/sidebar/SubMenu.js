import React, { useState } from "react";
import classNames from "classnames";
import { Collapse, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'

const SubMenu = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  console.log(subMenuOpen)
  return (
    <li className="menu-item has-children">
    <button type="button" className="btn btn-dark"
    onClick={() => setSubMenuOpen(!subMenuOpen)}
    >Dark</button>

      <ul
         className={`sub-menu && ${
          subMenuOpen ? 'is-open' : ''
      }`}
      >
        <li className="menu-item">Sub-Item 1</li>
                                <li className="menu-item">Sub-Item 2</li>
                                <li className="menu-item">Sub-Item 3</li>
      </ul>
  </li>

  )
}

export default SubMenu