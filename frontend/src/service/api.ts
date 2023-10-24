import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../redux/store"
import { getTokenFromLocalStorage } from "../utils/TokenStorage"
// import { createProduct, deleteProduct, getMyProducts } from "./productAction"

export interface IProduct {
    totalPrice: number
    quantity: number
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
            query: () => `product`,
            transformResponse: (response: any) => { return response.products }
        }),
        getCategories: builder.query<ICategories, any>({
            query: () => `product/categories`,
        }),
        getProductById: builder.query<IProduct, any>({
            query: (id) => `product/${id}`,
            transformResponse: (response: any) => { return response.product }

        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: 'product/add',
                method: "POST",
                body: product,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },

            })
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `product/${product.id}`,
                method: "PATCH",
                body: product
            })
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `product/${id}`,
                method: "DELETE",
                body: id
            })
        }),
        //user endpoints
        getUsers: builder.query<IUser[], void>({
            query: () => 'user',
        }),
        getUser: builder.query<IUserr, any>({
            query: () => ({
                url: 'user/me',
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            }),

        }),
        loginUser: builder.mutation<IUser, Partial<IUser>>({
            query: ({ email, password }) => ({
                url: 'user/login',
                method: 'POST',
                body: { email, password }
            }),
        }),
        addUser: builder.mutation<IUser, Partial<IUser>>({
            query: (user) => ({
                url: 'user',
                method: 'POST',
                body: user,
            }),
        }),
        updateUser: builder.mutation<IUser, any>({
            query: (user) => ({
                url: 'user',
                headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
                method: 'PUT',
                body: user,
            }),
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `user/${id}`,
                method: 'DELETE',
            }),
        }),
        forgotPassword: builder.mutation<void, any>({
            query: (email) => ({
                url: 'user/forgot',
                method: 'POST',
                body: { email },
            }),
        }),
        resetPassword: builder.mutation<void, any>({
            query: (password) => ({
                url: 'user/reset/:token',
                method: 'POST',
                body: { password },
            }),
        }),
        //carts endpoints
        getAllCarts: builder.query<undefined, string>({
            query: () => `cart`,
        }),
        getCart: builder.query<cartData, any>({
            query: (id) => `cart/${id}`,
        }),
        getUserCart: builder.query<ICart, Partial<ICart>>({
            query: (sub) => ({
                url: `cart/user/${sub}`,
                method: "GET",
            })
        }),
        createCart: builder.mutation<ICart, Partial<ICart>>({
            query: (Cart) => ({
                url: 'add',
                method: "POST",
                body: Cart,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
        }),
        // addToCart: builder.mutation<ICart, Partial<ICart>>({
        //     query: (product) => ({
        //         url: 'cart/add',
        //         method: "POST",
        //         body: { products: product },
        //         headers: {
        //             Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        //         },
        //     })
        // }),
        updateCart: builder.mutation({
            query: ({ id, ...cart }) => ({
                url: `cart/${id}`,
                method: "PUT",
                body: cart
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
    }),
})


export const { useGetProductsQuery,
    useLoginUserMutation,
    useGetUserQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetCategoriesQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetAllCartsQuery,
    useGetUserCartQuery,
    useGetCartQuery,
    useCreateCartMutation,
    useUpdateCartMutation
} = productApi;