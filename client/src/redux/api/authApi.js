import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const signup = async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}/user/signup`, userData);
        return response.data;  
    } catch (error) {
        console.error('Signup error:', error);
        throw error;  
    }
};

const login = async (userData) =>{
    try {
        const response = await axios.post(`${baseUrl}/user/login`, userData);
        return response.data;  
    } catch (error) {
        console.error('Signup error:', error);
        throw error;  
    }
}

const authApi = {
    signup,
    login
};

export default authApi;
