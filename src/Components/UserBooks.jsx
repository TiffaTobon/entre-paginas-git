import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../assets/Images/placeholder-book.jpg";
import "../styles/UserBooks.css";
import BookDetailsModal from "../Components/BookDetailsModal";

const UserBooks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  //Abrir modal con detalles
  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (decoded.email === "adminentrepaginas@gmail.com") {
        setIsAdmin(true);
      }

      const fetchBooks = async () => {
        const res = await fetch("http://localhost:3000/libros/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setBooks(data.datos || []);
      };

      fetchBooks();
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este libro?");
    if (!confirm) return;

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
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isAdmin={isAdmin}
      />
      <div className="workspace-layout">
        <div className="workspace-container">
          <Sidebar isAdmin={isAdmin} />

          <div className="workspace_content_wrapper">
            <div className="user-books-section">
              <h2>Mis Libros</h2>

              {books.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                  <p>No tienes libros agregados.</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      className="btn-primary"
                      onClick={() => navigate("/add-book")}
                    >
                      ➕ Agregar Libro
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="user-book-list">
                  {books.map((book) => (
                    <li key={book.id} className="user-book-card">
                      <img
                        src={
                          book.imagen && book.imagen !== "null" && book.imagen.trim() !== ""
                            ? `http://localhost:3000/uploads/${book.imagen}`
                            : defaultImage
                        }
                        alt={book.titulo}
                        className="bookcards-image"
                        onClick={() => openDetails(book)}
                        style={{ cursor: "pointer" }}
                      />
                      <h4>{book.titulo}</h4>
                      <p>
                        <strong>Autor:</strong> {book.autor}
                      </p>
                      <p>
                        <strong>Precio:</strong> {book.precio}
                      </p>
                      <p
                        onClick={() => openDetails(book)}
                        style={{ cursor: "pointer", textDecoration: "underline", color: "#5D4037" }}
                      >
                        Ver descripción
                      </p>
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

            <footer className="footer_Workspace">
              <p className="footer_Workspace_text">
                © Todos los derechos reservados - Entre Páginas 2025
              </p>
            </footer>
          </div>
        </div>

        <BookDetailsModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          book={selectedBook}
        />
      </div>
    </>
  );
};

export default UserBooks;
