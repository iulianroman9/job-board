import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import jobsReducer, {setFilters} from "./jobsSlice";
import authReducer from "./authSlice";

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
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

export default store;