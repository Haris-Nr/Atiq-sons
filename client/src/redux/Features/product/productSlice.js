import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";



const initialState = {
    data: {},
    isError: false,
    isLoading: false,
};

export const addProduct = createAsyncThunk(
    "addProduct",
    async (productData, thunkAPI) => {
        try {
            const response = await productApi.addProduct(productData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);




export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.data = action.payload;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.data = action.payload;
            })
    }
})


export default productSlice.reducer;