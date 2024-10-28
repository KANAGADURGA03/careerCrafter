import React, { useContext } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const RequireAuth = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (
        auth?.accessToken // Check if the accessToken is present
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;
