import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Modal, Box, Button } from "@mui/material";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import CartModal from "../Components/CartModal";
import AddBook from "./AddBook";
import EditBookModal from "../../Admin/EditBookModal";
import BookDetailsModal from "../Components/BookDetailsModal";
import bannerLibro from "../assets/Images/bannerlibro.png";
import defaultImage from "../assets/Images/portadaDefecto.png";
import "../styles/UserBooks.css";
import "../styles/WorkSpace.css";
import "../styles/Header.css"; 

const ManageBooks = () => {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
 
  const navigate = useNavigate();

  const fetchUserBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("usuario_id");
      if (!token || !userId) return;

      const res = await fetch(`http://localhost:3000/libros/librosUsuario/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener libros");

      const data = await res.json();
      setBooks(data.datos || []);
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este libro?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/libros/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  };

  const openEditModal = (book) => {
    setBookToEdit(book);
    setEditModalOpen(true);
  };

  const openDetails = (book) => {
  setSelectedBook(book);
  setOpenDetailsModal(true);
};


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (decoded.email === "adminentrepaginas@gmail.com") setIsAdmin(true);
    } catch (e) {
      console.error("Error decodificando token:", e);
    }

    fetchUserBooks();
  }, []);

  return (
    <div className="workspace-layout">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isAdmin={isAdmin}
        onOpenCart={() => setOpenCartModal(true)} 
      />

      <img
        src={bannerLibro}
        alt="Banner Libros"
        className="workspace_banner"
      />

      <div className="workspace-container">
        <Sidebar isAdmin={isAdmin} />

        <div className="workspace_content_wrapper">
          <div className="workspace_content">
            <div className="manage-books-header">
              <h2 className="user-books-title">Mis Libros</h2>
              <div className="manage-books-buttons">
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6d4c41", '&:hover': { bgcolor: "#5d4037" }, mr: 1 }}
                  onClick={() => setOpenAddModal(true)}
                >
                  Agregar Libro
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate("/workspace")}
                >
                  Volver Al Inicio
                </Button>
              </div>
            </div>

            {books.length === 0 ? (
              <div className="empty-book-card">
                <h3>No tienes libros agregados.</h3>
                <p>Haz clic en "Agregar Libro" para crear uno nuevo.</p>
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
                    <p><strong>Autor:</strong> {book.autor}</p>
                    <p><strong>Precio:</strong> {book.precio}</p>
                    <p className={`estado-libro ${book.activo ? 'activo' : 'inactivo'}`}>
                        {book.activo ? 'Disponible' : 'Vendido / No disponible'}
                      </p>
                    <p
                      onClick={() => openDetails(book)}
                      style={{ cursor: "pointer", textDecoration: "underline", color: "#5D4037" }}
                    >
                      Ver descripción
                    </p>
                    <div className="user-book-actions">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => openEditModal(book)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#6d4c41", '&:hover': { bgcolor: "#5d4037" }, mr: 1 }}
                        onClick={() => handleDelete(book.id)}
                      >
                        Eliminar
                      </Button>
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

      {/* Modal de agregar */}
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
          <AddBook onClose={() => setOpenAddModal(false)} onSuccess={fetchUserBooks} />
        </Box>
      </Modal>

      {/* Modal de editar */}
      {bookToEdit && (
        <EditBookModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          libro={bookToEdit}
          onUpdate={fetchUserBooks} 
        />
      )}

      {/* Modal de descripción */}
      <BookDetailsModal
          open={openDetailsModal}
          onClose={() => setOpenDetailsModal(false)}
          book={selectedBook}
        />

      {/* Modal carrito */}
        <CartModal open={openCartModal} onClose={() => setOpenCartModal(false)} />
    </div>
  );
};

export default ManageBooks;
