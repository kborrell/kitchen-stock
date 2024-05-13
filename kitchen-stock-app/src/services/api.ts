import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import useEnvironmentVar from "../hooks/useEnvironmentVar";
import type {Product, Category, Stock} from "./types"
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

const baseUrl = useEnvironmentVar("backendUrl")
console.log(baseUrl)

type CreateProductArgs = {
    name: String,
    categoryId: String,
    trackOpen: Boolean,
    expires: Boolean,
    daysToKeep: Number
}

type AddStockArgs = {
    productId: String,
    format: String,
    expireDate: Date,
    amount: Number,
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
        editProduct: builder.mutation<Product, Product>({
            query: (args: Product) => ({
                url: `products/${args.id}`,
                method: 'PUT',
                body: args
            }),
            invalidatesTags: ['Products']
        }),
        removeProduct: builder.mutation<undefined, String>({
            query: (id: String) => ({
                url: `products/${id}`,
                method: 'DELETE'
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
        }),
        editStock: builder.mutation<Stock, Stock>({
            query: (args: Stock) => ({
                url: `stocks/${args.id}`,
                method: 'PUT',
                body: args
            }),
            invalidatesTags: ['Products']
        }),
        removeStock: builder.mutation<undefined, String>({
            query: (id : String) => ({
                url: `stocks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Products']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useCreateProductMutation,
    useEditProductMutation,
    useRemoveProductMutation,
    useAddStockMutation,
    useEditStockMutation,
    useRemoveStockMutation
} = api