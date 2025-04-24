import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import "../styles/UserBooks.css";
import placeholderImage from "../assets/Images/placeholder-book.jpg";

const UserBooks = () => {
  const [books, setBooks] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBooks = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "books"),
        where("usuarioId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      const userBooks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBooks(userBooks);
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
            <button
              className="btn-secondary"
              onClick={() => navigate("/manage-books")}
            >
              Ir a Mis Libros
            </button>
          </div>
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

export default UserBooks;
