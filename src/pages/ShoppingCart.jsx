import React from "react";
import { useCart } from "../context/CartContext";
import placeholderImage from "../assets/Images/placeholder-book.jpg";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="shopping-cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((book, index) => (
              <li key={index} className="cart-item">
                <img src={book.image || placeholderImage} alt={book.title} className="cart-image" />
                <div>
                  <h4>{book.title}</h4>
                  <p>{book.author?.join(", ")}</p>
                  <p><small>{book.year || "Año desconocido"}</small></p>
                </div>
                <button onClick={() => removeFromCart(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} className="clear-cart-button">
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
