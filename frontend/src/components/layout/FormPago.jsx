import { useEffect, useState } from "react";
import "../../styles/FormPago.css";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { obtenerDatos } from "../../services/perfil";
import { useNavigate } from "react-router-dom";
import { AlertaDeError, AlertaDeExito } from "../../utils/Alertas";
import Loading from "../common/Loanding.jsx";

function FormPago() {
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await obtenerDatos();
        if (data) {
          setEmail(data.email);
          setDni(data.dni);
          setId(data.id);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!id) return;

    const initializeMercadoPago = async () => {
      try {
        await loadMercadoPago();
        const mp = new window.MercadoPago(import.meta.env.VITE_TOKEN_MP);

        const cardForm = mp.cardForm({
          amount: "100.5",
          iframe: true,
          form: {
            id: "form-checkout",
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "Número de tarjeta",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "Código de seguridad",
            },
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "Titular de la tarjeta",
            },
            issuer: {
              id: "form-checkout__issuer",
              placeholder: "Banco emisor",
            },
            installments: {
              id: "form-checkout__installments",
              placeholder: "Cuotas",
            },
            identificationType: {
              id: "form-checkout__identificationType",
              placeholder: "Tipo de documento",
            },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
              placeholder: "Número del documento",
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              placeholder: "E-mail",
            },
          },
          callbacks: {
            onFormMounted: (error) => {
              if (error)
                return console.warn("Error al montar el formulario:", error);
              console.log("Formulario montado");
            },
            onSubmit: async (event) => {
              event.preventDefault();
              const {
                paymentMethodId: payment_method_id,
                issuerId: issuer_id,
                cardholderEmail: email,
                amount,
                token,
                installments,
                identificationNumber,
                identificationType,
              } = cardForm.getCardFormData();

              setIsLoading(true);
              try {
                const carritoResponse = await fetch(
                  `${import.meta.env.VITE_API}/todosroles/carrito/obtener/${id}`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
              
                if (!carritoResponse.ok) {
                  throw new Error("Error al obtener el carrito.");
                }
              
                const carritoData = await carritoResponse.json();
              
                
                if (!carritoData || !carritoData.detalles || carritoData.detalles.length === 0) {
                  AlertaDeError(
                    "Carrito vacío o no encontrado",
                    "Por favor, agrega productos antes de proceder con el pago."
                  );
                  return; 
                }
                const response = await fetch(
                  `${import.meta.env.VITE_API}/public/PagarConTarjeta/${id}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      token,
                      issuer_id,
                      payment_method_id,
                      transaction_amount: Number(amount),
                      installments: Number(installments),
                      payer: {
                        email,
                        identification: {
                          type: identificationType,
                          number: identificationNumber,
                        },
                      },
                    }),
                  }
                );

                if (!response.ok) throw new Error("Error al procesar el pago");
                const data = await response.json();
                setIsLoading(false);
                
                if (data.status === "approved") {
                  const transaccion = await fetch(
                    `https://api.mercadopago.com/v1/payments/${data.id}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_MP_TR
                          }`,
                      },
                    }
                  );
                  const dataT = await transaccion.json();

                  const pedido = await fetch(
                    `${import.meta.env.VITE_API}/todosroles/pedidos/Crear`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                      body: JSON.stringify({
                        idCliente: id,
                        direccion: "Ica-Ica",
                        fechaPedido: dataT.date_approved,
                        estado: dataT.status,
                      }),
                    }
                  );

                  const pedidoData = await pedido.json();
                  const datosProducto = dataT.description;

                  const parseDescriptions = (description) => {
                    if (!description || typeof description !== "string") {
                      console.error("La descripción es inválida o está vacía:", description);
                      return [];
                    }

                    try {
                      const products = description.split(";");

                      return products.map((product) => {
                         const idProducto = parseInt(product.match(/ID:\s*(\d+)/)[1]);
                        const nombreProducto = product.match(/,\s*(.+?)\s*\(/)[1];
                        const cantidad = parseInt(product.match(/x(\d+)/)[1]);
                        const precioUnitario = parseFloat(
                          product.match(/Precio Unitario:\s*S\/([\d.]+)/)[1]
                        );
                        const subtotal = parseFloat(
                          product.match(/Subtotal:\s*S\/([\d.]+)/)[1]
                        );

                        return { idProducto, nombreProducto, cantidad, precioUnitario, subtotal };
                      });
                    } catch (error) {
                      console.error("Error al parsear la descripción:", error);
                      return [];
                    }
                  };

                  const parsedData = parseDescriptions(datosProducto);
                  console.log(parsedData);

                  if (parsedData.length === 0) {
                    console.error("No hay productos válidos para procesar.");
                    return;
                  }

                  // Enviar cada producto al backend como parámetros en la URL
                  const requests = parsedData.map((product) => {
                    const url = new URL(`${import.meta.env.VITE_API}/todosroles/DetallePedido/Guardar/${pedidoData.idPedido}`);
                    url.searchParams.append("idProducto", product.idProducto);
                    url.searchParams.append("nombreProducto", product.nombreProducto);
                    url.searchParams.append("cantidad", product.cantidad);
                    url.searchParams.append("precioUnitario", product.precioUnitario);

                    return fetch(url.toString(), {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }).then((response) => response.json());
                  });

                  try {
                    const results = await Promise.all(requests);
                    console.log("Resultados de los productos:", results);
                  } catch (error) {
                    console.error("Error al enviar productos:", error);
                  }

                  const mpago = await fetch(
                    `${import.meta.env.VITE_API}/todosroles/Pago/Guardar`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                      body: JSON.stringify({
                        tipo: dataT.payment_type_id,
                        idTransaccion: data.id,
                        moneda: dataT.currency_id,
                        fechaPago: dataT.date_approved,
                        total: dataT.transaction_amount,
                        estado: dataT.status,
                        pedido: pedidoData,
                      }),
                    }
                  );
                  const mpagodata = await mpago.json();
                  localStorage.setItem("idPago",mpagodata.idPago)
                  AlertaDeExito(
                    "¡Pago aprobado!",
                    " Serás redirigido al menú."
                  );
                  setTimeout(() => {
                    navigate("/PagoExitoso");
                  }, 1000);
                } else if (data.status === "in_process") {
                  AlertaDeError(
                    "¡Tu pago está pendiente!",
                    "Serás redirigido a más información."
                  );
                  setTimeout(() => {
                    navigate("/PagoPendiente");
                  }, 1000);
                } else if (data.status === "rejected") {
                  AlertaDeError(
                    "¡Pago rechazado!",
                    "Por favor, intenta nuevamente."
                  );
                  setTimeout(() => {
                    navigate("/PagoFallido");
                  }, 1000);
                }
              } catch (error) {
                console.error("Error al enviar el formulario:", error);
              } finally {
                setIsLoading(false);
              }
            },
            onFetching: (resource) => {
              console.log("Cargando recurso:", resource);
              const progressBar = document.querySelector(".progress-bar");
              progressBar.removeAttribute("value");
              return () => progressBar.setAttribute("value", "0");
            },
          },
        });
      } catch (error) {
        console.error("Error al inicializar Mercado Pago:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeMercadoPago();
  }, [id]);

  return (
    <div className="payment-form-container">
      {isLoading && <Loading message="Procesando pago, por favor espera..." />}
      <form id="form-checkout" className="form-checkout">
        <h2 style={{ textAlign: "center" }}>Formulario de Pago</h2>
        <div id="form-checkout__cardNumber" className="container"></div>
        <div id="form-checkout__expirationDate" className="container"></div>
        <div id="form-checkout__securityCode" className="container"></div>
        <input
          type="text"
          id="form-checkout__cardholderName"
          className="input-field"
          placeholder="Titular de la tarjeta"
          required
        />
        <select
          id="form-checkout__issuer"
          className="input-field selector"
        ></select>
        <select
          id="form-checkout__installments"
          className="input-field selector"
        ></select>
        <select
          id="form-checkout__identificationType"
          className="input-field selector"
          readOnly
        ></select>
        <input
          type="text"
          id="form-checkout__identificationNumber"
          className="input-field"
          placeholder="Número del documento"
          value={dni}
          readOnly
        />
        <input
          type="email"
          id="form-checkout__cardholderEmail"
          className="input-field"
          placeholder="E-mail"
          value={email}
          readOnly
        />
        <button
          type="submit"
          id="form-checkout__submit"
          className="submit-button"
        >
          Pagar
        </button>
        <progress value="0" className="progress-bar">
          Cargando...
        </progress>
      </form>
    </div>
  );
}

export default FormPago;
