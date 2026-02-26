import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import jobsReducer, {setFilters} from "./jobsSlice";
import authReducer from "./authSlice";
import themeReducer, {toggleTheme} from "./themeSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: setFilters,
    effect: (action, listenerApi) => {
        const state = listenerApi.getState();
        localStorage.setItem('jobFilters', JSON.stringify(state.jobs.filters));
    }
});

listenerMiddleware.startListening({
    actionCreator: toggleTheme,
    effect: (action, listenerApi) => {
        const currentTheme = listenerApi.getState().theme.mode;
        localStorage.setItem("app-theme", currentTheme);
        document.documentElement.setAttribute("data-theme", currentTheme);
    }
});

const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        auth: authReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

document.documentElement.setAttribute("data-theme", store.getState().theme.mode);

export default store;