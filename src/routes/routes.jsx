// routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPanel from "../pages/MainPanel";
import Register from "../pages/Register";
import Login from "../pages/Login";
import WorkSpace from "../pages/WorkSpace";
import AddBook from "../pages/AddBook";      
import EditBook from "../pages/EditBook";
import ProfileEdit from "../pages/ProfileEdit";
import AllBooks from "../pages/AllBooks";
import ManageBooks from "../pages/ManageBooks";


const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPanel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/workspace" element={<WorkSpace />} />
      <Route path="/manage-books" element={<ManageBooks />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
      <Route path="/profile-edit" element={<ProfileEdit />} />
    </Routes>
  );
};

export default RoutesComponent;
