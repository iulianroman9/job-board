import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../utils/supabase";

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

const savedFilters = JSON.parse(localStorage.getItem("jobFilters")) || {
    search: "",
    sortDate: "newest",
    experience: "all"
};

const initialState = {
    items: [],
    isLoading: true,
    error: null,
    currentPage: 1,
    itemsPerPage: 8,
    filters: savedFilters
}

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload};
            state.currentPage = 1;
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

export const { setCurrentPage, setFilters } = jobsSlice.actions;
export default jobsSlice.reducer;