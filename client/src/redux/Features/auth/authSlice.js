import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";



const initialState = {
    signupData: {},
    loginData:{},
    isLoading: false,
};

export const signupUser = createAsyncThunk( "user/signup", async (user, thunkAPI) => {
        try {
            return await authApi.signup(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk( "user/login", async (user, thunkAPI) => {
        try {
            const response = await authApi.login(user);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetSignupState: (state) => {
            state.signupData = {};
        },
        resetLoginState: (state) => {
            state.loginData = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.signupData = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.signupData = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loginData = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.loginData = action.payload;
            });
    },
});
export const { resetSignupState,resetLoginState } = authSlice.actions;
export default authSlice.reducer;
