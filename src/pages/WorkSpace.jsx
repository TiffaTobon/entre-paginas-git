import { useNavigate } from "react-router-dom";
import React, { useState, useCallback } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import BookCards from "../Components/BookCards";
import ShoppingCart from "./ShoppingCart"; 
import { Modal, Box, useMediaQuery, useTheme } from "@mui/material";
import "../styles/WorkSpace.css";
import "../styles/Header.css";

const WorkSpace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCartModal, setOpenCartModal] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Memoized handlers
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const toggleCartModal = useCallback(() => {
    setOpenCartModal(prev => !prev);
  }, []);

  const navigateToAllBooks = useCallback(() => {
    navigate("/all-books");
  }, [navigate]);

  return (
    <div className="workspace-layout">
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onOpenCart={toggleCartModal}
      />
      
      <div className="workspace-container">
        <Sidebar />
        
        <main className="workspace-content-wrapper">
          <div className="workspace-content">
            <h1 className="workspace-title">Libros Destacados</h1>
            
            <BookCards 
              searchTerm={searchTerm} 
              limit={8} 
              showPagination={false} 
            />

            <div className="view-all-container">
              <button 
                className="btn-secondary view-all-button"
                onClick={navigateToAllBooks}
              >
                Ver todos los libros
              </button>
            </div>
          </div>

          <footer className="workspace-footer">
            <p className="footer-text">
              © {new Date().getFullYear()} Todos los derechos reservados - Entre Páginas
            </p>
          </footer>
        </main>

        {/* Responsive Cart Modal */}
        <Modal 
          open={openCartModal} 
          onClose={toggleCartModal}
          aria-labelledby="shopping-cart-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: isMobile ? "95%" : 500,
              maxWidth: "100%",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
              overflowY: 'auto',
              '&:focus': {
                outline: 'none'
              }
            }}
          >
            <ShoppingCart onClose={toggleCartModal} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default WorkSpace;