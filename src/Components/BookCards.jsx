import React, { useEffect, useState } from "react";
import "../styles/BookCards.css";
import placeholderImage from "../assets/Images/placeholder-book.jpg";

const BookCards = ({ searchTerm, limit, showPagination = true }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?title=${
            searchTerm || "harry"
          }&page=${page}`
        );
        const data = await response.json();
        setBooks(data.docs.slice(0, 20));
        setInfo({ total: data.numFound });
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [searchTerm, page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  // Limitar libros si se pasa prop "limit"
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
            <p>
              <small>{book.first_publish_year || "Año desconocido"}</small>
            </p>
          </li>
        ))}
      </ul>

      {showPagination && (
        <div className="pagination-buttons">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="pagination-button"
          >
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
