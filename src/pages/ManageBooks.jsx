import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserBooks.css";
import placeholderImage from "../assets/Images/placeholder-book.jpg";
import AddBook from "./AddBook";
import { Modal, Box } from "@mui/material";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este libro?");
    if (!confirm) return;

    // Eliminar en tu backend (ajústalo si usas Firebase)
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/libros/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  };

  return (
    <div className="user-books-section">
      <div
        className="manage-books-header"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h2>Mis Libros</h2>
        <button className="btn-secondary" onClick={() => navigate("/workspace")}>
          ← Volver
        </button>
      </div>

      <button
        className="btn-primary"
        style={{ marginBottom: "20px" }}
        onClick={() => setOpenAddModal(true)}
      >
        ➕ Agregar Libro
      </button>

      {books.length === 0 ? (
        <div className="empty-book-card">
          <h3> Aún no tienes libros</h3>
          <p>Haz clic en el botón para agregar tu primer libro.</p>
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
              <p><strong>Autor:</strong> {book.autor}</p>
              <p><strong>Categoría:</strong> {book.categoria}</p>
              <p>{book.descripcion}</p>
              <div className="user-book-actions">
                <button className="btn-edit" onClick={() => navigate(`/edit-book/${book.id}`)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(book.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* MODAL DE AGREGAR LIBRO */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddBook
            onClose={() => setOpenAddModal(false)}
            onSuccess={fetchUserBooks} 
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ManageBooks;
