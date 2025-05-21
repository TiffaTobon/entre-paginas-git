import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "../Components/UserForm"; // ajusta la ruta si es diferente

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const { nombres, apellidos, email, password } = formData;
    const nombre = `${nombres} ${apellidos}`.trim();

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        nombre,
        email,
        password,
      });

      const { token, usuario } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("usuario_id", usuario.id);

      alert("Registro exitoso");
      navigate("/workspace");
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error al registrarse: " + (error.response?.data?.mensaje || error.message));
    }
  };

  return (
    <div className="page">
      <UserForm onSubmit={handleRegister} mode="register" />
    </div>
  );
};

export default Register;
