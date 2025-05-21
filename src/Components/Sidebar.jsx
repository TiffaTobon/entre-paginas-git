import React from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaUserEdit,
  FaExchangeAlt,
  FaSellcast,
  FaUsers,
  FaEnvelope,
  FaBook, 
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ isAdmin, onSelectView }) => {
  return (
  <aside className="sidebar">
    <h3 className="sidebar_title">Menú</h3>
    <ul className="sidebar_menu">
      {isAdmin ? (
        <>
          <li>
            <button
              className="sidebar_link"
              data-tooltip="Gestión de Usuarios y Libros"
              onClick={() => onSelectView("adminPanel")}
            >
              <FaUsers className="sidebar_icon" /> Usuarios-Libros
            </button>
          </li>
        </>
      ) : (
          <>
            <li>
              <Link
                to="/profile-edit"
                className="sidebar_link"
                data-tooltip="Editar Perfil"
              >
                <FaUserEdit className="sidebar_icon" /> Editar Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/manage-books"
                className="sidebar_link"
                data-tooltip="Mis Libros"
              >
                <FaEdit className="sidebar_icon" /> Mis Libros
              </Link>
            </li>
            <li>
              <Link
                to="/manage-books"
                className="sidebar_link"
                data-tooltip="Intercambiar libros"
              >
                <FaExchangeAlt className="sidebar_icon" /> Intercambiar
              </Link>
            </li>
            <li>
              <Link
                to="/manage-books"
                className="sidebar_link"
                data-tooltip="Vender libros"
              >
                <FaSellcast className="sidebar_icon" /> Vender
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
