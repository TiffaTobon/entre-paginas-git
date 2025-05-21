import axios from "axios";
import React, { useState } from "react";
import "./ChatBox.css";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [correo, setCorreo] = useState("");
  const [correoInput, setCorreoInput] = useState("");

  // Obtener o registrar usuario por correo
  const obtenerOCrearUsuario = async (correoInput) => {
    try {
      // 1. Verifica si existe
      const { data } = await axios.get(
        `http://localhost:3000/usuarios/correo/${correoInput}`
      );
      setUsuarioId(data.id);
      setCorreo(correoInput);
    } catch (err) {
      // 2. Si no existe, crea un nuevo usuario "anónimo"
      if (err.response?.status === 404) {
        const nuevo = await axios.post("http://localhost:3000/auth/register", {
          nombre: "Anónimo",
          email: correoInput,
          password: "anonimo123", // password genérica
        });
        setUsuarioId(nuevo.data.usuario.id);
        setCorreo(correoInput);
      } else {
        console.error("Error al obtener o crear usuario:", err);
      }
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && usuarioId) {
      axios
        .post("http://localhost:3000/mensajes", {
          emisor_id: usuarioId,
          receptor_id: 10, // Admin
          mensaje: message,
        })
        .then(() => {
          setMessages([...messages, { sender: "Tú", content: message }]);
          setMessage("");
        })
        .catch((err) => {
          console.error("Error al enviar mensaje:", err);
        });
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h3>Chat de ayuda</h3>
      </div>

      {!correo && (
        <div className="chatbox-email">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={correoInput}
            onChange={(e) => setCorreoInput(e.target.value)}
          />
          <button onClick={() => obtenerOCrearUsuario(correoInput)}>
            Comenzar chat
          </button>
        </div>
      )}

      {correo && (
        <>
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>

          <div className="chatbox-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
