import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
        .from('jobs')
        .select('*', { count: 'exact' });

        if (error) {
            throw error;
        }
        return data;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
}
);

const initialState = {
    items: [],
    isLoading: true,
    error: null,
    currentPage: 1,
    itemsPerPage: 8,
}

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJobs.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchJobs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
        })
        .addCase(fetchJobs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const { setCurrentPage } = jobsSlice.actions;
export default jobsSlice.reducer;