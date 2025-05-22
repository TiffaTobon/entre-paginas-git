import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../assets/Images/placeholder-book.jpg";
import "../styles/ShoppingCart.css";
import { FiTrash2, FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { Button } from "@mui/material";

const ShoppingCart = ({ onClose }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const itemCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);

  const handleBuy = () => {
    navigate("/pago", {
      state: {
        total,
        items: cartItems,
      },
    });
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(index, newQuantity);
    }
  };

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h2 className="cart-title">
          <FiShoppingCart style={{ marginRight: "8px" }} />
          Carrito de Compras
        </h2>
        {onClose && (
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío.</p>

          <Button
            variant="outlined"
            fullWidth
            onClick={onClose || (() => navigate('/all-books'))}
            sx={{
              fontFamily: 'Outfit, sans-serif',
              padding: "10px 12px",
              marginTop: 2
            }}
          >
            Seguir Comprando
          </Button>

        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((book, index) => (
              <li key={`${book.id}-${index}`} className="cart-item">
                <div className="cart-item-image">
                  <img
                    src={book.image || placeholderImage}
                    alt={book.title}
                    onError={(e) => {
                      e.target.src = placeholderImage;
                    }}
                  />
                </div>
                <div className="cart-item-details">
                  <h4>{book.title}</h4>
                  <p className="author">{book.author}</p>
                  <div className="quantity-control">
                    <button 
                      onClick={() => handleQuantityChange(index, (book.quantity || 1) - 1)}
                      disabled={(book.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span>{book.quantity || 1}</span>
                    <button 
                      onClick={() => handleQuantityChange(index, (book.quantity || 1) + 1)}
                      disabled={(book.quantity || 1) >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <p>
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format(book.price * (book.quantity || 1))}
                  </p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="remove-button"
                    aria-label="Eliminar producto"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Productos ({itemCount}):</span>
              <span>
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(total)}
              </span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(total)}
              </span>
            </div>
          </div>

          <div className="cart-actions">
          <Button
          variant="outlined"
          onClick={clearCart}
          fullWidth
          sx={{
            fontFamily: 'Outfit, sans-serif',
            padding: "10px 16px"
          }}
          disabled={cartItems.length === 0}
        >
          Vaciar carrito
        </Button>

          <Button
            variant="contained"
            onClick={handleBuy}
            fullWidth
            sx={{
              fontFamily: 'Outfit, sans-serif',
              padding: "10px 16px",
              backgroundColor: "#5D4037",
              '&:hover': { backgroundColor: "#4e342e" }
            }}
            disabled={cartItems.length === 0}
          >
            Proceder al pago
          </Button>
</div>

      {onClose && (
        <Button
        variant="outlined"
        fullWidth
        onClick={onClose}
        sx={{
          fontFamily: 'Outfit, sans-serif',
          marginTop: 2,
          padding: "10px 12px"
        }}
      >
        Seguir comprando
      </Button>
      )}

        </>
      )}
    </div>
  );
};

export default ShoppingCart;