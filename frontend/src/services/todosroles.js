import { jwtDecode } from "jwt-decode";
import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API}/todosroles`;
const token = localStorage.getItem('token');

axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export const obtenerUsuarioId = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token de autenticación no disponible.");
            return;
        }
        const decodedToken = jwtDecode(token);
        const email = decodedToken.sub;

        const response = await axios.get(
            `${BASE_URL}/datos/${email}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.id;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
};