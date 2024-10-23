import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Inicio from "../views/Home/Inicio";
import Catalogo from "../views/Home/Catalogo";
import Nosotros from "../views/Home/Nosotros";
import Contacto from "../views/Home/Contacto";
import Login from "../views/Login/Login";
import Registro from "../views/Login/Registro";
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
        </Routes>
      </Router>

  );
}

export default Rutas;
