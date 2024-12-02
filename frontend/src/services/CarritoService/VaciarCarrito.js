import { AlertaDeEliminacion, AlertaDeError, AlertaDeExito } from "../../utils/Alertas.js";
import { obtenerUsuarioId } from "../todosroles.js";
import { eliminarProductosCarrito } from "./DeleteProductoCarrito.js";

export const vaciarCarrito = async (setIsLoading ,setCartItems) => {
    try {
        const userId = await obtenerUsuarioId();
        const token = localStorage.getItem("token");
        if (!token) {
            AlertaDeError("Error","Token de autenticación no disponible.");
            return;
        }
        const confirmacion = await AlertaDeEliminacion("¿Estás seguro de eliminar todos los productos?", "");
        setIsLoading(true);
        if (!confirmacion.isConfirmed) {
            return;
        }
        // Obtener el carrito
        const idCarrito = await fetch(`${import.meta.env.VITE_API}/todosroles/carrito/obtener/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!idCarrito.ok) {
            throw new Error(`Error al obtener el carrito: ${idCarrito.status}`);
        }

        const carritoData = await idCarrito.json();

        for (const item of carritoData.detalles) {
            await eliminarProductosCarrito(item.idCarritoDetalle , setCartItems);
        }
        setIsLoading(false);
        AlertaDeExito("¡Éxito!", "Productos eliminados correctamente.");
        setCartItems([]);
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        alert("Hubo un problema al vaciar el carrito.");
    } finally {
        setIsLoading(false);
    }
};