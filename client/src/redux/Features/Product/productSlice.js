import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";



const initialState = {
    productdata: {},
    fetchProductData:[],
    SingleProductData:[],
    AllProductData:[],
    deleteProductData:{},
    updateProductData:{},
    productStatusData:{},
    isLoading: false,
};

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (productData, thunkAPI) => {
        try {
            const response = await productApi.addProduct(productData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const Productsbyemployee = createAsyncThunk(
    "product/Productsbyemployee",
    async (productData, thunkAPI) => {
        try {
            const response = await productApi.fetchProductsbyemployee(productData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const SingleProduct = createAsyncThunk (
    "/product/fetchSingleProduct",
    async (id, thunkAPI) => {
        try {
            const response = await productApi.getSingleProduct(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const AllProduct = createAsyncThunk(
    "/product/fetchallProduct",
    async (_, thunkAPI) => {
        try {
            const response = await productApi.getAllProduct();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteProductbyId = createAsyncThunk(
    "product/deleteproductbyid",
    async (id, thunkAPI) => {
        try {
            const response = await productApi.deleteProduct(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (id, thunkAPI) => {
        try {
            const response = await productApi.updateProduct(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const ProductStatus = createAsyncThunk(
    "product/productstatus",
    async ({ id, newStatus },thunkAPI) => {
        try {
            const response = await productApi.changeProductStatus(id,newStatus);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProductState: (state) => {
            state.productdata = {};
        },
        resetDeleteState: (state) => {
            state.deleteProductData = {};
        },
        resetProductStatusState: (state) => {
            state.productStatusData = {};
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productdata = action.payload;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.productdata = action.payload;
            })
            .addCase(Productsbyemployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(Productsbyemployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fetchProductData = action.payload;
            })
            .addCase(Productsbyemployee.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchProductData = action.payload;
            })
            .addCase(SingleProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(SingleProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.SingleProductData = action.payload;
            })
            .addCase(SingleProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.SingleProductData = action.payload;
            })
            .addCase(AllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.AllProductData = action.payload;
            })
            .addCase(AllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.AllProductData = action.payload;
            })
            .addCase(deleteProductbyId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductbyId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteProductData = action.payload;
            })
            .addCase(deleteProductbyId.rejected, (state, action) => {
                state.isLoading = false;
                state.deleteProductData = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateProductData = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.updateProductData = action.payload;
            })
            .addCase(ProductStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ProductStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productStatusData = action.payload;
            })
            .addCase(ProductStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.productStatusData = action.payload;
            })
    }
})

export const { resetProductState,resetDeleteState,resetProductStatusState } = productSlice.actions;
export default productSlice.reducer;