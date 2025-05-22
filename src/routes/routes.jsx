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
import ShoppingCart from "../pages/ShoppingCart";
import Payment from "../pages/Payment";
import AdminUsers from "../../Admin/AdminUsers";
import AdminMessages from "../../Admin/AdminMessages";
import UserBooks from "../Components/UserBooks";



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
      <Route path="/all-books" element={<AllBooks />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/pago" element={<Payment />} />
      <Route path="/user-books" element={<UserBooks />} />
      <Route path="/admin-users" element={<AdminUsers />} />
      <Route path="/admin-messages" element={<AdminMessages />} />
    </Routes>
  );
};

export default RoutesComponent;


