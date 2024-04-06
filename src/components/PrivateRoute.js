import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../const';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }

                // Make a request to your backend to verify the token
                const response = await axios.post(
                    `${BASE_URL}/auth/verify-token`,
                    null,
                    {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                      },
                    }
                  );

                if (response.data.valid) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('accessToken'); 
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;