import axisoInstance from './axisoInstance';

const addProduct = async (productData) => {
    try {
        const response = await axisoInstance.post(`/product/addproduct`, productData);
        return response.data;  
    } catch (error) {
        return error.message 
    }
};


const productApi = {
    addProduct
};

export default productApi;