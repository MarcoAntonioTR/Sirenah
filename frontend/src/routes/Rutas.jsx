import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../views/Home/Inicio";
import Catalogo from "../views/Home/Catalogo";
import Nosotros from "../views/Home/Nosotros";
import Contacto from "../views/Home/Contacto";
import Login from "../views/Login/Login";
function Rutas() {
  return (

      <Router>
        <Routes>
          <Route path="/" element=<Inicio /> />
          <Route path="/Catalogo" element=<Catalogo /> />
          <Route path="/Nosotros" element=<Nosotros /> />
          <Route path="/Contacto" element=<Contacto /> />
          <Route path="/Login" element=<Login /> />
        </Routes>
      </Router>

  );
}

export default Rutas;
