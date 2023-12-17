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
        return await axiosInstance.post(`user/login`, userData);
}

const currentUser = async () =>{
    try {
        const response = await axiosInstance.get(`user/currentuser`);
        return response.data;  
    } catch (error) {
        throw error.response.data;
    }
}

const resetPassword = async (resetData) =>{
    try {
        const response = await axiosInstance.patch(`user/resetpassword`,resetData);
        return response.data;  
    } catch (error) {
        throw error.response.data;
    }
}

const logout = async () =>{
    const {data} = await axiosInstance.post(`user/resetpassword`);
    return data
}




const authApi = {
    signup,
    login,
    currentUser,
    resetPassword,
    logout
};

export default authApi;
