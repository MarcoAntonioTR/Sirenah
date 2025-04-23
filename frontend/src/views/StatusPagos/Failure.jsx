import { useNavigate } from 'react-router-dom';
import '../../styles/stylesPagos/Failure.css';

function Failure() {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/MenuCliente/Carrito');
    };

    return (
        <div className="failure-container">
            <div className="failure-card">
                <div className="failure-icon">❌</div>
                <h1 className="failure-title">Transacción Fallida</h1>
                <p className="failure-message">
                    Lo sentimos, tu pago no pudo ser procesado. Por favor, intenta nuevamente.
                </p>
                <div className="failure-actions">
                    <button className="failure-button" onClick={handleRetry}>
                        Intentar de Nuevo
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Failure;
