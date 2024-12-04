import { useEffect, useState } from "react";
import "../../styles/FormPago.css";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { obtenerDatos } from "../../services/perfil";

function FormPago() {
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await obtenerDatos();
        if (data) {
          setEmail(data.email);
          setDni(data.dni);
          setId(data.id); // Esto actualizará el estado del ID
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    fetchUserData();
  }, []);
  
  useEffect(() => {
    if (!id) return; // No ejecutar si el ID aún no está definido

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

              try {
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

                console.log("Pago exitoso:", await response.json());
              } catch (error) {
                console.error("Error al enviar el formulario:", error);
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
      }
    };

    initializeMercadoPago();
  }, [id]);


  return (
    <div className="payment-form-container">
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
        />
        <select
          id="form-checkout__issuer"
          className="input-field selector"
        ></select>
        <select
          id="form-checkout__installments"
          className="input-field selector"
          disabled
        ></select>
        <select
          id="form-checkout__identificationType"
          className="input-field selector"
        ></select>
        <input
          type="text"
          id="form-checkout__identificationNumber"
          className="input-field"
          placeholder="Número del documento"
          value={dni}
          disabled
        />
        <input
          type="email"
          id="form-checkout__cardholderEmail"
          className="input-field"
          placeholder="E-mail"
          value={email}
          disabled
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
