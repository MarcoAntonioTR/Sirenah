import { useEffect, useState } from "react";
import "../../styles/MiniProfile.css";
import { obtenerDatos } from "../../services/perfil";
import Loading from "../common/Loanding.jsx"; 

function MiniProfile() {
  const [datos, setDatos] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await obtenerDatos();
        setDatos(response); 
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al cargar los datos."); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatos();
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
  if (!datos) {
    return <div className="error-message">No se encontraron datos.</div>;
  }

  // Renderizar el mini perfil con los datos obtenidos
  return (
    <div className="mini-profile">
      <div className="profile-avatar">
        {/* Primera letra del nombre como avatar */}
        <span>{datos.nombre.charAt(0)}</span>
      </div>
      <div className="profile-info">
        <p className="profile-name">{datos.nombre}</p>
        <p className="profile-role">{datos.role}</p>
        <p className="profile-email">{datos.email}</p>
      </div>
    </div>
  );
}

export default MiniProfile;
