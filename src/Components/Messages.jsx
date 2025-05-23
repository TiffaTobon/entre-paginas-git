import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("usuario_id");

      try {
        const res = await fetch(`http://localhost:3000/mensajes/receptor/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener mensajes");

        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
        alert("Hubo un problema al cargar los mensajes.");
      }
    };

    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#5D4037" }}>Mensajes Recibidos</h2>
      {messages.length === 0 ? (
        <p>No tienes mensajes aún.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <p><strong>De:</strong> {msg.emisor?.nombre || "Usuario desconocido"}</p>
              <p><strong>Mensaje:</strong> {msg.mensaje}</p>
              <p><strong>Fecha:</strong> {new Date(msg.fecha).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
