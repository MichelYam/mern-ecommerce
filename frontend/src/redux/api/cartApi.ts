import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getTokenFromLocalStorage } from "../../utils/TokenStorage"
import { IUser } from "./userApi";
import { IProduct } from "./productApi";
import { api } from "./api";
export interface cartData {
    loading: boolean,
    error: string | null;
    data: ICart
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
}
export interface ICart {
    _id: string,
    user: IUser,
    date: string,
    products: IProduct
    totalPrice: string
}

export const cartApi = api.injectEndpoints({
    // reducerPath: "cartApi",
    // baseQuery: fetchBaseQuery({
    //     baseUrl: process.env.REACT_APP_API_URL,
    //     prepareHeaders: (headers, { getState }: any) => {
    //         const token = getState().user.userToken
    //         if (token) {
    //             // include token in req header
    //             headers.set('authorization', `Bearer ${token}`)
    //             return headers
    //         }
    //     },
    // }),
    endpoints: (builder) => ({
        //Carts endpoints
        getAllCarts: builder.query<undefined, string>({
            query: () => `cart`,
        }),
        getCart: builder.query<cartData, any>({
            query: () => ({
                url: `cart`,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            }), transformResponse: (response: any) => { return response.cart }

        }),
        createCart: builder.mutation<ICart, Partial<ICart>>({
            query: (cart) => ({
                url: 'cart/add',
                method: "POST",
                body: cart,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
        }),
        updateCart: builder.mutation({
            query: ({ cartId, ...product }) => ({
                url: `cart/${cartId}`,
                method: "PUT",
                body: product,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
        }),
        deleteCart: builder.mutation({
            query: ({ cartId }) => ({
                url: `cart/${cartId}`,
                method: "DELETE",
                body: cartId
            })
        }),
        deleteProductFromCart: builder.mutation({
            query: ({ cartId, productId }) => ({
                url: `cart/${cartId}/${productId}`,
                method: "DELETE",
                body: productId
            })
        }),

        //stripe
        checkoutStripeSession: builder.mutation({
            query: (data) => ({
                url: 'stripe/pay',
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },

            })
        }),
    }),
})


export const {
    useGetAllCartsQuery,
    useGetCartQuery,
    useCreateCartMutation,
    useUpdateCartMutation
} = cartApi;