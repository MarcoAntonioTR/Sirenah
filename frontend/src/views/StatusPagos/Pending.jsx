import { useNavigate } from 'react-router-dom';
import '../../styles/stylesPagos/Pending.css';

function Pending() {
    const navigate = useNavigate();

    const handleCheckStatus = () => {
        navigate('/MenuCliente/Carrito');
    };

    return (
        <div className="pending-container">
            <div className="pending-card">
                <div className="pending-icon">⏳</div>
                <h1 className="pending-title">Transacción en Proceso</h1>
                <p className="pending-message">
                    Tu pago está siendo procesado. Esto puede tardar unos minutos. Por favor, revisa el estado más tarde.
                </p>
                <div className="pending-actions">
                    <button className="pending-button" onClick={handleCheckStatus}>
                        Verificar Estado
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pending;
