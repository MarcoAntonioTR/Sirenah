import AdminSidebar from "../../components/layout/AdminSidebar";
import { useState, useEffect } from 'react';
import {
    listarProductos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
} from '../../services/productosApi';
import { ListarCategorias } from '../../services/categoriasApi';
import '../../styles/stylesAdm/ATablas.css';
import { useNavigate } from "react-router-dom";
import { AlertaDeEliminacion, AlertaDeError, AlertaDeExito } from '../../utils/Alertas.js'

function Productos() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
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
            AlertaDeError('Error', 'Error al listar productos');
        }
    };

    const fetchCategorias = async () => {
        try {
            const data = await ListarCategorias();
            setCategorias(data);
        } catch (error) {
            console.error(error);
            AlertaDeError('Error', 'Error al listar categorías');
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
                AlertaDeExito('Producto Actualizado', 'El producto ha sido actualizado exitosamente.');
            } catch (error) {
                console.error(error);
                AlertaDeError('Error', 'Error al editar producto');
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
                AlertaDeExito('Producto Añadido', 'El producto ha sido añadido exitosamente.');
            } catch (error) {
                console.error(error);
                AlertaDeError('Error', 'Error al agregar producto');
            }
        }
    };

    const handleDeleteProduct = async (id) => {
        const result = await AlertaDeEliminacion('¿Está seguro de que desea eliminar este producto?', 'Esta acción no se puede deshacer.');
        if (result.isConfirmed) {
            try {
                await eliminarProducto(id);
                fetchProductos();
                AlertaDeExito('Producto Eliminado', 'El producto ha sido eliminado exitosamente.');
            } catch (error) {
                console.error(error);
                AlertaDeError('Error', 'Error al eliminar producto');
            }
        }
    };

    const validateForm = () => {
        if (!productForm.nombre || !productForm.idCategoria || productForm.stock === '' || productForm.precio === '' || productForm.stockMinimo === '' || !productForm.descripcion) {
            AlertaDeError('Error', 'Todos los campos son obligatorios.');
            return false;
        }
        return true;
    };

    const closeModal = () => {
        setModalVisible(false);
        resetProductForm();
    };

    return (
        <div className="Admin-layout">
            <AdminSidebar onCollapseChange={handleCollapseChange} />
            <main className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="header-section">
                    <h1>Gestión de Productos</h1>
                    <button onClick={() => { resetProductForm(); setModalVisible(true); }} className="add-btn1">+ Añadir Producto</button>
                    <button onClick={() => navigate('/MenuAdmin/Categorias')} className="add-btn2">Ir a Categorías</button>
                </div>

                <div className="div-table">
                    {productos.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Descripcion</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Stock Mínimo</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.idProducto}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.idCategoria}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>S/{producto.precio.toFixed(2)}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.stockMinimo}</td>
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
            </main>
        </div>
    );
}

export default Productos;
