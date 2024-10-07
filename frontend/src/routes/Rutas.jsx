import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../views/Home/Inicio";
import Catalogo from "../views/Home/Catalogo";
import Nosotros from "../views/Home/Nosotros";
import Contacto from "../views/Home/Contacto";
function Rutas() {
  return (

      <Router>
        <Routes>
          <Route path="/" element=<Inicio /> />
          <Route path="/Catalogo" element=<Catalogo /> />
          <Route path="/Nosotros" element=<Nosotros /> />
          <Route path="/Contacto" element=<Contacto /> />
        </Routes>
      </Router>

  );
}

export default Rutas;
