import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import EditProfileModal from "../Components/EditProfileModal";
import bannerLibro from "../assets/Images/bannerlibro.png";
import "../styles/WorkSpace.css";
import "../styles/Header.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(true);
  }, []);

  return (
    <div className="workspace-layout">
  <Header />
  <div className="workspace-container"> 
    <Sidebar />
    <div className="workspace_content_wrapper"> 
      <img
        src={bannerLibro}
        alt="Banner Libros"
        className="workspace_banner"
      />

      <EditProfileModal
        open={openModal}
        onClose={() => navigate("/workspace")}
        onSuccess={() => console.log("Perfil actualizado")}
      />

      <footer className="footer_Workspace">
        <p className="footer_Workspace_text">
          © Todos los derechos reservados - Entre Páginas 2025
        </p>
      </footer>
    </div>
  </div>
</div>
  );
};

export default EditProfile;
