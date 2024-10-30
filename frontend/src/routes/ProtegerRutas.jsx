import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 

// eslint-disable-next-line react/prop-types
const ProtegerRutas = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />;
    }

    let role;
    try {
        const decodedToken = jwtDecode(token);
        role = decodedToken.role; 
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return <Navigate to="/" />;
    }

    // eslint-disable-next-line react/prop-types
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" />; 
    }

    return children;
};

export default ProtegerRutas;
