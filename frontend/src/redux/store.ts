import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "../redux/api/api";
import userReducer from './features/userSlice';
import { userApi } from "./api/userApi";
import { productApi } from "./api/productApi";
import { cartApi } from "./api/cartApi";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        userApi: userApi.reducer,
        productApi: productApi.reducer,
        cartApi: cartApi.reducer,
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
