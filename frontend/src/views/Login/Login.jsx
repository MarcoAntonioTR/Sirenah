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

    const manejarEnvio = async (e) => {
        e.preventDefault();

        // Expresión regular para validar el formato de email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validación del formato de correo electrónico
        if (!regexEmail.test(email)) {
            setError('Por favor, ingresa un correo electrónico válido.');
            setSuccess('');
            return;
        }

        // Validación de longitud mínima de la contraseña
        if (password.length < 3) {
            setError('La contraseña debe tener al menos 5 caracteres.');
            setSuccess('');
            return;
        }

        try {
            
            const response = await fetch('http://localhost:9090/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('¡Inicio de sesión exitoso!');
                setError('');
            } else {
                setError(data.message || 'Error en el inicio de sesión.');
                setSuccess('');
            }
        } catch (setError) {
            setError('Hubo un problema con el servidor. Intenta nuevamente.');
            setSuccess('');
        }
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