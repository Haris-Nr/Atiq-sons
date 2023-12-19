import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";



const initialState = {
    productdata: {},
    fetchProductData:[],
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




export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProductState: (state) => {
            state.productdata = {};
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
    }
})

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;