import axisoInstance from './axisoInstance';

const getEmployee = async () => {
    try {
        const response = await axisoInstance.get(`/user/getemployee`);
        return response.data;
    } catch (error) {
        return error.message 
    }
    
};

const deleteEmployee = async (id) => {
    try {
        const response = await axisoInstance.delete(`/user/delete/${id}`);
        return response.data;
    } catch (error) {
        return error.message 
    }
};

const employeeApi = {
    getEmployee,
    deleteEmployee,
};

export default employeeApi;
