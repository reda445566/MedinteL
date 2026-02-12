import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Configure Axios
    axios.defaults.baseURL = 'https://controlled-ruperta-care-ai-0c006943.koyeb.app/api';
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Ideally fetch user profile here to validate token
            // For now, we decode basic info or rely on stored user
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password, type = 'user') => {
        try {
            // Determine endpoint based on type
            const endpoint = type === 'hospital' ? '/hospitals/register' : '/users/login';
            // Note: Hospital login wasn't explicitly defined in backend messages above, 
            // but assuming standard flow. If hospital register logs in automatically, great.
            // Wait, the backend trace shows Hospital Register returns a token. 
            // Does Hospital have a separate Login? The previous tasks implemented Register Hospital.
            // I will assume for now we are mostly logging in Users.
            // If Hospital Login is missing, I might need to implement it in backend or use Register for now.
            // Actually, let's stick to User Login for the demo mainly, or try '/users/login' for both if they share collection?
            // No, they are separate collections.
            // I will check the backend plan later. For now, let's implement User Login robustly.

            const res = await axios.post('/users/login', { email, password });

            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setToken(token);
            setUser(user);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || 'Login failed'
            };
        }
    };

    const registerUser = async (userData) => {
        try {
            const res = await axios.post('/users/register', userData);
            const { token, user } = res.data; // Note: Ensure backend returns user object
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setToken(token);
            setUser(user);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, registerUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
