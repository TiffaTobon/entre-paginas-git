import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/logoEntrePaginas.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const Header = ({ searchTerm, onSearchChange, onOpenCart, isAdmin }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [openMessagesModal, setOpenMessagesModal] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  const userId = localStorage.getItem("usuario_id");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    if (window.confirm("¿Está seguro que desea cerrar sesión?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario_id");
      navigate("/");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:3000/mensajes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const enviadosData = await res.json();
      const propios = enviadosData.filter(
        m => m.emisor_id == userId || m.receptor_id == userId
      );
      setAllMessages(propios);
      const nuevos = propios.filter(m => m.receptor_id == userId && !m.visto);
      setUnreadCount(nuevos.length);
    } catch (err) {
      console.error("Error al cargar mensajes:", err);
    }
  };

  useEffect(() => {
    fetchMessages(); // cargar al iniciar sesión
  }, []);

  useEffect(() => {
    if (openMessagesModal) {
      const marcarVistos = async () => {
        try {
          await fetch(`http://localhost:3000/mensajes/marcar-visto/${userId}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          });
          fetchMessages();
        } catch (err) {
          console.error("Error al marcar mensajes como vistos:", err);
        }
      };
      marcarVistos();
    }
  }, [openMessagesModal]);

  const handleSendReply = async (receptorId) => {
    if (!replyText.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/mensajes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          emisor_id: userId,
          receptor_id: receptorId,
          mensaje: replyText,
          correo: null
        })
      });

      if (!res.ok) throw new Error("Error al enviar respuesta");

      setReplyText("");
      fetchMessages(); 
    } catch (error) {
      console.error("Error al responder:", error);
      alert("Error al responder.");
    }
  };

  const groupedMessages = allMessages.reduce((acc, msg) => {
    const key = [msg.emisor_id, msg.receptor_id].sort().join("-");
    if (!acc[key]) acc[key] = [];
    acc[key].push(msg);
    return acc;
  }, {});

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
            <button type="submit" className="search_btn_header">Buscar</button>
          </form>
        </div>
      )}

      <div className="header_right">
        {!isAdmin && (
          <>
            <button onClick={onOpenCart} className="cart-icon-button">
              <FaShoppingCart size={35} />
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </button>

            <div style={{ position: 'relative' }}>
              <button onClick={() => setOpenMessagesModal(true)} className="cart-icon-button">
                <FiMessageSquare size={32} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </>
        )}
        <button className="logout_btn_WorkSpace" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {/* Modal tipo chat */}
      <Modal open={openMessagesModal} onClose={() => setOpenMessagesModal(false)}>
        <Box sx={{
          width: 450,
          maxHeight: "80vh",
          overflowY: "auto",
          margin: "auto",
          marginTop: "5%",
          bgcolor: 'white',
          p: 3,
          borderRadius: 2,
          fontFamily: 'Outfit, sans-serif',
          color: '#5D4037'
        }}>
          <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Mensajes Recibidos</h3>

          {Object.keys(groupedMessages).length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#5D4037', mt: 2 }}>
              No tienes mensajes nuevos.
            </Typography>
          ) : (
            Object.entries(groupedMessages).map(([key, messages]) => (
              <Box key={key} sx={{ mb: 3, p: 2, bgcolor: '#f5efe6', borderRadius: 2 }}>
                {messages
                  .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                  .map((msg, idx) => (
                    <Typography
                      key={idx}
                      sx={{
                        textAlign: msg.emisor_id == userId ? "right" : "left",
                        bgcolor: msg.emisor_id == userId ? '#D7CCC8' : '#EFEBE9',
                        px: 2, py: 1, borderRadius: 2, mb: 1
                      }}>
                      <strong>{msg.emisor?.nombre || 'Tú'}:</strong> {msg.mensaje}<br />
                      <small>{new Date(msg.fecha).toLocaleString()}</small>
                    </Typography>
                ))}

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Escribe una respuesta"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button variant="contained" onClick={() => handleSendReply(messages[0].emisor_id == userId ? messages[0].receptor_id : messages[0].emisor_id)}
                    sx={{ bgcolor: '#5D4037', '&:hover': { bgcolor: '#4E342E' } }}>
                    Enviar
                  </Button>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Modal>
    </header>
  );
};

export default Header;
