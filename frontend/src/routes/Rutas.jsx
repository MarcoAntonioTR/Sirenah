import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
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
          <Route path="/MenuAdmin/Dashboard" element=<Dashboard />/>
          <Route path="/MenuAdmin/Productos" element=<Productos />/>
          <Route path="/MenuAdmin/Clientes" element=<Clientes />/>
          <Route path="/MenuAdmin/Analiticas" element=<Analiticas />/>
          <Route path="/MenuAdmin/Configuracion" element=<Configuracion />/>
          <Route path="/MenuAdmin/Ayuda" element=<Ayuda />/>
          <Route path="/MenuAdmin/Perfil" element=<Perfil />/>
        </Routes>
      </Router>

  );
}

export default Rutas;
