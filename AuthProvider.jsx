import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Provide the AuthContext to the rest of the app
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        accessToken: null,
        employerId: null,
        seekerId: null,
    });

    const login = (token, employerId, seekerId, userType) => {
        setAuth({ accessToken: token, employerId, seekerId, userType });
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userType', userType);
        if (employerId) localStorage.setItem('employerId', employerId);
        if (seekerId) localStorage.setItem('seekerId', seekerId);
    };

    const logout = () => {
        setAuth({ accessToken: null, employerId: null, seekerId: null, userType: null });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('employerId');
        localStorage.removeItem('seekerId');
        localStorage.removeItem('userType');
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export useAuth hook
export const useAuth = () => useContext(AuthContext);

// Export the AuthContext
export { AuthContext };
