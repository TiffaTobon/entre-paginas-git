import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import EditProfileModal from "../Components/EditProfileModal";

const EditProfile = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  // Abrir el modal automáticamente al cargar la página
  useEffect(() => {
    setOpenModal(true);
  }, []);

  return (
    <>
      <Header />
      <div className="workspace_container">
        <Sidebar />
        <div className="workspace_content_wrapper">
          {/* Modal que se abre automáticamente */}
          <EditProfileModal
            open={openModal}
            onClose={() => navigate("/workspace")} // Al cerrar, regresar a vista principal
            onSuccess={() => {
              // acción opcional luego de editar
              console.log("Perfil actualizado");
            }}
          />

          <footer className="footer_Workspace">
            <p className="footer_Workspace_text">
              © Todos los derechos reservados - Entre Páginas 2025
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
