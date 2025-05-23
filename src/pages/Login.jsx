import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { token, usuario } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("usuario_id", usuario.id);

      alert("Inicio de sesión exitoso");
      if (onClose) onClose();
      navigate("/workspace");
    } catch (error) {
      alert("Error: " + (error.response?.data?.mensaje || error.message));
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin}>
      <Typography
              variant="h5"
              align="center"
              sx={{ color: "#5a3c33", fontWeight: "bold", marginBottom: 2 }}
            >
        Iniciar Sesión
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          InputProps={{ sx: { backgroundColor: "white" } }}
        />

        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          InputProps={{ sx: { backgroundColor: "white" } }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#6d4c41", '&:hover': { backgroundColor: "#5a3c33" } }}
        >
          Ingresar
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            if (onClose) onClose();
            navigate("/");
          }}
        >
          Volver al Inicio
        </Button>

        <Typography variant="body2" textAlign="center">
          ¿No tienes cuenta?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              if (onClose) onClose();
              if (onSwitchToRegister) onSwitchToRegister();
            }}
            sx={{ color: "#5D4037", fontWeight: "bold", textDecoration: "underline" }}
          >
            Regístrate
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Login;
