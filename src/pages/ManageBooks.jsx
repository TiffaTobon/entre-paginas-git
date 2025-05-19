import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { getAuth } from "firebase/auth";
import "../styles/UserBooks.css";
import placeholderImage from "../assets/Images/placeholder-book.jpg";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

useEffect(() => {
  const fetchUserBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/mis-libros", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener libros");

      const data = await response.json();
      setBooks(data.datos);
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  };

  fetchUserBooks();
}, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este libro?");
    if (!confirm) return;

    await deleteDoc(doc(db, "books", id));
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="user-books-section">
      <div
        className="manage-books-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Mis Libros</h2>
        <button
          className="btn-secondary"
          onClick={() => navigate("/workspace")}
        >
          ← Volver
        </button>
      </div>

      {books.length > 0 && (
        <button
          className="btn-primary"
          style={{ marginBottom: "20px" }}
          onClick={() => navigate("/add-book")}
        >
          ➕ Agregar Libro
        </button>
      )}

      {books.length === 0 ? (
        <div className="empty-book-card">
          <h3> Aún no tienes libros</h3>
          <p>Haz clic en el botón para agregar tu primer libro.</p>
          <button className="btn-primary" onClick={() => navigate("/add-book")}>
            ➕ Agregar Libro
          </button>
        </div>
      ) : (
        <ul className="user-book-list">
          {books.map((book) => (
            <li key={book.id} className="user-book-card">
              <img
                src={book.imagen ? book.imagen : placeholderImage}
                alt={book.titulo}
                className="bookcards-image"
              />
              <h4>{book.titulo}</h4>
              <p>
                <strong>Autor:</strong> {book.autor}
              </p>
              <p>
                <strong>Categoría:</strong> {book.categoria}
              </p>
              <p>{book.descripcion}</p>
              <div className="user-book-actions">
                <button
                  className="btn-edit"
                  onClick={() => navigate(`/edit-book/${book.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(book.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageBooks;
