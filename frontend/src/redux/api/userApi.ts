import { getTokenFromLocalStorage } from "../../utils/TokenStorage"
import { api } from "./api"

export interface IUser {
    id?: string | number
    firstName?: string
    lastName?: string
    password?: string
    email?: string
    role?: string
    country?: string
    zipCode?: string
    phone?: string
    token?: string
    city?: string
    street?: string
    avatar?: string
    remember?: boolean
    type?: 'User'
}
export interface userData {
    loading: boolean,
    error: string | null;
    data: IUser
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
}

// Types pour les données de connexion et la réponse de l'API
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number | string;
        email: string;
    };
}

export const userApi = api.injectEndpoints({
    // reducerPath: "userApi",
    // tagTypes: ['User'],
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
        loginUser: builder.mutation<LoginResponse, LoginCredentials>({
            query: ({ email, password }) => ({
                url: 'user/login',
                method: 'POST',
                body: { email, password }
            }),
        }),

        getUsers: builder.query<IUser[], void>({
            query: () => 'user',
        }),

        getUser: builder.query<IUser, any>({
            query: () => ({
                url: `user/profile`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            }),
            transformResponse: (response: any, meta: any) => {
                try {
                    if (!response || !response.user) {
                        throw new Error("La structure de la réponse est incorrecte.");
                    }
                    return response.user;
                } catch (error) {
                    if (meta.response.status === 401) {
                        console.error("Token invalide ou expiré. L'utilisateur doit se reconnecter.");
                        return {}; 
                    }
                    console.log('Réponse API:', response);
                    console.error("Erreur dans transformResponse:", error);
                    return {};  // Retourne un objet vide en cas d'erreur
                }
            }
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
        getOrders: builder.query<IUser, any>({
            query: () => ({
                url: `user/orders`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            }),
            transformResponse: (response: any, meta: any) => {
                console.log("response", response.orders)
                try {
                    if (!response || !response.orders) {
                        throw new Error("La structure de la réponse est incorrecte.");
                    }
                    return response.orders;
                } catch (error) {
                    if (meta.response.status === 401) {
                        console.error("Token invalide ou expiré. L'utilisateur doit se reconnecter.");
                        return {}; 
                    }
                    console.log('Réponse API:', response);
                    console.error("Erreur dans transformResponse:", error);
                    return {};  // Retourne un objet vide en cas d'erreur
                }
            }
        }),

    }),
})


export const {
    useLoginUserMutation,
    useGetUsersQuery,
    useGetOrdersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = userApi;