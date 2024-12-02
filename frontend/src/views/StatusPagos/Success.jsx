import { useNavigate } from 'react-router-dom';
import '../../styles/stylesPagos/Success.css';

function Success() {
    const navigate = useNavigate();

    const handleBackToMenu = () => {
        navigate('/MenuCliente/MisCompras');
    };

    const handleDownloadReceipt = () => {
        alert("Comprobante descargado."); // Cambia esto por lógica real para descargar
    };

    return (
        <div className="success-container">
            <div className="success-card">
                <div className="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.93 10.933L4.44 8.44a.5.5 0 0 0-.708 0l-.708.708a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .707 0l8-8a.5.5 0 0 0 0-.707l-.707-.708a.5.5 0 0 0-.708 0L6.93 10.933z" />
                    </svg>
                </div>
                <h1 className="success-title">¡Transacción Exitosa!</h1>
                <p className="success-message">
                    Tu pago se ha procesado correctamente. Gracias por confiar en nosotros.
                    A continuación, puedes ver los detalles de tu transacción.
                </p>
                <div className="success-details">
                    <p><strong>ID de la transacción:</strong> #123456789</p>
                    <p><strong>Monto: </strong>  150.00 PEN</p>
                    <p><strong>Fecha: </strong>  01 de diciembre de 2024</p>
                </div>
                <div className="success-actions">
                    <button className="success-button" onClick={handleDownloadReceipt}>
                        Descargar Comprobante
                    </button>
                    <button className="success-button" onClick={handleBackToMenu}>
                        Volver al Menú
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Success;
