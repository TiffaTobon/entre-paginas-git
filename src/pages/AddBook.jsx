// src/pages/AddBook.jsx
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddBook.css";

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
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsuarioId(payload.id); //  ID base de datos
      } 
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
    data.append("usuario_id", usuarioId);
    data.append("imagen", formData.imagen);

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:3000/libros", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Libro agregado correctamente");
      navigate("/manage-books");
    } catch (error) {
      console.error("Error al agregar libro:", error);
      alert("Error al agregar el libro");
    }
  };

  return (
    <div className="add-book-wrapper">
      <div className="add-book-container">
        <h2 className="add-book-title">Agregar Libro</h2>
        <form onSubmit={handleSubmit} className="add-book-form">
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="autor"
            placeholder="Autor"
            onChange={handleChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio (COP)"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Cantidad en stock"
            onChange={handleChange}
            required
          />
          <label htmlFor="imagen" style={{ color: "#5D4037", fontWeight: "bold" }}>
            Imagen del libro (jpg, png)
          </label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <div className="add-book-buttons">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/manage-books")}
            >
              Volver
            </button>
            <button type="submit" className="btn-primary">
              Guardar 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
