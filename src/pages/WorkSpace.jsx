import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import BookCards from "../Components/BookCards";
import UserBooks from "../Components/UserBooks";
import "../styles/WorkSpace.css";
import "../styles/Header.css";

const WorkSpace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // ⬅️ lo agregas aquí

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="workspace_container">
        <Sidebar />
        <div className="workspace_content_wrapper">
          <div className="workspace_content">
            <h2>Libros Destacados</h2>
            <BookCards searchTerm={searchTerm} limit={8} showPagination={false} />

            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <button className="btn-primary" onClick={() => navigate("/all-books")}>
                Ver todos los libros
              </button>
            </div>

            <UserBooks />
          </div>

          <footer className="footer_Workspace">
            <p className="footer_Workspace_text">
              © Todos los derechos reservados - Entre Páginas 2025
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};
export default WorkSpace;
