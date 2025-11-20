/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
    const [userType, setUserType] = useState(localStorage.getItem('userType'));
    const loginAction = (jwtToken, email, type) => {
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userType', type);
        setToken(jwtToken);
        setUserEmail(email);
        setUserType(type);
    };

    const logoutAction = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userType');
        setToken(null);
        setUserEmail(null);
        setUserType(null);
    };

    return (
        <AuthContext.Provider value={{ token, userEmail, userType, loginAction, logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};