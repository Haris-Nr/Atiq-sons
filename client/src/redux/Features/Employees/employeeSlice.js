import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "../../api/employeeApi";

const initialState = {
    data: [],
    isError: false,
    isLoading: false,
};

export const getEmployee = createAsyncThunk(
    "user/getemployee",
    async (_, thunkAPI) => {
        try {
            const response = await employeeApi.getEmployee();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    "user/delete",
    async (id, thunkAPI) => {
        try {
            const response = await employeeApi.deleteEmployee(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.employees = action.payload;
            })
            .addCase(getEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.data = action.payload;
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.data = action.payload;
            });
    },
});

export default employeeSlice.reducer;
