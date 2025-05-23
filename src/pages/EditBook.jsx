import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    categoria: "",
    imagen: "",
  });

  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          alert("Libro no encontrado");
          navigate("/workspace");
        }
      } catch (error) {
        console.error("Error al cargar libro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    let erroresTemp = {};

    if (formData.titulo.trim().length < 3) {
      erroresTemp.titulo = "El título debe tener al menos 3 caracteres.";
    }

    if (formData.autor.trim().length < 3) {
      erroresTemp.autor = "El autor debe tener al menos 3 caracteres.";
    }

    if (formData.descripcion.trim().length < 10) {
      erroresTemp.descripcion = "La descripción debe tener al menos 10 caracteres.";
    }

    if (!formData.categoria.trim()) {
      erroresTemp.categoria = "La categoría no puede estar vacía.";
    }

    if (
      formData.imagen &&
      !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(formData.imagen.trim())
    ) {
      erroresTemp.imagen = "Debe ser una URL de imagen válida (jpg, png, etc).";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const docRef = doc(db, "books", id);
      await updateDoc(docRef, { ...formData });
      alert("¡Libro actualizado con éxito!");
      navigate("/workspace");
    } catch (error) {
      console.error("Error al actualizar libro:", error);
      alert("Hubo un error al actualizar el libro.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este libro?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "books", id));
      alert("Libro eliminado");
      navigate("/workspace");
    } catch (error) {
      console.error("Error al eliminar libro:", error);
      alert("No se pudo eliminar el libro.");
    }
  };

  if (loading) return <p>Cargando libro...</p>;

  return (
    <div className="add-book-wrapper">
      <div className="add-book-container">
        <h2 className="add-book-title">Editar Libro</h2>
        <form onSubmit={handleUpdate} className="add-book-form">
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
          {errores.titulo && <p className="error">{errores.titulo}</p>}

          <input
            type="text"
            name="autor"
            placeholder="Autor"
            value={formData.autor}
            onChange={handleChange}
            required
          />
          {errores.autor && <p className="error">{errores.autor}</p>}

          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          {errores.descripcion && <p className="error">{errores.descripcion}</p>}

          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
          {errores.categoria && <p className="error">{errores.categoria}</p>}

          <input
            type="text"
            name="imagen"
            placeholder="URL de imagen (opcional)"
            value={formData.imagen}
            onChange={handleChange}
          />
          {errores.imagen && <p className="error">{errores.imagen}</p>}

          <div className="add-book-buttons">
            <button type="submit" className="btn-primary">Guardar Cambios</button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/workspace")}>
              Cancelar
            </button>
            <button type="button" className="btn-delete" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
