import React, { useState } from 'react';
import './ChatBox.css';  // Agrega un archivo CSS para los estilos

const ChatBox = () => {
  const [message, setMessage] = useState('');  // Para controlar el input de mensaje
  const [messages, setMessages] = useState([]);  // Para almacenar los mensajes

  // Función que maneja el envío de mensajes
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: 'You', content: message }]);
      setMessage('');  // Limpiar el input
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h3>Chat</h3>
      </div>
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
    </div>
  );
};

export default ChatBox;
