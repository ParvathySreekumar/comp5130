import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if user is logged in
    const [user, setUser] = useState(null); // Stores user details (e.g., email, name)
    const [loading, setLoading] = useState(true); // Tracks if authentication check is in progress

    useEffect(() => {
        // Simulate an API call to check authentication status
        const checkAuthStatus = async () => {
            setLoading(true);
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) {
                console.log('No token found');
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/auth/status', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token in headers
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Auth Status:', data);
                    setIsAuthenticated(true);
                    setUser(data.user); // Update with user info from backend
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    localStorage.removeItem('token'); // Clear token if invalid
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem('token'); // Ensure cleanup on failure
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = (token, userInfo) => {
        // When the user logs in successfully
        console.log('Login Tokennnn:', token);
        console.log('Login User Infoooo:', userInfo);
        localStorage.setItem('token', token); // Save token in localStorage
        setIsAuthenticated(true);
        setUser(userInfo); // Save user details in state
    };

    const logout = () => {
        // When the user logs out
        localStorage.removeItem('token'); // Clear token from localStorage
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
