import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser, userApi } from '../api/userApi';

interface IUserState {
    user: IUser | null;
    userToken: string | null
    isAuthenticated: boolean;
}

const initialState: IUserState = {
    user: null,
    userToken: "",
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<any>) => {
            state.user = payload.user;
            state.userToken = payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null
            state.userToken = null
        },

    },
    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(
    //             userApi.endpoints.loginUser.matchFulfilled,
    //             (state, { payload }) => {
    //                 state.userInfo = payload.user;
    //                 state.userToken = payload.token;
    //                 state.isAuthenticated = true;
    //             }
    //         )
    //         // .addMatcher(
    //         //     userApi.endpoints.logoutUser.matchFulfilled, // Lorsque la requête de logout réussit
    //         //     () => initialState // Réinitialiser l'état utilisateur
    //         // );
    // },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user;