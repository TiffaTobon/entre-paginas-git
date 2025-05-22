import { useNavigate } from "react-router-dom";
import React, { useState, useCallback } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import BookCards from "../Components/BookCards";
import ShoppingCart from "./ShoppingCart"; 
import { Modal, Box, useMediaQuery, useTheme } from "@mui/material";

import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import BookCards from "../Components/BookCards";
import ShoppingCart from "./ShoppingCart";
import { Modal, Box, Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";

import "../styles/WorkSpace.css";
import "../styles/Header.css";
import AdminPanel from "../../Admin/AdminPanel";
import AdminMessages from "../../Admin/AdminMessages";
import placeholderImage from "../assets/Images/placeholder-book.jpg";

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

  const [showChat, setShowChat] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [adminView, setAdminView] = useState("adminPanel");

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Contenido del token:", decoded); 
      if (decoded.email === "adminentrepaginas@gmail.com") {
        setIsAdmin(true); 
      }
    } catch (error) {
      console.error("Error decodificando token:", error);
    }
  }
}, []);

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

        onSearchChange={setSearchTerm}
        onOpenCart={() => setOpenCartModal(true)}
        isAdmin={isAdmin}
      />
      <div className="workspace_container">
        <Sidebar isAdmin={isAdmin} onSelectView={setAdminView} />

        {isAdmin ? (
        <div className="workspace_content_wrapper">
          {adminView === "adminPanel" && <AdminPanel />}
          {adminView === "adminMessages" && (
            <AdminMessages onVolver={() => setAdminView("adminPanel")} />
          )}
          <footer className="footer_Workspace">
            <p className="footer_Workspace_text">
              © Todos los derechos reservados - Entre Páginas 2025
            </p>
          </footer>
        </div>
      ) : (
          <div className="workspace_content_wrapper">
            <div className="workspace_content">
              <h2 className="workspace-title">Libros Destacados</h2>
              <BookCards searchTerm={searchTerm} limit={8} showPagination={false} />

              <div style={{ textAlign: "center", marginTop: "15px" }}>
                 <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/all-books")}
                    >
                   Ver todos los libros
                  </Button>
              </div>
            </div>

            <footer className="footer_Workspace">
              <p className="footer_Workspace_text">
                © Todos los derechos reservados - Entre Páginas 2025
              </p>
            </footer>

            <Modal open={openCartModal} onClose={() => setOpenCartModal(false)}>
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
                <ShoppingCart onClose={() => setOpenCartModal(false)} />
              </Box>
            </Modal>
          </div>
        )}
         
          

      </div>
    </div>
  );
};

export default WorkSpace;