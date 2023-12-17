import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";


const initialState = {
    user: {},
    isLoading: false,
};

export const fetchUser = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
    try {
        return await authApi.currentUser();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const fetchSlice = createSlice({
    name: "fetch",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            });
    },
});
export default fetchSlice.reducer;