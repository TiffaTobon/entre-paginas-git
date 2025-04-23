import React, { useState } from "react";
import "../styles/MainPanel.css"; // Estilos personalizados para el componente MainPanel.
import SearchBar from "../Components/components";
import Registro from "../pages/Register";
import { Link } from "react-router-dom";
import ChatBox from "../chat/ChatBox";

//Importamos los componentes Hijos
import Auth from "../Components/Auth";

//Importación imágenes y logos
import logo from "../assets/Images/logoEntrePaginas.jpg";

//importar iconos
import { FcReuse } from "react-icons/fc";
import { FcProcess } from "react-icons/fc";
import { FcReadingEbook } from "react-icons/fc";
import { BiSolidBookReader } from "react-icons/bi";

const Header = ({ setMainComponent }) => {
  const [visAuth, setVisAuth] = useState(false);

  return (
    /* HEADER */
    <header className="header_MainPanel_bar">
      {/* Sección Izquierda */}
      <div className="header_left">
        <img
          className="header_MainPanel_icon"
          src={logo}
          alt="Logo Entre Páginas"
        />
        <h1 className="header_MainPanel_tittle">Entre Páginas</h1>
      </div>

      {/* Sección Centro: Barra de búsqueda */}
      <div className="header_center">
        <SearchBar />
      </div>

      {/* Sección Derecha: Botones */}
      <div className="header_right">
        <button className="register_btn_MainPanel">Registrarme</button>
        <button
          onClick={() => setVisAuth(true)}
          className="login_btn_MainPanel"
        >
          Iniciar Sesión
        </button>
        {visAuth && <Auth setMainComponent={setMainComponent} />}
      </div>
    </header>
  );
};

const ExpertCard = ({ title, subtitle, icon }) => {
  return (
    <div className="expert_card">
      {icon && <span className="expert_icon">{icon}</span>}
      <h3 className="expert_heading">{title}</h3>
      <p className="expert_description">{subtitle}</p>
    </div>
  );
};

const MainPanel = ({ setMainComponent }) => {
  return (
    <div className="main_container">
      <Header setMainComponent={setMainComponent} />

      <div className="header_MainPanel_message">
        <BiSolidBookReader className="message_icon"/>
        Pasa la página, comparte magia.
      </div>

      <div className="panel_content">
        <section className="about">
          <div className="about_text">
            <h2 className="about_title">Sobre Nosotros:</h2>
            <h3 className="about_description">
              Conectamos a amantes de la lectura a través de la compra, venta e
              intercambio de libros de segunda mano, fomentando el acceso a la
              lectura de forma accesible y sostenible. Queremos darles una nueva
              vida a los libros, promoviendo la economía circular del
              conocimiento y reduciendo el desperdicio.
            </h3>
          </div>
        </section>

        <section className="expert_path">
          <h1 className="expert_title">
            Compra, Vende o Intercambia tus libros
          </h1>
          <div className="expert_options">
            <ExpertCard
              title="Comprar"
              subtitle="Compra hoy ese libro que te hará volar la imaginación."
              icon={<FcReadingEbook />}
            />
            <ExpertCard
              title="Vender"
              subtitle="Vende esos libros que ya no usas y gana en cada página."
              icon={<FcReuse />}
            />
            <ExpertCard
              title="Intercambiar"
              subtitle="Intercambia tus lecturas y renueva tu biblioteca."
              icon={<FcProcess />}
            />
          </div>
        </section>
      </div>
       {/* 🟢 Aquí añadimos el chat */}
       <div className="chatbox_container">
        <ChatBox />
      </div>
      <footer className="footer_MainPanel">
        <p className="footer_MainPanel_text">
          © Todos los derechos reservados - Entre Páginas 2025
        </p>
      </footer>
    </div>
  );
};
export default MainPanel;
