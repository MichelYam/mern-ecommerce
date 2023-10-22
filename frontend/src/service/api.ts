import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../redux/store"
import { getTokenFromLocalStorage } from "../utils/TokenStorage"
// import { createProduct, deleteProduct, getMyProducts } from "./productAction"

export interface IProduct {
    sort?: any
    map?: any
    _id?: string
    name?: string
    imageUrl?: string
    category?: string
    description?: string
    price?: string
    rating?: {
        count?: number
        rate?: number
    }
    createdBy?: string
    type?: 'Product'
}
export interface ICategories {
    map?: any
    value: string
}
export interface ProductData {
    loading: boolean,
    error: string | null;
    data: IProduct
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
}
export interface cartData {
    loading: boolean,
    error: string | null;
    data: Array<ICart>
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
}
export interface Categories {
    data: ICategories
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
}
export interface IUser {
    id?: string
    firstName?: string
    lastName?: string
    password?: string
    role: string
    country: string
    zipCode: string
    phone: string
    token: string
    city: string
    avatar: string
    email?: string
    type?: 'User'
}
export interface IUserr {
    user: {
        id?: string
        firstName?: string
        lastName?: string
        password?: string
        role: string
        country: string
        zipCode: string
        phone: string
        token: string
        city: string
        avatar: string
        email?: string
        type?: 'User'
    }
}
export interface userData {
    loading: boolean,
    error: string | null;
    data: IUser
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
}
export interface ICart {
    map(arg0: (item: any) => void): import("react").ReactNode
    id: string,
    userId: string,
    date: string,
    products: IProduct[]
}
// const initialState: IEvent = {
//     loading: false,
//     error: null,
//     events: [],
// }

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/", }),
    // baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
    endpoints: (builder) => ({
        // Product endpoints
        getProducts: builder.query<undefined, string>({
            query: () => `products`,
            transformResponse: (response: any) => {return response.products}
        }),
        getCategories: builder.query<ICategories, any>({
            query: () => `products/categories`,
        }),
        getProductById: builder.query<IProduct, any>({
            query: (id) => `products/${id}`,
            transformResponse: (response: any) => {return response.product}

        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: 'products/add',
                method: "POST",
                body: product,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },

            })
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `products/${product.id}`,
                method: "PATCH",
                body: product
            })
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `products/${id}`,
                method: "DELETE",
                body: id
            })
        }),
        //user endpoints
        getUsers: builder.query<IUser[], void>({
            query: () => 'users',
        }),
        getUser: builder.query<IUserr, any>({
            query: () => ({
                url: 'users/me',
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            }),

        }),
        loginUser: builder.mutation<IUser, Partial<IUser>>({
            query: ({ email, password }) => ({
                url: 'users/login',
                method: 'POST',
                body: { email, password }
            }),
        }),
        addUser: builder.mutation<IUser, Partial<IUser>>({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
        }),
        updateUser: builder.mutation<IUser, any>({
            query: (user) => ({
                url: 'users',
                headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
                method: 'PUT',
                body: user,
            }),
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
        }),
        forgotPassword: builder.mutation<void, any>({
            query: (email) => ({
                url: 'users/forgot',
                method: 'POST',
                body: { email },
            }),
        }),
        resetPassword: builder.mutation<void, any>({
            query: (password) => ({
                url: 'users/reset/:token',
                method: 'POST',
                body: { password },
            }),
        }),
        //carts endpoints
        getAllCarts: builder.query<undefined, string>({
            query: () => `carts`,
        }),
        getCart: builder.query<cartData, any>({
            query: (id) => `carts/${id}`,
        }),
        // getUserCart: builder.mutation<cartData, Partial<ICart>>({
        //     query: (id) => ({
        //         url: `carts/user/${id}`,
        //         method: "GET",
        //     })
        // }),
        getUserCart: builder.query<ICart, Partial<ICart>>({
            query: (sub) => ({
                url: `carts/user/${sub}`,
                method: "GET",
            })
        }),
        addCart: builder.mutation<ICart, Partial<ICart>>({
            query: (Cart) => ({
                url: 'carts',
                method: "POST",
                body: Cart
            })
        }),
        updateCart: builder.mutation({
            query: ({ id, ...cart }) => ({
                url: `carts/${id}`,
                method: "PUT",
                body: cart
            })
        }),
        deleteCart: builder.mutation({
            query: ({ id }) => ({
                url: `carts/${id}`,
                method: "DELETE",
                body: id
            })
        }),
    }),
})


export const { useGetProductsQuery,
    useGetProductByIdQuery,
    useGetCategoriesQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetUsersQuery,
    useLoginUserMutation,
    useGetAllCartsQuery,
    useGetCartQuery,
    useGetUserCartQuery,
    useUpdateCartMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = productApi;