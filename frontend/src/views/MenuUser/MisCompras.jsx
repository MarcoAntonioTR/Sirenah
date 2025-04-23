import { useState, useEffect } from "react";
import UserSidebar from "../../components/layout/UserSidebar";
import MiniProfileUser from "../../components/common/MiniProfileUser";
import { obtenerUsuarioId } from "../../services/todosroles";
import Loading from "../../components/common/Loanding";
import "../../styles/stylesAdm/ATablas.css"; 
import jsPDF from "jspdf";

function MisCompras() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pagos, setPagos] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null); 

  const handleCollapseChange = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  useEffect(() => {
    const fetchUsuarioId = async () => {
      try {
        const id = await obtenerUsuarioId();
        setUsuarioId(id);
      } catch (error) {
        console.error("Error al obtener el ID de usuario:", error);
      }
    };

    fetchUsuarioId();
  }, []);

  useEffect(() => {
    setIsLoading(true)
    if (usuarioId) {
      const obtenerPagos = async () => {
        try {
          const token = localStorage.getItem("token"); // Obtener el token de autorización
          if (!token) {
            throw new Error("Token de autenticación no disponible.");
          }

          const response = await fetch(
            `${
              import.meta.env.VITE_API
            }/todosroles/Pago/ObtenerPorCliente/${usuarioId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al obtener los pagos");
          }

          const data = await response.json();
          setPagos(data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false);
        }
      };

      obtenerPagos();
    }
  }, [usuarioId]);

  const descargarBoleta = async (id) => {
    try {
      setIsLoading(true); // Inicia la carga

      // Obtener los detalles del pago por su ID
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          import.meta.env.VITE_API
        }/todosroles/Pago/ObtenerPorId/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los detalles del pago");
      }

      const pago = await response.json();
      
      const { idPago, tipo, idTransaccion, moneda, fechaPago, estado, pedido } = pago;
      
      const datosC = await fetch(
        `${
          import.meta.env.VITE_API
        }/todosroles/datosPorId/${pedido.idCliente}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!datosC.ok) {
        throw new Error("Error al datos del cliente");
      }

      const datos = await datosC.json();
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
      pdf.text(`Nombre: ${datos.nombre} ${datos.apellido}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`DNI: ${datos.dni}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Email: ${datos.email}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Teléfono: ${datos.telefono}`, 20, yPosition);
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
    } catch (error) {
      console.error("Error al descargar la boleta:", error);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  return (
    <div className="Admin-layout">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 20px",
        }}
      >
        <MiniProfileUser />
      </div>
      <UserSidebar onCollapseChange={handleCollapseChange} />
      <main
        style={{ marginTop: "0px" }}
        className={`content ${isCollapsed ? "collapsed" : ""}`}
      >
        <div className="header-section">
          <h1>Mis Compras</h1>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="div-table">
            <h3>Pagos Realizados</h3>
            {pagos.length === 0 ? (
              <p>No se encontraron pagos.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID Transacción</th>
                    <th>Fecha de Pago</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((pago) => (
                    <tr key={pago.idPago}>
                      <td>{pago.idTransaccion}</td>
                      <td>{new Date(pago.fechaPago).toLocaleString()}</td>
                      <td>{pago.estado}</td>
                      <td>
                        {pago.total} {pago.moneda}
                      </td>
                      <td>
                        <button
                          onClick={() => descargarBoleta(pago.idPago)} 
                          className="download-btn"
                        >
                          Descargar Boleta
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default MisCompras;
