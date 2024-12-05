import { useNavigate } from "react-router-dom";
import "../../styles/stylesPagos/Success.css";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loanding.jsx";
import { AlertaDeError } from "../../utils/Alertas.js";
import jsPDF from "jspdf";

function Success() {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const idPago = localStorage.getItem("idPago");
    if (!idPago) {
      AlertaDeError(
        "¡Error!",
        "No se encontró un ID de pago en el almacenamiento local."
      );
      setLoading(false);
      return;
    }
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/todosroles/Pago/ObtenerPorId/${idPago}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Error al obtener los detalles del pago: ${response.statusText}`
          );
        }
        const data = await response.json();
        setPaymentDetails(data);

        const clientResponse = await fetch(
          `${import.meta.env.VITE_API}/todosroles/datosPorId/${
            data.pedido.idCliente
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!clientResponse.ok) {
          throw new Error(`Error al obtener los datos del cliente`);
        }
        const clientData = await clientResponse.json();
        setClientData(clientData);
      } catch (err) {
        AlertaDeError("¡Error!", "Error al obtener los detalles");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  const handleBackToMenu = () => {
    localStorage.removeItem("idPago");
    navigate("/MenuCliente/MisCompras");
  };

  const handleDownloadReceipt = () => {
    if (!paymentDetails || !clientData) return;
  
    const {
      idPago,
      tipo,
      idTransaccion,
      moneda,
      fechaPago,
      estado,
      pedido,
    } = paymentDetails;
    const { nombre, apellido, email, telefono, dni } = clientData;
  
    // Datos de la empresa
    const empresa = {
      nombre: "Sirenah",
      direccion: "Urb. Sol de Huacachina H-4, Ica, Peru 1101",
      telefono: "(+51) 930 462 483",
      email: "contacto@sirenah.com",
    };
  
    const pdf = new jsPDF();
  
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Boleta de Pago", 105, 20, null, null, "center");
  
    // Información de la empresa
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    let yPosition = 30;
    pdf.text(empresa.nombre, 20, yPosition);
    yPosition += 8;
    pdf.text(empresa.direccion, 20, yPosition);
    yPosition += 8;
    pdf.text(`Tel: ${empresa.telefono}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Email: ${empresa.email}`, 20, yPosition);
    yPosition += 12;
  
    // Línea divisoria
    pdf.setLineWidth(0.5);
    pdf.line(20, yPosition, 190, yPosition); // Línea horizontal
    yPosition += 8;
  
    // Información General
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`ID Transacción: ${idTransaccion}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Tipo de Pago: ${tipo}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Moneda: ${moneda}`, 20, yPosition);
    yPosition += 8;
    pdf.text(
      `Fecha de Pago: ${new Date(fechaPago).toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 8;
    pdf.text(`Estado: ${estado}`, 20, yPosition);
    yPosition += 8;
  
    // Línea divisoria
    pdf.line(20, yPosition, 190, yPosition);
    yPosition += 8;
  
    // Datos del Cliente
    pdf.setFont("helvetica", "bold");
    pdf.text("Datos del Cliente:", 20, yPosition);
    yPosition += 10;
    pdf.setFont("helvetica", "normal");
    pdf.text(`Nombre: ${nombre} ${apellido}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`DNI: ${dni}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Email: ${email}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Teléfono: ${telefono}`, 20, yPosition);
    yPosition += 12;
  
    // Detalles del Pedido
    pdf.setFont("helvetica", "bold");
    pdf.text("Detalles del Pedido:", 20, yPosition);
    yPosition += 10;
    pdf.setFont("helvetica", "normal");
    pdf.text(`Dirección: ${pedido.direccion}`, 20, yPosition);
    yPosition += 8;
    pdf.text(
      `Fecha del Pedido: ${new Date(pedido.fechaPedido).toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 12;
  
    // Productos (Tabla)
    pdf.setFont("helvetica", "bold");
    pdf.text("Productos:", 20, yPosition);
    yPosition += 10;
  
    // Cabecera de la tabla
    pdf.setFont("helvetica", "normal");
    pdf.setFillColor(200, 220, 255); // Color de fondo de la tabla
    pdf.rect(20, yPosition, 170, 10, "FD"); // Fondo azul claro para la cabecera
    pdf.text("Producto", 22, yPosition + 6);
    pdf.text("Cantidad", 90, yPosition + 6);
    pdf.text("Precio Unitario", 120, yPosition + 6);
    pdf.text("Subtotal", 160, yPosition + 6);
    yPosition += 18;
  
    // Detalles de los productos
    let totalProductos = 0; // Variable para sumar el total de los productos
    pedido.detalles.forEach((detalle) => {
      pdf.text(detalle.nombreProducto, 20, yPosition);
      pdf.text(detalle.cantidad.toString(), 90, yPosition);
      pdf.text(detalle.precioUnitario.toFixed(2), 120, yPosition);
      pdf.text(detalle.subtotal.toFixed(2), 160, yPosition);
      yPosition += 8;
  
      // Sumar el subtotal de cada producto al total
      totalProductos += detalle.subtotal;
    });
  
    // Línea final de la tabla
    pdf.setLineWidth(0.5);
    pdf.line(20, yPosition, 190, yPosition);
  
    // Total de la compra
    yPosition += 10; // Espacio para el total
    pdf.setFont("helvetica", "bold");
    pdf.text("Total de la Compra:", 20, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `${totalProductos.toFixed(2)} ${moneda}`,
      160,
      yPosition,
      null,
      null,
      "right"
    );
  
    // Descargar el archivo PDF
    pdf.save(`Boleta_Pago_${idPago}.pdf`);
  };
  

  if (loading) {
    return (
      <div className="success-container">
        <Loading message="Obteniendo Detalles, por favor espera..." />
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.93 10.933L4.44 8.44a.5.5 0 0 0-.708 0l-.708.708a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .707 0l8-8a.5.5 0 0 0 0-.707l-.707-.708a.5.5 0 0 0-.708 0L6.93 10.933z" />
          </svg>
        </div>
        <h1 className="success-title">¡Transacción Exitosa!</h1>
        <p className="success-message">
          Tu pago se ha procesado correctamente. Gracias por confiar en
          nosotros. A continuación, puedes ver los detalles de tu transacción.
        </p>
        <div className="success-details">
          <p>
            <strong>ID de la transacción:</strong>{" "}
            {paymentDetails.idTransaccion}
          </p>
          <p>
            <strong>Monto:</strong> {paymentDetails.total} PEN
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(paymentDetails.fechaPago).toLocaleDateString()}
          </p>
        </div>
        <div className="success-actions">
          <button
            className="success-button"
            onClick={handleDownloadReceipt}
            disabled={!paymentDetails}
          >
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
