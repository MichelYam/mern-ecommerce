import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getTokenFromLocalStorage } from "../../utils/TokenStorage"



export const api = createApi({
    reducerPath: "ecommerceApi",
    tagTypes: ["Product", "Cart", "User"],

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, { getState }: any) => {
            const token = getState().user.userToken.split(' ')[1] || getTokenFromLocalStorage()
            // console.log('Token envoyé dans les headers:', token);  // Vérification
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                return headers
            } else {
                console.error('No token found, unable to connect');
            }
        },

    }),
    endpoints: () => ({}),

})
