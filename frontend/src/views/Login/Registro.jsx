import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaIdCard, FaPhone, FaFacebookF, FaGoogle, FaTwitter, FaTimes } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../../styles/Registro.css';
import { Link } from 'react-router-dom';

function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [errores, setErrores] = useState({});
    const [success, setSuccess] = useState('');

    const manejarRegistro = async (e) => {
        e.preventDefault();
        const newErrores = {};

        
        if (nombre.trim() === '') {
            newErrores.nombre = 'El nombre es obligatorio.';
        } else if (nombre.length < 2) {
            newErrores.nombre = 'El nombre debe tener al menos 2 caracteres.';
        } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(nombre)) {
            newErrores.nombre = 'El nombre solo puede contener letras.';
        }


        if (apellido.trim() === '') {
            newErrores.apellido = 'El apellido es obligatorio.';
        } else if (apellido.length < 2) {
            newErrores.apellido = 'El apellido debe tener al menos 2 caracteres.';
        } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(apellido)) {
            newErrores.apellido = 'El apellido solo puede contener letras.';
        }


        if (email.trim() === '') {
            newErrores.email = 'El correo electrónico es obligatorio.';
        } else {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                newErrores.email = 'El correo electrónico no es válido.';
            }
        }


        if (dni.trim() === '') {
            newErrores.dni = 'El DNI es obligatorio.';
        } else if (!/^\d{8}$/.test(dni)) {
            newErrores.dni = 'El DNI debe tener exactamente 8 dígitos numéricos.';
        }
        if (telefono.trim() === '') {
            newErrores.telefono = 'El número de teléfono es obligatorio.';
        } else if (!/^\d{9}$/.test(telefono)) {
            newErrores.telefono = 'El número de teléfono debe tener 9 dígitos.';
        }


        if (fechaNacimiento.trim() === '') {
            newErrores.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
        } else {
            const today = new Date();
            const birthDate = new Date(fechaNacimiento);
            const eighteenYearsAgo = new Date();
            eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
            if (birthDate > eighteenYearsAgo) {
                newErrores.fechaNacimiento = 'Debes tener al menos 18 años para registrarte.';
            }
        }
        
        if (password.trim() === '') {
            newErrores.password = 'La contraseña es obligatoria.';
        } else if (password.length < 5) {
            newErrores.password = 'La contraseña debe tener al menos 5 caracteres.';
        } else if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            newErrores.password = 'La contraseña debe incluir al menos una letra mayúscula, un número y un carácter especial.';
        }
        if (confirmPassword.trim() === '') {
            newErrores.confirmPassword = 'La confirmación de la contraseña es obligatoria.';
        } else if (password !== confirmPassword) {
            newErrores.confirmPassword = 'Las contraseñas no coinciden.';
        }
        if (Object.keys(newErrores).length > 0) {
            setErrores(newErrores);
            return;
        }
        if (Object.keys(newErrores).length > 0) {
            setErrores(newErrores);
            return;
        }
        setErrores({});

        
        const body = {
            name: nombre,
            email: email,
            password: password,
            role: "USER",
            ourUsers: {
                apellido: apellido,
                dni: dni,
                telefono: telefono,
                fecha_nacimiento: fechaNacimiento, 
            }
        };
        try {
            const response = await fetch('http://localhost:9090/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (data.statuscode === 200) {
                setSuccess('Registro exitoso. Bienvenido!');
                setEmail('');
                setPassword('');
                setNombre('');
                setApellido('');
                setDni('');
                setTelefono('');
                setFechaNacimiento('');
                setConfirmPassword('');
                setErrores('');
            } else if (data.statuscode == 409) {
                setErrores({ global: 'El correo electrónico ya está en uso.' });
                setSuccess('');
            } else if (data.statuscode == 410) {
                setErrores({ global: 'Ya existe un usuario con el mismo DNI.' });
                setSuccess('');
            } else if(data.statuscode === 500) {
                setErrores('Hubo un problema con el servidor. Intenta nuevamente.');
                setSuccess('');
            }
        } catch (error) {
            setSuccess('');
            setErrores({ global: 'Hubo un error al registrar. Intenta nuevamente.' });
        }
    };

    const alternarVisibilidadPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    return (
        <div className="contenedor-registro">
            <button className="btn-close" onClick={() => window.location.href = '/'}>
                <FaTimes className="icon-close" />
            </button>
            <form onSubmit={manejarRegistro} className="formulario-registro">
                <h2 className="titulo-registro">¡Crea tu cuenta!</h2>
                <div className="grupo-input">
                    <label className="etiqueta">Nombre:</label>
                    <div className="input-con-icono">
                        <FaUser className="icono" />
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ingresa tu nombre"
                            className="input-registro"
                        />
                    </div>
                    {errores.nombre && <p className="error-message">{errores.nombre}</p>}
                </div>
                <div className="grupo-input">
                    <label className="etiqueta">Apellido:</label>
                    <div className="input-con-icono">
                        <FaUser className="icono" />
                        <input
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            placeholder="Ingresa tu apellido"
                            className="input-registro"
                        />
                    </div>
                    {errores.apellido && <p className="error-message">{errores.apellido}</p>}
                </div>
                <div className="grupo-input">
                    <label className="etiqueta">Correo Electrónico:</label>
                    <div className="input-con-icono">
                        <FaEnvelope className="icono" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu correo"
                            className="input-registro"
                        />
                    </div>
                    {errores.email && <p className="error-message">{errores.email}</p>}
                </div>
                <div className="grupo-input">
                    <label className="etiqueta">DNI:</label>
                    <div className="input-con-icono">
                        <FaIdCard className="icono" />
                        <input
                            type="text"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            placeholder="Ingresa tu DNI"
                            className="input-registro"
                        />
                    </div>
                    {errores.dni && <p className="error-message">{errores.dni}</p>}
                </div>
                <div className="grupo-input">
                    <label className="etiqueta">Teléfono:</label>
                    <div className="input-con-icono">
                        <FaPhone className="icono" />
                        <input
                            type="tel"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Ingresa tu teléfono"
                            className="input-registro"
                        />
                    </div>
                    {errores.telefono && <p className="error-message">{errores.telefono}</p>}
                </div>
                <div className="grupo-input">
                    <label className="etiqueta">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        className="input-registro"
                    />
                    {errores.fechaNacimiento && <p className="error-message">{errores.fechaNacimiento}</p>}
                </div>
                <div className="grupo-input">
                    <label className="etiqueta">Contraseña:</label>
                    <div className="input-con-icono">
                        <FaLock className="icono" />
                        <input
                            type={mostrarPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            className="input-registro"
                        />
                    </div>
                    {errores.password && <p className="error-message">{errores.password}</p>}
                </div>
                <div className="grupo-input">
                    <label className="etiqueta">Confirmar Contraseña:</label>
                    <div className="input-con-icono">
                        <FaLock className="icono" />
                        <input
                            type={mostrarPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirma tu contraseña"
                            className="input-registro"
                        />
                    </div>
                    {errores.confirmPassword && <p className="error-message">{errores.confirmPassword}</p>}
                </div>
                <button type="button" onClick={alternarVisibilidadPassword} className="btn-mostrar-password">
                    {mostrarPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    {mostrarPassword ? ' Ocultar contraseña' : ' Mostrar contraseña'}
                </button>
                {success && <p className="success-message">{success}</p>}
                {errores.global && <p className="error-message">{errores.global}</p>}
                
                <button type="submit" className="boton-registro">Registrarse</button>
                <p className="parrafo-login">
                    ¿Ya tienes una cuenta? <Link to="/Login">Inicia sesión aquí</Link>
                </p>
                <div className="social-login">
                    <p>O regístrate con:</p>
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

export default Registro;
