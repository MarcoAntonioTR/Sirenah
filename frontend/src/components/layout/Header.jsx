import { FaShoppingCart, FaUser, FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';
import { useState } from 'react';


const Header = () => {
    
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false); 

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    return (
        <header className={isDarkMode ? 'dark-mode' : ''}>
            <nav className="navbar">
                <div className="navbar-container">
                    <button className="hamburger" onClick={toggleMenu}>
                        <FaBars className="icon" />
                    </button>

                    <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
                        <button className="nav-item" onClick={toggleTheme}>
                            {isDarkMode ? (
                                <FaSun className="icon" title="Cambiar a Tema Claro" />
                            ) : (
                                <FaMoon className="icon" title="Cambiar a Tema Oscuro" />
                            )}
                        </button>
                        <button className="nav-item">
                            <Link to={'/'}>Inicio</Link>
                        </button>
                        <button className="nav-item">
                            <Link to={'/Catalogo'}>Catálogo</Link>
                        </button>
                        <div className="nav-item logo-container">
                            <Link to={'/'} className="company-link">
                                <span className="company-name">SIRENAH</span>
                            </Link>
                        </div>
                        <button className="nav-item">
                            <Link to={'/Nosotros'}>Nosotros</Link>
                        </button>
                        <button className="nav-item">
                            <Link to={'/Contacto'}>Contacto</Link>
                        </button>
                        <button className="nav-item">
                            <a href="#cart">
                                <FaShoppingCart className="icon" title="Carrito de Compras" />
                            </a>
                        </button>
                        <button className="nav-item" >
                            <FaUser className="icon" title="Cuenta" />
                        </button>
                    </div>
                </div>
            </nav>
            
        </header>
    );
};

export default Header;
