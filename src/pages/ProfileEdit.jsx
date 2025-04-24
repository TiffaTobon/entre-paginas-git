import React from "react";
import UserForm from "../Components/UserForm";
import { useNavigate } from "react-router-dom";
import "../styles/UserForm.css"

const EditProfile = () => {
  const navigate = useNavigate();

  // Ejemplo de datos iniciales que se pueden ajustar para que provengan de Firebase
  const initialData = {
    email: "usuario@example.com",
    nombres: "Juan",
    apellidos: "Pérez",
    fechaNacimiento: "1990/01/01",
    genero: "masculino",
    aceptoTerminos: true,
  };

  const handleEdit = (formData) => {
    // Aquí la lógica para actualizar el perfil
    console.log("Datos actualizados:", formData);
    alert("Perfil actualizado");
    navigate("/workspace"); 
  };

  return (
    <UserForm
      onSubmit={handleEdit}
      mode="edit"
      initialValues={initialData}
    />
  );
};

export default EditProfile;
