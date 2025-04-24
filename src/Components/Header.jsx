import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Images/logoEntrePaginas.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Header = ({ searchTerm, onSearchChange }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleLogout = () => {
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <header className="header_WorkSpace_bar">
      <div className="header_left">
        <img className="header_WorkSpace_icon" src={logo} alt="Logo Entre Páginas" />
        <h1 className="header_WorkSpace_title">Entre Páginas</h1>
      </div>

      <div className="header_center">
        <form onSubmit={handleSearch} className="search_form_header">
          <input
            type="text"
            placeholder="Buscar libros..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search_input_header"
          />
          <button type="submit" className="search_btn_header">
            Buscar
          </button>
        </form>
      </div>

      <div className="header_right">
        <Link to="/shopping-cart" className="cart-link">
          <FaShoppingCart />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
        <button className="logout_btn_WorkSpace" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header; // 👈 ASEGÚRATE de tener esta línea
