import axiosInstance from './axiosInstance';

const addProduct = async (productData) => {
    try {
        const response = await axiosInstance.post(`product/addproduct`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data
    }
};

const fetchProductsbyemployee = async (productData,page,limit) => {
    try {
        const queryParams = `?page=${page}&limit=${limit}`;
        const response = await axiosInstance.post(`product/fetchProductsbyemployee${queryParams}`, { createdBy: productData });
        return response.data;
    } catch (error) {
        throw error.response.data
    }
};

const getSingleProduct = async (id) => {
    try {
        const response = await axiosInstance.get(`product/fetchSingleProduct/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }

};

const getAllProduct = async () => {
    try {
        const response = await axiosInstance.get(`product/fetchallProduct`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`product/deleteproduct/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const updateProduct = async (id) => {
    try {
        const response = await axiosInstance.patch(`product/updateProduct/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const changeProductStatus = async (id, newStatus) => {
    try {
        const response = await axiosInstance.patch(`product/changeProductStatus/${id}`, { status: newStatus });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getTrackProduct = async (data) => {
    try {
        const response = await axiosInstance.post(`product/trackProduct`,data);
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

const changeTrackStatus = async (id, newStatus) => {
    try {
        const response = await axiosInstance.patch(`product/changeTrackStatus/${id}`, { tracking: newStatus });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getIntrackingProduct = async (productData) => {
    try {
        const {data} = await axiosInstance.post(`product/intrackingProduct`,{ createdBy: productData });
        return data;
    } catch (error) {
        throw error.response.data;
    }
    
};



const productApi = {
    addProduct,
    fetchProductsbyemployee,
    getSingleProduct,
    getAllProduct,
    deleteProduct,
    changeProductStatus,
    updateProduct,
    getTrackProduct,
    changeTrackStatus,
    getIntrackingProduct
};

export default productApi;