import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.role === 'admin'; 
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;