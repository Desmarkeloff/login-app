import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            // No hay token, redirigir al login
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    return <Outlet />;
};