import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaUserEdit, FaExchangeAlt, FaSellcast } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3 className="sidebar_title">Menú</h3>
      <ul className="sidebar_menu">
        <li>
          <Link to="/profile-edit" className="sidebar_link">
            <FaUserEdit className="sidebar_icon" /> Editar Perfil
          </Link>
        </li>
        <li>
          <Link to="/manage-books" className="sidebar_link">
            <FaEdit className="sidebar_icon" /> Mis Libros
          </Link>
        </li>
        <li>
          <Link to="/manage-books" className="sidebar_link">
            <FaExchangeAlt className="sidebar_icon" /> Intercambiar
          </Link>
        </li>
        <li>
          <Link to="/manage-books" className="sidebar_link">
            <FaSellcast className="sidebar_icon" /> Vender
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
