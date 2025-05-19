import React, { useEffect, useState } from "react";
import "../styles/BookCards.css";
import placeholderImage from "../assets/Images/placeholder-book.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const BookCards = ({ searchTerm, limit, showPagination = true }) => {
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate(); // Usar navigate para redirigir
  const isLoggedIn = !!localStorage.getItem("token"); // Detectar si está logueado

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?title=${searchTerm || "harry"}&page=${page}`
        );
        const data = await response.json();
        setBooks(data.docs.slice(0, 20));
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [searchTerm, page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const librosAMostrar = limit ? books.slice(0, limit) : books;

  if (loading) return <p>Cargando libros...</p>;

  return (
    <>
      <ul className="bookcards-list">
        {librosAMostrar.map((book, index) => (
          <li key={index} className="bookcards-item">
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : placeholderImage
              }
              alt={book.title}
              className="bookcards-image"
            />
            <h4>{book.title}</h4>
            <p>{book.author_name?.join(", ")}</p>
            <p><small>{book.first_publish_year || "Año desconocido"}</small></p>
            <button
              onClick={() => {
                console.log("Botón clickeado");

                const token = localStorage.getItem("token");
                console.log("Token:", token);

                if (!token) {
                  console.log("No hay token, navegando al login");
                  navigate("/login");
                  return;
                }

                console.log("Token válido, añadiendo al carrito");

                addToCart({
                  title: book.title,
                  author: book.author_name,
                  year: book.first_publish_year,
                  image: book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : placeholderImage,
                });
              }}
              className="buy-button"
            >
              <FaShoppingCart style={{ marginRight: "6px" }} />
              Añadir al carrito
            </button>




          </li>
        ))}
      </ul>

      {showPagination && (
        <div className="pagination-buttons">
          <button onClick={handlePrev} disabled={page === 1} className="pagination-button">
            Anterior
          </button>
          <button onClick={handleNext} className="pagination-button">
            Siguiente
          </button>
        </div>
      )}
    </>
  );
};

export default BookCards;
