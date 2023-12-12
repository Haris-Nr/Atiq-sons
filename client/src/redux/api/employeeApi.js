import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getEmployee = async () => {
    const response = await axios.get(`${baseUrl}/user/getemployee`);
    return response.data;
};

const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/user/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};

const employeeApi = {
    getEmployee,
    deleteEmployee,
};

export default employeeApi;
