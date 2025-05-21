import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import BookCards from "../Components/BookCards";
import "../styles/WorkSpace.css";
import { Button } from "@mui/material";

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="workspace_content" style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Todos los Libros</h2>
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
      </div>
    </>
  );
};

export default AllBooks;
