import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import jobsReducer, {setFilters} from "../components/Jobs/jobsSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: setFilters,
    effect: (action, listenerApi) => {
        const state = listenerApi.getState();
        localStorage.setItem('jobFilters', JSON.stringify(state.jobs.filters));
    }
});

const store = configureStore({
    reducer: {
        jobs: jobsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

export default store;