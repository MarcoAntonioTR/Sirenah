import AdminSidebar from "../../components/layout/AdminSidebar";
import { useState, useEffect } from 'react';
import {
  ListarCategorias,
  agregarCategoria,
  actualizarCategoria,
  eliminarCategoria
} from '../../services/categoriasApi';
import '../../styles/stylesAdm/ACategorias.css';
import { useNavigate } from "react-router-dom";

function Categorias() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [categoryForm, setCategoryForm] = useState({
    idCategoria: '',
    nombre: '',
    descripcion: ''
  });

  const resetCategoryForm = () => setCategoryForm({
    idCategoria: '',
    nombre: '',
    descripcion: ''
  });

  const handleCollapseChange = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  const fetchCategorias = async () => {
    try {
      const data = await ListarCategorias();
      setCategorias(data);
    } catch (error) {
      console.error(error);
      setError('Error al listar categorías');
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleEditCategory = (categoria) => {
    setCategoryForm(categoria);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (validateForm()) {
      try {
        await actualizarCategoria(categoryForm.idCategoria, categoryForm);
        fetchCategorias();
        closeModal();
      } catch (error) {
        console.error(error);
        setError('Error al editar categoría');
      }
    }
  };

  const handleAddCategory = async () => {
    if (validateForm()) {
      try {
        await agregarCategoria(categoryForm);
        fetchCategorias();
        closeModal();
      } catch (error) {
        console.error(error);
        setError('Error al agregar categoría');
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await eliminarCategoria(id);
      fetchCategorias();
    } catch (error) {
      console.error(error);
      setError('Error al eliminar categoría');
    }
  };

  const validateForm = () => {
    if (!categoryForm.nombre || !categoryForm.descripcion) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    setError('');
    return true;
  };

  const closeModal = () => {
    setModalVisible(false);
    resetCategoryForm();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar onCollapseChange={handleCollapseChange} />
      <main className={`category-content ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="header-section">
          <h1>Gestión de Categorías</h1>
          <button onClick={() => { resetCategoryForm(); setModalVisible(true); }} className="add-category-btn">+ Añadir Categoría</button>
          <button onClick={() => navigate('/MenuAdmin/Productos')} className="go-to-products-btn">Ir a Productos</button>
        </div>

        <div className="category-table">
          {categorias.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.idCategoria}>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion}</td>
                    <td>
                      <button onClick={() => handleEditCategory(categoria)} className="edit-btn">Editar</button>
                      <button onClick={() => handleDeleteCategory(categoria.idCategoria)} className="delete-btn">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay categorías disponibles</p>
          )}
        </div>

        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{categoryForm.idCategoria ? 'Editar Categoría' : 'Añadir Categoría'}</h2>
              <form>
                <label>Nombre</label>
                <input type="text" value={categoryForm.nombre} onChange={(e) => setCategoryForm({ ...categoryForm, nombre: e.target.value })} />
                <label>Descripción</label>
                <textarea value={categoryForm.descripcion} onChange={(e) => setCategoryForm({ ...categoryForm, descripcion: e.target.value })} />
                <div className="modal-actions">
                  <button type="button" onClick={categoryForm.idCategoria ? handleSaveEdit : handleAddCategory} className="save-btn">
                    {categoryForm.idCategoria ? 'Guardar' : 'Añadir'}
                  </button>
                  <button type="button" onClick={closeModal} className="cancel-btn">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </main>
    </div>
  );
}

export default Categorias;
