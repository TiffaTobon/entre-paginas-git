// src/Pages/AddBook.jsx
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddBook.css"; // crea uno si quieres estilos personalizados

const AddBook = () => {
  const navigate = useNavigate();
  const [usuarioId, setUsuarioId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    autor: "",
    precio: "",
    stock: "",
    imagen: null,
  });

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // ⚠ Este ID DEBE coincidir con el que se usa en tu backend (numérico)
      setUsuarioId(user.uid); // si usas un ID numérico diferente en MySQL, deberías mapearlo
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
    if (!usuarioId) {
      alert("Usuario no autenticado");
      return;
    }

    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("descripcion", formData.descripcion);
    data.append("autor", formData.autor);
    data.append("precio", formData.precio);
    data.append("stock", formData.stock);
    data.append("usuario_id", usuarioId); // este ID debe ser compatible con tu BD
    data.append("imagen", formData.imagen);

    try {
      await axios.post("http://localhost:3000/libros", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Libro agregado correctamente");
      navigate("/"); // redirecciona donde prefieras
    } catch (error) {
      console.error("Error al agregar libro:", error);
      alert("Error al agregar el libro");
    }
  };

  return (
    <div className="add-book-container">
      <h2>Agregar nuevo libro</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input type="text" name="titulo" placeholder="Título" onChange={handleChange} required />
        <input type="text" name="autor" placeholder="Autor" onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} />
        <input type="number" name="precio" placeholder="Precio" onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" onChange={handleChange} required />
        <input type="file" name="imagen" accept="image/*" onChange={handleChange} required />

        <button type="submit" className="btn-primary">Guardar libro</button>
      </form>
    </div>
  );
};

export default AddBook;
