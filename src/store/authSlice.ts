import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, LoginCredentials } from '../types/types';

const initialState: User = {
    username: '',
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginCredentials>) => {
            if(action.payload.username === 'admin' && action.payload.password === 'password') {
                state.username = action.payload.username;
                state.isAuthenticated = true;
            }
        },
        logout: (state) => {
            state.username = '';
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;