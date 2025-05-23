import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookCards from "../Components/BookCards";
import "../styles/MainPanel.css";
import logo from "../assets/Images/logoEntrePaginas.jpg";
import bannerLibro from "../assets/Images/bannerlibro.png";
import UserForm from "../Components/UserForm"; 
import Login from "./Login";
import axios from "axios";
import { Modal, Box } from "@mui/material";
import ChatBoxAuto from "./ChatBoxAuto";


const Header = ({ searchTerm, onSearchChange, onOpenRegister, onOpenLogin }) => {
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
        <button onClick={onOpenRegister} className="button_link">Registrarme</button>
        <button onClick={onOpenLogin} className="button_link">Iniciar Sesión</button>
      </div>
    </header>
  );
};

const MainPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, inputMessage]);
      setInputMessage('');
    }
  };

  const handleRegister = async (formData) => {
    const { nombres, email, password } = formData;
    const nombre = nombres.trim();

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        nombre,
        email,
        password,
      });

      const { token, usuario } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("usuario_id", usuario.id);

      alert("Registro exitoso");
      setOpenRegister(false); // Cierra el modal
    } catch (error) {
      alert("Error al registrarse: " + (error.response?.data?.mensaje || error.message));
    }
  };

  return (
    <div className="main_container">
      <Header
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onOpenRegister={() => setOpenRegister(true)}
      onOpenLogin={() => setOpenLogin(true)}
    />


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
        <BookCards
          searchTerm={searchTerm}
          limit={8}
          showPagination={false}
          onOpenLogin={() => setOpenLogin(true)} 
        />
      </section>

      {!showChat && (
  <button className="open-sidebar-button" onClick={() => setShowChat(true)}>
    💬
  </button>
)}

{showChat && (
  <div
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 9999,
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      width: "400px", // <-- Aumentado el tamaño
      height: "300px"
    }}
  >
    {/* Encabezado del chat */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
      }}
    >
      <p style={{ margin: 0, fontWeight: "bold", color: "#5d4037" }}>
        💬 Chat de ayuda
      </p>
      <button
        onClick={() => setShowChat(false)}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "1.1rem",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
    </div>

    {/* Componente de conversación */}
    <ChatBoxAuto />
  </div>
)}

      <footer className="footer_MainPanel">
        <p className="footer_text">© Todos los derechos reservados - Entre Páginas 2025</p>
      </footer>

      {/* MODAL DE REGISTRO */}
      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <UserForm onSubmit={handleRegister} mode="register" onClose={() => setOpenRegister(false)} />
        </Box>
      </Modal>

           {/* MODAL LOGIN */}
      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Login
            onClose={() => setOpenLogin(false)}
            onSwitchToRegister={() => {
              setOpenLogin(false);
              setOpenRegister(true);
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default MainPanel;
