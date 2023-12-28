import axiosInstance from './axiosInstance';

const getEmployee = async () => {
    try {
        const {data} = await axiosInstance.get(`user/getemployee`);
        return data;
    } catch (error) {
        throw error.response.data;
    }
    
};

const deleteEmployee = async (id) => {
    try {
        const response = await axiosInstance.delete(`user/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const changeStatus = async (id, newStatus) => {
    try {
        const response = await axiosInstance.patch(`user/changestatus/${id}`,{ status: newStatus });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getEmployeeDetails = async (id) => {
    try {
        const { data } = await axiosInstance.get(`user/getemployeedetails/${id}`);
        return data;
    } catch (error) {
        throw error.response.data;
    }
};

const employeeApi = {
    getEmployee,
    deleteEmployee,
    changeStatus,
    getEmployeeDetails,
};

export default employeeApi;
