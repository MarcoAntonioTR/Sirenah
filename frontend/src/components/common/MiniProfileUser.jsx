import { useEffect, useState } from "react";
import "../../styles/MiniProfileUser.css"; 
import { obtenerDatos } from "../../services/perfil"; 
import Loading from "../common/Loanding.jsx"; 

function MiniProfileUser() {
  const [datosCliente, setDatosCliente] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); // Para manejar el error

  useEffect(() => {
    const fetchDatosCliente = async () => {
      try {
        const response = await obtenerDatos(); // Función para obtener datos del cliente
        setDatosCliente(response);
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
        setError("Error al cargar los datos del cliente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatosCliente();
  }, []);

  // Si está cargando, muestra el componente Loading
  if (isLoading) {
    return <Loading message="Cargando datos, por favor espera..." />;
  }

  // Si hubo un error, muestra el mensaje de error
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Si no hay datos, muestra un mensaje de error
  if (!datosCliente) {
    return <div className="error-message">No se encontraron datos del cliente.</div>;
  }

  // Renderizar el mini perfil del cliente con los datos obtenidos
  return (
    <div className="mini-profile-user">
      <div className="profile-avatar-user">
        <span>{datosCliente.nombre.charAt(0)}</span>
      </div>
      <div className="profile-info-user">
        <p className="profile-name-user">{datosCliente.nombre}</p>
        <p className="profile-email-user">{datosCliente.role}</p>
        <p className="profile-email-user">{datosCliente.email}</p>
      </div>
    </div>
  );
}

export default MiniProfileUser;
