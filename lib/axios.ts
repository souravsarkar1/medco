import axios from 'axios';
import { store } from './redux/store';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle token expiration
            if (error.response.data.code === 'TOKEN_EXPIRED') {
                // Dispatch logout action
                store.dispatch({ type: 'auth/logout' });
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;