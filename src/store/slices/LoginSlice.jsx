import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    user: {}
}

export const LoginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        login: (state, action) => {
            state.count = state.count + 1;
            state.user = action.payload
        },
    }
})

export const { login } = LoginSlice.actions;
export default LoginSlice.reducer
