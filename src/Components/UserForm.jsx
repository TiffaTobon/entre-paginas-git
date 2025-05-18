import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserForm.css"; 

const UserForm = ({ onSubmit }) => {
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
  <div className="form-container">
    <h2>Registro</h2>
    <form onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label>Nombres:</label>
        <input
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
        />
        {errores.nombres && <p className="error">{errores.nombres}</p>}
      </div>

      <div className="form-group">
        <label>Apellidos:</label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
        />
        {errores.apellidos && <p className="error">{errores.apellidos}</p>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errores.email && <p className="error">{errores.email}</p>}
      </div>

      <div className="form-group">
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errores.password && <p className="error">{errores.password}</p>}
      </div>

      <div className="form-group">
        <label>Confirmar contraseña:</label>
        <input
          type="password"
          name="confirmarPassword"
          value={formData.confirmarPassword}
          onChange={handleChange}
        />
        {errores.confirmarPassword && (
          <p className="error">{errores.confirmarPassword}</p>
        )}
      </div>

        <div className="checkbox-container">
      <input
        type="checkbox"
        id="aceptoTerminos"
        name="aceptoTerminos"
        checked={formData.aceptoTerminos}
        onChange={handleChange}
      />
      <label htmlFor="aceptoTerminos">Acepto los términos y condiciones</label>
    </div>

      <button type="submit" className="btn-primary">
        Registrar
      </button>
      <button
        type="button"
        className="btn-secondary"
        onClick={() => navigate("/")}
      >
        Volver al Inicio
      </button>
    </form>
  </div>
);
};

export default UserForm;