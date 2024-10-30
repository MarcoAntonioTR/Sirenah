import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Inicio from "../views/Home/Inicio";
import Catalogo from "../views/Home/Catalogo";
import Nosotros from "../views/Home/Nosotros";
import Contacto from "../views/Home/Contacto";
import Login from "../views/Login/Login";
import Registro from "../views/Login/Registro";

import Dashboard from "../views/MenuAdm/Dashboard";
import Productos from "../views/MenuAdm/Productos";
import Clientes from "../views/MenuAdm/Clientes";
import Analiticas from "../views/MenuAdm/Analiticas";
import Configuracion from "../views/MenuAdm/Configuration";
import Ayuda from "../views/MenuAdm/Ayuda";
import Perfil from "../views/MenuAdm/Perfil";

import ProtegerRutas from "./ProtegerRutas";

import UInicio from "../views/MenuUser/Inicio";
import UMisCompras from "../views/MenuUser/MisCompras";
import UCarrito from "../views/MenuUser/Carrito";
import UListaDeseos from "../views/MenuUser/ListaDeseos";
import UDirecciones from "../views/MenuUser/Direcciones";
import UPerfil from "../views/MenuUser/Perfil";
import UAyuda from "../views/MenuUser/Ayuda";

function Rutas() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element=<Inicio /> />
        <Route path="/Catalogo" element=<Catalogo /> />
        <Route path="/Nosotros" element=<Nosotros /> />
        <Route path="/Contacto" element=<Contacto /> />
        <Route path="/Login" element=<Login /> />
        <Route path="/Registro" element=<Registro /> />
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route
          path="/MenuAdmin/Dashboard"
          element={
            <ProtegerRutas allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuAdmin/Productos"
          element={
            <ProtegerRutas allowedRoles={["ADMIN"]}>
              <Productos />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuAdmin/Clientes"
          element={
            <ProtegerRutas allowedRoles={["ADMIN"]}>
              <Clientes />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuAdmin/Analiticas"
          element={
            <ProtegerRutas allowedRoles={["ADMIN"]}>
              <Analiticas />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuAdmin/Configuracion"
          element={
            <ProtegerRutas allowedRoles={["ADMIN"]}>
              <Configuracion />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuAdmin/Ayuda"
          element={
            <ProtegerRutas allowedRoles={["ADMIN"]}>
              <Ayuda />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuAdmin/Perfil"
          element={
            <ProtegerRutas allowedRoles={["ADMIN"]}>
              <Perfil />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuCliente/Inicio"
          element={
            <ProtegerRutas allowedRoles={['USER']}>
              <UInicio />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuCliente/MisCompras"
          element={
            <ProtegerRutas allowedRoles={['USER']}>
              <UMisCompras />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuCliente/Carrito"
          element={
            <ProtegerRutas allowedRoles={['USER']}>
              <UCarrito />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuCliente/ListaDeseos"
          element={
            <ProtegerRutas allowedRoles={['USER']}>
              <UListaDeseos />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuCliente/Direcciones"
          element={
            <ProtegerRutas allowedRoles={['USER']}>
              <UDirecciones />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuCliente/Perfil"
          element={
            <ProtegerRutas allowedRoles={['USER']}>
              <UPerfil />
            </ProtegerRutas>
          }
        />
        <Route
          path="/MenuCliente/Ayuda"
          element={
            <ProtegerRutas allowedRoles={['USER']}>
              <UAyuda />
            </ProtegerRutas>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default Rutas;
