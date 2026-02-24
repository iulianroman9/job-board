import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../components/Jobs/jobsSlice";

const store = configureStore({
    reducer: {
        jobs: jobsReducer,
    }
});

export default store;