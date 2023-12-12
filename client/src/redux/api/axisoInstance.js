import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        authorization: `Bearer ${token}`,
    },
});


export default axiosInstance;
