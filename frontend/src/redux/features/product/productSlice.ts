import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { createProduct, deleteProduct, getMyProducts } from "./productAction"


export interface IProduct {
    _id: string
    title: string
    image: string
    category: string
    description: string
    price: string
    rating: {
        count: number
        rate: number
    }
    createdBy: string
    type: 'Product'
}

interface IEvent {
    loading: boolean,
    error: string | null;
    events: Event[]
}

const initialState: IEvent = {
    loading: false,
    error: null,
    events: [],
}
const BASE_URL = 'https://fakestoreapi.com/';

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct, undefined>({
            query: (name) => `products/${name}`,
        }),
    }),
})