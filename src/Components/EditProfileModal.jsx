import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserForm from "./UserForm";

const EditProfileModal = ({ open, onClose, onSuccess }) => {
  const [initialData, setInitialData] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("usuario_id");

  useEffect(() => {
    if (!open) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/usuarios/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { nombre, email } = response.data;
        setInitialData({
          nombres: nombre,
          email,
          password: "",
          confirmarPassword: "",
          aceptoTerminos: true,
        });
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUser();
  }, [open, token, userId]);

  const handleEdit = async (formData) => {
    try {
      const payload = {
        nombre: formData.nombres,
        email: formData.email,
      };

      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      await axios.put(`http://localhost:3000/usuarios/${userId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Perfil actualizado con éxito.");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al actualizar usuario:", error.response?.data || error.message);
      alert("Error al actualizar usuario.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: 500,
          margin: "80px auto",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 4,
          boxShadow: 24,
          position: "relative"
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {initialData ? (
          <UserForm
            onSubmit={handleEdit}
            mode="edit"
            initialValues={initialData}
          />
        ) : (
          <Typography>Cargando datos...</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
