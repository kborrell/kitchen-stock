import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import useEnvironmentVar from "../hooks/useEnvironmentVar";
import type { Product, Category } from "./types"

const baseUrl = useEnvironmentVar("backendUrl")
console.log(baseUrl)

type CreateProductArgs = {
    name: String,
    format: String,
    categoryId: String
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/`}),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => `products`,
            providesTags: ['Products']
        }),
        getCategories: builder.query<Category[], void>({
            query: () => 'categories'
        }),
        createProduct: builder.mutation<Product, CreateProductArgs>({
            query: (product) => ({
                url: 'products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Products']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useCreateProductMutation
} = api