import React, { useState } from "react";

const UserForm = ({ onSubmit, mode }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "",
    aceptoTerminos: false,
  });

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Función para manejar el submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="registro-container">
      <h2>Registro</h2>
      
      <label htmlFor="email">Correo Electrónico:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <label htmlFor="nombres">Nombres:</label>
      <input
        type="text"
        id="nombres"
        name="nombres"
        value={formData.nombres}
        onChange={handleChange}
      />

      <label htmlFor="apellidos">Apellidos:</label>
      <input
        type="text"
        id="apellidos"
        name="apellidos"
        value={formData.apellidos}
        onChange={handleChange}
      />

      <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
      <input
        type="date"
        id="fechaNacimiento"
        name="fechaNacimiento"
        value={formData.fechaNacimiento}
        onChange={handleChange}
      />

      <label htmlFor="genero">Género:</label>
      <select
        id="genero"
        name="genero"
        value={formData.genero}
        onChange={handleChange}
      >
        <option value="">Selecciona un género</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        <option value="otro">Otro</option>
      </select>

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="aceptoTerminos"
          name="aceptoTerminos"
          checked={formData.aceptoTerminos}
          onChange={handleChange}
        />
        <label htmlFor="aceptoTerminos">
         <a href="/terms">Acepto los términos y condiciones</a>
        </label>
      </div>

      <div className="button-container">
        <button type="submit" className="btn-submit">
          {mode === "register" ? "Registrar" : "Registrar" }
        </button>
      </div>
    </form>
  );
};

export default UserForm;
