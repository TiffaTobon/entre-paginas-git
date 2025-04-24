import React from "react";
import "../styles/MainPanel.css";
import { Link } from "react-router-dom";
import logo from "../assets/Images/logoEntrePaginas.jpg";

const Header = () => {
  return (
    <header className="header_MainPanel_bar">
      <div className="header_left">
        <img className="header_MainPanel_icon" src={logo} alt="Logo Entre Páginas" />
        <div className="header_title_wrapper">
          <h1 className="header_MainPanel_title">Entre Páginas</h1>
          <span className="header_tagline">¡Dale una nueva vida a tus libros!</span>
        </div>
      </div>
      <div className="header_right">
        <Link to="/register" className="button_link">Registrarme</Link>
        <Link to="/login" className="button_link">Iniciar Sesión</Link>
      </div>
    </header>
  );
};

const ExpertCard = ({ title, link }) => {
  return (
    <Link to={link} className="button_card small_button">
      <h3 className="expert_heading">{title}</h3>
    </Link>
  );
};

const MainPanel = () => {
  return (
    <div className="main_container" style={{ fontFamily: "Tiland, sans-serif" }}>
      <Header />
      <section className="expert_path left_aligned_options moved_left">
      <div className="image_background">

      </div>
</section>

      <div className="panel_content">
        <section className="about">
          <div className="about_text">
            <h2 className="about_title">Sobre Nosotros</h2>
            <p className="about_description">
              Conectamos a amantes de la lectura a través de la compra, venta e intercambio de libros de segunda mano,
              fomentando el acceso a la lectura de forma accesible y sostenible.
              Queremos darles una nueva vida a los libros, promoviendo la economía circular del conocimiento y reduciendo el desperdicio.
            </p>
          </div>
        </section>
      </div>
      <footer className="footer_MainPanel">
        <p className="footer_text">© Todos los derechos reservados - Entre Páginas 2025</p>
      </footer>
    </div>
  );
};

export default MainPanel;
