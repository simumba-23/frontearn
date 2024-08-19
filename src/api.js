// api.js
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
const API_URL = 'https://earn-app.onrender.com/api'; // Change this to your backend URL

const useAxios = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens?.access}`
        }
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            if (authTokens) {
                config.headers['Authorization'] = `Bearer ${authTokens.access}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const response = await fetch('https://earn-app.onrender.com/api/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refresh: authTokens.refresh })
                });
                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('authTokens', JSON.stringify(data));
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                    return axiosInstance(originalRequest);
                } else {
                    logoutUser();
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxios;
