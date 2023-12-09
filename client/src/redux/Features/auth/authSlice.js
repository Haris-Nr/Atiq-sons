import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

const userDefaultState = {
    fullname: null,
    email: null,
    password: null,
    confirmPassword: null,
    phoneNo: null,
    dashboard: null,
};

const initialState = {
    data: userDefaultState,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const signupUser = createAsyncThunk(
    "user/signup",
    async (user, thunkAPI) => {
        try {
            const response = await authApi.signup(user);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkAPI) => {
        try {
            const response = await authApi.login(user);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchUser = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
    try {
        const response = await authApi.currentUser();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.data = action.payload.user;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = action.payload.response.data.success;
                state.message = action.payload.response.data.message;
                state.data = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                localStorage.setItem("token", action.payload.token);
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.data = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = action.payload.response.data.success;
                state.message = action.payload.response.data.message;
            })
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = action.payload && action.payload.success;
                state.message = action.payload && action.payload.message;
                state.data = action.payload && action.payload.data;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = action.payload.response.data.success;
                state.message = action.payload.response.data.message;
            });
    },
});

export default authSlice.reducer;
