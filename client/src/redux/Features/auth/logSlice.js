import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

const initialState = {
    allLogsData: [],
    isLoading: false,
};

export const allLogs = createAsyncThunk(
    "log/logs",
    async (_, thunkAPI) => {
        try {
            const response = await authApi.getAllLogs();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const logSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allLogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allLogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allLogsData = action.payload;
            })
            .addCase(allLogs.rejected, (state, action) => {
                state.isLoading = false;
                state.allLogsData = action.payload;
            });
    },
});

export default logSlice.reducer;
