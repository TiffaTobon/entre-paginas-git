import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookCards from "../Components/BookCards";
import "../styles/MainPanel.css";
import logo from "../assets/Images/logoEntrePaginas.jpg";
import { useNavigate } from "react-router-dom";
import bannerLibro from "../assets/Images/bannerlibro.png"

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="header_MainPanel_bar">
      <div className="header_left">
        <img className="header_MainPanel_icon" src={logo} alt="Logo Entre Páginas" />
        <div className="header_title_wrapper">
          <h1 className="header_MainPanel_title">Entre Páginas</h1>
          <span className="header_tagline">¡Dale una nueva vida a tus libros!</span>
        </div>
      </div>

      <div className="header_center">
        <form className="search_form_header" onSubmit={(e) => e.preventDefault()}>
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
        <Link to="/register" className="button_link">Registrarme</Link>
        <Link to="/login" className="button_link">Iniciar Sesión</Link>
      </div>
    </header>
  );
};

const MainPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, inputMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="main_container">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <img
        src={bannerLibro}
        alt="Banner Libros"
        className="main_banner"
      />

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

      <section className="book_section">
        <h2 className="highlighted_title">Libros Destacados</h2>
        <BookCards searchTerm={searchTerm} limit={8} showPagination={false} />
      </section>

      

      {/* Chat flotante opcional */}
      {!showChat && (
        <button className="open-sidebar-button" onClick={() => setShowChat(true)}>
          💬
        </button>
      )}

      {showChat && (
        <div className="sidebar-chat">
          <div className="sidebar-header">
            <p>💬 Chat de ayuda</p>
            <button onClick={() => setShowChat(false)}>✖</button>
          </div>
          <div className="sidebar-body">
            <p><strong>¡Hola!</strong> ¿En qué podemos ayudarte?</p>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className="chat-message">{msg}</div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="chat-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              <button className="send-button" onClick={handleSendMessage}>Enviar</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer_MainPanel">
        <p className="footer_text">© Todos los derechos reservados - Entre Páginas 2025</p>
      </footer>
    </div>
  );
};

export default MainPanel;
