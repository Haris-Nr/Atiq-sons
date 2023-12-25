import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddNotification, FetchAllNotifications } from "../../api/notificationApi";

const initialState = {
    isLoading: false,
    getNotificationdata:[],
};

export const addNotify = createAsyncThunk(
    "notifi/addNotification",
    async (data, thunkAPI) => {
        try {
            const response = await AddNotification(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const FetchNotifications = createAsyncThunk(
    "notifi/allNotification",
    async (_, thunkAPI) => {
        try {
            const response = await FetchAllNotifications();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(FetchNotifications.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(FetchNotifications.fulfilled,(state, action) => {
            state.isLoading = false;
            state.getNotificationdata = action.payload;
        })
        .addCase(FetchNotifications.rejected,(state, action) => {
            state.isLoading = false;
            state.getNotificationdata = action.payload;
        })

    },
});


// export const {  } = notificationSlice.actions;
export default notificationSlice.reducer;
