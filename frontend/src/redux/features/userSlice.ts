import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../api/api';
import { RootState } from '../store';

interface IUserState {
    userInfo: IUser | null;
    userToken: string
    isAuthenticated: boolean;
}

const initialState: IUserState = {
    userInfo: null,
    userToken: "",
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, { payload }: any) => {
            state.userInfo = payload;
            // state.userToken = token
            state.isAuthenticated = true;
        }
    },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user;