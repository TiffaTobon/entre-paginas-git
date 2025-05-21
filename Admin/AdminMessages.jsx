import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal } from "@mui/material";

import axios from "axios";

const AdminMessages = () => {
const navigate = useNavigate();
const [mensajes, setMensajes] = useState([]);

  // Cargar todos los mensajes
 useEffect(() => {
  const token = localStorage.getItem("token");
    axios
        .get("http://localhost:3000/mensajes", {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then((res) => setMensajes(res.data))
        .catch((err) => console.error("Error al obtener mensajes:", err));
    }, []);

    //Enviar respuesta
const handleEnviarRespuesta = () => {
  const token = localStorage.getItem("token");

  axios
    .post(
      "http://localhost:3000/mensajes",
      {
        emisor_id: 10, // ID del admin
        receptor_id: mensajeSeleccionado.emisor_id,
        mensaje: respuesta,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      setMensajeSeleccionado(null);
      setRespuesta("");

      // Recargar mensajes
      axios
        .get("http://localhost:3000/mensajes", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setMensajes(res.data));
    })
    .catch((err) => {
      console.error("Error al enviar respuesta:", err);
    });
};

    //eliminar mensajes
  const handleEliminar = (id) => {
        const token = localStorage.getItem("token");

        axios
            .delete(`http://localhost:3000/mensajes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            .then(() => setMensajes(mensajes.filter((m) => m.id !== id)))
            .catch((err) => console.error("Error al eliminar mensaje:", err));
        };
        const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
        const [respuesta, setRespuesta] = useState("");
  return (
  <>
    <Box
      sx={{
        p: 4,
        maxWidth: "1000px",
        margin: "0 auto",
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        mt: 4,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Gestión de Mensajes
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#efddbe" }}>
              <TableCell>ID</TableCell>
              <TableCell>Emisor</TableCell>
              <TableCell>Receptor</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {mensajes.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell>{msg.id}</TableCell>
                <TableCell>{msg.emisor_id}</TableCell>
                <TableCell>{msg.receptor_id}</TableCell>
                <TableCell>{msg.mensaje}</TableCell>
                <TableCell>
                  {new Date(msg.fecha).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#1976d2",
                        borderColor: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#E3F2FD",
                          borderColor: "#1565c0",
                        },
                      }}
                      onClick={() => setMensajeSeleccionado(msg)}
                    >
                      Responder
                    </Button>

                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#5D4037",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#4E342E" },
                      }}
                      onClick={() => {
                        if (
                          window.confirm(
                            "¿Estás seguro de eliminar este mensaje?"
                          )
                        ) {
                          handleEliminar(msg.id);
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    {/* MODAL DE RESPUESTA */}
    <Modal
      open={Boolean(mensajeSeleccionado)}
      onClose={() => {
        setMensajeSeleccionado(null);
        setRespuesta("");
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: { xs: "90%", sm: 400 },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Responder al mensaje
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Escribe tu respuesta..."
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: "#5D4037", color: "#fff" }}
          onClick={handleEnviarRespuesta}
        >
          Enviar Respuesta
        </Button>
      </Box>
    </Modal>
  </>
);

};

export default AdminMessages;
