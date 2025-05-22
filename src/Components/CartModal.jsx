import React from "react";
import { Modal, Box } from "@mui/material";
import ShoppingCart from "./ShoppingCart"; 

const CartModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 500 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 2,
        }}
      >
        <ShoppingCart onClose={onClose} />
      </Box>
    </Modal>
  );
};

export default CartModal;
