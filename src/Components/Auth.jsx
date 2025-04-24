// Auth.jsx
import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register.jsx";

const Auth = ({ setMainComponent, defaultMode = "login" }) => {
  // Si defaultMode es "register", iniciamos mostrando el formulario de registro
  const [visRegister, setVisRegister] = useState(defaultMode === "register");

  return (
    <>
      {visRegister ? (
        <Register />
      ) : (
        <Login setVisRegister={setVisRegister} setMainComponent={setMainComponent} />
      )}
    </>
  );
};

export default Auth;
