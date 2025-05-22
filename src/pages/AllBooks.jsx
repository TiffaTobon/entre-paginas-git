import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import BookCards from "../Components/BookCards";
import "../styles/WorkSpace.css";
import "../styles/Header.css"; 
import { Button } from "@mui/material";
import CartModal from "../Components/CartModal";


const AllBooks = () => {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenCart={() => setOpenCartModal(true)}
      />
      <div className="workspace_content" style={{ padding: "20px" }}>
       <h2 style={{ marginBottom: "30px", textAlign: "center", fontSize: "2rem" }}>
          Todos los Libros
        </h2>
        <BookCards searchTerm={searchTerm} showPagination={true} />

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/workspace")}
              >
                Volver Al Inicio
              </Button>
        </div>
         {/* Modal carrito */}
        <CartModal open={openCartModal} onClose={() => setOpenCartModal(false)} />
      </div>
    </>
  );
};

export default AllBooks;
