import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "../../api/employeeApi";

const initialState = {
    getEmployeedata: [],
    deleteEmployeedata:{},
    changeStatusdata:{},
    employeeDetails:{},
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

export const changeUserStatus = createAsyncThunk(
    "user/changeStatus",
    async ({ id, newStatus },thunkAPI) => {
        try {
            const response = await employeeApi.changeStatus(id,newStatus);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getEmployeeDetails = createAsyncThunk(
    "user/getEmployeeDetails",
    async (id, thunkAPI) => {
        try {
            const response = await employeeApi.getEmployeeDetails(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        resetDeleteState: (state) => {
            state.deleteEmployeedata = {};
        },
        resetStatusState: (state) => {
            state.changeStatusdata = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getEmployeedata = action.payload;
            })
            .addCase(getEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.getEmployeedata = action.error;
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteEmployeedata = action.payload;
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.deleteEmployeedata = action.error;
            })
            .addCase(changeUserStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeUserStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.changeStatusdata = action.payload;
            })
            .addCase(changeUserStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.changeStatusdata = action.error;
            })
            .addCase(getEmployeeDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployeeDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employeeDetails = action.payload;
            })
            .addCase(getEmployeeDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});


export const { resetDeleteState,resetStatusState } = employeeSlice.actions;
export default employeeSlice.reducer;
