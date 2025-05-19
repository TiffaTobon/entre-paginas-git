  import React from "react";
  import { useNavigate, Link } from "react-router-dom";
  import logo from "../assets/Images/logoEntrePaginas.jpg";
  import { FaShoppingCart } from "react-icons/fa";
  import { useCart } from "../context/CartContext";

    const Header = ({ searchTerm, onSearchChange, onOpenCart, isAdmin }) => {
    const navigate = useNavigate();
    const { cartCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario_id"); // también es buena práctica
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

        {!isAdmin && (
          <div className="header_center">
            <form onSubmit={(e) => e.preventDefault()} className="search_form_header">
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
        )}

        <div className="header_right">
          {!isAdmin && (
            <button onClick={onOpenCart} className="cart-icon-button">
              <FaShoppingCart size={35} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          )}
          <button className="logout_btn_WorkSpace" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

    );
  };

  export default Header; 
