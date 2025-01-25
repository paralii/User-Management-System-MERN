import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : !!localStorage.getItem('token'),
    token : localStorage.getItem('token'),
    user : localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')) : null,
}

const authSlice = createSlice({
    name :"auth",
    initialState,
    reducers :{
        loginSuccess : (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },

        logout :(state) => {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        },
    }
});

export const {loginSuccess , logout} = authSlice.actions;

export default authSlice.reducer