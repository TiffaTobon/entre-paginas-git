import React, { useEffect, useState } from "react";
import axios from "axios";
import "../src/styles/AdminPanel.css";

const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:3000/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUsuarios(res.data.datos))
    .catch(err => console.error("Error al obtener usuarios:", err));
  }, []);

  const handleEliminar = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="admin-panel-container">
      <h2>Gestión de Usuarios</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn-edit" onClick={() => alert("Función editar próximamente")}>Editar</button>
                <button className="btn-delete" onClick={() => handleEliminar(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
