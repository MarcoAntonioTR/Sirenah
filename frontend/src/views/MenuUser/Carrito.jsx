import { useEffect, useState } from "react";
import UserSidebar from "../../components/layout/UserSidebar";
import "../../styles/stylesUser/CarritoPanel.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const token = localStorage.getItem("token");
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import Loading from "../../components/common/Loanding.jsx"
import { vaciarCarrito } from "../../services/CarritoService/VaciarCarrito.js";

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function Carrito() {
  initMercadoPago(import.meta.env.VITE_TOKEN_MP , {
    locale: "es-PE"
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [prefId, setPrefId] = useState(null);
  const handleCollapseChange = (collapsed) => {
    setIsCollapsed(collapsed);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const crearPreferencia = async (usuarioId) => {
    try {
      setIsLoading2(true);
      const response = await fetch(`${import.meta.env.VITE_API}/todosroles/mp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Accept' : 'Application/json'
        },
        body: JSON.stringify(usuarioId),
      });

      if (!response.ok) {
        throw new Error(`Error al crear preferencia: ${response.statusText}`);
      }
      const data = await response.text();
      setPrefId(data)
      return data;
    } catch (error) {
      return error;
    } finally {
      setIsLoading2(false);
    }
  };

  const handleBuy = async () => {
    const id = crearPreferencia(usuarioId)
    console.log(id);
  }

  const obtenerUsuarioId = async () => {
    try {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const email = decodedToken.sub;
      const response = await axios.get(
        `${import.meta.env.VITE_API}/todosroles/datos/${email}`
      );
      setUsuarioId(response.data.id);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  const fetchCartItems = async (idUsuario) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/todosroles/carrito/obtener/${idUsuario}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener el carrito");
      }
      const carritoData = await response.json();

      const detallesCarrito = carritoData.detalles || [];
      const productosConDetalles = await Promise.all(
        detallesCarrito.map(async (item) => {
          try {
            const productoResponse = await fetch(
              `${import.meta.env.VITE_API}/todosroles/Productos/Buscar/${item.idProducto}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (!productoResponse.ok) {
              throw new Error(`Error al obtener producto ${item.idProducto}`);
            }

            const productoData = await productoResponse.json();

            return {
              ...item,
              nombre: productoData.nombre,
              imageUrl: productoData.imgUrl,
            };
          } catch (error) {
            console.error(
              `Error al obtener detalles del producto ${item.idProducto}:`,
              error
            );
            return item;
          }
        })
      );
      setCartItems(productosConDetalles);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    } finally {
      setIsLoading(false); // Ocultar el modal de carga
    }
  };
  useEffect(() => {
    obtenerUsuarioId();
  }, []);

  useEffect(() => {
    if (usuarioId) {
      fetchCartItems(usuarioId);
    }
  }, [usuarioId]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0).toFixed(2);
  };


  return (
    <div className="user-layout">
      {isLoading && <Loading message="Cargando datos, por favor espera..." />}
      {isLoading1 && <Loading message="Eliminando productos del carrito." />}
      <UserSidebar onCollapseChange={handleCollapseChange} />
      <main className={`content ${isCollapsed ? "collapsed" : ""}`}>
        <div className="cart-content">
          <h1>Tu Carrito</h1>
          {cartItems.length > 0 ? (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.idCarritoDetalle} className="cart-item">
                    <div className="item-info">
                      <img
                        src={item.imageUrl}
                        alt={`Producto ${item.idProducto}`}
                        className="item-image"
                      />
                      <div className="item-details">
                        <h4>{item.nombre}</h4>
                        <p>Cantidad: {item.cantidad}</p>
                        <p>Precio unitario: ${item.precioUnitario.toFixed(2)}</p>
                        <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <h3>Total: ${calculateTotal()}</h3>
                <div className="cart-actions">
                  <button className="btn-clear" onClick={()=> vaciarCarrito(setIsLoading1,setCartItems)}>Vaciar Carrito</button>
                  <button className="btn-checkout" onClick={handleBuy}>Realizar Compra</button>
                  {
                    prefId && <Wallet initialization={{ preferenceId: prefId }} customization={{ texts: { valueProp: 'ompra rápida y segura' } }} />
                  }
                  
                </div>
              </div>
            </>
          ) : (
            <p>Tu carrito está vacío.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Carrito;
