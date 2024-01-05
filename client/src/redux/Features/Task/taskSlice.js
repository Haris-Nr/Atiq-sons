import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskApi from "../../api/taskApi";

const initialState = {
    Addtaskdata: {},
    fetchtaskData: [],
    isLoading: false,
};

export const addTask = createAsyncThunk(
    "task/addtask",
    async (taskData, thunkAPI) => {
        try {
            const response = await taskApi.addTask(taskData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const TasksForEmployee = createAsyncThunk(
    "task/tasksForEmployee",
    async (_, thunkAPI) => {
        try {
            const response = await taskApi.fetchTasksForEmployee();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const taskSlice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        resettaskState: (state) => {
            state.Addtaskdata = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Addtaskdata = action.payload;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.isLoading = false;
                state.Addtaskdata = action.payload;
            })
            .addCase(TasksForEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(TasksForEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fetchtaskData = action.payload;
            })
            .addCase(TasksForEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchtaskData = action.payload;
            });
    },
});

export const { resettaskState } = taskSlice.actions;
export default taskSlice.reducer;
