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

const logout = async (userId) => {
    const {data} = await axiosInstance.post(`user/logout`,{userId});
    return data;
}

const getAllLogs = async (page,limit) => {
    try {
        const queryParams = `?page=${page}&limit=${limit}`;
        const {data} = await axiosInstance.get(`log/logs${queryParams}`);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}


const authApi = {
    signup,
    login,
    currentUser,
    resetPassword,
    logout,
    getAllLogs
};

export default authApi;
