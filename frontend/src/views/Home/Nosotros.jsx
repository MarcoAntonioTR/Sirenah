import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState } from "react";
import "../../styles/Nosotros.css";
import Logo from "../../assets/LOGO-SIRENAH.png";

function Nosotros() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <div className={isDarkMode ? "dark-mode" : ""}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main className={`nosotros ${isDarkMode ? "dark" : "light"}`}>
          <section className="about">
            <div className="about-container">
              <div className="about-text">
                <h2 className="about-title">Nuestra Historia</h2>
                <p>
                  Desde nuestros humildes comienzos, hemos crecido gracias a la
                  confianza de nuestros clientes y la pasión de nuestro equipo.
                  Nos enorgullece ser un referente en el sector, destacándonos
                  por nuestro enfoque único.
                </p>
              </div>
              <div className="about-image">
                <img src={Logo} alt="Nuestra historia" />
              </div>
            </div>
          </section>

          <section className="values">
            <h2 className="values-title">Nuestros Valores</h2>
            <div className="values-grid">
              <div className="value-item">
                <i className="icon fas fa-heart"></i>
                <h3>Pasión</h3>
                <p>Nos impulsa el amor por lo que hacemos.</p>
              </div>
              <div className="value-item">
                <i className="icon fas fa-leaf"></i>
                <h3>Sostenibilidad</h3>
                <p>Nos comprometemos con el cuidado del medio ambiente.</p>
              </div>
              <div className="value-item">
                <i className="icon fas fa-users"></i>
                <h3>Compromiso</h3>
                <p>Estamos dedicados a satisfacer a nuestros clientes.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}

export default Nosotros;
