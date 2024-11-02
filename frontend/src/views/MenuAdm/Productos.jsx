import AdminSidebar from "../../components/layout/AdminSidebar";
import { useState, useEffect } from 'react';
import {
    listarProductos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
} from '../../services/productosApi';
import { ListarCategorias } from '../../services/categoriasApi';
import '../../styles/stylesAdm/AProductos.css';
import { useNavigate } from "react-router-dom";

function Productos() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);  
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const [productForm, setProductForm] = useState({
        idProducto: '',
        idCategoria: '',
        nombre: '',
        estado: true,
        stock: '',
        precio: '',
        stockMinimo: '',
        descripcion: ''
    });

    const resetProductForm = () => setProductForm({
        idProducto: '',
        idCategoria: '',
        nombre: '',
        estado: true,
        stock: '',
        precio: '',
        stockMinimo: '',
        descripcion: ''
    });

    const handleCollapseChange = (collapsed) => {
        setIsCollapsed(collapsed);
    };

    const fetchProductos = async () => {
        try {
            const data = await listarProductos();
            setProductos(data);
        } catch (error) {
            console.error(error);
            setError('Error al listar productos');
        }
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
        fetchProductos();
        fetchCategorias(); 
    }, []);

    const handleEditProduct = (producto) => {
        setProductForm(producto);
        setModalVisible(true);
    };

    const handleSaveEdit = async () => {
        if (validateForm()) {
            try {
                await actualizarProducto(productForm.idProducto, {
                    ...productForm,
                    precio: parseFloat(productForm.precio),
                    stock: parseInt(productForm.stock),
                    stockMinimo: parseInt(productForm.stockMinimo),
                });
                fetchProductos();
                closeModal();
            } catch (error) {
                console.error(error);
                setError('Error al editar producto');
            }
        }
    };

    const handleAddProduct = async () => {
        if (validateForm()) {
            try {
                await agregarProducto({
                    ...productForm,
                    precio: parseFloat(productForm.precio),
                    stock: parseInt(productForm.stock),
                    stockMinimo: parseInt(productForm.stockMinimo),
                });
                fetchProductos();
                closeModal();
            } catch (error) {
                console.error(error);
                setError('Error al agregar producto');
            }
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await eliminarProducto(id);
            fetchProductos();
        } catch (error) {
            console.error(error);
            setError('Error al eliminar producto');
        }
    };

    const validateForm = () => {
        if (!productForm.nombre || !productForm.idCategoria || productForm.stock === '' || productForm.precio === '' || productForm.stockMinimo === '' || !productForm.descripcion) {
            setError('Todos los campos son obligatorios.');
            return false;
        }
        setError('');
        return true;
    };

    const closeModal = () => {
        setModalVisible(false);
        resetProductForm();
    };

    return (
        <div className="admin-layout">
            <AdminSidebar onCollapseChange={handleCollapseChange} />
            <main className={`product-content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="header-section">
                    <h1>Gestión de Productos</h1>
                    <button onClick={() => { resetProductForm(); setModalVisible(true); }} className="add-product-btn">+ Añadir Producto</button>
                    <button onClick={() => navigate('/MenuAdmin/Categorias')} className="add-category-btn">Ir a Categorías</button>
                </div>

                <div className="product-table">
                    {productos.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.idProducto}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.idCategoria}</td>
                                        <td>S/ {producto.precio.toFixed(2)}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.estado ? 'Activo' : 'Inactivo'}</td>
                                        <td>
                                            <button onClick={() => handleEditProduct(producto)} className="edit-btn">Editar</button>
                                            <button onClick={() => handleDeleteProduct(producto.idProducto)} className="delete-btn">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay productos disponibles</p>
                    )}
                </div>

                {modalVisible && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>{productForm.idProducto ? 'Editar Producto' : 'Añadir Producto'}</h2>
                            <form>
                                <label>Nombre</label>
                                <input type="text" value={productForm.nombre} onChange={(e) => setProductForm({ ...productForm, nombre: e.target.value })} />

                                <label>Categoría</label>
                                <select className="select-style " value={productForm.idCategoria} onChange={(e) => setProductForm({ ...productForm, idCategoria: e.target.value })}>
                                    <option value="">Seleccione una categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombre}</option>
                                    ))}
                                </select>

                                <label>Precio</label>
                                <input type="number" value={productForm.precio} onChange={(e) => setProductForm({ ...productForm, precio: e.target.value })} />
                                <label>Stock</label>
                                <input type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} />
                                <label>Stock Mínimo</label>
                                <input type="number" value={productForm.stockMinimo} onChange={(e) => setProductForm({ ...productForm, stockMinimo: e.target.value })} />
                                <label>Descripción</label>
                                <textarea value={productForm.descripcion} onChange={(e) => setProductForm({ ...productForm, descripcion: e.target.value })} />
                                <div className="modal-actions">
                                    <button type="button" onClick={productForm.idProducto ? handleSaveEdit : handleAddProduct} className="save-btn">
                                        {productForm.idProducto ? 'Guardar' : 'Añadir'}
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

export default Productos;
