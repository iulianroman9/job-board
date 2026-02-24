import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async ({ page, limit }, { rejectWithValue }) => {
    try {
        const rangeFrom = (page - 1) * limit;
        const rangeTo = page * limit - 1;

        const { data, error, count } = await supabase
        .from('jobs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(rangeFrom, rangeTo);

        if (error) {
            throw error;
        }
        return { data, count, page };
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
}
);

const initialState = {
    items: [],
    isLoading: true,
    totalItems: 0,
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
            state.items = action.payload.data;
            state.totalItems = action.payload.count;
        })
        .addCase(fetchJobs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const { setCurrentPage } = jobsSlice.actions;
export default jobsSlice.reducer;