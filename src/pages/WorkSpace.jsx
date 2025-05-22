import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import BookCards from "../Components/BookCards";
import AdminPanel from "../../Admin/AdminPanel";
import { Modal, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import bannerLibro from "../assets/Images/bannerlibro.png";
import CartModal from "../Components/CartModal";

import "../styles/WorkSpace.css";
import "../styles/Header.css";

const WorkSpace = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchTerm, setSearchTerm] = useState("");
  const [openCartModal, setOpenCartModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminView, setAdminView] = useState("adminPanel");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.email === "adminentrepaginas@gmail.com") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error decodificando token:", error);
      }
    }
  }, []);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const toggleCartModal = useCallback(() => {
    setOpenCartModal((prev) => !prev);
  }, []);

  return (
    <div className="workspace-layout">
      <Header
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isAdmin={isAdmin}
      onOpenCart={() => setOpenCartModal(true)} // importante
    />
       <img
              src={bannerLibro}
              alt="Banner Libros"
              className="workspace_banner"
            />
      <div className="workspace-container">
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
          </div>
        )}
        <CartModal open={openCartModal} onClose={() => setOpenCartModal(false)} />
      </div>
    </div>
  );
};

export default WorkSpace;
