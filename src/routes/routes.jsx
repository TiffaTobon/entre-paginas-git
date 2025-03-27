import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPanel from "../pages/MainPanel";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProfileEdit from "../pages/ProfileEdit";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPanel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profileEdit" element={<ProfileEdit />} />
    </Routes>
  );
};

export default RoutesComponent;