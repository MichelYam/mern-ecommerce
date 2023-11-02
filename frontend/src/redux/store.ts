import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "../redux/api/api";
import userReducer from './features/userSlice';

const store = configureStore({
    reducer: {
        // [userApi.reducerPath]: userApi.reducer,
        [api.reducerPath]: api.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([api.middleware]),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
setupListeners(store.dispatch);

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export default store
