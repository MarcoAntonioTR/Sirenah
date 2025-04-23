import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState } from "react";
import "../../styles/Contacto.css";

function Contacto() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <div className={isDarkMode ? "dark-mode" : ""}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main>
          <section className="contact-section">
            <div className="contact-container">
              <div className="contact-header">
                <h1 className="contact-title">Contáctanos</h1>
                <p className="contact-description">
                  ¿Tienes preguntas o comentarios? Estamos aquí para ayudarte.
                </p>
              </div>
              <div className="contact-form-container">
                <form className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Telefono</label>
                    <input
                      type="text"
                      id="text"
                      name="text"
                      placeholder="Tu numero de telefono"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Mensaje</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Tu mensaje"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}

export default Contacto;
