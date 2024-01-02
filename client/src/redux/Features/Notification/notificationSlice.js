import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddNotification,
  DeleteAllNotifications,
  DeleteNotification,
  FetchAllNotifications,
  SeenSingleNotification,
} from "../../api/notificationApi";

const initialState = {
  isLoading: false,
  getNotificationdata: [],
  deleteNotificationStatus: null,
  seenNotificationStatus: null,
  deleteAllNotificationsStatus: null,
  notify:[]
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

export const deleteNotify = createAsyncThunk(
  "notification/deleteNotification",
  async (id, thunkAPI) => {
    try {
      const response = await DeleteNotification(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const seenNotify = createAsyncThunk(
  "notification/seenNotification",
  async (notificationId, thunkAPI) => {
    try {
      const response = await SeenSingleNotification(notificationId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllNotify = createAsyncThunk(
  "notification/deleteAllNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await DeleteAllNotifications();
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
    resetdeleteNotificationStatusState: (state) => {
      state.deleteNotificationStatus = null;
    },
    resetseenNotificationStatusState: (state) => {
      state.seenNotificationStatus = null;
    },
    resetdeleteAllNotificationsStatusState: (state) => {
      state.deleteAllNotificationsStatus = null;
    },

    setNotifications: (state, action) => {
      state.notify = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getNotificationdata = action.payload;
      })
      .addCase(FetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.getNotificationdata = action.payload;
      })
      // Handle deleteNotify
      .addCase(deleteNotify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNotify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteNotificationStatus = action.payload;
      })
      .addCase(deleteNotify.rejected, (state, action) => {
        state.isLoading = false;
        state.deleteNotificationStatus = action.payload;
      })

      // Handle seenNotify
      .addCase(seenNotify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(seenNotify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seenNotificationStatus = action.payload;
      })
      .addCase(seenNotify.rejected, (state, action) => {
        state.isLoading = false;
        state.seenNotificationStatus = action.payload;
      })

      // Handle deleteAllNotify
      .addCase(deleteAllNotify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllNotify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteAllNotificationsStatus = action.payload;
      })
      .addCase(deleteAllNotify.rejected, (state, action) => {
        state.isLoading = false;
        state.deleteAllNotificationsStatus = action.payload;
      });
  },
});

export const {
  resetdeleteNotificationStatusState,
  resetseenNotificationStatusState,
  resetdeleteAllNotificationsStatusState,
  setNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
