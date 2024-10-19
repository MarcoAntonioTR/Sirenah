import { useState } from 'react';
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../../styles/Login.css'
export default function Component() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();
        // Lógica para manejar el login
        console.log('Email:', email, 'Password:', password);
        // Simulación de login exitoso
        setSuccess('¡Inicio de sesión exitoso!');
        setError('');
    };

    const alternarVisibilidadPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    return (
        <div className="contenedor-login">
            <form onSubmit={manejarEnvio} className="formulario-login">
                <h2 className="titulo-login">¡Bienvenido de nuevo!</h2>
                <p className="subtitulo-login">Por favor, inicia sesión en tu cuenta</p>

                {/* Campo de Email */}
                <div className="grupo-input">
                    <label className="etiqueta">Correo Electrónico:</label>
                    <div className="input-con-icono">
                        <FaEnvelope className="icono" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu correo"
                            required
                            className="input-login"
                        />
                    </div>
                </div>

                {/* Campo de Contraseña */}
                <div className="grupo-input">
                    <label className="etiqueta">Contraseña:</label>
                    <div className="input-con-icono">
                        <FaLock className="icono" />
                        <input
                            type={mostrarPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            required
                            className="input-login"
                        />
                    </div>
                </div>

                {/* Botón para mostrar/ocultar contraseña */}
                <button
                    type="button"
                    onClick={alternarVisibilidadPassword}
                    className="btn-mostrar-password"
                >
                    {mostrarPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    {mostrarPassword ? ' Ocultar contraseña' : ' Mostrar contraseña'}
                </button>

                {/* Enlace de contraseña olvidada */}
                <div className="forgot-password">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>

                {/* Botón de Login */}
                <button type="submit" className="boton-login">
                    Iniciar sesión
                </button>

                {/* Mensajes de error y éxito */}
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                {/* Login con redes sociales */}
                <div className="social-login">
                    <p>O inicia sesión con:</p>
                    <div className="social-icons">
                        <button type="button"><FaFacebookF /></button>
                        <button type="button"><FaGoogle /></button>
                        <button type="button"><FaTwitter /></button>
                    </div>
                </div>
            </form>
        </div>
    );
}