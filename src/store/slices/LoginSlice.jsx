import { createSlice } from "@reduxjs/toolkit";

// In your store's initial state
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('register')) || {}
  };

export const LoginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        register : (state,action) => {
            state.user = action.payload
        }
    }
})

export const { login,register} = LoginSlice.actions;
export default LoginSlice.reducer
