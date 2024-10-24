import { useState } from 'react'
import { FaBars, FaTimes, FaHome, FaShoppingBag, FaUsers, FaChartBar, FaCog, FaQuestionCircle, FaUser, FaSignOutAlt } from 'react-icons/fa'
import '../../styles/AdminSidebar.css'
function AdminSidebar() {

    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? <FaBars color="#fff" /> : <FaTimes color="#fff" />}
      </button>
      <div className="logo">
        <h2>{isCollapsed ? '' : 'Sirenah'}</h2>
      </div>
      <nav>
        <ul>
          <li><a href="/MenuAdmin/Dashboard"><FaHome /> <span>Dashboard</span></a></li>
          <li><a href="/MenuAdmin/Productos"><FaShoppingBag /> <span>Productos</span></a></li>
          <li><a href="/MenuAdmin/Clientes"><FaUsers /> <span>Clientes</span></a></li>
          <li><a href="/MenuAdmin/Analiticas"><FaChartBar /> <span>Analíticas</span></a></li>
          <li><a href="/MenuAdmin/Configuracion"><FaCog /> <span>Configuración</span></a></li>
          <li><a href="/MenuAdmin/Ayuda"><FaQuestionCircle /> <span>Ayuda</span></a></li>
          <li className="separator"></li>
          <li><a href="/MenuAdmin/Perfil"><FaUser /> <span>Perfil</span></a></li>
          <li><a href="#logout"><FaSignOutAlt/> <span>Cerrar Sesión</span></a></li>
        </ul>
      </nav>
      </div>
  )
}

export default AdminSidebar
