import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserForm.css"; 

const UserForm = ({ initialValues = {}, onSubmit, mode = "register" }) => {
  const navigate = useNavigate();

  // Inicializa los estados usando los valores iniciales (si existen) o valores vacíos
  const [email, setEmail] = useState(initialValues.email || "");
  const [password, setPassword] = useState(initialValues.password || "");
  const [nombres, setNombres] = useState(initialValues.nombres || "");
  const [apellidos, setApellidos] = useState(initialValues.apellidos || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    initialValues.fechaNacimiento || ""
  );
  const [genero, setGenero] = useState(initialValues.genero || "");
  const [celular, setCelular] = useState(initialValues.celular || "");
  const [direccion, setDireccion] = useState(initialValues.direccion || "");
  const [aceptoTerminos, setAceptoTerminos] = useState(
    initialValues.aceptoTerminos || false
  );

  const [errores, setErrores] = useState({});

  // Función de validación
  const validarFormulario = () => {
    let erroresTemp = {};

    if (nombres.length < 3)
      erroresTemp.nombres = "Debe tener al menos 3 letras";
    if (apellidos.length < 3)
      erroresTemp.apellidos = "Debe tener al menos 3 letras";
    if (!/^\d{10}$/.test(celular))
      erroresTemp.celular = "Debe tener 10 números";
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(fechaNacimiento))
      erroresTemp.fechaNacimiento = "Formato yyyy/mm/dd";
    if (!email.includes("@")) erroresTemp.email = "Correo no válido";
    // Solo validamos contraseña y términos en modo "register"
    if (mode === "register") {
      if (password.length < 6)
        erroresTemp.password = "Debe tener al menos 6 caracteres";
      if (!aceptoTerminos)
        erroresTemp.aceptoTerminos = "Debes aceptar los términos";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      // Se envían todos los datos hacia el padre
      onSubmit({
        email,
        password,
        nombres,
        apellidos,
        fechaNacimiento,
        genero,
        celular,
        direccion,
        aceptoTerminos,
      });
    }
  };

  // Función para limpiar campos
  const limpiarCampos = () => {
    setEmail("");
    setPassword("");
    setNombres("");
    setApellidos("");
    setFechaNacimiento("");
    setGenero("");
    setCelular("");
    setDireccion("");
    setAceptoTerminos(false);
    setErrores({});
  };

  return (
    <div className="registro-container">
      <h2>{mode === "register" ? "Registro" : "Editar Perfil"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombres */}
        <label>Nombres:</label>
        <input
          type="text"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
        {errores.nombres && <p className="error">{errores.nombres}</p>}

        {/* Apellidos */}
        <label>Apellidos:</label>
        <input
          type="text"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
        {errores.apellidos && <p className="error">{errores.apellidos}</p>}

        {/* Email */}
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errores.email && <p className="error">{errores.email}</p>}

        {/* Contraseña solo en registro */}
        {mode === "register" && (
          <>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errores.password && <p className="error">{errores.password}</p>}
          </>
        )}

        {/* Fecha de Nacimiento */}
        <label>Fecha de Nacimiento (YYYY/MM/DD):</label>
        <input
          type="text"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
        {errores.fechaNacimiento && (
          <p className="error">{errores.fechaNacimiento}</p>
        )}

        {/* Género */}
        <label>Género:</label>
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Selecciona</option>
          <option value="femenino">Femenino</option>
          <option value="masculino">Masculino</option>
        </select>

        {/* Celular */}
        <label>Celular:</label>
        <input
          type="text"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
        />
        {errores.celular && <p className="error">{errores.celular}</p>}

        {/* Dirección */}
        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        {/* Aceptar términos solo en registro */}
        {mode === "register" && (
          <>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={aceptoTerminos}
                onChange={(e) => setAceptoTerminos(e.target.checked)}
              />
              Acepto los términos y condiciones
            </label>
            {errores.aceptoTerminos && (
              <p className="error">{errores.aceptoTerminos}</p>
            )}
          </>
        )}

        {/* Botones */}
        <div className="button-container">
          <button type="submit" className="btn-submit">
            {mode === "register" ? "Registrar" : "Guardar cambios"}
          </button>
          <button type="button" className="limpiar" onClick={limpiarCampos}>
            Limpiar Campos
          </button>
          <button
            type="button"
            onClick={() => navigate(mode === "edit" ? "/workspace" : "/")}
          >
            ← Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
