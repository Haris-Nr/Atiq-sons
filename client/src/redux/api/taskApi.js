import axiosInstance from './axiosInstance';

const addTask = async (taskData) => {
    try {
        console.log(taskData)
        const response = await axiosInstance.post(`task/addtask`, taskData);
        return response.data;  
    } catch (error) {
        throw error.response?.data;
    }
 };


 const fetchTasksForEmployee = async () => {
    try {
        const response = await axiosInstance.get(`task/fetchTaskForEmployee`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
 };



 const taskApi = {
    addTask,
    fetchTasksForEmployee
};

export default taskApi;