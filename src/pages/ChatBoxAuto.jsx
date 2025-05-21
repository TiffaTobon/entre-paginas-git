import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatBoxAuto.css";

const opciones = [
  {
    numero: "1",
    descripcion: "¿Cómo comprar un libro?",
    respuesta: "Para comprar un libro, haz clic en 'Añadir al carrito' y sigue los pasos para confirmar tu pedido. Si no has iniciado sesión, deberás hacerlo primero.",
  },
  {
    numero: "2",
    descripcion: "¿Cómo intercambiar un libro?",
    respuesta: "Para intercambiar un libro, contacta al dueño del libro desde su perfil y acuerden el intercambio.",
  },
  {
    numero: "3",
    descripcion: "¿Cómo registrarme?",
    respuesta: "Haz clic en el botón 'Registrarme' en la parte superior derecha e ingresa tus datos. Es fácil, rápido y gratuito.",
  },
  {
    numero: "4",
    descripcion: "¿Cómo contactar a otro usuario?",
    respuesta: "Puedes contactar a otro usuario desde la página del libro que te interesa. Ahí verás un botón para enviarle un mensaje.",
  },
  {
    numero: "5",
    descripcion: "Salir",
    respuesta: "Gracias por contactarnos. ¡Hasta pronto!",
  },
];

const ChatBoxAuto = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `¡Hola, Bienvenido a EntrePáginas!\n\nSelecciona una opción:\n${opciones
        .map((op) => `${op.numero}. ${op.descripcion}`)
        .join("\n")}`,
    },
  ]);
  const [isActive, setIsActive] = useState(true);
  const timeoutRef = useRef(null);

  // Función para reiniciar el temporizador de inactividad
  const resetInactivityTimer = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (isActive) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "La sesión se ha cerrado por inactividad." },
        ]);
        setIsActive(false);
      }
    }, 60000); // 60 segundos
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => clearTimeout(timeoutRef.current);
  }, [messages]);

  const handleSend = () => {
    if (!isActive || input.trim() === "") return;

    const mensajeUsuario = { sender: "usuario", text: input };
    const respuestaEncontrada = opciones.find((op) => op.numero === input.trim());

    let respuesta;

    if (respuestaEncontrada) {
      respuesta = { sender: "bot", text: respuestaEncontrada.respuesta };

      if (respuestaEncontrada.numero === "5") {
        // Salida
        setIsActive(false); // desactiva input
      }
    } else {
      respuesta = {
        sender: "bot",
        text:
          "Opción no válida. Por favor elige un número del 1 al 5.\n" +
          opciones.map((op) => `${op.numero}. ${op.descripcion}`).join("\n"),
      };
    }

    setMessages((prev) => [...prev, mensajeUsuario, respuesta]);
    setInput("");
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h3>Chat de ayuda</h3>
      </div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === "bot" ? "Entre Páginas" : "Tú"}:</strong> <br />
            {msg.text.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          placeholder={isActive ? "Escribe un número (1-5)..." : "Chat cerrado"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={!isActive}
        />
        <button onClick={handleSend} disabled={!isActive}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatBoxAuto;
