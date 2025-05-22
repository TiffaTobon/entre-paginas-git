import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BookDetailsModal = ({ open, onClose, book }) => {
  if (!book) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: 500,
          margin: "100px auto",
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 3,
          boxShadow: 24,
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" gutterBottom>
          {book.titulo}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Autor: {book.autor}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {book.descripcion}
        </Typography>
      </Box>
    </Modal>
  );
};

export default BookDetailsModal;
