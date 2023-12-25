import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

const initialState = {
    allLogsData: [],
  isLoading: false,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  totalItems: 0,
};

export const allLogs = createAsyncThunk(
    "user/logs",
    async (_, { getState, rejectWithValue }) => {
        const { currentPage, pageSize } = getState().log;
        try {
          const response = await authApi.getAllLogs(currentPage, pageSize);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {
        setCurrentPage(state, action) {
          state.currentPage = action.payload;
        },
        setPageSize(state, action) {
          state.pageSize = action.payload;
        },
      },
    
    extraReducers: (builder) => {
        builder
            .addCase(allLogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allLogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allLogsData = action.payload;
                state.currentPage = action.payload.pageInfo.currentPage;
                state.totalPages = action.payload.pageInfo.totalPages;
                state.totalItems = action.payload.pageInfo.totalItems;
            })
            .addCase(allLogs.rejected, (state, action) => {
                state.isLoading = false;
                state.allLogsData = action.payload;
            });
    },
});
export const { setCurrentPage, setPageSize } = logSlice.actions;

export default logSlice.reducer;
