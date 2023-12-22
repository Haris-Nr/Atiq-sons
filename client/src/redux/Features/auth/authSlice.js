import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";



const initialState = {
    signupData: {},
    loginData:{},
    resetData:{},
    logoutData:{},
    isLoading: false,
};

export const signupUser = createAsyncThunk( "user/signup", async (userdata, thunkAPI) => {
        try {
            return await authApi.signup(userdata);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk( "user/login", async (userdata, thunkAPI) => {
        try {
            const response = await authApi.login(userdata);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const resetUserPassword = createAsyncThunk( "user/resetPassword", async (userdata, thunkAPI) => {
    try {
        const response = await authApi.resetPassword(userdata);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const logoutUser = createAsyncThunk( "user/logout", async (userId,thunkAPI) => {
    try {
        const response = await authApi.logout(userId);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
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
        resetPasswordState: (state) => {
            state.resetData = {};
        },
        resetLogoutState: (state) => {
            state.logoutData = {};
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
            })
            .addCase(resetUserPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetUserPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.resetData = action.payload;
            })
            .addCase(resetUserPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.resetData = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                // console.log(action)
                state.isLoading = false;
                state.logoutData = action.payload;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                // console.log(action)
                state.isLoading = false;
                state.logoutData = action.payload;
            })
    },
});

export const { resetSignupState,resetLoginState,resetPasswordState,resetLogoutState } = authSlice.actions;
export default authSlice.reducer;
