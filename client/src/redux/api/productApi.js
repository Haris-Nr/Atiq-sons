import axiosInstance from './axiosInstance';

const addProduct = async (productData) => {
    try {
        const response = await axiosInstance.post(`/product/addproduct`, productData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;  
    } catch (error) {
        throw error.response.data 
    }
};

const fetchProductsbyemployee = async (productData) => {
    try {
        const response = await axiosInstance.post(`/product/fetchProductsbyemployee`,{createdBy:productData});
        return response.data;  
    } catch (error) {
        throw error.response.data 
    }
};



const productApi = {
    addProduct,
    fetchProductsbyemployee
};

export default productApi;