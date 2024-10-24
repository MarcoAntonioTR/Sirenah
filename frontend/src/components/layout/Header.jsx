import { FaShoppingCart, FaUser, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import "../../styles/Header.css";
import { useState } from "react";

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode", !isDarkMode);
    };

    return (
        <header className={isDarkMode ? "dark-mode" : ""}>
            <nav className="navbar">
                <div className="navbar-container">
                    <button className="hamburger" onClick={toggleMenu}>
                        <FaBars className="icon" />
                    </button>

                    <div className={`nav-menu ${isOpen ? "open" : ""}`}>
                        <button className="nav-item" onClick={toggleTheme}>
                            {isDarkMode ? (
                                <FaSun className="icon" title="Cambiar a Tema Claro" />
                            ) : (
                                <FaMoon className="icon" title="Cambiar a Tema Oscuro" />
                            )}
                        </button>
                        <NavLink style={{ fontSize: '20px' }} to="/Home" className="nav-item" activeClassName="active">
                            Inicio
                        </NavLink>
                        <NavLink
                            style={{ fontSize: '20px' }}
                            to="/Catalogo"
                            className="nav-item"
                            activeClassName="active"
                        >
                            Catálogo
                        </NavLink>
                        <div className="nav-item logo-container">
                            <Link to="/Home" className="company-link">
                                <span className="company-name">SIRENAH</span>
                            </Link>
                        </div>
                        <NavLink
                            style={{ fontSize: '20px' }}
                            to="/Nosotros"
                            className="nav-item"
                            activeClassName="active"
                        >
                            Nosotros
                        </NavLink>
                        <NavLink
                            style={{ fontSize: '20px' }}
                            to="/Contacto"
                            className="nav-item"
                            activeClassName="active"
                        >
                            Contacto
                        </NavLink>
                        <button className="nav-item">
                            <a href="#cart">
                                <FaShoppingCart className="icon" title="Carrito de Compras" />
                            </a>
                        </button>
                        <Link to="/Login" className="nav-item" title="Cuenta">
                            <FaUser className="icon" />
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
