import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AdminUsers from "./AdminUsers";
import AdminBooks from "./AdminBooks";

const AdminPanel = () => {
  const [view, setView] = useState("usuarios");

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "1000px",
        m: "0 auto",
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        mt: 4,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Panel de Administración
      </Typography>

      {/* SOLO dos botones */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
        <Button
          variant={view === "usuarios" ? "contained" : "outlined"}
          onClick={() => setView("usuarios")}
          sx={{
            bgcolor: view === "usuarios" ? "#5D4037" : "",
            color: view === "usuarios" ? "#fff" : "#5D4037",
          }}
        >
          Usuarios
        </Button>

        <Button
          variant={view === "libros" ? "contained" : "outlined"}
          onClick={() => setView("libros")}
          sx={{
            bgcolor: view === "libros" ? "#5D4037" : "",
            color: view === "libros" ? "#fff" : "#5D4037",
          }}
        >
          Libros
        </Button>
      </Box>

      {/* Contenido */}
      {view === "usuarios" ? <AdminUsers /> : <AdminBooks />}
    </Box>
  );
};

export default AdminPanel;
