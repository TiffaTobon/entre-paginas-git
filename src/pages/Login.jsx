import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
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
      navigate("/workspace");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error: " + (error.response?.data?.mensaje || error.message));
    }
  };

  return (
    <div className="page">
      <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Ingresar
          </button>
          <Link to="/">
            <button type="button" className="btn-secondary">
              Volver al Inicio
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
