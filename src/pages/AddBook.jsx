import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import axios from "axios";

const AddBook = ({ onClose, onSuccess }) => {
  const [usuarioId, setUsuarioId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    autor: "",
    precio: "",
    imagen: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsuarioId(payload.id);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "imagen") {
      setFormData({ ...formData, imagen: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioId) return alert("Usuario no autenticado");

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("usuario_id", usuarioId);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/libros", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Libro agregado correctamente");
      if (onSuccess) onSuccess(); // recarga libros
      if (onClose) onClose(); 
    } catch (error) {
      console.error("Error al agregar libro:", error);
      alert("Error al agregar el libro");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Agregar Libro
      </Typography>

      <Stack spacing={2}>
        <TextField label="Título" name="titulo" required fullWidth onChange={handleChange} />
        <TextField label="Autor" name="autor" required fullWidth onChange={handleChange} />
        <TextField
          name="descripcion"
          label="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          inputProps={{ maxLength: 150 }}
          helperText={`${formData.descripcion.length}/100 caracteres`}
          multiline
          fullWidth
        />
        <TextField label="Precio (COP)" name="precio" type="number" required fullWidth onChange={handleChange} />
        <Button variant="outlined" component="label">
          Subir Imagen
          <input type="file" name="imagen" hidden accept="image/*" onChange={handleChange} />
        </Button>

        <Button type="submit" variant="contained" sx={{ backgroundColor: "#6d4c41" }}>
          Guardar
        </Button>
        <Button variant="outlined" onClick={onClose}>Volver</Button>
      </Stack>
    </Box>
  );
};

export default AddBook;
