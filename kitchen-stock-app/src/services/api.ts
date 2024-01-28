import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import useEnvironmentVar from "../hooks/useEnvironmentVar";
import type {Product, Category, Stock} from "./types"
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

const baseUrl = useEnvironmentVar("backendUrl")
console.log(baseUrl)

type CreateProductArgs = {
    name: String,
    categoryId: String
}

type AddStockArgs = {
    productId: String,
    format: String,
    expireDate: Date,
    isOpen: Boolean,
    expires: Boolean,
    remaining: String
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
        }),
        addStock: builder.mutation<Stock, AddStockArgs>({
            query: (args: AddStockArgs) => ({
                url: `products/${args.productId}/stocks`,
                method: 'POST',
                body: args
            }),
            invalidatesTags: ['Products']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useCreateProductMutation,
    useAddStockMutation
} = api