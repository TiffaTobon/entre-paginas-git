import React, { useEffect, useState } from "react";
import axios from "axios";
import EditBookModal from "./EditBookModal"; // ✅ importar
import "../src/styles/AdminPanel.css";

const AdminBooks = () => {
  const [libros, setLibros] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const obtenerLibros = () => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/libros", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setLibros(res.data.datos))
    .catch(err => console.error("Error al obtener libros:", err));
  };

  useEffect(() => {
    obtenerLibros();
  }, []);

  const handleEliminar = async (id) => {
    const confirm = window.confirm("¿Deseas eliminar este libro?");
    if (!confirm) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/libros/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      obtenerLibros();
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  };

  return (
    <div className="admin-panel-container">
      <h2>Gestión de Libros</h2>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro) => (
              <tr key={libro.id}>
                <td>{libro.id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>${libro.precio}</td>
                <td>
                <div className="action-buttons">
                  <button
                    
                        className="btn-outline-blue"
                        onClick={() => {
                            setSelectedBook(libro);
                            setOpenEditModal(true);
                        }}
                        >
                        Editar
                    </button>
                  <button className="btn-delete" onClick={() => handleEliminar(libro.id)}>
                    Eliminar
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <EditBookModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        libro={selectedBook}
        onUpdate={obtenerLibros}
      />
    </div>
  );
};

export default AdminBooks;
