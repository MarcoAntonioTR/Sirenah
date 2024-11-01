import AdminSidebar from "../../components/layout/AdminSidebar";
import { useState, useEffect } from 'react';
import '../../styles/stylesAdm/APerfil.css';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function Perfil() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [ultimoAcceso, setUltimoAcceso] = useState('');

    const handleCollapseChange = (collapsed) => {
        console.log("El sidebar está colapsado:", collapsed);
        setIsCollapsed(collapsed);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token no encontrado');
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const email = decodedToken.sub;

                const response = await axios.get(`http://localhost:9090/adminuser/datos/${email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUser(response.data);

                const ultimoAccesoPrevio = localStorage.getItem('ultimoAcceso');
                if (ultimoAccesoPrevio) {
                    setUltimoAcceso(ultimoAccesoPrevio);
                } else {
                    setUltimoAcceso('Primera vez');
                }

                // Guardar la fecha y hora del acceso actual en localStorage
                const fechaActual = new Date().toLocaleString();
                localStorage.setItem('ultimoAcceso', fechaActual);

            } catch (error) {
                console.log(error);
                setError('Error al cargar los datos del usuario');
            }
        };

        fetchUserData();
    }, []);

    // Función para mostrar el rol del usuario
    const getRoleDisplayName = (role) => {
        return role === 'ADMIN' ? 'Administrador' : role;
    };

    return (
        <div className="admin-layout">
            <AdminSidebar onCollapseChange={handleCollapseChange} />
            <main className={`profile-content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="welcome-section">
                    <h1>Bienvenido de nuevo</h1>
                    <p className="subtitle">Panel de Control Personal</p>
                </div>

                <div className="profile-grid">
                    {user ? (
                        <>
                            <div className="profile-card main-info">
                                <div className="profile-header">
                                    <div className="profile-avatar">
                                        {user.nombre.charAt(0)}
                                    </div>
                                    <div className="profile-title">
                                        <h2>{user.nombre} {user.apellido}</h2>
                                        <span className="role-badge">{getRoleDisplayName(user.role)}</span>
                                    </div>
                                </div>
                                <div className="profile-stats">
                                    <div className="stat-item">
                                        <span className="stat-label">Miembro desde</span>
                                        <span className="stat-value">{user.fechaUnion || '15 de Enero, 2024'}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Último acceso</span>
                                        <span className="stat-value">{ultimoAcceso}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-card contact-info">
                                <h3>Información de Contacto</h3>
                                <div className="info-item">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">{user.email}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Teléfono</span>
                                    <span className="info-value">{user.telefono}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">DNI</span>
                                    <span className="info-value">{user.dni}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Fecha de Nacimiento</span>
                                    <span className="info-value">{user.fecha_nacimiento}</span>
                                </div>
                            </div>

                            <div className="profile-card quick-actions">
                                <h3>Acciones Rápidas</h3>
                                <div className="action-buttons">
                                    <button className="action-btn">Editar Perfil</button>
                                    <button className="action-btn">Cambiar Contraseña</button>
                                    <button className="action-btn">Configurar Notificaciones</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="loading-message">Cargando datos del usuario...</div>
                    )}
                </div>

                {error && <div className="error-message">{error}</div>}
            </main>
        </div>
    );
}

export default Perfil;
