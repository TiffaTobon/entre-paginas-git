// EditBookModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";


const EditBookModal = ({ open, onClose, libro, onUpdate }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    precio: ""
  });

  useEffect(() => {
    if (libro) {
      setFormData({
        titulo: libro.titulo,
        autor: libro.autor,
        precio: libro.precio
      });
    }
  }, [libro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/libros/${libro.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate(); 
      onClose();  
    } catch (error) {
      console.error("Error al editar libro:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        p: 4
      }}>
        <Typography variant="h6" gutterBottom>Editar Libro</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Título"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Autor"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          type="number"
        />
        <Box sx={{ textAlign: "right", mt: 2 }}>
            <button className="btn-outline-blue" onClick={onClose} style={{ marginRight: "8px" }}>
                Cancelar
            </button>
            <button className="btn-primary-brown" onClick={handleSubmit}>
                Guardar Cambios
            </button>
            </Box>
      </Box>
    </Modal>
  );
};

export default EditBookModal;
