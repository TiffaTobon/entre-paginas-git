import React, { useEffect, useState } from "react";
import "../styles/BookCards.css";
import placeholderImage from "../assets/Images/placeholder-book.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const BookCards = ({ searchTerm, limit, showPagination = true }) => {
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/libros");
        const data = await res.json();
        const allBooks = data.datos || [];

        const filtered = searchTerm
          ? allBooks.filter((book) =>
              book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : allBooks;

        setBooks(limit ? filtered.slice(0, limit) : filtered);
      } catch (error) {
        console.error("Error al cargar libros desde backend:", error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [searchTerm, limit]);

  if (loading) return <p>Cargando libros...</p>;

  return (
    <>
      <ul className="bookcards-list">
        {books.map((book, index) => (
          <li key={index} className="bookcards-item">
            <img
              src={
                book.imagen
                  ? `http://localhost:3000/uploads/${book.imagen}`
                  : placeholderImage
              }
              alt={book.titulo}
              className="bookcards-image"
            />
            <h4>{book.titulo}</h4>
            <p>{book.autor}</p>
            <p className="precio">${book.precio}</p>
            <p className="stock">Stock: {book.stock}</p>
            <button
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) return navigate("/login");

                addToCart({
                  id: book.id,
                  title: book.titulo,
                  author: book.autor,
                  price: book.precio,
                  image: book.imagen
                    ? `http://localhost:3000/uploads/${book.imagen}`
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
    </>
  );
};

export default BookCards;
