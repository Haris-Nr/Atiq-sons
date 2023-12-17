import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.authorization = token ? `Bearer ${token}` : '';
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;
