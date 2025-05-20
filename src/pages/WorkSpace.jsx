import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import BookCards from "../Components/BookCards";
import ShoppingCart from "./ShoppingCart";
import { Modal, Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import "../styles/WorkSpace.css";
import "../styles/Header.css";
import AdminPanel from "../../Admin/AdminPanel";

const WorkSpace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCartModal, setOpenCartModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

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
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenCart={() => setOpenCartModal(true)}
        isAdmin={isAdmin}
      />
      <div className="workspace_container">
        <Sidebar isAdmin={isAdmin} />

        {isAdmin ? (
          <div className="workspace_content_wrapper">
            <AdminPanel />
          </div>
        ) : (
          <div className="workspace_content_wrapper">
            <div className="workspace_content">
              <h2 className="workspace-title">Libros Destacados</h2>
              <BookCards searchTerm={searchTerm} limit={8} showPagination={false} />

              <div style={{ textAlign: "center", marginTop: "15px" }}>
                <button className="btn-secondary" onClick={() => navigate("/all-books")}>
                  Ver todos los libros
                </button>
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
    </>
  );
};

export default WorkSpace;
