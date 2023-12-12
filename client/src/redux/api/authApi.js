import axisoInstance from './axisoInstance';


const signup = async (userData) => {
    try {
        const response = await axisoInstance.post(`/user/signup`, userData);
        console.log(response.data)
        return response.data;  
    } catch (error) {
        return error.message 
    }
};

const login = async (userData) =>{
    try {
        const response = await axisoInstance.post(`/user/login`, userData);
        return response.data;  
    } catch (error) {
        return error.message 
    }
<<<<<<< HEAD
}
=======
};
>>>>>>> 131a352 (bilal)

const currentUser = async () =>{
    try {
        const response = await axisoInstance.get(`/user/currentuser`);
        return response.data;  
    } catch (error) {
        return error.message
    }
}



const authApi = {
    signup,
    login,
    currentUser
};

export default authApi;
