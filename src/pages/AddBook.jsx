import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import "../styles/AddBook.css";

const AddBook = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    categoria: "",
    imagen: "",
  });

  const auth = getAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Debes estar logueado para agregar un libro.");
        return;
      }

      await addDoc(collection(db, "books"), {
        ...formData,
        usuarioId: user.uid,
        fechaCreacion: serverTimestamp(),
      });

      alert("¡Libro agregado con éxito!");
      setFormData({ titulo: "", autor: "", descripcion: "", categoria: "" });
      navigate("/workspace");
    } catch (error) {
      console.error("Error al agregar libro:", error);
      alert("Ocurrió un error al agregar el libro.");
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
            value={formData.titulo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="autor"
            placeholder="Autor"
            value={formData.autor}
            onChange={handleChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Ficción">Ficción</option>
            <option value="No ficción">No ficción</option>
            <option value="Romance">Romance</option>
            <option value="Suspenso">Suspenso</option>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Infantil">Infantil</option>
            <option value="Autoayuda">Autoayuda</option>
            <option value="Biografía">Biografía</option>
            <option value="Historia">Historia</option>
            <option value="Misterio">Misterio</option>
            <option value="Educativo">Educativo</option>
          </select>

          <div className="add-book-buttons">
            <button type="submit" className="btn-primary">
              Guardar Libro
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/workspace")}
            >
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
