import { getTokenFromLocalStorage } from "../../utils/TokenStorage"
import { api } from "./api"

export interface IProduct {
    totalPrice: number | string
    quantity: number | string
    sort?: any
    map?: any
    _id?: number | string
    name?: string
    imageUrl?: string
    category?: string
    description?: string
    price?: any
    rating?: {
        count?: number | string
        rate?: number | string
    }
    createdBy?: string
    inventory?: string | number
    type?: 'Product'
}

export interface ProductData {
    loading: boolean,
    error: string | null;
    data: IProduct
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
}

export const productApi = api.injectEndpoints({
 
    endpoints: (builder) => ({
        // Product endpoints
        getProducts: builder.query<undefined, string>({
            query: () => `product`,
            transformResponse: (response: any) => response.products
        }),

        getProductById: builder.query<IProduct, any>({
            query: (id) => `product/${id}`,
            transformResponse: (response: any) => response.product

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
        updateProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `product/${product._id}`,
                method: "PATCH",
                body: product
            })
        }),
        deleteProduct: builder.mutation<void, { id: string | number }>({
            query: ({ id }) => ({
                url: `product/${id}`,
                method: "DELETE",
                body: id
            })
        }),
    }),
})


export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = productApi;