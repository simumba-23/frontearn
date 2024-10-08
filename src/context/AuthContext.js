import React, { createContext, useState, useEffect, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure you are importing jwt-decode correctly
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data);
            const decodedUser = jwtDecode(data.access);
            setUser(decodedUser);

            if (decodedUser.role.includes('admin')) {
                navigate('/AdminInfo');
            } else if (decodedUser.role.includes('customer')) {
                navigate('/Customer');
            } else {
                navigate('/'); 
            }
        } else {
            if (response.status === 401) {
                if (data.detail === 'This account is banned.') {
                    alert('Your account has been banned. Please contact support.');
                } else if (data.detail === 'This account is suspended.') {
                    alert('Your account has been suspended. Please contact support.');
                } else if (data.detail === 'No active account found with the given credentials') {
                    alert('Please check your credentials.');
                } else {
                    alert('Something went wrong while logging in. Please try again later.');
                }
            } else {
                alert('Something went wrong while logging in. Please try again later.');
            }
        }
    };

    const logoutUser = useCallback((e) => {
        e && e.preventDefault();
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        navigate('/Login');
    }, [navigate]);

    useEffect(() => {
        const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
        const interval = setInterval(() => {
            if (authTokens) {
                const updateToken = async () => {
                    const response = await fetch(`${API_URL}/token/refresh/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ refresh: authTokens?.refresh })
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        setAuthTokens(data);
                        setUser(jwtDecode(data.access));
                        localStorage.setItem('authTokens', JSON.stringify(data));
                    } else {
                        logoutUser();
                    }
            
                    if (loading) {
                        setLoading(false);
                    }
                };
                updateToken();
            }
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [authTokens, loading, logoutUser]);

    useEffect(() => {
        if (authTokens) {
            const decodedUser = jwtDecode(authTokens.access);
            if (decodedUser.status !== 'active') {
                alert(`Your account is currently ${decodedUser.status}. You will be logged out.`);
                logoutUser();
            }
        }
    }, [authTokens, logoutUser]);

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
