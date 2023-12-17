import axiosInstance from './axiosInstance';


const signup = async (userData) => {
    try {
        const {data} = await axiosInstance.post(`user/signup`, userData);
        return data;
    } catch (error) {
        throw error.response.data;
    }
};

const login = async (userData) =>{
    try {
        const response = await axiosInstance.post(`user/login`, userData);
        return response.data;  
    } catch (error) {
        throw error.response.data;
    }
}

const currentUser = async () =>{
    try {
        const response = await axiosInstance.get(`user/currentuser`);
        return response.data;  
    } catch (error) {
        throw error.response.data;
    }
}



const authApi = {
    signup,
    login,
    currentUser
};

export default authApi;
