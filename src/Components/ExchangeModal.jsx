import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const ExchangeModal = ({ open, onClose, book, onSend }) => {
const [message, setMessage] = React.useState("");
const [error, setError] = useState("");


 const handleSend = async () => {
  if (!message.trim()) {
    setError("Debe ingresar algún mensaje.");
    return;
  }

  const token = localStorage.getItem("token");
  const emisor_id = localStorage.getItem("usuario_id");

  try {
    const res = await fetch("http://localhost:3000/mensajes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        emisor_id,
        receptor_id: book.usuario_id,
        mensaje: message,
        correo: null
      })
    });

    if (!res.ok) throw new Error("Error al enviar el mensaje");

    const data = await res.json();
    alert("Tu mensaje fue enviado con éxito.");
    setError("");       // Limpia cualquier error anterior
    setMessage("");     // Limpia el campo de mensaje
    onClose();          // Cierra el modal
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    alert("Hubo un error al enviar tu solicitud.");
  }
};


  return (
    <Modal open={open} onClose={onClose}>
     <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: '#fdf8f4',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                fontFamily: 'Outfit, sans-serif',
                color: '#5D4037' // esto aplica a todo
            }}
            >
        <Typography
            variant="h6"
            align="center"
            sx={{
                fontWeight: 'bold',
                color: '#5D4037', // color café
                mb: 2
            }}
            >
            Solicitar intercambio
            </Typography>
        <Typography fontSize={14}>
          Estás contactando al dueño del libro: <strong>{book?.titulo}</strong>
        </Typography>
        <TextField
          label="Mensaje"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
        />
        {error && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {error}
            </p>
          )}
        <Button
            variant="contained"
            onClick={handleSend}
            fullWidth
            sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 'bold',
                fontFamily: 'Outfit, sans-serif',
                backgroundColor: '#5D4037',
                '&:hover': { backgroundColor: '#4E342E' },
                color: 'white',
                borderRadius: 1
            }}
            >
            ENVIAR SOLICITUD
            </Button>
      </Box>
    </Modal>
  );
};

export default ExchangeModal;
