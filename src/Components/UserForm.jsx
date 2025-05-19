import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserForm = ({ onSubmit, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    confirmarPassword: "",
    aceptoTerminos: false,
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validar = () => {
    const newErrors = {};
    if (formData.nombres.length < 2) newErrors.nombres = "Nombre inválido";
    if (formData.apellidos.length < 2) newErrors.apellidos = "Apellido inválido";
    if (!formData.email.includes("@")) newErrors.email = "Email inválido";
    if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (formData.password !== formData.confirmarPassword)
      newErrors.confirmarPassword = "Las contraseñas no coinciden";
    if (!formData.aceptoTerminos)
      newErrors.aceptoTerminos = "Debes aceptar los términos";

    setErrores(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      const { confirmarPassword, ...data } = formData;
      onSubmit(data);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Registro
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          error={!!errores.nombres}
          helperText={errores.nombres}
          fullWidth
          InputProps={{ sx: { backgroundColor: "white" } }}
        />

        <TextField
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          error={!!errores.apellidos}
          helperText={errores.apellidos}
          fullWidth
          InputProps={{ sx: { backgroundColor: "white" } }}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errores.email}
          helperText={errores.email}
          fullWidth
          InputProps={{ sx: { backgroundColor: "white" } }}
        />

        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errores.password}
          helperText={errores.password}
          fullWidth
          InputProps={{ sx: { backgroundColor: "white" } }}
        />

        <TextField
          label="Confirmar Contraseña"
          name="confirmarPassword"
          type="password"
          value={formData.confirmarPassword}
          onChange={handleChange}
          error={!!errores.confirmarPassword}
          helperText={errores.confirmarPassword}
          fullWidth
          InputProps={{ sx: { backgroundColor: "white" } }}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="aceptoTerminos"
              checked={formData.aceptoTerminos}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Acepto los términos y condiciones"
        />

        {errores.aceptoTerminos && (
          <Typography variant="caption" color="error">
            {errores.aceptoTerminos}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#6d4c41", '&:hover': { backgroundColor: "#5a3c33" } }}
        >
          Registrar
        </Button>

        <Button
        variant="outlined"
        onClick={() => {
          if (onClose) onClose(); // Cierra el modal si se pasó la prop
          navigate("/");
        }}
      >
        Volver al Inicio
      </Button>
      </Stack>
    </Box>
  );
};

export default UserForm;
